'use strict';

/**
* Methods for template html
* @module 'nodejs/my/tpl.js'
*/
/** @namespace */
const tpl = module.exports;


/**
 * tpl.foreach: for arrays
 * @param  {Array}   array:
 * @param  {Function} handler:
 * @param  {Any}   params:
 * @return {String}
 */
tpl.foreach = function (array, handler, params) {
  var res = '';
  for (var i = 0, l = array.length; i < l; i++) {
    var el = array[i];
    if (el || el === 0) {
      res += handler(el, i, params) || '';
    }
  }
  return res;
};


/**
 * tpl.each: for objects
 * @example
 * tpl.each({ 1: 'Hello', 'string': 2 }, function(key, value) {
 *   console.log(key, value);
 * });
 * @param  {Object}   obj
 * @param  {Function} cb(key, value)
 * @return {String}
 */
tpl.each = function (obj, handler) {
  var res = '';
  var keys = Object.keys(obj);
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    res += handler(key, obj[key]);
  }
  return res;
};





/**
 * tpl.switch
 * @example
 * var res = tpl.switch(3).case(1, function () {
 *   return '<p>1</p>';
 * }).case(2, function () {
 *   return '<p>2</p>';
 * }).default(function () {
 *  return '<p>other</p>';
 * }).get();
 * @param  {Any} val
 * @return {String}
 */
tpl.switch = function (val) {
  return new Switch_case(val);
};

class Switch_case {
  /**
   * constructor
   * @param  {Any} val [description]
   */
  constructor(val) {
    this._list = [];
    this._val = val;
  }

  /**
   * case
   * @param  {function(): boolean | boolean} condition
   * @param  {Function} task
   * @return {Switch_case}
   */
  case(condition, task) {
    this._list.push([ condition, task ]);
    return this;
  }

  /**
   * default
   * @param  {Function} default_task:
   * @return {Switch_case}
   */
  default(default_task) {
    this._default_task = default_task;
    return this;
  }

  /**
   * get
   * @return {string}
   */
  get() {
    for (var i = 0, l = this._list.length; i < l; i++) {
      var els = this._list[i];
      var condition = els[0];
      var task = els[1];

      if (condition === this._val) {
        return task() || '';
      }
    }
    return this._default_task() || '';
  }

  toString() {
    return this.get();
  }
}

/**
 * tpl.func: call function and return value
 * @example
 * tpl.func(() => {
 *   if (true) {
 *     return '/;
 *   } else {
 *     return '/some'
 *   }
 * });
 * @param  {Function} cb
 * @return {String}
 */
tpl.func = function (cb) {
  return cb() || '';
};


// TODO: convert tpl.if_3 => tpl.if via test
/**
 * if_3
 * @param  {function(): boolean | boolean} conditon
 * @param  {function(): string | string} if_cb - cb for if
 * @return {function(): string}
*/
tpl.if = function(conditon, if_cb) {
  var else_cb;
  var list_else_if = [];
  // TODO: rewrite to Class
  var obj = {

    /**
     * else_if- optional method
     * @param  {function():boolean}   conditon
     * @param  {function(): string | string} cb
     * @return {obj}
     */
    else_if(conditon, cb) {
      list_else_if.push({ conditon, cb });
      return obj;
    },

    /**
     * else - optional method
     * @param  {function():string} cb
     * @return {obj} return self
     */
    else: (cb) => {
      else_cb = cb;
      return obj;
    },
    toString() {
      conditon = (typeof conditon === 'function') ? conditon() : conditon;
      if (Boolean(conditon)) {
        if (typeof if_cb === 'function') {
          return if_cb();
        } else {
          return (if_cb || '');
        }
      } else {
        var else_if_cb = _search_in_else_if(list_else_if);
        if (typeof else_if_cb === 'function') {
          return else_if_cb();
        } else if (typeof else_if_cb === 'string') {
          return else_if_cb || '';
        }

        if (typeof else_cb === 'function') {
          return else_cb();
        } else {
          return (else_cb || '');
        }

      }
    },
  };

  return obj;
};


/**
 * _search_in_else_if
 * @param  {Array<{ conditon: function():boolean, cb: function():string | string }>} list_else_if
 * @return {boolean}
 */
function _search_in_else_if(list_else_if) {
  if (!list_else_if.length) {
    return false;
  }
  for (var i = 0, l = list_else_if.length; i < l; i++) {
    var el = list_else_if[i];
    var conditon = (typeof el.conditon === 'function') ? el.conditon() : el.conditon;
    if (Boolean(conditon)) {
      return el.cb;
    }
  }
  return false;
}

