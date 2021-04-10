import { Session } from "./Session.js";

let session = new Session();
setInterval(async () => {
    let data = await session.controller.readStatus();
    if (data === undefined) return;
    session.ui.sendSensorData(data.ir);
}, 1000);

globalThis.calculateScore = (time: number, sub: number) => {
    return (90 - sub) + ((420 - time) * 2.38 / 100);
};