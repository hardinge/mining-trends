import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceDot, ReferenceArea, ComposedChart,
  PieChart, Pie, Cell,
} from 'recharts';

// ============ PALETTE ============
const C = {
  bg: '#1a1612',
  card: '#221d18',
  border: '#3a322a',
  text: '#e8dfd2',
  dim: '#9a8c78',
  ochre: '#d4a14a',
  copper: '#c87856',
  rust: '#a14a2c',
  gold: '#e6b84a',
  teal: '#4a8a87',
  slate: '#7e8b9a',
  forest: '#5a7a4a',
  plum: '#7a4a6a',
  sand: '#b8966a',
  ink: '#2a2520',
  marker: '#f0d896',
};

// ============ DATA ============

const mineData = [
  { year: 1950, openCut: 5, underground: 36 },
  { year: 1955, openCut: 7, underground: 36 },
  { year: 1960, openCut: 10, underground: 34 },
  { year: 1965, openCut: 15, underground: 32 },
  { year: 1970, openCut: 26, underground: 30 },
  { year: 1975, openCut: 35, underground: 28 },
  { year: 1980, openCut: 46, underground: 28 },
  { year: 1985, openCut: 66, underground: 30 },
  { year: 1990, openCut: 82, underground: 32 },
  { year: 1995, openCut: 96, underground: 35 },
  { year: 2000, openCut: 106, underground: 38 },
  { year: 2005, openCut: 118, underground: 40 },
  { year: 2010, openCut: 132, underground: 42 },
  { year: 2015, openCut: 108, underground: 38 },
  { year: 2020, openCut: 104, underground: 40 },
  { year: 2025, openCut: 116, underground: 46 },
];
const mineNotes = [
  { year: 1966, n: 1, title: 'Mt Tom Price opens', body: 'Pilbara iron ore era begins; open-cut at unprecedented scale' },
  { year: 1971, n: 2, title: 'Mt Isa starts SLC', body: 'Sub-level caving introduced — UG productivity step-change' },
  { year: 1983, n: 3, title: 'A$ floats / gold boom', body: 'CIP/CIL tech unlocks low-grade open-cut gold across WA-Goldfields' },
  { year: 1988, n: 4, title: 'Olympic Dam', body: "Australia's largest UG metal mine ramps up" },
  { year: 2003, n: 5, title: 'China supercycle', body: 'Iron-ore-led OC expansion accelerates; majors invest heavily' },
  { year: 2014, n: 6, title: 'Iron ore price crash', body: 'Marginal OC producers close; consolidation phase' },
  { year: 2017, n: 7, title: 'Battery metals era', body: 'Pilbara hard-rock Li mines + Greenbushes expansion' },
  { year: 2023, n: 8, title: 'Critical minerals push', body: 'Govt-backed REE/critical minerals; new UG projects (block caves) advance' },
];

const aiscData = [
  { year: 1980, oc: 480, ug: 620 },
  { year: 1985, oc: 540, ug: 680 },
  { year: 1990, oc: 620, ug: 760 },
  { year: 1995, oc: 660, ug: 820 },
  { year: 2000, oc: 720, ug: 900 },
  { year: 2005, oc: 850, ug: 1080 },
  { year: 2010, oc: 1100, ug: 1380 },
  { year: 2013, oc: 1480, ug: 1820 },
  { year: 2015, oc: 1240, ug: 1560 },
  { year: 2018, oc: 1280, ug: 1620 },
  { year: 2020, oc: 1380, ug: 1740 },
  { year: 2022, oc: 1620, ug: 2020 },
  { year: 2025, oc: 1880, ug: 2280 },
];
const aiscNotes = [
  { year: 1980, n: 1, title: 'Pre-AISC era', body: 'Metric did not exist; figures back-cast from cash-cost reporting' },
  { year: 1996, n: 2, title: 'Cost-cutting cycle', body: 'Long gold bear market forces efficiency, mechanisation, larger trucks' },
  { year: 2011, n: 3, title: 'Cost balloon peaks', body: 'Boom drives diesel, steel, labour; grade dilution to chase tonnes' },
  { year: 2013, n: 4, title: 'WGC standardises AISC', body: 'World Gold Council defines metric — forces transparency on sustaining capex' },
  { year: 2016, n: 5, title: 'Reset', body: 'Post-crash discipline — productivity programs, automation' },
  { year: 2022, n: 6, title: 'Inflation surge', body: 'Diesel, labour shortages, ESG/closure provisions, deeper pits' },
];

const costData = [
  { year: 1950, oc: 12, ug: 95 },
  { year: 1960, oc: 10, ug: 90 },
  { year: 1970, oc: 7, ug: 85 },
  { year: 1980, oc: 6, ug: 88 },
  { year: 1990, oc: 5, ug: 92 },
  { year: 2000, oc: 5, ug: 100 },
  { year: 2005, oc: 6, ug: 110 },
  { year: 2010, oc: 8, ug: 130 },
  { year: 2013, oc: 9, ug: 145 },
  { year: 2016, oc: 7, ug: 125 },
  { year: 2020, oc: 7, ug: 130 },
  { year: 2022, oc: 9, ug: 150 },
  { year: 2025, oc: 10, ug: 165 },
];
const costNotes = [
  { year: 1965, n: 1, title: 'Mechanisation', body: 'Larger trucks/shovels (Cat 769, then 777) collapse OC unit cost' },
  { year: 1985, n: 2, title: 'Scale + automation', body: 'Pilbara grows truck fleets; UG mech-bolters, jumbos lift face advance' },
  { year: 2008, n: 3, title: 'Boom inflation', body: 'Diesel >A$1.50/L; labour at 2x; tyres rationed — costs inflate fast' },
  { year: 2014, n: 4, title: 'Autonomous haulage', body: 'Rio Pilbara AHS at scale; FMG follows; OC step-down in unit cost' },
  { year: 2022, n: 5, title: 'Deeper, lower grade', body: 'UG depth + ventilation costs rise; ESG, water, closure now in unit cost' },
];

const methodData = [
  { year: 1950, slos: 20, slc: 0, block: 0,  cf: 14, other: 2 },
  { year: 1960, slos: 20, slc: 0, block: 0,  cf: 12, other: 2 },
  { year: 1970, slos: 20, slc: 1, block: 0,  cf: 7,  other: 2 },
  { year: 1980, slos: 18, slc: 4, block: 1,  cf: 4,  other: 1 },
  { year: 1990, slos: 20, slc: 6, block: 3,  cf: 2,  other: 1 },
  { year: 2000, slos: 22, slc: 9, block: 5,  cf: 1,  other: 1 },
  { year: 2010, slos: 25, slc: 9, block: 7,  cf: 1,  other: 0 },
  { year: 2020, slos: 22, slc: 7, block: 10, cf: 1,  other: 0 },
  { year: 2025, slos: 25, slc: 8, block: 12, cf: 1,  other: 0 },
];
const methodNotes = [
  { year: 1971, n: 1, title: 'Mt Isa pioneers SLC', body: 'Sub-level caving scales for high-tonnage Pb-Zn-Cu' },
  { year: 1993, n: 2, title: 'Northparkes E26', body: "Australia's first major panel block cave (Cu-Au)" },
  { year: 2010, n: 3, title: 'Cadia East', body: 'Deepest block cave globally at the time — Au-Cu' },
  { year: 2024, n: 4, title: 'Block cave wave', body: 'Cadia PC2-3, Telfer UG, Oyu reference — capital-heavy but low cost/t' },
];

const revData = [
  { year: 1950, iron: 0,   gold: 5,  copper: 1,  lithium: 0,  basemetals: 4,  bauxite: 0,  other: 1 },
  { year: 1960, iron: 1,   gold: 4,  copper: 2,  lithium: 0,  basemetals: 5,  bauxite: 1,  other: 1 },
  { year: 1970, iron: 8,   gold: 4,  copper: 2,  lithium: 0,  basemetals: 6,  bauxite: 4,  other: 2 },
  { year: 1980, iron: 16,  gold: 6,  copper: 3,  lithium: 0,  basemetals: 7,  bauxite: 7,  other: 3 },
  { year: 1990, iron: 22,  gold: 12, copper: 5,  lithium: 0,  basemetals: 8,  bauxite: 9,  other: 4 },
  { year: 2000, iron: 26,  gold: 14, copper: 6,  lithium: 0,  basemetals: 9,  bauxite: 11, other: 5 },
  { year: 2010, iron: 72,  gold: 18, copper: 11, lithium: 1,  basemetals: 12, bauxite: 9,  other: 7 },
  { year: 2015, iron: 82,  gold: 20, copper: 12, lithium: 2,  basemetals: 11, bauxite: 9,  other: 8 },
  { year: 2020, iron: 112, gold: 28, copper: 13, lithium: 3,  basemetals: 13, bauxite: 9,  other: 10 },
  { year: 2025, iron: 132, gold: 36, copper: 17, lithium: 18, basemetals: 14, bauxite: 8,  other: 12 },
];
const revNotes = [
  { year: 1966, n: 1, title: 'Iron ore exports begin', body: 'Embargo lifted 1960; first WA shipments 1966 to Japan' },
  { year: 1972, n: 2, title: 'Bauxite/alumina ramps', body: 'Gove, Weipa, Worsley scale up' },
  { year: 1983, n: 3, title: 'Gold boom', body: 'A$ float + price surge + heap-leach economics' },
  { year: 2003, n: 4, title: 'China iron ore demand', body: 'Iron-ore revenue overtakes everything combined' },
  { year: 2017, n: 5, title: 'Lithium first wave', body: 'Pilbara hard-rock Li ramps' },
  { year: 2023, n: 6, title: 'Lithium surge & retreat', body: 'Spodumene revenue spikes 2022-23 then prices crash 2024' },
];

const goldData = [
  { year: 1950, africa: 450,  namerica: 190, samerica: 40,  asiaoc: 60,   europe: 15 },
  { year: 1960, africa: 700,  namerica: 190, samerica: 55,  asiaoc: 85,   europe: 20 },
  { year: 1970, africa: 1100, namerica: 175, samerica: 60,  asiaoc: 105,  europe: 30 },
  { year: 1980, africa: 580,  namerica: 135, samerica: 50,  asiaoc: 180,  europe: 20 },
  { year: 1990, africa: 750,  namerica: 470, samerica: 170, asiaoc: 690,  europe: 60 },
  { year: 2000, africa: 560,  namerica: 535, samerica: 305, asiaoc: 1050, europe: 100 },
  { year: 2010, africa: 580,  namerica: 370, samerica: 450, asiaoc: 1140, europe: 110 },
  { year: 2020, africa: 700,  namerica: 415, samerica: 545, asiaoc: 1410, europe: 130 },
  { year: 2025, africa: 825,  namerica: 430, samerica: 530, asiaoc: 1385, europe: 130 },
];
const goldNotes = [
  { year: 1970, n: 1, title: 'Witwatersrand peak', body: 'South Africa ~75% of world gold — deepest UG mines globally' },
  { year: 1985, n: 2, title: 'Heap-leach revolution', body: 'Nevada (Carlin) + WA-Goldfields scale; Africa share collapses' },
  { year: 2007, n: 3, title: 'China overtakes SA', body: 'China becomes #1 producer; Africa restructures (Ghana, Mali, BF rise)' },
  { year: 2013, n: 4, title: 'AISC discipline', body: 'Post-price-crash, only lowest-cost regions grow share' },
];

const copperData = [
  { year: 1950, namerica: 1.1, samerica: 0.6, europe: 0.4, asia: 0.3, africa: 0.7, oceania: 0.2 },
  { year: 1960, namerica: 1.3, samerica: 1.0, europe: 0.5, asia: 0.5, africa: 1.2, oceania: 0.2 },
  { year: 1970, namerica: 1.5, samerica: 1.5, europe: 0.5, asia: 0.8, africa: 1.7, oceania: 0.3 },
  { year: 1980, namerica: 1.5, samerica: 2.2, europe: 0.8, asia: 1.0, africa: 1.8, oceania: 0.5 },
  { year: 1990, namerica: 2.0, samerica: 2.9, europe: 1.1, asia: 1.3, africa: 1.2, oceania: 0.6 },
  { year: 2000, namerica: 1.7, samerica: 5.5, europe: 1.1, asia: 2.4, africa: 1.6, oceania: 0.9 },
  { year: 2010, namerica: 1.6, samerica: 6.8, europe: 1.0, asia: 3.5, africa: 2.4, oceania: 0.8 },
  { year: 2020, namerica: 1.9, samerica: 8.2, europe: 1.2, asia: 4.5, africa: 3.7, oceania: 1.0 },
  { year: 2025, namerica: 2.1, samerica: 8.7, europe: 1.2, asia: 5.1, africa: 4.8, oceania: 1.2 },
];
const copperNotes = [
  { year: 1971, n: 1, title: 'Chile nationalisation', body: 'Codelco formed; SAm dominance cemented through 1970s-80s' },
  { year: 1990, n: 2, title: 'Escondida', body: 'BHP-RIO supergiant opens — Chile share peaks' },
  { year: 1996, n: 3, title: 'Africa decline bottoms', body: 'Zambia/DRC restructure; foreign investment returns slowly' },
  { year: 2009, n: 4, title: 'DRC resurgence', body: 'Tenke Fungurume, Kamoa-Kakula — African share climbs again' },
  { year: 2020, n: 5, title: 'Energy transition demand', body: 'Premium pricing for low-CO₂ copper; new projects favour SAm + Africa' },
];

// ===== Markets & Companies =====

const goldCycleData = [
  { year: 1950, price: 410 }, { year: 1960, price: 360 }, { year: 1970, price: 280 },
  { year: 1971, price: 320 }, { year: 1975, price: 750 }, { year: 1980, price: 2400 },
  { year: 1982, price: 1100 }, { year: 1985, price: 950 }, { year: 1990, price: 760 },
  { year: 1995, price: 640 }, { year: 1999, price: 430 }, { year: 2001, price: 460 },
  { year: 2005, price: 700 }, { year: 2008, price: 1180 }, { year: 2011, price: 2280 },
  { year: 2013, price: 1700 }, { year: 2015, price: 1380 }, { year: 2018, price: 1620 },
  { year: 2020, price: 2100 }, { year: 2022, price: 2050 }, { year: 2024, price: 2700 },
  { year: 2025, price: 3500 }, { year: 2026, price: 4565 },
];
const goldCyclePhases = [
  { x1: 1950, x2: 1971, color: C.slate },
  { x1: 1971, x2: 1980, color: C.gold },
  { x1: 1980, x2: 2001, color: C.rust },
  { x1: 2001, x2: 2011, color: C.gold },
  { x1: 2011, x2: 2015, color: C.rust },
  { x1: 2015, x2: 2026, color: C.gold },
];
const goldCycleNotes = [
  { year: 1971, n: 1, title: 'Nixon shock', body: 'US ends gold-dollar convertibility; price floats and immediately runs' },
  { year: 1980, n: 2, title: 'Hunt brothers / Volcker', body: 'Speculation peak + Iran crisis; Volcker rate hikes then crush gold' },
  { year: 1999, n: 3, title: "Brown's Bottom", body: 'UK sells 395t at the lows; Washington Agreement caps CB sales' },
  { year: 2008, n: 4, title: 'GFC', body: 'Gold rallies as financial system stress builds' },
  { year: 2011, n: 5, title: 'US$1,920 nominal peak', body: 'Eurozone crisis, US debt downgrade, QE2' },
  { year: 2020, n: 6, title: 'COVID + negative real rates', body: 'Real yields collapse; gold breaks 2011 nominal high' },
  { year: 2024, n: 7, title: 'Central bank buying surge', body: 'Post-Russia sanctions; EM CBs accumulate at record pace' },
  { year: 2026, n: 8, title: 'US$4,565/oz today', body: 'Spot price as of May 2026 — +30% YoY; new ATH on Middle East tensions, structural CB buying, fiat debasement thesis' },
];

const copperCycleData = [
  { year: 1950, price: 3.5 }, { year: 1960, price: 3.4 }, { year: 1970, price: 3.3 },
  { year: 1974, price: 4.8 }, { year: 1980, price: 3.0 }, { year: 1985, price: 2.0 },
  { year: 1990, price: 2.2 }, { year: 1995, price: 2.4 }, { year: 1999, price: 1.0 },
  { year: 2003, price: 1.3 }, { year: 2007, price: 4.5 }, { year: 2009, price: 2.5 },
  { year: 2011, price: 5.0 }, { year: 2014, price: 3.5 }, { year: 2016, price: 2.3 },
  { year: 2020, price: 2.8 }, { year: 2022, price: 4.5 }, { year: 2024, price: 4.2 },
  { year: 2025, price: 4.8 }, { year: 2026, price: 5.94 },
];
const copperCyclePhases = [
  { x1: 1950, x2: 1974, color: C.slate },
  { x1: 1974, x2: 1999, color: C.rust },
  { x1: 1999, x2: 2011, color: C.gold },
  { x1: 2011, x2: 2016, color: C.rust },
  { x1: 2016, x2: 2026, color: C.gold },
];
const copperCycleNotes = [
  { year: 1971, n: 1, title: 'Chile nationalisation', body: 'Codelco formed; supply uncertainty premium' },
  { year: 1999, n: 2, title: 'Asian crisis trough', body: '~US$0.60/lb nominal; many mines uneconomic' },
  { year: 2003, n: 3, title: 'China demand inflects', body: 'Imports surge; price triples in 4 years' },
  { year: 2008, n: 4, title: 'GFC plunge', body: 'Half-price in 6 months; rapid rebound on China stimulus' },
  { year: 2016, n: 5, title: 'Cycle bottom', body: 'Glencore, Freeport restructure; capex collapses' },
  { year: 2022, n: 6, title: 'EV/grid premium', body: 'Energy-transition demand thesis re-prices structurally higher' },
  { year: 2026, n: 7, title: 'US$5.94/lb today', body: 'Spot price as of May 2026 — +25% YoY; energy transition demand, Strait of Hormuz disruption to Chilean refining; ~10% off ATH' },
];

const discoveryData = [
  { decade: '1950s', africa: 8,  namerica: 4,  samerica: 2,  asiaoc: 3,  europe: 1 },
  { decade: '1960s', africa: 10, namerica: 6,  samerica: 2,  asiaoc: 3,  europe: 1 },
  { decade: '1970s', africa: 8,  namerica: 8,  samerica: 3,  asiaoc: 6,  europe: 1 },
  { decade: '1980s', africa: 6,  namerica: 14, samerica: 5,  asiaoc: 12, europe: 1 },
  { decade: '1990s', africa: 8,  namerica: 10, samerica: 12, asiaoc: 18, europe: 2 },
  { decade: '2000s', africa: 6,  namerica: 5,  samerica: 7,  asiaoc: 8,  europe: 1 },
  { decade: '2010s', africa: 4,  namerica: 3,  samerica: 4,  asiaoc: 5,  europe: 1 },
  { decade: '2020s*', africa: 1, namerica: 1,  samerica: 1,  asiaoc: 2,  europe: 0 },
];
const discoveryNotes = [
  { decade: '1960s', n: 1, title: 'Carlin Trend', body: 'Newmont identifies invisible-gold mineralogy in Nevada — opens N. America' },
  { decade: '1980s', n: 2, title: 'WA-Goldfields rebirth', body: 'Heap-leach + CIP/CIL re-economics shallow oxide; many small/mid finds' },
  { decade: '1990s', n: 3, title: 'Discovery peak', body: 'Indonesia (Grasberg), DRC (Kibali), Argentina (Veladero), Australia' },
  { decade: '2000s', n: 4, title: 'Discovery decline begins', body: 'Big easy targets exhausted; spend rises but tier-1 finds halve' },
  { decade: '2010s', n: 5, title: 'AI exploration era starts', body: 'Greenfields underwhelm; brownfield extensions dominate' },
  { decade: '2020s*', n: 6, title: 'Partial decade', body: '*2020-2024 only; final tally TBD; trend looks weakest on record' },
];

// Major Cu discoveries (>3 Mt contained Cu) per decade by continent
const copperDiscoveryData = [
  { decade: '1950s', africa: 5, namerica: 3, samerica: 4,  asiaoc: 1, europe: 0 },
  { decade: '1960s', africa: 4, namerica: 4, samerica: 5,  asiaoc: 2, europe: 1 },
  { decade: '1970s', africa: 3, namerica: 5, samerica: 6,  asiaoc: 3, europe: 1 },
  { decade: '1980s', africa: 2, namerica: 4, samerica: 9,  asiaoc: 5, europe: 1 },
  { decade: '1990s', africa: 4, namerica: 3, samerica: 12, asiaoc: 6, europe: 1 },
  { decade: '2000s', africa: 4, namerica: 2, samerica: 6,  asiaoc: 5, europe: 0 },
  { decade: '2010s', africa: 4, namerica: 2, samerica: 3,  asiaoc: 2, europe: 0 },
  { decade: '2020s*', africa: 2, namerica: 1, samerica: 1, asiaoc: 1, europe: 0 },
];
const copperDiscoveryNotes = [
  { decade: '1960s', n: 1, title: 'Andean porphyry boom', body: 'El Teniente expansion, La Caridad (Mexico), Toquepala — Cu belt era begins' },
  { decade: '1980s', n: 2, title: 'Escondida (1981)', body: "World's largest Cu mine; BHP-Rio JV; sets template for Chilean megaprojects" },
  { decade: '1990s', n: 3, title: 'Discovery peak', body: 'Collahuasi, Los Pelambres, Tenke Fungurume — Andes + DRC dominate' },
  { decade: '2000s', n: 4, title: 'Oyu Tolgoi', body: 'Rio Tinto in Mongolia — supergiant Cu-Au; era of frontier discoveries' },
  { decade: '2010s', n: 5, title: 'Kamoa-Kakula', body: 'Ivanhoe finds DRC supergiant; otherwise tier-1 finds rare' },
  { decade: '2020s*', n: 6, title: 'Partial decade', body: '*2020-2024 only; Cu finds at multi-decade lows; energy transition demand outpacing supply' },
];

