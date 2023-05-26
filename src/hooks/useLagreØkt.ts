import React, { useContext, useEffect } from 'react';
import useSøkekriterier from './useSøkekriterier';
import { useSearchParams } from 'react-router-dom';
import { ØktContext } from '../Økt';
import { Respons, SearchQuery } from '../kandidater/elasticSearchTyper';
import { PAGE_SIZE, byggQuery } from '../api/query/byggQuery';
import { InnloggetBruker } from './useBrukerensIdent';
import { søk } from '../api/api';

const maksAntallNavigerbareKandidater = 500;

const useLagreØkt = (innloggetBruker: InnloggetBruker) => {
    const { søkekriterier } = useSøkekriterier();
    const { setØkt } = useContext(ØktContext);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        const lagreØkt = (respons: Respons) => {
            setØkt({
                searchParams: searchParams.toString(),
                navigerbareKandidater: respons.hits.hits.map((hit) => hit._id),
                totaltAntallKandidater: respons.hits.total.value,
                pageSize: PAGE_SIZE,
            });
        };

        const hentKandidatnumreForNavigering = async () => {
            const from = Math.max(
                0,
                søkekriterier.side * PAGE_SIZE - maksAntallNavigerbareKandidater / 2
            );
            const size = maksAntallNavigerbareKandidater;

            const query = byggQuery(søkekriterier, innloggetBruker);
            const queryNavigerbareKandidater: SearchQuery = {
                ...query,
                from,
                size,
                _source: false,
            };

            try {
                const respons = await søk(queryNavigerbareKandidater);
                lagreØkt(respons);
            } catch (e) {
                console.error('Klarte ikke å hente navigerbare kandidater:', e);
            }
        };

        if (innloggetBruker.navKontor !== null) {
            hentKandidatnumreForNavigering();
        }
    }, [søkekriterier.side, innloggetBruker]);
};

export default useLagreØkt;
