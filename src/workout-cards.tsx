import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Shield, ArrowUp, ArrowDown, Activity, ChevronDown, Target, CheckCircle2 } from "lucide-react";

type Progression = {
  title: string;
  how: string;
  goal?: string;
  cues?: string[];
};

type Exercise = {
  name: string;
  prescription: string;
  how: string;
  focus?: string;
  progressions?: Progression[];
  tips?: string[];
};

type SkillDefinition = {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  focus: string;
  prescription: string;
  progressions: Progression[];
  tips: string[];
};

type WorkoutCard = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  warmup: Exercise[];
  strength: Exercise[];
  core: Exercise[];
};

const beginnerSkills: SkillDefinition[] = [
  {
    id: "lsit",
    label: "L-sit",
    shortLabel: "L-sit",
    description:
      "Cílem je vybudovat kompresi, sílu flexorů kyčlí a oporu v ramenou. Nemusíš hned držet plný L-sit ve vzduchu.",
    focus: "Beginner regression cesta k L-situ",
    prescription: "Skill blok 8–10 min",
    progressions: [
      {
        title: "1. Tuck support s chodidly lehce na zemi",
        how: "Opři se o dvě pevné opory nebo paraletky, zatlač ramena dolů od uší a zvedni boky. Chodidla nech jen lehce pomáhat na zemi.",
        goal: "Naučit se oporu v ramenou a nést váhu v rukách.",
        cues: ["Hlavní váha je v dlaních.", "Nevysedávej do ramen.", "Když je to těžké, pomáhej si jen špičkami."],
      },
      {
        title: "2. Seated leg lifts",
        how: "Sedni si na zem s nohama před sebou. Ruce dej vedle boků a zvedej jednu nebo obě nohy jen kousek nad zem.",
        goal: "Síla flexorů kyčlí a komprese.",
        cues: ["Nehrb se úplně.", "Radši malé čisté zvednutí než švih.", "Zkus výdech při zvednutí nohou."],
      },
      {
        title: "3. Compression hold v sedě",
        how: "Sedni si s nataženýma nohama, ruce dej vedle stehen a snaž se odlehčit paty nebo je zvednout pár milimetrů od země.",
        goal: "Aktivní komprese pro L-sit.",
        cues: ["Tlač ruce do země.", "Hrudník drž co nejvíc nahoře.", "Kratší kvalitní hold je lepší než dlouhý špatný."],
      },
      {
        title: "4. Tuck support bez pomoci chodidel",
        how: "Zvedni tělo do tuck supportu a zkus krátce držet bez dotyku chodidel o zem. Kolena zůstávají pokrčená u těla.",
        goal: "První skutečné držení ve vzduchu.",
        cues: ["Ramena tlač dolů.", "Nohy drž co nejblíž k tělu.", "Drž krátce, ale čistě."],
      },
      {
        title: "5. Single-leg L-sit regression",
        how: "Z tuck supportu nebo sedu zkus jednu nohu více natáhnout dopředu a druhou nechat pokrčenou. Střídej strany.",
        goal: "Most mezi tuck variantou a plným L-sitem.",
        cues: ["Jen když jsou předchozí kroky stabilní.", "Nevytáčej boky do strany.", "Krátké pokusy úplně stačí."],
      },
    ],
    tips: [
      "Tlač ramena dolů od uší.",
      "Nehorbi se úplně, zkus držet hrudník co nejvíc nahoře.",
      "Kratší čisté držení je lepší než dlouhé špatné.",
    ],
  },
  {
    id: "headstand",
    label: "Headstand",
    shortLabel: "Headstand",
    description:
      "Cílem je naučit se bezpečnou inverzi, oporu přes předloktí a kontrolu těla vzhůru nohama. Nejde o dlouhé držení za každou cenu.",
    focus: "Beginner regression cesta k headstandu",
    prescription: "Skill blok 8–10 min",
    progressions: [
      {
        title: "1. Dolphin hold",
        how: "Opři se o předloktí, zvedni boky vysoko a nastav se do obráceného V. Tlač ramena od podlahy a drž zpevněný střed těla.",
        goal: "Síla ramen a jistota na předloktích.",
        cues: ["Lokty drž na šířku ramen.", "Netlač všechnu váhu do hlavy.", "Drž krátké čisté intervaly."],
      },
      {
        title: "2. Tripod setup bez zvedání nohou",
        how: "Dlaně dej na zem, hlavu polož lehce mezi ně a jen si zkus najít stabilní trojbodovou oporu. Nohy zůstávají na zemi.",
        goal: "Pochopit bezpečné postavení rukou a hlavy.",
        cues: ["Krk drž neutrálně.", "Netlač prudce do hlavy.", "Zatěžuj i ruce, nejen hlavu."],
      },
      {
        title: "3. Tuck entry s nohama blízko těla",
        how: "Z tripod setupu přibliž chodidla k tělu, kolena jemně opři o paže a zkus lehce odlehčit jednu nohu a pak druhou.",
        goal: "První pocit balancu v inverzi.",
        cues: ["Dívej se klidně do jednoho bodu.", "Nespěchej do plného zvednutí.", "Měj kolem sebe měkkou podložku."],
      },
      {
        title: "4. Tuck headstand krátké držení",
        how: "Obě nohy zvedni do tuck pozice a na pár sekund drž stabilní pozici. Lokty i dlaně aktivně tlačí do země.",
        goal: "Krátké kontrolované držení bez paniky.",
        cues: ["Kolena drž blízko hrudníku.", "Tlač do země předloktími nebo dlaněmi.", "Slez dolů dřív, než ztratíš kontrolu."],
      },
      {
        title: "5. Tuck to straighter line",
        how: "Až je tuck jistý, pomalu zkoušej zvedat boky výš a narovnávat tělo víc do linie. Jen do bodu, kde máš kontrolu.",
        goal: "Plynulý most mezi tuck variantou a plnějším headstandem.",
        cues: ["Nepřecházej dál bez jistoty v tuck hold.", "Pohyb nahoru dělej pomalu.", "Po každém pokusu si krátce odpočiň."],
      },
    ],
    tips: [
      "Cvič na měkké podložce nebo koberci.",
      "Váhu nesmí nést jen hlava — aktivně tlač i rukama.",
      "Když cítíš tlak v krku, vrať se na lehčí krok.",
    ],
  },
  {
    id: "crow",
    label: "Crow pose",
    shortLabel: "Crow",
    description:
      "Cílem je naučit se přenášet těžiště dopředu a věřit rukám. Zatím nejde o dlouhé držení finální crow pose, ale o bezpečný nácvik rovnováhy.",
    focus: "Beginner regression cesta ke crow pose",
    prescription: "Skill blok 8–10 min",
    progressions: [
      {
        title: "1. Přenášení váhy dopředu na dlaně",
        how: "V nízkém dřepu dej ruce na zem a pomalu přenášej těžiště dopředu přes dlaně a zase zpět. Prsty aktivně tlač do podlahy.",
        goal: "Pochopit, jak funguje těžiště nad rukama.",
        cues: ["Dívej se lehce před sebe.", "Pohyb dělej pomalu.", "Prsty používáš jako brzdu proti pádu dopředu."],
      },
      {
        title: "2. Frog stand s prsty na zemi",
        how: "Kolena opři o paže, ruce dej na zem a přenes váhu dopředu. Prsty nohou zatím nech na zemi jako pojistku.",
        goal: "První stabilní pozice blízko crow pose.",
        cues: ["Lokty drž pevné, ale ne zamčené.", "Nevysazuj zadek moc vysoko.", "Neboj se jít trochu dopředu."],
      },
      {
        title: "3. Frog stand krátké odlepení",
        how: "Ze stejné pozice zkus na 1–2 sekundy odlepit obě chodidla od země a hned je zase vrátit.",
        goal: "První moment skutečné rovnováhy.",
        cues: ["Stačí opravdu krátké odlepení.", "Drž pohled před sebou.", "Měj před hlavou polštář nebo podložku."],
      },
      {
        title: "4. Frog stand hold",
        how: "Postupně prodlužuj držení frog standu bez dotyku nohou o zem. Soustřeď se na klid a jemnou kontrolu přes prsty.",
        goal: "Stabilní balance na rukách několik sekund.",
        cues: ["Dýchej krátce a klidně.", "Prsty pořád aktivně tlačí do země.", "Když cítíš pád, kontrolovaně polož nohy zpět."],
      },
      {
        title: "5. Přechod blíž ke crow pose",
        how: "Až je frog stand jistý, zkoušej jemně upravovat pozici kolen a těla směrem k crow pose. Není kam spěchat.",
        goal: "Plynulý přechod k finálnějšímu tvaru skillu.",
        cues: ["Jen když jsou předchozí kroky bezpečné.", "Neřeš délku držení, ale kontrolu.", "Když se ztrácí jistota, vrať se o krok zpět."],
      },
    ],
    tips: [
      "Dívej se lehce před sebe, ne přímo pod sebe.",
      "Prsty aktivně zatlač do země, pomáhají brzdit pád dopředu.",
      "Ze začátku si dej před hlavu polštář nebo podložku pro jistotu.",
    ],
  },
];