const mergerData = [
  { year: 1995, count: 5,  value: 6 },
  { year: 1997, count: 7,  value: 14 },
  { year: 2000, count: 9,  value: 22 },
  { year: 2001, count: 12, value: 45 },
  { year: 2003, count: 8,  value: 18 },
  { year: 2005, count: 14, value: 42 },
  { year: 2006, count: 18, value: 75 },
  { year: 2007, count: 22, value: 110 },
  { year: 2008, count: 8,  value: 22 },
  { year: 2010, count: 14, value: 38 },
  { year: 2011, count: 18, value: 55 },
  { year: 2013, count: 16, value: 92 },
  { year: 2015, count: 10, value: 18 },
  { year: 2017, count: 12, value: 28 },
  { year: 2018, count: 14, value: 38 },
  { year: 2019, count: 16, value: 48 },
  { year: 2020, count: 10, value: 22 },
  { year: 2022, count: 14, value: 32 },
  { year: 2023, count: 16, value: 58 },
  { year: 2024, count: 12, value: 42 },
  { year: 2025, count: 10, value: 28 },
];
const mergerNotes = [
  { year: 2001, n: 1, title: 'BHP-Billiton', body: 'Dual-listed merger creates first true diversified major' },
  { year: 2007, n: 2, title: 'Peak boom M&A', body: 'Rio-Alcan US$38B; BHP-Rio attempt looms (collapses 2008 in GFC)' },
  { year: 2013, n: 3, title: 'Glencore-Xstrata', body: 'US$90B; trader-producer model at peak; commodity supercycle late innings' },
  { year: 2019, n: 4, title: 'Gold senior wave', body: 'Newmont-Goldcorp + Barrick-Randgold reshape gold sector top tier' },
  { year: 2023, n: 5, title: 'Newmont-Newcrest', body: 'US$19B — biggest gold deal ever; Australian/PNG asset base' },
  { year: 2024, n: 6, title: 'BHP-Anglo (failed)', body: 'US$49B copper-driven bid rejected; signals scarcity premium for Cu' },
];

const commoditiesData = [
  { year: 2000, gold: 100, copper: 100, ironOre: 100, lithium: 100, nickel: 100 },
  { year: 2003, gold: 130, copper: 80,  ironOre: 110, lithium: 95,  nickel: 130 },
  { year: 2006, gold: 215, copper: 320, ironOre: 220, lithium: 110, nickel: 380 },
  { year: 2008, gold: 320, copper: 320, ironOre: 380, lithium: 130, nickel: 220 },
  { year: 2011, gold: 480, copper: 400, ironOre: 600, lithium: 180, nickel: 280 },
  { year: 2013, gold: 380, copper: 320, ironOre: 480, lithium: 160, nickel: 180 },
  { year: 2015, gold: 320, copper: 200, ironOre: 280, lithium: 240, nickel: 130 },
  { year: 2018, gold: 350, copper: 280, ironOre: 320, lithium: 480, nickel: 170 },
  { year: 2020, gold: 470, copper: 280, ironOre: 480, lithium: 200, nickel: 180 },
  { year: 2022, gold: 460, copper: 380, ironOre: 540, lithium: 1200, nickel: 320 },
  { year: 2024, gold: 580, copper: 380, ironOre: 380, lithium: 380, nickel: 220 },
  { year: 2025, gold: 780, copper: 460, ironOre: 360, lithium: 320, nickel: 240 },
];
const commoditiesNotes = [
  { year: 2003, n: 1, title: 'China supercycle starts', body: 'Industrial demand inflects; iron ore + copper + nickel run together' },
  { year: 2008, n: 2, title: 'GFC', body: 'Industrial metals halve; gold holds — divergence begins' },
  { year: 2011, n: 3, title: 'Supercycle peak', body: 'Iron ore 6×, copper 4×, gold ~5× from 2000' },
  { year: 2018, n: 4, title: 'Lithium first wave', body: 'EV thesis; spodumene + brine prices spike then crash' },
  { year: 2022, n: 5, title: 'Lithium mania', body: 'Spodumene 12× from 2000; corrects 70% by 2024' },
  { year: 2025, n: 6, title: 'Gold breakout', body: 'Gold leads; industrial metals mixed; lithium reset' },
];

const top5Data = [
  { year: 2000, newmont: 5,  barrick: 8,  agnico: 0.5, anglogold: 7,  kinross: 0.6, newcrest: 1.5,  gold: 280 },
  { year: 2002, newmont: 12, barrick: 9,  agnico: 0.8, anglogold: 8,  kinross: 1.0, newcrest: 2,    gold: 310 },
  { year: 2005, newmont: 24, barrick: 15, agnico: 2,   anglogold: 12, kinross: 2.5, newcrest: 6,    gold: 450 },
  { year: 2008, newmont: 22, barrick: 32, agnico: 5,   anglogold: 12, kinross: 12,  newcrest: 14,   gold: 880 },
  { year: 2010, newmont: 32, barrick: 52, agnico: 10,  anglogold: 17, kinross: 18,  newcrest: 25,   gold: 1400 },
  { year: 2011, newmont: 32, barrick: 50, agnico: 6,   anglogold: 18, kinross: 16,  newcrest: 28,   gold: 1700 },
  { year: 2013, newmont: 12, barrick: 18, agnico: 5,   anglogold: 5,  kinross: 5,   newcrest: 7,    gold: 1300 },
  { year: 2015, newmont: 10, barrick: 9,  agnico: 6,   anglogold: 3,  kinross: 2,   newcrest: 7,    gold: 1100 },
  { year: 2017, newmont: 20, barrick: 17, agnico: 11,  anglogold: 4,  kinross: 5,   newcrest: 13,   gold: 1300 },
  { year: 2019, newmont: 36, barrick: 32, agnico: 14,  anglogold: 8,  kinross: 6,   newcrest: 17,   gold: 1500 },
  { year: 2020, newmont: 50, barrick: 47, agnico: 19,  anglogold: 11, kinross: 9,   newcrest: 22,   gold: 1900 },
  { year: 2022, newmont: 36, barrick: 30, agnico: 22,  anglogold: 6,  kinross: 5,   newcrest: 10,   gold: 1800 },
  { year: 2023, newmont: 48, barrick: 30, agnico: 28,  anglogold: 7,  kinross: 6,   newcrest: 19,   gold: 2050 },
  { year: 2024, newmont: 50, barrick: 32, agnico: 42,  anglogold: 10, kinross: 11,  newcrest: null, gold: 2700 },
  { year: 2025, newmont: 62, barrick: 36, agnico: 58,  anglogold: 16, kinross: 14,  newcrest: null, gold: 3500 },
];
const top5Notes = [
  { year: 2002, n: 1, title: 'Newmont-Normandy', body: 'Acquires Australian Normandy + Franco-Nevada — vaults to #1 globally' },
  { year: 2006, n: 2, title: 'Barrick-Placer Dome', body: 'US$10B; Barrick clear #1; absorbs Cortez, Pueblo Viejo pipeline' },
  { year: 2011, n: 3, title: 'Gold price peak', body: 'US$1,920/oz nominal; sector market cap peaks ~US$200B' },
  { year: 2013, n: 4, title: 'Pascua-Lama suspended', body: 'Barrick takes US$5B writedown; share price collapses 60%+' },
  { year: 2015, n: 5, title: 'Sector trough', body: 'Gold US$1,050; majors lose 70-80% from peak; balance-sheet repair era' },
  { year: 2019, n: 6, title: 'Barrick-Randgold + Newmont-Goldcorp', body: 'Two mega-deals reshape top tier; Bristow takes Barrick CEO' },
  { year: 2022, n: 7, title: 'Agnico-Kirkland Lake', body: 'Merger creates true senior; Macassa, Detour, Fosterville assets' },
  { year: 2023, n: 8, title: 'Newmont-Newcrest', body: 'US$19B; biggest gold deal ever; absorbs Cadia, Lihir, Telfer' },
  { year: 2025, n: 9, title: 'Agnico challenges Newmont', body: 'Agnico market cap rivals Newmont at gold ATH; cleanest senior balance sheet' },
];

const top615Data = [
  { year: 2000, goldfields: 2,    northernstar: 0,    harmony: 1.5, panamerican: 0.5, alamos: 0.1, evolution: 0,   newcrest: 1.5,  gold: 280 },
  { year: 2005, goldfields: 8,    northernstar: 0,    harmony: 5,   panamerican: 1.5, alamos: 0.3, evolution: 0,   newcrest: 6,    gold: 450 },
  { year: 2010, goldfields: 12,   northernstar: 0.05, harmony: 4,   panamerican: 4,   alamos: 1.5, evolution: 0,   newcrest: 25,   gold: 1400 },
  { year: 2011, goldfields: 13,   northernstar: 0.2,  harmony: 5,   panamerican: 4,   alamos: 2,   evolution: 0.3, newcrest: 28,   gold: 1700 },
  { year: 2013, goldfields: 4,    northernstar: 0.3,  harmony: 1.5, panamerican: 1.5, alamos: 0.8, evolution: 0.3, newcrest: 7,    gold: 1300 },
  { year: 2015, goldfields: 3,    northernstar: 1.5,  harmony: 0.5, panamerican: 1.2, alamos: 1.5, evolution: 1,   newcrest: 7,    gold: 1100 },
  { year: 2017, goldfields: 6,    northernstar: 2.5,  harmony: 1,   panamerican: 2.5, alamos: 2.5, evolution: 2.5, newcrest: 13,   gold: 1300 },
  { year: 2019, goldfields: 5,    northernstar: 6,    harmony: 1.5, panamerican: 5,   alamos: 2.5, evolution: 3.5, newcrest: 17,   gold: 1500 },
  { year: 2020, goldfields: 10,   northernstar: 8,    harmony: 4,   panamerican: 7,   alamos: 4,   evolution: 5,   newcrest: 22,   gold: 1900 },
  { year: 2022, goldfields: 8,    northernstar: 9,    harmony: 2,   panamerican: 5,   alamos: 3,   evolution: 3.5, newcrest: 10,   gold: 1800 },
  { year: 2023, goldfields: 13,   northernstar: 11,   harmony: 4,   panamerican: 6,   alamos: 5,   evolution: 4,   newcrest: 19,   gold: 2050 },
  { year: 2024, goldfields: 14,   northernstar: 14,   harmony: 6,   panamerican: 8,   alamos: 8,   evolution: 6,   newcrest: null, gold: 2700 },
  { year: 2025, goldfields: 18,   northernstar: 18,   harmony: 9,   panamerican: 10,  alamos: 12,  evolution: 8,   newcrest: null, gold: 3500 },
];
const top615Notes = [
  { year: 2002, n: 1, title: 'Gold Fields formed', body: 'South African senior consolidates Driefontein, Kloof, Beatrix' },
  { year: 2010, n: 2, title: 'Northern Star founded', body: 'Bill Beament takes shell, buys Paulsens, then Plutonic, Jundee' },
  { year: 2011, n: 3, title: 'Evolution Mining formed', body: 'Catalpa-Conquest merger; Cracow, Mt Rawdon, Pajingo seed assets' },
  { year: 2016, n: 4, title: 'Evolution-Cowal', body: 'Buys Cowal from Barrick; subsequently Mungari, then Ernest Henry Cu-Au stream' },
  { year: 2018, n: 5, title: 'Pan American-Tahoe', body: 'Acquires Escobal (suspended); shifts to LATAM silver+gold mix' },
  { year: 2021, n: 6, title: 'Northern Star-Saracen', body: 'Merger consolidates KCGM (Super Pit) ownership' },
  { year: 2023, n: 7, title: 'Pan American-Yamana share', body: 'Splits Yamana with Agnico; Cerro Moro, Jacobina, Minera Florida' },
  { year: 2023, n: 8, title: 'Newcrest acquired by Newmont', body: 'US$19B; Cadia, Lihir, Telfer, Brucejack absorbed; ends 56-year ASX-listed history' },
  { year: 2025, n: 9, title: 'Mid-tier re-rate', body: 'Gold ATH lifts entire tier; Northern Star, Alamos, Evolution lead percentage gains' },
];

// ===== Section overviews =====

const industryOverview = {
  title: 'Seventy-five years of Australian metal mining',
  intro: 'From hand-stoped gold in the 1950s to autonomous Pilbara haul trucks today: Australia became the world\'s largest open-cut metal mining country and a top producer in nearly every major metal. The seven charts that follow trace mine counts, costs, methods, revenue, and regional production share over that period.',
  items: [
    { n: 1, title: 'Open-cut takeover (1965-1985)', body: 'Iron ore in the Pilbara begins it; heap-leach + CIP/CIL economics in the WA-Goldfields completes it. OC mine count triples while UG count holds roughly flat — and stays that way to this day.' },
    { n: 2, title: 'Underground methods modernise', body: 'Mt Isa pioneers sub-level caving in 1971; Northparkes brings panel block caving in 1993; Cadia East opens the modern block-cave era in 2010. Sub-level open stoping remains the gold UG workhorse.' },
    { n: 3, title: 'Cost dynamics', body: 'Mechanisation collapsed OC unit costs by the 1970s. The 2003-2011 China boom inflated all costs ~50%; autonomous haulage and post-crash discipline pulled them back. Recent inflation (diesel, labour, ESG, depth) has them rising again.' },
    { n: 4, title: 'Commodity composition', body: 'Gold dominated 1950s revenue; iron ore overtook everything by 2003 and now alone produces more revenue than all other Australian metal mining combined. Lithium became material from 2017.' },
    { n: 5, title: 'Regional production', body: 'South Africa\'s gold dominance (75% in 1970) collapsed; Asia-Pacific now leads. South America\'s copper share rose to 42% by 2010 then plateaued as African output (DRC, Zambia) accelerated.' },
  ],
};

const marketsOverview = {
  title: 'Seventy-five years of metal market cycles',
  intro: 'Two big stories run through the markets data: gold\'s three bull markets driven by monetary regime shifts, and a multi-decade decline in tier-1 mineral discoveries despite ever-rising exploration spend. Five charts cover gold and copper price cycles, major discoveries by continent, and a multi-commodity index.',
  items: [
    { n: 1, title: "Gold's three bull markets", body: 'Post-Bretton-Woods (1971-1980, +6×), China-led (2001-2011, +5×), and the current run (2015-present, +2.5× and counting in real terms). Different driver each time: monetary breakdown, industrial demand, then rate-cut and central-bank-buying dynamics.' },
    { n: 2, title: "Copper's long bear and supercycle", body: 'From 1974 to 1999, real copper went from US$5/lb to US$1/lb. The China supercycle restored 5× pricing; the energy-transition premium since 2016 has structurally re-rated copper higher.' },
    { n: 3, title: 'Discovery decline', body: 'For both gold and copper, tier-1 discoveries peaked in the 1990s and have halved since. Despite record exploration spend in the 2010s, finds keep getting smaller, deeper, more remote. The 2020s on track to be weakest on record for both metals.' },
    { n: 4, title: 'The China supercycle (2003-2011)', body: 'Iron ore +6×, copper +4×, gold +5×. Each metal has a different post-2011 path: iron ore boom-bust, copper structural re-rate, gold three-phase bull.' },
    { n: 5, title: 'Lithium mania (2018-2024)', body: 'Spodumene rose 12× in four years on the EV thesis, then corrected 70%. Classic boom-bust shape, with a structurally higher floor than 2000.' },
  ],
};

const companiesOverview = {
  title: 'Seventy-five years of mining companies and M&A',
  intro: 'Three views on company-level dynamics: major mining M&A activity since 1995, the senior gold producers (Newmont, Barrick, Agnico, AngloGold, Kinross), and the mid-tier basket. The pattern: consolidation accelerates near price peaks; mid-tier rises during corrections.',
  items: [
    { n: 1, title: 'M&A waves', body: '2001 BHP-Billiton creates the first true diversified major. 2007 peak (Rio-Alcan US$38B) ends in GFC. Glencore-Xstrata 2013 marks late-cycle consolidation. 2019 brings the gold senior wave (Newmont-Goldcorp, Barrick-Randgold). 2023 Newmont-Newcrest is the biggest gold deal ever; 2024 BHP-Anglo bid signals copper scarcity premium.' },
    { n: 2, title: 'Senior gold consolidation', body: 'Newmont-Normandy (2002) and Barrick-Placer Dome (2006) created the modern top-2. After the 2015 trough, Newmont-Goldcorp and Newmont-Newcrest cemented #1; Agnico-Kirkland Lake created a true challenger; Agnico now rivals Newmont by market cap at gold ATH.' },
    { n: 3, title: 'Mid-tier emergence', body: 'Northern Star (2010 founding) and Evolution (2011 founding) grew from nothing to multi-billion-dollar producers via systematic acquisition. The 2025 gold breakout has lifted the entire mid-tier — percentage gains exceed the seniors.' },
  ],
};

const futureTrends5yr = {
  title: '5-year trends · 2026-2030',
  subtitle: 'Near-term forecast — high confidence; signals already present in leading indicators',
  unit: 'trends ranked by impact × likelihood score',
  intro: 'Five-year horizon trends are largely playing out already. Energy transition demand, gold structural bull, M&A wave, and lithium recovery dominate. Most of these are baked in by current capital allocation and inventory dynamics; the question is magnitude not direction.',
  items: [
    { n: 1, title: 'Gold stays elevated', impact: 3, likelihood: 3,
      body: 'Central bank buying continues at >1,000t/yr; fiat debasement narrative strengthens. Gold above US$3,500/oz real for most of period; A$ gold at ATH most years given AUD weakness.' },
    { n: 2, title: 'Copper supply gap widens', impact: 3, likelihood: 3,
      body: 'Codelco production declines, Escondida grade drops, no major new mines come online before 2028. LME inventories below 2-week consumption most of period; price stays structurally elevated.' },
    { n: 3, title: 'Gold M&A wave continues', impact: 3, likelihood: 3,
      body: 'Another senior-on-senior or senior-on-large-mid-tier deal likely. Newmont, Agnico, Barrick all could be acquirer or target. Gold M&A deal value above pre-2020 levels every year of period.' },
    { n: 4, title: 'Critical minerals govt finance expands', impact: 3, likelihood: 2,
      body: 'US/EU/AU government-backed offtake and finance becomes standard for tier-1 critical minerals projects. DPA, Critical Minerals Facility, EU CRMA all scale. Several Australian Li, REE, Ni projects benefit.' },
    { n: 5, title: 'Lithium price recovers', impact: 2, likelihood: 3,
      body: 'Backlog clears 2026-27 and EV penetration grows; spodumene returns to A$2,000-2,500/t real range. Several Australian Li miners survive the reset; consolidation among smaller players.' },
    { n: 6, title: 'Diesel structurally higher', impact: 2, likelihood: 3,
      body: 'Diesel stays above A$1.80/L through period; this alone adds ~5-10% to OC AISC vs 2019 baseline. Hybrid haulage trials accelerate but no large-scale deployment yet.' },
    { n: 7, title: 'Resource nationalism escalates', impact: 2, likelihood: 3,
      body: 'DRC, Indonesia, Mexico, possibly Mongolia tighten terms. At least one major asset shutdown like Cobre Panamá. Australian state royalty reviews continue.' },
    { n: 8, title: 'Aussie mid-tier mega-deal', impact: 2, likelihood: 3,
      body: 'Northern Star, Evolution, or another mid-tier makes a US$5B+ acquisition. Mid-tier consolidation accelerates as gold price holds; possibly an offshore Australian acquisition.' },
    { n: 9, title: 'Iron ore volume softens', impact: 2, likelihood: 2,
      body: 'Chinese steel demand declines modestly; Pilbara volumes flat-to-down 5-10%. Price holds on Simandou delays. AU Fe revenue remains the largest single contributor through 2030.' },
    { n: 10, title: 'AI exploration: first tier-1 find', impact: 2, likelihood: 2,
      body: 'A KoBold, Earth AI, or similar program delivers a >2 Moz Au or >3 Mt Cu discovery from ML-targeted greenfield drilling. Validates the technology even if economic discovery rate stays low.' },
    { n: 11, title: 'Major LATAM nationalisation', impact: 3, likelihood: 1,
      body: 'Significant asset (>US$5B) nationalised or contract reopened in Mexico, Argentina, or Peru. Triggers global re-rating of jurisdictional risk premiums and capital flight to safer jurisdictions.' },
  ],
};

