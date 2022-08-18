import { rest } from 'msw';
import { kandidatApi } from '../api/api';
import { mineKandidatlister } from './mineKandidatlister';

export const handlers = [
    rest.get('/meg', (req, res, ctx) =>
        res(
            ctx.json({
                navIdent: 'z994161',
            })
        )
    ),

    rest.get(`${kandidatApi}/veileder/kandidatlister`, (req, res, ctx) =>
        res(ctx.json(mineKandidatlister))
    ),

    rest.post(
        `${kandidatApi}/veileder/kandidatlister/:kandidatlisteId/kandidater`,
        (req, res, ctx) => res(ctx.json(mineKandidatlister))
    ),
];
