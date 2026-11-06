const database = window.GEM_DATABASE;
if (!database) throw new Error('Gem database did not load before the application.');

const S = ['HP', 'ATK', 'DEF', 'SPD', 'INT', 'MAG'];
const stat = (hp = 0, atk = 0, def = 0, spd = 0, int = 0, mag = 0) => ({ HP: hp, ATK: atk, DEF: def, SPD: spd, INT: int, MAG: mag });
const zero = stat();
const gems = database.gems;
const quartz = database.quartzShifts;
const modifiers = [{ name: 'No modifier', stats: zero, abilityDetails: [] }, ...database.modifiers];
const cuts = database.cuts;
const factions = [...new Set(gems.map(record => record.faction))];
const abilityDatabase = [...gems, ...quartz].flatMap(record => {
  const details = record.abilityDetails || [];
  if (!details.length) return (record.abilities || []).map(name => ({ name, gem: record.name, rank: record.rank || record.faction, description: '' }));
  return details.flatMap(detail => (detail.names?.length ? detail.names : [detail.name]).filter(Boolean).map(name => ({
    name,
    gem: record.name,
    rank: record.rank || record.faction,
    description: detail.description || ''
  })));
});

const $ = id => document.getElementById(id); const factionEl = $('faction'), gemEl = $('gem'), prismEl = $('prism'), eraEl = $('era'), cutEl = $('cut'), defectStatAEl = $('defect-stat-a'), defectStatBEl = $('defect-stat-b'), fusionAEl = $('fusion-a'), fusionBEl = $('fusion-b');
function option(value, label = value) { const node = document.createElement('option'); node.value = value; node.textContent = label; return node; }
function choices(el, items, label = x => x) { el.replaceChildren(...items.map(x => option(typeof x === 'string' ? x : x.name, label(x)))); }
function activeRecord() { return gems.find(g => g.name === gemEl.value && g.faction === factionEl.value); }
function rankFor(record) { return record.rank || (record.faction === 'United Frontier' ? 'United Frontier' : 'Not assigned'); }
function heightFor(record) { return record.height || 'Not assigned'; }
function combine(...sources) { const out = {}; S.forEach(k => out[k] = sources.reduce((sum, source) => sum + (source?.[k] || 0), 0)); return out; }
function detailNames(details = []) { return [...new Set(details.flatMap(detail => detail.names?.length ? detail.names : [detail.name]).filter(Boolean))]; }
function recordAbilities(record) { return record.abilities?.length ? record.abilities : detailNames(record.abilityDetails); }
function levelGrowth(level, classification = 'Gem') {
  const rules = database.rules.levelGrowth;
  const gained = Math.max(0, level - 1);
  const defGains = Math.floor(gained / rules.defEveryLevels);
  return stat(
    gained * rules.hpPerLevel + defGains * rules.hpPerDefGain,
    Math.floor(gained / rules.atkEveryLevels),
    defGains,
    Math.floor(gained / rules.spdEveryLevels),
    rules.intEveryLevels ? Math.floor(gained / rules.intEveryLevels) : 0,
    Math.floor(gained / rules.magEveryLevels) * (classification === 'Organic' ? rules.organicMagPerGain : rules.gemMagPerGain)
  );
}
function totalExpForLevel(level) {
  const { firstLevel, firstThreshold, increasePerLevel } = database.rules.experience;
  let total = 0;
  for (let current = firstLevel; current <= level; current += 1) total += firstThreshold + (current - firstLevel) * increasePerLevel;
  return total;
}
function expToNextLevel(level) {
  if (level >= database.rules.levelCap) return null;
  const { firstThreshold, increasePerLevel } = database.rules.experience;
  return firstThreshold + (level - 1) * increasePerLevel;
}
function refreshGems() {
  const selected = gemEl.value;
  const list = gems.filter(g => g.faction === factionEl.value).sort((a, b) => a.name.localeCompare(b.name));
  choices(gemEl, list, g => g.name);
  if (list.some(g => g.name === selected)) gemEl.value = selected;
  refresh();
}
function fusionId(record) { return `${record.faction}|${record.name}`; }
function fusionRecords() {
  const clearQuartz = gems.find(record => record.name === 'Clear Quartz' && record.faction === 'United Frontier');
  const quartzTypes = clearQuartz ? quartz.map(shift => ({
    ...shift,
    stats: combine(clearQuartz.stats, shift.statModifier),
    isQuartzSubtype: true
  })) : [];
  return [...gems.filter(record => !record.fusion && record.stats), ...quartzTypes]
    .sort((a, b) => `${a.faction}:${a.name}`.localeCompare(`${b.faction}:${b.name}`));
}
function fusionComponent(el) { return fusionRecords().find(record => fusionId(record) === el.value); }
function populateFusionSelect(el, selected) {
  const records = fusionRecords();
  el.replaceChildren(...records.map(record => option(fusionId(record), `${record.faction}: ${record.name}${record.isQuartzSubtype ? ' (Quartz subtype)' : ''}`)));
  if (records.some(record => fusionId(record) === selected)) el.value = selected;
}
function showFusionAbilities(target, record) {
  const abilities = recordAbilities(record);
  target.replaceChildren(...abilities.map(text => { const item = document.createElement('li'); item.textContent = text; return item; }));
}
function generateAbilitySuggestions() {
  return [{
    name: 'No predefined fusion abilities',
    description: 'The imported rules do not define additional ability combinations. Choose abilities according to the approved fusion rules.'
  }];
}