const futureTrends15yr = {
  title: '15-year trends · 2026-2040',
  subtitle: 'Medium-term structural shifts — discovery cliff meets energy transition demand',
  unit: 'trends ranked by impact × likelihood score',
  intro: 'Fifteen-year horizon is where the structural problems compound. Discovery cliff, grade decline, and reserve depletion collide with sustained energy-transition demand. Unit costs rise in real terms across most metals despite automation; geographic concentration intensifies.',
  items: [
    { n: 1, title: 'Cu demand outpaces supply by 30%+', impact: 3, likelihood: 3,
      body: 'IEA, BloombergNEF, and S&P all forecast 2035-40 Cu demand of 45-55Mt vs supply 30-35Mt. Sustained price premium; recycling intensity rises but cannot close the gap. Cu is the dominant story of the next 15 years.' },
    { n: 2, title: 'Grade decline drives unit cost up 30-50%', impact: 3, likelihood: 3,
      body: 'Cu grade reaches 0.4%; Au OC grade 0.7g/t. Real-cost increase of 30-50% across both metals despite scale, automation, and AI ore-sorting offsets. Industry-wide AISC roughly doubles by 2040.' },
    { n: 3, title: 'Sector-wide reserve writedowns', impact: 3, likelihood: 3,
      body: 'Discovery cliff means top-10 producers must accept lower-grade reserves to maintain reserve life or accept declining output. Several major producers shrink; widespread reserve recuts at lower price decks.' },
    { n: 4, title: 'Gold reaches new real-price peak', impact: 3, likelihood: 2,
      body: 'Gold/M2 ratio approaches 1980 levels; A$ gold price compounds further given AUD weakness. Real US$ gold peaks above US$5,000/oz at some point during the period; sustained levels above current ATH.' },
    { n: 5, title: 'Indonesia + Chile dominate base metals', impact: 2, likelihood: 3,
      body: 'Chile, Peru, DRC, Indonesia together produce 70%+ of global Cu and Ni. Geographic concentration reaches Co-like levels for several metals. Drives further "ally-aligned" pricing differentiation.' },
    { n: 6, title: 'ESG/closure structural cost', impact: 2, likelihood: 3,
      body: 'Tailings, water, scope-1 carbon, Indigenous, biodiversity together add 10-15% to real opex permanently. Premium pricing for compliance materialises. Australian producers advantaged.' },
    { n: 7, title: 'Block caving becomes default UG', impact: 2, likelihood: 3,
      body: 'New large-scale UG metal mines almost all block caves by 2040. Capital-intensive but required to compete on cost as easier ore depletes. Cadia PC2-3 template gets replicated globally.' },
    { n: 8, title: 'Autonomous fleets standard', impact: 2, likelihood: 3,
      body: 'Every major OC operation runs autonomous haulage by 2035; partial UG automation common. Productivity uplift offsets ~30% of grade-decline cost pressure. Australian leadership in this technology.' },
    { n: 9, title: 'Iron ore plateau confirmed', impact: 2, likelihood: 3,
      body: 'Chinese steel demand peaks; India + SE Asia partially offset. Pilbara remains lowest-cost producer; Simandou ramps mid-decade. AU Fe revenue flat-to-slightly-down through 2040, not crashing.' },
    { n: 10, title: 'EV+grid build hits supercycle scale', impact: 3, likelihood: 2,
      body: 'Cu, Ni, Li, Co demand grows at China-supercycle pace through 2035. Some metals see 3-4× demand growth. Coincides with discovery cliff to create the most acute supply tightness in 50+ years.' },
    { n: 11, title: 'REE supply diversifies', impact: 3, likelihood: 1,
      body: 'China share of REE supply drops below 50% as US, Australian, Vietnamese projects reach commercial scale. Significant geopolitical event likely required as catalyst — partial decoupling rather than full.' },
  ],
};

const futureTrends25yr = {
  title: '25-year trends · 2026-2050',
  subtitle: 'Long-term transformations — scale of change rivals the 2000s China supercycle',
  unit: 'trends ranked by impact × likelihood score',
  intro: 'Twenty-five-year horizon mixes inevitable trends (decarbonisation, demographic shifts, iron ore peak) with speculative ones (asteroid mining, deep-sea mining). Several of these will be the defining stories of the second half of the century, but timing is highly uncertain. Lower likelihood does not mean lower importance.',
  items: [
    { n: 1, title: 'Iron ore demand peaks then declines', impact: 3, likelihood: 3,
      body: 'Chinese steel intensity peak combined with circular economy reduces global Fe demand by 15-25% from 2030 peak. Australian iron ore revenue declines structurally; Pilbara lowest-cost producers survive but margins compress.' },
    { n: 2, title: 'Mining decarbonisation completed', impact: 3, likelihood: 3,
      body: 'Net-zero scope 1+2 across major mining operations; hydrogen haulage, electric loaders, renewable power fully deployed. Cost of decarbonisation embedded in commodity prices; "green premium" becomes default pricing.' },
    { n: 3, title: 'Demographic shift forces full automation', impact: 3, likelihood: 3,
      body: 'Aging Australian/global mining workforce + low recruitment forces full automation. Onsite headcount per Mt produced drops 60-70% from 2020 levels. FIFO model fundamentally restructured.' },
    { n: 4, title: 'Battery tech reshapes Li/Ni demand', impact: 3, likelihood: 2,
      body: 'Solid-state, sodium-ion, or other tech reshapes the bill of materials. Possible scenarios: less Li (sodium scales), less Ni (LFP wins), or more of both (demand growth dominates). High dispersion of outcomes.' },
    { n: 5, title: 'Recycling meets 50%+ of demand', impact: 3, likelihood: 2,
      body: 'Cu recycling reaches 50% of global supply; Au and Pt-group from urban mining. Reduces but does not eliminate primary mining requirement; recycling grades exceed virgin ore by 2-3× for most metals.' },
    { n: 6, title: 'AI exploration matches old greenfield era', impact: 3, likelihood: 2,
      body: 'ML-targeted exploration delivers tier-1 finds at rates approaching the 1990s peak by mid-century. Restocks reserves; partial offset to discovery cliff. Likely concentrated in underexplored Africa and Asia.' },
    { n: 7, title: 'Resource scarcity geopolitical conflicts', impact: 3, likelihood: 2,
      body: 'Significant geopolitical event(s) over critical mineral supply — embargoes, sanctions, possibly military involvement around chokepoints. Drives "ally-aligned" pricing further; reshapes globalised supply chains.' },
    { n: 8, title: 'Geographic centre shifts south', impact: 2, likelihood: 3,
      body: 'Africa supplies 25%+ of global Cu, Co, Au by 2050. South America consolidates Cu/Li dominance. Northern hemisphere mining becomes specialty/critical-only; broad-base mining moves to Global South.' },
    { n: 9, title: 'Hydrogen replaces diesel', impact: 2, likelihood: 2,
      body: 'H2 fuel cells or H2 ICE replace diesel for >50% of mining haulage. Eliminates ~15% of OC unit cost (replaces it with H2 cost which trends down). Australian renewable H2 industry scales as anchor offtake.' },
    { n: 10, title: 'Asteroid mining commercial', impact: 3, likelihood: 1,
      body: 'At least one near-Earth asteroid commercially mined for Pt-group, possibly Au. Niche supply (<5% of any metal) but proves concept; reshapes long-term scarcity narrative for high-value metals only.' },
    { n: 11, title: 'Deep-sea mining commercial scale', impact: 2, likelihood: 1,
      body: 'Polymetallic nodules from Clarion-Clipperton Zone commercially mined for Cu, Ni, Co, Mn. Significant environmental backlash; produces 5-10% of global supply at most by 2050; primarily Asian operators.' },
  ],
};

// ===== Strategy data =====

const successData = {
  title: '2050 Picture of Success',
  subtitle: 'Vision for the Australian metal mining industry by 2050',
  vision: "By 2050, the Australian metal mining industry is the most cost-competitive, decarbonised, and socially-licensed metal mining sector in the world — supplying critical minerals at scale to allied economies, operating with a diverse and largely automated workforce, and generating sustainable returns through full commodity cycles.",
  pillars: [
    {
      n: 1,
      title: 'Decarbonised operations',
      baseline: '~10% of operations net-zero scope 1+2; renewable PPA adoption underway',
      target: '100% net-zero scope 1+2 across operating mines; hydrogen + electric haulage standard',
      lenses: {
        industry: 'Cost-competitive with grid + diesel via low-cost renewables; carbon-priced operations resilient through cycles.',
        government: 'AU mining contributes proportionally to net-zero commitments; export emissions accounted credibly.',
        communities: 'No air or water emissions impact on local environments; quality-of-life uplift in mining regions.',
        investors: 'ESG-compliant; future-proofed against carbon pricing and import border adjustments globally.',
      },
      confidence: 'High',
    },
    {
      n: 2,
      title: 'Critical minerals leadership',
      baseline: 'AU 1st in Li (~30% global), 4th in REE (~6%), 5th in Ni; tier-2 in Cu',
      target: 'AU supplies 50%+ of allied-aligned demand for Li, REE, Ni, Co; major Cu position established',
      lenses: {
        industry: 'Premium pricing for ally-aligned supply; portfolio diversification across critical minerals.',
        government: 'Geopolitical leverage; defence and energy supply security; AUKUS supply chain anchor.',
        communities: 'Long-term economic anchor in regional Australia; multi-decade asset bases.',
        investors: 'Strategic asset valuations; M&A premiums for AU critical minerals juniors.',
      },
      confidence: 'High',
    },
    {
      n: 3,
      title: 'Global cost competitiveness',
      baseline: 'AU iron ore top quartile; gold mid-pack; lithium sliding on grade decline',
      target: 'Top-quartile AISC across all major commodities despite global grade decline',
      lenses: {
        industry: 'Productivity, automation, AI offset grade decline; sustainable margin profile through cycles.',
        government: 'Tax and royalty base sustainability; comparative advantage maintained against global competitors.',
        communities: 'Mine longevity; stable regional employment through commodity cycles.',
        investors: 'Margin protection; through-cycle returns predictable; lower equity risk.',
      },
      confidence: 'Medium',
    },
    {
      n: 4,
      title: 'Strong social licence',
      baseline: 'Multiple Juukan-class incidents per decade; Indigenous engagement variable across operators',
      target: 'Zero unacceptable cultural or environmental incidents; Indigenous co-management standard at all major operations',
      lenses: {
        industry: 'Predictable approvals; lower regulatory friction; faster project timelines.',
        government: 'Legitimacy of resources policy preserved; royalty regime stable; less political risk.',
        communities: 'Self-determination, meaningful benefit-sharing, veto rights on cultural sites.',
        investors: 'Reputation risk eliminated; predictable cost of capital; lower operating risk premium.',
      },
      confidence: 'Medium',
    },
    {
      n: 5,
      title: 'Diversified workforce',
      baseline: '~17% female; aging demographic; FIFO-heavy; ~3% Indigenous representation',
      target: '35%+ female; multi-generational; ~10% Indigenous; appropriate automation across sites',
      lenses: {
        industry: 'Larger talent pool; better retention; reduced FIFO costs; broader skills base.',
        government: 'Inclusive economy; regional and Indigenous employment outcomes; lower welfare burden.',
        communities: 'Locally accessible jobs; transition from FIFO to residential where viable.',
        investors: 'Lower people-risk; better governance signals; resilient operations.',
      },
      confidence: 'Medium',
    },
    {
      n: 6,
      title: 'Innovation and productivity',
      baseline: 'AU leads global autonomous haulage; AI exploration in early commercial phase',
      target: 'Autonomous wherever appropriate; AI-discovered tier-1 deposits in production; 30%+ productivity uplift vs 2025',
      lenses: {
        industry: 'Cost competitiveness via productivity offsetting grade decline; tech-driven moat.',
        government: 'Mining-tech sector spillovers; skilled workforce investment payoff; export of services.',
        communities: 'Higher-value, safer onsite roles; reduced FIFO commute footprint over time.',
        investors: 'Sustained margins despite cost pressures; productivity-led re-rating of AU producers.',
      },
      confidence: 'High',
    },
    {
      n: 7,
      title: 'Resilient capital structure',
      baseline: 'Industry survived 2014-15 with significant pain; balance sheets stronger today than 2010s',
      target: 'Sector-wide balance sheets that comfortably survive a 50% commodity drawdown without distressed asset sales',
      lenses: {
        industry: 'Strategic flexibility through cycles; M&A from position of strength.',
        government: 'Stable royalty stream; fewer bankruptcies and welfare obligations through downturns.',
        communities: 'Employment continuity through downturns; investment in mine closure obligations honoured.',
        investors: 'Through-cycle returns; lower equity risk premium; reliable dividend profile.',
      },
      confidence: 'High',
    },
    {
      n: 8,
      title: 'Sustained mineral supply',
      baseline: 'AU produces ~1/3 of world Li, ~10% of Au, ~5% of Cu and Ni',
      target: 'AU is a top-3 global producer of every battery and energy-transition metal it currently produces',
      lenses: {
        industry: 'Position of strength in negotiations with allied buyers; pricing power.',
        government: 'Strategic supply security for AUKUS partners; tariff-shielded markets; export earnings stable.',
        communities: 'Multi-decade visibility on regional employment; stable economic base.',
        investors: 'Portfolio diversification across the energy-transition basket; resilient earnings.',
      },
      confidence: 'Medium-High',
    },
  ],
};

const issuesData = {
  title: 'FY27-FY30 Issues to Address',
  subtitle: 'Severity × Urgency — issues facing the Australian metal mining industry through FY30',
  unit: '10 issues · ranked by severity × urgency score · metal-lens reweighted',
  intro: "These are the dominant issues for the next three to four financial years. Severity reflects how much each issue could damage industry health if unaddressed; urgency reflects how soon action is required. Toggle the metal lens to reweight scores and reframe each issue for gold-producer or copper-producer perspectives. Score 9 issues need executive-team focus this year.",
  yKey: 'severity',
  xKey: 'urgency',
  yLabel: 'Severity',
  xLabel: 'Urgency',
  items: [
    {
      n: 1,
      title: 'Cost inflation outpacing revenue (base metals)',
      scores: { all: [3, 3], gold: [2, 3], copper: [3, 3] },
      stakes: {
        all: "Real AISC up 30%+ since 2020; gold price masks margin compression in Cu, Ni, Li. Mid-tier and small producers most exposed.",
        gold: "Au price strength gives some cushion but real AISC up 30%+; productivity now critical to maintain mid-tier margins through the cycle.",
        copper: "Acute — Cu margins compressed despite strong price; grade decline + diesel + ESG all compounding. Pure-Cu producers most squeezed.",
      },
      actions: {
        industry: 'Coordinate on shared infrastructure, supplier consolidation, productivity benchmarking',
        government: 'R&D tax incentives; critical infrastructure investment; energy price stability',
        company: 'Aggressive cost programs, portfolio high-grading, hedging, scale through M&A',
      },
      owner: 'Company',
    },
    {
      n: 2,
      title: 'Permitting timelines lengthening',
      scores: { all: [3, 3], gold: [3, 3], copper: [3, 3] },
      stakes: {
        all: "Discovery-to-production now 18+ years globally and rising. Each year delayed = year of supply not coming. Multiple AU projects stuck in approval backlogs.",
        gold: "Affects gold equally; smaller mines often face same approval lag as majors despite simpler footprint. Critical for project pipeline.",
        copper: "Critical — Cu projects 5-15+ year permit cycles; supply response can't keep up with demand growth. Largest single supply-side constraint.",
      },
      actions: {
        industry: 'Streamline EIS submissions; pre-empt community engagement; build a learnings repository',
        government: 'Faster federal approvals; one-stop-shop processes; conditional approvals with milestones',
        company: 'Robust EIS at first submission; proactive community engagement; portfolio of permitted projects',
      },
      owner: 'Government',
    },
    {
      n: 3,
      title: 'Social licence and Indigenous heritage',
      scores: { all: [3, 3], gold: [3, 3], copper: [3, 3] },
      stakes: {
        all: "Juukan-class incidents are reputationally near-existential. Cultural heritage protection laws strengthening; sector lacks consistent co-management framework.",
        gold: "Gold mines often near culturally sensitive areas (WA, NT, QLD); Indigenous co-management essential for project access and approval speed.",
        copper: "Large footprint Cu mines (tailings, water, scale) attract scrutiny; community licence is often the project chokepoint.",
      },
      actions: {
        industry: 'Sector-wide Indigenous engagement standards; cultural heritage best-practice repository',
        government: 'Modern cultural heritage legislation; ILUA reform; clear consultation requirements',
        company: 'Indigenous co-management agreements at all major operations; veto rights on cultural sites',
      },
      owner: 'Company',
    },
    {
      n: 4,
      title: 'Decarbonisation capex burden',
      scores: { all: [3, 3], gold: [2, 2], copper: [3, 3] },
      stakes: {
        all: "Net-zero scope 1+2 by 2050 requires US$10-20B+ industry capex through FY30. Hydrogen, electric haulage, renewable power infrastructure all needed simultaneously.",
        gold: "Lower scope-1 intensity than base metals; PPA-led path practical at most gold operations. Less acute capex burden vs Cu.",
        copper: "High energy intensity (smelting, hydromet where applicable); capex burden material relative to revenue base, especially mid-tier.",
      },
      actions: {
        industry: 'Pre-competitive technology development; shared renewable infrastructure builds',
        government: 'Tax incentives for early decarbonisation capex; CEFC, ARENA, NAIF scaling',
        company: 'Phased decarbonisation plans tied to asset replacement cycles; PPA portfolio',
      },
      owner: 'Industry',
    },
    {
      n: 5,
      title: 'Workforce constraints',
      scores: { all: [2, 3], gold: [2, 3], copper: [2, 3] },
      stakes: {
        all: "Aging mining workforce; FIFO costs spiraling; skills shortages delaying projects. Critical minerals and decarbonisation roles particularly under-supplied.",
        gold: "Same constraint; smaller gold operations often hit harder by FIFO and skills shortage proportional to revenue base.",
        copper: "Same constraint; Cu operations need more technical (smelter, hydromet) skills which are particularly scarce.",
      },
      actions: {
        industry: 'Coordinated training programs; female participation initiatives; school outreach',
        government: 'Skilled migration; vocational training subsidies; regional housing investment',
        company: 'Automation where possible; residential mining; flexible work; Indigenous training programs',
      },
      owner: 'Industry',
    },
    {
      n: 6,
      title: 'Discovery cliff',
      scores: { all: [3, 2], gold: [3, 2], copper: [3, 3] },
      stakes: {
        all: "Tier-1 finds halved each decade since 1990s. Reserves shrinking at top-10 producers; growth-by-acquisition pressure intensifying year by year.",
        gold: "Tier-1 Au finds halved every decade since 1990s; brownfield extension only partial fix. AI exploration may help if validated.",
        copper: "Acute and urgent — Cu discovery cliff is the most pressing in the sector; supply gap widening forces M&A or acceptance of lower-grade reserves.",
      },
      actions: {
        industry: 'AI exploration consortia; data sharing for ML training; greenfield drilling programs',
        government: 'Geoscience funding; open-access geological datasets; greenfield exploration tax incentives',
        company: 'Allocate to AI exploration; brownfield extension priority; selective acquisition',
      },
      owner: 'Company',
    },
    {
      n: 7,
      title: 'Infrastructure gaps (rail, port, water, grid)',
      scores: { all: [3, 2], gold: [2, 2], copper: [3, 2] },
      stakes: {
        all: "Pilbara rail at capacity for new entrants; water rights contested; grid power for inland operations limited. Constrains multiple new project starts.",
        gold: "Lower exposure — most gold operations need power and water but not rail or port at scale; smaller capex footprint.",
        copper: "High exposure — Cu mines need rail to ports for concentrate; bottleneck for new entrants in Mt Isa belt and Curnamona.",
      },
      actions: {
        industry: 'Multi-user infrastructure agreements; coordinated investment vehicles',
        government: 'NAIF scaling; common-user infrastructure mandates; transmission build-out',
        company: 'Investment in shared assets; long-term water and power agreements',
      },
      owner: 'Government',
    },
    {
      n: 8,
      title: 'Resource nationalism in supplier countries',
      scores: { all: [2, 2], gold: [1, 1], copper: [3, 2] },
      stakes: {
        all: "AU Cu, Co, Ni, Li supply chains exposed to DRC, Indonesia, Chile, Peru policy shifts. Cobre Panamá-type events possible at any time.",
        gold: "Low exposure — gold processed locally and sold as bullion globally; minimal concentrate trade or refining dependency.",
        copper: "High exposure — Cu concentrate often refined in China; tariff and policy risk material for AU concentrate exports.",
      },
      actions: {
        industry: 'Diversified sourcing; political risk insurance pools',
        government: 'Bilateral trade and investment treaties; AUKUS critical minerals framework',
        company: 'Geographic diversification; long-term offtake; political risk mitigation',
      },
      owner: 'Company',
    },
    {
      n: 9,
      title: 'M&A premium pressure',
      scores: { all: [2, 2], gold: [3, 3], copper: [2, 2] },
      stakes: {
        all: "Discovery cliff means fewer high-quality targets; deal premiums rising. Risk of overpaying at cycle peaks.",
        gold: "Hot — Au M&A premiums at record highs (cf. Newmont-Newcrest at gold ATH); risk of overpaying at peak; capital discipline critical.",
        copper: "Rising — Cu mid-tier consolidation expected; premiums tracking up but less heated than Au M&A market.",
      },
      actions: {
        industry: 'Realistic discovery economics; strategic patience',
        government: 'Encourage greenfield exploration through fiscal incentives',
        company: 'Disciplined M&A criteria; preserve cash for cyclical opportunities',
      },
      owner: 'Company',
    },
    {
      n: 10,
      title: 'Lithium-cycle volatility',
      scores: { all: [2, 2], gold: [1, 1], copper: [1, 1] },
      stakes: {
        all: "Spodumene 12× spike then 70% reset in 4 years; multiple AU operators unprofitable through trough. Capital allocation and reserve cuts difficult.",
        gold: "Not directly relevant for gold producers; informational only — but indicative of cycle-management challenges in critical metals.",
        copper: "Not directly relevant for copper producers; informational only — Cu cycles different in shape and depth from Li.",
      },
      actions: {
        industry: 'Through-cycle margin focus; smaller exposure to spot market',
        government: 'Strategic stockpile concept; long-term offtake support',
        company: 'Long-term contracts; conservative reserve cuts; cost discipline through trough',
      },
      owner: 'Company',
    },
  ],
};

