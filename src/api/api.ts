import {
    SearchQuery,
    Respons,
    SuggestQuery,
    SuggestionRespons,
    FuzzySuggestQuery,
    FuzzySuggestionRespons,
} from '../kandidater/elasticSearchTyper';
import { Kandidatliste, Stilling } from '../hooks/useKontekstAvKandidatliste';
import { LagreKandidaterDto } from '../kandidatliste/LagreKandidaterIMineKandidatlisterModal';
import { MineKandidatlister } from '../kandidatliste/useMineKandidatlister';

const kandidatsøkProxy = `/kandidatsok-proxy`;
export const kandidatApi = '/kandidat-api';
export const stillingApi = '/stilling-api';

export const søk = async (query: SearchQuery): Promise<Respons> => {
    const respons = await post(kandidatsøkProxy, query);

    return parseJsonEllerKastFeil(respons, 'Klarte ikke å søke');
};

export const suggest = async (query: SuggestQuery): Promise<SuggestionRespons> => {
    const respons = await post(kandidatsøkProxy, query);

    return parseJsonEllerKastFeil(respons, 'Klarte ikke å hente suggestions');
};

export const fuzzySuggest = async (query: FuzzySuggestQuery): Promise<FuzzySuggestionRespons> => {
    const respons = await post(kandidatsøkProxy, query);

    return parseJsonEllerKastFeil(respons, 'Klarte ikke å hente fuzzy suggestions');
};

export const hentMineKandidatlister = async (
    side: number,
    pageSize: number
): Promise<MineKandidatlister> => {
    const respons = await get(
        `${kandidatApi}/veileder/kandidatlister?kunEgne=true&status=ÅPEN&pagesize=${pageSize}${
            side > 1 ? `&pagenumber=${side - 1}` : ''
        }`
    );

    return parseJsonEllerKastFeil(respons, 'Klarte ikke å hente mine kandidatlister');
};

export const hentKandidatlisteMedAnnonsenummer = async (
    annonsenummer: string
): Promise<Kandidatliste> => {
    const respons = await get(
        `${kandidatApi}/veileder/stilling/byNr/${annonsenummer}/kandidatliste`
    );

    return parseJsonEllerKastFeil(
        respons,
        `Fant ikke kandidatliste med annonsenummer ${annonsenummer}`
    );
};

export const hentKandidatliste = async (kandidatlisteId: string): Promise<Kandidatliste> => {
    const respons = await get(`${kandidatApi}/veileder/kandidatlister/${kandidatlisteId}`);

    return parseJsonEllerKastFeil(respons, `Fant ikke kandidatliste med id ${kandidatlisteId}`);
};

export const hentStilling = async (stillingsId: string): Promise<Stilling> => {
    const respons = await get(`${stillingApi}/rekrutteringsbistandstilling/${stillingsId}`);

    return parseJsonEllerKastFeil(respons, `Fant ikke kandidatliste med id ${stillingsId}`);
};

export const lagreKandidaterIValgteKandidatlister = async (
    lagreKandidaterDto: LagreKandidaterDto,
    kandidatlister: string[]
): Promise<Kandidatliste[]> => {
    return Promise.all(
        kandidatlister.map((kandidatlisteId) =>
            lagreKandidaterIKandidatliste(lagreKandidaterDto, kandidatlisteId)
        )
    );
};

export const lagreKandidaterIKandidatliste = async (
    lagreKandidaterDto: LagreKandidaterDto,
    kandidatlisteId: string
): Promise<Kandidatliste> => {
    const respons = await post(
        `${kandidatApi}/veileder/kandidatlister/${kandidatlisteId}/kandidater`,
        lagreKandidaterDto
    );

    return parseJsonEllerKastFeil(
        respons,
        `Klarte ikke å lagre kandidater i kandidatliste ${kandidatlisteId}`
    );
};

const parseJsonEllerKastFeil = async (respons: Response, feil: string) => {
    if (respons.ok) {
        return await respons.json();
    } else if (respons.status === 401) {
        videresendTilInnlogging();
        throw new Error('Er ikke logget inn');
    } else {
        throw respons;
    }
};

export const post = (url: string, body: object) =>
    fetch(url, {
        body: JSON.stringify(body),
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

export const get = (url: string) =>
    fetch(url, {
        method: 'GET',
        credentials: 'include',
    });

const videresendTilInnlogging = () => {
    window.location.href = `/oauth2/login?redirect=${window.location.pathname}`;
};
