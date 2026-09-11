import { StrictMode } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { salvaParametriCampagna } from "./lib/eicLead";

// Salva UTM/gclid/fbclid all'atterraggio, pronti per i form che manderanno i contatti al CRM.
salvaParametriCampagna();

const root = document.getElementById("root")!;
const tree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Se l'HTML è stato prerenderizzato (SSG) si idrata; altrimenti render pieno.
if (root.hasChildNodes()) {
  hydrateRoot(root, tree);
} else {
  createRoot(root).render(tree);
}
