import { rest } from 'msw';

export const handlers = [
    rest.get('/meg', (req, res, ctx) =>
        res(
            ctx.json({
                navIdent: 'zz',
            })
        )
    ),
];
