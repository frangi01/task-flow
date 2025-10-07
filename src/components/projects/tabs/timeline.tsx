import React from "react";
import { Chart } from "react-google-charts";

export default function TabTimeline() {
  const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "string", label: "Resource" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
  ];

  const rows = [
    [
      "toTrain",
      "Walk to train stop",
      "walk",
      null,
      null,
      5 * 60 * 1000,
      100,
      null,
    ],
    [
      "music",
      "Listen to music",
      "music",
      null,
      null,
      70 * 60 * 1000,
      100,
      null,
    ],
    [
      "wait",
      "Wait for train",
      "wait",
      null,
      null,
      10 * 60 * 1000,
      100,
      "toTrain",
    ],
    ["train", "Train ride", "train", null, null, 45 * 60 * 1000, 75, "wait"],
    ["toWork", "Walk to work", "walk", null, null, 10 * 60 * 1000, 0, "train"],
    ["work", "Sit down at desk", null, null, null, 2 * 60 * 1000, 0, "toWork"],
  ];
  const data = [columns, ...rows];
  const options = {
    height: 275,
    gantt: {
      defaultStartDateMillis: new Date(2015, 3, 28),
    },
  };


  const columns2 = [
  { type: "string", id: "President" },
  { type: "date", id: "Start" },
  { type: "date", id: "End" },
];

const rows2 = [
  ["Washington", new Date(1789, 3, 30), new Date(1797, 2, 4)],
  ["Adams", new Date(1797, 2, 4), new Date(1801, 2, 4)],
  ["Jefferson", new Date(1801, 2, 4), new Date(1809, 2, 4)],
];
  const data2 = [columns2, ...rows2];

  return (
    <>
    <Chart
      chartType="Gantt"
      width="100%"
      height="50%"
      data={data}
      options={options}
    />
     <Chart chartType="Timeline" data={data2} width="100%" height="100%" />;
    </>
    
  );
}
