export const storForbokstav = (s: string) => {
    if (s.length === 0) {
        return s;
    }

    const ord = s.split(' ');
    return ord
        .map((o) => (o.length === 0 ? o : o[0].toUpperCase() + o.substring(1).toLowerCase()))
        .join(' ');
};

export const lenkeTilKandidat = (kandidatnr: string) => `/kandidater/kandidat/${kandidatnr}/cv`;
export const lenkeTilStilling = (stillingsId: string) => `/stillinger/stilling/${stillingsId}`;
export const lenkeTilKandidatliste = (kandidatlisteId: string) =>
    `/kandidater/lister/detaljer/${kandidatlisteId}`;
