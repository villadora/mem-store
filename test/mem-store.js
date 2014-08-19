'use strict';

var assert = require('chai').assert;
var async = require('async');
var MemStore  = require('../');

function createTestStore() {
  return new MemStore();
}


describe('test memstore', function() {

  it('reset', function(done) {
    var store = createTestStore();
    store.set('a', 'A', function() {
      assert.equal(store.size, 1);
      store.reset(function(err) {
        assert.equal(store.size, 0);
        done(err);
      });
    });
  });

  it('set', function(done) {
    var store = createTestStore();
    store.set('a', 'A', function() {
      assert.equal(store.size, 1);
      done();
    });
  });

  it('get', function(done) {
    var store = createTestStore();
    store.get('b', function(err, val) {
      assert(val === undefined);
      store.set('b', 'B', function() {
        store.get('b', function(err, val) {
          assert.equal(val, 'B');
          done();
        });
      });
    });
  });

  it('del', function(done) {
    var store = createTestStore();
    store.set('a', 'A', function() {
      store.has('a', function(err, had) {
        assert(had);
        store.del('a', function() {
          store.has('a', function(err, had) {
            assert(!had);
            done();
          });
        });
      });
    });
  });


  it('forEach & keys & values', function(done) {

    async.waterfall([
      function(cb) {
        var store = createTestStore();
        store.keys(function(err, keys) {
          assert(keys.length == 0);
          cb(err);
        });
      },
      function(cb) {
        var store = createTestStore();
        store.values(function(err, values) {
          assert(values.length == 0);
          cb(err);
        });
      },
      function(cb) {
        var store = createTestStore();
        store.set('a', 'A', function() {
          store.set('b', 'B', function() {
            store.forEach(function(val, key) {
              assert(val.toLowerCase() == key);
            }, function(err) {
              if (err) return cb(err); // for no assert check err
              store.keys(function(err, keys) {
                assert.deepEqual(keys, ['a', 'b']);
                store.values(function(err, values) {
                  assert.deepEqual(values, ['A', 'B']);
                  cb(err);
                });
              });
            });
          });
        });
      }], function(err) {
        done(err);
      });
  });

});
