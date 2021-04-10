# Bot Serial Controller
The bot controller. using Web Serial API

## Build
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