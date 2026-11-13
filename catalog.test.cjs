const { test } = require('node:test');
const assert = require('node:assert/strict');
const { AISLES, DEFAULT_ORDERS, detectAisle } = require('./catalog.js');
test('Classement des produits, pluriels, accents et expressions', () => {
  for (const [name, aisle] of [['tomates', 'produce'], ['pâtes', 'pantry'], ['œufs', 'dairy'], ['lait', 'dairy'], ['pâtée', 'pets'], ['pizza surgelée', 'frozen'], ['pommes de terre', 'produce'], ['papier toilette', 'home'], ['café', 'sweet'], ['eau', 'drinks'], ['cadeau', 'other'], ['produit inconnu', 'other']]) assert.equal(detectAisle(name), aisle, name);
});
test('Chaque parcours contient exactement tous les rayons', () => {
  for (const order of Object.values(DEFAULT_ORDERS)) assert.deepEqual([...order].sort(), Object.keys(AISLES).sort());
});
