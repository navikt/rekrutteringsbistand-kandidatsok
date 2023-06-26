import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { FilterParam } from '../hooks/useRespons';
import useSøkekriterier, { LISTEPARAMETER_SEPARATOR } from '../hooks/useSøkekriterier';

export enum Mål {
    SkaffeArbeid = 'SKAFFEA',
    BeholdeArbeid = 'BEHOLDEA',
    ØkeDeltagelse = 'OKEDELT',
}

const Hovedmål = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const onChange = (valgteHovedmål: Mål[]) => {
        setSearchParam(FilterParam.Hovedmål, valgteHovedmål.join(LISTEPARAMETER_SEPARATOR));
    };

    return (
        <CheckboxGroup
            hideLegend
            legend="Velg kandidatens hovedmål"
            value={Array.from(søkekriterier.hovedmål)}
            onChange={onChange}
        >
            <Checkbox value={Mål.SkaffeArbeid}>Skaffe arbeid</Checkbox>
            <Checkbox value={Mål.BeholdeArbeid}>Beholde arbeid</Checkbox>
            <Checkbox value={Mål.ØkeDeltagelse}>Øke deltagelse</Checkbox>
        </CheckboxGroup>
    );
};

export default Hovedmål;
