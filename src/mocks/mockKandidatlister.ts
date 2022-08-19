import { LagreKandidaterDto } from '../kandidatliste/LagreKandidaterModal';
import { MineKandidatlister } from '../kandidatliste/VelgKandidatlister';

export const mockMineKandidatlister: MineKandidatlister = {
    liste: [
        {
            kandidatlisteId: 'dc6282ed-a6a1-4009-888c-997e3b2f4f0d',
            tittel: 'Vil du bli med å skape møbel- og interiør bransjens beste kundeopplevelser? (1 kandidater)',
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
): MineKandidatlister => {
    const lister = mockMineKandidatlister;

    return {
        antall: lister.antall,
        liste: lister.liste.map((liste) => {
            if (liste.kandidatlisteId === kandidatlisteId) {
                return {
                    ...liste,
                    antallKandidater: liste.antallKandidater + lagreKandidaterDto.length,
                };
            } else {
                return liste;
            }
        }),
    };
};
