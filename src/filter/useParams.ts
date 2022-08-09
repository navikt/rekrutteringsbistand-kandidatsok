import { useSearchParams } from 'react-router-dom';

const useParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const setSearchParam = (parameter: string, value?: string) => {
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

    return {
        setSearchParam,
        searchParams: searchParams,
        removeSearchParams,
    };
};

export default useParams;
