# umap-client

JavaScript client for consuming data from [uMap](https://github.com/umap-project/umap).

## API

Create a new client:

```js
const client = new UmapClient(); // targets umap.openstreetmap.fr by default
```

You can also specify the instance of uMap:

```js
const client = new UmapClient("https://framacarte.org");
```

### Methods

The client only supports reading public data for now.

- [search](#search)
- [userMaps](#userMaps)
- [geojson](#geojson)
- [dataLayer](#dataLayer)
- [dataLayerVersion](#dataLayerVersion)
- [ajaxProxy](#ajaxProxy)
- [pictogramJson](#pictogramJson)

#### search

Search maps on the instance:

```js
const results = await client.search("paris");
```

#### userMaps

Gets maps from a user:

```js
const maps = await client.userMaps("mauricesvay");
```

#### geojson

Get data for a map:

```js
const map = await client.geojson("647993");
```

#### dataLayer

Get data for a map layer:

```js
const dataLayer = await client.dataLayer("2326451");
```

#### dataLayerVersions

Get versions of a data layer:

```js
const versions = await client.dataLayerVersions("2326451");
```

#### pictogramJson

Get available icons:

```js
const icons = await client.pictogramJson();
```

#### ajaxProxy

Get external data through the AJAX proxy:

```js
const externalData = await client.ajaxProxy(
  "https://overpass-api.de/api/interpreter?data=..."
);
```
