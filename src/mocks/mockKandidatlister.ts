import { Kandidat } from '../Kandidat';
import { Kandidatliste, LagreKandidaterDto } from '../kandidatliste/LagreKandidaterModal';
import { MineKandidatlister } from '../kandidatliste/useMineKandidatlister';

export const mockMineKandidatlister: MineKandidatlister = {
    liste: [
        {
            kandidatlisteId: 'dc6282ed-a6a1-4009-888c-997e3b2f4f0d',
            tittel: 'Vil du bli med å skape møbel- og interiør bransjens beste kundeopplevelser?',
            organisasjonNavn: null,
            antallKandidater: 1,
        },
        {
            kandidatlisteId: 'dc6282eb-a6a1-4009-888c-997e3b2f4f0a',
            tittel: 'Labrotte til ymse eksperimenter',
            organisasjonNavn: 'Aperture Science',
            antallKandidater: 1,
        },
    ],
    antall: 32,
};

export const mockLagringAvKandidaterIKandidatliste = (
    lagreKandidaterDto: LagreKandidaterDto,
    kandidatlisteId: string
): Kandidatliste => {
    const oppdatertListe = mockMineKandidatlister.liste.find(
        (liste) => liste.kandidatlisteId === kandidatlisteId
    )!;

    return {
        ...oppdatertListe,
        antallKandidater: oppdatertListe.antallKandidater + lagreKandidaterDto.length,
        kandidater: [
            ...lagreKandidaterDto.map((k) => ({ arenaKandidatnr: k.kandidatnr } as Kandidat)),
        ],
    };
};