// Ability Overlap Checker functions
function searchAbilityDatabase(searchTerm) {
  const normalizedSearch = searchTerm.toLowerCase().trim();
  if (!normalizedSearch) return [];
  
  return abilityDatabase.filter(ability => {
    const nameMatch = ability.name.toLowerCase().includes(normalizedSearch);
    const descMatch = ability.description.toLowerCase().includes(normalizedSearch);
    const gemMatch = ability.gem.toLowerCase().includes(normalizedSearch);
    const rankMatch = ability.rank.toLowerCase().includes(normalizedSearch);
    return nameMatch || descMatch || gemMatch || rankMatch;
  });
}

function checkAbilityOverlap() {
  const searchInput = $('ability-search-input');
  const resultsContainer = $('ability-results');
  const searchTerm = searchInput.value;
  
  if (!searchTerm) {
    resultsContainer.innerHTML = '<p class="field-note">Enter an ability name to check for overlaps with existing gems.</p>';
    return;
  }
  
  const matches = searchAbilityDatabase(searchTerm);
  
  const summary = document.createElement('p');
  summary.className = 'field-note';
  summary.textContent = matches.length === 0
    ? `No matches found for "${searchTerm}". This ability appears to be unique.`
    : `Found ${matches.length} potential match(es) for "${searchTerm}":`;
  resultsContainer.replaceChildren(summary);
  if (matches.length > 0) {
    const resultsList = document.createElement('div');
    resultsList.className = 'ability-results-list';
    
    matches.forEach(match => {
      const resultItem = document.createElement('div');
      resultItem.className = 'ability-result-item';
      const name = document.createElement('strong');
      name.textContent = match.name;
      const gem = document.createElement('span');
      gem.className = 'ability-meta';
      gem.textContent = `Gem: ${match.gem}`;
      const rank = document.createElement('span');
      rank.className = 'ability-meta';
      rank.textContent = `Rank: ${match.rank}`;
      const description = document.createElement('p');
      description.className = 'ability-desc';
      description.textContent = match.description;
      resultItem.append(name, gem, rank, description);
      resultsList.appendChild(resultItem);
    });
    
    resultsContainer.appendChild(resultsList);
  }
}

