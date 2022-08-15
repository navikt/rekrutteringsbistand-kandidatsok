export const storForbokstav = (s: string) => {
    if (s.length === 0) {
        return s;
    }

    const ord = s.split(' ');
    return ord.map((o) => o[0].toUpperCase() + o.substring(1).toLowerCase()).join(' ');
};
