export type Nettstatus = 'ikke-lastet' | 'laster-inn' | 'suksess' | 'feil';

type IkkeLastet = {
    kind: 'ikke-lastet';
};

type LasterInn = {
    kind: 'laster-inn';
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