function refreshFusion() {
  const first = fusionComponent(fusionAEl);
  const second = fusionComponent(fusionBEl);
  if (!first || !second) return;
  const combined = combine(first.stats, second.stats);
  $('fusion-a-name').textContent = `${first.name} abilities`;
  $('fusion-b-name').textContent = `${second.name} abilities`;
  $('fusion-stats').replaceChildren(...S.map(key => {
    const div = document.createElement('div');
    div.className = 'stat';
    const label = document.createElement('span');
    label.textContent = key;
    const value = document.createElement('strong');
    value.textContent = combined[key];
    const note = document.createElement('div');
    note.className = 'change';
    note.textContent = 'Base stat total';
    div.append(label, value, note);
    return div;
  }));
  showFusionAbilities($('fusion-a-abilities'), first);
  showFusionAbilities($('fusion-b-abilities'), second);
  const suggestionsContainer = $('fusion-suggestions');
  suggestionsContainer.replaceChildren(...generateAbilitySuggestions(first, second).map(suggestion => {
    const article = document.createElement('article');
    article.className = 'suggestion-card';
    const heading = document.createElement('h4');
    heading.textContent = suggestion.name;
    const description = document.createElement('p');
    description.textContent = suggestion.description;
    article.append(heading, description);
    return article;
  }));
}
function initialiseFusionTool() { const first = fusionAEl.value; const second = fusionBEl.value; populateFusionSelect(fusionAEl, first); populateFusionSelect(fusionBEl, second); if (!fusionAEl.value) fusionAEl.selectedIndex = 0; if (!fusionBEl.value) fusionBEl.selectedIndex = Math.min(1, fusionBEl.options.length - 1); refreshFusion(); }
function isMetal(record) { return record.kind === 'Metal' || record.tags?.includes('Metal Society'); }
function modifierApplies(modifier, record) {
  const kindMatches = !modifier.applicableKinds || modifier.applicableKinds.some(kind => kind === 'Metal' ? isMetal(record) : record.kind === kind);
  const tagMatches = !modifier.applicableTags || modifier.applicableTags.every(tag => record.tags?.includes(tag));
  return kindMatches && tagMatches;
}
function refreshDefectStatOptions() {
  const first = defectStatAEl.value;
  const second = defectStatBEl.value;
  choices(defectStatAEl, S);
  if (S.includes(first)) defectStatAEl.value = first;
  choices(defectStatBEl, S.filter(statName => statName !== defectStatAEl.value));
  if (defectStatBEl.options.length && [...defectStatBEl.options].some(option => option.value === second)) defectStatBEl.value = second;
}
function appendRuleList(container, title, values) {
  const heading = document.createElement('h3');
  heading.textContent = title;
  const list = document.createElement('ul');
  values.forEach(value => {
    const item = document.createElement('li');
    item.textContent = value;
    list.appendChild(item);
  });
  container.append(heading, list);
}
function renderItemsRules() {
  const rules = database.rules.items;
  const root = $('item-rules-content');
  const introduction = document.createElement('p');
  introduction.textContent = rules.description;
  root.appendChild(introduction);
  appendRuleList(root, 'Item types', rules.types.map(type => `${type.name}: ${type.description}`));
  appendRuleList(root, 'Equipment slots', [...rules.equipment.slots, `Switching equipment uses your turn: ${rules.equipment.switchUsesTurn ? 'yes' : 'no'}`, `Unarmed fighting uses ${rules.equipment.unarmedType} with no weapon ATK.`]);

  const fightHeading = document.createElement('h3');
  fightHeading.textContent = 'How a FIGHT rolls';
  root.appendChild(fightHeading);
  appendRuleList(root, 'Roll, damage, and critical rules', Object.values(rules.fight));

  const table = document.createElement('table');
  table.className = 'weapon-rules-table';
  const header = document.createElement('tr');
  ['Weapon type', 'Hits', 'Damage', 'Hit Number', 'Crit Number'].forEach(text => {
    const cell = document.createElement('th');
    cell.textContent = text;
    header.appendChild(cell);
  });
  table.appendChild(header);
  rules.weaponTypes.forEach(weapon => {
    const row = document.createElement('tr');
    [weapon.name, weapon.hits, weapon.damage, weapon.hitNumber, weapon.critNumber].forEach(text => {
      const cell = document.createElement('td');
      cell.textContent = text;
      row.appendChild(cell);
    });
    table.appendChild(row);
  });
  root.appendChild(table);
  appendRuleList(root, 'Weapon types', rules.weaponTypes.map(weapon => `${weapon.name}: ${weapon.description}`));
  appendRuleList(root, 'Shields and Defend', [
    rules.defend,
    `Shield: ${rules.shield.hits} hit; ${rules.shield.damage}; Hit Number ${rules.shield.hitNumber}; ${rules.shield.critNumber}`,
    rules.shield.defend,
    rules.shield.stale
  ]);
  appendRuleList(root, 'Armor, weight, and extra effects', [
    rules.armor,
    rules.weight,
    rules.weaponAttack,
    rules.extraEffects
  ]);
  appendRuleList(root, 'Consumables', rules.consumables);
  Object.entries(rules.templates).forEach(([name, fields]) => {
    appendRuleList(root, `${name} template`, Array.isArray(fields) ? fields : [fields]);
  });
}
function refresh() {
  const record = activeRecord(); if (!record) return;
  const prismActive = record.name === 'Clear Quartz' && record.faction === 'United Frontier'; $('prism-step').classList.toggle('hidden', !prismActive);
  const modifier = modifiers.find(m => m.name === eraEl.value) || modifiers[0];
  if (!modifierApplies(modifier, record)) eraEl.value = modifiers[0].name;
  const currentModifier = modifiers.find(m => m.name === eraEl.value) || modifiers[0];
  const rank = rankFor(record);
  const shift = prismActive && prismEl.value !== 'Unshifted' ? quartz.find(q => q.name === prismEl.value) : null;
  const base = shift ? combine(record.stats, shift.statModifier) : record.stats;
  const polishAllowed = isMetal(record);
  const cutAllowed = !polishAllowed;
  if (cutEl.value === 'Perfect Polish' && !polishAllowed) cutEl.value = 'Perfect Cut'; if (cutEl.value === 'Perfect Cut' && !cutAllowed) cutEl.value = 'Perfect Polish';
  refreshDefectStatOptions();
  $('defect-stats-step').classList.toggle('hidden', cutEl.value !== 'Defective');
  const level = Math.min(database.rules.levelCap, Math.max(1, Number.parseInt($('level').value, 10) || 1)); $('level').value = level;
  const cutData = cuts[cutEl.value] || cuts.Standard;
  const defectPenalty = cutEl.value === 'Defective' ? {
    [defectStatAEl.value]: -1,
    [defectStatBEl.value]: -1
  } : zero;
  const growth = levelGrowth(level, record.classification);
  const adjustments = combine(currentModifier.stats, cutData.stats, growth, shift?.statModifier, defectPenalty);
  const final = combine(base, currentModifier.stats, cutData.stats, growth, defectPenalty);
  const displayDetails = shift?.abilityDetails || record.abilityDetails || [];
  const allAbilityNames = shift ? recordAbilities(shift) : recordAbilities(record);
  const signatureNames = detailNames(displayDetails.filter(detail => detail.type === 'Signature Ability'));
  let baseAbilities = allAbilityNames;
  if (shift) baseAbilities = allAbilityNames.filter(ability => ability !== 'Prism');
  if (cutEl.value === 'Defective') {
    baseAbilities = baseAbilities.filter(ability => !signatureNames.includes(ability));
    baseAbilities.push('Twisted signature ability (staff-selected)');
  } else if (cutEl.value.startsWith('Perfect')) {
    baseAbilities = baseAbilities.map(ability => signatureNames.includes(ability) ? `Enhanced signature: ${ability}` : ability);
  }
  const cutAbilities = cutEl.value.startsWith('Perfect') || cutEl.value === 'Defective' ? [] : detailNames(cutData.abilityDetails);
  const abilityList = [...baseAbilities, ...detailNames(currentModifier.abilityDetails), ...cutAbilities];
  $('result-name').textContent = shift ? shift.name : record.name;
  $('rank').textContent = rank.replace(/\//g, ' / ');
  $('rank-label').textContent = 'Rank';
  $('height').textContent = heightFor(record);
  $('result-level').textContent = `${level} / ${database.rules.levelCap}`;
  $('next-exp').textContent = expToNextLevel(level) === null ? 'Level cap reached' : expToNextLevel(level).toLocaleString();
  $('total-exp').textContent = totalExpForLevel(level).toLocaleString();
  $('badges').replaceChildren(...[record.faction, ...(record.tags || []), currentModifier.unique ? 'Unique modifier' : ''].filter(Boolean).map(text => { const badge = document.createElement('span'); badge.textContent = text; return badge; }));
  $('stats').replaceChildren(...S.map(key => {
    const div = document.createElement('div');
    div.className = 'stat';
    const label = document.createElement('span');
    label.textContent = key;
    const value = document.createElement('strong');
    value.textContent = record.fusion ? '?' : Math.max(0, final[key]);
    const change = document.createElement('div');
    change.className = 'change';
    change.textContent = record.fusion ? 'Component-derived' : adjustments[key] ? `${adjustments[key] > 0 ? '+' : ''}${adjustments[key]} adjustment` : 'Base value';
    div.append(label, value, change);
    return div;
  }));
  $('abilities').replaceChildren(...abilityList.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
  const notes = [];
  if (record.fusion) notes.push(`This fusion lists ${record.components.join(' + ')} as its components. Its source provides no numeric stat combination formula, so the final stats remain unresolved.`);
  if (currentModifier.unique) notes.push('This is a unique modifier; use it only for an approved case-by-case record.');
  if (cutEl.value.startsWith('Perfect')) notes.push('The selected cut applies its imported stat modifiers and enhances the signature ability.');
  if (cutEl.value === 'Defective') notes.push(`Defective applies -1 to ${defectStatAEl.value} and ${defectStatBEl.value}; the twisted signature ability must be selected by staff.`);
  if (shift) notes.push('The selected United Frontier Quartz shift applies its imported stat modifier to Clear Quartz base stats.');
  notes.push('Level gains use the imported level-growth rules.');
  $('notice').textContent = notes.join(' ');
}
choices(factionEl, factions); choices(eraEl, modifiers, m => m.name); choices(prismEl, ['Unshifted', ...quartz.map(q => q.name)]); choices(cutEl, Object.keys(cuts)); refreshDefectStatOptions();
factionEl.addEventListener('change', refreshGems); [gemEl, prismEl, eraEl, cutEl, defectStatAEl, defectStatBEl, $('level')].forEach(el => el.addEventListener('input', refresh));
refreshGems();
fusionAEl.addEventListener('change', refreshFusion); fusionBEl.addEventListener('change', refreshFusion); initialiseFusionTool();
renderItemsRules();

// Ability Checker event listeners - wrapped in DOMContentLoaded to ensure elements exist
document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = $('ability-search-btn');
  const searchInput = $('ability-search-input');
  if (searchBtn) searchBtn.addEventListener('click', checkAbilityOverlap);
  if (searchInput) searchInput.addEventListener('input', checkAbilityOverlap);
  
  // Facet & Cut Generator event listeners
  const generateBtn = $('generate-codes-btn');
  if (generateBtn) generateBtn.addEventListener('click', generateCodes);
  
  // Copy button listeners
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetElement = $(targetId);
      if (targetElement) {
        copyToClipboard(targetElement.textContent);
      }
    });
  });
  
  // Submission Validator event listener
  const validateBtn = $('validate-btn');
  if (validateBtn) validateBtn.addEventListener('click', runValidation);
});

