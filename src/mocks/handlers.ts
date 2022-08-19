import { rest } from 'msw';
import { kandidatApi } from '../api/api';
import { LagreKandidaterDto } from '../kandidatliste/LagreKandidaterModal';
import {
    mockMineKandidatlister,
    mockLagringAvKandidaterIKandidatliste,
} from './mockKandidatlister';

export const handlers = [
    rest.get('/meg', (req, res, ctx) =>
        res(
            ctx.json({
                navIdent: 'z994161',
            })
        )
    ),

    rest.get(`${kandidatApi}/veileder/kandidatlister`, (req, res, ctx) =>
        res(ctx.json(mockMineKandidatlister))
    ),

    rest.get(
        `${kandidatApi}/veileder/stilling/byNr/:annonsenummer/kandidatliste`,
        (req, res, ctx) => res(ctx.json(mockMineKandidatlister.liste[0]))
    ),

    rest.get(`${kandidatApi}/veileder/stilling/:stillingsId/kandidatliste`, (req, res, ctx) =>
        res(ctx.json(mockMineKandidatlister.liste[0]))
    ),

    rest.post(
        `${kandidatApi}/veileder/kandidatlister/:kandidatlisteId/kandidater`,
        async (req, res, ctx) => {
            const lagreKandidaterDto: LagreKandidaterDto = await req.json();
            const kandidatlisteId = req.params['kandidatlisteId'] as string;

            return res(
                ctx.json(mockLagringAvKandidaterIKandidatliste(lagreKandidaterDto, kandidatlisteId))
            );
        }
    ),
];
