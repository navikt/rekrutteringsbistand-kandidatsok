import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Nettressurs } from '../api/Nettressurs';
import { encodeGeografiforslag } from '../filter/jobbønsker/ØnsketSted';
import { Stilling } from './useKontekstAvKandidatliste';
import { FilterParam, OtherParam } from './useRespons';
import useSøkekriterier, { LISTEPARAMETER_SEPARATOR, Søkekriterier } from './useSøkekriterier';

const useSøkekriterierFraStilling = (stilling: Nettressurs<Stilling>) => {
    const { setSearchParam } = useSøkekriterier();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const anvendSøkekriterier = (stilling: Stilling) => {
            const { categoryList: yrkerFraStilling, location: stedFraStilling } = stilling.stilling;

            // TODO: Bare anvend søkekriterier hvis ingen andre filtre er oppgitt
            // TODO: Anvend alle søkekriterier samtidig ved å eksponere hele setSearchParams

            setSearchParam(
                FilterParam.ØnsketYrke,
                yrkerFraStilling.map((s) => s.name).join(LISTEPARAMETER_SEPARATOR)
            );

            const { municipal: geografiKodeTekst, municipalCode: geografiKode } = stedFraStilling;

            if (geografiKodeTekst && geografiKode) {
                setSearchParam(
                    FilterParam.ØnsketSted,
                    encodeGeografiforslag({
                        geografiKode,
                        geografiKodeTekst,
                    })
                );
            }
        };

        if (stilling.kind === 'suksess' && harBareKandidatlisteSearchParam(searchParams)) {
            anvendSøkekriterier(stilling.data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stilling, searchParams]);
};

const harBareKandidatlisteSearchParam = (searchParams: URLSearchParams) => {
    return Array.from(searchParams.keys()).every((param) => param === OtherParam.Kandidatliste);
};

export default useSøkekriterierFraStilling;
