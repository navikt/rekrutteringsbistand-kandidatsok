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
            const { categoryList: yrkerFraStilling, location: stedFraStilling } = stilling.stilling;

            setSearchParam(
                FilterParam.ØnsketYrke,
                yrkerFraStilling.map((s) => s.name).join(LISTEPARAMETER_SEPARATOR)
            );

            const { municipal, municipalCode } = stedFraStilling;
            if (municipal && municipalCode) {
                const kommunekode = `NO${municipalCode?.slice(0, 2)}.${municipalCode}`;

                setSearchParam(
                    FilterParam.ØnsketSted,
                    encodeGeografiforslag({
                        geografiKode: kommunekode,
                        geografiKodeTekst:
                            formaterStedsnavnSlikDetErRegistrertPåKandidat(municipal),
                    })
                );
            }
        };

        if (stilling.kind === 'suksess' && kandidatlisteErEnesteSearchParam(searchParams)) {
            anvendSøkekriterier(stilling.data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stilling]);
};

const kandidatlisteErEnesteSearchParam = (searchParams: URLSearchParams) =>
    Array.from(searchParams.keys()).every((param) => param === OtherParam.Kandidatliste);

const formaterStedsnavnSlikDetErRegistrertPåKandidat = (stedsnavn: string) =>
    stedsnavn
        .split(' ')
        .map((s) => (s !== 'i' ? s.charAt(0).toUpperCase() + s.substring(1).toLowerCase() : s))
        .join(' ');

export default useSøkekriterierFraStilling;
