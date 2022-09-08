export const erIkkeProd =
    window.location.href.includes('dev.intern.nav.no') ||
    window.location.href.includes('localhost');

export const storForbokstav = (s: string) => {
    if (s.length === 0) {
        return s;
    }

    const ord = s.split(' ');
    return ord
        .map((o) => (o.length === 0 ? o : o[0].toUpperCase() + o.substring(1).toLowerCase()))
        .join(' ');
};

export const formaterStortTall = (n: number) => n.toLocaleString('nb-NO');

export const lenkeTilKandidat = (kandidatnr: string, kandidatlisteId?: string) => {
    let lenke = `/kandidater/kandidat/${kandidatnr}/cv?fraNyttKandidatsok=true`;

    if (kandidatlisteId) {
        lenke += `&kandidatlisteId=${kandidatlisteId}`;
    }

    return lenke;
};

export const lenkeTilStilling = (stillingsId: string) => `/stillinger/stilling/${stillingsId}`;
export const lenkeTilKandidatliste = (kandidatlisteId: string) =>
    `/kandidater/lister/detaljer/${kandidatlisteId}`;