const opportunitiesData = {
  title: 'FY27-FY30 Opportunities to Capture',
  subtitle: 'Impact × Feasibility — opportunities for Australian mining industry through FY30',
  unit: '10 opportunities · ranked by impact × feasibility score · metal-lens reweighted',
  intro: "Opportunities the industry can realistically capture in the FY27-30 window. Impact reflects upside scale; feasibility reflects how achievable the opportunity is given current capabilities, capital, and policy environment. Toggle the metal lens to reweight scores for gold-producer or copper-producer perspectives. Score 9 opportunities are the strategic priorities for the period.",
  yKey: 'impact',
  xKey: 'feasibility',
  yLabel: 'Impact',
  xLabel: 'Feasibility',
  items: [
    {
      n: 1,
      title: 'Sustained gold price → reserve life extensions',
      scores: { all: [3, 3], gold: [3, 3], copper: [1, 1] },
      stakes: {
        all: "Au at A$5,000+/oz makes lower-grade ore economic. Existing pits and UG operations can extend life 5-10 years through reserve recuts.",
        gold: "Direct opportunity — every Au operation should be running reserve recuts at higher cut-off prices now; mill capacity expansions accretive.",
        copper: "Not relevant for pure copper producers; price tailwind specific to gold cycle. Au-Cu byproduct producers see partial benefit.",
      },
      actions: {
        industry: 'Standardise reserve recut methodologies; share learnings on cut-off grade optimisation',
        government: 'Streamlined approval for life-of-mine extensions',
        company: 'Aggressive reserve recuts; near-mine exploration; mill capacity expansions',
      },
      owner: 'Company',
    },
    {
      n: 2,
      title: 'Critical minerals govt-backed finance',
      scores: { all: [3, 3], gold: [1, 2], copper: [2, 3] },
      stakes: {
        all: "US$10B+ in offtake and finance available from US (DPA), AU (Critical Minerals Facility), EU (CRMA). Window may be widest in FY27-29.",
        gold: "Limited direct benefit — gold not on critical minerals lists. Indirect access for Au-Cu byproduct projects via Cu credits.",
        copper: "Cu sometimes on critical lists (US, EU); strategic finance available for pure-Cu projects with allied-aligned offtake commitments.",
      },
      actions: {
        industry: 'Coordinate on standards (provenance, ESG); position AU as preferred allied supplier',
        government: 'Maintain Critical Minerals Facility scale; bilateral offtake agreements',
        company: 'Pursue grant funding; lock in long-term offtake; build refining capacity onshore',
      },
      owner: 'Industry',
    },
    {
      n: 3,
      title: 'Autonomous operations productivity uplift',
      scores: { all: [3, 3], gold: [3, 3], copper: [3, 3] },
      stakes: {
        all: "Mature autonomous haulage tech enables 15-25% productivity uplift; partial UG automation rolling out. Strong AU competitive position to defend.",
        gold: "Applies fully — Au OC operations well-suited to autonomous haulage; UG automation pilots scaling at major Au sites.",
        copper: "Applies fully — Cu UG operations particularly benefit from automation given depth, scale, and capex per tonne.",
      },
      actions: {
        industry: 'Standards for autonomous operations; cybersecurity collaboration',
        government: 'Mining-tech R&D tax incentives; skilled visa programs for autonomous engineers',
        company: 'Full rollout across OC operations; UG automation pilots at multiple sites',
      },
      owner: 'Company',
    },
    {
      n: 4,
      title: 'AI exploration early-mover advantage',
      scores: { all: [3, 2], gold: [3, 2], copper: [3, 3] },
      stakes: {
        all: "KoBold-style AI targeting promising but unproven at tier-1 scale. Early movers will capture best ground; FY27-30 is the validation window.",
        gold: "Au exploration well-suited to ML targeting; multiple AU programs already running. Validates 2027-30; act now to claim ground.",
        copper: "Highest urgency — Cu discovery cliff makes early-mover AI advantage most valuable; first tier-1 AI find likely to be Cu.",
      },
      actions: {
        industry: 'Pre-competitive ML datasets; data sharing initiatives',
        government: 'Open geological data; greenfield exploration incentives',
        company: 'Strategic AI exploration partnerships or in-house programs; ground-position acquisition',
      },
      owner: 'Company',
    },
    {
      n: 5,
      title: 'Multi-user infrastructure',
      scores: { all: [3, 2], gold: [2, 2], copper: [3, 2] },
      stakes: {
        all: "Pilbara rail and port shared access; new transmission corridors; shared water rights — reduces capex per project and unlocks marginal deposits.",
        gold: "Lower relevance — gold mines smaller footprint, less infrastructure-dependent for product transport.",
        copper: "Major opportunity — shared rail and port unlocks marginal Cu projects in Mt Isa belt and Curnamona; common-user mandate critical.",
      },
      actions: {
        industry: 'Multi-user agreements; coordinated infrastructure investment vehicles',
        government: 'NAIF scaling; common-user infrastructure mandates; transmission planning',
        company: 'Shared infrastructure deals; equity in common-user assets',
      },
      owner: 'Government',
    },
    {
      n: 6,
      title: 'Brownfield extensions of tier-1 assets',
      scores: { all: [2, 3], gold: [3, 3], copper: [2, 3] },
      stakes: {
        all: "Cheap ounces and tonnes from extending existing operations vs greenfield discovery. Multiple AU mines have substantial near-mine resource potential.",
        gold: "Highest impact — every Au operation should be exploring near-mine resources at current prices; cut-off grade reductions unlock significant ounces.",
        copper: "Standard opportunity — Cu brownfield extensions valuable but greenfield still important given supply gap; multi-pronged approach needed.",
      },
      actions: {
        industry: 'Best-practice exploration around existing mines',
        government: 'Streamlined approvals for adjacent extensions',
        company: 'Reallocate exploration spend to brownfield; extend mine life systematically',
      },
      owner: 'Company',
    },
    {
      n: 7,
      title: 'Mid-tier M&A consolidation',
      scores: { all: [2, 3], gold: [3, 3], copper: [2, 2] },
      stakes: {
        all: "Mid-tier still fragmented vs senior tier; consolidation creates synergies. Northern Star, Evolution, Pan American as natural consolidators.",
        gold: "Hot — multiple Au mid-tiers as natural consolidators; positions of strength at sustained gold prices; window through FY30.",
        copper: "Less active — fewer Cu mid-tiers; majors absorbing rather than mid-tier consolidating; smaller opportunity set.",
      },
      actions: {
        industry: 'Realistic discovery economics; orderly consolidation',
        government: 'Maintain neutral M&A framework; FIRB process predictability',
        company: 'Disciplined M&A criteria; identify natural consolidation targets',
      },
      owner: 'Company',
    },
    {
      n: 8,
      title: 'Indigenous partnership models as moat',
      scores: { all: [2, 3], gold: [3, 3], copper: [2, 3] },
      stakes: {
        all: "Best-practice Indigenous co-management becomes a competitive advantage — better access to ground, faster approvals, lower regulatory risk.",
        gold: "Major opportunity — many Au operations on Indigenous land in WA, NT, SA; co-management = competitive advantage on access and approvals.",
        copper: "Same opportunity — Cu projects often on Indigenous land; sector-wide moat available to early movers.",
      },
      actions: {
        industry: 'Sector-wide standards; learnings repository',
        government: 'Native title reform; benefit-sharing frameworks',
        company: 'Co-management agreements; equity participation; meaningful benefit-sharing',
      },
      owner: 'Company',
    },
    {
      n: 9,
      title: 'Ally-aligned premium pricing',
      scores: { all: [2, 2], gold: [1, 1], copper: [2, 2] },
      stakes: {
        all: "Western buyers paying a premium for non-Chinese and non-Russian metal. Could add 5-15% to AU lithium, REE, nickel pricing if formalised.",
        gold: "Not relevant — gold is fungible bullion; LBMA-good-delivery is the only relevant standard, no provenance premium possible.",
        copper: "Relevant — provenance certification could add premium; AU Cu well-positioned vs DRC, Russia, Indonesia.",
      },
      actions: {
        industry: 'Provenance standards; certification frameworks',
        government: 'AUKUS critical minerals framework; bilateral procurement preferences',
        company: 'Long-term contracts with allied buyers; provenance certification',
      },
      owner: 'Government',
    },
    {
      n: 10,
      title: 'Green premium pricing',
      scores: { all: [2, 2], gold: [1, 1], copper: [3, 2] },
      stakes: {
        all: "Low-carbon copper and iron commanding emerging premium. AU producers well-positioned given renewable adoption and ESG record.",
        gold: "Not relevant — gold is fungible bullion, no green premium pricing structure exists or likely to emerge.",
        copper: "Highly relevant — low-carbon Cu commanding emerging premium from EV makers; AU Cu well-positioned to capture.",
      },
      actions: {
        industry: 'Common standards for low-carbon certification',
        government: 'Border carbon adjustment alignment; export carbon accounting',
        company: 'Decarbonisation linked to product premium; green offtake contracts',
      },
      owner: 'Industry',
    },
  ],
};

// ===== Agnico Eagle case study data =====

const agnicoCaseData = [
  { year: 2000, agnico: 0.5,  newmont: 5,   barrick: 8,   evolution: null, gold: 280  },
  { year: 2001, agnico: 0.6,  newmont: 9,   barrick: 8.5, evolution: null, gold: 270  },
  { year: 2002, agnico: 0.8,  newmont: 12,  barrick: 9,   evolution: null, gold: 310  },
  { year: 2003, agnico: 1.2,  newmont: 16,  barrick: 11,  evolution: null, gold: 365  },
  { year: 2004, agnico: 1.6,  newmont: 20,  barrick: 12,  evolution: null, gold: 410  },
  { year: 2005, agnico: 2,    newmont: 24,  barrick: 15,  evolution: null, gold: 450  },
  { year: 2006, agnico: 3,    newmont: 23,  barrick: 25,  evolution: null, gold: 605  },
  { year: 2007, agnico: 4,    newmont: 22,  barrick: 35,  evolution: null, gold: 700  },
  { year: 2008, agnico: 5,    newmont: 22,  barrick: 32,  evolution: null, gold: 880  },
  { year: 2009, agnico: 8,    newmont: 30,  barrick: 40,  evolution: null, gold: 970  },
  { year: 2010, agnico: 10,   newmont: 32,  barrick: 52,  evolution: null, gold: 1400 },
  { year: 2011, agnico: 6,    newmont: 32,  barrick: 50,  evolution: 0.3,  gold: 1700 },
  { year: 2012, agnico: 8,    newmont: 25,  barrick: 35,  evolution: 0.4,  gold: 1660 },
  { year: 2013, agnico: 5,    newmont: 12,  barrick: 18,  evolution: 0.5,  gold: 1300 },
  { year: 2014, agnico: 7,    newmont: 10,  barrick: 13,  evolution: 0.6,  gold: 1200 },
  { year: 2015, agnico: 6,    newmont: 10,  barrick: 9,   evolution: 1,    gold: 1100 },
  { year: 2016, agnico: 10,   newmont: 18,  barrick: 20,  evolution: 1.8,  gold: 1250 },
  { year: 2017, agnico: 11,   newmont: 20,  barrick: 17,  evolution: 2.5,  gold: 1300 },
  { year: 2018, agnico: 9,    newmont: 18,  barrick: 15,  evolution: 3,    gold: 1280 },
  { year: 2019, agnico: 14,   newmont: 36,  barrick: 32,  evolution: 5,    gold: 1500 },
  { year: 2020, agnico: 19,   newmont: 50,  barrick: 47,  evolution: 8,    gold: 1900 },
  { year: 2021, agnico: 15,   newmont: 50,  barrick: 35,  evolution: 6,    gold: 1800 },
  { year: 2022, agnico: 22,   newmont: 36,  barrick: 30,  evolution: 5,    gold: 1800 },
  { year: 2023, agnico: 28,   newmont: 48,  barrick: 30,  evolution: 7,    gold: 2050 },
  { year: 2024, agnico: 42,   newmont: 50,  barrick: 32,  evolution: 10,   gold: 2700 },
  { year: 2025, agnico: 58,   newmont: 62,  barrick: 36,  evolution: 13,   gold: 3500 },
  { year: 2026, agnico: 78,   newmont: 65,  barrick: 42,  evolution: 16,   gold: 4565 },
];

const agnicoCallouts = [
  { year: 2008, n: 1, title: 'Pinos Altos opens (Mexico)',
    body: 'First international mine — established expansion playbook beyond Quebec.' },
  { year: 2014, n: 2, title: 'Canadian Malartic JV with Yamana',
    body: 'Acquired 50% from distressed Osisko Mining alongside Yamana — bought a tier-1 asset at a low point in the cycle.' },
  { year: 2017, n: 3, title: 'Nunavut platform online',
    body: 'Meliadine and Amaruq commissioning establishes second regional platform alongside Abitibi.' },
  { year: 2022, n: 4, title: 'Kirkland Lake merger + leadership transition',
    body: '~US$10B all-stock merger of equals closes Feb 8 — brings Detour Lake, Macassa, Fosterville. Reserves doubled overnight; production scale rivals Newmont and Barrick. Sean Boyd retires as CEO after 24 years (becomes Executive Chair); Ammar Al-Joundi takes over within months after a brief Tony Makuch tenure.' },
  { year: 2023, n: 5, title: '100% Canadian Malartic',
    body: 'Buys remaining 50% via Yamana split with Pan American (~US$4.8B JV deal). Consolidates Canada\'s largest gold mine; unlocks Odyssey project and Abitibi mill optimisation.' },
  { year: 2024, n: 6, title: 'Detour expansion + reserve growth',
    body: 'Detour Lake throughput expansion underway; ongoing exploration adds reserves at Detour, Hope Bay, Macassa.' },
  { year: 2026, n: 7, title: 'Market cap leadership',
    body: 'AEM market cap rivals or exceeds Newmont at gold ATH. Cleanest senior balance sheet; premium P/NAV multiple sustained through cycle.' },
];

const agnicoDrivers = [
  { name: 'M&A / portfolio transformation', value: 35 },
  { name: 'Operational consistency',        value: 25 },
  { name: 'Capital allocation discipline',  value: 15 },
  { name: 'Gold price tailwind',            value: 15 },
  { name: 'Platform integration',           value: 10 },
];

const agnicoWhySections = [
  {
    title: '1. Massive reserve and resource growth',
    bullets: [
      'Reserves grew from ~20 Moz in 2013 to ~50 Moz post-Kirkland and Yamana — a 2.5× increase in a decade where most majors saw reserves shrink.',
      'Detour Lake alone added ~20 Moz of reserves with a 25+ year mine life via the Kirkland Lake merger.',
      'Ongoing organic exploration at Macassa, Hope Bay, Detour, and Kittila continues to extend mine lives at modest cost per ounce.',
      'Reserve grade held above industry average despite the scale increase — counter to the sector-wide grade-decline trend.',
    ],
  },
  {
    title: '2. Best major-sector acquisitions of the cycle',
    bullets: [
      '2014 Canadian Malartic JV — bought from distressed Osisko alongside Yamana at a low point in the cycle.',
      '2022 Kirkland Lake merger — transformational; got Detour, Macassa, Fosterville for ~US$10B in stock at trough valuations relative to gold price.',
      '2023 Yamana split — finally got 100% of Canadian Malartic and unlocked Abitibi mill optimisation potential.',
      'Compare with Newmont-Newcrest (2023, ~US$19B at near-peak gold) — Agnico\'s deals were better-timed and at better multiples.',
    ],
  },
  {
    title: '3. Exceptional operational consistency',
    bullets: [
      'Hit production guidance in roughly 9 of the last 10 years — a record few peers can match.',
      'AISC maintained in the industry\'s lower half despite scale increase and grade decline.',
      'Best-in-class safety record; "boring" execution.',
      'Low-risk jurisdictions only: Canada, Finland, Mexico, Australia (post-Kirkland) — no DRC, no Mali, no Pascua-Lama, no Cobre Panamá.',
    ],
  },
  {
    title: '4. Market gradually recognised it as the "high-quality major"',
    bullets: [
      'Premium P/NAV multiple — now trades at 1.5-1.8× P/NAV vs 1.0-1.2× for Newmont and Barrick.',
      'Index inclusion as senior gold producer accelerated post-Kirkland; generalist investors found their "safe gold pick".',
      'Lower cost of equity capital → cheaper M&A currency for future deals.',
      'Re-rating compounds: higher multiple → higher share price → cheaper acquisitions → better assets → higher multiple.',
    ],
  },
  {
    title: '5. Became a "platform" rather than a collection of mines',
    bullets: [
      'Abitibi platform: Canadian Malartic + Detour + LaRonde + Goldex = ~3 Moz/yr from one belt with shared infrastructure and people.',
      'Nunavut platform: Meadowbank + Meliadine + Amaruq + Hope Bay (under care) — operates Arctic logistics few peers can match.',
      'Brownfield optionality — new finds get plugged into existing mills, often at marginal capex.',
      'This is how Newmont and Barrick are organised internally; Agnico got there via acquisition rather than scale-up.',
    ],
  },
  {
    title: '6. Strong gold-price leverage + improving margins',
    bullets: [
      'Cost discipline meant margins expanded faster than peers as gold rose; AISC stayed flat in real terms while spot gold tripled.',
      'Hedge book minimal — full exposure to spot pricing for shareholders.',
      'Growing production into rising prices = compounded earnings growth (production up ~3× while gold up ~3× = ~9× EBITDA).',
      'Operating leverage works both ways but Agnico\'s cost base is among the most defensive in the senior tier.',
    ],
  },
  {
    title: '7. Capital allocation discipline',
    bullets: [
      'Dividend grown ~10× since 2017; consistently returned cash to shareholders without compromising balance sheet.',
      'Maintained investment-grade credit rating through the cycle — rare among gold majors.',
      'Net cash position at multiple points; never forced into distressed asset sales.',
      'Buybacks deployed at favourable prices (not at peaks).',
      'Avoided "bigger-is-better" cycle peaks — did not bid for Newcrest in 2023.',
    ],
  },
];

const agnicoOtherInsights = [
  { n: 1, title: 'Geographic concentration cuts both ways',
    body: 'Heavy Canada exposure (>80% of NAV) reduces jurisdictional risk but concentrates currency, tax, and policy risk into one country. Future Canadian royalty or carbon regime changes have outsized impact.' },
  { n: 2, title: 'Limited copper exposure',
    body: 'Pure-play gold is fashionable now, but it concentrates exposure to gold-cycle risk. Newmont-Newcrest got Cu byproduct credits at scale; Agnico does not. If gold cycles turn, Agnico has less diversification.' },
  { n: 3, title: 'Successor risk',
    body: 'Sean Boyd\'s 24-year tenure and culture were significant drivers; Al-Joundi is proven (Agnico President since 2015) but the test is the next downturn or major M&A decision.' },
  { n: 4, title: 'Next leg of growth',
    body: 'Detour expansion, Hope Bay restart, Wasamac development, and Odyssey project ramp are the organic drivers. Major M&A unlikely in the near term given fewer attractive targets and rising premiums.' },
  { n: 5, title: 'Lessons for Evolution Mining',
    body: 'Brownfield consolidation in established belts beats greenfield ambition. Operational consistency builds re-rating; deal-flow does not. "Platform" thinking — turning multiple mines into a regional system — is what differentiates a senior from a producer collection.' },
];


