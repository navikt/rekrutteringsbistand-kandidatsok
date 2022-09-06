import { PrioritertMålgruppe } from '../../filter/prioriterte-målgrupper/PrioriterteMålgrupper';

type RangeQuery = {
    gt?: string | number;
    gte?: string | number;
    lt?: string | number;
    lte?: string | number;
    boost?: number;
    relation?: 'INTERSECTS' | 'CONTAINS' | 'WITHIN';
};

const queryMedPrioritertMålgruppe = (prioritertMålgruppe: Set<PrioritertMålgruppe>) => {
    if (prioritertMålgruppe.size === 0) {
        return [];
    }

    const subQueries = [];

    if (prioritertMålgruppe.has(PrioritertMålgruppe.UngeUnderTrettiÅr)) {
        subQueries.push(
            queryMedAldersspenn({
                gte: 'now/d-30y',
                lt: 'now',
            })
        );
    }

    if (prioritertMålgruppe.has(PrioritertMålgruppe.SeniorFemtiPluss)) {
        subQueries.push(
            queryMedAldersspenn({
                gte: 'now-200y/d',
                lt: 'now/d-50y',
            })
        );
    }

    return [
        {
            bool: {
                should: subQueries,
            },
        },
    ];
};

const queryMedAldersspenn = (range: RangeQuery) => {
    return rangeQuery('fodselsdato', range);
};

const rangeQuery = (field: string, range: RangeQuery) => {
    return {
        range: {
            [field]: range,
        },
    };
};

export default queryMedPrioritertMålgruppe;
