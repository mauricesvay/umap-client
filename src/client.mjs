import jsdom from "jsdom";
import fetch from "node-fetch";
const { JSDOM } = jsdom;

export class Client {
  constructor(site = "https://umap.openstreetmap.fr") {
    this.site = site;
  }

  async umapGet(path) {
    const url = `${this.site}/${path}`;
    try {
      const response = await fetch(url, {
        headers: {
          referer: `${this.site}/`,
          "x-requested-with": "XMLHttpRequest",
        },
      });
      if (response.status === 200) {
        if (
          response.headers.get("content-type")?.includes("application/json")
        ) {
          return response.json();
        }
        return response.text();
      }
      return {
        error: `Error while fetching ${url}`,
      };
    } catch (e) {
      return {
        error: e.message,
      };
    }
  }

  /**
   * Get JSON
   * @param {string} path
   * @returns
   */
  async umapGetJson(path) {
    const url = `${this.site}/${path}`;
    try {
      const response = await fetch(url);
      if (
        response.status === 200 &&
        response.headers.get("content-type")?.includes("application/json")
      ) {
        return response.json();
      }
      return {
        error: `Error while fetching ${url}`,
      };
    } catch (e) {
      return {
        error: e.message,
      };
    }
  }

  /**
   * Get JSON from HTML page
   * @param {string} path
   * @param {function} parseDocumentToJson
   * @returns
   */
  async umapGetHtmlToJson(path, parseDocumentToJson) {
    const url = `${this.site}/${path}`;
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        const html = await response.text();
        const dom = new JSDOM(html);
        const document = dom.window.document;
        return parseDocumentToJson(document);
      }
      return {
        error: `Error while fetching ${url}`,
      };
    } catch (e) {
      return {
        error: e.message,
      };
    }
  }
}
