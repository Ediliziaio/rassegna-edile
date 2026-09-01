import type { ReactElement, ReactNode } from "react";
import { useParams } from "react-router-dom";
import { articles, articleUrl } from "@/data/articles";
import { categories, SITE } from "@/data/categories";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useSeo } from "@/lib/seo";
import { Link } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

interface PageDef {
  title: string;
  metaTitle: string;
  metaDescription: string;
  body: () => ReactElement;
}

const shell = (children: ReactNode) => (
  <div className="article-body max-w-3xl">{children}</div>
);

const pages: Record<string, PageDef> = {
  "chi-siamo": {
    title: "Chi siamo",
    metaTitle: "Chi siamo | Rassegna Edile",
    metaDescription:
      "Rassegna Edile documenta i costi dell'edilizia italiana: a chi ci rivolgiamo, come verifichiamo i dati e perché pubblichiamo intervalli di prezzo con la fonte.",
    body: () =>
      shell(
        <>
          <p>
            <strong>Rassegna Edile</strong> documenta quanto costano i lavori
            edili in Italia: ristrutturazioni, serramenti, efficienza
            energetica, materiali, impianti, incentivi e normative, con gli
            intervalli di prezzo raccolti nell'Osservatorio e le guide che
            spiegano da cosa dipende la spesa.
          </p>
          <p>
            Parliamo a imprese edili, artigiani, professionisti tecnici —
            geometri, architetti, ingegneri — serramentisti, installatori,
            rivenditori di materiali e ai privati che ristrutturano casa. Il
            nostro metodo: contenuti tecnici verificati, scritti in un
            italiano chiaro, con dati, costi e riferimenti normativi sempre
            citati.
          </p>
          <p>
            Ogni articolo nasce da fonti ufficiali — norme, guide fiscali,
            dati di mercato — e viene revisionato dalla redazione prima della
            pubblicazione. Quando un'informazione cambia, l'articolo viene
            aggiornato e la data di revisione è sempre visibile.
          </p>
        </>
      ),
  },
  redazione: {
    title: "Redazione e metodo editoriale",
    metaTitle: "Redazione e metodo editoriale | Rassegna Edile",
    metaDescription:
      "Chi scrive Rassegna Edile e come lavoriamo: firma redazionale unica, fonti dichiarate, prezzi come riferimenti di mercato e correzioni tracciate.",
    body: () =>
      shell(
        <>
          <p>
            I contenuti di Rassegna Edile sono firmati{" "}
            <strong>Redazione Rassegna Edile</strong>: una firma unica, non un
            insieme di profili individuali. È una scelta di trasparenza. Su
            materie come fisco, incentivi e normativa tecnica una firma vale
            solo se riconducibile a un professionista verificabile: preferiamo
            dichiarare che la responsabilità editoriale è della testata e del
            suo editore, indicato per esteso nel footer, piuttosto che attribuire
            i testi a profili che il lettore non può controllare.
          </p>

          <h2 className="font-display mb-3 mt-8 text-2xl font-bold text-primary">Come lavoriamo</h2>
          <p>
            Ogni guida parte dalle fonti primarie della materia trattata —
            Agenzia delle Entrate e GSE per incentivi e detrazioni, testo unico
            dell'edilizia e norme tecniche per gli aspetti regolamentari, schede
            di prodotto e listini per i dati di mercato — e ne riporta i limiti:
            quando una disciplina è in evoluzione o dipende da provvedimenti
            attuativi, lo scriviamo invece di semplificare.
          </p>

          <h2 className="font-display mb-3 mt-8 text-2xl font-bold text-primary">I prezzi che pubblichiamo</h2>
          <p>
            Gli importi sono <strong>riferimenti di mercato, non preventivi</strong>.
            Servono a riconoscere l'ordine di grandezza di una spesa e a
            individuare un'offerta fuori scala. Sono raccolti nell'{" "}
            <Link to="/prezzi/" className="text-accent hover:underline">
              Osservatorio prezzi
            </Link>
            , dove ogni voce rimanda alla guida che ne spiega le variabili: il
            valore non è mai separato dal contesto tecnico che lo determina.
          </p>

          <h2 className="font-display mb-3 mt-8 text-2xl font-bold text-primary">Correzioni e segnalazioni</h2>
          <p>
            Se trovi un dato inesatto o superato, scrivi a{" "}
            <strong>redazione@rassegnaedile.it</strong>: le correzioni sostanziali
            vengono applicate all'articolo e la data di aggiornamento cambia di
            conseguenza, così resta visibile quando un contenuto è stato rivisto.
          </p>

          <h2 className="font-display mb-3 mt-8 text-2xl font-bold text-primary">Pubblicità</h2>
          <p>
            Gli spazi pubblicitari sono identificati dall'etichetta «Pubblicità»
            e i relativi link non trasferiscono valore ai fini del
            posizionamento. Nessun contenuto redazionale è acquistabile e nessuna
            valutazione dipende da un rapporto commerciale.
          </p>
        </>
      ),
  },
  contatti: {
    title: "Contatti",
    metaTitle: "Contatti | Rassegna Edile",
    metaDescription:
      "Come contattare la redazione di Rassegna Edile: segnalazioni, comunicati stampa, richieste commerciali e assistenza lettori.",
    body: () =>
      shell(
        <>
          <p>
            Per segnalazioni, correzioni e comunicati stampa:{" "}
            <strong>redazione@rassegnaedile.it</strong>
          </p>
          <p>
            Per proposte commerciali e pubblicità:{" "}
            <strong>advertising@rassegnaedile.it</strong>
          </p>
          <p>
            Per assistenza ai lettori: <strong>info@rassegnaedile.it</strong>
          </p>
          <p>
            Rispondiamo in genere entro 2 giorni lavorativi. Per la
            pubblicazione di comunicati stampa valutiamo esclusivamente
            contenuti pertinenti al settore delle costruzioni.
          </p>
        </>
      ),
  },
  pubblicita: {
    title: "Pubblicità e Media Kit",
    metaTitle: "Pubblicità e Media Kit | Rassegna Edile",
    metaDescription:
      "Formati pubblicitari disponibili su Rassegna Edile: display, native advertising e sponsorizzazioni per il settore edile.",
    body: () =>
      shell(
        <>
          <p>
            Rassegna Edile raggiunge un pubblico verticale e qualificato:
            imprese, professionisti tecnici e privati in fase attiva di
            ristrutturazione o acquisto. I formati disponibili:
          </p>
          <ul>
            <li>
              <strong>Leaderboard 728×90</strong> in testata, su tutte le pagine
            </li>
            <li>
              <strong>Medium Rectangle 300×250</strong> in sidebar e tra i
              paragrafi degli articoli
            </li>
            <li>
              <strong>In-feed / native</strong> nei flussi editoriali della home
              e delle sezioni
            </li>
            <li>
              <strong>Anchor mobile</strong> non invadente, conforme alle policy
              Better Ads
            </li>
            <li>
              <strong>Contenuti sponsorizzati</strong> sempre contrassegnati
              come tali
            </li>
          </ul>
          <p>
            Tutti gli slot sono serviti con dimensioni riservate per non
            penalizzare la velocità delle pagine. Per il media kit completo e
            le tariffe: <strong>advertising@rassegnaedile.it</strong>
          </p>
        </>
      ),
  },
  privacy: {
    title: "Privacy Policy",
    metaTitle: "Privacy Policy | Rassegna Edile",
    metaDescription:
      "Informativa privacy di Rassegna Edile: trattamento dei dati personali ai sensi del GDPR (Reg. UE 2016/679).",
    body: () =>
      shell(
        <>
          <p>
            Il titolare del trattamento è Rassegna Edile. I dati personali
            eventualmente forniti dagli utenti (es. via email o moduli di
            contatto) sono trattati ai sensi del Regolamento UE 2016/679
            (GDPR) esclusivamente per rispondere alle richieste ricevute.
          </p>
          <p>
            I dati di navigazione possono essere raccolti in forma aggregata e
            anonima per finalità statistiche. L'utente può esercitare i
            diritti di accesso, rettifica, cancellazione e opposizione
            scrivendo a <strong>privacy@rassegnaedile.it</strong>.
          </p>
        </>
      ),
  },
  "cookie-policy": {
    title: "Cookie Policy",
    metaTitle: "Cookie Policy | Rassegna Edile",
    metaDescription:
      "Cookie policy di Rassegna Edile: tipologie di cookie utilizzati, finalità e modalità di gestione del consenso.",
    body: () =>
      shell(
        <>
          <p>
            Questo sito utilizza cookie tecnici necessari al funzionamento
            delle pagine e, previo consenso, cookie di misurazione
            (statistiche aggregate) e cookie pubblicitari di terze parti per
            la erogazione degli spazi adv.
          </p>
          <p>
            Il consenso può essere modificato in qualsiasi momento dalle
            impostazioni del browser o dal pannello di gestione del consenso.
            I cookie tecnici non richiedono consenso ai sensi della normativa
            vigente.
          </p>
        </>
      ),
  },
};

