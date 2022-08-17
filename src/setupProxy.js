const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const axios = require('axios').default;

const { OPEN_SEARCH_URI, OPEN_SEARCH_USERNAME, OPEN_SEARCH_PASSWORD, REACT_APP_MOCK_ES } =
    process.env;

module.exports = (app) => {
    const setupProxyTilEs = (fraPath, tilTarget) => {
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

    /* Explain-endepunktet forventer en GET med body, som ikke er
       enkelt å sette opp med http-proxy-middleware. Derfor setter
       vi opp en egen proxy med axios for akkurat dette. */
    const setupProxyTilEsExplain = (fraPath, tilTarget) => {
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
        setupProxyTilEs(
            '/kandidatsok-proxy',
            `${OPEN_SEARCH_URI}/veilederkandidat_current/_search`
        );

        setupProxyTilEs(
            '/kandidatsok-hent-kandidat',
            `${OPEN_SEARCH_URI}/veilederkandidat_current/_doc`
        );

        setupProxyTilEsExplain(
            '/kandidatsok-hent-forklaring',
            `${OPEN_SEARCH_URI}/veilederkandidat_current/_explain`
        );
    }
};
