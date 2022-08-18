export type Nettstatus =
    | 'ikke-lastet'
    | 'laster-inn'
    | 'laster-opp'
    | 'oppdaterer'
    | 'suksess'
    | 'feil';

type IkkeLastet = {
    kind: 'ikke-lastet';
};

type LasterInn = {
    kind: 'laster-inn';
};

type LasterOpp<T> = {
    kind: 'laster-opp';
    data: T;
};

type Suksess<T> = {
    kind: 'suksess';
    data: T;
};

type Oppdaterer<T> = {
    kind: 'oppdaterer';
    data: T;
};

type Feil = {
    kind: 'feil';
    error: string;
};

export type Nettressurs<T> =
    | IkkeLastet
    | LasterInn
    | LasterOpp<T>
    | Suksess<T>
    | Oppdaterer<T>
    | Feil;
