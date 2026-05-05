import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceDot, ComposedChart
} from 'recharts';

// ============ PALETTE ============
const C = {
  bg: '#1a1612',
  card: '#221d18',
  border: '#3a322a',
  text: '#e8dfd2',
  dim: '#9a8c78',
  ochre: '#d4a14a',      // open cut / iron ore
  copper: '#c87856',     // underground / copper
  rust: '#a14a2c',
  gold: '#e6b84a',
  teal: '#4a8a87',
  slate: '#7e8b9a',
  forest: '#5a7a4a',
  plum: '#7a4a6a',
  ink: '#2a2520',
  marker: '#f0d896',
};

// ============ DATA ============

// 1. Mine counts (medium/large Australian metal mines)
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

// 2. AISC (gold AISC, A$2025 / oz) — open cut vs underground gold mines
//    Pre-2013 values are back-cast from cash-cost data
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

// 3. Mining unit cost (A$2025 per tonne ore mined+processed)
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

// 4. Underground mining method share (%)
const methodData = [
  { year: 1950, slc: 0, block: 0, other: 100 },
  { year: 1960, slc: 0, block: 0, other: 100 },
  { year: 1970, slc: 3, block: 0, other: 97 },
  { year: 1980, slc: 14, block: 4, other: 82 },
  { year: 1990, slc: 24, block: 8, other: 68 },
  { year: 2000, slc: 26, block: 14, other: 60 },
  { year: 2010, slc: 22, block: 20, other: 58 },
  { year: 2020, slc: 18, block: 23, other: 59 },
  { year: 2025, slc: 17, block: 26, other: 57 },
];

const methodNotes = [
  { year: 1971, n: 1, title: 'Mt Isa pioneers SLC', body: 'Sub-level caving scales for high-tonnage Pb-Zn-Cu' },
  { year: 1993, n: 2, title: 'Northparkes E26', body: "Australia's first major panel block cave (Cu-Au)" },
  { year: 2010, n: 3, title: 'Cadia East', body: 'Deepest block cave globally at the time — Au-Cu' },
  { year: 2024, n: 4, title: 'Block cave wave', body: 'Cadia PC2-3, Telfer UG, Oyu (offshore reference) — capital-heavy but low cost/t' },
];

// "Other" = sub-level open stoping (dominant), cut & fill, room & pillar, longhole stoping

// 5. Australian metal mining revenue by commodity (A$B 2025-equiv)
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

// 6. Global gold production share by continent (%)
const goldData = [
  { year: 1950, africa: 60, namerica: 25, samerica: 5,  asiaoc: 8,  europe: 2 },
  { year: 1960, africa: 67, namerica: 18, samerica: 5,  asiaoc: 8,  europe: 2 },
  { year: 1970, africa: 75, namerica: 12, samerica: 4,  asiaoc: 7,  europe: 2 },
  { year: 1980, africa: 60, namerica: 14, samerica: 5,  asiaoc: 19, europe: 2 },
  { year: 1990, africa: 35, namerica: 22, samerica: 8,  asiaoc: 32, europe: 3 },
  { year: 2000, africa: 22, namerica: 21, samerica: 12, asiaoc: 41, europe: 4 },
  { year: 2010, africa: 22, namerica: 14, samerica: 17, asiaoc: 43, europe: 4 },
  { year: 2020, africa: 22, namerica: 13, samerica: 17, asiaoc: 44, europe: 4 },
  { year: 2025, africa: 25, namerica: 13, samerica: 16, asiaoc: 42, europe: 4 },
];

const goldNotes = [
  { year: 1970, n: 1, title: 'Witwatersrand peak', body: 'South Africa ~75% of world gold — deepest UG mines globally' },
  { year: 1985, n: 2, title: 'Heap-leach revolution', body: 'Nevada (Carlin) + WA-Goldfields scale; Africa share collapses' },
  { year: 2007, n: 3, title: 'China overtakes SA', body: 'China becomes #1 producer; Africa restructures (Ghana, Mali, BF rise)' },
  { year: 2013, n: 4, title: 'AISC discipline', body: 'Post-price-crash, only lowest-cost regions grow share' },
];

