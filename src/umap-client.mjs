import { Client } from "./client.mjs";

export class UmapClient extends Client {
  constructor(site) {
    super(site);
  }

  /**
   * Search maps
   * @param {string} query
   * @param {number} page
   * @returns
   */
  async search(query, page = 1) {
    const path = `en/search/?q=${encodeURIComponent(
      query
    )}&p=${encodeURIComponent(page)}`;
    return this.umapGetHtmlToJson(path, (document) => {
      const links = document.querySelectorAll(".legend a");
      const userMaps = [...links]
        .map((link) => ({
          href: link.getAttribute("href"),
          title: link.innerHTML,
        }))
        .filter((link) => link.href?.startsWith("/en/map/"))
        .map((link) => ({ ...link, href: link.href?.replace("/en/map/", "") }));
      return userMaps;
    });
  }

  /**
   * List of user maps
   * @param {string} username
   * @returns
   */
  async userMaps(username) {
    const path = `en/user/${username}`;
    return this.umapGetHtmlToJson(path, (document) => {
      const links = document.querySelectorAll(".legend a");
      const userMaps = [...links]
        .map((link) => ({
          href: link.getAttribute("href"),
          title: link.innerHTML,
        }))
        .filter((link) => link.href?.startsWith("/en/map/"))
        .map((link) => ({ ...link, href: link.href?.replace("/en/map/", "") }));
      return userMaps;
    });
  }

  /**
   * Map
   * @param {string} id
   * @returns
   */
  async geojson(id) {
    const path = `en/map/${id}/geojson/`;
    return this.umapGetJson(path);
  }

  /**
   * Datalayer
   * @param {string} id
   * @returns
   */
  async dataLayer(id) {
    const path = `en/datalayer/${id}/`;
    return this.umapGetJson(path);
  }

  /**
   * Datalayer versions
   * @param {string} id
   * @returns
   */
  async dataLayerVersions(id) {
    const path = `en/datalayer/${id}/versions/`;
    return this.umapGetJson(path);
  }

  /**
   * List of available pictograms
   * @returns
   */
  async pictogramJson() {
    const path = `pictogram/json/`;
    return this.umapGetJson(path);
  }

  /**
   * AJAX Proxy
   * @param {string} url
   * @returns
   */
  async ajaxProxy(url, ttl = 86400) {
    const path = `ajax-proxy/?url=${encodeURIComponent(url)}&ttl=${ttl}`;
    return this.umapGet(path);
  }
}
