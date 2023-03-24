import { rest } from 'msw';
import { kandidatApi, stillingApi } from '../api/api';
import { Respons } from '../kandidater/elasticSearchTyper';
import { Innsatsgruppe } from '../filter/Jobbmuligheter';
import { LagreKandidaterDto } from '../kandidatliste/LagreKandidaterIMineKandidatlisterModal';
import {
    mockMineKandidatlister,
    mockLagringAvKandidaterIKandidatliste,
    mockKandidatliste,
    mockKandidatlisteUtenStilling,
} from './mockKandidatlister';
import { mockStilling } from './mockStilling';
import { FEATURE_TOGGLE_API } from '../hooks/useHarTilgangTilAutomatiskMatching';

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

    rest.get(`${kandidatApi}/veileder/stilling/:stillingsId/kandidatliste`, (req, res, ctx) =>
        res(ctx.json(mockKandidatliste()))
    ),

    rest.get(`${kandidatApi}/veileder/kandidatlister/123`, (req, res, ctx) =>
        res(ctx.json(mockKandidatliste()))
    ),

    rest.get(`${kandidatApi}/veileder/kandidatlister/789`, (req, res, ctx) =>
        res(ctx.json(mockKandidatlisteUtenStilling()))
    ),

    rest.get(`${stillingApi}/rekrutteringsbistandstilling/:stillingsId`, (req, res, ctx) =>
        res(ctx.json(mockStilling))
    ),

    rest.get(
        `${stillingApi}/rekrutteringsbistandstilling/annonsenr/:annonseummer`,
        (req, res, ctx) => res(ctx.json(mockStilling))
    ),

    rest.post(
        `${kandidatApi}/veileder/kandidatlister/:kandidatlisteId/kandidater`,
        async (req, res, ctx) => {
            const lagreKandidaterDto: LagreKandidaterDto = await req.json();

            return res(ctx.json(mockLagringAvKandidaterIKandidatliste(lagreKandidaterDto)));
        }
    ),

    rest.get(`${FEATURE_TOGGLE_API}/kandidatmatch`, async (req, res, ctx) => {
        return res(ctx.json(true));
    }),
];

if (import.meta.env.VITE_MOCK_ES) {
    handlers.push(
        rest.post(`/kandidatsok-proxy`, (req, res, ctx) => {
            const respons: Respons = {
                _shards: {
                    total: 0,
                    failed: 0,
                    skipped: 0,
                    successful: 0,
                },
                took: 23,
                timed_out: false,
                hits: {
                    total: {
                        value: 1,
                        relation: 'eq',
                    },
                    max_score: 1,
                    hits: [
                        {
                            _id: '',
                            _index: '',
                            _score: 1,
                            _type: '',
                            _source: {
                                aktorId: '123',
                                arenaKandidatnr: 'AB123456',
                                fornavn: 'Joar',
                                etternavn: 'Giil',
                                fodselsnummer: '01010101006',
                                geografiJobbonsker: [
                                    {
                                        geografiKodeTekst: 'Geiranger',
                                        geografiKode: '1000',
                                    },
                                ],
                                kvalifiseringsgruppekode: Innsatsgruppe.SituasjonsbestemtInnsats,
                                yrkeJobbonskerObj: [
                                    {
                                        primaertJobbonske: true,
                                        sokeTitler: [],
                                        styrkBeskrivelse: 'Gartner',
                                        styrkKode: '01',
                                    },
                                ],
                            },
                        },
                    ],
                },
            };

            return res(ctx.json(respons));
        })
    );
}
