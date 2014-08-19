module.exports = MemStore;

function MemStore() {
  this._cache = Object.create(null);
}

Object.defineProperty(
  MemStore.prototype, 'size', {
    get : function () {
      return Object.keys(this._cache).length;
    }, enumerable : true
  });

/**
 * @param {string} key
 * @param {Object} value
 * @param {function=} cb
 */
MemStore.prototype.set = function(key, value, cb) {
  this._cache[key] = value;
  cb && cb();
};

MemStore.prototype.get = function(key, cb) {
  var val = this._cache[key];
  cb && cb(null, val);
};

MemStore.prototype.del = function(key, cb) {
  delete this._cache[key];
  cb && cb();
};

MemStore.prototype.reset = function(cb) {
  this._cache = Object.create(null);
  cb();
};

MemStore.prototype.has = function(key, cb) {
  cb(null, hOP(this._cache, key));
};

MemStore.prototype.forEach = function(iterator, done) {
  for (var key in this._cache) {
    iterator(this._cache[key], key, this);
  }
  done();
};

MemStore.prototype.keys = function(cb) {
  cb(null, Object.keys(this._cache || {}));
};

MemStore.prototype.values = function(cb) {
  var cache = this._cache || {};
  cb(null, Object.keys(cache)
     .map(function(key) { return cache[key]; }));
};

function hOP (obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}
