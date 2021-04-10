import { Session } from "../Session.js";

export class UI {
    constructor(
        public session: Session
    ) {
        this.init();
    }

    init() {
        this.initSelectSerial();
        this.initSensorStats();
        this.initControlerDisplay();
        this.initStatus();
    }

    // Components
    serialButton: HTMLDivElement;
    initSelectSerial() {
        let element = this.serialButton = document.createElement("div");
        element.textContent = "Offline";
        element.className = "serialbutton";
        element.addEventListener("click", async event => {
            try {
                if (this.session.portsManager.selected === undefined) {
                    element.textContent = "Connecting";
                    element.classList.add("connecting");
                    let port = await this.session.portsManager.requestPort();
                    console.log("Connected");
                    element.textContent = "Connected";
                    element.classList.remove("connecting");
                    element.classList.add("connected");

                    this.session.controller.slowMode(false);
                    this.session.controller.led(false);
                }
            } catch (e) {
                console.error(e);
                element.textContent = "Offline";
                element.classList.remove("connecting");
                element.classList.remove("connected");
            }
        });

        document.body.appendChild(element);
    }

    irContainer: HTMLDivElement;
    irTitle: HTMLDivElement;
    irSensors: HTMLDivElement[] = [];
    initSensorStats() {
        this.irContainer = document.createElement("div");
        this.irContainer.className = "sensor ir";
        document.body.append(this.irContainer);

        this.irTitle = document.createElement("div");
        this.irTitle.textContent = "IR Sensor";
        this.irContainer.append(this.irTitle);

        for (let i = 0; i < 4; i++) {
            let element = document.createElement("div");
            element.className = "sensorelement";
            element.textContent = "0000";
            this.irContainer.append(element);
            this.irSensors.push(element);
        }
    }
    sendSensorData(val: number[]) {
        for (let i = 0; i < 4; i++) {
            let element = this.irSensors[i];
            element.textContent = val[i].toString().padStart(4, "0") + "";
            element.style.backgroundColor = `hsl(0, 0%, ${100 - val[i] / 1000 * 75}%)`;
        }
    }

    controllerContainer: HTMLDivElement;
    controllerTitle: HTMLDivElement;

    controllerServo: HTMLDivElement;
    controllerLed: HTMLDivElement;
    controllerAutoMode: HTMLDivElement;
    controllerSlow: HTMLDivElement;

    initControlerDisplay() {
        this.controllerContainer = document.createElement("div");
        this.controllerContainer.className = "widget controller";
        document.body.append(this.controllerContainer);

        this.controllerTitle = document.createElement("div");
        this.controllerTitle.textContent = "Controller";
        this.controllerContainer.appendChild(this.controllerTitle);

        this.controllerServo = document.createElement("div");
        this.controllerServo.className = "keydisplay";
        this.controllerServo.textContent = "Servo";

        this.controllerLed = document.createElement("div");
        this.controllerLed.className = "keydisplay";
        this.controllerLed.textContent = "LED";

        this.controllerSlow = document.createElement("div");
        this.controllerSlow.className = "keydisplay";
        this.controllerSlow.textContent = "Slow";

        this.controllerAutoMode = document.createElement("div");
        this.controllerAutoMode.className = "keydisplay";
        this.controllerAutoMode.textContent = "Auto";

        this.controllerContainer.append(
            this.controllerServo,
            this.controllerLed,
            this.controllerAutoMode,
            this.controllerSlow
        );
    }

    statusContainer: HTMLDivElement;
    statusTitle: HTMLDivElement;

    initStatus() {
        this.statusContainer = document.createElement("div");
        this.statusContainer.className = "widget status";
        document.body.append(this.statusContainer);

        this.statusTitle = document.createElement("div");
        this.statusTitle.textContent = "Status";
        this.statusContainer.appendChild(this.statusTitle);
    }

}