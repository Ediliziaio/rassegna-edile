import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import CategoryPage from "@/pages/CategoryPage";
import ArticlePage from "@/pages/ArticlePage";
import StaticPage, { SitemapPage } from "@/pages/StaticPages";
import SearchPage from "@/pages/SearchPage";
import AuthorPage from "@/pages/AuthorPage";
import NotFoundPage from "@/pages/NotFoundPage";

/**
 * NOTA SEO (produzione): in deploy usare BrowserRouter + prerendering
 * (vite-plugin-prerender / react-snap) oppure SSR, in modo che crawler
 * e AI-bot ricevano HTML completo. Gli URL pubblici restano del tipo
 * /categoria/slug-articolo/ come da architettura a silos.
 * In questa preview locale si usa HashRouter per servire l'app da file statici.
 */
export default function App() {
  return (
    <HashRouter>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mappa-del-sito/" element={<SitemapPage />} />
            <Route path="/cerca/" element={<SearchPage />} />
            <Route path="/autore/:name/" element={<AuthorPage />} />
            <Route path="/:page(chi-siamo|redazione|contatti|pubblicita|privacy|cookie-policy)/" element={<StaticPage />} />
            <Route path="/:category/" element={<CategoryPage />} />
            <Route path="/:category/:slug/" element={<ArticlePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