// 7. Global copper mine production share by continent (%)
const copperData = [
  { year: 1950, namerica: 35, samerica: 18, europe: 12, asia: 8,  africa: 22, oceania: 5 },
  { year: 1960, namerica: 28, samerica: 22, europe: 10, asia: 10, africa: 25, oceania: 5 },
  { year: 1970, namerica: 24, samerica: 24, europe: 8,  asia: 12, africa: 27, oceania: 5 },
  { year: 1980, namerica: 20, samerica: 28, europe: 10, asia: 13, africa: 23, oceania: 6 },
  { year: 1990, namerica: 22, samerica: 32, europe: 12, asia: 14, africa: 13, oceania: 7 },
  { year: 2000, namerica: 13, samerica: 42, europe: 8,  asia: 18, africa: 12, oceania: 7 },
  { year: 2010, namerica: 10, samerica: 42, europe: 6,  asia: 22, africa: 15, oceania: 5 },
  { year: 2020, namerica: 9,  samerica: 40, europe: 6,  asia: 22, africa: 18, oceania: 5 },
  { year: 2025, namerica: 9,  samerica: 38, europe: 5,  asia: 22, africa: 21, oceania: 5 },
];

const copperNotes = [
  { year: 1971, n: 1, title: 'Chile nationalisation', body: 'Codelco formed; SAm dominance cemented through 1970s-80s' },
  { year: 1990, n: 2, title: 'Escondida', body: 'BHP-RIO supergiant opens — Chile share peaks' },
  { year: 1996, n: 3, title: 'Africa decline bottoms', body: 'Zambia/DRC restructure; foreign investment returns slowly' },
  { year: 2009, n: 4, title: 'DRC resurgence', body: 'Tenke Fungurume, Kamoa-Kakula — African share climbs again' },
  { year: 2020, n: 5, title: 'Energy transition demand', body: 'Premium pricing for low-CO₂ copper; new projects favour SAm + Africa' },
];

// ============ COMPONENTS ============

const CHART_HEIGHT = 280;

const annotationDot = (notes, dataKey = 'underground', data = mineData) => {
  return notes.map(note => {
    // Find nearest data point
    const point = data.reduce((prev, curr) =>
      Math.abs(curr.year - note.year) < Math.abs(prev.year - note.year) ? curr : prev
    );
    const yVal = typeof dataKey === 'function' ? dataKey(point) : point[dataKey];
    return (
      <ReferenceDot
        key={note.n}
        x={point.year}
        y={yVal}
        r={11}
        fill={C.marker}
        stroke={C.ink}
        strokeWidth={2}
        label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }}
      />
    );
  });
};

const NotesPanel = ({ notes, accent }) => (
  <ol className="mt-4 space-y-2">
    {notes.map(note => (
      <li key={note.n} className="flex gap-3 text-sm">
        <span
          className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
          style={{ background: accent || C.marker, color: C.ink }}
        >
          {note.n}
        </span>
        <div style={{ color: C.text }}>
          <span className="font-semibold" style={{ color: C.cream }}>
            {note.year} · {note.title}.
          </span>{' '}
          <span style={{ color: C.dim }}>{note.body}</span>
        </div>
      </li>
    ))}
  </ol>
);

const tooltipStyle = {
  contentStyle: {
    background: C.ink,
    border: `1px solid ${C.border}`,
    borderRadius: 6,
    color: C.text,
    fontFamily: 'ui-monospace, monospace',
    fontSize: 12,
  },
  labelStyle: { color: C.gold, fontWeight: 600 },
  itemStyle: { color: C.text },
};

const axisStyle = { stroke: C.dim, fontSize: 11, fontFamily: 'ui-monospace, monospace' };

// ---- Chart 1: Mine count ----
const MineChart = () => (
  <>
    <ChartHeader
      title="Australian metal mines, medium & large"
      subtitle="Active count — open cut vs underground"
      unit="number of mines"
    />
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
          const pt = mineData.reduce((p, c) =>
            Math.abs(c.year - note.year) < Math.abs(p.year - note.year) ? c : p
          );
          return (
            <ReferenceDot
              key={note.n}
              x={pt.year}
              y={pt.openCut + pt.underground + 8}
              r={11}
              fill={C.marker}
              stroke={C.ink}
              strokeWidth={2}
              label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }}
            />
          );
        })}
      </BarChart>
    </ResponsiveContainer>
    <NotesPanel notes={mineNotes} />
  </>
);

