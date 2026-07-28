import type { Author } from "./types";

/**
 * ⚠️ E-E-A-T / YMYL — PUNTO UNICO DA COMPILARE
 *
 * Rassegna Edile tratta materie YMYL (detrazioni fiscali, incentivi, normativa
 * tecnica): Google valuta l'identità di chi firma quanto il testo stesso.
 * Finché `sameAs` resta vuoto le firme sono nomi non verificabili e lo schema
 * Person NON emette il collegamento all'identità reale.
 *
 * Per attivarlo, aggiungere a ciascun autore SOLO dati reali e verificabili:
 *   sameAs:     ["https://www.linkedin.com/in/…", "https://sito-personale.it"]
 *   credential: "Ordine degli Ingegneri di Milano, n. 12345"
 *   email:      "nome.cognome@rassegnaedile.it"
 *
 * Non inserire profili inventati o di terzi: un sameAs falso è peggio di un
 * sameAs assente, perché collega il sito a un'identità che non lo riconosce.
 */
export const authors: Author[] = [
  {
    name: "Marco Bertelli",
    role: "Direttore editoriale",
    bio: "Giornalista professionista, da vent'anni segue l'edilizia italiana tra cantieri, normative e mercato dei materiali.",
  },
  {
    name: "Elena Gatti",
    role: "Ingegnere edile",
    bio: "Ingegnere edile e certificatore energetico, cura le guide su efficienza energetica, fotovoltaico e involucro edilizio.",
  },
  {
    name: "Luca Ferrarini",
    role: "Geometra",
    bio: "Geometra libero professionista, esperto di pratiche edilizie, titoli abilitativi e direzione lavori.",
  },
  {
    name: "Sara Colombo",
    role: "Architetto",
    bio: "Architetto specializzata in ristrutturazioni residenziali e interior design tecnico.",
  },
  {
    name: "Davide Riva",
    role: "Termotecnico",
    bio: "Progettista termotecnico, si occupa di impianti, pompe di calore, VMC e domotica.",
  },
  {
    name: "Anna Bellini",
    role: "Giornalista",
    bio: "Giornalista, segue incentivi, bonus edilizi e fiscalità della casa.",
  },
];