// Diamond mapping for Facet codes
const diamondCodes = {
  'Alpha Black Diamond': '0',
  'Omega White Diamond': '0B',
  'Theta Gold Diamond': '1',
  'Metal-Society': '01',
  'Epsilon Blue Diamond': '2',
  'Nightshade Violet Diamond': '3',
  'Maroon Red Diamond': '4',
  'Emerald Green Diamond': '5',
  'Saturn Light Diamond': '6'
};

// Character Sheet Validation Rules
const validationRules = {
  requiredFields: [
    'name',
    'gem_type',
    'faction',
    'rank',
    'stats',
    'abilities'
  ],
  statRanges: {
    HP: { min: 0, max: 100 },
    ATK: { min: 0, max: 30 },
    DEF: { min: 0, max: 30 },
    SPD: { min: 0, max: 15 },
    INT: { min: 0, max: 15 },
    MAG: { min: 0, max: 30 }
  },
  validFactions: factions,
  validRanks: [...new Set(gems.map(record => record.rank).filter(Boolean))]
};

// Social standing mapping (rank without decimal)
const socialStandingMap = {
  '5.2': '5',
  '5.1': '5',
  '4.3': '4',
  '4.2': '4',
  '4.1': '4',
  '3.3': '3',
  '3.2': '3',
  '3.1': '3',
  '2.3': '2',
  '2.2': '2',
  '2.1': '2',
  '1.2': '1',
  'United Frontier': 'UF',
  'Titan': 'T',
  'Standard': 'S',
  'Elite': 'E',
  'Champion': 'C',
  'Minion': 'M'
};

