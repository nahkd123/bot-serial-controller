import { Controller } from "./Controller.js";
import { Session } from "./Session.js";

export class KeyboardHandler {
    wasd: [boolean, boolean, boolean, boolean] = [false, false, false, false];

    constructor(
        public controller: Controller,
        public session: Session
    ) {
        let servoToggle = false;

        document.addEventListener("keydown", event => {
            if (event.target !== document.body) return;
            
            switch (event.code) {
            case "ArrowUp":
            case "KeyW": this.wasd[0] = true; break;
            case "ArrowLeft":
            case "KeyA": this.wasd[1] = true; break;
            case "ArrowDown":
            case "KeyS": this.wasd[2] = true; break;
            case "ArrowRight":
            case "KeyD": this.wasd[3] = true; break;
            case "ShiftLeft":
                this.controller.slowMode(true);
                session.ui.controllerSlow.classList.add("toggled");
                break;

            case "Space":
                controller.servo(servoToggle);
                servoToggle = !servoToggle;
                if (servoToggle) session.ui.controllerServo.classList.add("toggled");
                else session.ui.controllerServo.classList.remove("toggled");
                break;
            case "Digit1":
                controller.digit(0);
                session.ui.controllerAutoMode.classList.add("toggled");
                break;
            case "Digit2":
                controller.digit(1);
                session.ui.controllerAutoMode.classList.remove("toggled");
                break;
            case "Numpad1":
                controller.led(true);
                session.ui.controllerLed.classList.add("toggled");
                break;
            default: break;
            }
            this.updateMovement();
        });
        
        document.addEventListener("keyup", event => {
            switch (event.code) {
            case "ArrowUp":
            case "KeyW": this.wasd[0] = false; break;
            case "ArrowLeft":
            case "KeyA": this.wasd[1] = false; break;
            case "ArrowDown":
            case "KeyS": this.wasd[2] = false; break;
            case "ArrowRight":
            case "KeyD": this.wasd[3] = false; break;
            case "ShiftLeft":
                this.controller.slowMode(false);
                session.ui.controllerSlow.classList.remove("toggled");
                break;
            case "Numpad1":
                controller.led(false);
                session.ui.controllerLed.classList.remove("toggled");
                break;
            default: break;
            }
            this.updateMovement();
        });
    }

    wasdMatch(b1 = false, b2 = false, b3 = false, b4 = false) {
        return this.wasd[0] === b1 && this.wasd[1] === b2 && this.wasd[2] === b3 && this.wasd[3] === b4;
    }
    updateMovement() {
        const T = true, F = false;
        if (this.wasdMatch(T, F, F, F)) this.controller.forward();
        if (this.wasdMatch(F, T, F, F)) this.controller.turnLeft();
        if (this.wasdMatch(F, F, T, F)) this.controller.backward();
        if (this.wasdMatch(F, F, F, T)) this.controller.turnRight();
        
        if (this.wasdMatch(T, T, F, F)) this.controller.forwardLeft();
        if (this.wasdMatch(T, F, F, T)) this.controller.forwardRight();
        if (this.wasdMatch(F, T, T, F)) this.controller.backwardLeft();
        if (this.wasdMatch(F, F, T, T)) this.controller.backwardRight();

        if (this.wasdMatch(F, F, F, F)) this.controller.stopMovement();
    }
}