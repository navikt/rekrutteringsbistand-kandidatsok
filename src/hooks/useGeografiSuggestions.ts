import { useState } from 'react';
import { suggest } from '../api/api';
import { Nettressurs } from '../api/Nettressurs';
import byggSuggestion, { Forslagsfelt } from '../api/query/byggSuggestion';
import useDebouncedEffect from './useDebouncedEffect';

const minimumTekstlengde = 2;

type Geografiforslag = {
    geografiKodeTekst: string;
    geografiKode: string;
};

const useGeografiSuggestions = (prefix: string) => {
    const [suggestions, setSuggestions] = useState<Nettressurs<Geografiforslag[]>>({
        kind: 'ikke-lastet',
    });

    useDebouncedEffect(() => {
        const hentSuggestions = async () => {
            try {
                const respons = await suggest(
                    byggSuggestion(Forslagsfelt.ØnsketSted, prefix, 15, true)
                );
                const forslagRespons = respons.suggest.forslag;

                if (forslagRespons.length === 0) {
                    throw Error('Kunne ikke bruke forslag');
                }

                const forslag = forslagRespons[0].options.map(
                    (option) => option._source as Geografiforslag
                );

                setSuggestions({
                    kind: 'suksess',
                    data: forslag,
                });
            } catch (e) {
                setSuggestions({
                    kind: 'feil',
                    error: e as string,
                });
            }
        };

        if (prefix.length >= minimumTekstlengde) {
            hentSuggestions();
        }
    }, [prefix, setSuggestions]);

    return suggestions;
};

export default useGeografiSuggestions;