const workoutCards: WorkoutCard[] = [
  {
    id: "card-1",
    title: "CARD 1 — Den A",
    icon: ArrowUp,
    warmup: [
      {
        name: "Kroužení ramen",
        prescription: "20 s",
        how: "Postav se rovně, ruce volně podél těla. Dělej pomalé velké kruhy rameny dopředu a potom dozadu. Nezvedej ramena k uším.",
        focus: "Ramena a prokrvení horní části těla",
      },
      {
        name: "Kroužení zápěstí",
        prescription: "20 s",
        how: "Sepni dlaně nebo natáhni ruce před sebe a krouž zápěstím na obě strany. Pohyb dělej plynule bez bolesti.",
        focus: "Příprava zápěstí na oporu o zem",
      },
      {
        name: "Panák",
        prescription: "20×",
        how: "Z lehkého stoje vyskoč do roznožení a současně dej ruce nad hlavu. Vrať se zpět do stoje a opakuj v rytmu.",
        focus: "Zahřátí celého těla",
      },
      {
        name: "Cat-cow",
        prescription: "8×",
        how: "Jdi na všechny čtyři. Jednou vyhrb záda a zasuň bradu, potom se plynule prohni a otevři hrudník. Pohyb veď přes páteř.",
        focus: "Mobilita páteře a ramen",
      },
      {
        name: "Scapula push-ups",
        prescription: "10×",
        how: "Jdi do vysokého prkna. Lokty nech propnuté a pohybuj jen lopatkami: jednou se od země vytlač, potom se mezi rameny lehce propadni. Tělo drž rovně.",
        focus: "Stabilita lopatek a ramen",
      },
    ],
    strength: [
      {
        name: "Shyby",
        prescription: "4× 3–4",
        how: "Chyť hrazdu nadhmatem asi na šířku ramen. Stáhni lopatky dolů, zpevni břicho a přitáhni hrudník směrem k hrazdě. Spouštěj se kontrolovaně dolů.",
        focus: "Pull 1 — záda, bicepsy, síla tahu",
      },
      {
        name: "Chin-up hold (podhmat)",
        prescription: "3× 10–20 s",
        how: "Vyskoč nebo se vytáhni do horní pozice podhmatového shybu a zkus chvíli držet bradu nad hrazdou. Ramena drž stažená dolů a nehoupej se.",
        focus: "Biceps — síla v horní pozici tahu",
      },
      {
        name: "Kliky",
        prescription: "3× 8–12",
        how: "Ruce dej zhruba pod ramena, tělo drž v jedné linii. Jdi hrudníkem dolů mezi ruce a pak se vytlač zpět nahoru. Lokty nesměruj úplně do stran.",
        focus: "Push 1 — hrudník, ramena, tricepsy",
      },
      {
        name: "Pike push-ups",
        prescription: "3× 6–8",
        how: "Nastav se do obráceného V, zadek nahoře. Pokrč lokty a spouštěj hlavu směrem mezi ruce, pak se vytlač zpět nahoru. Drž zpevněný střed těla.",
        focus: "Push 2 — ramena a tlak nad hlavou",
      },
      {
        name: "Dřepy s vlastní vahou",
        prescription: "3× 12–15",
        how: "Stoupni si na šířku ramen, špičky lehce ven. Jdi boky dozadu a dolů, jako by sis chtěl sednout na židli. Kolena směřují přibližně ve směru špiček, pak se vrať nahoru.",
        focus: "Legs — nohy a základní mobilita",
      },
      {
        name: "Dead hang",
        prescription: "2× 20–30 s",
        how: "Pověs se na hrazdu až úplně na konec silové části. Drž pevný úchop, ramena nech dlouhá a zůstaň bez zbytečného houpání.",
        focus: "Grip finisher — úchop, předloktí a tolerance visu",
      },
    ],
    core: [
      {
        name: "Hollow hold",
        prescription: "3× 15–25 s",
        how: "Lehni si na záda, přitiskni bedra do země, lehce zvedni ramena i nohy a drž tělo pevné. Když je to těžké, pokrč nohy nebo drž ruce blíž u těla.",
        focus: "Core a napětí celého těla",
      },
    ],
  },
  {
    id: "card-2",
    title: "CARD 2 — Den B",
    icon: Shield,
    warmup: [
      {
        name: "Kroužení ramen",
        prescription: "20 s",
        how: "Dělej velké kontrolované kruhy rameny dopředu a dozadu. Uvolni krk a nehrb se.",
        focus: "Příprava ramen na tah i tlak",
      },
      {
        name: "Zápěstí",
        prescription: "20 s",
        how: "Promni a rozhýbej zápěstí kroužením a jemným přenášením váhy přes dlaně. Nic netlač přes bolest.",
        focus: "Zahřátí pro oporu o ruce",
      },
      {
        name: "Úklony do stran",
        prescription: "8×",
        how: "Stůj rovně, jednu ruku dej nad hlavu a ukláněj se do strany. Potom vystřídej stranu. Pohyb veď plynule.",
        focus: "Uvolnění trupu a boků",
      },
      {
        name: "Lehké kliky",
        prescription: "10×",
        how: "Udělej lehkou variantu kliku, třeba o lavičku nebo ze zvýšené opory. Jde jen o zahřátí, ne o těžkou sérii.",
        focus: "Aktivace tlaku",
      },
      {
        name: "Scapula pull-ups / aktivní vis",
        prescription: "8×",
        how: "Vis na hrazdě a bez krčení loktů stáhni lopatky dolů, potom povol. Když je to moc těžké, dělej aktivní vis s nohama lehce na zemi.",
        focus: "Aktivace pro tahové cviky",
      },
    ],
    strength: [
      {
        name: "Kliky",
        prescription: "4× 8–12",
        how: "Ruce dej zhruba pod ramena, tělo drž v jedné linii. Jdi hrudníkem dolů mezi ruce a pak se vytlač zpět nahoru. Lokty nesměruj úplně do stran.",
        focus: "Push 1 — hrudník, ramena, tricepsy",
      },
      {
        name: "Dipy na lavičce / mezi dvěma oporami",
        prescription: "3× 6–10",
        how: "Opři ruce za tělem o lavičku nebo dvě pevné opory. Spusť tělo dolů kontrolovaně, ramena netahej k uším, a potom se vytlač nahoru. Když to tahá v ramenou, uber hloubku.",
        focus: "Push 2 — tricepsy a tlaková síla",
      },
      {
        name: "Band-assisted shyby nebo negativní shyby",
        prescription: "3× 4–6",
        how: "Použij gumu nebo vyskoč do horní pozice a pomalu se spouštěj dolů. Snaž se držet ramena stabilní a tělo bez houpání.",
        focus: "Pull 1 — lehčí tahový objem",
      },
      {
        name: "Negativní chin-ups (podhmat)",
        prescription: "3× 3–5",
        how: "Vyskoč do horní pozice podhmatového shybu a potom se spouštěj co nejpomaleji dolů. Každé opakování dělej čistě bez houpání.",
        focus: "Biceps — kontrola excentrické fáze tahu",
      },
      {
        name: "Výpady dozadu",
        prescription: "3× 8–10 / noha",
        how: "Ze stoje udělej jednou nohou krok dozadu a jdi kolenem dolů. Přední chodidlo drž celé na zemi, potom se odraz zpět do stoje. Střídej nohy.",
        focus: "Legs — nohy a stabilita",
      },
      {
        name: "Dead hang",
        prescription: "2× 20–30 s",
        how: "Pověs se na hrazdu až úplně na konec silové části. Drž pevný úchop a dýchej klidně, bez zbytečného houpání.",
        focus: "Grip finisher — úchop, předloktí a tolerance visu",
      },
    ],
    core: [
      {
        name: "Dead bug",
        prescription: "3× 8–10 / strana",
        how: "Lehni si na záda, ruce i nohy dej nahoru. Pomalu spouštěj opačnou ruku a nohu k zemi a vrať je zpět. Bedra nesmí odlepovat od podložky.",
        focus: "Core — stabilita středu těla",
      },
    ],
  },
  {
    id: "card-3",
    title: "CARD 3 — Den C",
    icon: Dumbbell,
    warmup: [
      {
        name: "Panák",
        prescription: "20×",
        how: "Skákej z postoje snožmo do roznožení a zvedej ruce nad hlavu. Drž lehké tempo, ať se zahřeješ, ale nevyčerpáš.",
        focus: "Celkové zahřátí",
      },
      {
        name: "Kroužení ramen",
        prescription: "20 s",
        how: "Pomalé velké kruhy rameny dopředu a dozadu, bez napětí v krku.",
        focus: "Ramena",
      },
      {
        name: "Kroužení zápěstí",
        prescription: "20 s",
        how: "Rozhýbej zápěstí na obě strany, případně jemně přenes váhu přes dlaně na zemi.",
        focus: "Zápěstí",
      },
      {
        name: "Cat-cow",
        prescription: "8×",
        how: "Na všech čtyřech střídej vyhrbení a prohnutí zad. Pohyb veď přes celou páteř.",
        focus: "Páteř a trup",
      },
      {
        name: "Předklon do hlubokého dřepu",
        prescription: "10×",
        how: "Z předklonu k nohám přejdi do hlubokého dřepu a zase zpět nahoru. Pohyb dělej plynule a bez spěchu.",
        focus: "Mobilita boků, kotníků a zad",
      },
    ],
    strength: [
      {
        name: "Shyby",
        prescription: "3× 3–4",
        how: "Chyť hrazdu nadhmatem, stáhni ramena dolů a vytáhni se nahoru bez houpání. Dole se kontrolovaně spusť, ale nepadni.",
        focus: "Pull 1 — tahová síla horní části těla",
      },
      {
        name: "Chin-ups podhmatem",
        prescription: "3× 4–6",
        how: "Chyť hrazdu podhmatem na šířku ramen, zpevni střed těla a vytáhni se nahoru bez švihu. Když nedáš plný rozsah, udělej jen tolik čistých opakování, kolik zvládneš.",
        focus: "Biceps — tah v podhmatu s větším důrazem na paže",
      },
      {
        name: "Kliky",
        prescription: "3× 8–12",
        how: "Tělo drž rovné od hlavy po paty. Jdi dolů kontrolovaně a vytlač se zpět nahoru bez propadu v bedrech.",
        focus: "Push 1 — tlaková síla",
      },
      {
        name: "Pike push-ups",
        prescription: "3× 6–8",
        how: "Nastav se do obráceného V, zadek nahoře. Pokrč lokty a spouštěj hlavu směrem mezi ruce, pak se vytlač zpět nahoru.",
        focus: "Push 2 — ramena a vertikální tlak",
      },
      {
        name: "Glute bridge",
        prescription: "3× 12–15",
        how: "Lehni si na záda, chodidla dej blíž k zadku. Zatlač paty do země, zvedni pánev nahoru a nahoře zatni hýždě. Potom se pomalu vrať dolů.",
        focus: "Legs — hýždě a zadní řetězec",
      },
      {
        name: "Dead hang",
        prescription: "2× 20–30 s",
        how: "Pověs se na hrazdu až úplně na konec silové části. Sevři hrazdu pevně a drž tělo bez zbytečného houpání.",
        focus: "Grip finisher — úchop, předloktí a opora ve visu",
      },
    ],
    core: [
      {
        name: "Hanging knee raises nebo zvedání kolen vleže",
        prescription: "3× 8–12",
        how: "Když máš hrazdu, ve visu zvedej kolena k hrudníku bez švihu. Když ne, dělej stejný pohyb vleže na zádech a vracej nohy pomalu zpět.",
        focus: "Core — spodní břicho a kontrola pánve",
      },
    ],
  },
];

