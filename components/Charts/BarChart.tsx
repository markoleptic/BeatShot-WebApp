"use client";
import { Bar } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import {
	Chart,
	ChartData,
	ChartOptions,
	CoreScaleOptions,
	Scale,
	TooltipItem,
	TooltipModel,
	registerables,
} from "chart.js";
import { responsiveFonts, onChartResize, splitByUpperCase } from "@/util/ChartFunctions";
import React from "react";
Chart.register(...registerables);

function getArrayLabels(labels: string[]): string[][] {
	let newLabels: string[][] = [];
	for (const label of labels) {
		newLabels.push(splitByUpperCase(label));
	}
	return newLabels;
}

interface BarChartOptions {
	title: string;
	xAxisTitle?: string;
	yAxisTitle?: string;
	category: string;
	bDisplayPercentage: boolean;
	maxEntries: number | string;
}

interface BarChartProps {
	labels: string[];
	data: any;
	options: BarChartOptions;
}

const BarChart: React.FC<BarChartProps> = ({ labels, data, options }) => {
	const { title, yAxisTitle, category, maxEntries } = options;
	const barLabels: string[][] = getArrayLabels(labels);
	const barData: ChartData<"bar", any, string[]> = {
		labels: barLabels,
		datasets: [
			{
				data: data,
				borderColor: "white",
				backgroundColor: "hsl(193, 81%, 58%, 0.8)",
			},
		],
	};

	const barOptions: ChartOptions<"bar"> = {
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
				},
				padding: {
					top: 0,
					bottom: 6,
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
					title: function (tooltipItem: TooltipItem<"bar">[]) {
						return tooltipItem[0].label.replaceAll(",", "");
					},
					label: function (this: TooltipModel<"bar">, tooltipItem: TooltipItem<"bar">) {
						if (category === "timePlayed") {
							if ((tooltipItem.raw as number) / 60 / 60 < 1) {
								return Math.round(((tooltipItem.raw as number) / 60) * 10) / 10 + " minutes";
							} else {
								return Math.round(((tooltipItem.raw as number) / 60 / 60) * 100) / 100 + " hours";
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
					drawOnChartArea: true,
					drawTicks: false,
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
					drawOnChartArea: true,
					drawTicks: false,
					color: "hsl(227, 15%, 70%,0.4)",
				},
				ticks: {
					display: true,
					padding: 4,
					callback: function (this: Scale<CoreScaleOptions>, value: string | number) {
						if (category === "timePlayed") {
							return Math.round(((value as number) / 60 / 60) * 10) / 10;
						} else return value;
					},
					color: "white",
					font: {
						family: "Montserrat",
						size: responsiveFonts("yTick"),
						weight: "normal",
					},
				},
				title: {
					display: true,
					color: "white",
					font: {
						size: responsiveFonts("yTitle"),
						family: "Montserrat",
						weight: "normal",
					},
					align: "center",
					text: yAxisTitle,
					padding: 0,
				},
			},
		},
	};

	return (
		<div className="chart">
			<Bar data={barData} options={barOptions} />
		</div>
	);
};

export default BarChart;
