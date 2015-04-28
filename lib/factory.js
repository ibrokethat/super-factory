"use strict";

module.exports = factory;

var find = require("super-iter").find;

function factory(items, data) {

  if (!(items instanceof Map)) {

    throw new TypeError("factory expects " + items + " to be an instance of Map");
  }

  var fn = find(items, function (fn, matcher) {

    if (typeof matcher !== "function") {

      throw new TypeError("factory expects " + matcher + " to be a function");
    }

    if (matcher(data)) {

      return true;
    }

    return false;
  });

  if (typeof fn !== "function") {

    throw new TypeError("factory expects " + fn + " to be a function");
  }

  return fn(data);
}