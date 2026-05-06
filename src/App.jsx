import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceDot, ReferenceArea, ComposedChart,
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
  { year: 2025, price: 3500 },
];
const goldCyclePhases = [
  { x1: 1950, x2: 1971, color: C.slate },
  { x1: 1971, x2: 1980, color: C.gold },
  { x1: 1980, x2: 2001, color: C.rust },
  { x1: 2001, x2: 2011, color: C.gold },
  { x1: 2011, x2: 2015, color: C.rust },
  { x1: 2015, x2: 2025, color: C.gold },
];
const goldCycleNotes = [
  { year: 1971, n: 1, title: 'Nixon shock', body: 'US ends gold-dollar convertibility; price floats and immediately runs' },
  { year: 1980, n: 2, title: 'Hunt brothers / Volcker', body: 'Speculation peak + Iran crisis; Volcker rate hikes then crush gold' },
  { year: 1999, n: 3, title: "Brown's Bottom", body: 'UK sells 395t at the lows; Washington Agreement caps CB sales' },
  { year: 2008, n: 4, title: 'GFC', body: 'Gold rallies as financial system stress builds' },
  { year: 2011, n: 5, title: 'US$1,920 nominal peak', body: 'Eurozone crisis, US debt downgrade, QE2' },
  { year: 2020, n: 6, title: 'COVID + negative real rates', body: 'Real yields collapse; gold breaks 2011 nominal high' },
  { year: 2024, n: 7, title: 'Central bank buying surge', body: 'Post-Russia sanctions; EM CBs accumulate at record pace' },
];