// ---- Chart 2: AISC ----
const AiscChart = () => (
  <>
    <ChartHeader
      title="Gold AISC trend"
      subtitle="Open-cut vs underground gold mines (illustrative)"
      unit="A$2025 per ounce · pre-2013 back-cast"
    />
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
          const pt = aiscData.reduce((p, c) =>
            Math.abs(c.year - note.year) < Math.abs(p.year - note.year) ? c : p
          );
          return (
            <ReferenceDot
              key={note.n}
              x={pt.year}
              y={pt.ug + 100}
              r={11}
              fill={C.marker}
              stroke={C.ink}
              strokeWidth={2}
              label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
    <NotesPanel notes={aiscNotes} />
  </>
);

// ---- Chart 3: Mining cost ----
const CostChart = () => (
  <>
    <ChartHeader
      title="Mining unit cost"
      subtitle="Open cut vs underground (different scales — note dual axis)"
      unit="A$2025 per tonne mined+processed"
    />
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
          const pt = costData.reduce((p, c) =>
            Math.abs(c.year - note.year) < Math.abs(p.year - note.year) ? c : p
          );
          return (
            <ReferenceDot
              key={note.n}
              yAxisId="ug"
              x={pt.year}
              y={pt.ug + 12}
              r={11}
              fill={C.marker}
              stroke={C.ink}
              strokeWidth={2}
              label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }}
            />
          );
        })}
      </ComposedChart>
    </ResponsiveContainer>
    <NotesPanel notes={costNotes} />
  </>
);

// ---- Chart 4: UG method ----
const MethodChart = () => (
  <>
    <ChartHeader
      title="Underground mining method"
      subtitle="Share of active medium/large UG metal mines, Australia"
      unit="% — Other = SLOS / cut-and-fill / room-and-pillar"
    />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <AreaChart data={methodData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }} stackOffset="expand">
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis {...axisStyle} tick={{ fill: C.dim }} tickFormatter={(v) => `${Math.round(v * 100)}%`} />
        <Tooltip {...tooltipStyle} formatter={(v) => `${v}%`} />
        <Legend wrapperStyle={{ color: C.text, fontSize: 12 }} />
        <Area type="monotone" dataKey="other" name="Other (SLOS / C&F)" stackId="1" stroke={C.slate} fill={C.slate} fillOpacity={0.85} />
        <Area type="monotone" dataKey="slc" name="Sub-level caving" stackId="1" stroke={C.ochre} fill={C.ochre} fillOpacity={0.85} />
        <Area type="monotone" dataKey="block" name="Block caving" stackId="1" stroke={C.copper} fill={C.copper} fillOpacity={0.85} />
        {methodNotes.map(note => (
          <ReferenceDot
            key={note.n}
            x={note.year}
            y={0.95}
            r={11}
            fill={C.marker}
            stroke={C.ink}
            strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
    <NotesPanel notes={methodNotes} />
  </>
);

// ---- Chart 5: AU revenue by commodity ----
const RevChart = () => (
  <>
    <ChartHeader
      title="Australian metal mining revenue"
      subtitle="By commodity — A$2025-equivalent value of production"
      unit="A$ billions, real"
    />
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
          const pt = revData.reduce((p, c) =>
            Math.abs(c.year - note.year) < Math.abs(p.year - note.year) ? c : p
          );
          const total = pt.iron + pt.gold + pt.copper + pt.lithium + pt.basemetals + pt.bauxite + pt.other;
          return (
            <ReferenceDot
              key={note.n}
              x={pt.year}
              y={total + 10}
              r={11}
              fill={C.marker}
              stroke={C.ink}
              strokeWidth={2}
              label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }}
            />
          );
        })}
      </AreaChart>
    </ResponsiveContainer>
    <NotesPanel notes={revNotes} />
  </>
);