export default function StaticPage({ pageKey }: { pageKey?: string }) {
  const params = useParams<{ page: string }>();
  const page = pageKey ?? params.page;
  const def = page ? pages[page] : undefined;

  useSeo({
    title: def?.metaTitle ?? "Pagina non trovata",
    description: def?.metaDescription ?? "",
    canonical: `/${page}/`,
  });

  if (!def) return <NotFoundPage />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: def.title }]} />
      <h1 className="font-display mt-4 mb-8 border-b-2 border-primary pb-4 text-3xl font-black text-primary md:text-4xl">
        {def.title}
      </h1>
      {def.body()}
    </div>
  );
}

export function SitemapPage() {
  useSeo({
    title: `Mappa del sito | ${SITE.name}`,
    description:
      "Mappa del sito di Rassegna Edile: tutte le sezioni e gli articoli pubblicati, organizzati per categoria.",
    canonical: "/mappa-del-sito/",
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <Breadcrumbs
        items={[{ name: "Home", path: "/" }, { name: "Mappa del sito" }]}
      />
      <h1 className="font-display mt-4 mb-8 border-b-2 border-primary pb-4 text-3xl font-black text-primary md:text-4xl">
        Mappa del sito
      </h1>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <section key={c.slug} aria-labelledby={`sm-${c.slug}`}>
            <h2 id={`sm-${c.slug}`} className="font-display text-xl font-bold text-primary">
              <Link to={`/${c.slug}/`} className="hover:text-accent">
                {c.name}
              </Link>
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {articles
                .filter((a) => a.category === c.slug)
                .map((a) => (
                  <li key={a.slug}>
                    <Link
                      to={articleUrl(a)}
                      className="text-foreground/80 hover:text-accent hover:underline"
                    >
                      {a.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
