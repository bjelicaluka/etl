# ETL
Višenamenski sistem koji implementira <i>Extract Transform Load</i> proces uz podršku rada sa velikim brojem podataka.

[Luka Bjelica, SW-21-2019](https://github.com/bjelicaluka)

## Opis Problema
- ETL je proces sačinjen od izvlačenja (<i>Extract</i>), transformisanja (<i>Transform</i>), i učitavanja (<i>Load</i>) podataka. Poenta je ujediniti podatke sa više izvora, transformisati ih u odgovarajući format, i uskladištiti ih takve, po mogućnosti na drugom skladištu podataka.
- Ono što predstavlja izazov u rešavanju ovakvih problema jeste rad sa velikom količinom podataka, što nije redak slučaj. Takođe, različite implementacije imaju zajedničke funkcionalnosti, koje nema potrebe implementirati za svaki slučaj primene.

## Cilj Rešenja
- Cilj je napraviti generičko rešenje koje podržava rad sa velikom količinom podataka. Ideja je implementirati konkurentni algoritam koji može skalirati obradu na više niti u okviru istog procesa, kao i na više procesa zaduženih za obradu podataka na sistemskom nivou.

## Funkcionalnosti
1. Učitavanje podataka sa više proizvoljih izvora. Na primer iz: SQL ili NoSQL baze podataka, REST API-ja, datoteka i slično.
2. Transformisanje podataka u format pogodan za dalju obradu.
3. Formiranje toka podataka (<i>data stream</i>) čime je omogućeno kasnije povezivanje podataka sa različitih izvora.
4. Slanje toka podataka preko mreže.
5. Obrada toka podataka prilikom prijema.
6. Kompleksne transformacije toka podataka u željeni format.
7. Definisanje transformacija toka podataka pomoću DSL.
8. Perzistencija podataka u krajnjem formatu.
9. Vizuelizacija celog procesa, praćenja statusa i potencijalnih otkaza.

## Arhitektura
Sistem se sastoji od dve komponente zadužene za implementaciju ETL procesa, i komponenti zaduženih za implementaciju, parsiranje i interpretiranje DSL-a. Pored toga, moguće je da će biti potrebe za još jednom komponentom koja će implementirati CRUD operacije nad pravilima za transformaciju podataka.

### Komponente:
* Komponenta za učitavanje i inicijalno transformisanje podataka, kao i formiranje i slanje toka podataka. (Rust)
* Komponenta za prijem i obradu tokova podataka, kao i kompleksnu transformaciju i perzistenciju podataka u krajnjem formatu. (Go + Proizvoljni DataStore)
* Komponenta za definisanje i interpretaciju DSL-a. (Python + textX)
* Komponenta za CRUD operacije nad pravilima za transformaciju podataka. (Go)
* Komponenta za vizualizaciju procesa. (React.js + socket.io)

Dijagram možete videti na [stranici](https://github.com/bjelicaluka/etl/blob/master/etl.png).