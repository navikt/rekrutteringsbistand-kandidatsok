import { setupWorker } from 'msw';
import { handlers } from './handlers';

export const setupMock = () => {
    const worker = setupWorker(...handlers);

    worker.start({
        onUnhandledRequest: 'bypass',
    });
};
