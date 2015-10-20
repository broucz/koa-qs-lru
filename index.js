
'use strict';

const qs = require('qs');
const merge = require('merge-descriptors');
const lru = require('lru-cache');

module.exports = function (app, options) {
  const o = options || {};
  const cache = lru(o.cache);

  merge(app.request, {

    /**
     * Get parsed query-string.
     *
     * @return {Object}
     * @api public
     */

    get query() {
      const str = this.querystring;
      if (!str) return {};

      if (cache.has(str)) {
        return cache.get(str);
      } else {
        const entry = qs.parse(str, o.parse)
        cache.set(str, entry);
        return entry;
      }
    },

    /**
     * Set query-string as an object.
     *
     * @param {Object} obj
     * @api public
     */

    set query(obj) {
      this.querystring = qs.stringify(obj, o.stringify);
    }
  });

  return app;
}
