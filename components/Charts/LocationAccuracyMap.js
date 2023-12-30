import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
import { responsiveFonts, onChartResize } from "./ChartFunctions.js";
ChartJS.register(MatrixController, MatrixElement, ...registerables);
import React from "react";

function titleCallback(context) {
	if (context[0].raw.v === -1) {
		return "No target has spawned here";
	}
	let title = (context[0].raw.v * 100).toFixed(0) + "%";
	return title;
}

function getAvgValue(data, currentIndex) {
	if (!data  || data.length === 0) return null;
	let sum = 0;
	for (let i = 0; i < data.length; i++) {
		if (data[i][currentIndex] === -1.0) {
			continue;
		}
		sum += data[i][currentIndex] || 0;
	}
	if (sum === 0) {
		return -1;
	}
	return sum / data.length;
}

function getAveragedLocAcc(data) {
	if (!data || data.length === 0 || data === "") {
		return null;
	}
	if (data.length === 1) {
		return data[0];
	}
	let accuracyValues = data.map((x) => x.map((y) => y.v));
	let averagedValues = [];
	for (let point in data[0]) {
		averagedValues.push({
			x: data[0][point].x,
			y: data[0][point].y,
			v: getAvgValue(accuracyValues, point),
		});
	}
	return averagedValues;
}

function getWidth(data) {
	if (!data || data === "") {
		return null;
	}
	if (data.map((x) => x.map((y) => Number(y.x)))[0] === undefined) {
		return null;
	}
	const width = Math.max(...data.map((x) => x.map((y) => Number(y.x)))[0]) + 1;
	return width;
}

function getHeight(data) {
	if (!data || data === "") {
		return null;
	}
	if (data.map((x) => x.map((y) => Number(y.y)))[0] === undefined) {
		return null;
	}
	const height = Math.max(...data.map((x) => x.map((y) => Number(y.y)))[0]) + 1;
	return height;
}

const lerp = (x, y, a) => x * (1 - a) + y * a;

const green = [0, 255, 0, 1];
const yellow = [255, 255, 0, 1];
const red = [255, 0, 0, 1];

function getColor(alpha) {
	const redYellowThreshold = 0.5;
	const yellowGreenThreshold = 0.5;
	if (alpha < 0) {
		return `rgba(255, 255, 255, 0.2)`;
	} else if (alpha < redYellowThreshold) {
		const r = lerp(red[0], yellow[0], alpha / redYellowThreshold);
		const g = lerp(red[1], yellow[1], alpha / redYellowThreshold);
		const b = lerp(red[2], yellow[2], alpha / redYellowThreshold);
		return `rgba(${r}, ${g}, ${b}, 0.8)`;
	} else {
		const r = lerp(yellow[0], green[0], (alpha - yellowGreenThreshold) / (1 - yellowGreenThreshold));
		const g = lerp(yellow[1], green[1], (alpha - yellowGreenThreshold) / (1 - yellowGreenThreshold));
		const b = lerp(yellow[2], green[2], (alpha - yellowGreenThreshold) / (1 - yellowGreenThreshold));
		return `rgba(${r}, ${g}, ${b}, 0.8)`;
	}
}

function getHoverColor(alpha) {
	if (alpha < 0) {
		return `rgba(255, 255, 255, 0.5)`;
	} else if (alpha === 0.5) {
		return `rgba(255, 255, 0, 1)`;
	} else if (alpha < 0.5) {
		const r = lerp(red[0], yellow[0], (alpha * 2) / 1);
		const g = lerp(red[1], yellow[1], (alpha * 2) / 1);
		const b = lerp(red[2], yellow[2], (alpha * 2) / 1);
		return `rgba(${r}, ${g}, ${b}, 1)`;
	} else if (alpha > 0.5) {
		const r = lerp(yellow[0], green[0], (alpha - 0.5) / 0.5);
		const g = lerp(yellow[1], green[1], (alpha - 0.5) / 0.5);
		const b = lerp(yellow[2], green[2], (alpha - 0.5) / 0.5);
		return `rgba(${r}, ${g}, ${b}, 1)`;
	}
}

export default function LocationAccuracyHeatmap(props, canvas) {
	const height = getHeight(props.data);
	const width = getWidth(props.data);
	const { title } = props.myOptions;
	const avgData = getAveragedLocAcc(props.data);
	const data = {
		datasets: [
			{
				type: "matrix",
				data: avgData,
				borderColor: "white",
				borderWidth: 0,
				hoverBorderColor: "grey",
				width: ({ chart }) => {
					if (chart.chartArea === undefined || chart.chartArea === null) {
						return {};
					}
					return (chart.chartArea || {}).width / width - ((chart.chartArea || {}).width / width) * 0.05;
				},
				height: ({ chart }) => {
					if (chart.chartArea === undefined || chart.chartArea === null) {
						return {};
					}
					return (
						(chart.chartArea || {}).height / height -
						(((chart.chartArea || {}).height / height) * 0.05 * chart.chartArea.width) /
							chart.chartArea.height
					);
				},
				backgroundColor: function (context) {
					if (!context.raw) {
						return null;
					}
					return getColor(context.raw.v);
				},
				hoverBackgroundColor: function (context) {
					if (!context.raw) {
						return null;
					}
					return getHoverColor(context.raw.v);
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
				text: title,
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
					weight: "bold",
					family: "Montserrat",
					size: responsiveFonts("tooltipBody"),
				},
				callbacks: {
					title: function (context) {
						return titleCallback(context);
					},
					label: function (tooltipItem) {
						return null;
					},
					//   labelTextColor: function () {
					//     return "hsl(193, 81%, 58%)";
					//   },
				},
			},
		},
		scales: {
			y: {
				type: "time",
				display: false,
				offset: true,
				reverse: true,
				ticks: {
					autoSkip: true,
				},
				grid: {
					display: false,
					drawBorder: false,
				},
			},
			x: {
				type: "time",
				display: false,
				offset: true,
				ticks: {
					autoSkip: true,
				},
				grid: {
					display: false,
					drawBorder: false,
				},
			},
		},
	};
	return (
		<div className="chart">
			<Chart type="matrix" data={data} options={options} />
		</div>
	);
}
