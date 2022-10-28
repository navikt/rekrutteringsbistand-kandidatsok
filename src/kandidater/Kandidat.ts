import { Innsatsgruppe } from '../filter/Jobbmuligheter';

export type Kandidat = {
    fodselsnummer: string;
    aktorId: string;
    fornavn: string;
    etternavn: string;
    arenaKandidatnr: string;
    kvalifiseringsgruppekode: Innsatsgruppe;
    yrkeJobbonskerObj: Jobbønske[];
    geografiJobbonsker: JobbønskeSted[];
};

type Jobbønske = {
    styrkKode: string | null;
    styrkBeskrivelse: string;
    sokeTitler: string[];
    primaertJobbonske: boolean;
};

type JobbønskeSted = {
    geografiKodeTekst: string;
    geografiKode: string;
};
