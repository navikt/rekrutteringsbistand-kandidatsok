import { Forslagsfelt } from '../../api/query/byggSuggestion';
import { FilterParam } from '../../hooks/useRespons';
import useSøkekriterier, { kombinerStringsTilSearchParam } from '../../hooks/useSøkekriterier';
import FilterMedTypeahead from '../FilterMedTypeahead';
import ForslagBasertPåYrke from './ForslagBasertPåYrke';

const Kompetanse = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const setValue = (value: string | null) => {
        setSearchParam(FilterParam.Kompetanse, value);
    };

    const onVelgForslag = (forslag: string) => () => {
        let valgteKompetanser = Array.from(søkekriterier.kompetanse);
        valgteKompetanser.push(forslag);

        setValue(kombinerStringsTilSearchParam(valgteKompetanser));
    };

    return (
        <>
            <FilterMedTypeahead
                label="Kompetanse"
                description="For eksempel fagbrev, sertifisering, ferdigheter eller programmer"
                suggestionField={Forslagsfelt.Kompetanse}
                value={søkekriterier.kompetanse}
                setValue={setValue}
            />
            <ForslagBasertPåYrke søkekriterier={søkekriterier} onVelgForslag={onVelgForslag} />
        </>
    );
};

export default Kompetanse;
