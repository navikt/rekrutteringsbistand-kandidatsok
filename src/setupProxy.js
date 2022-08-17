const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const axios = require('axios').default;

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
                pathRewrite: (path) => path.replace(fraPath, ''),
            })
        );
    };

    const setupProxyWithGet = (fraPath, tilTarget) => {
        app.use(express.json());
        app.use(fraPath, (req, res) => {
            axios
                .get(tilTarget + req.path, {
                    data: req.body,
                    auth: {
                        username: OPEN_SEARCH_USERNAME,
                        password: OPEN_SEARCH_PASSWORD,
                    },
                })
                .then((response) => {
                    res.json(response.data);
                });
        });
    };

    if (!REACT_APP_MOCK_ES) {
        setupProxy('/kandidatsok-proxy', `${OPEN_SEARCH_URI}/veilederkandidat_current/_search`);
        setupProxy(
            '/kandidatsok-hent-kandidat',
            `${OPEN_SEARCH_URI}/veilederkandidat_current/_doc`
        );
        setupProxyWithGet(
            '/kandidatsok-hent-forklaring',
            `${OPEN_SEARCH_URI}/veilederkandidat_current/_explain`
        );
    }
};
