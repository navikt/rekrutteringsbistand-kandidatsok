import { Stilling } from '../hooks/useKontekstAvKandidatlisteEllerStilling';

export const mockStilling: Stilling = {
    stilling: {
        uuid: '0e56aba6-ec4f-4b20-827a-0e238b5b4a7e',
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
