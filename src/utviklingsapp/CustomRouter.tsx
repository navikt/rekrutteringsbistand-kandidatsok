import { ReactNode, FunctionComponent, useState, useLayoutEffect } from 'react';
import { Router } from 'react-router-dom';
import { History } from 'history';

type CustomRouterProps = {
    history: History;
    children: ReactNode;
};

const CustomRouter: FunctionComponent<CustomRouterProps> = ({ history, children }) => {
    const [state, setState] = useState({
        action: history.action,
        location: history.location,
    });

    useLayoutEffect(() => history.listen(setState), [history]);

    return (
        <Router
            children={children}
            location={state.location}
            navigationType={state.action}
            navigator={history}
        />
    );
};

export default CustomRouter;
