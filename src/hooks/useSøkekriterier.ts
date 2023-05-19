import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Portefølje } from '../filter/porteføljetabs/PorteføljeTabs';
import { FilterParam } from './useRespons';
import { Mål as Hovedmål } from '../filter/Hovedmål';
import { FiltrerbarInnsatsgruppe } from '../filter/Jobbmuligheter';
import { PrioritertMålgruppe } from '../filter/prioriterte-målgrupper/PrioriterteMålgrupper';
import { Nivå as Utdanningsnivå } from '../filter/Utdanningsnivå';
import { Klasse as Førerkortklasse } from '../api/query/queryMedFørerkort';
import { ØktContext } from '../Økt';
import { Sortering } from '../kandidater/sortering/Sortering';

export const LISTEPARAMETER_SEPARATOR = '.';
export const LISTEPARAMETER_SEPARATOR_REPLACEMENT = '·';

export type Søkekriterier = {
    fritekst: string | null;
    portefølje: Portefølje;
    valgtKontor: Set<string>;
    innsatsgruppe: Set<FiltrerbarInnsatsgruppe>;
    side: number;
    ønsketYrke: Set<string>;
    ønsketSted: Set<string>;
    borPåØnsketSted: boolean | null;
    kompetanse: Set<string>;
    førerkort: Set<Førerkortklasse>;
    prioritertMålgruppe: Set<PrioritertMålgruppe>;
    hovedmål: Set<Hovedmål>;
    utdanningsnivå: Set<Utdanningsnivå>;
    arbeidserfaring: Set<string>;
    ferskhet: number | null;
    språk: Set<string>;
    sortering: Sortering;
};

type Returverdi = {
    setSearchParam: (parameter: FilterParam, value: string | null) => void;
    søkekriterier: Søkekriterier;
    fjernSøkekriterier: () => void;
};

const useSøkekriterier = (): Returverdi => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { setØkt } = useContext(ØktContext);
    const [søkekriterier, setSøkekriterier] = useState<Søkekriterier>(
        searchParamsTilSøkekriterier(searchParams)
    );

    useEffect(() => {
        setSøkekriterier(searchParamsTilSøkekriterier(searchParams));

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [searchParams]);

    const setSearchParam = (parameter: FilterParam, value: string | null) => {
        if (value !== null && value.length > 0) {
            searchParams.set(parameter, value);
        } else {
            searchParams.delete(parameter);
        }

        if (parameter !== FilterParam.Side && søkekriterier.side > 1) {
            searchParams.delete(FilterParam.Side);
        }

        setSearchParams(searchParams, {
            replace: true,
        });
    };

    const fjernSøkekriterier = () => {
        Object.values(FilterParam).forEach((key) => searchParams.delete(key));
        setSearchParams(searchParams, {
            replace: true,
        });
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
    valgtKontor: searchParamTilSet(searchParams.get(FilterParam.ValgtKontor)),
    innsatsgruppe: searchParamTilSet(searchParams.get(FilterParam.Innsatsgruppe)),
    side: Number(searchParams.get(FilterParam.Side)) || 1,
    ønsketYrke: searchParamTilSet(searchParams.get(FilterParam.ØnsketYrke)),
    ønsketSted: searchParamTilSet(searchParams.get(FilterParam.ØnsketSted), '_'),
    borPåØnsketSted: searchParamTilBoolean(searchParams.get(FilterParam.BorPåØnsketSted)),
    kompetanse: searchParamTilSet(searchParams.get(FilterParam.Kompetanse)),
    førerkort: searchParamTilSet(searchParams.get(FilterParam.Førerkort)),
    prioritertMålgruppe: searchParamTilSet(searchParams.get(FilterParam.PrioritertMålgruppe)),
    hovedmål: searchParamTilSet(searchParams.get(FilterParam.Hovedmål)),
    utdanningsnivå: searchParamTilSet(searchParams.get(FilterParam.Utdanningsnivå)),
    arbeidserfaring: searchParamTilSet(searchParams.get(FilterParam.Arbeidserfaring)),
    ferskhet: searchParams.get(FilterParam.Ferskhet)
        ? Number(searchParams.get(FilterParam.Ferskhet))
        : null,
    språk: searchParamTilSet(searchParams.get(FilterParam.Språk)),
    sortering: (searchParams.get(FilterParam.Sortering) as Sortering) || Sortering.SisteFørst,
});

function searchParamTilSet<SetType = string>(
    searchParam: string | null,
    separator = LISTEPARAMETER_SEPARATOR
) {
    return new Set(
        splittSearchParamTilStrings(searchParam, separator)
    ) as Set<unknown> as Set<SetType>;
}

function splittSearchParamTilStrings(searchParam: string | null, separator: string) {
    if (searchParam === null) {
        return null;
    }

    return searchParam
        .split(separator)
        .map((verdi) =>
            verdi.replaceAll(LISTEPARAMETER_SEPARATOR_REPLACEMENT, LISTEPARAMETER_SEPARATOR)
        );
}

export function kombinerStringsTilSearchParam(verdier: string[]) {
    const medReplacementChar = verdier.map((verdi) =>
        verdi.replaceAll(LISTEPARAMETER_SEPARATOR, LISTEPARAMETER_SEPARATOR_REPLACEMENT)
    );
    return medReplacementChar.join(LISTEPARAMETER_SEPARATOR);
}

function searchParamTilBoolean(searchParam: string | null) {
    return searchParam ? Boolean(searchParam) : null;
}

export default useSøkekriterier;
