export type RangeQuery = {
    gt?: string | number;
    gte?: string | number;
    lt?: string | number;
    lte?: string | number;
    boost?: number;
    relation?: 'INTERSECTS' | 'CONTAINS' | 'WITHIN';
};

export const rangeQuery = (field: string, range: RangeQuery) => {
    return {
        range: {
            [field]: range,
        },
    };
};

export const nestedExistsQuery = (field: string) => ({
    nested: {
        path: field,
        query: {
            bool: {
                must: [
                    {
                        exists: {
                            field,
                        },
                    },
                ],
            },
        },
    },
});

export const existsQuery = (field: string) => ({
    exists: {
        field,
    },
});
