export class BinaryStreamReader {
    closed = false;
    buffer = new Uint8Array(0);
    bufferPointer = 0;

    constructor(
        public reader: ReadableStreamDefaultReader<Uint8Array>
    ) {}

    async readByte() {
        if (closed) return 0;
        if (this.bufferPointer >= this.buffer.length) {
            // Request new buffer
            let data = await this.reader.read();
            if (data.done) {
                this.closed = true;
                return 0;
            } else {
                this.buffer = data.value;
                this.bufferPointer = 0;
            }
        }
        return this.buffer[this.bufferPointer++];
    }

    async readShort() {
        return ((await this.readByte()) << 8) | (await this.readByte());
    }
}