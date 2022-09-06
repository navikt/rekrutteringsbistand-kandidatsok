import { format, subYears } from 'date-fns';
import { existsQuery, nestedExistsQuery, rangeQuery } from './supportQueries';

const idag = new Date();
const datoformat = 'yyyy-MM-dd';
const toÅrSiden = format(subYears(idag, 2), datoformat);
const treÅrSiden = format(subYears(idag, 3), datoformat);

enum PeriodeMedInaktivitet {
    StartdatoForInneværendeInaktivePeriode = 'perioderMedInaktivitet.startdatoForInnevarendeInaktivePeriode',
    SluttdatoerForInaktivePerioderPåToEllerMer = 'perioderMedInaktivitet.sluttdatoerForInaktivePerioderPaToArEllerMer',
}

const queryMedHullICven = () => {
    const harFyltUtAlleFelterICv = {
        bool: {
            should: [
                nestedExistsQuery('yrkeserfaring'),
                nestedExistsQuery('utdanning'),
                nestedExistsQuery('forerkort'),
                existsQuery('kursObj'),
                existsQuery('fagdokumentasjon'),
                existsQuery('annenerfaringObj'),
                existsQuery('godkjenninger'),
            ],
        },
    };

    const aldriVærtIAktivitet = {
        bool: {
            must_not: [
                existsQuery(PeriodeMedInaktivitet.StartdatoForInneværendeInaktivePeriode),
                existsQuery(PeriodeMedInaktivitet.SluttdatoerForInaktivePerioderPåToEllerMer),
            ],
        },
    };

    const erInaktivOgHarHull = {
        bool: {
            must: [
                existsQuery(PeriodeMedInaktivitet.StartdatoForInneværendeInaktivePeriode),
                {
                    bool: {
                        should: [
                            rangeQuery(
                                PeriodeMedInaktivitet.StartdatoForInneværendeInaktivePeriode,
                                {
                                    lte: toÅrSiden,
                                }
                            ),
                            rangeQuery(
                                PeriodeMedInaktivitet.SluttdatoerForInaktivePerioderPåToEllerMer,
                                {
                                    gte: treÅrSiden,
                                }
                            ),
                        ],
                    },
                },
            ],
        },
    };

    return {
        bool: {
            must: [
                harFyltUtAlleFelterICv,
                {
                    bool: {
                        should: [aldriVærtIAktivitet, erInaktivOgHarHull],
                    },
                },
            ],
        },
    };
};

export default queryMedHullICven;
