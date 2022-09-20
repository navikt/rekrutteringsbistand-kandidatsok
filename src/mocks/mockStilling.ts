import { Stilling } from '../hooks/useKontekstAvKandidatliste';

export const mockStilling: Stilling = {
    stilling: {
        categoryList: [
            {
                categoryType: 'STYRK08',
                name: 'Kokk',
            },
        ],
        location: {
            municipalCode: null,
            municipal: null,
            postalCode: null,
            county: 'NORDLAND',
        },
    },
};
