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
