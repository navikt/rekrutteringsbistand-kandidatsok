const { createProxyMiddleware } = require('http-proxy-middleware');

const { OPEN_SEARCH_URI, OPEN_SEARCH_USERNAME, OPEN_SEARCH_PASSWORD, REACT_APP_MOCK_ES } =
    process.env;

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

    if (!REACT_APP_MOCK_ES) {
        setupProxy('/kandidatsok-proxy', `${OPEN_SEARCH_URI}/veilederkandidat_current/_search`);
    }
};
