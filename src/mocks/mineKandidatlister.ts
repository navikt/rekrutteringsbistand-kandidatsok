import { Kandidat } from '../Kandidat';
import { MineKandidatlister } from '../kandidatliste/LagreKandidaterModal';

export const mineKandidatlister: MineKandidatlister = {
    liste: [
        {
            kandidatlisteId: 'dc6282ed-a6a1-4009-888c-997e3b2f4f0d',
            tittel: 'Parykkmaker søkes',
            organisasjonNavn: null,
            antallKandidater: 0,
            kandidater: [{ arenaKandidatnr: 'AB123456' } as Kandidat],
        },
        {
            kandidatlisteId: 'dc6282eb-a6a1-4009-888c-997e3b2f4f0d',
            tittel: 'Labrotte til ymse eksperimenter',
            organisasjonNavn: 'Aperture Science',
            antallKandidater: 2,
            kandidater: [{ arenaKandidatnr: 'AB123456' } as Kandidat],
        },
    ],
    antall: 3,
};
