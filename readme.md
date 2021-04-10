# Bot Serial Controller
The bot controller, using Web Serial API

## Build webapp
0. Install NodeJS and NPM
1. Install packages: ``npm install``

### Development build
#### Build once
2. Run ``npm run build``
3. Start server: ``npm run test``

#### Watching files
2. Run ``npx tsc --watch``
3. Start server: ``npm run test``

### Production build
2. Run ``npm run production``
3. Copy all files to your HTTPS server (it must be HTTPS, because that's Web Serial API requirement). Make sure to exclude files like ``src/`` and ``package.json``

## Upload Arduino code
The entire Arduino code is located in ``arduino/`` directory. Simply open it with Arduino IDE and upload it to your board and you're ready to go.

## Baud rate
The default baud rate is 9600. To change the baud rate for webapp, open ``src/PortsManager.js`` and edit the line 11:
```ts
/*10*/ await webPort.open({
/*11*/     baudRate: 9600
/*12*/ });
```

Once you're done, rebuild the project