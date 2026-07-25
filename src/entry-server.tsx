import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";
import {
  beginServerCollect,
  endServerCollect,
  renderHeadToString,
  type SeoInput,
} from "./lib/seo";

/**
 * Rende una rotta in HTML statico (prerender SSG).
 * Ritorna il markup del body (#root) e i tag <head> per-pagina.
 */
export function render(url: string): { html: string; head: string } {
  const sink: SeoInput[] = [];
  beginServerCollect(sink);
  let html = "";
  try {
    html = renderToString(
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    );
  } finally {
    endServerCollect();
  }
  const input = sink[sink.length - 1];
  const head = input ? renderHeadToString(input) : "";
  return { html, head };
}