// Facet & Cut Generator functions
function generateFacetCode(diamond, kindergarten, socialStanding, randomLetter) {
  const diamondCode = diamondCodes[diamond] || '?';
  const kindergartenLetter = kindergarten.charAt(0).toUpperCase() || '?';
  const socialCode = socialStandingMap[socialStanding] || socialStanding.charAt(0) || '?';
  const randomFacetLetter = randomLetter.toUpperCase() || '?';
  
  return `${diamondCode}${kindergartenLetter}${socialCode}${randomFacetLetter}`;
}

function generateCutCode(atkStat, randomLetter) {
  const atkCode = atkStat.toString();
  const cutCode = `${atkCode}X${randomLetter.toUpperCase()}`;
  return cutCode;
}

function generateCodes() {
  const diamond = $('diamond-select').value;
  const kindergarten = $('kindergarten-input').value;
  const socialStanding = $('social-standing-select').value;
  const randomFacetLetter = $('facet-random-letter').value;
  const randomCutLetter = $('cut-random-letter').value;
  const atkStat = $('atk-stat-input').value;
  
  const facetCode = generateFacetCode(diamond, kindergarten, socialStanding, randomFacetLetter);
  const cutCode = generateCutCode(atkStat, randomCutLetter);
  
  $('facet-result').textContent = facetCode;
  $('cut-result').textContent = cutCode;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('Copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

// Character Sheet Validator functions
function validateCharacterSheet(sheetText) {
  const issues = [];
  const warnings = [];
  
  // Parse character sheet (basic text analysis)
  const lines = sheetText.split('\n').map(line => line.trim()).filter(line => line);
  
  // Check for basic required fields presence
  const hasName = lines.some(line => line.toLowerCase().includes('name') || /^[A-Z]/.test(line));
  const hasGemType = lines.some(line => line.toLowerCase().includes('gem') || line.toLowerCase().includes('type'));
  const hasStats = lines.some(line => /\d+/.test(line) && (line.toLowerCase().includes('hp') || line.toLowerCase().includes('atk') || line.toLowerCase().includes('def')));
  const hasAbilities = lines.some(line => line.toLowerCase().includes('ability') || line.toLowerCase().includes('special'));
  
  if (!hasName) issues.push('Missing character name');
  if (!hasGemType) issues.push('Missing gem type identification');
  if (!hasStats) issues.push('Missing stat block (HP, ATK, DEF, etc.)');
  if (!hasAbilities) issues.push('Missing abilities section');
  
  // Extract and validate abilities
  const abilityLines = lines.filter(line => 
    line.toLowerCase().includes('ability') || 
    line.toLowerCase().includes('special') ||
    line.toLowerCase().includes('power')
  );
  
  // Check for ability overlaps using our database
  abilityLines.forEach(line => {
    const cleanLine = line.replace(/[^a-zA-Z\s]/g, '').trim();
    if (cleanLine.length > 3) {
      const matches = searchAbilityDatabase(cleanLine);
      if (matches.length > 0) {
        warnings.push(`Potential ability overlap: "${cleanLine}" matches existing abilities: ${matches.map(m => m.name).join(', ')}`);
      }
    }
  });
  
  // Extract and validate stats (basic number extraction)
  const statMatches = sheetText.match(/(\d+)/g);
  if (statMatches && statMatches.length >= 4) {
    const stats = statMatches.slice(0, 6).map(Number);
    // Basic stat range checks
    stats.forEach((stat, index) => {
      const statNames = ['HP', 'ATK', 'DEF', 'SPD', 'INT', 'MAG'];
      if (stat < 0) issues.push(`${statNames[index]} stat is negative (${stat})`);
      if (stat > 100) warnings.push(`${statNames[index]} stat is unusually high (${stat})`);
    });
  }
  
  return { issues, warnings };
}

function runValidation() {
  const sheetInput = $('character-sheet-input').value;
  const resultsContainer = $('validation-results');
  
  if (!sheetInput.trim()) {
    resultsContainer.innerHTML = '<p class="field-note">Paste your character sheet to validate it against Gem Guide rules.</p>';
    return;
  }
  
  const { issues, warnings } = validateCharacterSheet(sheetInput);
  
  let html = '';
  
  if (issues.length === 0 && warnings.length === 0) {
    html = '<div class="validation-success"><h3>✓ Character sheet looks good!</h3><p>No major issues found. This sheet appears to follow Gem Guide template rules.</p></div>';
  } else {
    if (issues.length > 0) {
      html += '<div class="validation-issues"><h3>❌ Issues Found:</h3><ul>';
      issues.forEach(issue => {
        html += `<li>${issue}</li>`;
      });
      html += '</ul></div>';
    }
    
    if (warnings.length > 0) {
      html += '<div class="validation-warnings"><h3>⚠️ Warnings:</h3><ul>';
      warnings.forEach(warning => {
        html += `<li>${warning}</li>`;
      });
      html += '</ul></div>';
    }
  }
  
  resultsContainer.innerHTML = html;
}
