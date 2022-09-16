import { useLayoutEffect } from 'react';

const useOnClickOutside = (onClickOutside: () => void, elementIds: string[]) => {
    useLayoutEffect(() => {
        const elements = elementIds
            .map((id) => document.getElementById(id))
            .filter((element) => element !== null);

        const listener = (event: MouseEvent) => {
            const clickHappenedInsideSomeElement = elements.some((element) =>
                element!.contains(event.target as Node)
            );

            if (clickHappenedInsideSomeElement === false) {
                onClickOutside();
            }
        };

        window.addEventListener('click', listener);

        return () => {
            window.removeEventListener('click', listener);
        };
    }, [elementIds, onClickOutside]);
};

export default useOnClickOutside;
