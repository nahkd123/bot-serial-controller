import { Controller } from "./Controller.js";
import { KeyboardHandler } from "./KeyboardHandler.js";
import { PortsManager } from "./PortsManager.js";
import { UI } from "./ui/UI.js";

export class Session {
    portsManager = new PortsManager();
    ui = new UI(this);
    controller: Controller;
    keyboard: KeyboardHandler;

    constructor() {
        this.controller = new Controller(this);
        this.keyboard = new KeyboardHandler(this.controller, this);
    }
}