// ===== Leading Indicators data =====

// 16. Exploration spend vs gold discoveries (annual)
const explorationData = [
  { year: 1995, spend: 2.0,  discoveries: 28 },
  { year: 2000, spend: 1.2,  discoveries: 22 },
  { year: 2003, spend: 2.0,  discoveries: 18 },
  { year: 2005, spend: 3.5,  discoveries: 15 },
  { year: 2008, spend: 6.5,  discoveries: 12 },
  { year: 2010, spend: 8.0,  discoveries: 10 },
  { year: 2012, spend: 13.2, discoveries: 8 },
  { year: 2015, spend: 5.5,  discoveries: 5 },
  { year: 2018, spend: 5.8,  discoveries: 6 },
  { year: 2020, spend: 4.5,  discoveries: 4 },
  { year: 2022, spend: 7.5,  discoveries: 3 },
  { year: 2024, spend: 6.5,  discoveries: 3 },
  { year: 2025, spend: 7.0,  discoveries: 2 },
];
const explorationNotes = [
  { year: 2000, n: 1, title: 'Cheap dollars, easy targets',  body: 'US$1.2B/yr finds 22 tier-1 deposits — best ratio on record (~$55M per Moz)' },
  { year: 2012, n: 2, title: 'Peak spend',                   body: 'US$13.2B/yr finds only 8 tier-1 deposits (~$1.65B per Moz) — worst ratio in recorded history' },
  { year: 2018, n: 3, title: 'AI-targeting era begins',      body: 'KoBold, Earth AI, GoldSpot deploy ML on legacy datasets — early results promising but no tier-1 yet' },
  { year: 2025, n: 4, title: 'Spend rises, finds collapse',  body: '~3,000× cost-per-Moz vs 2000 in real terms; signal that future supply will be tight regardless of price' },
];

// 17. Average ore grade — operating mines
const gradeData = [
  { year: 1990, cuGrade: 1.6, auGradeOC: 2.8, auGradeUG: 6.8 },
  { year: 1995, cuGrade: 1.5, auGradeOC: 2.5, auGradeUG: 6.2 },
  { year: 2000, cuGrade: 1.3, auGradeOC: 2.1, auGradeUG: 5.6 },
  { year: 2005, cuGrade: 1.1, auGradeOC: 1.8, auGradeUG: 5.0 },
  { year: 2010, cuGrade: 0.9, auGradeOC: 1.5, auGradeUG: 4.5 },
  { year: 2015, cuGrade: 0.8, auGradeOC: 1.3, auGradeUG: 4.0 },
  { year: 2020, cuGrade: 0.7, auGradeOC: 1.1, auGradeUG: 3.7 },
  { year: 2025, cuGrade: 0.6, auGradeOC: 1.0, auGradeUG: 3.5 },
];
const gradeNotes = [
  { year: 1990, n: 1, title: 'Cu reference grade',  body: '~1.6% Cu was typical of operating porphyries; modern equivalents require 1.8-2× the rock movement' },
  { year: 2005, n: 2, title: 'Au heap-leach scales', body: 'OC heap-leach economics extend to 1.5-2 g/t ore that was uneconomic 20 years prior' },
  { year: 2025, n: 3, title: 'Halving in 35 years', body: 'Cu down ~60%; Au OC down ~65%. Drives unit cost ↑, energy intensity ↑, waste tonnage ↑ regardless of metal price' },
];

// 18. Reserve life — top-10 producers
const reserveLifeData = [
  { year: 2000, gold: 18, copper: 28 },
  { year: 2005, gold: 22, copper: 32 },
  { year: 2010, gold: 21, copper: 31 },
  { year: 2015, gold: 18, copper: 28 },
  { year: 2020, gold: 16, copper: 25 },
  { year: 2025, gold: 14, copper: 22 },
];
const reserveLifeNotes = [
  { year: 2005, n: 1, title: 'Boom-era reserve build', body: 'High prices justify lower-grade reserves; reported life-of-mine extends across the sector' },
  { year: 2015, n: 2, title: 'Post-crash writedowns',  body: 'Reserves recut at lower price decks; Au reserve life back to 2000 levels' },
  { year: 2025, n: 3, title: 'Reserve cliff',          body: 'Au at ~14yr (lowest on record); Cu at ~22yr (lowest in 25yr). Forces M&A — only path to growth is acquisition' },
];

// 19. Project pipeline — significant projects in feasibility/permit/construction
const pipelineData = [
  { year: 2010, copper: 28, gold: 42, lithium: 8,  nickel: 12 },
  { year: 2013, copper: 32, gold: 48, lithium: 10, nickel: 14 },
  { year: 2015, copper: 22, gold: 28, lithium: 12, nickel: 14 },
  { year: 2017, copper: 20, gold: 30, lithium: 18, nickel: 16 },
  { year: 2020, copper: 18, gold: 32, lithium: 28, nickel: 18 },
  { year: 2022, copper: 22, gold: 38, lithium: 45, nickel: 24 },
  { year: 2024, copper: 26, gold: 38, lithium: 35, nickel: 22 },
  { year: 2025, copper: 28, gold: 36, lithium: 30, nickel: 22 },
];
const pipelineNotes = [
  { year: 2013, n: 1, title: 'Pipeline peak',         body: 'End of supercycle capex; many projects approved at peak prices that struggled to deliver economics' },
  { year: 2017, n: 2, title: 'Cu pipeline trough',    body: 'Worst Cu pipeline in 20yr; Codelco ageing, Escondida grade declining, no major new projects committed' },
  { year: 2022, n: 3, title: 'Lithium pipeline ATH',  body: '45 projects vs 8 in 2010 — boom mentality; 2024 reset trims pipeline back ~33%' },
  { year: 2025, n: 4, title: 'Cu projects revive',    body: '28 projects but covers <60% of forecast 2035 demand; structural deficit baked in' },
];

// 20. Discovery-to-production lag (avg years)
const lagData = [
  { decade: '1980s',  years: 8 },
  { decade: '1990s',  years: 10 },
  { decade: '2000s',  years: 12 },
  { decade: '2010s',  years: 16 },
  { decade: '2020s*', years: 18 },
];
const lagNotes = [
  { decade: '1980s',  n: 1, title: 'Greenfield rapid path', body: 'Permitting light, environmental review limited, social licence informal — average 8 years' },
  { decade: '2010s',  n: 2, title: 'Lengthening',          body: 'NEPA-equivalent reviews thicken; tailings standards tighten; community/Indigenous consent formalised' },
  { decade: '2020s*', n: 3, title: 'Doubling',             body: 'Even fast-tracked critical-minerals projects average 18yr discovery-to-first-production; *partial decade' },
];

// 21. Mining majors aggregate capex (top 5 diversifieds, US$B)
const capexData = [
  { year: 2000, capex: 8 },
  { year: 2003, capex: 12 },
  { year: 2005, capex: 18 },
  { year: 2008, capex: 35 },
  { year: 2010, capex: 48 },
  { year: 2012, capex: 78 },
  { year: 2014, capex: 65 },
  { year: 2016, capex: 32 },
  { year: 2018, capex: 38 },
  { year: 2020, capex: 42 },
  { year: 2022, capex: 60 },
  { year: 2024, capex: 65 },
  { year: 2025, capex: 70 },
];
const capexNotes = [
  { year: 2012, n: 1, title: 'Capex peak',          body: 'BHP, Rio, Glencore, Anglo, Vale aggregate capex at US$78B; followed by major project cancellations through 2014-16' },
  { year: 2016, n: 2, title: 'Capex trough',        body: 'Down 60% from peak; "shareholder discipline" era — buybacks > capex' },
  { year: 2022, n: 3, title: 'Energy transition cycle', body: 'Capex turns higher led by Cu projects; pipeline still well below what 2035 demand would require' },
];

// 22. Geographic concentration — top 3 country share by metal
const concentrationData = [
  { metal: 'Iron ore', top1: 35, top2: 20, top3: 10, others: 35 },
  { metal: 'Gold',     top1: 11, top2: 10, top3: 9,  others: 70 },
  { metal: 'Copper',   top1: 28, top2: 13, top3: 11, others: 48 },
  { metal: 'Nickel',   top1: 50, top2: 10, top3: 8,  others: 32 },
  { metal: 'Lithium',  top1: 45, top2: 35, top3: 15, others: 5 },
  { metal: 'Cobalt',   top1: 70, top2: 8,  top3: 6,  others: 16 },
  { metal: 'Rare earths', top1: 70, top2: 15, top3: 8, others: 7 },
];
const concentrationNotes = [
  { n: 1, title: 'Diversified vs concentrated',     body: 'Au is the most diversified (top-3 only 30%); cobalt and REE are 80%+ concentrated in top 3' },
  { n: 2, title: 'Geopolitical premium emerging',   body: 'Western buyers pay premium for "ally-aligned" metal — Australia advantaged on Li, REE, Ni, Cu' },
  { n: 3, title: 'Single-country risk',             body: 'DRC for Co, China for REE, Indonesia for Ni — any policy shift directly translates to global price' },
];

// 23. Australian diesel price (real A$/L)
const dieselData = [
  { year: 1990, price: 0.85 },
  { year: 1995, price: 0.95 },
  { year: 2000, price: 1.05 },
  { year: 2005, price: 1.30 },
  { year: 2008, price: 1.65 },
  { year: 2010, price: 1.45 },
  { year: 2012, price: 1.55 },
  { year: 2015, price: 1.40 },
  { year: 2018, price: 1.55 },
  { year: 2020, price: 1.30 },
  { year: 2022, price: 2.05 },
  { year: 2024, price: 1.95 },
  { year: 2025, price: 2.00 },
];
const dieselNotes = [
  { year: 2008, n: 1, title: 'Pre-GFC oil spike', body: 'Brent US$147 nominal; diesel A$1.65/L drives massive cost inflation across haulage' },
  { year: 2020, n: 2, title: 'COVID trough',     body: 'Demand destruction takes diesel to A$1.30/L; brief tailwind for OC operators' },
  { year: 2022, n: 3, title: 'Russia/Ukraine spike', body: 'Diesel A$2.05/L — fundamental factor in 2022-23 AISC inflation; ~15-20% of OC unit cost' },
];

// 24. Resource nationalism / royalty events per year
const royaltyData = [
  { year: 1971, events: 1 },
  { year: 1995, events: 1 },
  { year: 2000, events: 1 },
  { year: 2005, events: 2 },
  { year: 2008, events: 3 },
  { year: 2010, events: 3 },
  { year: 2012, events: 6 },
  { year: 2014, events: 4 },
  { year: 2016, events: 2 },
  { year: 2018, events: 4 },
  { year: 2020, events: 5 },
  { year: 2022, events: 6 },
  { year: 2023, events: 7 },
  { year: 2024, events: 6 },
  { year: 2025, events: 5 },
];
const royaltyNotes = [
  { year: 1971, n: 1, title: 'Chile / Codelco',         body: 'Salvador Allende nationalises Cu mines — defining 20th-c resource nationalism event' },
  { year: 2012, n: 2, title: 'Mongolia, Indonesia',     body: 'OT renegotiation; Indonesia Ni export ban; ~6 major events in one year' },
  { year: 2018, n: 3, title: 'DRC mining code',         body: 'Royalty hikes, "strategic minerals" classification; ~A$1B+ industry impact' },
  { year: 2023, n: 4, title: 'Panama Cobre Panamá',     body: 'Court rules First Quantum contract unconstitutional — US$10B asset shut overnight' },
  { year: 2024, n: 5, title: 'Mexico Li, AU royalties', body: 'Mexico nationalises Li; QLD coal royalties hiked; WA Li royalty review' },
];

// 25. Permit-to-production funnel — average years at each stage by decade
const funnelData = [
  { decade: '1980s',  explore: 2, prefeas: 1.5, feasibility: 1.5, permit: 1,   construct: 2 },
  { decade: '1990s',  explore: 3, prefeas: 1.5, feasibility: 2,   permit: 1.5, construct: 2 },
  { decade: '2000s',  explore: 3, prefeas: 2,   feasibility: 2.5, permit: 2,   construct: 2.5 },
  { decade: '2010s',  explore: 4, prefeas: 3,   feasibility: 3,   permit: 3,   construct: 3 },
  { decade: '2020s*', explore: 4, prefeas: 3,   feasibility: 3,   permit: 4,   construct: 3.5 },
];
const funnelNotes = [
  { decade: '1990s',  n: 1, title: 'Reference baseline',  body: 'Discovery → first production averaged 10 years; smaller pre-feas, lighter permitting' },
  { decade: '2010s',  n: 2, title: 'Permit/feasibility expand', body: 'Tailings + water + Indigenous consultation lengthen — every stage adds ~1 year' },
  { decade: '2020s*', n: 3, title: 'Permit stage doubles', body: 'Average permit step now 4yr (was 1yr in 1980s); biggest single contributor to total lag' },
];

const leadingOverview = {
  title: 'Reading the leading indicators',
  intro: 'Production volumes and prices are lagging indicators — they tell you what already happened. The ten charts in this section are leading indicators that change today and show up in supply, costs, and corporate behaviour 5-15 years later. The picture they collectively paint: tightening supply, rising costs, structural M&A pressure.',
  items: [
    { n: 1, title: 'Supply-tightness signals (most predictive)',
      body: 'Exploration cost-per-Moz has risen ~3,000× since 2000 in real terms while finds keep declining — most reliable predictor of higher future prices. Reserve life across majors is at multi-decade lows. Cu project pipeline covers <60% of 2035 forecast demand.' },
    { n: 2, title: 'Cost-direction signals',
      body: 'Avg Cu grade halved 1990-2025; Au OC grade halved similarly. Diesel price structurally higher post-2022. Discovery-to-production lag has roughly doubled in 35 years. All push unit costs up regardless of metal price.' },
    { n: 3, title: 'Capital-allocation signals',
      body: 'Mining capex cyclical with 2-3 year price lag — currently rebuilding from 2016 trough. Resource nationalism events trending up since 2010 (Panama, Mexico, Mongolia, Australia royalties). Both signal capital deployment friction.' },
    { n: 4, title: 'Geopolitical / scarcity signals',
      body: 'Cobalt, REE, Ni concentration in single countries creates premium for "ally-aligned" supply — direct tailwind for Australian critical minerals. Conversely, Au is the most geographically diversified and least subject to this dynamic.' },
    { n: 5, title: 'What this implies',
      body: 'Higher real prices for most metals through 2035; rising real costs (partly offset by automation/AI); accelerating M&A as growth-by-acquisition becomes the only option; premium valuations for deposits in low-risk jurisdictions.' },
  ],
};

// ============ COMPONENTS ============

const CHART_HEIGHT = 280;

const NotesPanel = ({ notes }) => (
  <ol className="mt-4 space-y-2">
    {notes.map(note => (
      <li key={note.n} className="flex gap-3 text-sm">
        <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
          style={{ background: C.marker, color: C.ink }}>{note.n}</span>
        <div style={{ color: C.text }}>
          <span className="font-semibold" style={{ color: C.text }}>
            {(note.year || note.decade) ? `${note.year || note.decade} · ${note.title}.` : `${note.title}.`}
          </span>{' '}
          <span style={{ color: C.dim }}>{note.body}</span>
        </div>
      </li>
    ))}
  </ol>
);

const KeyInsight = ({ children }) => (
  <div className="mt-3 pl-3 py-1" style={{ borderLeft: `3px solid ${C.gold}` }}>
    <div className="text-[10px] uppercase tracking-[0.2em] mb-0.5" style={{ color: C.gold, fontFamily: 'ui-monospace, monospace' }}>Key insight</div>
    <div className="text-sm leading-snug" style={{ color: C.text }}>{children}</div>
  </div>
);

const insights = {
  // Industry trends
  mines:        "Open-cut count tripled from 1965-1985 and has stayed dominant ever since; underground count has been roughly flat at 30-45 mines for 75 years.",
  aisc:         "Real all-in costs nearly tripled from 1980 to the 2011 peak, corrected ~25%, and are rising again on inflation and grade decline.",
  cost:         "Open-cut mines move ~15× more rock per dollar than underground; autonomous haulage widened the gap, while UG depth and ESG costs work the other way.",
  method:       "Sub-level open stoping remains the dominant gold UG method; block/panel caving has tripled in count since 2000 — capital-heavy but lowest cost per tonne at scale.",
  rev:          "Iron ore alone now generates more revenue than all other Australian metals combined. Lithium spiked 2022-23 and reset; gold continues steady growth.",
  gold:         "Total world production tripled 1950-2025 even as South Africa's absolute output collapsed by ~25%. Asia-Pacific is now the largest production block by volume.",
  copper:       "Global Cu production grew ~7× from 3 Mt to 23 Mt. South America is the volume giant; Africa's recent climb is the only major growth story outside Asia.",

  // Markets
  goldcycle:    "Three real-price bull markets in 75 years, each driven by a different mechanism — monetary regime change (1971-80), industrial demand (2001-11), and central bank reallocation (2015-now).",
  coppercycle:  "A 25-year real-price decline (1974-1999) was reversed by China demand, then re-set higher by the energy transition. Currently within striking distance of the all-time real high.",
  discovery:    "Tier-1 (>2 Moz) gold finds peaked in the 1990s and have roughly halved each decade since. No continent has been spared the decline.",
  cudiscovery:  "Same pattern as gold but with South America historically dominant. The 2020s are tracking the weakest decade on record despite copper's strategic importance.",
  merger:       "M&A activity bunches near cycle peaks: 2007 pre-GFC, 2013 supercycle late, 2019-23 gold consolidation. The 2024 BHP-Anglo bid signals a copper scarcity premium emerging.",
  commodities:  "From 2000, iron ore, copper, gold, and nickel tracked together until 2008, then diverged. Lithium's 12× spike-and-correction is the most dramatic single-metal story of the era.",

  // Companies
  top5:         "Sector market cap closely tracks the gold price. Newcrest sat at near-senior scale before its 2023 acquisition; Agnico has emerged as Newmont's true peer in the current bull.",
  top615:       "Mid-tier names roughly mirror gold price moves but with higher beta. Northern Star and Evolution grew from nothing to ~US$18B and ~US$8B through systematic acquisition.",

  // Leading indicators
  exploration:  "Spend has risen ~3× while tier-1 finds have fallen ~85%. Cost-per-Moz-discovered has worsened ~30× — the single most reliable leading indicator of higher future prices.",
  grade:        "Cu and Au grades have both roughly halved in 35 years. Independent of metal price, this means more rock moved, more energy used, more waste produced per unit metal.",
  reservelife:  "Top-10 Au reserve life is at a multi-decade low (~14yr); Cu at ~22yr (lowest in 25yr). Means the seniors must either acquire or shrink — there is no organic growth path.",
  pipeline:     "The Cu project pipeline currently covers <60% of forecast 2035 demand. Lithium peaked in 2022 and has reset 33%; Cu is rebuilding from a 2017 trough but well behind demand.",
  lag:          "Discovery-to-production lag has roughly doubled in 35 years. Even when exploration succeeds, supply response lags 15-20 years — locking in tight markets even on optimistic find rates.",
  capex:        "Aggregate majors capex is rebuilding from the 2016 trough but still well below what 2035 demand would require. 2-3 year lag from prices to capex translates to a 4-6 year lag to supply.",
  concentration: "Cobalt (DRC), REE (China), Ni (Indonesia) are 70%+ concentrated in single countries. Au is the most diversified of all metals. Drives ally-aligned pricing premium for Australian critical minerals.",
  diesel:       "Diesel spiked to A$2.05/L during Russia/Ukraine and remains structurally elevated. At ~15-20% of OC unit cost, this is a major contributor to recent AISC inflation across Australian gold producers.",
  royalty:      "Resource nationalism events have roughly tripled in frequency since 2010. Panama, Mexico, Indonesia, Mongolia, Chile and Australia have all hiked terms or nationalised in the past five years.",
  funnel:       "The permit step alone has gone from 1yr (1980s) to 4yr (2020s) — the single biggest contributor to lag growth. Even fast-tracked critical minerals projects average 18yr discovery-to-production.",
};

const tooltipStyle = {
  contentStyle: { background: C.ink, border: `1px solid ${C.border}`, borderRadius: 6, color: C.text, fontFamily: 'ui-monospace, monospace', fontSize: 12 },
  labelStyle: { color: C.gold, fontWeight: 600 },
  itemStyle: { color: C.text },
};
const axisStyle = { stroke: C.dim, fontSize: 11, fontFamily: 'ui-monospace, monospace' };

