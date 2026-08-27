const S = ['HP', 'ATK', 'DEF', 'SPD', 'INT', 'MAG'];
const stat = (hp, atk, def, spd, int, mag) => ({ HP: hp, ATK: atk, DEF: def, SPD: spd, INT: int, MAG: mag });
const zero = stat(0, 0, 0, 0, 0, 0);

const rankHeights = {
  'Coal': ['5.2 Low Servant', "6'0\""], 'Richterite': ['5.2 Low Servant', "3'11\""], 'Salt': ['5.2 Low Servant', "3'0\""],
  'Pearl': ['5.1 High Servant', "6'0\""], 'Spinel': ['5.1 High Servant', "5'3\""],
  'Cavansite': ['4.3 Service Trade', "3'9\""], 'Iron': ['4.3 Service Trade', "4'1\""], 'Copper': ['4.3 Service Trade', "4'3\""], 'Bronze': ['4.3 Service Trade', "6'2\""], 'Graphene': ['4.3 Service Trade', "1'0\""],
  'Lapis': ['4.2 Median Service Trade', "5'10\""], 'Malachite': ['4.2 Median Service Trade', "7'10\""], 'Yooperlite': ['4.2 Median Service Trade', "5'11\""], 'Clinohumite': ['4.2 Median Service Trade', "5'10\""], 'Calcite': ['4.2 Median Service Trade', "5'6\""], 'Selenite': ['4.2 Median Service Trade', "11'0\""], 'Bismuth': ['4.2 Median Service Trade', "6'8\""], 'Verdelite': ['4.2 Median Service Trade', "5'10\""], 'Silver': ['4.2 Median Service Trade', "5'10\""], 'Tektite': ['4.2 Median Service Trade', "5'11\""], 'Tivcral': ['4.2 Median Service Trade', "4'7\""], 'Chromium': ['4.2 Median Service Trade', "6'4\""], 'Cobalt': ['4.2 Median Service Trade', "6'6\""], 'Nephrite': ['4.2 Median Service Trade', "6'4\""], 'Sunstone': ['4.2 Median Service Trade', "5'10\""], 'Turquoise': ['4.2 Median Service Trade', "6'8\""], 'Goshenite': ['4.2 Median Service Trade', "7'8\""],
  'Zircon': ['4.1 High Service Trade', "6'1\""], 'Angelite': ['4.1 High Service Trade', "5'11\""], 'Rutile': ['4.1 High Service Trade', "5'11\""], 'Willemite': ['4.1 High Service Trade', "5'10\""], 'Opal': ['4.1 High Service Trade', "6'0\""], 'Steel': ['4.1 High Service Trade', "8'1\""], 'Tungsten': ['4.1 High Service Trade', "9'0\""], 'Stellite': ['4.1 High Service Trade', "7'2\""], 'Serpentine': ['4.1 High Service Trade', "7'6\""],
  'Eucryptite': ['3.3 Low Militia', "4'3\""], 'Ruby': ['3.3 Low Militia', "3'10\""], 'Aragonite': ['3.3 Low Militia', "5'2\""], 'Prasiolite-Goshenite': ['3.3 Low Militia', "8'1\""], 'Quartz': ['3.2 Median Militia', "8'0\""], 'Amethyst': ['3.2 Median Militia', "8'0\""], 'Aventurine': ['3.2 Median Militia', "8'0\""], 'Blue Quartz': ['3.2 Median Militia', "8'0\""], 'Carnelian': ['3.2 Median Militia', "8'0\""], 'Cherry Quartz': ['3.2 Median Militia', "8'0\""], 'Citrine': ['3.2 Median Militia', "8'0\""], 'Jasper': ['3.2 Median Militia', "8'0\""], 'Milky Quartz': ['3.2 Median Militia', "8'0\""], 'Prasiolite': ['3.2 Median Militia', "8'0\""], 'Rose Quartz': ['3.2 Median Militia', "8'0\""], 'Smoky Quartz': ['3.2 Median Militia', "8'0\""], 'Zebra Jasper': ['3.2 Median Militia', "8'0\""], 'Obsidian': ['3.2 Median Militia', "8'0\""], 'Titanium': ['3.1 High Militia', "9'0\""], 'Topaz': ['3.1 High Militia', "8'10\""],
  'Azurite': ['2.3 Low Authoritative/Aristocrat', "5'10\""], 'Agate': ['2.3 Low Authoritative/Aristocrat', "7'4\""], 'Aquamarine': ['2.3 Low Authoritative/Aristocrat', "3'0\""], 'Jade': ['2.3 Low Authoritative/Aristocrat', "6'0\""], 'Fluorite': ['2.3 Low Authoritative/Aristocrat', "8'4\""], 'Morganite': ['2.3 Low Authoritative/Aristocrat', "3'11\""], 'Amber': ['2.3 Low Authoritative/Aristocrat', "3'0\""], 'Onyx': ['2.3 Low Authoritative/Aristocrat', "8'0\""], 'Polyhedroid Agate': ['2.3 Low Authoritative/Aristocrat', "8'0\""],
  'Nacre': ['2.2 Median Authoritative/Aristocrat', "9'2\""], 'Kyanite': ['2.2 Median Authoritative/Aristocrat', "8'2\""], 'Scapolite': ['2.2 Median Authoritative/Aristocrat', "8'1\""], 'Gold': ['2.2 Median Authoritative/Aristocrat', "7'1\""], 'Charoite': ['2.2 Median Authoritative/Aristocrat', "6'0\""], 'Emerald': ['2.2 Median Authoritative/Aristocrat', "8'1\""], 'Platinum': ['2.2 Median Authoritative/Aristocrat', "8'4\""], 'Rhodochrosite': ['2.2 Median Authoritative/Aristocrat', "8'4\""], 'Hessonite': ['2.1 High Authoritative/Aristocrat', "7'8\""], 'Pyrope': ['2.1 High Authoritative/Aristocrat', "7'10\""], 'Demantoid': ['2.1 High Authoritative/Aristocrat', "5'10\""], 'Zoisite': ['2.1 High Authoritative/Aristocrat', "8'0\""], 'Sapphire': ['2.1 High Authoritative/Aristocrat', "3'10\""],
  'Cubic Zirconia': ['1.2 Transcendent', 'Diamond dependent'], 'Diamond Pearl': ['1.2 Transcendent', "6'2\""], 'Diamond Spinel': ['1.2 Transcendent', "5'5\""], 'Celestine': ['United Frontier', "7'2\""], 'Almandine': ['United Frontier', "9'0\""],
};

