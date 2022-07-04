export type Nettstatus = 'ikkeLastet' | 'lasterInn' | 'suksess' | 'feil';

type IkkeLastet = {
    kind: 'ikkeLastet';
};

type LasterInn = {
    kind: 'lasterInn';
};

type Suksess<T> = {
    kind: 'suksess';
    data: T;
};

type Feil = {
    kind: 'feil';
    error: string;
};

export type Nettressurs<T> = IkkeLastet | LasterInn | Suksess<T> | Feil;
