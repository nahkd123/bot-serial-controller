import { Session } from "./Session.js";

let session = new Session();
setInterval(async () => {
    let data = await session.controller.readStatus();
    if (data === undefined) return;
    session.ui.sendSensorData(data.ir);
}, 1000);