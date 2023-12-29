import { DateTime } from "luxon";
import "chartjs-adapter-luxon";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
import { responsiveFonts, onChartResize } from "./ChartFunctions.js";
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
				width: ({ chart }) => (chart.chartArea || {}).width / 53,
				height: ({ chart }) => (chart.chartArea || {}).height / 7,
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
		onResize: onChartResize,
		layout: {
			padding: {
				right: 2,
				bottom: 2,
				left: 2,
				top: 2,
			},
			autoPadding: true,
		},
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
					size: responsiveFonts("title"),
					family: "Montserrat",
					weight: "bold",
					color: "hsl(193, 81%, 58%)",
				},
				padding: {
					right: 0,
					bottom: 6,
					left: 0,
					top: 0,
				},
			},
			tooltip: {
				padding: 8,
				displayColors: false,
				titleFont: {
					size: responsiveFonts("tooltipTitle"),
					family: "Montserrat",
					weight: "bold",
					color: "hsl(193, 81%, 58%)",
				},
				color: "hsl(193, 81%, 58%)",
				bodyFont: {
					size: responsiveFonts("tooltipBody"),
					family: "Montserrat",
					weight: "bold",
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
					padding: 4,
					color: "white",
					font: {
						size: responsiveFonts("yTick"),
						family: "Montserrat",
						weight: "normal",
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
					offset: true,
					autoSkip: false,
					padding: 4,
					color: "white",
					font: {
						size: responsiveFonts("xTick"),
						family: "Montserrat",
						weight: "normal",
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
		<div className="chart heatmap">
			<Chart type="matrix" data={data} options={options} />
		</div>
	);
}
