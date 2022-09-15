import { PrioritertMålgruppe } from '../../filter/prioriterte-målgrupper/PrioriterteMålgrupper';
import { rangeQuery } from './supportQueries';
import queryMedHullICven from './queryMedHullICven';

export const queryMedPrioritertMålgruppe = (prioritertMålgruppe: Set<PrioritertMålgruppe>) => {
    if (prioritertMålgruppe.size === 0) {
        return [];
    }

    const queriesForMålgruppe = [];

    if (prioritertMålgruppe.has(PrioritertMålgruppe.UngeUnderTrettiÅr)) {
        queriesForMålgruppe.push(queryAlderUnderTredveÅr());
    }

    if (prioritertMålgruppe.has(PrioritertMålgruppe.SeniorFemtiPluss)) {
        queriesForMålgruppe.push(queryAlderOverFemtiÅr());
    }

    if (prioritertMålgruppe.has(PrioritertMålgruppe.HullICv)) {
        queriesForMålgruppe.push(queryMedHullICven());
    }

    return [
        {
            bool: {
                should: queriesForMålgruppe,
            },
        },
    ];
};

const queryAlderUnderTredveÅr = () =>
    rangeQuery('fodselsdato', {
        gte: 'now/d-30y',
        lt: 'now',
    });

const queryAlderOverFemtiÅr = () =>
    rangeQuery('fodselsdato', {
        gte: 'now-200y/d',
        lt: 'now/d-50y',
    });
