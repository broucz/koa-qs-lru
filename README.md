# Koa Query String LRU

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![David deps][david-image]][david-url]
[![npm download][download-image]][download-url]

By default, Koa uses the native `querystring` [module](https://github.com/Gozala/querystring) which does not provide nesting support and caches parsed results in a plain object regardless of his size.

This pathes a Koa app with:
- [qs](https://www.npmjs.com/package/qs) (a querystring parsing and stringifying library with some added security)
- [lru-cache](https://www.npmjs.com/package/lru-cache) (a cache object that deletes the least-recently-used items)

## Installation

```
$ npm install --save koa-qs-lru
```

## Usage

```js
var koa = require('koa')
var qs = require('koa-qs-lru');

// qs & lru-cache default settings
var app = qs(koa());

// custom settings
var app = qs(koa(), {
  cache: {},     // lru-cache options
  parse: {},     // qs -> parse options
  stringify: {}  // qs -> stringify options
});
```

Check [qs](https://www.npmjs.com/package/qs) and [lru-cache](https://www.npmjs.com/package/lru-cache) packages for API documentation.

## Example

```js
var koa = require('koa')
var qs = require('koa-qs-lru');

var app = qs(koa(), {
  cache: { max: 1000 },         // Keep last 1000 used query objects in cache
  parse: { parameterLimit: 1 }  // Parse only the first parameter
});

app.use(function *() {
  this.body = this.query;
});

app.listen(3000);
```

## Credits

Inspired by [koa-qs](https://github.com/koajs/qs).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/koa-qs-lru.svg?style=flat-square
[npm-url]: https://npmjs.org/package/koa-qs-lru
[travis-image]:https://img.shields.io/travis/broucz/koa-qs-lru.svg?style=flat-square
[travis-url]: https://travis-ci.org/broucz/koa-qs-lru
[coveralls-image]: https://img.shields.io/coveralls/broucz/koa-qs-lru.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/broucz/koa-qs-lru?branch=master
[david-image]: https://img.shields.io/david/broucz/koa-qs-lru.svg?style=flat-square
[david-url]: https://david-dm.org/broucz/koa-qs-lru
[download-image]: https://img.shields.io/npm/dm/koa-qs-lru.svg?style=flat-square
[download-url]: https://npmjs.org/package/koa-qs-lru