const ChartHeader = ({ title, subtitle, unit }) => (
  <div className="mb-1">
    <h2 className="text-xl font-semibold tracking-tight" style={{ color: C.text, fontFamily: "'Fraunces', Georgia, serif" }}>{title}</h2>
    <div className="text-sm" style={{ color: C.dim }}>{subtitle}</div>
    <div className="text-xs uppercase tracking-widest mt-1" style={{ color: C.gold, fontFamily: 'ui-monospace, monospace' }}>{unit}</div>
  </div>
);

const findNearest = (data, year, key = 'year') =>
  data.reduce((p, c) => Math.abs(c[key] - year) < Math.abs(p[key] - year) ? c : p);

const OverviewSection = ({ data }) => (
  <>
    <ChartHeader title={data.title} subtitle="Section overview" unit={`${data.items.length} key trends`} />
    <p className="text-sm leading-relaxed mt-3 mb-1" style={{ color: C.text }}>
      {data.intro}
    </p>
    <NotesPanel notes={data.items} />
  </>
);

const TrendsMatrix = ({ trends, yKey = 'impact', xKey = 'likelihood', yLabel = 'Impact', xLabel = 'Likelihood' }) => {
  const itemsAt = (y, x) =>
    trends.filter(t => t[yKey] === y && t[xKey] === x);

  const cellBg = (score) => {
    const opacity = 0.04 + (score - 1) * 0.045;
    return `rgba(230, 184, 74, ${opacity})`;
  };

  const Cell = ({ y, x }) => {
    const items = itemsAt(y, x);
    const score = y * x;
    return (
      <div className="p-2 rounded relative flex items-center justify-center"
        style={{
          background: cellBg(score),
          border: `1px solid ${C.border}`,
          minHeight: 92,
        }}>
        <div className="absolute top-1 right-2 text-[10px]"
          style={{ color: C.dim, fontFamily: 'ui-monospace, monospace' }}>
          {score}
        </div>
        <div className="flex flex-wrap gap-1 justify-center items-center">
          {items.map(item => (
            <span key={item.n} title={item.title}
              className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
              style={{ background: C.marker, color: C.ink }}>
              {item.n}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="my-5">
      <div className="text-[10px] uppercase tracking-[0.2em] mb-1"
        style={{ color: C.gold, fontFamily: 'ui-monospace, monospace' }}>
        {yLabel} × {xLabel} matrix
      </div>
      <div className="text-xs mb-3" style={{ color: C.dim }}>
        Each item's number is plotted by {yLabel.toLowerCase()} (rows) and {xLabel.toLowerCase()} (columns). Cell number = {yLabel.toLowerCase()} × {xLabel.toLowerCase()} score.
      </div>
      <div style={{ maxWidth: 580 }}>
        <div className="grid gap-1" style={{ gridTemplateColumns: '120px 1fr 1fr 1fr' }}>
          {/* Top row: column labels */}
          <div></div>
          <div className="text-center text-[10px] uppercase tracking-widest pb-1"
            style={{ color: C.dim, fontFamily: 'ui-monospace, monospace' }}>
            Low {xLabel}
          </div>
          <div className="text-center text-[10px] uppercase tracking-widest pb-1"
            style={{ color: C.dim, fontFamily: 'ui-monospace, monospace' }}>
            Medium {xLabel}
          </div>
          <div className="text-center text-[10px] uppercase tracking-widest pb-1"
            style={{ color: C.dim, fontFamily: 'ui-monospace, monospace' }}>
            High {xLabel}
          </div>

          {/* High row */}
          <div className="flex items-center justify-end pr-2 text-[10px] uppercase tracking-widest"
            style={{ color: C.dim, fontFamily: 'ui-monospace, monospace' }}>
            High {yLabel}
          </div>
          <Cell y={3} x={1} />
          <Cell y={3} x={2} />
          <Cell y={3} x={3} />

          {/* Med row */}
          <div className="flex items-center justify-end pr-2 text-[10px] uppercase tracking-widest"
            style={{ color: C.dim, fontFamily: 'ui-monospace, monospace' }}>
            Medium {yLabel}
          </div>
          <Cell y={2} x={1} />
          <Cell y={2} x={2} />
          <Cell y={2} x={3} />

          {/* Low row */}
          <div className="flex items-center justify-end pr-2 text-[10px] uppercase tracking-widest"
            style={{ color: C.dim, fontFamily: 'ui-monospace, monospace' }}>
            Low {yLabel}
          </div>
          <Cell y={1} x={1} />
          <Cell y={1} x={2} />
          <Cell y={1} x={3} />
        </div>
      </div>
    </div>
  );
};

const TrendsList = ({ items, yKey = 'impact', xKey = 'likelihood' }) => {
  const sorted = [...items].sort((a, b) =>
    (b[yKey] * b[xKey]) - (a[yKey] * a[xKey])
  );
  return (
    <ol className="mt-4 space-y-2">
      {sorted.map(item => {
        const score = item[yKey] * item[xKey];
        return (
          <li key={item.n} className="flex gap-3 text-sm">
            <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
              style={{ background: C.marker, color: C.ink }}>{item.n}</span>
            <div style={{ color: C.text, flex: 1, minWidth: 0 }}>
              <span className="font-semibold" style={{ color: C.text }}>{item.title}.</span>{' '}
              <span style={{ color: C.dim }}>{item.body}</span>
            </div>
            <span className="flex-shrink-0 text-[10px] uppercase tracking-widest self-start mt-1"
              style={{ color: C.gold, fontFamily: 'ui-monospace, monospace' }}>
              Score {score}
            </span>
          </li>
        );
      })}
    </ol>
  );
};

const TrendsTimeView = ({ data }) => (
  <>
    <ChartHeader title={data.title} subtitle={data.subtitle} unit={data.unit} />
    <p className="text-sm leading-relaxed mt-3 mb-1" style={{ color: C.text }}>
      {data.intro}
    </p>
    <TrendsMatrix trends={data.items} />
    <TrendsList items={data.items} />
  </>
);

// ===== Strategy components =====

const PillarCard = ({ pillar, lens }) => (
  <div className="rounded p-3" style={{ background: C.ink, border: `1px solid ${C.border}` }}>
    <div className="flex items-start gap-2 mb-2">
      <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mt-0.5"
        style={{ background: C.marker, color: C.ink }}>
        {pillar.n}
      </span>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm" style={{ color: C.text, fontFamily: "'Fraunces', Georgia, serif" }}>
          {pillar.title}
        </div>
        <div className="text-[10px] uppercase tracking-widest mt-0.5"
          style={{ color: C.gold, fontFamily: 'ui-monospace, monospace' }}>
          Confidence: {pillar.confidence}
        </div>
      </div>
    </div>

    <div className="space-y-1.5 mb-3 text-xs">
      <div>
        <div className="uppercase tracking-widest text-[9px]"
          style={{ color: C.dim, fontFamily: 'ui-monospace, monospace' }}>
          2025 baseline
        </div>
        <div style={{ color: C.text }}>{pillar.baseline}</div>
      </div>
      <div>
        <div className="uppercase tracking-widest text-[9px]"
          style={{ color: C.dim, fontFamily: 'ui-monospace, monospace' }}>
          2050 target
        </div>
        <div style={{ color: C.text }}>{pillar.target}</div>
      </div>
    </div>

    <div className="text-xs pt-2" style={{ borderTop: `1px solid ${C.border}` }}>
      <div className="uppercase tracking-widest text-[9px] mb-1"
        style={{ color: C.gold, fontFamily: 'ui-monospace, monospace' }}>
        {lens} lens
      </div>
      <div style={{ color: C.text }}>{pillar.lenses[lens]}</div>
    </div>
  </div>
);

const SuccessTab = ({ data }) => {
  const [lens, setLens] = useState('industry');
  const lenses = [
    { id: 'industry',    label: 'Industry' },
    { id: 'government',  label: 'Government' },
    { id: 'communities', label: 'Communities' },
    { id: 'investors',   label: 'Investors' },
  ];

  return (
    <>
      <ChartHeader title={data.title} subtitle={data.subtitle}
        unit={`${data.pillars.length} pillars · stakeholder lens toggle`} />

      <div className="my-4 p-4 rounded"
        style={{ background: C.ink, borderLeft: `3px solid ${C.gold}` }}>
        <div className="text-[10px] uppercase tracking-[0.2em] mb-2"
          style={{ color: C.gold, fontFamily: 'ui-monospace, monospace' }}>
          Vision statement
        </div>
        <div className="text-sm leading-relaxed"
          style={{ color: C.text, fontFamily: "'Fraunces', Georgia, serif" }}>
          {data.vision}
        </div>
      </div>

      <div className="my-4">
        <div className="text-[10px] uppercase tracking-[0.2em] mb-2"
          style={{ color: C.gold, fontFamily: 'ui-monospace, monospace' }}>
          Stakeholder lens
        </div>
        <div className="flex gap-2 flex-wrap">
          {lenses.map(l => (
            <button key={l.id} onClick={() => setLens(l.id)}
              className="px-3 py-1.5 text-xs rounded transition-colors"
              style={{
                background: lens === l.id ? C.gold : 'transparent',
                color: lens === l.id ? C.ink : C.dim,
                border: `1px solid ${lens === l.id ? C.gold : C.border}`,
                fontWeight: lens === l.id ? 600 : 400,
                fontFamily: "'Fraunces', Georgia, serif",
              }}>
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {data.pillars.map(pillar => (
          <PillarCard key={pillar.n} pillar={pillar} lens={lens} />
        ))}
      </div>
    </>
  );
};

const ActionList = ({ items, yKey, xKey }) => {
  const sorted = [...items].sort((a, b) =>
    (b[yKey] * b[xKey]) - (a[yKey] * a[xKey])
  );
  return (
    <ol className="mt-4 space-y-4">
      {sorted.map(item => {
        const score = item[yKey] * item[xKey];
        return (
          <li key={item.n} className="flex gap-3">
            <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mt-0.5"
              style={{ background: C.marker, color: C.ink }}>{item.n}</span>
            <div style={{ color: C.text, flex: 1, minWidth: 0 }}>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="font-semibold text-sm" style={{ color: C.text }}>{item.title}.</span>
                <span className="text-[10px] uppercase tracking-widest"
                  style={{ color: C.gold, fontFamily: 'ui-monospace, monospace' }}>
                  Score {score} · Lead: {item.owner}
                </span>
              </div>
              <div className="text-sm mt-1" style={{ color: C.dim }}>
                <span className="font-semibold" style={{ color: C.text }}>What's at stake: </span>
                {item.stake}
              </div>
              <div className="mt-2 space-y-1">
                <div className="flex gap-3 text-xs">
                  <span className="flex-shrink-0 w-24 uppercase tracking-widest text-[9px] pt-0.5"
                    style={{ color: C.gold, fontFamily: 'ui-monospace, monospace' }}>Industry</span>
                  <span style={{ color: C.text }} className="flex-1">{item.actions.industry}</span>
                </div>
                <div className="flex gap-3 text-xs">
                  <span className="flex-shrink-0 w-24 uppercase tracking-widest text-[9px] pt-0.5"
                    style={{ color: C.gold, fontFamily: 'ui-monospace, monospace' }}>Government</span>
                  <span style={{ color: C.text }} className="flex-1">{item.actions.government}</span>
                </div>
                <div className="flex gap-3 text-xs">
                  <span className="flex-shrink-0 w-24 uppercase tracking-widest text-[9px] pt-0.5"
                    style={{ color: C.gold, fontFamily: 'ui-monospace, monospace' }}>Company</span>
                  <span style={{ color: C.text }} className="flex-1">{item.actions.company}</span>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
};

const ActionTab = ({ data }) => {
  const [lens, setLens] = useState('all');
  const lenses = [
    { id: 'all',    label: 'All Metals' },
    { id: 'gold',   label: 'Gold' },
    { id: 'copper', label: 'Copper' },
  ];

  // Derive items with lens-specific scores and stake text at top level,
  // so TrendsMatrix and ActionList can use them directly.
  const lensItems = data.items.map(item => ({
    ...item,
    [data.yKey]: item.scores[lens][0],
    [data.xKey]: item.scores[lens][1],
    stake: item.stakes[lens],
  }));

  return (
    <>
      <ChartHeader title={data.title} subtitle={data.subtitle} unit={data.unit} />
      <p className="text-sm leading-relaxed mt-3 mb-1" style={{ color: C.text }}>
        {data.intro}
      </p>

      <div className="my-4">
        <div className="text-[10px] uppercase tracking-[0.2em] mb-2"
          style={{ color: C.gold, fontFamily: 'ui-monospace, monospace' }}>
          Metal lens
        </div>
        <div className="flex gap-2 flex-wrap">
          {lenses.map(l => (
            <button key={l.id} onClick={() => setLens(l.id)}
              className="px-3 py-1.5 text-xs rounded transition-colors"
              style={{
                background: lens === l.id ? C.gold : 'transparent',
                color: lens === l.id ? C.ink : C.dim,
                border: `1px solid ${lens === l.id ? C.gold : C.border}`,
                fontWeight: lens === l.id ? 600 : 400,
                fontFamily: "'Fraunces', Georgia, serif",
              }}>
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <TrendsMatrix trends={lensItems}
        yKey={data.yKey} xKey={data.xKey}
        yLabel={data.yLabel} xLabel={data.xLabel} />
      <ActionList items={lensItems} yKey={data.yKey} xKey={data.xKey} />
    </>
  );
};

const AgnicoCaseStudyTab = () => {
  const driverColors = [C.gold, C.copper, C.ochre, C.forest, C.teal];

  return (
    <>
      <ChartHeader
        title="Agnico Eagle Case Study · Anatomy of a re-rating"
        subtitle="How Agnico went from mid-tier to the most valuable senior gold producer"
        unit="2000-2026 · approximate market caps US$B · gold US$/oz" />

      <p className="text-sm leading-relaxed mt-3 mb-1" style={{ color: C.text }}>
        From 2013 (post the gold-bear lows) to 2026, Agnico Eagle's market cap grew roughly 16× — versus 3× for the gold price. That gap is the alpha: re-rating, M&A, and operational compounding. The chart below tracks Agnico against Newmont, Barrick, and Evolution alongside the gold price; numbered callouts mark the key inflection points.
      </p>

      <div className="my-5" style={{ height: 420 }}>
        <ResponsiveContainer>
          <ComposedChart data={agnicoCaseData} margin={{ top: 20, right: 60, bottom: 10, left: 10 }}>
            <CartesianGrid stroke={C.border} strokeDasharray="2 4" />
            <XAxis dataKey="year" stroke={C.dim} tick={{ fill: C.dim, fontSize: 11 }} interval={1} />
            <YAxis yAxisId="left" stroke={C.dim} tick={{ fill: C.dim, fontSize: 11 }}
              label={{ value: 'Market cap (US$B)', angle: -90, position: 'insideLeft', fill: C.dim, fontSize: 11, style: { textAnchor: 'middle' } }} />
            <YAxis yAxisId="right" orientation="right" stroke={C.gold} tick={{ fill: C.gold, fontSize: 11 }}
              label={{ value: 'Gold US$/oz', angle: 90, position: 'insideRight', fill: C.gold, fontSize: 11, style: { textAnchor: 'middle' } }} />
            <Tooltip contentStyle={{ background: C.ink, border: `1px solid ${C.border}`, color: C.text, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 11, color: C.dim }} />
            <Line yAxisId="right" type="monotone" dataKey="gold" name="Gold US$/oz" stroke={C.gold} strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
            <Line yAxisId="left" type="monotone" dataKey="agnico" name="Agnico Eagle" stroke={C.copper} strokeWidth={3} dot={{ r: 3, fill: C.copper }} />
            <Line yAxisId="left" type="monotone" dataKey="newmont" name="Newmont" stroke={C.slate} strokeWidth={2} dot={false} />
            <Line yAxisId="left" type="monotone" dataKey="barrick" name="Barrick" stroke={C.rust} strokeWidth={2} dot={false} />
            <Line yAxisId="left" type="monotone" dataKey="evolution" name="Evolution Mining" stroke={C.forest} strokeWidth={2} dot={false} />
            {agnicoCallouts.map(c => (
              <ReferenceDot key={c.n} yAxisId="left" x={c.year} y={
                agnicoCaseData.find(d => d.year === c.year)?.agnico || 0
              } r={11} fill={C.marker} stroke={C.ink} strokeWidth={1}
                label={{ value: c.n, fill: C.ink, fontSize: 11, fontWeight: 700 }} />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <NotesPanel notes={agnicoCallouts} />

      <KeyInsight>
        Agnico's market cap grew ~16× from 2013 to 2026 vs ~3× for the gold price. The 13× gap is the alpha — driven by re-rating, M&A, and operational compounding. The Kirkland Lake merger alone (Feb 2022) is responsible for roughly half of that gap.
      </KeyInsight>

      <div className="my-6">
        <div className="text-[10px] uppercase tracking-[0.2em] mb-2"
          style={{ color: C.gold, fontFamily: 'ui-monospace, monospace' }}>
          Drivers of outperformance · illustrative weighting
        </div>
        <div className="text-xs mb-3" style={{ color: C.dim }}>
          A directional split of what drove Agnico's 16× re-rating since 2013. Weights are judgemental, not measured.
        </div>
        <div style={{ height: 320 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={agnicoDrivers} dataKey="value" nameKey="name"
                cx="50%" cy="50%" outerRadius={110} innerRadius={50}
                label={({ name, value }) => `${name} · ${value}%`}
                labelLine={{ stroke: C.dim }}
                stroke={C.ink} strokeWidth={2}>
                {agnicoDrivers.map((entry, i) => (
                  <Cell key={entry.name} fill={driverColors[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: C.ink, border: `1px solid ${C.border}`, color: C.text, fontSize: 12 }}
                formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        <div className="text-[10px] uppercase tracking-[0.2em] mb-1"
          style={{ color: C.gold, fontFamily: 'ui-monospace, monospace' }}>
          Why Agnico has performed so well since 2013
        </div>
        {agnicoWhySections.map(section => (
          <div key={section.title}>
            <h3 className="text-base mb-2" style={{ color: C.text, fontFamily: "'Fraunces', Georgia, serif", fontWeight: 600 }}>
              {section.title}
            </h3>
            <ul className="space-y-1.5 ml-4">
              {section.bullets.map((b, i) => (
                <li key={i} className="text-sm leading-relaxed" style={{ color: C.text, listStyle: 'disc' }}>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="text-[10px] uppercase tracking-[0.2em] mb-3"
          style={{ color: C.gold, fontFamily: 'ui-monospace, monospace' }}>
          Other relevant insights
        </div>
        <NotesPanel notes={agnicoOtherInsights} />
      </div>
    </>
  );
};

// ===== Industry Trends =====

const MineChart = () => (
  <>
    <ChartHeader title="Australian metal mines, medium & large" subtitle="Active count — open cut vs underground" unit="number of mines" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <BarChart data={mineData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis {...axisStyle} tick={{ fill: C.dim }} />
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ color: C.text, fontSize: 12 }} />
        <Bar dataKey="openCut" name="Open cut" fill={C.ochre} />
        <Bar dataKey="underground" name="Underground" fill={C.copper} />
        {mineNotes.map(note => {
          const pt = findNearest(mineData, note.year);
          return <ReferenceDot key={note.n} x={pt.year} y={pt.openCut + pt.underground + 8} r={11}
            fill={C.marker} stroke={C.ink} strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }} />;
        })}
      </BarChart>
    </ResponsiveContainer>
    <KeyInsight>{insights.mines}</KeyInsight>
    <NotesPanel notes={mineNotes} />
  </>
);

const AiscChart = () => (
  <>
    <ChartHeader title="Gold AISC trend" subtitle="Open-cut vs underground gold mines (illustrative)" unit="A$2025 per ounce · pre-2013 back-cast" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <LineChart data={aiscData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis {...axisStyle} tick={{ fill: C.dim }} />
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ color: C.text, fontSize: 12 }} />
        <Line type="monotone" dataKey="oc" name="Open cut" stroke={C.ochre} strokeWidth={2.5} dot={{ r: 3 }} />
        <Line type="monotone" dataKey="ug" name="Underground" stroke={C.copper} strokeWidth={2.5} dot={{ r: 3 }} />
        {aiscNotes.map(note => {
          const pt = findNearest(aiscData, note.year);
          return <ReferenceDot key={note.n} x={pt.year} y={pt.ug + 100} r={11}
            fill={C.marker} stroke={C.ink} strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }} />;
        })}
      </LineChart>
    </ResponsiveContainer>
    <KeyInsight>{insights.aisc}</KeyInsight>
    <NotesPanel notes={aiscNotes} />
  </>
);

const CostChart = () => (
  <>
    <ChartHeader title="Mining unit cost" subtitle="Open cut vs underground (different scales — note dual axis)" unit="A$2025 per tonne mined+processed" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <ComposedChart data={costData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis yAxisId="oc" {...axisStyle} tick={{ fill: C.ochre }} />
        <YAxis yAxisId="ug" orientation="right" {...axisStyle} tick={{ fill: C.copper }} />
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ color: C.text, fontSize: 12 }} />
        <Line yAxisId="oc" type="monotone" dataKey="oc" name="Open cut (left)" stroke={C.ochre} strokeWidth={2.5} dot={{ r: 3 }} />
        <Line yAxisId="ug" type="monotone" dataKey="ug" name="Underground (right)" stroke={C.copper} strokeWidth={2.5} dot={{ r: 3 }} />
        {costNotes.map(note => {
          const pt = findNearest(costData, note.year);
          return <ReferenceDot key={note.n} yAxisId="ug" x={pt.year} y={pt.ug + 12} r={11}
            fill={C.marker} stroke={C.ink} strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }} />;
        })}
      </ComposedChart>
    </ResponsiveContainer>
    <KeyInsight>{insights.cost}</KeyInsight>
    <NotesPanel notes={costNotes} />
  </>
);

const MethodChart = () => (
  <>
    <ChartHeader title="Underground mining method" subtitle="Active medium/large UG metal mines, Australia — by primary method" unit="number of mines" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <AreaChart data={methodData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis {...axisStyle} tick={{ fill: C.dim }} />
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ color: C.text, fontSize: 11 }} />
        <Area type="monotone" dataKey="slos"  name="Sub-level open stoping" stackId="1" stroke={C.ochre} fill={C.ochre} fillOpacity={0.85} />
        <Area type="monotone" dataKey="slc"   name="Sub-level caving"       stackId="1" stroke={C.copper} fill={C.copper} fillOpacity={0.85} />
        <Area type="monotone" dataKey="block" name="Block / panel caving"   stackId="1" stroke={C.rust} fill={C.rust} fillOpacity={0.85} />
        <Area type="monotone" dataKey="cf"    name="Cut-and-fill"           stackId="1" stroke={C.teal} fill={C.teal} fillOpacity={0.85} />
        <Area type="monotone" dataKey="other" name="Other"                  stackId="1" stroke={C.slate} fill={C.slate} fillOpacity={0.85} />
        {methodNotes.map(note => {
          const pt = findNearest(methodData, note.year);
          const total = pt.slos + pt.slc + pt.block + pt.cf + pt.other;
          return <ReferenceDot key={note.n} x={note.year} y={total + 3} r={11} fill={C.marker} stroke={C.ink} strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }} />;
        })}
      </AreaChart>
    </ResponsiveContainer>
    <KeyInsight>{insights.method}</KeyInsight>
    <NotesPanel notes={methodNotes} />
  </>
);

const RevChart = () => (
  <>
    <ChartHeader title="Australian metal mining revenue" subtitle="By commodity — A$2025-equivalent value of production" unit="A$ billions, real" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <AreaChart data={revData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis {...axisStyle} tick={{ fill: C.dim }} />
        <Tooltip {...tooltipStyle} formatter={(v) => `$${v}B`} />
        <Legend wrapperStyle={{ color: C.text, fontSize: 11 }} />
        <Area type="monotone" dataKey="iron" name="Iron ore" stackId="1" stroke={C.rust} fill={C.rust} fillOpacity={0.9} />
        <Area type="monotone" dataKey="gold" name="Gold" stackId="1" stroke={C.gold} fill={C.gold} fillOpacity={0.9} />
        <Area type="monotone" dataKey="copper" name="Copper" stackId="1" stroke={C.copper} fill={C.copper} fillOpacity={0.9} />
        <Area type="monotone" dataKey="lithium" name="Lithium" stackId="1" stroke={C.teal} fill={C.teal} fillOpacity={0.9} />
        <Area type="monotone" dataKey="basemetals" name="Pb/Zn/Ni" stackId="1" stroke={C.slate} fill={C.slate} fillOpacity={0.9} />
        <Area type="monotone" dataKey="bauxite" name="Bauxite" stackId="1" stroke={C.ochre} fill={C.ochre} fillOpacity={0.9} />
        <Area type="monotone" dataKey="other" name="Other" stackId="1" stroke={C.plum} fill={C.plum} fillOpacity={0.9} />
        {revNotes.map(note => {
          const pt = findNearest(revData, note.year);
          const total = pt.iron + pt.gold + pt.copper + pt.lithium + pt.basemetals + pt.bauxite + pt.other;
          return <ReferenceDot key={note.n} x={pt.year} y={total + 10} r={11} fill={C.marker} stroke={C.ink} strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }} />;
        })}
      </AreaChart>
    </ResponsiveContainer>
    <KeyInsight>{insights.rev}</KeyInsight>
    <NotesPanel notes={revNotes} />
  </>
);

const GoldChart = () => (
  <>
    <ChartHeader title="Gold mine production by continent" subtitle="World primary mine production, by continent" unit="tonnes per year" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <AreaChart data={goldData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis {...axisStyle} tick={{ fill: C.dim }} />
        <Tooltip {...tooltipStyle} formatter={(v) => `${v} t`} />
        <Legend wrapperStyle={{ color: C.text, fontSize: 11 }} />
        <Area type="monotone" dataKey="africa" name="Africa" stackId="1" stroke={C.rust} fill={C.rust} fillOpacity={0.9} />
        <Area type="monotone" dataKey="asiaoc" name="Asia & Oceania" stackId="1" stroke={C.gold} fill={C.gold} fillOpacity={0.9} />
        <Area type="monotone" dataKey="namerica" name="North America" stackId="1" stroke={C.copper} fill={C.copper} fillOpacity={0.9} />
        <Area type="monotone" dataKey="samerica" name="South America" stackId="1" stroke={C.teal} fill={C.teal} fillOpacity={0.9} />
        <Area type="monotone" dataKey="europe" name="Europe" stackId="1" stroke={C.slate} fill={C.slate} fillOpacity={0.9} />
        {goldNotes.map(note => {
          const pt = findNearest(goldData, note.year);
          const total = pt.africa + pt.asiaoc + pt.namerica + pt.samerica + pt.europe;
          return <ReferenceDot key={note.n} x={note.year} y={total + 100} r={11} fill={C.marker} stroke={C.ink} strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }} />;
        })}
      </AreaChart>
    </ResponsiveContainer>
    <KeyInsight>{insights.gold}</KeyInsight>
    <NotesPanel notes={goldNotes} />
  </>
);

const CopperChart = () => (
  <>
    <ChartHeader title="Copper mine production by continent" subtitle="World primary mine production, by continent" unit="million tonnes per year" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <AreaChart data={copperData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis {...axisStyle} tick={{ fill: C.dim }} />
        <Tooltip {...tooltipStyle} formatter={(v) => `${v} Mt`} />
        <Legend wrapperStyle={{ color: C.text, fontSize: 11 }} />
        <Area type="monotone" dataKey="samerica" name="South America" stackId="1" stroke={C.copper} fill={C.copper} fillOpacity={0.9} />
        <Area type="monotone" dataKey="africa" name="Africa" stackId="1" stroke={C.rust} fill={C.rust} fillOpacity={0.9} />
        <Area type="monotone" dataKey="asia" name="Asia" stackId="1" stroke={C.gold} fill={C.gold} fillOpacity={0.9} />
        <Area type="monotone" dataKey="namerica" name="North America" stackId="1" stroke={C.teal} fill={C.teal} fillOpacity={0.9} />
        <Area type="monotone" dataKey="europe" name="Europe" stackId="1" stroke={C.slate} fill={C.slate} fillOpacity={0.9} />
        <Area type="monotone" dataKey="oceania" name="Oceania" stackId="1" stroke={C.forest} fill={C.forest} fillOpacity={0.9} />
        {copperNotes.map(note => {
          const pt = findNearest(copperData, note.year);
          const total = pt.samerica + pt.africa + pt.asia + pt.namerica + pt.europe + pt.oceania;
          return <ReferenceDot key={note.n} x={note.year} y={total + 1} r={11} fill={C.marker} stroke={C.ink} strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }} />;
        })}
      </AreaChart>
    </ResponsiveContainer>
    <KeyInsight>{insights.copper}</KeyInsight>
    <NotesPanel notes={copperNotes} />
  </>
);

// ===== Markets & Companies =====

const GoldCycleChart = () => (
  <>
    <ChartHeader title="Gold price cycle" subtitle="Real US$2025 per ounce, with 2026 spot; phase shading shows bull/bear regimes" unit="real US$ / oz · 2026 = current spot" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <ComposedChart data={goldCycleData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" type="number" domain={[1950, 2026]} {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis {...axisStyle} tick={{ fill: C.dim }} />
        <Tooltip {...tooltipStyle} formatter={(v) => `$${v}`} />
        {goldCyclePhases.map((p, i) => (
          <ReferenceArea key={i} x1={p.x1} x2={p.x2} fill={p.color} fillOpacity={0.1} stroke="none" />
        ))}
        <Line type="monotone" dataKey="price" name="Gold" stroke={C.gold} strokeWidth={2.5} dot={{ r: 3 }} />
        {goldCycleNotes.map(note => {
          const pt = findNearest(goldCycleData, note.year);
          return <ReferenceDot key={note.n} x={pt.year} y={pt.price + 200} r={11} fill={C.marker} stroke={C.ink} strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }} />;
        })}
      </ComposedChart>
    </ResponsiveContainer>
    <KeyInsight>{insights.goldcycle}</KeyInsight>
    <NotesPanel notes={goldCycleNotes} />
  </>
);

const CopperCycleChart = () => (
  <>
    <ChartHeader title="Copper price cycle" subtitle="Real US$2025 per pound, with 2026 spot; phase shading shows market regimes" unit="real US$ / lb · 2026 = current spot" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <ComposedChart data={copperCycleData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" type="number" domain={[1950, 2026]} {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis {...axisStyle} tick={{ fill: C.dim }} />
        <Tooltip {...tooltipStyle} formatter={(v) => `$${v}`} />
        {copperCyclePhases.map((p, i) => (
          <ReferenceArea key={i} x1={p.x1} x2={p.x2} fill={p.color} fillOpacity={0.1} stroke="none" />
        ))}
        <Line type="monotone" dataKey="price" name="Copper" stroke={C.copper} strokeWidth={2.5} dot={{ r: 3 }} />
        {copperCycleNotes.map(note => {
          const pt = findNearest(copperCycleData, note.year);
          return <ReferenceDot key={note.n} x={pt.year} y={pt.price + 0.5} r={11} fill={C.marker} stroke={C.ink} strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }} />;
        })}
      </ComposedChart>
    </ResponsiveContainer>
    <KeyInsight>{insights.coppercycle}</KeyInsight>
    <NotesPanel notes={copperCycleNotes} />
  </>
);

const DiscoveryChart = () => (
  <>
    <ChartHeader title="Major gold discoveries by continent" subtitle="Count of >2 Moz Au discoveries per decade" unit="number of discoveries" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <BarChart data={discoveryData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="decade" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis {...axisStyle} tick={{ fill: C.dim }} />
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ color: C.text, fontSize: 11 }} />
        <Bar dataKey="africa" name="Africa" stackId="a" fill={C.rust} />
        <Bar dataKey="asiaoc" name="Asia & Oceania" stackId="a" fill={C.gold} />
        <Bar dataKey="namerica" name="North America" stackId="a" fill={C.copper} />
        <Bar dataKey="samerica" name="South America" stackId="a" fill={C.teal} />
        <Bar dataKey="europe" name="Europe" stackId="a" fill={C.slate} />
        {discoveryNotes.map(note => {
          const pt = discoveryData.find(d => d.decade === note.decade);
          if (!pt) return null;
          const total = pt.africa + pt.asiaoc + pt.namerica + pt.samerica + pt.europe;
          return <ReferenceDot key={note.n} x={pt.decade} y={total + 2} r={11} fill={C.marker} stroke={C.ink} strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }} />;
        })}
      </BarChart>
    </ResponsiveContainer>
    <KeyInsight>{insights.discovery}</KeyInsight>
    <NotesPanel notes={discoveryNotes} />
  </>
);

const CopperDiscoveryChart = () => (
  <>
    <ChartHeader title="Major copper discoveries by continent" subtitle="Count of >3 Mt contained Cu discoveries per decade" unit="number of discoveries" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <BarChart data={copperDiscoveryData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="decade" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis {...axisStyle} tick={{ fill: C.dim }} />
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ color: C.text, fontSize: 11 }} />
        <Bar dataKey="samerica" name="South America" stackId="a" fill={C.copper} />
        <Bar dataKey="africa" name="Africa" stackId="a" fill={C.rust} />
        <Bar dataKey="asiaoc" name="Asia & Oceania" stackId="a" fill={C.gold} />
        <Bar dataKey="namerica" name="North America" stackId="a" fill={C.teal} />
        <Bar dataKey="europe" name="Europe" stackId="a" fill={C.slate} />
        {copperDiscoveryNotes.map(note => {
          const pt = copperDiscoveryData.find(d => d.decade === note.decade);
          if (!pt) return null;
          const total = pt.samerica + pt.africa + pt.asiaoc + pt.namerica + pt.europe;
          return <ReferenceDot key={note.n} x={pt.decade} y={total + 1} r={11} fill={C.marker} stroke={C.ink} strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }} />;
        })}
      </BarChart>
    </ResponsiveContainer>
    <KeyInsight>{insights.cudiscovery}</KeyInsight>
    <NotesPanel notes={copperDiscoveryNotes} />
  </>
);

const MergerChart = () => (
  <>
    <ChartHeader title="Mining M&A activity" subtitle="Deals >US$1B — count (bars) and total deal value (line)" unit="count + US$B aggregate value" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <ComposedChart data={mergerData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis yAxisId="count" {...axisStyle} tick={{ fill: C.ochre }} />
        <YAxis yAxisId="value" orientation="right" {...axisStyle} tick={{ fill: C.gold }} />
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ color: C.text, fontSize: 12 }} />
        <Bar yAxisId="count" dataKey="count" name="Deal count (left)" fill={C.ochre} fillOpacity={0.85} />
        <Line yAxisId="value" type="monotone" dataKey="value" name="Total US$B (right)" stroke={C.gold} strokeWidth={2.5} dot={{ r: 3 }} />
        {mergerNotes.map(note => {
          const pt = findNearest(mergerData, note.year);
          return <ReferenceDot key={note.n} yAxisId="value" x={pt.year} y={pt.value + 8} r={11}
            fill={C.marker} stroke={C.ink} strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }} />;
        })}
      </ComposedChart>
    </ResponsiveContainer>
    <KeyInsight>{insights.merger}</KeyInsight>
    <NotesPanel notes={mergerNotes} />
  </>
);

const CommoditiesChart = () => (
  <>
    <ChartHeader title="Commodity prices, real" subtitle="Indexed to 2000 = 100 (real US$)" unit="index, 2000 = 100" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <LineChart data={commoditiesData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis {...axisStyle} tick={{ fill: C.dim }} />
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ color: C.text, fontSize: 12 }} />
        <Line type="monotone" dataKey="gold" name="Gold" stroke={C.gold} strokeWidth={2.5} dot={false} />
        <Line type="monotone" dataKey="copper" name="Copper" stroke={C.copper} strokeWidth={2.5} dot={false} />
        <Line type="monotone" dataKey="ironOre" name="Iron ore" stroke={C.rust} strokeWidth={2.5} dot={false} />
        <Line type="monotone" dataKey="lithium" name="Lithium" stroke={C.teal} strokeWidth={2.5} dot={false} />
        <Line type="monotone" dataKey="nickel" name="Nickel" stroke={C.slate} strokeWidth={2.5} dot={false} />
        {commoditiesNotes.map(note => {
          const pt = findNearest(commoditiesData, note.year);
          const yMax = Math.max(pt.gold, pt.copper, pt.ironOre, pt.lithium, pt.nickel);
          return <ReferenceDot key={note.n} x={pt.year} y={yMax + 60} r={11} fill={C.marker} stroke={C.ink} strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }} />;
        })}
      </LineChart>
    </ResponsiveContainer>
    <KeyInsight>{insights.commodities}</KeyInsight>
    <NotesPanel notes={commoditiesNotes} />
  </>
);