const copperCycleData = [
  { year: 1950, price: 3.5 }, { year: 1960, price: 3.4 }, { year: 1970, price: 3.3 },
  { year: 1974, price: 4.8 }, { year: 1980, price: 3.0 }, { year: 1985, price: 2.0 },
  { year: 1990, price: 2.2 }, { year: 1995, price: 2.4 }, { year: 1999, price: 1.0 },
  { year: 2003, price: 1.3 }, { year: 2007, price: 4.5 }, { year: 2009, price: 2.5 },
  { year: 2011, price: 5.0 }, { year: 2014, price: 3.5 }, { year: 2016, price: 2.3 },
  { year: 2020, price: 2.8 }, { year: 2022, price: 4.5 }, { year: 2024, price: 4.2 },
  { year: 2025, price: 4.8 },
];
const copperCyclePhases = [
  { x1: 1950, x2: 1974, color: C.slate },
  { x1: 1974, x2: 1999, color: C.rust },
  { x1: 1999, x2: 2011, color: C.gold },
  { x1: 2011, x2: 2016, color: C.rust },
  { x1: 2016, x2: 2025, color: C.gold },
];
const copperCycleNotes = [
  { year: 1971, n: 1, title: 'Chile nationalisation', body: 'Codelco formed; supply uncertainty premium' },
  { year: 1999, n: 2, title: 'Asian crisis trough', body: '~US$0.60/lb nominal; many mines uneconomic' },
  { year: 2003, n: 3, title: 'China demand inflects', body: 'Imports surge; price triples in 4 years' },
  { year: 2008, n: 4, title: 'GFC plunge', body: 'Half-price in 6 months; rapid rebound on China stimulus' },
  { year: 2016, n: 5, title: 'Cycle bottom', body: 'Glencore, Freeport restructure; capex collapses' },
  { year: 2022, n: 6, title: 'EV/grid premium', body: 'Energy-transition demand thesis re-prices structurally higher' },
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
  { year: 2000, newmont: 5,  barrick: 8,  agnico: 0.5, anglogold: 7,  kinross: 0.6, gold: 280 },
  { year: 2002, newmont: 12, barrick: 9,  agnico: 0.8, anglogold: 8,  kinross: 1.0, gold: 310 },
  { year: 2005, newmont: 24, barrick: 15, agnico: 2,   anglogold: 12, kinross: 2.5, gold: 450 },
  { year: 2008, newmont: 22, barrick: 32, agnico: 5,   anglogold: 12, kinross: 12,  gold: 880 },
  { year: 2010, newmont: 32, barrick: 52, agnico: 10,  anglogold: 17, kinross: 18,  gold: 1400 },
  { year: 2011, newmont: 32, barrick: 50, agnico: 6,   anglogold: 18, kinross: 16,  gold: 1700 },
  { year: 2013, newmont: 12, barrick: 18, agnico: 5,   anglogold: 5,  kinross: 5,   gold: 1300 },
  { year: 2015, newmont: 10, barrick: 9,  agnico: 6,   anglogold: 3,  kinross: 2,   gold: 1100 },
  { year: 2017, newmont: 20, barrick: 17, agnico: 11,  anglogold: 4,  kinross: 5,   gold: 1300 },
  { year: 2019, newmont: 36, barrick: 32, agnico: 14,  anglogold: 8,  kinross: 6,   gold: 1500 },
  { year: 2020, newmont: 50, barrick: 47, agnico: 19,  anglogold: 11, kinross: 9,   gold: 1900 },
  { year: 2022, newmont: 36, barrick: 30, agnico: 22,  anglogold: 6,  kinross: 5,   gold: 1800 },
  { year: 2023, newmont: 48, barrick: 30, agnico: 28,  anglogold: 7,  kinross: 6,   gold: 2050 },
  { year: 2024, newmont: 50, barrick: 32, agnico: 42,  anglogold: 10, kinross: 11,  gold: 2700 },
  { year: 2025, newmont: 62, barrick: 36, agnico: 58,  anglogold: 16, kinross: 14,  gold: 3500 },
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
  { year: 2000, goldfields: 2,    northernstar: 0,    harmony: 1.5, panamerican: 0.5, alamos: 0.1, evolution: 0,   gold: 280 },
  { year: 2005, goldfields: 8,    northernstar: 0,    harmony: 5,   panamerican: 1.5, alamos: 0.3, evolution: 0,   gold: 450 },
  { year: 2010, goldfields: 12,   northernstar: 0.05, harmony: 4,   panamerican: 4,   alamos: 1.5, evolution: 0,   gold: 1400 },
  { year: 2011, goldfields: 13,   northernstar: 0.2,  harmony: 5,   panamerican: 4,   alamos: 2,   evolution: 0.3, gold: 1700 },
  { year: 2013, goldfields: 4,    northernstar: 0.3,  harmony: 1.5, panamerican: 1.5, alamos: 0.8, evolution: 0.3, gold: 1300 },
  { year: 2015, goldfields: 3,    northernstar: 1.5,  harmony: 0.5, panamerican: 1.2, alamos: 1.5, evolution: 1,   gold: 1100 },
  { year: 2017, goldfields: 6,    northernstar: 2.5,  harmony: 1,   panamerican: 2.5, alamos: 2.5, evolution: 2.5, gold: 1300 },
  { year: 2019, goldfields: 5,    northernstar: 6,    harmony: 1.5, panamerican: 5,   alamos: 2.5, evolution: 3.5, gold: 1500 },
  { year: 2020, goldfields: 10,   northernstar: 8,    harmony: 4,   panamerican: 7,   alamos: 4,   evolution: 5,   gold: 1900 },
  { year: 2022, goldfields: 8,    northernstar: 9,    harmony: 2,   panamerican: 5,   alamos: 3,   evolution: 3.5, gold: 1800 },
  { year: 2023, goldfields: 13,   northernstar: 11,   harmony: 4,   panamerican: 6,   alamos: 5,   evolution: 4,   gold: 2050 },
  { year: 2024, goldfields: 14,   northernstar: 14,   harmony: 6,   panamerican: 8,   alamos: 8,   evolution: 6,   gold: 2700 },
  { year: 2025, goldfields: 18,   northernstar: 18,   harmony: 9,   panamerican: 10,  alamos: 12,  evolution: 8,   gold: 3500 },
];
const top615Notes = [
  { year: 2002, n: 1, title: 'Gold Fields formed', body: 'South African senior consolidates Driefontein, Kloof, Beatrix' },
  { year: 2010, n: 2, title: 'Northern Star founded', body: 'Bill Beament takes shell, buys Paulsens, then Plutonic, Jundee' },
  { year: 2011, n: 3, title: 'Evolution Mining formed', body: 'Catalpa-Conquest merger; Cracow, Mt Rawdon, Pajingo seed assets' },
  { year: 2016, n: 4, title: 'Evolution-Cowal', body: 'Buys Cowal from Barrick; subsequently Mungari, then Ernest Henry Cu-Au stream' },
  { year: 2018, n: 5, title: 'Pan American-Tahoe', body: 'Acquires Escobal (suspended); shifts to LATAM silver+gold mix' },
  { year: 2021, n: 6, title: 'Northern Star-Saracen', body: 'Merger consolidates KCGM (Super Pit) ownership' },
  { year: 2023, n: 7, title: 'Pan American-Yamana share', body: 'Splits Yamana with Agnico; Cerro Moro, Jacobina, Minera Florida' },
  { year: 2025, n: 8, title: 'Mid-tier re-rate', body: 'Gold ATH lifts entire tier; Northern Star, Alamos, Evolution lead percentage gains' },
];

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
            {note.year || note.decade} · {note.title}.
          </span>{' '}
          <span style={{ color: C.dim }}>{note.body}</span>
        </div>
      </li>
    ))}
  </ol>
);

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
    <NotesPanel notes={copperNotes} />
  </>
);

