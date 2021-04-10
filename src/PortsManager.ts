import { Port } from "./Port.js";

export class PortsManager {
    selected: Port;

    constructor() {}

    async requestPort() {
        let webPort = await navigator.serial.requestPort();
        await webPort.open({
            baudRate: 9600
        });
        this.selected = new Port(webPort, this);
        return this.selected;
    }
}