const add = (name, values, ability, extras = {}) => ({ name, faction: 'Gempire', stats: stat(...values), abilities: [ability], ...extras });
const gems = [
  add('Coal', [32,5,6,4,4,1], 'Body Heat'), add('Richterite', [30,4,5,5,5,7], 'Light Tools'), add('Salt', [16,2,2,5,4,1], 'Fusion Boost'), add('Pearl', [26,4,3,5,5,6], 'Pocket Space; Holographic Projection', { hidden: ['Holo-Pearls', 'Elemental Affinity'] }), add('Spinel', [32,6,6,6,5,6], 'Stretchy Body'), add('Cavansite', [28,7,4,4,4,1], 'Heavy Lift'), add('Iron', [44,6,12,4,4,1], 'Tough Body', { kind: 'Metal' }), add('Copper', [36,5,8,4,5,3], 'Power Channel', { kind: 'Metal' }), add('Bronze', [40,5,10,4,6,1], 'Blueprint Mind', { kind: 'Metal' }), add('Graphene', [20,3,9,6,6,5], 'Shrink Down'),
  add('Lapis', [36,4,8,5,5,10], 'Water Control'), add('Malachite', [28,4,4,5,5,9], 'Earth Shaping; Toxin Soak', { tags: ['Non-fusion'] }), add('Yooperlite', [30,5,5,5,5,8], 'Lava Generation & Shaping'), add('Clinohumite', [34,7,7,5,5,6], 'Fire Control; Heat Resist'), add('Calcite', [26,3,3,5,8,7], 'Calm Presence'), add('Selenite', [26,3,3,4,6,9], 'Empathy'), add('Bismuth', [32,5,6,4,5,3], 'No listed special'), add('Verdelite', [30,8,5,5,5,6], 'No listed special'), add('Silver', [32,4,6,5,5,3], 'Electricity Generation', { kind: 'Metal' }), add('Tektite', [26,5,3,6,5,1], 'Scout Sense'), add('Tivcral', [26,3,3,16,5,6], 'Quick Stop; Wind Cutter; Speed Strike', { kind: 'Metal', hidden: ['Gearshift'] }), add('Chromium', [38,9,9,5,5,7], 'Harden Touch', { kind: 'Metal' }), add('Cobalt', [42,6,11,5,5,8], 'Magnetic Field', { kind: 'Metal' }), add('Nephrite', [26,6,3,6,6,1], 'Natural Pilot'), add('Turquoise', [28,6,4,5,6,5], 'No listed special'),
  add('Eucryptite', [28,6,4,6,5,1], 'Luminescence'), add('Ruby', [26,10,3,5,5,4], 'Limited Calokinesis'), add('Aragonite', [26,4,3,6,4,1], 'Dogfight Instinct'), add('Prasiolite-Goshenite', [32,8,6,5,8,9], 'Cryophrenia', { tags: ['Geode'], hidden: ['Minor Technopathy'] }), add('Titanium', [43,10,11,5,5,5], 'Shield Summoning', { kind: 'Metal' }), add('Topaz', [38,9,9,5,5,3], 'Shockwave Pulse', { hidden: ['Shockwave Pulse'] }),
  add('Azurite', [26,4,3,5,6,5], 'Hydrokinetic Constructs', { hidden: ['Hydrokinetic Constructs'] }), add('Agate', [32,6,6,5,6,4], 'Commanding Presence', { hidden: ['Commanding Presence'] }), add('Aquamarine', [28,9,4,8,6,6], 'Hydrokinetic Combat; Fairy Wings', { hidden: ['Cryokinesis'] }), add('Jade', [30,6,5,5,5,1], 'No listed special'), add('Fluorite', [36,6,8,5,6,2], 'Luminescence; Limited ESP', { hidden: ['Luminescence', 'Limited ESP'] }), add('Morganite', [28,9,4,5,6,8], 'Bubble Craft', { hidden: ['Bubble Craft'] }), add('Amber', [30,4,5,8,5,6], 'Oposkinetic Combat; Bee Wings', { hidden: ['Melikinesis'] }), add('Onyx', [36,8,8,5,6,2], 'Weapon Mastery', { hidden: ['Weapon Mastery'], tags: ['Agate subtype'] }), add('Polyhedroid Agate', [32,6,6,5,6,8], 'Restoration', { tags: ['Agate subtype', 'Geode'] }),
  add('Nacre', [26,4,3,5,6,10], 'Life Giver; Repair Station'), add('Kyanite', [32,6,6,4,7,9], 'Veritas Sense'), add('Scapolite', [30,6,5,5,5,8], 'Resonating Voice'), add('Charoite', [30,6,5,5,6,9], 'Power Boost'), add('Emerald', [40,10,10,5,6,9], 'Terrifying Aura'), add('Platinum', [40,5,10,5,6,1], 'No listed special', { kind: 'Metal' }), add('Rhodochrosite', [30,4,5,5,6,10], 'Holo Design'), add('Hessonite', [38,9,9,5,5,8], 'Commanding Aura', { hidden: ['Commanding Aura'] }), add('Pyrope', [34,9,7,5,5,7], 'Silence; Levitation'), add('Demantoid', [32,9,6,5,8,1], 'No listed special'), add('Zoisite', [32,9,6,5,9,9], 'Essence Chemistry'), add('Sapphire', [28,10,4,5,7,10], 'Clairvoyance; Limited Cryokinesis'),
  add('Cubic Zirconia', [48,16,14,5,9,14], 'Sub-Domain', { tags: ['Transcendent'] }), add('Diamond Pearl', [34,6,7,5,6,9], 'Fragment', { tags: ['Pearl subtype', 'Transcendent'] }), add('Diamond Spinel', [40,8,7,6,6,9], 'Cartoon Physics', { tags: ['Spinel subtype', 'Transcendent'] }),
  add('Watermelon Tourmaline', [26,3,3,5,6,7], 'Bond Reading', { hidden: ['Heart to Heart'], height: "5'8\"" }), add('Brown Tourmaline', [38,6,9,4,4,2], 'Ground and Anchor', { hidden: ['Sturdy Frame'], height: "7'2\"" }), add('Blue Tourmaline', [27,9,3,7,7,6], 'Electrokinetic Transfer and Manipulation', { height: "6'2\"" }), add('Green Tourmaline', [30,4,5,5,5,7], 'Plant Generation & Shaping', { hidden: ['Ecological Empathy'], height: "5'8\"" }), add('Black Tourmaline', [40,8,10,5,5,3], 'Barrier Summoning', { hidden: ['Fear Proof Induction'], height: "7'6\"" }), add('Pink Tourmaline', [28,4,4,5,7,9], 'Set the Scene', { hidden: ['Ear to the Ground'], height: "5'8\"" }), add('Dragon’s Breath Fire Opal', [36,10,8,5,6,9], 'Dragon’s Breath; Scaled Hide', { hidden: ['Heat Sense'], height: "7'2\"" }), add('Shattuckite', [26,5,6,5,7,4], 'Persuasive Talking; Perfect Vocabulary', { height: "6'0\"" }), add('Chrysoberyl', [30,4,5,5,6,4], 'Perfect Palate', { hidden: ['Warm Touch'], height: "5'9\"" }), add('Larimar', [30,4,5,5,6,9], 'Ice Carving; Frost Terraform', { height: "6'2\"" }), add('Catseye', [31,6,11,7,5,4], 'Cat-like Reflexes; Contortionist', { hidden: ['Liquidation'], height: "5'7\"" }),
  add('Zircon', [26,5,3,5,7,1], 'Sharp Case'), add('Angelite', [28,3,4,5,6,8], 'Healing Essence'), add('Rutile', [26,6,3,6,7,1], 'Site Sense'), add('Willemite', [26,6,3,6,6,4], 'Wide Watch'), add('Opal', [34,7,7,5,8,6], 'Endless Library', { tags: ['Non-fusion'] }), add('Steel', [38,6,9,5,5,4], 'Containment Field', { kind: 'Metal', hidden: ['Containment Field'] }), add('Tungsten', [46,8,13,3,5,3], 'Heat Proof', { kind: 'Metal' }), add('Stellite', [44,9,12,5,8,8], 'Upgrade & Merge', { kind: 'Metal' }), add('Serpentine', [28,4,4,5,8,5], 'Close Study', { tags: ['Non-fusion'], hidden: ['Steady Hands'] }),
  add('Quartz', [30,7,5,5,4,1], 'Tall and Tough', { tags: ['Quartz group'] }), add('Amethyst', [30,7,5,5,5,3], 'Purple Flame Generation', { tags: ['Quartz subtype'], hidden: ['Purple Flame Generation'] }), add('Aventurine', [30,7,5,5,5,4], 'Limited Plant Generation & Shaping', { tags: ['Quartz subtype'], hidden: ['Limited Plant Generation & Shaping'] }), add('Blue Quartz', [30,7,5,5,5,5], 'Cool Waters', { tags: ['Quartz subtype'], hidden: ['Cool Waters'] }), add('Carnelian', [30,7,5,5,5,3], 'Sand Play', { tags: ['Quartz subtype'], hidden: ['Sand Play'] }), add('Cherry Quartz', [28,8,4,5,5,1], 'No listed special', { tags: ['Quartz subtype'] }), add('Citrine', [28,7,4,5,5,2], 'Oxidation Inducement', { tags: ['Quartz subtype'], hidden: ['Oxidation Inducement'] }), add('Jasper', [34,8,7,5,4,1], 'No listed special', { tags: ['Quartz subtype'] }), add('Milky Quartz', [30,7,5,4,5,2], 'Limited Sleep Induction', { tags: ['Quartz subtype'], hidden: ['Limited Sleep Induction'] }), add('Prasiolite', [30,7,5,5,6,4], 'Limited Technokinesis', { tags: ['Quartz subtype'], hidden: ['Limited Technokinesis'] }), add('Rose Quartz', [30,7,5,5,5,3], 'Empathy', { tags: ['Quartz subtype'], hidden: ['Empathy'] }), add('Smoky Quartz', [30,7,5,5,5,3], 'Vibration Generation', { tags: ['Quartz subtype', 'Non-fusion'], hidden: ['Vibration Generation'] }), add('Zebra Jasper', [32,8,6,5,5,2], 'Echolocation', { tags: ['Quartz subtype'], hidden: ['Echolocation'] }),
  add('Peridot, Era 0', [32,9,6,5,7,3], 'Tech Speak; Metal Control', { hidden: ['Technotravel'], height: "7'6\"" }), add('Peridot, Era 1', [30,5,5,5,7,6], 'Metal Control', { hidden: ['Technopathy'], height: "5'10\"" }), add('Peridot, Era 2A', [30,5,5,5,7,3], 'Metal Control', { hidden: ['Metal Control'], height: "4'4\"" }), add('Gold, Era 0-1', [36,5,8,5,5,6], 'Gold Control; Pure Complexion', { kind: 'Metal' }), add('Gold, Era 2A', [32,4,6,5,7,7], 'Child of the Sun God; Fine Complexion', { kind: 'Metal', height: "6'3\"" }), add('Bronze, Era 0-1', [42,6,11,4,9,3], 'Structural Analysis', { kind: 'Metal', height: "6'2\"" }), add('Hematite, Era 0', [32,9,6,5,6,11], 'Push Broadcast', { height: "7'11\"" }), add('Hematite, Era 2', [34,8,7,5,6,10], 'Memory Wipe', { height: "8'2\"" }), add('Hessonite, Era 0', [36,10,8,6,7,10], 'Personal Darkness', { height: "9'2\"" }), add('Sunstone, Era 1B', [26,6,3,5,8,9], 'Deep Insight; Fire Power'), add('Goshenite, Era 0', [28,9,4,5,8,8], 'Plasma Control', { hidden: ['Full Read'] }), add('Obsidian', [32,8,6,5,5,3], 'Lava Shaping', { hidden: ['Lava Shaping'] }),
  { name: 'Sphene', faction: 'Gempire', stats: zero, fusion: true, components: 'Pearl + Peridot', threatLevel: 'Elite', height: "11'10\"", abilities: ['Holographic Projection; Metal Control; Holo-Sphene; Pocket Space'], hidden: ['Elemental Affinity'] },
  { name: 'Moonstone', faction: 'Gempire', stats: zero, fusion: true, components: 'Lapis + Pearl', threatLevel: 'Champion', height: "14'0\"", abilities: ['Water Control; Pocket Space; Holographic Projection; Holo-Moonstone'], hidden: ['Elemental Affinity'] },
  { name: 'Malachite, Fusion', faction: 'Gempire', stats: zero, fusion: true, components: 'Lapis + Quartz subtype', threatLevel: 'Champion', height: "13'10\"", abilities: ['Water Control; Tall and Tough; selected Quartz subtype ability'] },
  { name: 'Rhodonite', faction: 'Gempire', stats: zero, fusion: true, components: 'Ruby + Pearl', threatLevel: 'Standard', height: "9'10\"", abilities: ['Fire Generation; Big Jump; Holographic Projection; Holo-Rhodonite; Pocket Space; Fireball'], hidden: ['Elemental Affinity'] },
  { name: 'Garnet', faction: 'Gempire', stats: zero, fusion: true, components: 'Ruby + Sapphire', threatLevel: 'Elite', height: "7'8\"", abilities: ['Clairvoyance; Limited Cryokinesis; Limited Calokinesis'] },
  { name: 'Green Serpentine', faction: 'Gempire', stats: zero, fusion: true, components: 'Scapolite + Lapis', threatLevel: 'Champion', height: "13'11\"", abilities: ['Hypnotic Voice; Serpent Shift'], hidden: ['Voice Copy; Voice Steal'] },
  { name: 'Sardonyx, Pyrope Variant', faction: 'Gempire', stats: zero, fusion: true, components: 'Pyrope + Pearl', threatLevel: 'Champion', height: "13'10\"", abilities: ['Crowd Pleaser; Silence; Holographic Projection; Holo-Sardonyx; Pocket Space; Levitation'], hidden: ['Elemental Affinity'] },
  { name: 'Sardonyx, Hessonite Variant', faction: 'Gempire', stats: zero, fusion: true, components: 'Hessonite + Pearl', threatLevel: 'Champion', height: "13'8\"", abilities: ['Crowd Pleaser; Holographic Projection; Holo-Sardonyx; Pocket Space'], hidden: ['Commanding Aura; Elemental Affinity'] },
  { name: 'Tanzanite', faction: 'Gempire', stats: zero, fusion: true, components: 'Sapphire + Pearl', threatLevel: 'Elite', height: "9'10\"", abilities: ['Clairvoyance; Pocket Space; Holographic Projection; Holo-Tanzanite'], hidden: ['Vision Cast; Elemental Affinity'] },
  { name: 'Shattuckite', faction: 'Rogue', stats: zero, fusion: true, components: 'Pearl + Sapphire + Emerald + Zircon + Lapis Lazuli', threatLevel: 'Titan', height: "18'0\"", abilities: ['Atmokinesis (Weather Manipulation); Shield Generation; Monstrous Howl'], hidden: ['Technological Weaponry Crafting'] },
];

