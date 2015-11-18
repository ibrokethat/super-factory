"use strict";

const {find} = require('@ibrokethat/iter');
const curry = require('@ibrokethat/curry');


module.exports = function factory (...args) {

  return _factory(...args);
}

const _factory = curry(function _factory (items, data, ...args) {


  if (!(items instanceof Map)) {

    throw new TypeError(`factory expects ${items} to be an instance of Map`);
  }


  let fn = find(items, (fn, matcher) => {

    if (typeof matcher !== 'function') {

      throw new TypeError(`factory expects ${matcher} to be a function`);
    }

    if (matcher(data, ...args)) {

      return true;
    }

    return false;
  });


  if (typeof fn !== 'function') {

    throw new TypeError(`factory expects ${fn} to be a function`);
  }


  return fn(data, ...args);
});
