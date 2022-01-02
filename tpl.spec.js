'use strict';

const assert = require('assert');
const tpl = require('./tpl.js');


describe('tpl.js', function () {

  it('tpl.foreach', function () {
    var list = [10, 12, 24];
    var str = tpl.foreach(list, function (el, i, params) {
      return '<p>' + (el + params[i]) + '</p>';
    }, list);
    assert.ok(
      str === '<p>20</p><p>24</p><p>48</p>',
      'incorrect string => ' + str
    );
  });

  it('tpl.each', function () {
    var obj = { k: 10, k1: 12, k2: 24 };
    var str = tpl.each(obj, function (key, value) {
      return '<p>' + (value + obj[key]) + '</p>';
    });
    assert.ok(
      str === '<p>20</p><p>24</p><p>48</p>',
      'incorrect string => ' + str
    );
  });

  // it('tpl.style', function () {
  //   var ar = ['margin-top:2px 3 auto 0;', 'border-radius:2px solod red'];
  //   assert.ok(
  //     tpl.style(ar) === '"' + ar.join('') + '"',
  //     'incorrect tpl.style'
  //   );
  //   assert.ok(
  //     tpl.style(ar, true) === 'style="' + ar.join('') + '"',
  //     'incorrect tpl.style'
  //   );
  // });


  it('tpl.switch', function () {
    const fn_switch = function (variable) {
      return tpl.switch(variable).case(1, function () {
        return '<p>1</p>';
      }).case(2, function () {
        return '<p>2</p>';
      }).default(function () {
        return '<p>other</p>';
      }).get();
    };

    assert.ok(
      fn_switch(1) === '<p>1</p>',
      'incorrect tpl.switch'
    );

    assert.ok(
      fn_switch(2) === '<p>2</p>',
      'incorrect tpl.switch'
    );

    assert.ok(
      fn_switch(3) === '<p>other</p>',
      'incorrect tpl.switch'
    );

    const switch_to_string = function (variable) {
      return tpl.switch(variable).case(1, function () {
        return '<p>1</p>';
      }).case(2, function () {
        return '<p>2</p>';
      }).default(function () {
        return '<p>other</p>';
      });
    };

    assert.ok(
      (switch_to_string(1) + '') === '<p>1</p>',
      'incorrect tpl.switch'
    );

  });

  it('tpl.if', function () {
    const func_if_elseif_else = function (variable) {
      return tpl.if(() => variable === 'if', () => 'if')
        .else_if(() => variable === 'else if', () => 'else if')
        .else(() => 'else')
        + '';
    };

    assert.ok(
      func_if_elseif_else('if') === 'if',
      'incorrect tpl.if'
    );

    assert.ok(
      func_if_elseif_else('else if') === 'else if',
      'incorrect tpl.if'
    );

    assert.ok(
      func_if_elseif_else() === 'else',
      'incorrect tpl.if'
    );


    const func_if = function (variable) {
      return tpl.if(() => variable === 'if', () => 'if')
        + '';
    };

    assert.ok(
      func_if('if') === 'if',
      'incorrect tpl.if'
    );

    assert.ok(
      func_if() === '',
      'incorrect tpl.if'
    );


    const func_if_else = function (variable) {
      return tpl.if(() => variable === 'if', () => 'if').else(() => 'else')
        + '';
    };

    assert.ok(
      func_if_else('if') === 'if',
      'incorrect tpl.if'
    );

    assert.ok(
      func_if_else() === 'else',
      'incorrect tpl.if'
    );


    const func_if_elseif_else_static = function (variable) {
      return tpl.if(variable === 'if', () => 'if')
        .else_if(variable === 'else if', () => 'else if')
        .else(() => 'else')
        + '';
    };

    assert.ok(
      func_if_elseif_else_static('if') === 'if',
      'incorrect tpl.if'
    );

    assert.ok(
      func_if_elseif_else_static('else if') === 'else if',
      'incorrect tpl.if'
    );

    assert.ok(
      func_if_elseif_else_static() === 'else',
      'incorrect tpl.if'
    );

    const func_if_elseif_else_static_2 = function (variable) {
      return tpl.if(variable === 'if', 'if')
        .else_if(variable === 'else if', 'else if')
        .else('else')
        + '';
    };

    assert.ok(
      func_if_elseif_else_static_2('if') === 'if',
      'incorrect tpl.if'
    );

    assert.ok(
      func_if_elseif_else_static_2('else if') === 'else if',
      'incorrect tpl.ifh'
    );

    assert.ok(
      func_if_elseif_else_static_2() === 'else',
      'incorrect tpl.if'
    );
  });


  // it('tpl.class', function () {
  //   assert.ok(
  //     tpl.class({ test: true, abc: true }) === 'class="test abc"',
  //     'incorrect tpl.class'
  //   );

  //   assert.ok(
  //     tpl.class({ test: true, abc: false }) === 'class=test',
  //     'incorrect tpl.class'
  //   );
  // });

});


