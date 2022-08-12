import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Portefølje } from '../filter/PorteføljeTabs';
import { Innsatsgruppe } from '../filter/VelgInnsatsgruppe';
import { Param, Søkekriterier } from './useRespons';

export const LISTEPARAMETER_SEPARATOR = '.';

type Returverdi = {
    setSearchParam: (parameter: Param, value?: string) => void;
    søkekriterier: Søkekriterier;
    fjernSøkekriterier: () => void;
};

const useSøkekriterier = (): Returverdi => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [søkekriterier, setSøkekriterier] = useState<Søkekriterier>(
        searchParamsTilSøkekriterier(searchParams)
    );

    useEffect(() => {
        setSøkekriterier(searchParamsTilSøkekriterier(searchParams));
    }, [searchParams]);

    const setSearchParam = (parameter: Param, value?: string) => {
        if (value && value.length > 0) {
            searchParams.set(parameter, value);
        } else {
            searchParams.delete(parameter);
        }

        setSearchParams(searchParams);
    };

    const fjernSøkekriterier = () => {
        setSearchParams({});
    };

    return {
        setSearchParam,
        søkekriterier,
        fjernSøkekriterier,
    };
};

const searchParamsTilSøkekriterier = (searchParams: URLSearchParams): Søkekriterier => ({
    fritekst: searchParams.get(Param.Fritekst),
    portefølje: (searchParams.get(Param.Portefølje) as Portefølje) || Portefølje.Alle,
    innsatsgruppe: new Set(
        searchParams.get(Param.Innsatsgruppe)?.split(LISTEPARAMETER_SEPARATOR)
    ) as Set<Innsatsgruppe>,
    side: Number(searchParams.get(Param.Side)) || 1,
});

export default useSøkekriterier;