const quartz = [
  ['Amethyst', [2,2,-1,0,-1,1], 'Plasma Generation'], ['Aventurine', [1,-1,1,0,0,2], 'Plant Generation & Shaping'], ['Blue Quartz', [0,-1,-1,1,0,3], 'Minor Hydrokinesis; Minor Cryokinesis'], ['Carnelian', [1,1,0,0,0,-2], 'Grit Skin'], ['Cherry Quartz', [-2,-1,-1,0,5,-1], 'Sharp Eye'], ['Citrine', [-2,1,-1,0,0,2], 'Citric Secretion'], ['Jasper', [4,2,2,-1,-1,-2], 'Stoneguard'], ['Milky Quartz', [2,-1,1,-2,0,0], 'Milky Mist'], ['Prasiolite', [0,-1,0,0,2,1], 'Assembly'], ['Rose Quartz', [1,-1,0,0,0,1], 'Empathy'], ['Smoky Quartz', [2,0,1,-1,0,0], 'Vibrokinesis'], ['Zebra Jasper', [4,4,0,0,-3,-2], 'Ergokinetic Combat; Herd Bond']
].map(([name, values, ability]) => ({ name, faction: 'United Frontier', statModifier: { HP: values[0], ATK: values[1], DEF: values[2], SPD: values[3], INT: values[4], MAG: values[5] }, abilities: [ability] }));

const frontier = [
  { name: 'Celestine', stats: stat(34,3,7,5,9,11), abilities: ['Advanced Restoration; Wingless Flight'] }, 
  { name: 'Almandine', stats: stat(28,9,4,6,7,11), abilities: ['Psionics'], hidden: ['Small Flame'], height: "5'8\"" }, 
  { name: 'Yellow Tourmaline', stats: stat(28,5,4,5,7,4), abilities: ["Appraiser's Eye"], hidden: ['Golden Tongue'], height: "5'8\"" }, 
  { name: 'Seraphinite', stats: stat(36,5,7,6,9,11), abilities: ['Perfect Restoration; Flight'], height: "7'4\"" }, 
  { name: 'Iolite', stats: stat(28,3,4,5,9,3), abilities: ['Clarity Voice'], hidden: ['Memory Anchors'], height: "5'7\"" }, 
  { name: 'Astrophyllite', stats: stat(28,3,4,5,8,4), abilities: ['Path Sense'], hidden: ['Serene Presence'], height: "5'9\"" }, 
  { name: 'Labradorite', stats: stat(28,3,4,5,7,5), abilities: ['Record Keeper; Hydroportation'], height: "5'10\"" }, 
  { name: 'Clear Quartz', stats: stat(30,6,5,5,5,3), abilities: ['Prism'], height: "8'0\"" }
].map(x => ({ ...x, faction: 'United Frontier' }));

