"use client";
import { Line } from "react-chartjs-2";
import { DateTime } from "luxon";
import "chartjs-adapter-luxon";
import React from "react";
import { responsiveFonts, onChartResize } from "../../util/ChartFunctions";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	TimeScale,
	TimeSeriesScale,
	Legend,
	Filler,
	ChartData,
	ChartOptions,
	TooltipItem,
	TooltipModel,
	CoreScaleOptions,
	Scale,
	ScriptableContext,
} from "chart.js";
import { AnyObject } from "chartjs-chart-matrix";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	TimeScale,
	TimeSeriesScale,
	Title,
	Tooltip,
	Legend,
	Filler
);

interface LineChartOptions {
	title: string;
	xAxisTitle?: string;
	yAxisTitle?: string;
	category: string;
	bDisplayPercentage: boolean;
}

interface LineChartProps {
	labels: string[];
	data: any;
	options: LineChartOptions;
}

const LineChart: React.FC<LineChartProps> = ({ labels, data, options }) => {
	const { title, yAxisTitle, category } = options;
	const linedata: ChartData<"line"> = {
		labels: labels.map((element) => DateTime.fromISO(element, { zone: "local" })),
		datasets: [
			{
				data: data,
				borderColor: "white",
				backgroundColor: function (ctx: ScriptableContext<"line">, options: AnyObject) {
					const gradient: CanvasGradient = ctx.chart.ctx.createLinearGradient(
						0,
						0,
						0,
						ctx.chart.canvas.height
					);
					gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
					gradient.addColorStop(0, "hsl(193, 81%, 58%, 0.8)");
					return gradient;
				},
				fill: "origin",
				pointStyle: "circle",
				pointRadius: 3,
				pointHoverRadius: 6,
				pointBackgroundColor: "#fff",
			},
		],
	};

	const lineOptions: ChartOptions<"line"> = {
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
				padding: {
					bottom: 6,
					top: 0,
				},
				align: "center",
				text: title,
				color: "hsl(193, 81%, 58%)",
				font: {
					size: responsiveFonts("title"),
					family: "Montserrat",
					weight: "bold",
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
					label: function (this: TooltipModel<"line">, tooltipItem: TooltipItem<"line">) {
						if (category === "score") {
							return (tooltipItem.raw as number).toFixed(1);
						} else if (category === "avgTimeOffset") {
							return (tooltipItem.raw as number) * 1000 + "ms";
						} else if (category === "accuracy" || category === "completion") {
							return ((tooltipItem.raw as number) * 100).toFixed(2) + "%";
						} else {
							return (tooltipItem.raw as number).toFixed(0);
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
				type: "timeseries",
				offset: false,
				time: {
					unit: "day",
				},
				grid: {
					display: true,
					drawOnChartArea: true,
					drawTicks: false,
					color: "hsl(227, 15%, 70%,0.4)",
				},
				ticks: {
					padding: 4,
					autoSkip: true,
					minRotation: 40,
					maxTicksLimit: 20,
					source: "labels",
					color: "white",
					font: {
						size: responsiveFonts("xTick"),
						weight: "normal",
						family: "Montserrat",
					},
				},
			},
			y: {
				offset: false,
				beginAtZero: true,
				grid: {
					display: true,
					drawOnChartArea: true,
					drawTicks: false,
					color: "hsl(227, 15%, 70%,0.4)",
				},
				ticks: {
					padding: 4,
					callback: function (this: Scale<CoreScaleOptions>, value: string | number) {
						if (value === 0) {
							return "0";
						}
						if (category === "accuracy" || category === "completion") {
							return this.getLabelForValue((value as number) * 100);
						} else if (category === "score") {
							return this.getLabelForValue((value as number) / 1000);
						} else if (category === "avgTimeOffset") {
							return this.getLabelForValue((value as number) * 1000);
						} else {
							return this.getLabelForValue(value as number);
						}
					},
					color: "white",
					font: {
						family: "Montserrat",
						size: responsiveFonts("yTick"),
						weight: "normal",
					},
				},
				title: {
					color: "white",
					font: {
						size: responsiveFonts("yTitle"),
						family: "Montserrat",
						weight: "normal",
					},
					align: "center",
					display: true,
					text: yAxisTitle,
					padding: 0,
				},
			},
		},
	};

	return (
		<div className="chart">
			<Line data={linedata} options={lineOptions} />
		</div>
	);
};

export default LineChart;
