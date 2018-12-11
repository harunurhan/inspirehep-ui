import { fromJS, Set, Map } from 'immutable';

import {
  forceArray,
  castPropToNumber,
  pluckMinMaxPair,
  convertArrayToMap,
  selfOrInfinity,
  getSizeOfArrayOrImmutableList,
  doSetsHaveCommonItem,
  isEmptyObjectShallow,
  mergeWithConcattingArrays,
  httpErrorToActionPayload,
  hasAnyOfKeys,
  shallowEqual,
} from '../utils';

describe('utils', () => {
  describe('forceArray', () => {
    it('returns same array if array is passed', () => {
      const array = [1, 2, 3];
      const result = forceArray(array);
      expect(result).toBe(array);
    });

    it('returns undefined if undefined', () => {
      const array = undefined;
      const result = forceArray(array);
      expect(result).toBe(array);
    });

    it('wraps passed with an array if it is not an array', () => {
      const notArray = 1;
      const expected = [1];
      const result = forceArray(notArray);
      expect(result).toEqual(expected);
    });
  });

  describe('castPropToNumber', () => {
    it('returns number if defined value is passed', () => {
      const prop = '1';
      const result = castPropToNumber(prop);
      expect(result).toBe(1);
    });

    it('returns undefined if undefined is passed', () => {
      const prop = undefined;
      const result = castPropToNumber(prop);
      expect(result).toBe(undefined);
    });
  });

  describe('pluckMinMaxPair', () => {
    it('returns min max pair by using getter function on each item', () => {
      const list = fromJS([{ number: 1 }, { number: -1 }, { number: 0 }]);
      const [min, max] = pluckMinMaxPair(list, item => item.get('number'));
      expect(min).toBe(-1);
      expect(max).toBe(1);
    });

    it('returns [0, 0] if list is empty', () => {
      const list = fromJS([]);
      const [min, max] = pluckMinMaxPair(list, item => item.get('number'));
      expect(min).toBe(0);
      expect(max).toBe(0);
    });

    it('returns min === max if list has single item', () => {
      const list = fromJS([{ number: 1 }]);
      const [min, max] = pluckMinMaxPair(list, item => item.get('number'));
      expect(min).toBe(1);
      expect(max).toBe(1);
    });
  });

  describe('convertArrayToMap', () => {
    it('converts array to map { <item>: <index> }', () => {
      const array = ['foo', 'bar'];
      const expected = {
        foo: 0,
        bar: 1,
      };
      const map = convertArrayToMap(array);
      expect(map).toEqual(expected);
    });
  });

  describe('selfOrInfinity', () => {
    it('returns self if number is defined', () => {
      expect(selfOrInfinity(1)).toEqual(1);
    });

    it('returns Infinity if number is null', () => {
      expect(selfOrInfinity(null)).toEqual(Infinity);
    });
  });

  describe('getSizeOfArrayOrImmutableList', () => {
    it('returns lenght for array', () => {
      expect(getSizeOfArrayOrImmutableList([1])).toBe(1);
    });

    it('returns size for immutable', () => {
      expect(getSizeOfArrayOrImmutableList(fromJS([1, 2]))).toBe(2);
    });
  });

  describe('doSetsHaveCommentItem', () => {
    it('returns true if immutable sets have a common item', () => {
      const set1 = Set([1, 2, 3]);
      const set2 = Set([3, 4, 5, 6]);
      const result = doSetsHaveCommonItem(set1, set2);
      expect(result).toBe(true);
    });

    it('returns true if immutable sets are same', () => {
      const set1 = Set([1, 2, 3]);
      const set2 = Set([1, 2, 3]);
      const result = doSetsHaveCommonItem(set1, set2);
      expect(result).toBe(true);
    });

    it('returns false if immutable sets are empty', () => {
      const set1 = Set([]);
      const set2 = Set([]);
      const result = doSetsHaveCommonItem(set1, set2);
      expect(result).toBe(false);
    });

    it('returns false if one of immutable sets is empty', () => {
      const set1 = Set([]);
      const set2 = Set([1, 2, 3]);
      const result = doSetsHaveCommonItem(set1, set2);
      expect(result).toBe(false);
    });

    it('returns false if immutable sets do not have a common item', () => {
      const set1 = Set([1, 2, 3]);
      const set2 = Set([5, 6]);
      const result = doSetsHaveCommonItem(set1, set2);
      expect(result).toBe(false);
    });
  });

  describe('hasAnyOfKeys', () => {
    it('returns true if it has one of the keys', () => {
      const map = Map({ one: 1, two: 2 });
      const keys = ['one', 'three'];
      const result = hasAnyOfKeys(map, keys);
      expect(result).toBe(true);
    });

    it('returns true if it has all of the keys', () => {
      const map = Map({ one: 1, two: 2, three: 3 });
      const keys = ['one', 'two'];
      const result = hasAnyOfKeys(map, keys);
      expect(result).toBe(true);
    });

    it('returns false if it does not have any of the keys', () => {
      const map = Map({ one: 1, two: 2, three: 3 });
      const keys = ['another'];
      const result = hasAnyOfKeys(map, keys);
      expect(result).toBe(false);
    });

    it('returns false if no keys are passed', () => {
      const map = Map({ one: 1, two: 2 });
      const keys = [];
      const result = hasAnyOfKeys(map, keys);
      expect(result).toBe(false);
    });
  });

  describe('isEmptyObjectShallow', () => {
    it('returns true if {}', () => {
      expect(isEmptyObjectShallow({})).toBe(true);
    });

    it('returns true if null', () => {
      expect(isEmptyObjectShallow(null)).toBe(true);
    });

    it('returns true if has only empty properties', () => {
      expect(isEmptyObjectShallow({ foo: '', bar: null })).toBe(true);
    });

    it('returns false if has a non empty string property', () => {
      expect(isEmptyObjectShallow({ foo: 'bar' })).toBe(false);
    });

    it('returns false if has a boolean property ', () => {
      expect(isEmptyObjectShallow({ foo: false })).toBe(false);
    });

    it('returns false if has a number property ', () => {
      expect(isEmptyObjectShallow({ foo: 0 })).toBe(false);
    });

    it('returns false if has a nested empty property ', () => {
      expect(isEmptyObjectShallow({ foo: { bar: null } })).toBe(false);
    });
  });

  describe('mergeWithConcattingArrays', () => {
    it('concats arrays during merging', () => {
      const obj1 = { array: [1] };
      const obj2 = { array: [2, 3] };
      const expected = { array: [1, 2, 3] };
      const result = mergeWithConcattingArrays(obj1, obj2);
      expect(result).toEqual(expected);
    });

    it('overrides if only one of them is array', () => {
      const obj1 = { foo: [1], another: 'value' };
      const obj2 = { foo: 'bar', another: [2] };
      const expected = { foo: 'bar', another: [2] };
      const result = mergeWithConcattingArrays(obj1, obj2);
      expect(result).toEqual(expected);
    });

    it('merges simple objects', () => {
      const obj1 = { a: 'a1', b: 'b1' };
      const obj2 = { b: 'b2', c: 'c2' };
      const expected = { a: 'a1', b: 'b2', c: 'c2' };
      const result = mergeWithConcattingArrays(obj1, obj2);
      expect(result).toEqual(expected);
    });

    it('clones destination before merging', () => {
      const obj1 = { a: 'a1' };
      const obj2 = { b: 'b2' };
      const result = mergeWithConcattingArrays(obj1, obj2);
      expect(result).not.toBe(obj1);
    });
  });

  describe('httpErrorToActionPayload', () => {
    it('convert http error with status and data to payload', () => {
      const error = {
        response: {
          status: 500,
          data: { foo: 'bar' },
        },
      };
      const result = httpErrorToActionPayload(error);
      const expected = {
        status: 500,
        foo: 'bar',
      };
      expect(result).toEqual(expected);
    });

    it('convert http error with only status', () => {
      const error = {
        response: {
          status: 500,
        },
      };
      const result = httpErrorToActionPayload(error);
      const expected = {
        status: 500,
      };
      expect(result).toEqual(expected);
    });

    it('convert http network error', () => {
      const error = {
        response: null,
      };
      const result = httpErrorToActionPayload(error);
      const expected = {
        status: 'network',
      };
      expect(result).toEqual(expected);
    });
  });

  describe('shallowEqual', () => {
    it('returns false if either argument is null', () => {
      expect(shallowEqual(null, {})).toBe(false);
      expect(shallowEqual({}, null)).toBe(false);
    });

    it('returns true if both arguments are null or undefined', () => {
      expect(shallowEqual(null, null)).toBe(true);
      expect(shallowEqual(undefined, undefined)).toBe(true);
    });

    it('returns true if arguments are not objects and are equal', () => {
      expect(shallowEqual(1, 1)).toBe(true);
    });

    it('returns true if arguments are shallow equal', () => {
      expect(shallowEqual({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 })).toBe(
        true
      );
    });

    it('returns true when comparing NaN', () => {
      expect(shallowEqual(NaN, NaN)).toBe(true);

      expect(
        shallowEqual({ a: 1, b: 2, c: 3, d: NaN }, { a: 1, b: 2, c: 3, d: NaN })
      ).toBe(true);
    });

    it('returns false if arguments are not objects and not equal', () => {
      expect(shallowEqual(1, 2)).toBe(false);
    });

    it('returns false if only one argument is not an object', () => {
      expect(shallowEqual(1, {})).toBe(false);
    });

    it('returns false if first argument has too many keys', () => {
      expect(shallowEqual({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toBe(false);
    });

    it('returns false if second argument has too many keys', () => {
      expect(shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })).toBe(false);
    });

    it('returns false if arguments are not shallow equal', () => {
      expect(shallowEqual({ a: 1, b: 2, c: {} }, { a: 1, b: 2, c: {} })).toBe(
        false
      );
    });
  });
});
