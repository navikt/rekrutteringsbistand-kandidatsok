import { Innsatsgruppe } from './filter/Jobbmuligheter';

export type Kandidat = {
    fodselsnummer: string;
    fornavn: string;
    etternavn: string;
    arenaKandidatnr: string;
    kvalifiseringsgruppekode: Innsatsgruppe;
    yrkeJobbonskerObj: Jobbønske[];
};

type Jobbønske = {
    styrkKode: string | null;
    styrkBeskrivelse: string;
    sokeTitler: string[];
    primaertJobbonske: boolean;
};
