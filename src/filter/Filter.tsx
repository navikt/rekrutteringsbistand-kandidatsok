import Arbeidserfaring from './Arbeidserfaring';
import Filtergruppe from './Filtergruppe';
import Fritekstsøk from './Fritekstsøk';
import Førerkort from './Førerkort';
import Hovedmål from './Hovedmål';
import Jobbmuligheter from './Jobbmuligheter';
import BorPåØnsketSted from './jobbønsker/BorPåØnsketSted';
import ØnsketSted from './jobbønsker/ØnsketSted';
import ØnsketYrke from './jobbønsker/ØnsketYrke';
import Kompetanse from './kompetanse/Kompetanse';
import PrioriterteMålgrupper from './prioriterte-målgrupper/PrioriterteMålgrupper';
import Språk from './Språk';
import Utdanningsnivå from './Utdanningsnivå';

const Filter = () => {
    return (
        <>
            <Fritekstsøk />
            <Filtergruppe tittel="Jobbønske">
                <ØnsketYrke />
                <ØnsketSted />
                <BorPåØnsketSted />
            </Filtergruppe>
            <Filtergruppe tittel="Jobbmuligheter">
                <Jobbmuligheter />
            </Filtergruppe>
            <Filtergruppe tittel="Hovedmål">
                <Hovedmål />
            </Filtergruppe>
            <Filtergruppe tittel="Krav til kandidaten">
                <Kompetanse />
                <Førerkort />
                <Språk />
                <Arbeidserfaring />
                <Utdanningsnivå />
            </Filtergruppe>
            <Filtergruppe tittel="Prioriterte målgrupper">
                <PrioriterteMålgrupper />
            </Filtergruppe>
        </>
    );
};

export default Filter;
