const { createProxyMiddleware } = require('http-proxy-middleware');

const { OPEN_SEARCH_URI, OPEN_SEARCH_USERNAME, OPEN_SEARCH_PASSWORD, REACT_APP_MOCK } = process.env;

module.exports = (app) => {
    const setupProxy = (fraPath, tilTarget) => {
        app.use(
            fraPath,
            createProxyMiddleware({
                target: tilTarget,
                changeOrigin: true,
                auth: `${OPEN_SEARCH_USERNAME}:${OPEN_SEARCH_PASSWORD}`,
                pathRewrite: (path) => {
                    const nyPath = path.replace(fraPath, '');
                    console.log(`Proxy fra '${path}' til '${tilTarget + nyPath}'`);
                    return nyPath;
                },
            })
        );
    };

    if (!REACT_APP_MOCK) {
        setupProxy('/rekrutteringsbistand-kandidatsok/kandidatsok-proxy', OPEN_SEARCH_URI);
    }
};
