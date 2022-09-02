import { useState } from 'react';
import { suggest } from '../api/api';
import { Nettressurs } from '../api/Nettressurs';
import byggSuggestion, { Forslagsfelt } from '../api/query/byggSuggestion';
import useDebouncedEffect from './useDebouncedEffect';

const useSuggestions = (field: Forslagsfelt, prefix: string) => {
    const [suggestions, setSuggestions] = useState<Nettressurs<string[]>>({
        kind: 'ikke-lastet',
    });

    useDebouncedEffect(() => {
        const hentSuggestions = async () => {
            try {
                const respons = await suggest(byggSuggestion(field, prefix));
                const forslagRespons = respons.suggest.forslag;

                if (forslagRespons.length === 0) {
                    throw Error('Kunne ikke bruke forslag');
                }

                const forslag = forslagRespons[0].options.map((option) => option.text);

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

        if (prefix.length > 2) {
            hentSuggestions();
        }
    }, [field, prefix, setSuggestions]);

    return suggestions;
};

export default useSuggestions;
