"use client";
import { Bar } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import { useRef, useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";
import { responsiveFonts, onChartResize } from "./ChartFunctions.js";
import React from "react";
Chart.register(...registerables);

export default function BarChart(props, canvas) {
	var chartRef = useRef();
	var [gradient, setGradient] = useState();
	var title = props?.myOptions?.title || "";
	var yAxisTitle = props?.myOptions?.yAxisTitle || "";
	var category = props?.myOptions?.category || "";
	const maxEntries = props?.myOptions?.maxEntries || "";

	function splitByUpperCase(str = "") {
		return str.split(/(?<=[a-z])(?=[A-Z])/);
	}
	function getArrayLabels(labels) {
		let newLabels = [];
		for (let i in labels) {
			newLabels.push(splitByUpperCase(labels[i]));
		}
		return newLabels;
	}

	const labels = getArrayLabels(props.labels);
	const data = {
		labels: labels,
		datasets: [
			{
				labels: labels,
				data: props.data,
				borderColor: "white",
				backgroundColor: "hsl(193, 81%, 58%, 0.8)",
				//generate(["#3dc5ebB3"]),
				fill: "origin",
			},
		],
	};

	useEffect(() => {
		const chart = chartRef.current;
		if (chart) {
			//chart.ctx.rect(0, 0, 0, chart.canvas.height);
			// eslint-disable-next-line react-hooks/exhaustive-deps
			gradient = chart.ctx.createLinearGradient(0, 0, 0, chart.canvas.height);
			gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
			gradient.addColorStop(0, "hsl(193, 81%, 58%, 0.8)");
			chart.ctxfillStyle = gradient;
			chart.ctx.fill();
			setGradient(gradient);
		}
	}, [chartRef]);

	const options = {
		type: "bar",
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
		font: {
			size: 12,
			family: "Montserrat",
			weight: "bold",
			color: "white",
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
					weight: "bold",
					family: "Montserrat",
					size: responsiveFonts("tooltipTitle"),
				},
				bodyFont: {
					weight: "bold",
					family: "Montserrat",
					size: responsiveFonts("tooltipBody"),
				},
				callbacks: {
					title: function (tooltipItem) {
						return tooltipItem[0].label.replaceAll(",", "");
					},
					label: function (tooltipItem) {
						if (category === "timePlayed") {
							if (tooltipItem.raw / 60 / 60 < 1) {
								return Math.round((tooltipItem.raw / 60) * 10) / 10 + " minutes";
							} else {
								return Math.round((tooltipItem.raw / 60 / 60) * 100) / 100 + " hours";
							}
						}
					},
					labelTextColor: function () {
						return "hsl(193, 81%, 58%)";
					},
				},
			},
		},
		scales: {
			x: {
				offset: true,
				clip: true,
				beginAtZero: true,
				max: maxEntries,
				grid: {
					display: true,
					drawBorder: false,
					drawOnChartArea: true,
					drawTicks: false,
					beginAtZero: true,
					color: "hsl(227, 15%, 70%,0.4)",
				},
				ticks: {
					display: true,
					padding: 4,
					maxTicksLimit: 10,
					source: "data",
					color: "white",
					font: {
						size: responsiveFonts("xTick"),
						weight: "normal",
						family: "Montserrat",
					},
				},
				title: {
					display: false,
					padding: 0,
					font: {
						size: responsiveFonts("xTitle"),
					},
				},
				border: {
					display: true,
				},
			},
			y: {
				clip: true,
				beginAtZero: true,
				position: "left",
				grid: {
					display: true,
					drawBorder: false,
					drawOnChartArea: true,
					drawTicks: false,
					beginAtZero: true,
					color: "hsl(227, 15%, 70%,0.4)",
				},
				ticks: {
					display: true,
					padding: 4,
					callback: function (value) {
						if (category === "timePlayed") {
							return Math.round((value / 60 / 60) * 10) / 10;
						} else return this.value;
					},
					color: "white",
					font: {
						family: "Montserrat",
						size: responsiveFonts("yTick"),
						weight: "normal",
						color: "white",
					},
				},
				title: {
					display: true,
					color: "white",
					font: {
						size: responsiveFonts("yTitle"),
						family: "Montserrat",
						weight: "normal",
						color: "white",
					},
					align: "center",
					text: yAxisTitle,
					padding: 0,
				},
			},
			// percentage: {
			//   display: bDisplayPercentage,
			//   beginatZero: true,
			//   position: "right",
			//   title: {
			//     color: "white",
			//     font: {
			//       size: 16,
			//       family: "Montserrat",
			//       weight: 1000,
			//       color: "white",
			//     },
			//     display: false,
			//     text: "%",
			//   },
			//   ticks: {
			//     callback: function (value) {
			//       return this.getLabelForValue(value * 100) + "%";
			//     },
			//     color: "white",
			//     font: {
			//       family: "Montserrat",
			//       size: 10,
			//       weight: "100",
			//       color: "white",
			//     },
			//   },
			// },
		},
	};

	return (
		<div className="chart">
			<Bar ref={chartRef} data={data} options={options} />
		</div>
	);
}
