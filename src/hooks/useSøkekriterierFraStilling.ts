import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { suggest } from '../api/api';
import { Nettressurs } from '../api/Nettressurs';
import byggSuggestion, { Forslagsfelt } from '../api/query/byggSuggestion';
import { encodeGeografiforslag } from '../filter/jobbønsker/ØnsketSted';
import { Geografiforslag } from './useGeografiSuggestions';
import { Stilling } from './useKontekstAvKandidatliste';
import { FilterParam, OtherParam } from './useRespons';
import useSøkekriterier, { LISTEPARAMETER_SEPARATOR } from './useSøkekriterier';

const useSøkekriterierFraStilling = (stilling: Nettressurs<Stilling>) => {
    const { setSearchParam } = useSøkekriterier();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const anvendSøkekriterier = async (stilling: Stilling) => {
            const yrkerFraStilling = hentØnsketYrkeFraStilling(stilling);
            setSearchParam(FilterParam.ØnsketYrke, yrkerFraStilling);

            const stedFraStilling = await hentØnsketStedFraStilling(stilling);
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
    return categoryList
        .filter(
            (category) =>
                category.categoryType === 'STYRK08' || category.categoryType === 'STYRK08NAV'
        )
        .map((category) => category.name)
        .join(LISTEPARAMETER_SEPARATOR);
};

const hentØnsketStedFraStilling = async (stilling: Stilling): Promise<string | null> => {
    const { location } = stilling.stilling;
    const { municipal, municipalCode, county } = location;

    if (municipal && municipalCode) {
        const kommunekode = `NO${municipalCode?.slice(0, 2)}.${municipalCode}`;

        return encodeGeografiforslag({
            geografiKode: kommunekode,
            geografiKodeTekst: formaterStedsnavnSlikDetErRegistrertPåKandidat(municipal),
        });
    } else if (county) {
        const fylkeFraEs = await hentFylkeskodeMedFylkesnavn(county);

        if (fylkeFraEs) {
            const { geografiKode, geografiKodeTekst } = fylkeFraEs;

            return encodeGeografiforslag({
                geografiKode,
                geografiKodeTekst,
            });
        } else {
            return null;
        }
    } else {
        return null;
    }
};

const hentFylkeskodeMedFylkesnavn = async (
    fylkesnavn: string
): Promise<Geografiforslag | undefined> => {
    const respons = await suggest(byggSuggestion(Forslagsfelt.ØnsketSted, fylkesnavn, 20, true));
    const forslag = respons.suggest.forslag[0].options.find(
        (option) => option.text.toLowerCase() === fylkesnavn.toLowerCase()
    );

    return forslag?._source as Geografiforslag;
};

const kandidatlisteErEnesteSearchParam = (searchParams: URLSearchParams) =>
    Array.from(searchParams.keys()).every((param) => param === OtherParam.Kandidatliste);

const formaterStedsnavnSlikDetErRegistrertPåKandidat = (stedsnavn: string) =>
    stedsnavn
        .split(' ')
        .map((s) => (s !== 'i' ? s.charAt(0).toUpperCase() + s.substring(1).toLowerCase() : s))
        .join(' ');

export default useSøkekriterierFraStilling;
