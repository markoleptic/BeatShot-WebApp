import React from "react";
import {
	ChartData,
	Chart as ChartJS,
	ChartOptions,
	ScriptableContext,
	TooltipItem,
	TooltipModel,
	registerables,
} from "chart.js";
import "chartjs-adapter-luxon";
import { Chart } from "react-chartjs-2";
import { AnyObject, MatrixController, MatrixElement } from "chartjs-chart-matrix";
import { responsiveFonts, onChartResize, lerp } from "@/utility/ChartFunctions";
import type { LocationAccuracyHeatMapData } from "@/types/chart.types";
import "@/styles/Charts.scss";

ChartJS.register(MatrixController, MatrixElement, ...registerables);

const green = [0, 255, 0, 1];
const yellow = [255, 255, 0, 1];
const red = [255, 0, 0, 1];
const redYellowThreshold = 0.5;
const yellowGreenThreshold = 0.5;

function titleCallback(this: TooltipModel<"matrix">, tooltipItems: TooltipItem<"matrix">[]): string {
	if (!tooltipItems[0].raw) return "";
	if ((tooltipItems[0].raw as LocationAccuracyHeatMapData).v === -1) {
		return "No target has spawned here";
	}
	return ((tooltipItems[0].raw as LocationAccuracyHeatMapData).v * 100).toFixed(0) + "%";
}

