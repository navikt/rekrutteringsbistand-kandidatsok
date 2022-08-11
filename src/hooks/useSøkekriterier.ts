import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Portefølje } from '../filter/PorteføljeTabs';
import { Param, Søkekriterier } from './useRespons';

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
    side: Number(searchParams.get(Param.Side)) || 1,
});

export default useSøkekriterier;
