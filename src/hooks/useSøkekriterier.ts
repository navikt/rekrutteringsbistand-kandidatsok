import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Portefølje } from '../filter/PorteføljeTabs';
import { FiltrerbarInnsatsgruppe } from '../filter/Jobbmuligheter';
import { FilterParam, Søkekriterier } from './useRespons';
import { useKandidatsøkØkt } from '../Økt';

export const LISTEPARAMETER_SEPARATOR = '.';

type Returverdi = {
    setSearchParam: (parameter: FilterParam, value?: string) => void;
    søkekriterier: Søkekriterier;
    fjernSøkekriterier: () => void;
};

const useSøkekriterier = (): Returverdi => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { setØkt } = useKandidatsøkØkt();
    const [søkekriterier, setSøkekriterier] = useState<Søkekriterier>(
        searchParamsTilSøkekriterier(searchParams)
    );

    useEffect(() => {
        setØkt({
            searchParams: searchParams.toString(),
        });

        setSøkekriterier(searchParamsTilSøkekriterier(searchParams));

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [searchParams]);

    const setSearchParam = (parameter: FilterParam, value?: string) => {
        if (value && value.length > 0) {
            searchParams.set(parameter, value);
        } else {
            searchParams.delete(parameter);
        }

        if (parameter !== FilterParam.Side && søkekriterier.side > 1) {
            searchParams.delete(FilterParam.Side);
        }

        setSearchParams(searchParams);
    };

    const fjernSøkekriterier = () => {
        Object.values(FilterParam).forEach((key) => searchParams.delete(key));
        setSearchParams(searchParams);
    };

    return {
        setSearchParam,
        søkekriterier,
        fjernSøkekriterier,
    };
};

export const searchParamsTilSøkekriterier = (searchParams: URLSearchParams): Søkekriterier => ({
    fritekst: searchParams.get(FilterParam.Fritekst),
    portefølje: (searchParams.get(FilterParam.Portefølje) as Portefølje) || Portefølje.Alle,
    innsatsgruppe: new Set(
        searchParams.get(FilterParam.Innsatsgruppe)?.split(LISTEPARAMETER_SEPARATOR)
    ) as Set<FiltrerbarInnsatsgruppe>,
    side: Number(searchParams.get(FilterParam.Side)) || 1,
    ønsketYrke: searchParams.get(FilterParam.ØnsketYrke),
    ønsketSted: searchParams.get(FilterParam.ØnsketSted),
});

export default useSøkekriterier;