const Top5Chart = () => (
  <>
    <ChartHeader title="Top 5 global gold miners — market cap" subtitle="2000-2025 in US$B; Newcrest plotted alongside until Nov 2023 acquisition; gold price overlay (right axis)" unit="US$B market cap · gold US$/oz nominal" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <ComposedChart data={top5Data} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis yAxisId="cap" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis yAxisId="gold" orientation="right" {...axisStyle} tick={{ fill: C.gold }} />
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ color: C.text, fontSize: 11 }} />
        <Line yAxisId="cap" type="monotone" dataKey="newmont"   name="Newmont"           stroke={C.ochre}  strokeWidth={2} dot={{ r: 2 }} />
        <Line yAxisId="cap" type="monotone" dataKey="barrick"   name="Barrick"           stroke={C.copper} strokeWidth={2} dot={{ r: 2 }} />
        <Line yAxisId="cap" type="monotone" dataKey="agnico"    name="Agnico Eagle"      stroke={C.teal}   strokeWidth={2} dot={{ r: 2 }} />
        <Line yAxisId="cap" type="monotone" dataKey="anglogold" name="AngloGold"         stroke={C.plum}   strokeWidth={2} dot={{ r: 2 }} />
        <Line yAxisId="cap" type="monotone" dataKey="kinross"   name="Kinross"           stroke={C.slate}  strokeWidth={2} dot={{ r: 2 }} />
        <Line yAxisId="cap" type="monotone" dataKey="newcrest"  name="Newcrest (to 2023)" stroke={C.sand}  strokeWidth={2} dot={{ r: 2 }} connectNulls={false} />
        <Line yAxisId="gold" type="monotone" dataKey="gold"     name="Gold US$/oz"       stroke={C.gold}   strokeWidth={2.5} strokeDasharray="4 4" dot={false} />
        {top5Notes.map(note => {
          const pt = findNearest(top5Data, note.year);
          const yMax = Math.max(pt.newmont, pt.barrick, pt.agnico, pt.anglogold, pt.kinross, pt.newcrest || 0);
          return <ReferenceDot key={note.n} yAxisId="cap" x={pt.year} y={yMax + 4} r={11}
            fill={C.marker} stroke={C.ink} strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }} />;
        })}
      </ComposedChart>
    </ResponsiveContainer>
    <KeyInsight>{insights.top5}</KeyInsight>
    <NotesPanel notes={top5Notes} />
  </>
);

const Top615Chart = () => (
  <>
    <ChartHeader title="Mid-tier global gold miners" subtitle="Representative basket of #6-15 by current size + Newcrest pre-acquisition; gold price overlay (right axis)" unit="US$B market cap · gold US$/oz nominal" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <ComposedChart data={top615Data} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis yAxisId="cap" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis yAxisId="gold" orientation="right" {...axisStyle} tick={{ fill: C.gold }} />
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ color: C.text, fontSize: 11 }} />
        <Line yAxisId="cap" type="monotone" dataKey="goldfields"   name="Gold Fields"           stroke={C.ochre}  strokeWidth={2} dot={{ r: 2 }} />
        <Line yAxisId="cap" type="monotone" dataKey="northernstar" name="Northern Star"         stroke={C.forest} strokeWidth={2} dot={{ r: 2 }} />
        <Line yAxisId="cap" type="monotone" dataKey="harmony"      name="Harmony"               stroke={C.rust}   strokeWidth={2} dot={{ r: 2 }} />
        <Line yAxisId="cap" type="monotone" dataKey="panamerican"  name="Pan American"          stroke={C.teal}   strokeWidth={2} dot={{ r: 2 }} />
        <Line yAxisId="cap" type="monotone" dataKey="alamos"       name="Alamos"                stroke={C.plum}   strokeWidth={2} dot={{ r: 2 }} />
        <Line yAxisId="cap" type="monotone" dataKey="evolution"    name="Evolution"             stroke={C.copper} strokeWidth={2} dot={{ r: 2 }} />
        <Line yAxisId="cap" type="monotone" dataKey="newcrest"     name="Newcrest (to 2023)"    stroke={C.slate}  strokeWidth={2} dot={{ r: 2 }} connectNulls={false} />
        <Line yAxisId="gold" type="monotone" dataKey="gold"        name="Gold US$/oz"           stroke={C.gold}   strokeWidth={2.5} strokeDasharray="4 4" dot={false} />
        {top615Notes.map(note => {
          const pt = findNearest(top615Data, note.year);
          const yMax = Math.max(pt.goldfields, pt.northernstar, pt.harmony, pt.panamerican, pt.alamos, pt.evolution, pt.newcrest || 0);
          return <ReferenceDot key={note.n} yAxisId="cap" x={pt.year} y={yMax + 2} r={11} fill={C.marker} stroke={C.ink} strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }} />;
        })}
      </ComposedChart>
    </ResponsiveContainer>
    <KeyInsight>{insights.top615}</KeyInsight>
    <NotesPanel notes={top615Notes} />
  </>
);

// ===== Leading Indicators charts =====

