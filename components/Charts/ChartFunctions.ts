import { ChartOptions, FontSpec } from "chart.js";
import { _DeepPartialObject } from "chart.js/dist/types/utils";
import { ChartJSOrUndefined } from "react-chartjs-2/dist/types";

const fontMap = new Map();
fontMap.set("title", 20);
fontMap.set("xTick", 12);
fontMap.set("yTick", 10);
fontMap.set("xTitle", 16);
fontMap.set("yTitle", 16);
fontMap.set("tooltipTitle", 14);
fontMap.set("tooltipBody", 14);

export function responsiveFonts(type: string) {
	const mapValue = fontMap.get(type);
	if (window.innerWidth <= 640) {
		return Math.floor(mapValue * 0.75);
	} else if (window.innerWidth < 842) {
		return Math.floor(mapValue * 0.9);
	} else if (window.innerWidth < 1066) {
		return Math.floor(mapValue * 1.0);
	} else {
		return Math.floor(mapValue * 1.15);
	}
}

export function clamp(num: number, min: number, max: number) {
	return Math.min(Math.max(num, min), max);
}

export function lerp(x: number, y: number, a: number) {
	return x * (1 - a) + y * a;
}

const xAndYTitleTypes = ["linear", "category", "logarithmic", "time", "timeseries"];

export function onChartResize(chart: ChartJSOrUndefined, _: any) {
	if (!chart || !chart.config.options) return;

	if (typeof chart.config.options?.scales?.x?.ticks?.font === "object") {
		chart.config.options.scales.x.ticks.font.size = responsiveFonts("xTick");
	}
	if (typeof chart.config.options.scales?.y?.ticks?.font === "object") {
		chart.config.options.scales.y.ticks.font.size = responsiveFonts("yTick");
	}
	if (
		(chart.config.options.scales?.x?.type === "linear" || chart.config.options.scales?.x?.type === "time") &&
		typeof chart.config.options.scales.x?.title?.font === "object"
	) {
		console.log("x.type", chart.config.options.scales.x.type);
		chart.config.options.scales.x.title.font.size = responsiveFonts("xTitle");
	}
	if (
		(chart.config.options.scales?.y?.type === "linear" || chart.config.options.scales?.y?.type === "time") &&
		typeof chart.config.options?.scales?.y?.title?.font === "object"
	) {
		chart.config.options.scales.y.title.font.size = responsiveFonts("yTitle");
	}
	if (typeof chart.config.options.plugins?.title?.font === "object") {
		chart.config.options.plugins.title.font.size = responsiveFonts("title");
	}
	if (typeof chart.config.options.plugins?.tooltip?.titleFont === "object") {
		chart.config.options.plugins.tooltip.titleFont.size = responsiveFonts("tooltipTitle");
	}
	if (typeof chart.config.options.plugins?.tooltip?.bodyFont === "object") {
		chart.config.options.plugins.tooltip.bodyFont.size = responsiveFonts("tooltipBody");
	}
}

export function splitByUpperCase(str: string) {
	return str.split(/(?<=[a-z])(?=[A-Z])/);
}