const accentClasses = {
  slate: "open:bg-slate-100/80",
  sky: "open:bg-sky-100/80",
  emerald: "open:bg-emerald-100/80",
  amber: "open:bg-amber-100/80",
} as const;

type Accent = keyof typeof accentClasses;
type SectionKey = "warmup" | "strength" | "core";
type CardExerciseOrder = Record<SectionKey, string[]>;
type ExerciseOrderState = Record<string, CardExerciseOrder>;

const exerciseOrderStorageKey = "workout-cards.exercise-order.v2";
const reorderableSections: SectionKey[] = ["warmup", "strength", "core"];

function buildExerciseId(cardId: string, section: SectionKey, index: number) {
  return `${cardId}:${section}:${index}`;
}

function getDefaultExerciseOrder(): ExerciseOrderState {
  return workoutCards.reduce<ExerciseOrderState>((acc, card) => {
    acc[card.id] = {
      warmup: card.warmup.map((_, index) => buildExerciseId(card.id, "warmup", index)),
      strength: card.strength.map((_, index) => buildExerciseId(card.id, "strength", index)),
      core: card.core.map((_, index) => buildExerciseId(card.id, "core", index)),
    };
    return acc;
  }, {});
}

function normalizeExerciseOrder(input: unknown): ExerciseOrderState {
  const defaultOrder = getDefaultExerciseOrder();

  if (!input || typeof input !== "object") {
    return defaultOrder;
  }

  const value = input as Record<string, Partial<Record<SectionKey, unknown>>>;

  for (const card of workoutCards) {
    for (const section of reorderableSections) {
      const fallback = defaultOrder[card.id][section];
      const candidate = value[card.id]?.[section];

      if (!Array.isArray(candidate)) {
        continue;
      }

      const cleaned = candidate.filter((item): item is string => typeof item === "string");
      const validIds = new Set(fallback);
      const dedupedValid = cleaned.filter((id, index) => validIds.has(id) && cleaned.indexOf(id) === index);
      const missing = fallback.filter((id) => !dedupedValid.includes(id));

      defaultOrder[card.id][section] = [...dedupedValid, ...missing];
    }
  }

  return defaultOrder;
}

