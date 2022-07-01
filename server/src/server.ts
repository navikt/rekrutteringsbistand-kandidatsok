import path from 'path';
import express, { Response } from 'express';
import compression from 'compression';

const port = process.env.PORT || 3000;
const basePath = '/rekrutteringsbistand-kandidatsok';
const buildPath = path.join(__dirname, '../build');

const app = express();

const startServer = () => {
    app.use(compression());

    app.get([`${basePath}/internal/isAlive`, `${basePath}/internal/isReady`], (_, res: Response) =>
        res.sendStatus(200)
    );

    app.use(`${basePath}/static`, express.static(buildPath + '/static'));
    app.use(`${basePath}/asset-manifest.json`, express.static(`${buildPath}/asset-manifest.json`));

    app.listen(port, () => {
        console.log('Server kjører på port', port);
    });
};

startServer();
