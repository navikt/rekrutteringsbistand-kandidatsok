import { Kandidat } from '../Kandidat';
import { LagreKandidaterDto } from '../kandidatliste/LagreKandidaterModal';
import { MineKandidatlister } from '../kandidatliste/VelgKandidatlister';

export const mockMineKandidatlister: MineKandidatlister = {
    liste: [
        {
            kandidatlisteId: 'dc6282ed-a6a1-4009-888c-997e3b2f4f0d',
            tittel: 'Parykkmaker søkes',
            organisasjonNavn: null,
            antallKandidater: 1,
            kandidater: [{ arenaKandidatnr: 'PAM019ggtqmck' } as Kandidat],
        },
        {
            kandidatlisteId: 'dc6282eb-a6a1-4009-888c-997e3b2f4f0d',
            tittel: 'Labrotte til ymse eksperimenter',
            organisasjonNavn: 'Aperture Science',
            antallKandidater: 1,
            kandidater: [{ arenaKandidatnr: 'AB123456' } as Kandidat],
        },
    ],
    antall: 2,
};

export const mockLagringAvKandidaterIKandidatliste = (
    lagreKandidaterDto: LagreKandidaterDto,
    kandidatlisteId: string
): MineKandidatlister => {
    const lister = mockMineKandidatlister;

    return {
        antall: lister.antall,
        liste: lister.liste.map((liste) => {
            const dtoSomKandidater = lagreKandidaterDto.map(
                (lagretKandidat) =>
                    ({
                        arenaKandidatnr: lagretKandidat.kandidatnr,
                    } as Kandidat)
            );

            if (liste.kandidatlisteId === kandidatlisteId) {
                return {
                    ...liste,
                    antallKandidater: liste.antallKandidater + lagreKandidaterDto.length,
                    kandidater: [...liste.kandidater, ...dtoSomKandidater],
                };
            } else {
                return liste;
            }
        }),
    };
};
