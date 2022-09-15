export enum Miljø {
    Lokalt,
    DevGcp,
    ProdGcp,
}

export const hentMiljø = (): Miljø => {
    const { href } = window.location;

    if (href.includes('dev.intern.nav.no')) {
        return Miljø.DevGcp;
    } else if (href.includes('intern.nav.no')) {
        return Miljø.ProdGcp;
    } else {
        return Miljø.Lokalt;
    }
};

export const erIkkeProd = hentMiljø() !== Miljø.ProdGcp;

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
