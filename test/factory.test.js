"use strict";

import assert from 'assert';
import sinon from 'sinon';
import underTest from '../index';

import {expect} from 'chai';

let fakes;
let items;


describe("test factory module: ", () => {

  beforeEach(()  =>  {

    fakes = sinon.sandbox.create();
    items = new Map([
      [(x) => x === 1, (x) => x * 10],
      [(x) => x === 2, (x) => x * 20],
      [(x) => x === 3, (x) => x * 30],
      [(x) => x === 4, (x) => x * 40]
    ]);

  });


  it('should select and call the first function that matches', () => {

    expect(underTest(items, 1)).to.be.equal(10);
    expect(underTest(items, 2)).to.be.equal(40);
    expect(underTest(items, 3)).to.be.equal(90);
    expect(underTest(items, 4)).to.be.equal(160);
  });

  it('should throw if items supplied are not in a Map', () => {

    expect(() => underTest([], 1)).to.throw;
  });

  it('should throw if matchers are not functions', () => {

    items.set({}, () => {});

    expect(() => underTest(items, 5)).to.throw;
  });

  it('should throw if fns are not functions', () => {

    items.set(() => {}, {});

    expect(() => underTest(items, 5)).to.throw;
  });


  it('should curry correctly', () => {

    let fn = underTest(items);

    expect(fn(4)).to.be.equal(160);

  });


});