function loadExerciseOrder(): ExerciseOrderState {
  if (typeof window === "undefined") {
    return getDefaultExerciseOrder();
  }

  try {
    const raw = window.localStorage.getItem(exerciseOrderStorageKey);
    return raw ? normalizeExerciseOrder(JSON.parse(raw)) : getDefaultExerciseOrder();
  } catch {
    return getDefaultExerciseOrder();
  }
}

function ProgressionItem({ step }: { step: Progression }) {
  return (
    <details className="group rounded-xl border border-sky-200 bg-white/80 shadow-sm transition open:bg-white">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-3 p-3 sm:p-4">
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-slate-900">{step.title}</div>
          {step.goal && <div className="mt-1 text-xs text-sky-800 sm:text-sm">{step.goal}</div>}
        </div>
        <div className="mt-0.5 shrink-0 rounded-full bg-sky-100 p-2 transition group-open:rotate-180">
          <ChevronDown className="h-4 w-4 text-sky-700" />
        </div>
      </summary>

      <div className="border-t border-sky-200 px-3 pb-3 pt-3 sm:px-4 sm:pb-4">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Jak to udělat</div>
        <p className="text-sm leading-relaxed text-slate-700">{step.how}</p>

        {step.cues && step.cues.length > 0 && (
          <div className="mt-3 rounded-xl bg-sky-50 p-3">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-sky-900">Na co myslet</div>
            <ul className="space-y-2 text-sm text-slate-700">
              {step.cues.map((cue) => (
                <li key={cue} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                  <span>{cue}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </details>
  );
}

function ExerciseItem({
  exercise,
  accent = "slate",
  moveControls,
}: {
  exercise: Exercise;
  accent?: Accent;
  moveControls?: React.ReactNode;
}) {
  return (
    <details className={`group rounded-2xl border border-slate-200 bg-white/80 p-0 shadow-sm transition ${accentClasses[accent]}`}>
      <summary className="flex cursor-pointer list-none items-start justify-between gap-3 p-4 sm:p-5">
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-slate-900 sm:text-base">{exercise.name}</div>
          <div className="mt-1 text-sm text-slate-600">{exercise.prescription}</div>
        </div>
        <div className="ml-2 flex shrink-0 items-center gap-2">
          {moveControls}
          <div className="rounded-full bg-slate-100 p-2 transition group-open:rotate-180">
            <ChevronDown className="h-4 w-4 text-slate-600" />
          </div>
        </div>
      </summary>

      <div className="border-t border-slate-200 px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Jak to udělat</div>
        <p className="text-sm leading-relaxed text-slate-700">{exercise.how}</p>

        {exercise.progressions && exercise.progressions.length > 0 && (
          <div className="mt-4 rounded-2xl border border-sky-200 bg-sky-50 p-3 sm:p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-sky-900">
              <Target className="h-4 w-4" />
              Progrese krok za krokem
            </div>
            <div className="space-y-3">
              {exercise.progressions.map((step) => (
                <ProgressionItem key={step.title} step={step} />
              ))}
            </div>
          </div>
        )}

        {exercise.tips && exercise.tips.length > 0 && (
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-3 sm:p-4">
            <div className="mb-2 text-sm font-semibold text-amber-900">Na co myslet</div>
            <ul className="space-y-2 text-sm leading-relaxed text-slate-700">
              {exercise.tips.map((tip) => (
                <li key={tip} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {exercise.focus && (
          <div className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-600 sm:text-sm">
            <span className="font-semibold text-slate-700">Co tím trénuješ:</span> {exercise.focus}
          </div>
        )}
      </div>
    </details>
  );
}

function Section({
  title,
  items,
  tone = "bg-white/70",
  accent = "slate",
  canReorder = true,
  hint,
  onMoveUp,
  onMoveDown,
}: {
  title: string;
  items: Array<{ id: string; exercise: Exercise }>;
  tone?: string;
  accent?: Accent;
  canReorder?: boolean;
  hint?: string;
  onMoveUp?: (exerciseId: string) => void;
  onMoveDown?: (exerciseId: string) => void;
}) {
  return (
    <div className={`rounded-2xl border border-white/60 ${tone} p-3 shadow-sm sm:p-4`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">{title}</h3>
        {hint && <div className="text-right text-xs text-slate-500">{hint}</div>}
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <ExerciseItem
            key={item.id}
            exercise={item.exercise}
            accent={accent}
            moveControls={
              canReorder ? (
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()} onPointerDown={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    aria-label="Posunout nahoru"
                    className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 shadow-sm transition hover:bg-slate-50 disabled:opacity-40"
                    onClick={() => onMoveUp?.(item.id)}
                    disabled={index === 0}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Posunout dolů"
                    className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 shadow-sm transition hover:bg-slate-50 disabled:opacity-40"
                    onClick={() => onMoveDown?.(item.id)}
                    disabled={index === items.length - 1}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                </div>
              ) : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}

function SkillPicker({
  selectedSkillId,
  onSelect,
}: {
  selectedSkillId: string;
  onSelect: (skillId: string) => void;
}) {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/80 p-4 shadow-xl backdrop-blur sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-slate-900">Beginner skills</div>
          <div className="mt-1 text-sm text-slate-600">Vyber si, který skill aktuálně cvičíš. Ten se pak promítne do všech tréninkových karet.</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {beginnerSkills.map((skill) => {
          const isActive = skill.id === selectedSkillId;
          return (
            <button
              key={skill.id}
              type="button"
              onClick={() => onSelect(skill.id)}
              className={`rounded-2xl border p-4 text-left transition ${
                isActive
                  ? "border-slate-900 bg-slate-900 text-white shadow-lg"
                  : "border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-base font-semibold">{skill.label}</div>
                  <div className={`mt-1 text-sm ${isActive ? "text-slate-300" : "text-slate-600"}`}>{skill.focus}</div>
                </div>
                {isActive && <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DevChecks() {
  const hasThreeCards = workoutCards.length === 3;
  const validCards = workoutCards.every(
    (card) => card.warmup.length > 0 && card.strength.length > 0 && card.core.length > 0
  );
  const validSkills = beginnerSkills.length >= 3 && beginnerSkills.every((skill) => skill.progressions.length >= 3);
  const validNestedProgressions = beginnerSkills.every((skill) => skill.progressions.every((step) => step.title && step.how));

  if (!hasThreeCards || !validCards || !validSkills || !validNestedProgressions) {
    return (
      <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Data check failed: musí existovat 3 tréninkové karty, seznam beginner skillů a každý skill musí mít rozepsané rozklikávací progrese.
      </div>
    );
  }

  return null;
}

export default function WorkoutCards() {
  const [selectedSkillId, setSelectedSkillId] = useState<string>("lsit");
  const [exerciseOrder, setExerciseOrder] = useState<ExerciseOrderState>(() => loadExerciseOrder());

  const selectedSkill = useMemo(() => {
    return beginnerSkills.find((skill) => skill.id === selectedSkillId) ?? beginnerSkills[0];
  }, [selectedSkillId]);

  const skillExercise: Exercise = useMemo(
    () => ({
      name: selectedSkill.label,
      prescription: selectedSkill.prescription,
      how: selectedSkill.description,
      focus: selectedSkill.focus,
      progressions: selectedSkill.progressions,
      tips: selectedSkill.tips,
    }),
    [selectedSkill]
  );

  useEffect(() => {
    window.localStorage.setItem(exerciseOrderStorageKey, JSON.stringify(exerciseOrder));
  }, [exerciseOrder]);

  const getOrderedExercises = (card: WorkoutCard, section: SectionKey) => {
    const source = card[section];
    const sectionOrder = exerciseOrder[card.id]?.[section] ?? [];
    const byId = new Map(source.map((exercise, index) => [buildExerciseId(card.id, section, index), exercise]));

    return sectionOrder
      .map((exerciseId) => {
        const exercise = byId.get(exerciseId);
        return exercise ? { id: exerciseId, exercise } : null;
      })
      .filter((item): item is { id: string; exercise: Exercise } => item !== null);
  };

  const moveExercise = (cardId: string, section: SectionKey, exerciseId: string, direction: -1 | 1) => {
    setExerciseOrder((current) => {
      const currentOrder = current[cardId]?.[section] ?? [];
      const fromIndex = currentOrder.indexOf(exerciseId);
      const toIndex = fromIndex + direction;

      if (fromIndex === -1 || toIndex < 0 || toIndex >= currentOrder.length) {
        return current;
      }

      const nextOrder = [...currentOrder];
      const [moved] = nextOrder.splice(fromIndex, 1);
      nextOrder.splice(toIndex, 0, moved);

      return {
        ...current,
        [cardId]: {
          ...current[cardId],
          [section]: nextOrder,
        },
      };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-zinc-50 to-slate-200 p-3 sm:p-4 md:p-8 lg:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-white/60 bg-white/70 p-4 shadow-xl backdrop-blur sm:p-6 md:mb-8 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <Badge className="mb-3 rounded-full px-3 py-1 text-xs">Calisthenics • 3× týdně</Badge>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">Workout plan v kartách</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
              Nahoře máš seznam beginner skillů. Přepneš si, který aktuálně cvičíš, a ten se automaticky promítne do skill bloku ve všech dnech.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 text-sm text-slate-700 sm:grid-cols-2 md:w-auto md:min-w-[360px]">
            <div className="rounded-2xl bg-slate-900 px-4 py-3 text-white shadow-lg">
              <div className="text-xs uppercase tracking-wide text-slate-300">Pauzy</div>
              <div className="mt-1 font-semibold">60–90 s</div>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3 shadow-lg">
              <div className="text-xs uppercase tracking-wide text-slate-500">Struktura</div>
              <div className="mt-1 font-semibold">Skill • 1–2 pull • 1–2 push • 1 leg • 1 core</div>
            </div>
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <SkillPicker selectedSkillId={selectedSkillId} onSelect={setSelectedSkillId} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
          {workoutCards.map((card) => {
            const Icon = card.icon;
            const warmupItems = getOrderedExercises(card, "warmup");
            const strengthItems = getOrderedExercises(card, "strength");
            const coreItems = getOrderedExercises(card, "core");
            return (
              <details key={card.title} className="group/card" open>
                <summary className="list-none">
                  <Card className="overflow-hidden rounded-[24px] border-white/60 bg-white/80 shadow-2xl backdrop-blur sm:rounded-[28px]">
                    <CardHeader className="cursor-pointer border-b border-slate-200/70 bg-gradient-to-r from-slate-900 to-slate-700 p-4 text-white sm:p-5">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 sm:h-11 sm:w-11">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="rounded-full bg-white/15 px-3 py-1 text-white hover:bg-white/15">Tréninkový den</Badge>
                          <div className="rounded-full bg-white/15 p-2 transition group-open/card:rotate-180">
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight sm:text-xl">{card.title}</CardTitle>
                    </CardHeader>
                  </Card>
                </summary>

                <Card className="overflow-hidden rounded-b-[24px] rounded-t-none border-t-0 border-white/60 bg-white/80 shadow-2xl backdrop-blur sm:rounded-b-[28px]">
                  <CardContent className="space-y-4 p-3 sm:p-5">
            <Section
                      title="Warm-up"
                      items={warmupItems}
                      tone="bg-slate-50"
                      accent="slate"
                      hint="Pořadí změníš šipkami"
                      onMoveUp={(exerciseId) => moveExercise(card.id, "warmup", exerciseId, -1)}
                      onMoveDown={(exerciseId) => moveExercise(card.id, "warmup", exerciseId, 1)}
                    />
                    <Section
                      title="Skill blok"
                      items={[{ id: `skill-${card.id}-${selectedSkill.id}`, exercise: skillExercise }]}
                      tone="bg-sky-50"
                      accent="sky"
                      canReorder={false}
                    />
                    <Section
                      title="Síla"
                      items={strengthItems}
                      tone="bg-emerald-50"
                      accent="emerald"
                      hint="Pořadí změníš šipkami"
                      onMoveUp={(exerciseId) => moveExercise(card.id, "strength", exerciseId, -1)}
                      onMoveDown={(exerciseId) => moveExercise(card.id, "strength", exerciseId, 1)}
                    />
                    <Section
                      title="Core"
                      items={coreItems}
                      tone="bg-amber-50"
                      accent="amber"
                      hint="Pořadí změníš šipkami"
                      onMoveUp={(exerciseId) => moveExercise(card.id, "core", exerciseId, -1)}
                      onMoveDown={(exerciseId) => moveExercise(card.id, "core", exerciseId, 1)}
                    />

                  </CardContent>
                </Card>
              </details>
            );
          })}
        </div>

        <div className="mt-6 rounded-3xl border border-white/60 bg-white/70 p-4 shadow-xl backdrop-blur sm:p-6 md:mt-8">
          <div className="mb-3 flex items-center gap-2 text-slate-800">
            <Activity className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Jak to jet</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-800">Rozložení týdne</div>
              <p className="mt-1 text-sm text-slate-600">Po / St / Pá nebo Út / Čt / So</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-800">Cíl</div>
              <p className="mt-1 text-sm text-slate-600">Vybereš jeden beginner skill a ten pak cvičíš konzistentně ve všech 3 dnech</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-800">Pravidlo</div>
              <p className="mt-1 text-sm text-slate-600">Když vše dáš čistě, příště lehce přidej opakování nebo čas držení, případně jdi o 1 krok výš v progresi</p>
            </div>
          </div>
        </div>

        <DevChecks />
      </div>
    </div>
  );
}
