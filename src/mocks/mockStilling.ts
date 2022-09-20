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
            municipalCode: '1804',
            municipal: 'Bodø',
            postalCode: null,
        },
    },
};
