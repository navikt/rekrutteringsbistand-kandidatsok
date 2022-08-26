import { useEffect, useState } from 'react';

const useScrollPosition = () => {
    const [scroll, setScroll] = useState<number>(0);

    useEffect(() => {
        const onScroll = () => {
            setScroll(window.scrollY);
        };

        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    });

    return scroll;
};

export default useScrollPosition;
