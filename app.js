'use strict';
const $ = id => document.getElementById(id);
const KEY = 'mon-panier-v1';
let state = { store: 'lidl', items: [], orders: structuredClone(DEFAULT_ORDERS) };
try {
  const saved = JSON.parse(localStorage.getItem(KEY));
  if (saved && DEFAULT_ORDERS[saved.store] && Array.isArray(saved.items)) {
    state.store = saved.store;
    state.items = saved.items.filter(i => i && typeof i.id === 'string' && typeof i.name === 'string' && AISLES[i.aisle] && Number.isInteger(i.quantity) && i.quantity > 0 && i.quantity <= 999).map(i => ({ ...i, done: i.done === true }));
    for (const store of Object.keys(DEFAULT_ORDERS)) {
      state.orders[store] = restoreOrder(store, saved.orders?.[store]);
    }
  }
} catch { $('status').textContent = 'La sauvegarde est indisponible ou illisible. Vous pouvez utiliser la liste pendant cette session.'; }
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); }
  catch { $('status').textContent = 'Sauvegarde impossible : conservez cette page ouverte ou copiez la liste.'; }
}
function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function button(text, label, action) {
  const node = element('button', text, 'secondary'); node.type = 'button'; node.setAttribute('aria-label', label); node.addEventListener('click', action); return node;
}
function render() {
  $('store').value = state.store;
  $('route-note').hidden = state.store !== 'lidl';
  $('reset-route').textContent = state.store === 'lidl' ? 'Appliquer le parcours Champigny' : 'Rétablir le parcours Leclerc';
  const done = state.items.filter(i => i.done).length;
  $('count').textContent = `${done}/${state.items.length}`;
  $('progress').max = state.items.length || 1; $('progress').value = done;
  $('list').replaceChildren(); $('order').replaceChildren();
  if (!state.items.length) $('list').append(element('p', 'Votre panier attend ses premiers articles. Ajoutez un produit pour commencer.', 'empty'));
  state.orders[state.store].forEach((id, index, order) => {
    const [icon, name] = AISLES[id];
    const settings = element('div', undefined, 'order-row'); settings.append(element('span', `${icon} ${name}`));
    for (const [direction, symbol] of [[-1, '↑'], [1, '↓']]) {
      const move = button(symbol, `${direction < 0 ? 'Monter' : 'Descendre'} ${name}`, () => {
        const target = index + direction;
        [order[index], order[target]] = [order[target], order[index]];
        save(); render();
        $('order').children[target].querySelectorAll('button')[direction < 0 ? 0 : 1].focus();
      });
      move.disabled = index + direction < 0 || index + direction >= order.length; settings.append(move);
    }
    $('order').append(settings);
    const items = state.items.filter(i => i.aisle === id);
    if (!items.length) return;
    const section = element('section', undefined, 'card aisle'); section.append(element('h3', `${icon} ${name}`));
    for (const item of items) {
      const row = element('div', undefined, 'item' + (item.done ? ' done' : ''));
      const label = element('label'); const check = element('input'); check.type = 'checkbox'; check.checked = item.done;
      check.addEventListener('change', () => { item.done = check.checked; save(); render(); const current = document.getElementById('item-' + item.id); current?.focus(); });
      check.id = 'item-' + item.id;
      label.append(check, element('span', item.name), element('small', `× ${item.quantity}`));
      const select = element('select'); select.setAttribute('aria-label', `Rayon de ${item.name}`);
      for (const [key, [, title]] of Object.entries(AISLES)) { const option = element('option', title); option.value = key; select.append(option); }
      select.value = id; select.addEventListener('change', () => { item.aisle = select.value; save(); render(); });
      row.append(label, select, button('×', `Supprimer ${item.name}`, () => { state.items = state.items.filter(i => i.id !== item.id); save(); render(); })); section.append(row);
    }
    $('list').append(section);
  });
}
for (const [id, [, title, terms]] of Object.entries(AISLES)) {
  const option = element('option', title); option.value = id; $('aisle').append(option);
  for (const term of terms) { const suggestion = element('option'); suggestion.value = term; $('suggestions').append(suggestion); }
}
$('store').addEventListener('change', () => { state.store = $('store').value; save(); render(); });
$('reset-route').addEventListener('click', () => {
  state.orders[state.store] = [...DEFAULT_ORDERS[state.store]];
  save(); render();
  $('status').textContent = 'Parcours appliqué. Vos articles sont conservés et triés dans cet ordre.';
});
$('add-form').addEventListener('submit', event => {
  event.preventDefault(); const name = $('product').value.trim(); if (!name) { $('product').focus(); return; }
  const quantity = Number($('quantity').value); if (!Number.isInteger(quantity) || quantity < 1 || quantity > 999) return;
  const aisle = $('aisle').value === 'auto' ? detectAisle(name) : $('aisle').value;
  state.items.push({ id: crypto.randomUUID(), name, quantity, aisle, done: false });
  save(); render(); $('product').value = ''; $('quantity').value = '1'; $('aisle').value = 'auto'; $('product').focus();
});
$('clear').addEventListener('click', () => { state.items = state.items.filter(i => !i.done); save(); render(); });
$('print').addEventListener('click', () => window.print());
$('export').addEventListener('click', async () => {
  const lines = ['Ma liste de courses — ' + (state.store === 'lidl' ? 'Lidl Champigny — rue de Bernau' : 'E.Leclerc')];
  for (const id of state.orders[state.store]) {
    const items = state.items.filter(i => i.aisle === id); if (!items.length) continue;
    lines.push('\n' + AISLES[id][1], ...items.map(i => `${i.done ? '☑' : '☐'} ${i.name} × ${i.quantity}`));
  }
  try { await navigator.clipboard.writeText(lines.join('\n')); $('status').textContent = 'Liste copiée !'; }
  catch { $('status').textContent = 'La copie est indisponible dans ce navigateur. Utilisez le bouton Imprimer pour enregistrer en PDF.'; }
});
render();