const modifiers = [
  { name: 'No modifier', stats: zero, abilities: [] }, { name: 'Era 0', stats: stat(4,2,1,0,2,3), abilities: ['Perfect Shapeshifting'] }, { name: 'Era 0 Side-B', stats: stat(4,1,1,0,2,4), abilities: ['Skinwalker'] }, { name: 'Era 1A', stats: stat(2,1,0,0,0,-1), abilities: ['Essence Buster; Enhanced Shapeshifting'] }, { name: 'Era 1B', stats: stat(2,-1,0,1,2,1), abilities: ['Enhanced Senses; Weak Essence Buster'] }, { name: 'Era 2A', stats: stat(1,-1,-1,1,1,2), abilities: ['Emotion Fuels Power'] }, { name: 'Era 0-1 Metal Society', stats: stat(3,1,2,0,0,-1), abilities: ['Material Conductivity'], metalsOnly: true },
  { name: 'Theta Gold Sole Essence', stats: stat(3,2,1,0,2,2), abilities: ['True Essence Buster'], unique: true }, { name: 'Epsilon Blue Sole Essence', stats: stat(3,1,2,0,3,2), abilities: ['Absolute Sense'], unique: true }, { name: 'Nightshade Violet Sole Essence', stats: stat(3,1,2,1,2,2), abilities: ['Blind Spot Sense'], unique: true }, { name: 'Maroon Red Sole Essence', stats: stat(4,3,2,0,1,1), abilities: ['Unbreakable Line'], unique: true }, { name: 'Emerald Green Sole Essence', stats: stat(3,1,2,0,3,2), abilities: ['Restriction Bypass'], unique: true }, { name: 'Saturn Light Sole Essence', stats: stat(3,1,1,2,1,3), abilities: ['Surface Adherence'], unique: true }
];
const cuts = { Normal: { stats: zero, abilities: [] }, 'Perfect Cut': { stats: stat(3,2,2,1,1,3), abilities: [] }, 'Perfect Polish': { stats: stat(4,3,3,0,1,1), abilities: [] }, Defective: { stats: stat(-4,-2,-1,-1,-1,-3), abilities: ['Flawed Signature'] } };

