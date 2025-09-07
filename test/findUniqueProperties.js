'use strict';

QUnit.module("Тестируем функцию findUniqueProperties", function() {
    QUnit.test("Работает правильно для объектов с уникальными свойствами", function(assert) {
        const result = findUniqueProperties(
            { a: "ca", b: 2, c: false },
            { b: 2, c: true, d: 5 }
        );

        assert.deepEqual(result, { a: "ca", d: 5 }, "Должны быть уникальные свойства из обоих объектов.");
    });

    QUnit.test("Работает правильно для объектов с отсутствующими свойствами", function(assert) {
        const result = findUniqueProperties(
            { x: null, y: "abc" },
            { y: "abc", z: 30 }
        );

        assert.deepEqual(result, { x: null, z: 30 }, "Должны быть уникальные свойства x и z.");
    });

    QUnit.test("Работает правильно для идентичных объектов", function(assert) {
        const result = findUniqueProperties(
            { a: "hello", b: 2, c: true },
            { a: "hello", b: 2, c: true }
        );

        assert.deepEqual(result, {}, "Идентичные объекты должны вернуть пустой объект.");
    });

    QUnit.test("Работает правильно для одного пустого объекта", function(assert) {
        const result = findUniqueProperties(
            {},
            { a: 1, b: 2 }
        );

        assert.deepEqual(result, { a: 1, b: 2 }, "При передаче пустого и не пустого объекта должны вернуть не пустой объект.");
    });

    QUnit.test("Работает правильно для объектов со всеми различными ключами", function(assert) {
        const result = findUniqueProperties(
            { a: 1, b: 2, c: 3 },
            { d: 2, e: 4, f: 5 }
        );

        assert.deepEqual(result, { a: 1, b: 2, c: 3, d: 2, e: 4, f: 5 }, "Должны вернуть все свойства из обоих объектов.");
    });
    
    QUnit.test("Работает правильно для объектов со вложенными объектами", function(assert) {
        const result = findUniqueProperties(
            { a: { a: "a", b: "b" }, b: { a: 1 }, c: { b: true } },
            { a: { a: "a", b: "b" }, b: { a: 1, b: false }, d: 12 }
        );

        assert.deepEqual(result, { c: { b: true }, d: 12 }, "Должны вернуть уникальные свойства с и d.");
    });

    QUnit.test("Работает правильно для ошибочных типов данных", function(assert) {
        const result = findUniqueProperties(
            "poopaapopa",
            false
        );

        assert.deepEqual(result, {  }, "Должны вернуть пустой объект.");
    });

    QUnit.test("Работает правильно для типа данных null", function(assert) {
        const result = findUniqueProperties(
            null,
            { a: 1, b: 2 }
        );

        assert.deepEqual(result, {}, "При типе данных null должны вернуть пустой объект.");
    });

    QUnit.test("Работает правильно для типа данных undefined", function(assert) {
        const result = findUniqueProperties(
            { a: undefined, b: 2 },
            undefined
        );

        assert.deepEqual(result, {}, "При типе данных undefined должны вернуть пустой объект.");
    });
});
