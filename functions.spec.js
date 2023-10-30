const assert = require('assert');
const func = require('./functions');
// import { validate_players, there_are_free_spaces } from './functions.js';

const TEST = true;

assert.strictEqual(func.validate_players("", "")[0], false);
assert.strictEqual(func.validate_players(" ", "")[0], false);
assert.strictEqual(func.validate_players(" a", "")[0], false);
assert.strictEqual(func.validate_players(" a ", "")[0], false);
assert.strictEqual(func.validate_players(" a ", "a")[0], false);
assert.strictEqual(func.validate_players("a", "a")[0], false);
assert.strictEqual(func.validate_players("a", "b")[0], true);

let pos_busy = new Object({"value": 1});
let pos_available = new Object({"value": ""});
assert.strictEqual(func.there_are_free_spaces(Array(pos_busy, pos_busy)), false);
assert.strictEqual(func.there_are_free_spaces(Array()), false);
assert.strictEqual(func.there_are_free_spaces(Array(pos_available, pos_busy)), true);
assert.strictEqual(func.there_are_free_spaces(Array(pos_available, pos_available)), true);

console.log("Test OK!");