const superpowersWiki = {
  'Water Control': 'https://superpower.fandom.com/wiki/Hydrokinesis',
  'Fire Control': 'https://superpower.fandom.com/wiki/Pyrokinesis',
  'Earth Shaping': 'https://superpower.fandom.com/wiki/Geokinesis',
  'Light Tools': 'https://superpower.fandom.com/wiki/Light_Constructs',
  'Electricity Generation': 'https://superpower.fandom.com/wiki/Electricity_Manipulation',
  'Shield Summoning': 'https://superpower.fandom.com/wiki/Force_Field_Generation',
  'Holographic Projection': 'https://superpower.fandom.com/wiki/Holographic_Projection',
  'Teleportation': 'https://superpower.fandom.com/wiki/Teleportation',
  'Healing': 'https://superpower.fandom.com/wiki/Healing',
  'Flight': 'https://superpower.fandom.com/wiki/Flight',
  'Invisibility': 'https://superpower.fandom.com/wiki/Invisibility',
  'Telekinesis': 'https://superpower.fandom.com/wiki/Telekinesis',
  'Ice Control': 'https://superpower.fandom.com/wiki/Cryokinesis',
  'Plant Control': 'https://superpower.fandom.com/wiki/Chlorokinesis',
  'Sound Control': 'https://superpower.fandom.com/wiki/Sound_Manipulation',
  'Gravity Control': 'https://superpower.fandom.com/wiki/Gravitokinesis',
  'Time Manipulation': 'https://superpower.fandom.com/wiki/Time_Manipulation',
  'Clairvoyance': 'https://superpower.fandom.com/wiki/Clairvoyance',
  'Empathy': 'https://superpower.fandom.com/wiki/Empathy',
  'Mind Control': 'https://superpower.fandom.com/wiki/Mind_Control',
  'Shapeshifting': 'https://superpower.fandom.com/wiki/Shapeshifting',
  'Super Strength': 'https://superpower.fandom.com/wiki/Enhanced_Strength',
  'Super Speed': 'https://superpower.fandom.com/wiki/Enhanced_Speed',
  'Energy Blasts': 'https://superpower.fandom.com/wiki/Energy_Beams',
  'Force Fields': 'https://superpower.fandom.com/wiki/Force_Field_Generation',
  'Duplication': 'https://superpower.fandom.com/wiki/Duplication',
  'Size Manipulation': 'https://superpower.fandom.com/wiki/Size_Manipulation',
  'Intangibility': 'https://superpower.fandom.com/wiki/Intangibility',
  'Telepathy': 'https://superpower.fandom.com/wiki/Telepathy',
  'Precognition': 'https://superpower.fandom.com/wiki/Precognition',
  'Retrocognition': 'https://superpower.fandom.com/wiki/Retrocognition',
  'Probability Manipulation': 'https://superpower.fandom.com/wiki/Probability_Manipulation',
  'Reality Warping': 'https://superpower.fandom.com/wiki/Reality_Warping',
  'Matter Manipulation': 'https://superpower.fandom.com/wiki/Matter_Manipulation',
  'Magnetic Field': 'https://superpower.fandom.com/wiki/Magnetism_Manipulation',
  'Lava Generation & Shaping': 'https://superpower.fandom.com/wiki/Magma_Manipulation',
  'Wind Control': 'https://superpower.fandom.com/wiki/Aerokinesis',
  'Metal Control': 'https://superpower.fandom.com/wiki/Metal_Manipulation',
  'Technology Manipulation': 'https://superpower.fandom.com/wiki/Technopathy',
  'Poison Manipulation': 'https://superpower.fandom.com/wiki/Poison_Manipulation',
  'Darkness Manipulation': 'https://superpower.fandom.com/wiki/Darkness_Manipulation',
  'Light Manipulation': 'https://superpower.fandom.com/wiki/Photokinesis',
  'Crystal Manipulation': 'https://superpower.fandom.com/wiki/Crystal_Manipulation',
  'Sound Manipulation': 'https://superpower.fandom.com/wiki/Sound_Manipulation',
  'Voice Manipulation': 'https://superpower.fandom.com/wiki/Voice_Manipulation',
  'Bubble Creation': 'https://superpower.fandom.com/wiki/Bubble_Manipulation',
  'Weapon Creation': 'https://superpower.fandom.com/wiki/Weapon_Creation',
  'Portal Creation': 'https://superpower.fandom.com/wiki/Portal_Creation',
  'Space Manipulation': 'https://superpower.fandom.com/wiki/Space_Manipulation',
  'Cosmic Manipulation': 'https://superpower.fandom.com/wiki/Cosmic_Manipulation',
  'Pocket Space': 'https://superpower.fandom.com/wiki/Dimensional_Storage',
  'Stretchy Body': 'https://superpower.fandom.com/wiki/Elasticity',
  'Tough Body': 'https://superpower.fandom.com/wiki/Enhanced_Durability',
  'Power Channel': 'https://superpower.fandom.com/wiki/Power_Absorption',
  'Blueprint Mind': 'https://superpower.fandom.com/wiki/Enhanced_Intelligence',
  'Shrink Down': 'https://superpower.fandom.com/wiki/Size_Manipulation',
  'Heavy Lift': 'https://superpower.fandom.com/wiki/Enhanced_Strength',
  'Toxin Soak': 'https://superpower.fandom.com/wiki/Poison_Immunity',
  'Heat Resist': 'https://superpower.fandom.com/wiki/Heat_Immunity',
  'Calm Presence': 'https://superpower.fandom.com/wiki/Emotional_Manipulation',
  'Luminescence': 'https://superpower.fandom.com/wiki/Light_Manipulation',
  'Scout Sense': 'https://superpower.fandom.com/wiki/Enhanced_Senses',
  'Wind Cutter': 'https://superpower.fandom.com/wiki/Wind_Manipulation',
  'Speed Strike': 'https://superpower.fandom.com/wiki/Enhanced_Speed',
  'Harden Touch': 'https://superpower.fandom.com/wiki/Matter_Manipulation',
  'Natural Pilot': 'https://superpower.fandom.com/wiki/Enhanced_Reflexes',
  'Limited Calokinesis': 'https://superpower.fandom.com/wiki/Pyrokinesis',
  'Shield Summoning': 'https://superpower.fandom.com/wiki/Force_Field_Generation',
  'Hydrokinetic Constructs': 'https://superpower.fandom.com/wiki/Hydrokinesis',
  'Commanding Presence': 'https://superpower.fandom.com/wiki/Charisma',
  'Hydrokinetic Combat': 'https://superpower.fandom.com/wiki/Hydrokinesis',
  'Fairy Wings': 'https://superpower.fandom.com/wiki/Flight',
  'Limited ESP': 'https://superpower.fandom.com/wiki/Extrasensory_Perception',
  'Bubble Craft': 'https://superpower.fandom.com/wiki/Bubble_Manipulation',
  'Oposkinetic Combat': 'https://superpower.fandom.com/wiki/Animal_Mimicry',
  'Weapon Mastery': 'https://superpower.fandom.com/wiki/Weapon_Proficiency',
  'Restoration': 'https://superpower.fandom.com/wiki/Healing',
  'Veritas Sense': 'https://superpower.fandom.com/wiki/Truth_Sensing',
  'Resonating Voice': 'https://superpower.fandom.com/wiki/Sound_Manipulation',
  'Power Boost': 'https://superpower.fandom.com/wiki/Power_Augmentation',
  'Terrifying Aura': 'https://superpower.fandom.com/wiki/Fear_Inducement',
  'Holo Design': 'https://superpower.fandom.com/wiki/Holographic_Projection',
  'Commanding Aura': 'https://superpower.fandom.com/wiki/Charisma',
  'Silence': 'https://superpower.fandom.com/wiki/Sound_Manipulation',
  'Levitation': 'https://superpower.fandom.com/wiki/Levitation',
  'Essence Chemistry': 'https://superpower.fandom.com/wiki/Chemistry_Manipulation',
  'Limited Cryokinesis': 'https://superpower.fandom.com/wiki/Cryokinesis',
  'Bond Reading': 'https://superpower.fandom.com/wiki/Empathy',
  'Ground and Anchor': 'https://superpower.fandom.com/wiki/Enhanced_Durability',
  'Electrokinetic Transfer': 'https://superpower.fandom.com/wiki/Electricity_Manipulation',
  'Plant Generation & Shaping': 'https://superpower.fandom.com/wiki/Chlorokinesis',
  'Barrier Summoning': 'https://superpower.fandom.com/wiki/Force_Field_Generation',
  'Set the Scene': 'https://superpower.fandom.com/wiki/Illusion_Creation',
  'Scaled Hide': 'https://superpower.fandom.com/wiki/Enhanced_Durability',
  'Persuasive Talking': 'https://superpower.fandom.com/wiki/Persuasion',
  'Perfect Vocabulary': 'https://superpower.fandom.com/wiki/Enhanced_Intelligence',
  'Perfect Palate': 'https://superpower.fandom.com/wiki/Enhanced_Senses',
  'Ice Carving': 'https://superpower.fandom.com/wiki/Cryokinesis',
  'Frost Terraform': 'https://superpower.fandom.com/wiki/Cryokinesis',
  'Cat-like Reflexes': 'https://superpower.fandom.com/wiki/Enhanced_Reflexes',
  'Contortionist': 'https://superpower.fandom.com/wiki/Flexibility',
  'Sharp Case': 'https://superpower.fandom.com/wiki/Enhanced_Intelligence',
  'Healing Essence': 'https://superpower.fandom.com/wiki/Healing',
  'Site Sense': 'https://superpower.fandom.com/wiki/Enhanced_Senses',
  'Wide Watch': 'https://superpower.fandom.com/wiki/Enhanced_Vision',
  'Endless Library': 'https://superpower.fandom.com/wiki/Knowledge_Manipulation',
  'Containment Field': 'https://superpower.fandom.com/wiki/Force_Field_Generation',
  'Heat Proof': 'https://superpower.fandom.com/wiki/Heat_Immunity',
  'Upgrade & Merge': 'https://superpower.fandom.com/wiki/Technopathy',
  'Close Study': 'https://superpower.fandom.com/wiki/Enhanced_Intelligence',
  'Tall and Tough': 'https://superpower.fandom.com/wiki/Enhanced_Durability',
  'Purple Flame Generation': 'https://superpower.fandom.com/wiki/Pyrokinesis',
  'Limited Plant Generation & Shaping': 'https://superpower.fandom.com/wiki/Chlorokinesis',
  'Cool Waters': 'https://superpower.fandom.com/wiki/Hydrokinesis',
  'Sand Play': 'https://superpower.fandom.com/wiki/Geokinesis',
  'Oxidation Inducement': 'https://superpower.fandom.com/wiki/Matter_Manipulation',
  'Limited Sleep Induction': 'https://superpower.fandom.com/wiki/Sleep_Inducement',
  'Limited Technokinesis': 'https://superpower.fandom.com/wiki/Technopathy',
  'Vibration Generation': 'https://superpower.fandom.com/wiki/Vibration_Manipulation',
  'Echolocation': 'https://superpower.fandom.com/wiki/Enhanced_Senses',
  'Tech Speak': 'https://superpower.fandom.com/wiki/Technopathy',
  'Gold Control': 'https://superpower.fandom.com/wiki/Metal_Manipulation',
  'Pure Complexion': 'https://superpower.fandom.com/wiki/Enhanced_Beauty',
  'Structural Analysis': 'https://superpower.fandom.com/wiki/Enhanced_Intelligence',
  'Push Broadcast': 'https://superpower.fandom.com/wiki/Telepathy',
  'Memory Wipe': 'https://superpower.fandom.com/wiki/Memory_Manipulation',
  'Personal Darkness': 'https://superpower.fandom.com/wiki/Darkness_Manipulation',
  'Deep Insight': 'https://superpower.fandom.com/wiki/Clairvoyance',
  'Fire Power': 'https://superpower.fandom.com/wiki/Pyrokinesis',
  'Plasma Control': 'https://superpower.fandom.com/wiki/Plasma_Manipulation',
  'Lava Shaping': 'https://superpower.fandom.com/wiki/Magma_Manipulation',
  'Big Jump': 'https://superpower.fandom.com/wiki/Enhanced_Jump',
  'Fireball': 'https://superpower.fandom.com/wiki/Pyrokinesis',
  'Fire Generation': 'https://superpower.fandom.com/wiki/Pyrokinesis',
  'Hypnotic Voice': 'https://superpower.fandom.com/wiki/Hypnosis',
  'Serpent Shift': 'https://superpower.fandom.com/wiki/Shapeshifting',
  'Crowd Pleaser': 'https://superpower.fandom.com/wiki/Charisma',
  'Sub-Domain': 'https://superpower.fandom.com/wiki/Reality_Warping',
  'Fragment': 'https://superpower.fandom.com/wiki/Duplication',
  'Cartoon Physics': 'https://superpower.fandom.com/wiki/Reality_Warping',
  'Heart to Heart': 'https://superpower.fandom.com/wiki/Empathy',
  'Sturdy Frame': 'https://superpower.fandom.com/wiki/Enhanced_Durability',
  'Ecological Empathy': 'https://superpower.fandom.com/wiki/Empathy',
  'Fear Proof Induction': 'https://superpower.fandom.com/wiki/Fear_Manipulation',
  'Ear to the Ground': 'https://superpower.fandom.com/wiki/Enhanced_Hearing',
  'Heat Sense': 'https://superpower.fandom.com/wiki/Thermal_Sense',
  'Warm Touch': 'https://superpower.fandom.com/wiki/Heat_Manipulation',
  'Liquidation': 'https://superpower.fandom.com/wiki/Liquid_Manipulation',
  'Steady Hands': 'https://superpower.fandom.com/wiki/Enhanced_Dexterity',
  'Shockwave Pulse': 'https://superpower.fandom.com/wiki/Shockwave_Generation',
  'Melikinesis': 'https://superpower.fandom.com/wiki/Animal_Mimicry',
  'Cryokinesis': 'https://superpower.fandom.com/wiki/Cryokinesis',
  'Cryophrenia': 'https://superpower.fandom.com/wiki/Cryokinesis',
  'Minor Technopathy': 'https://superpower.fandom.com/wiki/Technopathy',
  'Technotravel': 'https://superpower.fandom.com/wiki/Teleportation',
  'Technopathy': 'https://superpower.fandom.com/wiki/Technopathy',
  'Full Read': 'https://superpower.fandom.com/wiki/Telepathy',
  'Vision Cast': 'https://superpower.fandom.com/wiki/Clairvoyance',
  'Voice Copy': 'https://superpower.fandom.com/wiki/Voice_Mimicry',
  'Voice Steal': 'https://superpower.fandom.com/wiki/Voice_Manipulation',
  'Gearshift': 'https://superpower.fandom.com/wiki/Enhanced_Speed',
  'Elemental Affinity': 'https://superpower.fandom.com/wiki/Elemental_Manipulation',
  'Holo-Pearls': 'https://superpower.fandom.com/wiki/Duplication',
  'Holo-Sphene': 'https://superpower.fandom.com/wiki/Holographic_Projection',
  'Holo-Moonstone': 'https://superpower.fandom.com/wiki/Holographic_Projection',
  'Holo-Rhodonite': 'https://superpower.fandom.com/wiki/Holographic_Projection',
  'Holo-Sardonyx': 'https://superpower.fandom.com/wiki/Holographic_Projection',
  'Holo-Tanzanite': 'https://superpower.fandom.com/wiki/Holographic_Projection',
  'Atmokinesis': 'https://superpower.fandom.com/wiki/Atmokinesis',
  'Monstrous Howl': 'https://superpower.fandom.com/wiki/Sonic_Scream',
  'Technological Weaponry Crafting': 'https://superpower.fandom.com/wiki/Weapon_Creation',
  // United Frontier Abilities
  'Advanced Restoration': 'https://superpower.fandom.com/wiki/Healing',
  'Wingless Flight': 'https://superpower.fandom.com/wiki/Flight',
  'Psionics': 'https://superpower.fandom.com/wiki/Telekinesis',
  'Small Flame': 'https://superpower.fandom.com/wiki/Pyrokinesis',
  "Appraiser's Eye": 'https://superpower.fandom.com/wiki/Enhanced_Perception',
  'Golden Tongue': 'https://superpower.fandom.com/wiki/Persuasion',
  'Perfect Restoration': 'https://superpower.fandom.com/wiki/Healing',
  'Clarity Voice': 'https://superpower.fandom.com/wiki/Telepathy',
  'Memory Anchors': 'https://superpower.fandom.com/wiki/Memory_Manipulation',
  'Path Sense': 'https://superpower.fandom.com/wiki/Intuition',
  'Serene Presence': 'https://superpower.fandom.com/wiki/Emotional_Manipulation',
  'Record Keeper': 'https://superpower.fandom.com/wiki/Eidetic_Memory',
  'Hydroportation': 'https://superpower.fandom.com/wiki/Teleportation',
  'Prism': 'https://superpower.fandom.com/wiki/Transformation',
  'Plasma Generation': 'https://superpower.fandom.com/wiki/Plasma_Manipulation',
  'Plant Generation & Shaping': 'https://superpower.fandom.com/wiki/Plant_Manipulation',
  'Minor Hydrokinesis': 'https://superpower.fandom.com/wiki/Hydrokinesis',
  'Minor Cryokinesis': 'https://superpower.fandom.com/wiki/Cryokinesis',
  'Grit Skin': 'https://superpower.fandom.com/wiki/Enhanced_Durability',
  'Sharp Eye': 'https://superpower.fandom.com/wiki/Enhanced_Vision',
  'Citric Secretion': 'https://superpower.fandom.com/wiki/Acid_Manipulation',
  'Stoneguard': 'https://superpower.fandom.com/wiki/Enhanced_Durability',
  'Milky Mist': 'https://superpower.fandom.com/wiki/Sleep_Inducement',
  'Assembly': 'https://superpower.fandom.com/wiki/Enhanced_Intelligence',
  'Vibrokinesis': 'https://superpower.fandom.com/wiki/Vibration_Manipulation',
  'Ergokinetic Combat': 'https://superpower.fandom.com/wiki/Kinetic_Energy_Manipulation',
  'Herd Bond': 'https://superpower.fandom.com/wiki/Empathy',
};

