import { Innsatsgruppe } from './filter/Jobbmuligheter';

export type Kandidat = {
    fodselsnummer: string;
    fornavn: string;
    etternavn: string;
    arenaKandidatnr: string;
    kvalifiseringsgruppekode: Innsatsgruppe;
};