function getAvgValue(data: number[][], currentIndex: number) {
	if (!data || data.length === 0) return -1;
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

function getAveragedLocAcc(data: LocationAccuracyHeatMapData[][]) {
	if (!data || data.length === 0) return [];
	if (data.length === 1) {
		return data[0];
	}
	const percentagesOnly = data.map((x) => x.map((y) => y.v));
	let averagedValues: LocationAccuracyHeatMapData[] = [];
	for (let i = 0; i < data[0].length; i++) {
		averagedValues.push({
			x: data[0][i].x,
			y: data[0][i].y,
			v: getAvgValue(percentagesOnly, i),
		});
	}
	return averagedValues;
}

function getWidth(data: LocationAccuracyHeatMapData[][]) {
	if (!data || data.length === 0) {
		return 0;
	}
	if (data.map((x) => x.map((y) => Number(y.x)))[0] === undefined) {
		return 0;
	}
	const width = Math.max(...data.map((x) => x.map((y) => Number(y.x)))[0]) + 1;
	return width;
}

function getHeight(data: LocationAccuracyHeatMapData[][]) {
	if (!data || data.length === 0) {
		return 0;
	}
	if (data.map((x) => x.map((y) => Number(y.y)))[0] === undefined) {
		return 0;
	}
	const height = Math.max(...data.map((x) => x.map((y) => Number(y.y)))[0]) + 1;
	return height;
}

function createColorMap(data: LocationAccuracyHeatMapData[]): Map<LocationAccuracyHeatMapData, colorMapValue> {
	let map = new Map<LocationAccuracyHeatMapData, colorMapValue>();
	if (!data || data.length === 0) return map;
	for (let i = 0; i < data.length; i++) {
		const alpha = data[i].v;
		if (alpha < 0) {
			map.set(data[i], {
				borderColor: `rgba(255, 255, 255, 0.5)`,
				hoverBorderColor: `rgba(255, 255, 255, 0.6)`,
				backgroundColor: `rgba(255, 255, 255, 0.2)`,
				hoverBackgroundColor: `rgba(255, 255, 255, 0.3)`,
			});
		} else if (alpha < redYellowThreshold) {
			const r = lerp(red[0], yellow[0], alpha / redYellowThreshold);
			const g = lerp(red[1], yellow[1], alpha / redYellowThreshold);
			const b = lerp(red[2], yellow[2], alpha / redYellowThreshold);
			map.set(data[i], {
				borderColor: `rgba(${r}, ${g}, ${b}, ${0.7})`,
				hoverBorderColor: `rgba(${r}, ${g}, ${b}, ${1})`,
				backgroundColor: `rgba(${r}, ${g}, ${b}, ${0.8})`,
				hoverBackgroundColor: `rgba(${r}, ${g}, ${b}, ${0.9})`,
			});
		} else {
			const r = lerp(yellow[0], green[0], (alpha - yellowGreenThreshold) / (1 - yellowGreenThreshold));
			const g = lerp(yellow[1], green[1], (alpha - yellowGreenThreshold) / (1 - yellowGreenThreshold));
			const b = lerp(yellow[2], green[2], (alpha - yellowGreenThreshold) / (1 - yellowGreenThreshold));
			map.set(data[i], {
				borderColor: `rgba(${r}, ${g}, ${b}, ${0.7})`,
				hoverBorderColor: `rgba(${r}, ${g}, ${b}, ${1})`,
				backgroundColor: `rgba(${r}, ${g}, ${b}, ${0.8})`,
				hoverBackgroundColor: `rgba(${r}, ${g}, ${b}, ${0.9})`,
			});
		}
	}
	return map;
}

function widthCallback(ctx: ScriptableContext<"matrix">, options: AnyObject, width: number) {
	const a = ctx.chart.chartArea || {};
	return a.width / width - (a.width / width) * 0.05;
}

function heightCallback(ctx: ScriptableContext<"matrix">, options: AnyObject, height: number) {
	const a = ctx.chart.chartArea || {};
	return a.height / height - ((a.height / height) * 0.05 * a.width) / a.height;
}

function backgroundColorCallback(
	ctx: ScriptableContext<"matrix">,
	_options: AnyObject,
	colorMap: Map<LocationAccuracyHeatMapData, colorMapValue>,
	hover: boolean
) {
	if (!ctx.raw || !colorMap) {
		return "transparent";
	}
	const dataValue = ctx.raw as LocationAccuracyHeatMapData;
	return hover ? colorMap.get(dataValue)?.hoverBackgroundColor : colorMap.get(dataValue)?.backgroundColor;
}

function borderColorCallback(
	ctx: ScriptableContext<"matrix">,
	_options: AnyObject,
	colorMap: Map<LocationAccuracyHeatMapData, colorMapValue>,
	hover: boolean
) {
	if (!ctx.raw || !colorMap) {
		return "transparent";
	}
	const dataValue = ctx.raw as LocationAccuracyHeatMapData;
	return hover ? colorMap.get(dataValue)?.hoverBorderColor : colorMap.get(dataValue)?.borderColor;
}

interface LocationAccuracyHeatMapOptions {
	title: string;
}

interface LocationAccuracyHeatMapProps {
	data: LocationAccuracyHeatMapData[][];
	options: LocationAccuracyHeatMapOptions;
}

interface colorMapValue {
	borderColor: string;
	hoverBorderColor: string;
	backgroundColor: string;
	hoverBackgroundColor: string;
}

const LocationAccuracyHeatmap: React.FC<LocationAccuracyHeatMapProps> = ({ data, options }) => {
	const { title } = options;
	const height = getHeight(data);
	const width = getWidth(data);
	const averagedData = getAveragedLocAcc(data);
	const colorMap = createColorMap(averagedData);
	const mapData: ChartData<"matrix"> = {
		datasets: [
			{
				type: "matrix",
				data: averagedData,
				borderWidth: 2,
				borderRadius: 1,
				width: (ctx, options) => widthCallback(ctx, options, width),
				height: (ctx, options) => heightCallback(ctx, options, height),
				borderColor: (ctx, options) => borderColorCallback(ctx, options, colorMap, false),
				hoverBorderColor: (ctx, options) => borderColorCallback(ctx, options, colorMap, true),
				backgroundColor: (ctx, options) => backgroundColorCallback(ctx, options, colorMap, false),
				hoverBackgroundColor: (ctx, options) => backgroundColorCallback(ctx, options, colorMap, true),
			},
		],
	};

	const mapOptions: ChartOptions<"matrix"> = {
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
				},
				padding: {
					bottom: 6,
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
				},
				titleColor: "hsl(193, 81%, 58%)",
				callbacks: {
					title: titleCallback,
					label: (tooltipItem) => {
						return "";
					},
				},
			},
		},
		scales: {
			y: {
				type: "time",
				display: false,
				offset: true,
				reverse: false,
				ticks: {
					autoSkip: true,
				},
				grid: {
					display: false,
				},
			},
			x: {
				type: "time",
				display: false,
				offset: true,
				reverse: false,
				ticks: {
					autoSkip: true,
				},
				grid: {
					display: false,
				},
			},
		},
	};
	return (
		<div className="chart">
			<Chart type="matrix" data={mapData} options={mapOptions} />
		</div>
	);
};

export default LocationAccuracyHeatmap;