const customAbilitySuggestions = {
  'Water Control + Fire Control': {
    name: 'Steam Manipulation',
    description: 'The ability to create and control steam, combining the heat of fire with the moisture of water.',
    wikiLink: 'https://superpower.fandom.com/wiki/Steam_Manipulation'
  },
  'Earth Shaping + Plant Control': {
    name: 'Nature Manipulation',
    description: 'Control over both earth and plant life, allowing for manipulation of the entire natural environment.',
    wikiLink: 'https://superpower.fandom.com/wiki/Nature_Manipulation'
  },
  'Electricity Generation + Metal Control': {
    name: 'Electromagnetic Manipulation',
    description: 'Combined control over electricity and magnetic fields, allowing for electromagnetic pulse generation and metal manipulation.',
    wikiLink: 'https://superpower.fandom.com/wiki/Electromagnetism_Manipulation'
  },
  'Ice Control + Wind Control': {
    name: 'Blizzard Creation',
    description: 'The ability to create powerful blizzards by combining ice generation with wind control.',
    wikiLink: 'https://superpower.fandom.com/wiki/Blizzard_Creation'
  },
  'Fire Control + Wind Control': {
    name: 'Firestorm Creation',
    description: 'The ability to create and control massive firestorms by combining fire generation with wind manipulation.',
    wikiLink: 'https://superpower.fandom.com/wiki/Firestorm_Manipulation'
  },
  'Shield Summoning + Force Fields': {
    name: 'Absolute Defense',
    description: 'Enhanced defensive capabilities that combine multiple shield and force field techniques for impenetrable protection.',
    wikiLink: null
  },
  'Teleportation + Invisibility': {
    name: 'Phasing',
    description: 'The ability to become intangible and move through solid objects while remaining undetected.',
    wikiLink: 'https://superpower.fandom.com/wiki/Intangibility'
  },
  'Healing + Empathy': {
    name: 'Restorative Empathy',
    description: 'Enhanced healing abilities powered by emotional connection and understanding of others\' pain.',
    wikiLink: null
  },
  'Super Strength + Super Speed': {
    name: 'Kinetic Charging',
    description: 'The ability to build up kinetic energy through movement and release it in devastating attacks.',
    wikiLink: 'https://superpower.fandom.com/wiki/Kinetic_Energy_Manipulation'
  },
  'Clairvoyance + Precognition': {
    name: 'Omniscience',
    description: 'The combination of seeing current events and future possibilities, allowing for near-complete awareness.',
    wikiLink: 'https://superpower.fandom.com/wiki/Omniscience'
  },
  'Water Control + Earth Shaping': {
    name: 'Mud Manipulation',
    description: 'Control over mud and sediment by combining water and earth manipulation.',
    wikiLink: 'https://superpower.fandom.com/wiki/Mud_Manipulation'
  },
  'Fire Control + Earth Shaping': {
    name: 'Magma Manipulation',
    description: 'The ability to create and control lava by combining fire with earth manipulation.',
    wikiLink: 'https://superpower.fandom.com/wiki/Magma_Manipulation'
  },
  'Water Control + Wind Control': {
    name: 'Storm Manipulation',
    description: 'Control over weather phenomena by combining water and wind manipulation.',
    wikiLink: 'https://superpower.fandom.com/wiki/Weather_Manipulation'
  },
  'Pocket Space + Holographic Projection': {
    name: 'Dimensional Storage',
    description: 'Enhanced spatial manipulation combining pocket dimensions with holographic interfaces.',
    wikiLink: 'https://superpower.fandom.com/wiki/Dimensional_Storage'
  },
  'Metal Control + Electricity Generation': {
    name: 'Technopathy',
    description: 'The ability to mentally interface with and control electronic systems.',
    wikiLink: 'https://superpower.fandom.com/wiki/Technopathy'
  },
  'Tall and Tough + Fire Control': {
    name: 'Durable Pyrokinesis',
    description: 'Enhanced fire abilities combined with increased durability for close-range combat.',
    wikiLink: null
  },
  'Clairvoyance + Holographic Projection': {
    name: 'Remote Projection',
    description: 'The ability to project one\'s consciousness and holographic form to distant locations.',
    wikiLink: 'https://superpower.fandom.com/wiki/Remote_Viewing'
  },
  'Water Control + Clairvoyance': {
    name: 'Hydro-Scrying',
    description: 'The ability to see distant events or locations through water.',
    wikiLink: 'https://superpower.fandom.com/wiki/Divination'
  },
  'Shield Summoning + Healing': {
    name: 'Protective Healing',
    description: 'Abilities that can both protect and heal simultaneously.',
    wikiLink: null
  },
  'Earth Shaping + Plant Control': {
    name: 'Chlorokinesis',
    description: 'Enhanced plant manipulation through earth control.',
    wikiLink: 'https://superpower.fandom.com/wiki/Plant_Manipulation'
  },
  // United Frontier Specific Combinations
  'Advanced Restoration + Wingless Flight': {
    name: 'Aerial Healing',
    description: 'The ability to heal while flying, allowing for rapid medical response across battlefields.',
    wikiLink: 'https://superpower.fandom.com/wiki/Healing'
  },
  'Psionics + Small Flame': {
    name: 'Psychic Pyrokinesis',
    description: 'Combined telekinetic and fire abilities for controlled rescue and combat operations.',
    wikiLink: 'https://superpower.fandom.com/wiki/Pyrokinesis'
  },
  'Appraiser\'s Eye + Golden Tongue': {
    name: 'Master Negotiation',
    description: 'Perfect combination of value assessment and persuasive abilities for optimal trade outcomes.',
    wikiLink: 'https://superpower.fandom.com/wiki/Charisma'
  },
  'Perfect Restoration + Flight': {
    name: 'Divine Healing Flight',
    description: 'Ultimate healing capabilities combined with aerial mobility for medical emergencies.',
    wikiLink: 'https://superpower.fandom.com/wiki/Healing'
  },
  'Clarity Voice + Memory Anchors': {
    name: 'Educational Mastery',
    description: 'Perfect teaching abilities that ensure lessons are both understood and retained.',
    wikiLink: 'https://superpower.fandom.com/wiki/Telepathy'
  },
  'Path Sense + Serene Presence': {
    name: 'Guidance Aura',
    description: 'Career guidance combined with calming presence for optimal life decisions.',
    wikiLink: 'https://superpower.fandom.com/wiki/Intuition'
  },
  'Record Keeper + Hydroportation': {
    name: 'Chronicle Travel',
    description: 'Ability to access records from anywhere through water-based teleportation.',
    wikiLink: 'https://superpower.fandom.com/wiki/Teleportation'
  },
  'Plasma Generation + Plant Generation & Shaping': {
    name: 'Bio-Plasma Engineering',
    description: 'Combination of metalworking and plant abilities for agricultural construction.',
    wikiLink: null
  },
  'Minor Hydrokinesis + Minor Cryokinesis': {
    name: 'Ice-Water Mastery',
    description: 'Complete control over water in both liquid and solid states.',
    wikiLink: 'https://superpower.fandom.com/wiki/Cryokinesis'
  },
  'Grit Skin + Stoneguard': {
    name: 'Ultimate Durability',
    description: 'Maximum resistance to both heat and physical damage.',
    wikiLink: 'https://superpower.fandom.com/wiki/Enhanced_Durability'
  },
  'Sharp Eye + Assembly': {
    name: 'Perfect Construction',
    description: 'Flaw detection combined with instinctive assembly for perfect builds.',
    wikiLink: 'https://superpower.fandom.com/wiki/Enhanced_Intelligence'
  },
  'Empathy + Milky Mist': {
    name: 'Dream Healing',
    description: 'Emotional sensing combined with sleep induction for therapeutic rest.',
    wikiLink: 'https://superpower.fandom.com/wiki/Empathy'
  },
  'Vibrokinesis + Ergokinetic Combat': {
    name: 'Vibration Combat',
    description: 'Kinetic energy channeling combined with vibration control for devastating attacks.',
    wikiLink: 'https://superpower.fandom.com/wiki/Vibration_Manipulation'
  },
  // Cross-Faction Combinations
  'Water Control + Minor Hydrokinesis': {
    name: 'Hydrokinesis Mastery',
    description: 'Combined large-scale and fine water control abilities.',
    wikiLink: 'https://superpower.fandom.com/wiki/Hydrokinesis'
  },
  'Tall and Tough + Stoneguard': {
    name: 'Fortress Form',
    description: 'Maximum physical durability and toughness for defensive combat.',
    wikiLink: 'https://superpower.fandom.com/wiki/Enhanced_Durability'
  },
  'Commanding Presence + Path Sense': {
    name: 'Leadership Guidance',
    description: 'Natural authority combined with career guidance for team leadership.',
    wikiLink: 'https://superpower.fandom.com/wiki/Charisma'
  },
  'Healing Essence + Advanced Restoration': {
    name: 'Master Healing',
    description: 'Combination of basic and advanced healing for comprehensive medical care.',
    wikiLink: 'https://superpower.fandom.com/wiki/Healing'
  },
};

