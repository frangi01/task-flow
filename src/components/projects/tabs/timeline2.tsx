// TaskTimeline.tsx
import { useMemo, useRef, useEffect } from "react";
import { Chart } from "react-google-charts";

// === modello dati ===
type WorkType = "Task" | "Subtask" | "Epic" | "Request" | "Bug";
type Status = "Planned" | "In Progress" | "Done" | "Blocked";

type Item = {
  id: string;
  epic: string;          // riga/gruppo
  name: string;          // etichetta barra
  type: WorkType;        // colore
  assignee?: string;
  status: Status;
  start: Date;
  end: Date;
};

// === palette coerente per tipo di lavoro ===
const TYPE_COLOR: Record<WorkType, string> = {
  Task:    "#1976D2", // blue 700
  Subtask: "#00897B", // teal 600
  Epic:    "#7B1FA2", // purple 700
  Request: "#F9A825", // amber 800
  Bug:     "#D32F2F", // red 700
};

// === esempio di dati real-world ===
const SAMPLE: Item[] = [
  {
    id: "AP-1",
    epic: "Apollo – Checkout Revamp",
    name: "Cart service refactor",
    type: "Task",
    assignee: "Laura",
    status: "In Progress",
    start: new Date(2025, 9, 1), // Ottobre = 9
    end:   new Date(2025, 9, 8),
  },
  {
    id: "AP-2",
    epic: "Apollo – Checkout Revamp",
    name: "Payment step UI",
    type: "Subtask",
    assignee: "Mike",
    status: "Planned",
    start: new Date(2025, 9, 3),
    end:   new Date(2025, 9, 10),
  },
  {
    id: "AP-3",
    epic: "Apollo – Checkout Revamp",
    name: "3DS bugfix",
    type: "Bug",
    assignee: "Jese",
    status: "Blocked",
    start: new Date(2025, 9, 6),
    end:   new Date(2025, 9, 7),
  },
  {
    id: "HX-1",
    epic: "Helix – Onboarding",
    name: "Welcome email copy",
    type: "Request",
    assignee: "Bonnie",
    status: "Done",
    start: new Date(2025, 9, 2),
    end:   new Date(2025, 9, 3),
  },
  {
    id: "HX-2",
    epic: "Helix – Onboarding",
    name: "Profile wizard",
    type: "Task",
    assignee: "Thomas",
    status: "In Progress",
    start: new Date(2025, 9, 4),
    end:   new Date(2025, 9, 14),
  },
  {
    id: "HX-3",
    epic: "Helix – Onboarding",
    name: "Analytics events",
    type: "Subtask",
    assignee: "Laura",
    status: "Planned",
    start: new Date(2025, 9, 9),
    end:   new Date(2025, 9, 12),
  },
];

// tooltip HTML per riga
function tooltipHTML(it: Item) {
  return `
    <div style="padding:8px 10px;max-width:260px">
      <div style="font-weight:600;margin-bottom:4px;">${it.name}</div>
      <div><b>Epic:</b> ${it.epic}</div>
      <div><b>Type:</b> ${it.type}</div>
      ${it.assignee ? `<div><b>Assignee:</b> ${it.assignee}</div>` : ""}
      <div><b>Status:</b> ${it.status}</div>
      <div><b>Start:</b> ${it.start.toLocaleDateString()}</div>
      <div><b>End:</b> ${it.end.toLocaleDateString()}</div>
      <div style="margin-top:4px;color:#64748b;">ID: ${it.id}</div>
    </div>
  `;
}

export default function TaskTimeline({
  items = SAMPLE,
}: {
  items?: Item[];
}) {
  // colonne Google Timeline:
  // [Epic(row label), Task(bar label), style, tooltip(html), start, end]
  const data = useMemo(() => {
    const rows = items.map((it) => [
      it.epic,
      it.name,
      `color: ${TYPE_COLOR[it.type]}`,
      tooltipHTML(it),
      it.start,
      it.end,
    ]);
    return [
      [
        { type: "string", id: "Epic" },
        { type: "string", id: "Task" },
        { type: "string", role: "style" },
        { type: "string", role: "tooltip", p: { html: true } },
        { type: "date", id: "Start" },
        { type: "date", id: "End" },
      ],
      ...rows,
    ];
  }, [items]);

  // altezza dinamica: ~44px per riga + header & padding
  const height = useMemo(() => {
    const uniqueRows = new Set(items.map((i) => i.epic)).size;
    return 60 + uniqueRows * 46;
  }, [items]);

  // wrapper responsive + redraw on container resize
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartWrapperRef = useRef<any>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(() => {
      const cw = chartWrapperRef.current;
      if (!cw) return;
      const chart = cw.getChart?.();
      chart?.clearChart();
      cw.draw();
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const options = useMemo(
    () => ({
      timeline: {
        groupByRowLabel: true,         // raggruppa per Epic
        colorByRowLabel: false,        // usa i colori passati via "style"
        barLabelStyle: { fontSize: 12 },
        rowLabelStyle: { fontSize: 13 },
      },
      tooltip: { isHtml: true },
      avoidOverlappingGridLines: false,
      backgroundColor: "transparent",
    }),
    []
  );

  return (
    <div className="w-full">
      {/* Legend manuale (Timeline non mostra la legenda) */}
      <div className="flex flex-wrap items-center gap-3 mb-3">
        {(
          [
            ["Task", TYPE_COLOR.Task],
            ["Subtask", TYPE_COLOR.Subtask],
            ["Epic", TYPE_COLOR.Epic],
            ["Request", TYPE_COLOR.Request],
            ["Bug", TYPE_COLOR.Bug],
          ] as const
        ).map(([label, color]) => (
          <span key={label} className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <span
              style={{ background: color }}
              className="inline-block w-3 h-3 rounded"
            />
            {label}
          </span>
        ))}
      </div>

      <div
        ref={containerRef}
        className="relative w-full"
        style={{ aspectRatio: "16 / 9", maxHeight: "70vh" }}
      >
        <Chart
          chartType="Timeline"
          width="100%"
          height={height} // Timeline richiede una height sufficiente: è OK sovrascrivere l'aspect ratio
          data={data}
          options={options}
          getChartWrapper={(cw) => (chartWrapperRef.current = cw)}
          loader={<div>Loading…</div>}
        />
      </div>
    </div>
  );
}