const ExplorationChart = () => (
  <>
    <ChartHeader title="Gold exploration spend vs discoveries" subtitle="Annual global exploration spend (line) vs tier-1 (>2 Moz) discoveries (bars)" unit="US$B real spend · count of tier-1 discoveries" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <ComposedChart data={explorationData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis yAxisId="disc" {...axisStyle} tick={{ fill: C.ochre }} />
        <YAxis yAxisId="spend" orientation="right" {...axisStyle} tick={{ fill: C.gold }} />
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ color: C.text, fontSize: 12 }} />
        <Bar yAxisId="disc" dataKey="discoveries" name="Discoveries (left)" fill={C.ochre} fillOpacity={0.85} />
        <Line yAxisId="spend" type="monotone" dataKey="spend" name="Exploration spend US$B (right)" stroke={C.gold} strokeWidth={2.5} dot={{ r: 3 }} />
        {explorationNotes.map(note => {
          const pt = findNearest(explorationData, note.year);
          return <ReferenceDot key={note.n} yAxisId="spend" x={pt.year} y={pt.spend + 1.5} r={11}
            fill={C.marker} stroke={C.ink} strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }} />;
        })}
      </ComposedChart>
    </ResponsiveContainer>
    <KeyInsight>{insights.exploration}</KeyInsight>
    <NotesPanel notes={explorationNotes} />
  </>
);

const GradeChart = () => (
  <>
    <ChartHeader title="Average ore grade — operating mines" subtitle="Cu grade in % (left) and Au grades in g/t (right) — operating mines, weighted average" unit="Cu % · Au g/t · 1990-2025" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <ComposedChart data={gradeData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis yAxisId="cu" {...axisStyle} tick={{ fill: C.copper }} />
        <YAxis yAxisId="au" orientation="right" {...axisStyle} tick={{ fill: C.gold }} />
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ color: C.text, fontSize: 11 }} />
        <Line yAxisId="cu" type="monotone" dataKey="cuGrade"   name="Cu grade % (left)"     stroke={C.copper} strokeWidth={2.5} dot={{ r: 3 }} />
        <Line yAxisId="au" type="monotone" dataKey="auGradeUG" name="Au UG g/t (right)"     stroke={C.gold}   strokeWidth={2.5} dot={{ r: 3 }} />
        <Line yAxisId="au" type="monotone" dataKey="auGradeOC" name="Au OC g/t (right)"     stroke={C.ochre}  strokeWidth={2.5} dot={{ r: 3 }} />
        {gradeNotes.map(note => {
          const pt = findNearest(gradeData, note.year);
          return <ReferenceDot key={note.n} yAxisId="au" x={pt.year} y={pt.auGradeUG + 0.5} r={11}
            fill={C.marker} stroke={C.ink} strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }} />;
        })}
      </ComposedChart>
    </ResponsiveContainer>
    <KeyInsight>{insights.grade}</KeyInsight>
    <NotesPanel notes={gradeNotes} />
  </>
);

const ReserveLifeChart = () => (
  <>
    <ChartHeader title="Reserve life across top-10 producers" subtitle="Average remaining mine life — gold and copper seniors" unit="years of reserve at current production" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <LineChart data={reserveLifeData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis {...axisStyle} tick={{ fill: C.dim }} />
        <Tooltip {...tooltipStyle} formatter={(v) => `${v} years`} />
        <Legend wrapperStyle={{ color: C.text, fontSize: 12 }} />
        <Line type="monotone" dataKey="gold"   name="Gold seniors"   stroke={C.gold}   strokeWidth={2.5} dot={{ r: 3 }} />
        <Line type="monotone" dataKey="copper" name="Copper seniors" stroke={C.copper} strokeWidth={2.5} dot={{ r: 3 }} />
        {reserveLifeNotes.map(note => {
          const pt = findNearest(reserveLifeData, note.year);
          return <ReferenceDot key={note.n} x={pt.year} y={pt.copper + 2} r={11}
            fill={C.marker} stroke={C.ink} strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }} />;
        })}
      </LineChart>
    </ResponsiveContainer>
    <KeyInsight>{insights.reservelife}</KeyInsight>
    <NotesPanel notes={reserveLifeNotes} />
  </>
);

const PipelineChart = () => (
  <>
    <ChartHeader title="Project pipeline by metal" subtitle="Significant new projects in pre-feasibility / feasibility / permitting / construction" unit="number of projects in development" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <LineChart data={pipelineData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis {...axisStyle} tick={{ fill: C.dim }} />
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ color: C.text, fontSize: 11 }} />
        <Line type="monotone" dataKey="copper"  name="Copper"  stroke={C.copper} strokeWidth={2.5} dot={{ r: 3 }} />
        <Line type="monotone" dataKey="gold"    name="Gold"    stroke={C.gold}   strokeWidth={2.5} dot={{ r: 3 }} />
        <Line type="monotone" dataKey="lithium" name="Lithium" stroke={C.teal}   strokeWidth={2.5} dot={{ r: 3 }} />
        <Line type="monotone" dataKey="nickel"  name="Nickel"  stroke={C.slate}  strokeWidth={2.5} dot={{ r: 3 }} />
        {pipelineNotes.map(note => {
          const pt = findNearest(pipelineData, note.year);
          const yMax = Math.max(pt.copper, pt.gold, pt.lithium, pt.nickel);
          return <ReferenceDot key={note.n} x={pt.year} y={yMax + 4} r={11}
            fill={C.marker} stroke={C.ink} strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }} />;
        })}
      </LineChart>
    </ResponsiveContainer>
    <KeyInsight>{insights.pipeline}</KeyInsight>
    <NotesPanel notes={pipelineNotes} />
  </>
);

const LagChart = () => (
  <>
    <ChartHeader title="Discovery-to-production lag" subtitle="Average years from initial discovery to first production — global, all metals" unit="years" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <BarChart data={lagData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="decade" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis {...axisStyle} tick={{ fill: C.dim }} />
        <Tooltip {...tooltipStyle} formatter={(v) => `${v} years`} />
        <Bar dataKey="years" name="Years to production" fill={C.ochre} fillOpacity={0.85} />
        {lagNotes.map(note => {
          const pt = lagData.find(d => d.decade === note.decade);
          if (!pt) return null;
          return <ReferenceDot key={note.n} x={pt.decade} y={pt.years + 2} r={11}
            fill={C.marker} stroke={C.ink} strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }} />;
        })}
      </BarChart>
    </ResponsiveContainer>
    <KeyInsight>{insights.lag}</KeyInsight>
    <NotesPanel notes={lagNotes} />
  </>
);

const CapexChart = () => (
  <>
    <ChartHeader title="Mining majors aggregate capex" subtitle="BHP + Rio + Glencore + Anglo + Vale combined annual capex" unit="US$B nominal · 2-3yr lag to commodity prices" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <LineChart data={capexData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis {...axisStyle} tick={{ fill: C.dim }} />
        <Tooltip {...tooltipStyle} formatter={(v) => `$${v}B`} />
        <Line type="monotone" dataKey="capex" name="Aggregate capex US$B" stroke={C.copper} strokeWidth={2.5} dot={{ r: 3 }} />
        {capexNotes.map(note => {
          const pt = findNearest(capexData, note.year);
          return <ReferenceDot key={note.n} x={pt.year} y={pt.capex + 8} r={11}
            fill={C.marker} stroke={C.ink} strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }} />;
        })}
      </LineChart>
    </ResponsiveContainer>
    <KeyInsight>{insights.capex}</KeyInsight>
    <NotesPanel notes={capexNotes} />
  </>
);

const ConcentrationChart = () => (
  <>
    <ChartHeader title="Geographic concentration risk" subtitle="Share of global mine production from top-3 producing countries" unit="% global production" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT + 60}>
      <BarChart data={concentrationData} layout="vertical" margin={{ top: 8, right: 12, left: 60, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" horizontal={false} />
        <XAxis type="number" domain={[0, 100]} {...axisStyle} tick={{ fill: C.dim }} tickFormatter={(v) => `${v}%`} />
        <YAxis dataKey="metal" type="category" {...axisStyle} tick={{ fill: C.text }} width={80} />
        <Tooltip {...tooltipStyle} formatter={(v) => `${v}%`} />
        <Legend wrapperStyle={{ color: C.text, fontSize: 11 }} />
        <Bar dataKey="top1"   name="Top 1 country"  stackId="a" fill={C.rust} />
        <Bar dataKey="top2"   name="Top 2 country"  stackId="a" fill={C.copper} />
        <Bar dataKey="top3"   name="Top 3 country"  stackId="a" fill={C.ochre} />
        <Bar dataKey="others" name="All others"     stackId="a" fill={C.slate} fillOpacity={0.5} />
      </BarChart>
    </ResponsiveContainer>
    <KeyInsight>{insights.concentration}</KeyInsight>
    <NotesPanel notes={concentrationNotes} />
  </>
);

const DieselChart = () => (
  <>
    <ChartHeader title="Australian diesel price (real)" subtitle="Mining-relevant cost driver — diesel typically 15-20% of OC unit cost" unit="A$2025 per litre · pump price equivalent" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <LineChart data={dieselData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis {...axisStyle} tick={{ fill: C.dim }} />
        <Tooltip {...tooltipStyle} formatter={(v) => `A$${v}/L`} />
        <Line type="monotone" dataKey="price" name="Diesel A$/L real" stroke={C.rust} strokeWidth={2.5} dot={{ r: 3 }} />
        {dieselNotes.map(note => {
          const pt = findNearest(dieselData, note.year);
          return <ReferenceDot key={note.n} x={pt.year} y={pt.price + 0.2} r={11}
            fill={C.marker} stroke={C.ink} strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }} />;
        })}
      </LineChart>
    </ResponsiveContainer>
    <KeyInsight>{insights.diesel}</KeyInsight>
    <NotesPanel notes={dieselNotes} />
  </>
);

const RoyaltyChart = () => (
  <>
    <ChartHeader title="Resource nationalism events" subtitle="Major royalty hikes, nationalisations, contract reopenings, export bans per year" unit="count of significant events" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <BarChart data={royaltyData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis {...axisStyle} tick={{ fill: C.dim }} />
        <Tooltip {...tooltipStyle} />
        <Bar dataKey="events" name="Resource nationalism events" fill={C.plum} fillOpacity={0.85} />
        {royaltyNotes.map(note => {
          const pt = findNearest(royaltyData, note.year);
          return <ReferenceDot key={note.n} x={pt.year} y={pt.events + 1} r={11}
            fill={C.marker} stroke={C.ink} strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }} />;
        })}
      </BarChart>
    </ResponsiveContainer>
    <KeyInsight>{insights.royalty}</KeyInsight>
    <NotesPanel notes={royaltyNotes} />
  </>
);

const FunnelChart = () => (
  <>
    <ChartHeader title="Permit-to-production funnel" subtitle="Average years at each project stage — discovery to first production, by decade" unit="years per stage · sum = total lag" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <BarChart data={funnelData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="decade" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis {...axisStyle} tick={{ fill: C.dim }} />
        <Tooltip {...tooltipStyle} formatter={(v) => `${v} yrs`} />
        <Legend wrapperStyle={{ color: C.text, fontSize: 11 }} />
        <Bar dataKey="explore"     name="Explore → PFS"        stackId="a" fill={C.ochre} />
        <Bar dataKey="prefeas"     name="PFS → DFS"            stackId="a" fill={C.copper} />
        <Bar dataKey="feasibility" name="DFS → Permit"         stackId="a" fill={C.rust} />
        <Bar dataKey="permit"      name="Permit → Construct"   stackId="a" fill={C.plum} />
        <Bar dataKey="construct"   name="Construct → Production" stackId="a" fill={C.teal} />
        {funnelNotes.map(note => {
          const pt = funnelData.find(d => d.decade === note.decade);
          if (!pt) return null;
          const total = pt.explore + pt.prefeas + pt.feasibility + pt.permit + pt.construct;
          return <ReferenceDot key={note.n} x={pt.decade} y={total + 1.5} r={11}
            fill={C.marker} stroke={C.ink} strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }} />;
        })}
      </BarChart>
    </ResponsiveContainer>
    <KeyInsight>{insights.funnel}</KeyInsight>
    <NotesPanel notes={funnelNotes} />
  </>
);

// ============ MAIN ============
const App = () => {
  const [section, setSection] = useState('industry');
  const [tab, setTab] = useState('industryOverview');

  const tabsIndustry = [
    { id: 'industryOverview', label: 'Overview' },
    { id: 'mines',    label: '1 · Mine count' },
    { id: 'aisc',     label: '2 · AISC' },
    { id: 'cost',     label: '3 · Mining cost' },
    { id: 'method',   label: '4 · UG method' },
    { id: 'rev',      label: '5 · AU revenue' },
    { id: 'gold',     label: '6 · Gold by region' },
    { id: 'copper',   label: '7 · Copper by region' },
  ];
  const tabsMarkets = [
    { id: 'marketsOverview', label: 'Overview' },
    { id: 'goldcycle',     label: '8 · Gold cycle' },
    { id: 'coppercycle',   label: '9 · Copper cycle' },
    { id: 'discovery',     label: '10 · Au discoveries' },
    { id: 'cudiscovery',   label: '11 · Cu discoveries' },
    { id: 'commodities',   label: '12 · Commodity prices' },
  ];
  const tabsCompanies = [
    { id: 'companiesOverview', label: 'Overview' },
    { id: 'merger',        label: '13 · M&A' },
    { id: 'top5',          label: '14 · Top 5 Au miners' },
    { id: 'top615',        label: '15 · Mid-tier Au miners' },
  ];
  const tabsLeading = [
    { id: 'leadingOverview', label: 'Overview' },
    { id: 'exploration',    label: '16 · Spend vs discoveries',     group: 'Discovery & Reserves' },
    { id: 'grade',          label: '17 · Ore grade',                group: 'Discovery & Reserves' },
    { id: 'reservelife',    label: '18 · Reserve life',             group: 'Discovery & Reserves' },
    { id: 'pipeline',       label: '19 · Project pipeline',         group: 'Project execution' },
    { id: 'lag',            label: '20 · Discovery → production lag', group: 'Project execution' },
    { id: 'funnel',         label: '25 · Permit funnel',            group: 'Project execution' },
    { id: 'capex',          label: '21 · Mining capex',             group: 'Cost pressures' },
    { id: 'diesel',         label: '23 · Diesel price',             group: 'Cost pressures' },
    { id: 'concentration',  label: '22 · Concentration risk',       group: 'Geopolitical risk' },
    { id: 'royalty',        label: '24 · Resource nationalism',     group: 'Geopolitical risk' },
  ];
  const tabsFuture = [
    { id: 'futureTrends5yr',  label: '5yr Trends' },
    { id: 'futureTrends15yr', label: '15yr Trends' },
    { id: 'futureTrends25yr', label: '25yr Trends' },
  ];

  const tabsStrategy = [
    { id: 'success',       label: 'Success' },
    { id: 'issues',        label: 'Issues' },
    { id: 'opportunities', label: 'Opportunities' },
    { id: 'agnico',        label: 'Agnico Eagle Case Study' },
  ];

  const tabsBySection = {
    industry: tabsIndustry,
    markets: tabsMarkets,
    companies: tabsCompanies,
    leading: tabsLeading,
    strategy: tabsStrategy,
    future: tabsFuture,
  };

  const onSection = (s) => {
    setSection(s);
    setTab(tabsBySection[s][0].id);
  };

  const tabs = tabsBySection[section];

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: '100vh', fontFamily: "'Inter', -apple-system, sans-serif" }}
      className="p-4 sm:p-6">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700&display=swap');`}</style>

      <header className="mb-4 max-w-5xl mx-auto">
        <div className="text-xs uppercase tracking-[0.25em]" style={{ color: C.gold, fontFamily: 'ui-monospace, monospace' }}>
          1950 → 2025 · Australian metal mining + global markets
        </div>
      </header>

      <div className="max-w-5xl mx-auto mb-3 flex gap-2 flex-wrap">
        {[
          { id: 'industry',  label: 'Industry trends' },
          { id: 'markets',   label: 'Market trends' },
          { id: 'companies', label: 'Company trends' },
          { id: 'leading',   label: 'Leading indicators' },
          { id: 'future',    label: 'Future trends' },
          { id: 'strategy',  label: 'Strategy' },
        ].map(s => (
          <button key={s.id} onClick={() => onSection(s.id)}
            className="px-4 py-2 text-sm rounded-md transition-colors"
            style={{
              background: section === s.id ? C.gold : 'transparent',
              color: section === s.id ? C.ink : C.dim,
              border: `1px solid ${section === s.id ? C.gold : C.border}`,
              fontWeight: section === s.id ? 600 : 400,
              fontFamily: "'Fraunces', Georgia, serif",
            }}
          >{s.label}</button>
        ))}
      </div>

      <nav className="max-w-5xl mx-auto mb-4 flex gap-1 items-center overflow-x-auto pb-2" style={{ borderBottom: `1px solid ${C.border}` }}>
        {tabs.map((t, i) => {
          const prevGroup = i > 0 ? tabs[i - 1].group : null;
          const showGroupLabel = t.group && t.group !== prevGroup;
          return (
            <React.Fragment key={t.id}>
              {showGroupLabel && (
                <div className="flex items-center px-2 text-[10px] uppercase tracking-widest whitespace-nowrap"
                  style={{ color: C.gold, fontFamily: 'ui-monospace, monospace', borderLeft: `1px solid ${C.border}`, marginLeft: 4, paddingLeft: 10 }}>
                  {t.group}
                </div>
              )}
              <button onClick={() => setTab(t.id)}
                className="px-3 py-2 text-xs whitespace-nowrap rounded-t transition-colors"
                style={{
                  background: tab === t.id ? C.card : 'transparent',
                  color: tab === t.id ? C.gold : C.dim,
                  borderBottom: tab === t.id ? `2px solid ${C.gold}` : '2px solid transparent',
                  fontWeight: tab === t.id ? 600 : 400,
                  fontFamily: 'ui-monospace, monospace',
                }}
              >{t.label}</button>
            </React.Fragment>
          );
        })}
      </nav>

      <main className="max-w-5xl mx-auto rounded-lg p-4 sm:p-6"
        style={{ background: C.card, border: `1px solid ${C.border}` }}>
        {tab === 'industryOverview'  && <OverviewSection data={industryOverview} />}
        {tab === 'marketsOverview'   && <OverviewSection data={marketsOverview} />}
        {tab === 'companiesOverview' && <OverviewSection data={companiesOverview} />}
        {tab === 'leadingOverview'   && <OverviewSection data={leadingOverview} />}
        {tab === 'futureTrends5yr'   && <TrendsTimeView data={futureTrends5yr} />}
        {tab === 'futureTrends15yr'  && <TrendsTimeView data={futureTrends15yr} />}
        {tab === 'futureTrends25yr'  && <TrendsTimeView data={futureTrends25yr} />}
        {tab === 'success'           && <SuccessTab data={successData} />}
        {tab === 'issues'            && <ActionTab data={issuesData} />}
        {tab === 'opportunities'     && <ActionTab data={opportunitiesData} />}
        {tab === 'agnico'            && <AgnicoCaseStudyTab />}
        {tab === 'mines'         && <MineChart />}
        {tab === 'aisc'          && <AiscChart />}
        {tab === 'cost'          && <CostChart />}
        {tab === 'method'        && <MethodChart />}
        {tab === 'rev'           && <RevChart />}
        {tab === 'gold'          && <GoldChart />}
        {tab === 'copper'        && <CopperChart />}
        {tab === 'goldcycle'     && <GoldCycleChart />}
        {tab === 'coppercycle'   && <CopperCycleChart />}
        {tab === 'discovery'     && <DiscoveryChart />}
        {tab === 'cudiscovery'   && <CopperDiscoveryChart />}
        {tab === 'merger'        && <MergerChart />}
        {tab === 'commodities'   && <CommoditiesChart />}
        {tab === 'top5'          && <Top5Chart />}
        {tab === 'top615'        && <Top615Chart />}
        {tab === 'exploration'   && <ExplorationChart />}
        {tab === 'grade'         && <GradeChart />}
        {tab === 'reservelife'   && <ReserveLifeChart />}
        {tab === 'pipeline'      && <PipelineChart />}
        {tab === 'lag'           && <LagChart />}
        {tab === 'capex'         && <CapexChart />}
        {tab === 'concentration' && <ConcentrationChart />}
        {tab === 'diesel'        && <DieselChart />}
        {tab === 'royalty'       && <RoyaltyChart />}
        {tab === 'funnel'        && <FunnelChart />}
      </main>

      <footer className="max-w-5xl mx-auto mt-4 text-xs space-y-2" style={{ color: C.dim, fontFamily: 'ui-monospace, monospace' }}>
        <div>
          Indicative trends compiled from industry knowledge, not precise statistics. AISC was standardised in <span style={{ color: C.gold }}>2013</span>; earlier values are back-cast. Company market caps and merger values are best-effort approximations — directional shape is reliable, exact figures are not.
        </div>
        <div>
          Sources: directional trends synthesised from publicly known industry events; figures illustrative.
          For decision-grade data: ABS, Geoscience Australia, S&amp;P Global / WoodMac, USGS, World Gold Council, MinEx Consulting (discoveries), company annual reports.
        </div>
      </footer>
    </div>
  );
};

export default App;
