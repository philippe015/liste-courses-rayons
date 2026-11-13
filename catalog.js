'use strict';
const AISLES = {
  produce: ['🥕', 'Fruits et légumes', ['tomate', 'pomme', 'banane', 'carotte', 'salade', 'courgette', 'oignon', 'ail', 'poire', 'citron', 'orange', 'pomme de terre', 'avocat', 'concombre']],
  bakery: ['🥖', 'Pain et boulangerie', ['pain', 'baguette', 'croissant', 'brioche']],
  meat: ['🍗', 'Viande et charcuterie', ['poulet', 'steak', 'jambon', 'saucisse', 'boeuf', 'porc', 'lardon', 'dinde']],
  fish: ['🐟', 'Poissonnerie', ['saumon', 'cabillaud', 'crevette', 'poisson']],
  dairy: ['🥛', 'Produits frais et œufs', ['lait', 'beurre', 'yaourt', 'fromage', 'oeuf', 'creme', 'mozzarella', 'emmental']],
  pantry: ['🍝', 'Épicerie salée', ['pate', 'riz', 'farine', 'huile', 'sel', 'poivre', 'lentille', 'thon', 'conserve', 'semoule', 'moutarde']],
  sweet: ['🍪', 'Épicerie sucrée', ['sucre', 'chocolat', 'biscuit', 'confiture', 'miel', 'cereale', 'cafe', 'the']],
  drinks: ['🧃', 'Boissons', ['eau', 'jus', 'soda', 'biere', 'vin', 'limonade']],
  frozen: ['🧊', 'Surgelés', ['surgele', 'glace', 'pizza surgelee', 'frite']],
  home: ['🧽', 'Entretien et maison', ['lessive', 'eponge', 'liquide vaisselle', 'sac poubelle', 'essuie tout', 'papier toilette']],
  care: ['🧴', 'Hygiène et bébé', ['savon', 'shampoing', 'dentifrice', 'couche', 'gel douche']],
  pets: ['🐾', 'Animaux', ['croquette', 'litiere', 'patee']],
  other: ['🛒', 'Autres articles', []]
};
const DEFAULT_ORDERS = {
  lidl: ['produce', 'bakery', 'meat', 'fish', 'dairy', 'pantry', 'sweet', 'drinks', 'home', 'care', 'pets', 'frozen', 'other'],
  leclerc: ['produce', 'fish', 'meat', 'bakery', 'dairy', 'pantry', 'sweet', 'drinks', 'care', 'home', 'pets', 'frozen', 'other']
};
function normalize(value) { return value.toLowerCase().replace(/œ/g, 'oe').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[-’']/g, ' '); }
function detectAisle(name) {
  const words = normalize(name).split(/\s+/);
  let result = 'other', best = 0;
  for (const [id, [, , terms]] of Object.entries(AISLES)) {
    for (const term of terms) {
      const tokens = normalize(term).split(' ');
      const matches = words.some((_, start) => tokens.every((token, i) => words[start + i] === token || words[start + i] === token + 's' || words[start + i] === token + 'x'));
      if (matches && term.length > best) { best = term.length; result = id; }
    }
  }
  return result;
}
if (typeof module !== 'undefined') module.exports = { AISLES, DEFAULT_ORDERS, detectAisle };
