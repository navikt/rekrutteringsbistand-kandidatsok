import { useEffect, useState } from 'react';

export const FEATURE_TOGGLE_API = '/feature-toggle';

export const useHarTilgangTilAutomatiskMatching = () => {
    const [harTilgangTilAutomatiskMatching, setHarTilgangTilAutomatiskMatching] =
        useState<boolean>(false);

    useEffect(() => {
        const hentFeatureToggle = async () => {
            try {
                const response = await fetch(`${FEATURE_TOGGLE_API}/kandidatmatch`);
                const erEnabled: boolean = await response.json();

                setHarTilgangTilAutomatiskMatching(erEnabled);
            } catch (e) {
                console.error('Klarte ikke å hente feature toggle:', e);
            }
        };

        hentFeatureToggle();
    }, []);

    return harTilgangTilAutomatiskMatching;
};
