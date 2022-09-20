import { useEffect } from 'react';
import { Nettressurs } from '../api/Nettressurs';
import { encodeGeografiforslag } from '../filter/jobbønsker/ØnsketSted';
import { Stilling } from './useKontekstAvKandidatliste';
import { FilterParam } from './useRespons';
import useSøkekriterier, { LISTEPARAMETER_SEPARATOR } from './useSøkekriterier';

const useSøkekriterierFraStilling = (stilling: Nettressurs<Stilling>) => {
    const { setSearchParam } = useSøkekriterier();

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

        if (stilling.kind === 'suksess') {
            anvendSøkekriterier(stilling.data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stilling]);
};

export default useSøkekriterierFraStilling;
