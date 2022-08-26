import { useEffect, useState } from 'react';
import useDebouncedEffect from './useDebouncedEffect';

const useScrollPosition = () => {
    const [scroll, setScroll] = useState<number>(0);
    const [debouncedScroll, setDebouncedScroll] = useState<number>(0);

    useDebouncedEffect(
        () => {
            setDebouncedScroll(scroll);
        },
        [scroll],
        400
    );

    useEffect(() => {
        const onScroll = () => {
            setScroll(window.scrollY);
        };

        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    });

    return debouncedScroll;
};

export default useScrollPosition;
