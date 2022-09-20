import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Nettressurs } from '../api/Nettressurs';
import { encodeGeografiforslag } from '../filter/jobbønsker/ØnsketSted';
import { Stilling } from './useKontekstAvKandidatliste';
import { FilterParam, OtherParam } from './useRespons';
import useSøkekriterier, { LISTEPARAMETER_SEPARATOR } from './useSøkekriterier';

const useSøkekriterierFraStilling = (stilling: Nettressurs<Stilling>) => {
    const { setSearchParam } = useSøkekriterier();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const anvendSøkekriterier = (stilling: Stilling) => {
            const yrkerFraStilling = hentØnsketYrkeFraStilling(stilling);
            setSearchParam(FilterParam.ØnsketYrke, yrkerFraStilling);

            const stedFraStilling = hentØnsketStedFraStilling(stilling);
            if (stedFraStilling) {
                setSearchParam(FilterParam.ØnsketSted, stedFraStilling);
            }
        };

        if (stilling.kind === 'suksess' && kandidatlisteErEnesteSearchParam(searchParams)) {
            anvendSøkekriterier(stilling.data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stilling]);
};

const hentØnsketYrkeFraStilling = (stilling: Stilling) => {
    const { categoryList } = stilling.stilling;
    return categoryList.map((s) => s.name).join(LISTEPARAMETER_SEPARATOR);
};

const hentØnsketStedFraStilling = (stilling: Stilling): string | null => {
    const { location } = stilling.stilling;
    const { municipal, municipalCode } = location;

    if (municipal && municipalCode) {
        const kommunekode = `NO${municipalCode?.slice(0, 2)}.${municipalCode}`;

        return encodeGeografiforslag({
            geografiKode: kommunekode,
            geografiKodeTekst: formaterStedsnavnSlikDetErRegistrertPåKandidat(municipal),
        });
    } else {
        return null;
    }
};

const kandidatlisteErEnesteSearchParam = (searchParams: URLSearchParams) =>
    Array.from(searchParams.keys()).every((param) => param === OtherParam.Kandidatliste);

const formaterStedsnavnSlikDetErRegistrertPåKandidat = (stedsnavn: string) =>
    stedsnavn
        .split(' ')
        .map((s) => (s !== 'i' ? s.charAt(0).toUpperCase() + s.substring(1).toLowerCase() : s))
        .join(' ');

export default useSøkekriterierFraStilling;