const $ = id => document.getElementById(id); const factionEl = $('faction'), gemEl = $('gem'), prismEl = $('prism'), eraEl = $('era'), cutEl = $('cut'), fusionAEl = $('fusion-a'), fusionBEl = $('fusion-b');
function option(value, label = value) { const node = document.createElement('option'); node.value = value; node.textContent = label; return node; }
function choices(el, items, label = x => x) { el.replaceChildren(...items.map(x => option(typeof x === 'string' ? x : x.name, label(x)))); }
function activeRecord() { return [...gems, ...frontier].find(g => g.name === gemEl.value && g.faction === factionEl.value); }
function isService(rank) { return rank?.includes('Servant') || rank?.includes('Service Trade'); }
function rankFor(record) { if (record.fusion) return record.threatLevel || 'Unknown Threat'; return rankHeights[record.name]?.[0] || record.rank || (record.faction === 'United Frontier' ? 'United Frontier' : 'Not assigned'); }
function heightFor(record) { return record.height || rankHeights[record.name]?.[1] || 'Not assigned'; }
function jobBonus(rank, cut) { if (!cut.startsWith('Perfect')) return zero; if (rank.includes('Servant')) return stat(0,0,0,1,0,0); if (rank.includes('Service Trade')) return stat(0,0,1,0,0,0); if (rank.includes('Militia')) return stat(0,1,0,0,0,0); if (rank.includes('Authoritative')) return stat(0,0,1,0,0,0); if (rank.includes('Aristocrat')) return stat(0,0,0,0,0,1); if (rank.includes('Transcendent')) return stat(0,0,0,0,0,2); if (rank.includes('Titan') || rank.includes('Leviathan') || rank.includes('Colossus') || rank.includes('Apocalypse') || rank.includes('Extinction')) return stat(0,0,0,0,0,2); if (rank.includes('Champion') || rank.includes('Elite')) return stat(0,0,0,0,0,1); return zero; }
function combine(...sources) { const out = {}; S.forEach(k => out[k] = sources.reduce((sum, s) => sum + (s[k] || 0), 0)); return out; }
function enhanceFirstAbility(abilities) { const upgraded = [...abilities]; if (!upgraded.length || upgraded[0] === 'No listed special') return upgraded; const parts = upgraded[0].split(';').map(part => part.trim()); parts[0] = `Enhanced ${parts[0]}`; upgraded[0] = parts.join('; '); return upgraded; }
function levelGrowth(level, classification = 'Gem') { const gained = Math.max(0, level - 1); return stat(gained * 4, gained * 2, Math.floor(gained / 2), Math.floor(gained / 4), 0, gained * (classification === 'Organic' ? 2 : 4)); }
function totalExpForLevel(level) { let total = 0; for (let current = 2; current <= level; current += 1) total += 100 + (current - 2) * 25; return total; }
function expToNextLevel(level) { return level >= 30 ? null : 100 + (level - 1) * 25; }
function refreshGems() { const selected = gemEl.value; const list = [...gems, ...frontier].filter(g => g.faction === factionEl.value).sort((a,b) => a.name.localeCompare(b.name)); choices(gemEl, list, g => g.name); if (list.some(g => g.name === selected)) gemEl.value = selected; refresh(); }
function fusionId(record) { return `${record.faction}|${record.name}`; }
function fusionComponent(el) { const value = el.value; let record = [...gems, ...frontier].find(r => fusionId(r) === value); if (!record) { const ufQuartzSubtypes = quartz.map(q => ({ name: q.name, faction: 'United Frontier', stats: combine(frontier.find(f => f.name === 'Clear Quartz').stats, q.statModifier), abilities: q.abilities, isQuartzSubtype: true, statModifier: q.statModifier })); record = ufQuartzSubtypes.find(r => fusionId(r) === value); } return record; }
function listAbilities(record) { const abilities = record.abilities || []; const hidden = record.hidden || []; return [...abilities, ...hidden.map(ability => `Hidden: ${ability}`)]; }
function populateFusionSelect(el, selected) { const baseRecords = [...gems, ...frontier].filter(record => !record.fusion); const ufQuartzSubtypes = quartz.map(q => ({ name: q.name, faction: 'United Frontier', stats: combine(frontier.find(f => f.name === 'Clear Quartz').stats, q.statModifier), abilities: q.abilities, isQuartzSubtype: true, statModifier: q.statModifier })); const records = [...baseRecords, ...ufQuartzSubtypes].sort((a, b) => `${a.faction}:${a.name}`.localeCompare(`${b.faction}:${b.name}`)); el.replaceChildren(...records.map(record => { const node = option(fusionId(record), `${record.faction}: ${record.name}${record.isQuartzSubtype ? ' (Quartz subtype)' : ''}`); return node; })); if (records.some(record => fusionId(record) === selected)) el.value = selected; }
function showFusionAbilities(target, record) { if (!record) return; const abilities = record.abilities || []; const hidden = record.hidden || []; const allAbilities = [...abilities, ...hidden.map(ability => `Hidden: ${ability}`)]; target.replaceChildren(...allAbilities.map(text => { const item = document.createElement('li'); item.textContent = text; return item; })); }
function generateAbilitySuggestions(first, second) {
  const suggestions = [];
  
  // Split abilities by semicolons to handle multiple abilities in one string
  const splitAbilities = (abilities) => {
    if (!abilities) return [];
    return abilities.flatMap(a => a.split(';').map(ab => ab.trim()));
  };
  
  const firstAbilities = splitAbilities(first.abilities);
  const secondAbilities = splitAbilities(second.abilities);
  
  // Check for custom combinations only (no individual ability suggestions)
  for (const firstAbility of firstAbilities) {
    for (const secondAbility of secondAbilities) {
      const comboKey = `${firstAbility} + ${secondAbility}`;
      const reverseKey = `${secondAbility} + ${firstAbility}`;
      
      if (customAbilitySuggestions[comboKey]) {
        suggestions.push(customAbilitySuggestions[comboKey]);
      } else if (customAbilitySuggestions[reverseKey]) {
        suggestions.push(customAbilitySuggestions[reverseKey]);
      }
    }
  }
  
  // If no specific combinations found, add general fusion suggestions
  if (suggestions.length === 0) {
    suggestions.push({
      name: 'Hybrid Mastery',
      description: 'A unique combination of the component gems\' abilities, creating effects greater than the sum of their parts.',
      wikiLink: null
    });
    suggestions.push({
      name: 'Synergistic Power',
      description: 'The fusion gains enhanced versions of both components\' primary abilities that work in harmony.',
      wikiLink: null
    });
  }
  
  return suggestions;
}

