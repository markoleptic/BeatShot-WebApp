import { DateTime } from "luxon";
import "chartjs-adapter-luxon";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
import React from "react";
ChartJS.register(MatrixController, MatrixElement, ...registerables);

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function titleCallback(context) {
  let title = DateTime.fromISO(context[0].raw.x).toISODate();
  return title;
}

function labelCallback(tooltipItem) {
  let weeklyPlays = 0;
  const weekNum = DateTime.fromISO(tooltipItem.raw.x).weekNumber;
  const min = clamp(tooltipItem.dataIndex - 7, 0, 364);
  const max = clamp(tooltipItem.dataIndex + 7, 0, 364);
  for (let i = min; i <= max; i++) {
    if (DateTime.fromISO(tooltipItem.dataset.data[i].d).weekNumber === weekNum) {
      weeklyPlays += tooltipItem.dataset.data[i].v;
    }
  }
  if (weeklyPlays / 60 / 60 < 1) {
    return "Total for week: " + Math.round((weeklyPlays / 60) * 10) / 10 + " minutes";
  } else {
    return "Total for week: " + Math.round((weeklyPlays / 60 / 60) * 100) / 100 + " hours";
  }
}

export default function Heatmap(props, canvas) {
  //const maxPlayed = Math.max(...props.data);
  let labels = [];
  for (let datapoint in props.data) {
    labels.push({ label: datapoint });
  }
  const data = {
    labels: props.labels,
    datasets: [
      {
        type: "matrix",
        labels: props.labels,
        data: props.data,
        borderColor: "green",
        borderWidth: 1,
        hoverBackgroundColor: "hsl(193, 81%, 58%)",
        hoverBorderColor: "hsl(193, 81%, 58%)",
        width: ({ chart }) => (chart.chartArea || {}).width / 53 - 1,
        height: ({ chart }) => (chart.chartArea || {}).height / 7 - 1,
        backgroundColor: function (context) {
          if (!context.raw) {
            return 0;
          }
          const value = context.raw.v;
          const alpha = (10 + value) / 50;
          return `hsl(227, 15%, 70%, ${alpha})`;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        align: "center",
        text: "Play Frequency",
        color: "hsl(193, 81%, 58%)",
        font: {
          size: 20,
          family: "Montserrat",
          weight: 700,
          color: "hsl(193, 81%, 58%)",
        },
      },
      tooltip: {
        padding: "8",
        displayColors: false,
        titleFont: {
          size: 14,
          family: "Montserrat",
          weight: 700,
          color: "hsl(193, 81%, 58%)",
        },
        color: "hsl(193, 81%, 58%)",
        bodyFont: {
          weight: 500,
          family: "Montserrat",
          size: "14",
        },
        callbacks: {
          title: function (context) {
            return titleCallback(context);
          },
          label: function (tooltipItem) {
            return labelCallback(tooltipItem);
          },
          labelTextColor: function () {
            return "hsl(193, 81%, 58%)";
          },
          afterTitle: function (tooltipItem) {
            if (tooltipItem[0].raw.v / 60 / 60 < 1) {
              return Math.round((tooltipItem[0].raw.v / 60) * 10) / 10 + " minutes";
            } else {
              return Math.round((tooltipItem[0].raw.v / 60 / 60) * 100) / 100 + " hours";
            }
          },
        },
      },
    },
    scales: {
      y: {
        type: "time",
        reverse: true,
        offset: true,
        position: "right",
        ticks: {
          callback: function (value, index, ticks) {
            return DateTime.fromObject({ weekday: value }).weekdayShort;
          },
          maxRotation: 0,
          autoSkip: false,
          padding: 0,
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
          drawBorder: false,
          tickLength: 0,
        },
      },
      x: {
        type: "time",
        offset: true,
        position: "bottom",
        time: {
          unit: "month",
          round: "week",
          displayFormats: {
            month: "MMM",
          },
        },
        ticks: {
          maxRotation: 0,
          autoSkip: false,
          padding: 0,
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
          drawBorder: false,
          tickLength: 0,
        },
      },
    },
  };
  return (
    <div className="heatmap-chart">
      <Chart type="matrix" data={data} options={options} />
    </div>
  );
}
