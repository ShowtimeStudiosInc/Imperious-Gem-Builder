const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');

class Element {
  constructor(tag) {
    this.tag = tag;
    this.children = [];
    this.value = '';
    this.textContent = '';
    this.listeners = {};
    this.classList = { toggle() {} };
  }
  get options() { return this.children; }
  set selectedIndex(index) { this.value = this.children[index]?.value || ''; }
  append(...nodes) { this.children.push(...nodes); }
  appendChild(node) { this.children.push(node); return node; }
  replaceChildren(...nodes) {
    this.children = nodes;
    if (this.tag === 'select') this.value = nodes[0]?.value || '';
  }
  addEventListener(event, callback) { this.listeners[event] = callback; }
}

function loadApp() {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const elements = {};
  for (const match of html.matchAll(/<(select|input|textarea|[a-z][a-z0-9-]*)\b[^>]*\bid="([^"]+)"[^>]*>/gi)) {
    elements[match[2]] = new Element(match[1].toLowerCase());
  }
  elements.level.value = '1';
  const document = {
    getElementById: id => elements[id] || null,
    createElement: tag => new Element(tag),
    addEventListener() {},
    querySelectorAll: () => []
  };
  const context = vm.createContext({ window: {}, document });
  vm.runInContext(fs.readFileSync(path.join(root, 'gem-database.js'), 'utf8'), context);
  vm.runInContext(fs.readFileSync(path.join(root, 'app.js'), 'utf8'), context);
  return elements;
}

function selectGem(elements, name) {
  elements.gem.value = name;
  elements.gem.listeners.input();
}

test('Metal Society can be selected for metals without an era tag', () => {
  const elements = loadApp();
  selectGem(elements, 'Iron');
  const option = elements.era.options.find(item => item.value === 'Era 0-1 Metal Society');
  assert.equal(option.disabled, false);

  elements.era.value = option.value;
  elements.era.listeners.input();
  assert.equal(elements.era.value, option.value);
  assert.deepEqual(elements.stats.children.map(item => Number(item.children[1].textContent)), [44, 6, 14, 3, 3, 0]);
  assert(elements.abilities.children.some(item => item.textContent === 'Material Conductivity'));

  selectGem(elements, 'Bronze, Era 0-1');
  assert.equal(elements.era.value, option.value);
});

test('Metal Society is unavailable for non-metals and resets after changing gem', () => {
  const elements = loadApp();
  selectGem(elements, 'Iron');
  elements.era.value = 'Era 0-1 Metal Society';
  elements.era.listeners.input();
  selectGem(elements, 'Coal');

  const option = elements.era.options.find(item => item.value === 'Era 0-1 Metal Society');
  assert.equal(option.disabled, true);
  assert.equal(elements.era.value, 'No modifier');
  assert(!elements.abilities.children.some(item => item.textContent === 'Material Conductivity'));
});