// ===== Markets & Companies =====

const GoldCycleChart = () => (
  <>
    <ChartHeader title="Gold price cycle" subtitle="Real US$2025 per ounce; phase shading shows bull/bear regimes" unit="real US$ / oz" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <ComposedChart data={goldCycleData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" type="number" domain={[1950, 2025]} {...axisStyle} tick={{ fill: C.dim }} />
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
    <NotesPanel notes={goldCycleNotes} />
  </>
);

const CopperCycleChart = () => (
  <>
    <ChartHeader title="Copper price cycle" subtitle="Real US$2025 per pound; phase shading shows market regimes" unit="real US$ / lb" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <ComposedChart data={copperCycleData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" type="number" domain={[1950, 2025]} {...axisStyle} tick={{ fill: C.dim }} />
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
    <NotesPanel notes={commoditiesNotes} />
  </>
);

const Top5Chart = () => (
  <>
    <ChartHeader title="Top 5 global gold miners — market cap" subtitle="2000-2025 in US$B; gold price overlay (right axis)" unit="US$B market cap · gold US$/oz nominal" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <ComposedChart data={top5Data} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis yAxisId="cap" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis yAxisId="gold" orientation="right" {...axisStyle} tick={{ fill: C.gold }} />
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ color: C.text, fontSize: 11 }} />
        <Line yAxisId="cap" type="monotone" dataKey="newmont" name="Newmont" stroke={C.ochre} strokeWidth={2} dot={{ r: 2 }} />
        <Line yAxisId="cap" type="monotone" dataKey="barrick" name="Barrick" stroke={C.copper} strokeWidth={2} dot={{ r: 2 }} />
        <Line yAxisId="cap" type="monotone" dataKey="agnico" name="Agnico Eagle" stroke={C.teal} strokeWidth={2} dot={{ r: 2 }} />
        <Line yAxisId="cap" type="monotone" dataKey="anglogold" name="AngloGold" stroke={C.plum} strokeWidth={2} dot={{ r: 2 }} />
        <Line yAxisId="cap" type="monotone" dataKey="kinross" name="Kinross" stroke={C.slate} strokeWidth={2} dot={{ r: 2 }} />
        <Line yAxisId="gold" type="monotone" dataKey="gold" name="Gold US$/oz" stroke={C.gold} strokeWidth={2.5} strokeDasharray="4 4" dot={false} />
        {top5Notes.map(note => {
          const pt = findNearest(top5Data, note.year);
          const yMax = Math.max(pt.newmont, pt.barrick, pt.agnico, pt.anglogold, pt.kinross);
          return <ReferenceDot key={note.n} yAxisId="cap" x={pt.year} y={yMax + 4} r={11}
            fill={C.marker} stroke={C.ink} strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }} />;
        })}
      </ComposedChart>
    </ResponsiveContainer>
    <NotesPanel notes={top5Notes} />
  </>
);

const Top615Chart = () => (
  <>
    <ChartHeader title="Mid-tier global gold miners" subtitle="Representative basket of #6-15 by current size — market cap; gold price overlay (right axis)" unit="US$B market cap · gold US$/oz nominal" />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <ComposedChart data={top615Data} margin={{ top: 30, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis yAxisId="cap" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis yAxisId="gold" orientation="right" {...axisStyle} tick={{ fill: C.gold }} />
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ color: C.text, fontSize: 11 }} />
        <Line yAxisId="cap" type="monotone" dataKey="goldfields"   name="Gold Fields"   stroke={C.ochre}  strokeWidth={2} dot={{ r: 2 }} />
        <Line yAxisId="cap" type="monotone" dataKey="northernstar" name="Northern Star" stroke={C.forest} strokeWidth={2} dot={{ r: 2 }} />
        <Line yAxisId="cap" type="monotone" dataKey="harmony"      name="Harmony"       stroke={C.rust}   strokeWidth={2} dot={{ r: 2 }} />
        <Line yAxisId="cap" type="monotone" dataKey="panamerican"  name="Pan American"  stroke={C.teal}   strokeWidth={2} dot={{ r: 2 }} />
        <Line yAxisId="cap" type="monotone" dataKey="alamos"       name="Alamos"        stroke={C.plum}   strokeWidth={2} dot={{ r: 2 }} />
        <Line yAxisId="cap" type="monotone" dataKey="evolution"    name="Evolution"     stroke={C.copper} strokeWidth={2} dot={{ r: 2 }} />
        <Line yAxisId="gold" type="monotone" dataKey="gold"        name="Gold US$/oz"   stroke={C.gold}   strokeWidth={2.5} strokeDasharray="4 4" dot={false} />
        {top615Notes.map(note => {
          const pt = findNearest(top615Data, note.year);
          const yMax = Math.max(pt.goldfields, pt.northernstar, pt.harmony, pt.panamerican, pt.alamos, pt.evolution);
          return <ReferenceDot key={note.n} yAxisId="cap" x={pt.year} y={yMax + 1.5} r={11} fill={C.marker} stroke={C.ink} strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }} />;
        })}
      </ComposedChart>
    </ResponsiveContainer>
    <NotesPanel notes={top615Notes} />
  </>
);

