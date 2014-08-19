# mem-store 

[![NPM version](https://badge.fury.io/js/mem-store.svg)](http://badge.fury.io/js/mem-store) [![Build Status](https://travis-ci.org/villadora/mem-store.svg?branch=master)](https://travis-ci.org/villadora/mem-store) [![Dependency Status](https://gemnasium.com/villadora/mem-store.svg)](https://gemnasium.com/villadora/mem-store)

A MemStore with asynchronized APIs. Usually used in development or test or as default store.

## Install

```bash
$ npm install mem-store --save
```

## Usage

```js
var MemStore = require('mem-store');

var store = new MemStore();

store.size; // 0

store.set('key', 'val', function(err) {
  store.has('key', function(err, has) {
    has; // true
    store.get('key', function(err, val) {
      val; // 'val'
      store.del('key', function(err) {
        store.has('key', function(err, has) {
          has; // false
        });
      });
    });
  });
});


store.reset();


```

## Licence

MIT
