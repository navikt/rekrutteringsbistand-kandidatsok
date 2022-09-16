import { sendEvent } from '../../amplitude';
import { Portefølje } from '../../filter/porteføljetabs/PorteføljeTabs';
import { Søkekriterier } from '../../hooks/useSøkekriterier';

export const målQuery = (søkekriterier: Søkekriterier) => {
    const {
        fritekst,
        portefølje,
        valgtKontor,
        innsatsgruppe,
        ønsketYrke,
        ønsketSted,
        borPåØnsketSted,
        kompetanse,
        førerkort,
        prioritertMålgruppe,
        harTilretteleggingsbehov,
        behovskategori,
        hovedmål,
        utdanningsnivå,
        arbeidserfaring,
        ferskhet,
        språk,
    } = søkekriterier;

    const kriterier: any = {};

    if (fritekst !== null) {
        kriterier.fritekst = true;
    }

    if (portefølje !== Portefølje.Alle) {
        kriterier.portefølje = portefølje;
    }

    if (innsatsgruppe.size > 0) {
        kriterier.innsatsgruppe = Array.from(innsatsgruppe);
    }

    if (ønsketYrke.size > 0) {
        kriterier.ønsketYrke = Array.from(ønsketYrke);
    }

    if (ønsketSted.size > 0) {
        kriterier.ønsketSted = Array.from(ønsketSted);
    }

    if (borPåØnsketSted) {
        kriterier.borPåØnsketSted = borPåØnsketSted;
    }

    if (kompetanse.size > 0) {
        kriterier.kompetanse = Array.from(kompetanse);
    }

    if (førerkort.size > 0) {
        kriterier.førerkort = Array.from(førerkort);
    }

    if (prioritertMålgruppe.size > 0) {
        kriterier.prioritertMålgruppe = Array.from(prioritertMålgruppe);
    }

    if (harTilretteleggingsbehov) {
        kriterier.harTilretteleggingsbehov = harTilretteleggingsbehov;
    }

    if (behovskategori.size > 0) {
        kriterier.behovskategori = Array.from(behovskategori);
    }

    if (hovedmål.size > 0) {
        kriterier.hovedmål = Array.from(hovedmål);
    }

    if (utdanningsnivå.size > 0) {
        kriterier.utdanningsnivå = Array.from(utdanningsnivå);
    }

    if (arbeidserfaring.size > 0) {
        kriterier.arbeidserfaring = Array.from(arbeidserfaring);
    }

    if (ferskhet) {
        kriterier.ferskhet = ferskhet;
    }

    if (språk.size > 0) {
        kriterier.språk = Array.from(språk);
    }

    sendEvent('nytt_kandidatsøk', 'søk', {
        ...kriterier,
        kriterier: Object.keys(kriterier),
        antallValgteKontor: valgtKontor.size > 0 ? valgtKontor.size : undefined,
    });
};
