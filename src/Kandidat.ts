import { Innsatsgruppe } from './filter/VelgInnsatsgruppe';

export type Kandidat = {
    fodselsnummer: string;
    fornavn: string;
    etternavn: string;
    arenaKandidatnr: string;
    kvalifiseringsgruppekode: Innsatsgruppe;
};
