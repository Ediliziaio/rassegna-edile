import type { Author } from "./types";

/**
 * Rassegna Edile firma i contenuti a nome della redazione.
 *
 * Le firme individuali sono state rimosse perché non corrispondevano a persone
 * verificabili: su materie YMYL (fisco, incentivi, normativa tecnica) una firma
 * che non può essere ricondotta a un professionista reale è un rischio, non un
 * segnale di autorevolezza. La responsabilità editoriale è dell'editore,
 * dichiarato nel footer e nei dati strutturati.
 *
 * Se in futuro collaboreranno professionisti reali, si potranno reintrodurre
 * firme individuali complete di `sameAs` (profilo pubblico verificabile) e
 * `credential` (iscrizione all'albo): i campi sono già previsti nel tipo Author.
 */
export const EDITORIAL_BYLINE = "Redazione Rassegna Edile";
export const EDITORIAL_ROLE = "Redazione tecnica";

export const authors: Author[] = [];
