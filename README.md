# rekrutteringsbistand-kandidatsok

Frontend for nytt kandidatsøk i Rekrutteringsbistand.

## Installasjon

```
npm install
```

## Utvikling

### Med ekte data

Slik kan du koble til OpenSearch direkte fra utviklingsmiljøet:

```
# 1) Opprett en fil for lokale miljøvariabler
touch .env.development.local

# 2) Kopier URL, brukernavn og passord til OpenSearch inn i filen
OPEN_SEARCH_USERNAME=<brukernavn>
OPEN_SEARCH_PASSWORD=<passord>
OPEN_SEARCH_URI=<url>

# 3) Start utviklingsmiljøet
npm run start
```
## Integrasjon med kandidatsidene

Når man trykker på en kandidat sendes man til kandidatoversikten i [rekrutteringsbistand-kandidat](https://github.com/navikt/rekrutteringsbistand-kandidat) for å se kandidatens CV og historikk. Her kan man også navigere mellom kandidatene og når som helst trykke "Tilbake til kandidatsøket". Integrasjonen mellom denne appen og kandidat-appen fungerer slik:

- Intern state for kandidatsøket lagres i SessionStorage
    - Markerte kandidater, kandidatnumrene til kandidatene (for navigering mellom kandidatene) og scrollposisjonen da du forlot kandidatsøket (for å gjenopprette scroll når du kommer tilbake)
- Selve søkestringen 


## Søk

Fritekstsøk ser bl.a. på "fritekst"-feltet i ElasticSearch. Dette er et kombinert felt som består av følgende felter:

```
beskrivelse

utdanning.utdannelsessted
utdanning.nusKodeGrad
utdanning.alternativGrad
utdanning.yrkestatus
utdanning.beskrivelse

fagdokumentasjon.type
fagdokumentasjon.tittel
fagdokumentasjon.beskrivelse

yrkeserfaring.arbeidsgiver
yrkeserfaring.stillingstittel
yrkeserfaring.alternativStillingstittel
yrkeserfaring.beskrivelse

kompetanseObj.kompKodeNavn
kompetanseObj.alternativtNavn
kompetanseObj.beskrivelse

annenerfaringObj.beskrivelse
annenerfaringObj.rolle

sertifikatObj.sertifikatKodeNavn
sertifikatObj.alternativtNavn
sertifikatObj.utsteder

sprak.sprakKodeTekst
sprak.alternativTekst
sprak.beskrivelse

kursObj.tittel
kursObj.arrangor
kursObj.beskrivelse

vervObj.organisasjon
vervObj.tittel
```

## Filtrering på innsatsgruppe

Alle arbeidssøkere i NAV er medlem av en innsatsgruppe. Innsatsgruppen forteller hvor mye bistand kandidaten trenger av NAV for å nå sitt hovedmål. Hovedmålet kan enten være å skaffe arbeid, beholde arbeid eller øke deltagelsen i arbeidslivet.

Innsatsgruppene er NAVs implementasjon av [14a-vedtaket](https://lovdata.no/lov/2006-06-16-20/§14a) som sier at alle som henvender seg til et NAV-kontor skal få en slik vurdering om bistandsbehov.

Innsatsgruppene er som følger:

* Spesielt tilpasset innsats (BATT)
* Situasjonsbestemt innsats (BFORM)
* Standardinnsats (IKVAL)
* Varig tilpasset innsats (VARIG)

Innsatsgruppene deler datafelt med følgende "servicegrupper" (så en kandidat er enten medlem av en innsatsgruppe eller en servicegruppe):

* Ikke vurdert (IVURD)
* Behov for arbeidsevnevurdering (BKART)
* Helserelatert arbeidsrettet oppfølging i NAV (OPPFI)
* Sykmeldt med oppfølging på arbeidsplassen (VURDI)
* Sykmeldt uten arbeidsgiver (VURDU)

Les mer [på Confluence](https://confluence.adeo.no/display/INI754/9.2.4+Arena+datamodeller+og+kodeverk).


# Henvendelser

## For Nav-ansatte

* Dette Git-repositoriet eies
  av [Team tiltak og inkludering (TOI) i Produktområde arbeidsgiver](https://teamkatalog.nais.adeo.no/team/0150fd7c-df30-43ee-944e-b152d74c64d6)
  .
* Slack-kanaler:
    * [#arbeidsgiver-toi-dev](https://nav-it.slack.com/archives/C02HTU8DBSR)
    * [#arbeidsgiver-utvikling](https://nav-it.slack.com/archives/CD4MES6BB)

## For folk utenfor Nav

* Opprett gjerne en issue i Github for alle typer spørsmål
* IT-utviklerne i Github-teamet https://github.com/orgs/navikt/teams/toi
* IT-avdelingen
  i [Arbeids- og velferdsdirektoratet](https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Relatert+informasjon/arbeids-og-velferdsdirektoratet-kontorinformasjon)
