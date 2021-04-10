import { PortsManager } from "./PortsManager.js";
import { BinaryStreamReader } from "./streams/BinaryStreamReader.js";

export class Port {
    private _closed = false;
    get closed() {return this._closed;}

    constructor(
        public webPort: SerialPort,
        public manager: PortsManager
    ) {
        this.reader = this.readable.getReader();
        this.writer = this.writable.getWriter();
        this.binary = new BinaryStreamReader(this.reader);
    }

    get readable() {return this.webPort.readable;}
    get writable() {return this.webPort.writable;}

    reader: ReadableStreamDefaultReader<Uint8Array>;
    writer: WritableStreamDefaultWriter<Uint8Array>;
    binary: BinaryStreamReader;

    async close() {
        this.writer.releaseLock();
        this.reader.releaseLock();
        await this.webPort.close();
        this._closed = true;
        if (this.manager.selected === this) this.manager.selected = undefined;
    }

    async read() {
        let data = await this.reader.read();
        if (data.done) {
            this._closed = true;
            if (this.manager.selected === this) this.manager.selected = undefined;
        }
        return data.value;
    }
}