import { useSearchParams } from 'react-router-dom';
import { Param, Params } from './useRespons';

type ParamsHook = {
    setSearchParam: (parameter: Param, value?: string) => void;
    searchParams: Params;
    removeSearchParams: () => void;
};

const useParams = (): ParamsHook => {
    const [searchParams, setSearchParams] = useSearchParams();

    const setSearchParam = (parameter: Param, value?: string) => {
        let newSearchParam = {};
        if (value && value.length > 0) {
            newSearchParam = {
                [parameter]: value,
            };
        }

        setSearchParams({
            ...searchParams,
            ...newSearchParam,
        });
    };

    const removeSearchParams = () => {
        setSearchParams({});
    };

    const allParams = Object.fromEntries(searchParams.entries());

    return {
        setSearchParam,
        searchParams: allParams,
        removeSearchParams,
    };
};

export default useParams;