function refreshFusion() { const first = fusionComponent(fusionAEl); const second = fusionComponent(fusionBEl); if (!first || !second) return; const combined = combine(first.stats, second.stats); $('fusion-a-name').textContent = `${first.name} abilities`; $('fusion-b-name').textContent = `${second.name} abilities`; $('fusion-stats').replaceChildren(...S.map(key => { const div = document.createElement('div'); div.className = 'stat'; div.innerHTML = `<span>${key}</span><strong>${combined[key]}</strong><div class="change">Base stat total</div>`; return div; })); showFusionAbilities($('fusion-a-abilities'), first); showFusionAbilities($('fusion-b-abilities'), second); const suggestions = generateAbilitySuggestions(first, second); const suggestionsContainer = $('fusion-suggestions'); suggestionsContainer.replaceChildren(...suggestions.map(suggestion => { const article = document.createElement('article'); article.className = 'suggestion-card'; let content = `<h4>${suggestion.name}</h4><p>${suggestion.description}</p>`; if (suggestion.wikiLink) { content += `<a href="${suggestion.wikiLink}" target="_blank" rel="noopener noreferrer">View on Superpowers Wiki →</a>`; } article.innerHTML = content; return article; })); }
function initialiseFusionTool() { const first = fusionAEl.value; const second = fusionBEl.value; populateFusionSelect(fusionAEl, first); populateFusionSelect(fusionBEl, second); if (!fusionAEl.value) fusionAEl.selectedIndex = 0; if (!fusionBEl.value) fusionBEl.selectedIndex = Math.min(1, fusionBEl.options.length - 1); refreshFusion(); }
function refresh() {
  const record = activeRecord(); if (!record) return;
  const prismActive = record.name === 'Clear Quartz' && record.faction === 'United Frontier'; $('prism-step').classList.toggle('hidden', !prismActive);
  const modifier = modifiers.find(m => m.name === eraEl.value) || modifiers[0];
  const rank = rankFor(record); let base = record.stats; let inherited = [];
  if (prismActive && prismEl.value !== 'Unshifted') { const shift = quartz.find(q => q.name === prismEl.value); base = combine(base, shift.statModifier); inherited = shift.abilities; }
  const cut = cuts[cutEl.value]; const polishAllowed = record.kind === 'Metal'; const cutAllowed = record.kind !== 'Metal';
  if (cutEl.value === 'Perfect Polish' && !polishAllowed) cutEl.value = 'Perfect Cut'; if (cutEl.value === 'Perfect Cut' && !cutAllowed) cutEl.value = 'Perfect Polish';
  const level = Math.min(30, Math.max(1, Number.parseInt($('level').value, 10) || 1)); $('level').value = level;
  const cutData = cuts[cutEl.value]; const bonus = jobBonus(rank, cutEl.value); const growth = levelGrowth(level, record.classification); const final = combine(base, modifier.stats, cutData.stats, bonus, growth); const changes = combine(modifier.stats, cutData.stats, bonus, growth, prismActive && prismEl.value !== 'Unshifted' ? quartz.find(q => q.name === prismEl.value).statModifier : zero);
  $('result-name').textContent = prismActive && prismEl.value !== 'Unshifted' ? prismEl.value : record.name; $('rank').textContent = rank; $('rank-label').textContent = record.fusion ? 'Threat Level' : 'Rank'; $('height').textContent = heightFor(record); $('result-level').textContent = `${level} / 30`; $('next-exp').textContent = expToNextLevel(level) === null ? 'Level cap reached' : expToNextLevel(level).toLocaleString(); $('total-exp').textContent = totalExpForLevel(level).toLocaleString();
  $('badges').replaceChildren(...[record.faction, ...(record.tags || []), modifier.unique ? 'Unique modifier' : ''].filter(Boolean).map(x => { const b = document.createElement('span'); b.textContent = x; return b; }));
  $('stats').replaceChildren(...S.map(key => { const div = document.createElement('div'); div.className = 'stat'; const delta = changes[key]; div.innerHTML = record.fusion ? `<span>${key}</span><strong>?</strong><div class="change">Component-derived</div>` : `<span>${key}</span><strong>${Math.max(0, final[key])}</strong><div class="change">${delta ? `${delta > 0 ? '+' : ''}${delta} modifier` : 'Base value'}</div>`; return div; }));
  const baseAbilities = prismActive && prismEl.value !== 'Unshifted' ? record.abilities.filter(ability => ability !== 'Prism') : record.abilities; const primaryAbilities = [...baseAbilities, ...inherited]; const standardAbilities = cutEl.value.startsWith('Perfect') ? enhanceFirstAbility(primaryAbilities) : primaryAbilities; const abilityList = [...standardAbilities, ...modifier.abilities, ...cutData.abilities, ...(record.hidden || []).map(a => `Hidden: ${a}`)]; $('abilities').replaceChildren(...abilityList.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
  const notes = []; if (record.fusion) notes.push(`This fusion uses ${record.components}. Its source sheet says to use its two component stats, but the combination formula has not been supplied, so its final stats remain unresolved.`); if (modifier.unique) notes.push('Unique modifiers replace an era modifier and should only be used for approved case-by-case records.'); if (cutEl.value.startsWith('Perfect')) notes.push('Perfect Cut and Perfect Polish enhance the gem type’s first listed standard ability.'); if (cutEl.value === 'Defective') notes.push('Defective penalty transfers are not automated yet. Apply only the allowed transfers and do not reduce any stat below 0.'); if (record.name.includes('Era')) notes.push('This record already has an era-labelled stat block. Confirm whether its base stats should also receive the selected era modifier before using it in play.'); if (prismActive) notes.push('United Frontier Prism shifts apply their listed stat modifier to Clear Quartz base stats.'); notes.push('Level gains are included: +4 HP and +2 ATK each level, +1 DEF every 2 levels, +1 SPD every 4 levels, and +4 MAG each level for Gems.'); $('notice').textContent = notes.join(' ');
}
choices(factionEl, ['Gempire', 'United Frontier', 'Rogue']); choices(eraEl, modifiers, m => m.name); choices(prismEl, ['Unshifted', ...quartz.map(q => q.name)]); choices(cutEl, Object.keys(cuts));
factionEl.addEventListener('change', refreshGems); [gemEl, prismEl, eraEl, cutEl, $('level')].forEach(el => el.addEventListener('input', refresh));
refreshGems();
fusionAEl.addEventListener('change', refreshFusion); fusionBEl.addEventListener('change', refreshFusion); initialiseFusionTool();
