import { Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import CategoryPage from "@/pages/CategoryPage";
import ArticlePage from "@/pages/ArticlePage";
import StaticPage, { SitemapPage } from "@/pages/StaticPages";
import SearchPage from "@/pages/SearchPage";
import PricesPage from "@/pages/PricesPage";
import NotFoundPage from "@/pages/NotFoundPage";

/**
 * Layout + routing dell'app. Il Router (BrowserRouter lato client,
 * StaticRouter lato prerender) è fornito dalle entry:
 *   - src/entry-client.tsx  → BrowserRouter + hydrateRoot
 *   - src/entry-server.tsx  → StaticRouter + renderToString (SSG)
 * Gli URL pubblici sono del tipo /categoria/slug-articolo/ (architettura a silos).
 */
export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mappa-del-sito/" element={<SitemapPage />} />
          <Route path="/cerca/" element={<SearchPage />} />
          <Route path="/prezzi/" element={<PricesPage />} />
          <Route path="/chi-siamo/" element={<StaticPage pageKey="chi-siamo" />} />
          <Route path="/redazione/" element={<StaticPage pageKey="redazione" />} />
          <Route path="/contatti/" element={<StaticPage pageKey="contatti" />} />
          <Route path="/pubblicita/" element={<StaticPage pageKey="pubblicita" />} />
          <Route path="/privacy/" element={<StaticPage pageKey="privacy" />} />
          <Route path="/cookie-policy/" element={<StaticPage pageKey="cookie-policy" />} />
          <Route path="/:category/" element={<CategoryPage />} />
          <Route path="/:category/:slug/" element={<ArticlePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