// ---- Chart 6: Gold by continent ----
const GoldChart = () => (
  <>
    <ChartHeader
      title="Gold mine production by continent"
      subtitle="Share of world primary production"
      unit="%"
    />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <AreaChart data={goldData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }} stackOffset="expand">
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis {...axisStyle} tick={{ fill: C.dim }} tickFormatter={(v) => `${Math.round(v * 100)}%`} />
        <Tooltip {...tooltipStyle} formatter={(v) => `${v}%`} />
        <Legend wrapperStyle={{ color: C.text, fontSize: 11 }} />
        <Area type="monotone" dataKey="africa" name="Africa" stackId="1" stroke={C.rust} fill={C.rust} fillOpacity={0.9} />
        <Area type="monotone" dataKey="asiaoc" name="Asia & Oceania" stackId="1" stroke={C.gold} fill={C.gold} fillOpacity={0.9} />
        <Area type="monotone" dataKey="namerica" name="North America" stackId="1" stroke={C.copper} fill={C.copper} fillOpacity={0.9} />
        <Area type="monotone" dataKey="samerica" name="South America" stackId="1" stroke={C.teal} fill={C.teal} fillOpacity={0.9} />
        <Area type="monotone" dataKey="europe" name="Europe" stackId="1" stroke={C.slate} fill={C.slate} fillOpacity={0.9} />
        {goldNotes.map(note => (
          <ReferenceDot
            key={note.n}
            x={note.year}
            y={0.95}
            r={11}
            fill={C.marker}
            stroke={C.ink}
            strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
    <NotesPanel notes={goldNotes} />
  </>
);

// ---- Chart 7: Copper by continent ----
const CopperChart = () => (
  <>
    <ChartHeader
      title="Copper mine production by continent"
      subtitle="Share of world primary production"
      unit="%"
    />
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <AreaChart data={copperData} margin={{ top: 30, right: 12, left: 0, bottom: 4 }} stackOffset="expand">
        <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="year" {...axisStyle} tick={{ fill: C.dim }} />
        <YAxis {...axisStyle} tick={{ fill: C.dim }} tickFormatter={(v) => `${Math.round(v * 100)}%`} />
        <Tooltip {...tooltipStyle} formatter={(v) => `${v}%`} />
        <Legend wrapperStyle={{ color: C.text, fontSize: 11 }} />
        <Area type="monotone" dataKey="samerica" name="South America" stackId="1" stroke={C.copper} fill={C.copper} fillOpacity={0.9} />
        <Area type="monotone" dataKey="africa" name="Africa" stackId="1" stroke={C.rust} fill={C.rust} fillOpacity={0.9} />
        <Area type="monotone" dataKey="asia" name="Asia" stackId="1" stroke={C.gold} fill={C.gold} fillOpacity={0.9} />
        <Area type="monotone" dataKey="namerica" name="North America" stackId="1" stroke={C.teal} fill={C.teal} fillOpacity={0.9} />
        <Area type="monotone" dataKey="europe" name="Europe" stackId="1" stroke={C.slate} fill={C.slate} fillOpacity={0.9} />
        <Area type="monotone" dataKey="oceania" name="Oceania" stackId="1" stroke={C.forest} fill={C.forest} fillOpacity={0.9} />
        {copperNotes.map(note => (
          <ReferenceDot
            key={note.n}
            x={note.year}
            y={0.95}
            r={11}
            fill={C.marker}
            stroke={C.ink}
            strokeWidth={2}
            label={{ value: String(note.n), fill: C.ink, fontSize: 11, fontWeight: 700 }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
    <NotesPanel notes={copperNotes} />
  </>
);

// ---- Combined view (small multiples) ----
const CombinedView = () => {
  const small = 160;
  const SmallCard = ({ title, children }) => (
    <div className="rounded-md p-3" style={{ background: C.ink, border: `1px solid ${C.border}` }}>
      <div className="text-xs font-semibold mb-1" style={{ color: C.gold, fontFamily: 'ui-monospace, monospace' }}>
        {title}
      </div>
      <div style={{ height: small }}>{children}</div>
    </div>
  );

  return (
    <>
      <ChartHeader
        title="Combined view"
        subtitle="All seven trends, 1950 → 2025"
        unit="small multiples — see individual tabs for annotations"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
        <SmallCard title="1 · Mine count (open cut + underground)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mineData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
              <XAxis dataKey="year" tick={{ fill: C.dim, fontSize: 9 }} stroke={C.dim} />
              <YAxis tick={{ fill: C.dim, fontSize: 9 }} stroke={C.dim} />
              <Bar dataKey="openCut" stackId="a" fill={C.ochre} />
              <Bar dataKey="underground" stackId="a" fill={C.copper} />
            </BarChart>
          </ResponsiveContainer>
        </SmallCard>

        <SmallCard title="2 · Gold AISC (A$2025 / oz)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={aiscData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
              <XAxis dataKey="year" tick={{ fill: C.dim, fontSize: 9 }} stroke={C.dim} />
              <YAxis tick={{ fill: C.dim, fontSize: 9 }} stroke={C.dim} />
              <Line type="monotone" dataKey="oc" stroke={C.ochre} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="ug" stroke={C.copper} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </SmallCard>

        <SmallCard title="3 · Unit mining cost (A$2025 / t)">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={costData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
              <XAxis dataKey="year" tick={{ fill: C.dim, fontSize: 9 }} stroke={C.dim} />
              <YAxis yAxisId="oc" tick={{ fill: C.ochre, fontSize: 9 }} stroke={C.dim} />
              <YAxis yAxisId="ug" orientation="right" tick={{ fill: C.copper, fontSize: 9 }} stroke={C.dim} />
              <Line yAxisId="oc" type="monotone" dataKey="oc" stroke={C.ochre} strokeWidth={2} dot={false} />
              <Line yAxisId="ug" type="monotone" dataKey="ug" stroke={C.copper} strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </SmallCard>

        <SmallCard title="4 · UG method share">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={methodData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }} stackOffset="expand">
              <XAxis dataKey="year" tick={{ fill: C.dim, fontSize: 9 }} stroke={C.dim} />
              <YAxis tick={{ fill: C.dim, fontSize: 9 }} stroke={C.dim} tickFormatter={(v) => `${Math.round(v * 100)}`} />
              <Area dataKey="other" stackId="1" stroke={C.slate} fill={C.slate} fillOpacity={0.85} />
              <Area dataKey="slc" stackId="1" stroke={C.ochre} fill={C.ochre} fillOpacity={0.85} />
              <Area dataKey="block" stackId="1" stroke={C.copper} fill={C.copper} fillOpacity={0.85} />
            </AreaChart>
          </ResponsiveContainer>
        </SmallCard>

        <SmallCard title="5 · AU revenue by commodity (A$B 2025)">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
              <XAxis dataKey="year" tick={{ fill: C.dim, fontSize: 9 }} stroke={C.dim} />
              <YAxis tick={{ fill: C.dim, fontSize: 9 }} stroke={C.dim} />
              <Area dataKey="iron" stackId="1" stroke={C.rust} fill={C.rust} />
              <Area dataKey="gold" stackId="1" stroke={C.gold} fill={C.gold} />
              <Area dataKey="copper" stackId="1" stroke={C.copper} fill={C.copper} />
              <Area dataKey="lithium" stackId="1" stroke={C.teal} fill={C.teal} />
              <Area dataKey="basemetals" stackId="1" stroke={C.slate} fill={C.slate} />
              <Area dataKey="bauxite" stackId="1" stroke={C.ochre} fill={C.ochre} />
              <Area dataKey="other" stackId="1" stroke={C.plum} fill={C.plum} />
            </AreaChart>
          </ResponsiveContainer>
        </SmallCard>

        <SmallCard title="6 · World gold production by continent">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={goldData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }} stackOffset="expand">
              <XAxis dataKey="year" tick={{ fill: C.dim, fontSize: 9 }} stroke={C.dim} />
              <YAxis tick={{ fill: C.dim, fontSize: 9 }} stroke={C.dim} tickFormatter={(v) => `${Math.round(v * 100)}`} />
              <Area dataKey="africa" stackId="1" stroke={C.rust} fill={C.rust} />
              <Area dataKey="asiaoc" stackId="1" stroke={C.gold} fill={C.gold} />
              <Area dataKey="namerica" stackId="1" stroke={C.copper} fill={C.copper} />
              <Area dataKey="samerica" stackId="1" stroke={C.teal} fill={C.teal} />
              <Area dataKey="europe" stackId="1" stroke={C.slate} fill={C.slate} />
            </AreaChart>
          </ResponsiveContainer>
        </SmallCard>

        <SmallCard title="7 · World copper production by continent">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={copperData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }} stackOffset="expand">
              <XAxis dataKey="year" tick={{ fill: C.dim, fontSize: 9 }} stroke={C.dim} />
              <YAxis tick={{ fill: C.dim, fontSize: 9 }} stroke={C.dim} tickFormatter={(v) => `${Math.round(v * 100)}`} />
              <Area dataKey="samerica" stackId="1" stroke={C.copper} fill={C.copper} />
              <Area dataKey="africa" stackId="1" stroke={C.rust} fill={C.rust} />
              <Area dataKey="asia" stackId="1" stroke={C.gold} fill={C.gold} />
              <Area dataKey="namerica" stackId="1" stroke={C.teal} fill={C.teal} />
              <Area dataKey="europe" stackId="1" stroke={C.slate} fill={C.slate} />
              <Area dataKey="oceania" stackId="1" stroke={C.forest} fill={C.forest} />
            </AreaChart>
          </ResponsiveContainer>
        </SmallCard>

        <SmallCard title="Reading the small multiples">
          <div className="text-xs leading-relaxed pt-1" style={{ color: C.dim }}>
            Three structural shifts dominate every panel:
            the <span style={{ color: C.ochre }}>open-cut iron-ore era</span> from
            ~1966, the <span style={{ color: C.gold }}>China supercycle</span> from
            ~2003, and the <span style={{ color: C.teal }}>energy-transition pivot</span> from
            ~2017. Each leaves a fingerprint on cost curves, mine counts, and
            revenue mix simultaneously.
          </div>
        </SmallCard>
      </div>
    </>
  );
};

const ChartHeader = ({ title, subtitle, unit }) => (
  <div className="mb-1">
    <h2 className="text-xl font-semibold tracking-tight" style={{ color: C.text, fontFamily: "'Fraunces', Georgia, serif" }}>
      {title}
    </h2>
    <div className="text-sm" style={{ color: C.dim }}>{subtitle}</div>
    <div className="text-xs uppercase tracking-widest mt-1" style={{ color: C.gold, fontFamily: 'ui-monospace, monospace' }}>
      {unit}
    </div>
  </div>
);

// ============ MAIN ============
const App = () => {
  const [tab, setTab] = useState('mines');

  const tabs = [
    { id: 'mines',    label: '1 · Mine count' },
    { id: 'aisc',     label: '2 · AISC' },
    { id: 'cost',     label: '3 · Mining cost' },
    { id: 'method',   label: '4 · UG method' },
    { id: 'rev',      label: '5 · AU revenue' },
    { id: 'gold',     label: '6 · Gold by region' },
    { id: 'copper',   label: '7 · Copper by region' },
    { id: 'combined', label: '◆ Combined' },
  ];

  return (
    <div
      style={{
        background: C.bg,
        color: C.text,
        minHeight: '100vh',
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
      className="p-4 sm:p-6"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700&display=swap');
      `}</style>

      <header className="mb-5 max-w-5xl mx-auto">
        <div className="text-xs uppercase tracking-[0.25em] mb-1" style={{ color: C.gold, fontFamily: 'ui-monospace, monospace' }}>
          1950 → 2025 · Australian metal mining
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold leading-tight" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
          Seven trends, seventy-five years.
        </h1>
        <p className="text-sm mt-2 max-w-2xl" style={{ color: C.dim }}>
          Indicative trends compiled from industry knowledge, not precise historical statistics.
          AISC was only standardised by the World Gold Council in <span style={{ color: C.gold }}>2013</span> —
          earlier values are back-cast from cash-cost reporting. Mine counts cover medium &amp; large
          metal mines (excludes coal &amp; quarries; iron ore included). Numbered markers tie to
          callouts beneath each chart.
        </p>
      </header>

      {/* Tab strip */}
      <nav
        className="max-w-5xl mx-auto mb-4 flex gap-1 overflow-x-auto pb-2"
        style={{ borderBottom: `1px solid ${C.border}` }}
      >
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="px-3 py-2 text-xs whitespace-nowrap rounded-t transition-colors"
            style={{
              background: tab === t.id ? C.card : 'transparent',
              color: tab === t.id ? C.gold : C.dim,
              borderBottom: tab === t.id ? `2px solid ${C.gold}` : '2px solid transparent',
              fontWeight: tab === t.id ? 600 : 400,
              fontFamily: 'ui-monospace, monospace',
            }}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main
        className="max-w-5xl mx-auto rounded-lg p-4 sm:p-6"
        style={{ background: C.card, border: `1px solid ${C.border}` }}
      >
        {tab === 'mines'    && <MineChart />}
        {tab === 'aisc'     && <AiscChart />}
        {tab === 'cost'     && <CostChart />}
        {tab === 'method'   && <MethodChart />}
        {tab === 'rev'      && <RevChart />}
        {tab === 'gold'     && <GoldChart />}
        {tab === 'copper'   && <CopperChart />}
        {tab === 'combined' && <CombinedView />}
      </main>

      <footer className="max-w-5xl mx-auto mt-4 text-xs" style={{ color: C.dim, fontFamily: 'ui-monospace, monospace' }}>
        Sources: directional trends synthesised from publicly known industry events; figures illustrative.
        For decision-grade data: ABS, Geoscience Australia, S&amp;P Global / WoodMac, USGS, World Gold Council.
      </footer>
    </div>
  );
};

export default App;
