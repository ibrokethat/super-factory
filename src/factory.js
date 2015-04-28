"use strict";

import {find} from 'super-iter';

export default function factory (items, data) {


  if (!(items instanceof Map)) {

    throw new TypeError(`factory expects ${items} to be an instance of Map`);
  }


  let fn = find(items, (fn, matcher) => {

    if (typeof matcher !== 'function') {

      throw new TypeError(`factory expects ${matcher} to be a function`);
    }

    if (matcher(data)) {

      return true;
    }

    return false;
  });


  if (typeof fn !== 'function') {

    throw new TypeError(`factory expects ${fn} to be a function`);
  }


  return fn(data);
}
