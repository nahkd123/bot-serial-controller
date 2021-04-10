import { Session } from "./Session.js";

const FORWARD = 70;
const BACKWARD = 66;
const TURN_LEFT = 76;
const TURN_RIGHT = 82;
const FORWARD_LEFT = 67;
const FORWARD_RIGHT = 77;
const BACKWARD_LEFT = 69;
const BACKWARD_RIGHT = 80;
const SERVO_CLOSE = 71;
const SERVO_OPEN = 103;
const BASE_DIGIT = 48;
const STOP = 83;

export class Controller {
    constructor(
        public session: Session
    ) {}

    sendBytes(v: number[]) {
        if (this.session.portsManager.selected === undefined) return false;
        this.session.portsManager.selected.writer.write(new Uint8Array(v));
        return true;
    }

    forward() {return this.sendBytes([FORWARD]);}
    backward() {return this.sendBytes([BACKWARD]);}
    turnLeft() {return this.sendBytes([TURN_LEFT]);}
    turnRight() {return this.sendBytes([TURN_RIGHT]);}
    forwardLeft() {return this.sendBytes([FORWARD_LEFT]);}
    forwardRight() {return this.sendBytes([FORWARD_RIGHT]);}
    backwardLeft() {return this.sendBytes([BACKWARD_LEFT]);}
    backwardRight() {return this.sendBytes([BACKWARD_RIGHT]);}

    servoOpen() {return this.sendBytes([SERVO_OPEN]);}
    servoClose() {return this.sendBytes([SERVO_CLOSE]);}
    servo(open: boolean) {return open? this.servoOpen() : this.servoClose();}
    slowMode(slow: boolean) {return slow? this.sendBytes([0x01]) : this.sendBytes([0x02]);}
    led(led: boolean) {return led? this.sendBytes([0x03]) : this.sendBytes([0x04]);}

    async readStatus(): Promise<Status> {
        if (this.session.portsManager.selected === undefined) return undefined;
        this.sendBytes([0x00]); // Read IR sensor data request
        let binary = this.session.portsManager.selected.binary;
        let ir = [
            await binary.readShort(),
            await binary.readShort(),
            await binary.readShort(),
            await binary.readShort()
        ];
        return {ir};
    }

    digit(d: number) {return this.sendBytes([BASE_DIGIT + d]);}
    stopMovement() {return this.sendBytes([STOP]);}
}

interface Status {
    ir: number[];
}