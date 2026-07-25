import type { Category } from "./types";

export const SITE = {
  name: "Rassegna Edile",
  tagline: "Il quotidiano online dell'edilizia italiana",
  url: "https://www.rassegnaedile.it",
  description:
    "Rassegna Edile è il magazine online verticale sull'edilizia: ristrutturazioni, serramenti, efficienza energetica, materiali, impianti, incentivi, tecnologie e normative.",
};

export const categories: Category[] = [
  {
    slug: "ristrutturazioni",
    name: "Ristrutturazioni",
    description:
      "Guide, costi e consigli per ristrutturare casa: dal chiavi in mano al bagno, dalla cucina alle pratiche edilizie.",
    metaTitle: "Ristrutturazioni: guide, costi e consigli | Rassegna Edile",
    metaDescription:
      "Tutto sulla ristrutturazione di casa: costi, tempi, pratiche edilizie e guide passo passo firmate dalla redazione di Rassegna Edile.",
  },
  {
    slug: "serramenti-infissi",
    name: "Serramenti e Infissi",
    description:
      "Finestre, porte, zanzariere e schermature: materiali a confronto, prestazioni, prezzi e posa in opera.",
    metaTitle: "Serramenti e Infissi: guide e confronti | Rassegna Edile",
    metaDescription:
      "Serramenti in PVC, alluminio o legno, triplo vetro, sostituzione infissi e zanzariere: guide tecniche e prezzi aggiornati.",
  },
  {
    slug: "efficienza-energetica",
    name: "Efficienza Energetica",
    description:
      "Fotovoltaico, pompe di calore, cappotto termico e soluzioni per ridurre i consumi energetici degli edifici.",
    metaTitle: "Efficienza Energetica: fotovoltaico, pompe di calore | Rassegna Edile",
    metaDescription:
      "Pannelli solari, fotovoltaico, pompe di calore e cappotto termico: guide complete per efficientare la tua casa e tagliare le bollette.",
  },
  {
    slug: "materiali-costruzione",
    name: "Materiali da Costruzione",
    description:
      "Laterizi, isolanti, cementi sostenibili e materiali innovativi per costruire e ristrutturare.",
    metaTitle: "Materiali da Costruzione: guide e innovazioni | Rassegna Edile",
    metaDescription:
      "Materiali da costruzione tradizionali e innovativi: isolanti termici, laterizi, legno lamellare e cementi a basso impatto.",
  },
  {
    slug: "impianti",
    name: "Impianti",
    description:
      "Impianti idraulici, elettrici, di climatizzazione, VMC e domotica: norme, costi e manutenzione.",
    metaTitle: "Impianti: idraulici, elettrici, VMC e domotica | Rassegna Edile",
    metaDescription:
      "Guide su impianti idraulici ed elettrici a norma, ventilazione meccanica controllata e domotica per la casa intelligente.",
  },
  {
    slug: "incentivi-bonus",
    name: "Incentivi e Bonus",
    description:
      "Bonus edilizi, detrazioni, Conto Termico e incentivi per fotovoltaico e riqualificazione energetica.",
    metaTitle: "Incentivi e Bonus Edilizi 2026 | Rassegna Edile",
    metaDescription:
      "Bonus edilizi 2026, detrazione ristrutturazioni 50%, Conto Termico 3.0 e incentivi fotovoltaico: guide aggiornate e requisiti.",
  },
  {
    slug: "tecnologie-innovazione",
    name: "Tecnologie e Innovazione",
    description:
      "BIM, intelligenza artificiale, stampa 3D e prefabbricazione: il cantiere diventa digitale.",
    metaTitle: "Tecnologie e Innovazione per l'Edilizia | Rassegna Edile",
    metaDescription:
      "BIM, intelligenza artificiale in cantiere, case prefabbricate e stampa 3D: le tecnologie che stanno cambiando l'edilizia.",
  },
  {
    slug: "normative",
    name: "Normative",
    description:
      "Titoli edilizi, sicurezza in cantiere, direttive europee e sanatorie: la norma spiegata chiaramente.",
    metaTitle: "Normative Edilizie: guide e aggiornamenti | Rassegna Edile",
    metaDescription:
      "CILA, SCIA, permesso di costruire, sicurezza in cantiere e direttiva Case Green: le norme edilizie spiegate in modo chiaro.",
  },
];

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);
