import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Portefølje } from '../filter/porteføljetabs/PorteføljeTabs';
import { FilterParam } from './useRespons';
import { Mål as Hovedmål } from '../filter/Hovedmål';
import { FiltrerbarInnsatsgruppe } from '../filter/Jobbmuligheter';
import { PrioritertMålgruppe } from '../filter/prioriterte-målgrupper/PrioriterteMålgrupper';
import { Behovskategori } from '../filter/tilretteleggingsbehov/VelgBehovskategorier';
import { Nivå as Utdanningsnivå } from '../filter/Utdanningsnivå';
import { Klasse as Førerkortklasse } from '../api/query/queryMedFørerkort';
import { ØktContext } from '../Økt';

export const LISTEPARAMETER_SEPARATOR = '.';

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
    harTilretteleggingsbehov: boolean | null;
    behovskategori: Set<Behovskategori>;
    hovedmål: Set<Hovedmål>;
    utdanningsnivå: Set<Utdanningsnivå>;
    arbeidserfaring: Set<string>;
    ferskhet: number | null;
    språk: Set<string>;
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
        setØkt({
            searchParams: searchParams.toString(),
        });

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
    harTilretteleggingsbehov: searchParamTilBoolean(
        searchParams.get(FilterParam.HarTilretteleggingsbehov)
    ),
    behovskategori: searchParamTilSet(searchParams.get(FilterParam.Behovskategori)),
    hovedmål: searchParamTilSet(searchParams.get(FilterParam.Hovedmål)),
    utdanningsnivå: searchParamTilSet(searchParams.get(FilterParam.Utdanningsnivå)),
    arbeidserfaring: searchParamTilSet(searchParams.get(FilterParam.Arbeidserfaring)),
    ferskhet: searchParams.get(FilterParam.Ferskhet)
        ? Number(searchParams.get(FilterParam.Ferskhet))
        : null,
    språk: searchParamTilSet(searchParams.get(FilterParam.Språk)),
});

function searchParamTilSet<SetType = string>(
    searchParam: string | null,
    separator = LISTEPARAMETER_SEPARATOR
) {
    return new Set(searchParam?.split(separator)) as Set<unknown> as Set<SetType>;
}

function searchParamTilBoolean(searchParam: string | null) {
    return searchParam ? Boolean(searchParam) : null;
}

export default useSøkekriterier;