// ============ MAIN ============
const App = () => {
  const [section, setSection] = useState('industry');
  const [tab, setTab] = useState('mines');

  const tabsIndustry = [
    { id: 'mines',    label: '1 · Mine count' },
    { id: 'aisc',     label: '2 · AISC' },
    { id: 'cost',     label: '3 · Mining cost' },
    { id: 'method',   label: '4 · UG method' },
    { id: 'rev',      label: '5 · AU revenue' },
    { id: 'gold',     label: '6 · Gold by region' },
    { id: 'copper',   label: '7 · Copper by region' },
  ];
  const tabsMarkets = [
    { id: 'goldcycle',     label: '8 · Gold cycle' },
    { id: 'coppercycle',   label: '9 · Copper cycle' },
    { id: 'discovery',     label: '10 · Au discoveries' },
    { id: 'cudiscovery',   label: '11 · Cu discoveries' },
    { id: 'merger',        label: '12 · M&A' },
    { id: 'commodities',   label: '13 · Commodity prices' },
    { id: 'top5',          label: '14 · Top 5 Au miners' },
    { id: 'top615',        label: '15 · Mid-tier Au miners' },
  ];

  const onSection = (s) => {
    setSection(s);
    setTab(s === 'industry' ? 'mines' : 'goldcycle');
  };

  const tabs = section === 'industry' ? tabsIndustry : tabsMarkets;

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: '100vh', fontFamily: "'Inter', -apple-system, sans-serif" }}
      className="p-4 sm:p-6">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700&display=swap');`}</style>

      <header className="mb-4 max-w-5xl mx-auto">
        <div className="text-xs uppercase tracking-[0.25em]" style={{ color: C.gold, fontFamily: 'ui-monospace, monospace' }}>
          1950 → 2025 · Australian metal mining + global markets
        </div>
      </header>

      <div className="max-w-5xl mx-auto mb-3 flex gap-2">
        {[
          { id: 'industry', label: 'Industry trends' },
          { id: 'markets',  label: 'Markets & companies' },
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

      <nav className="max-w-5xl mx-auto mb-4 flex gap-1 overflow-x-auto pb-2" style={{ borderBottom: `1px solid ${C.border}` }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="px-3 py-2 text-xs whitespace-nowrap rounded-t transition-colors"
            style={{
              background: tab === t.id ? C.card : 'transparent',
              color: tab === t.id ? C.gold : C.dim,
              borderBottom: tab === t.id ? `2px solid ${C.gold}` : '2px solid transparent',
              fontWeight: tab === t.id ? 600 : 400,
              fontFamily: 'ui-monospace, monospace',
            }}
          >{t.label}</button>
        ))}
      </nav>

      <main className="max-w-5xl mx-auto rounded-lg p-4 sm:p-6"
        style={{ background: C.card, border: `1px solid ${C.border}` }}>
        {tab === 'mines'       && <MineChart />}
        {tab === 'aisc'        && <AiscChart />}
        {tab === 'cost'        && <CostChart />}
        {tab === 'method'      && <MethodChart />}
        {tab === 'rev'         && <RevChart />}
        {tab === 'gold'        && <GoldChart />}
        {tab === 'copper'      && <CopperChart />}
        {tab === 'goldcycle'   && <GoldCycleChart />}
        {tab === 'coppercycle' && <CopperCycleChart />}
        {tab === 'discovery'   && <DiscoveryChart />}
        {tab === 'cudiscovery' && <CopperDiscoveryChart />}
        {tab === 'merger'      && <MergerChart />}
        {tab === 'commodities' && <CommoditiesChart />}
        {tab === 'top5'        && <Top5Chart />}
        {tab === 'top615'      && <Top615Chart />}
      </main>

      <footer className="max-w-5xl mx-auto mt-4 text-xs space-y-2" style={{ color: C.dim, fontFamily: 'ui-monospace, monospace' }}>
        <div>
          Fifteen views of a seventy-five-year cycle.
        </div>
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
