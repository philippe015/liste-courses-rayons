const { test } = require('node:test');
const assert = require('node:assert/strict');
const { AISLES, DEFAULT_ORDERS, detectAisle, restoreOrder } = require('./catalog.js');
test('Classement des produits, pluriels, accents et expressions', () => {
  for (const [name, aisle] of [['tomates', 'produce'], ['pâtes', 'pantry'], ['œufs', 'dairy'], ['lait', 'dairy'], ['pâtée', 'pets'], ['pizza surgelée', 'frozen'], ['pommes de terre', 'produce'], ['papier toilette', 'home'], ['café', 'sweet'], ['eau', 'drinks'], ['cadeau', 'other'], ['produit inconnu', 'other']]) assert.equal(detectAisle(name), aisle, name);
});
test('Chaque parcours contient exactement tous les rayons', () => {
  for (const order of Object.values(DEFAULT_ORDERS)) assert.deepEqual([...order].sort(), Object.keys(AISLES).sort());
});
test('Migration de l’ancien parcours Lidl sans modifier les parcours personnalisés', () => {
  const legacy = ['produce', 'bakery', 'meat', 'fish', 'dairy', 'pantry', 'sweet', 'drinks', 'home', 'care', 'pets', 'frozen', 'other'];
  assert.deepEqual(restoreOrder('lidl', legacy), DEFAULT_ORDERS.lidl);
  const custom = [...legacy].reverse();
  assert.deepEqual(restoreOrder('lidl', custom), custom);
  assert.deepEqual(restoreOrder('leclerc', DEFAULT_ORDERS.leclerc), DEFAULT_ORDERS.leclerc);
  assert.deepEqual(restoreOrder('lidl', ['bakery', 'bakery']), DEFAULT_ORDERS.lidl);
  assert.deepEqual(restoreOrder('lidl', undefined), DEFAULT_ORDERS.lidl);
  const restored = restoreOrder('lidl', undefined);
  restored.reverse();
  assert.equal(DEFAULT_ORDERS.lidl[0], 'bakery');
});
