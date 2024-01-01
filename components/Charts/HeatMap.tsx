import { DateTime, WeekdayNumbers } from "luxon";
import "chartjs-adapter-luxon";
import {
	ChartData,
	Chart as ChartJS,
	ChartOptions,
	CoreScaleOptions,
	Scale,
	ScriptableContext,
	Tick,
	TooltipItem,
	TooltipModel,
	registerables,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { AnyObject, MatrixController, MatrixElement } from "chartjs-chart-matrix";
import { responsiveFonts, onChartResize, lerp, clamp } from "../../util/ChartFunctions";
import React from "react";
ChartJS.register(MatrixController, MatrixElement, ...registerables);

export interface HeatMapCalendar {
	x: string;
	y: WeekdayNumbers;
	d: DateTime<true>;
	v: number;
}

export interface HeatMapLabels {
	label: string[];
	value: HeatMapCalendar[];
}

const hoverMultiplier = 1.25;
const borderMultipler = 1.25;

function titleCallback(this: TooltipModel<"matrix">, tooltipItems: TooltipItem<"matrix">[]): string {
	let title = DateTime.fromISO((tooltipItems[0].raw as HeatMapCalendar).x as string).toISODate();
	return title || "";
}

function labelCallback(tooltipItem: TooltipItem<"matrix">, labelMap: Map<string, string>) {
	if (!tooltipItem.raw) {
		return "";
	}
	return labelMap.get((tooltipItem.raw as HeatMapCalendar).x);
}

function afterTitleCallback(this: TooltipModel<"matrix">, tooltipItems: TooltipItem<"matrix">[]) {
	const value = tooltipItems[0].raw as HeatMapCalendar;
	if (value.v / 60 / 60 < 1) {
		return Math.round((value.v / 60) * 10) / 10 + " minutes";
	} else {
		return Math.round((value.v / 60 / 60) * 100) / 100 + " hours";
	}
}

function backgroundColorCallback(
	ctx: ScriptableContext<"matrix">,
	options: AnyObject,
	colorMap: Map<string, colorMapValue>,
	hover: boolean
) {
	if (!ctx.raw) {
		return "transparent";
	}
	const mapValue = colorMap.get((ctx.raw as HeatMapCalendar).x);
	if (!mapValue) return "transparent";
	return hover ? mapValue.hoverBackgroundColor : mapValue.backgroundColor;
}

function borderColorCallback(
	ctx: ScriptableContext<"matrix">,
	options: AnyObject,
	colorMap: Map<string, colorMapValue>,
	hover: boolean
) {
	if (!ctx.raw) {
		return "transparent";
	}
	const mapValue = colorMap.get((ctx.raw as HeatMapCalendar).x);
	if (!mapValue) return "transparent";
	return hover ? mapValue.hoverBorderColor : mapValue.borderColor;
}

function widthCallback(ctx: ScriptableContext<"matrix">, options: AnyObject) {
	const a = ctx.chart.chartArea || {};
	return Math.floor(a.width / 53.0);
}

function heightCallback(ctx: ScriptableContext<"matrix">, options: AnyObject) {
	const a = ctx.chart.chartArea || {};
	return Math.floor(a.height / 7.0);
}

function yTickCallback(this: Scale<CoreScaleOptions>, tickValue: string | number, index: number, ticks: Tick[]) {
	return DateTime.fromObject({ weekday: tickValue as number }).weekdayShort;
}

function createColorMap(data: HeatMapCalendar[]): Map<string, colorMapValue> {
	let map = new Map<string, colorMapValue>();
	if (!data || data.length === 0) return map;
	const maxValue = data.reduce((max, currentItem) => {
		return currentItem.v > max.v ? currentItem : max;
	});
	for (const day of data) {
		const lerpedAlpha = day.v == 0 ? 0.1 : Math.round(lerp(0.2, 0.8, day.v / maxValue.v) * 100) / 100;
		const backgroundHoverValue = Math.max(0, Math.min(100, Math.floor(58 * hoverMultiplier)));
		const borderValue = Math.max(0, Math.min(100, Math.floor(58 * borderMultipler)));
		const borderHoverValue = Math.max(0, Math.min(100, Math.floor(58 * borderMultipler * hoverMultiplier)));
		map.set(day.x, {
			borderColor: `hsl(193, 81%, ${borderValue}%, ${lerpedAlpha})`,
			hoverBorderColor: `hsl(193, 81%, ${borderHoverValue}%, ${lerpedAlpha + 0.1})`,
			backgroundColor: `hsl(193, 81%, 58%, ${lerpedAlpha})`,
			hoverBackgroundColor: `hsl(193, 81%, ${backgroundHoverValue}%, ${lerpedAlpha + 0.1})`,
		});
	}
	return map;
}

function createLabelMap(data: HeatMapCalendar[]): Map<string, string> {
	let map = new Map<string, string>();
	if (!data || data.length === 0) return map;
	let i = 0;
	for (const day of data) {
		let weeklyPlays = 0;
		const weekNum = day.d.weekNumber;
		const min = clamp(i - 7, 0, 364);
		const max = clamp(i + 7, 0, 364);
		for (let j = min; j <= max; j++) {
			if (data[j].d.weekNumber === weekNum) {
				weeklyPlays += data[j].v;
			}
		}
		if (weeklyPlays / 60 / 60 < 1) {
			map.set(day.x, "Total for week: " + Math.round((weeklyPlays / 60) * 10) / 10 + " minutes");
		} else {
			map.set(day.x, "Total for week: " + Math.round((weeklyPlays / 60 / 60) * 100) / 100 + " hours");
		}
		i++;
	}
	return map;
}

interface HeatMapOptions {
	title: string;
}

interface HeatMapProps {
	data: HeatMapCalendar[];
	options: HeatMapOptions;
}

interface colorMapValue {
	borderColor: string;
	hoverBorderColor: string;
	backgroundColor: string;
	hoverBackgroundColor: string;
}

const HeatMap: React.FC<HeatMapProps> = ({ data, options }) => {
	const { title } = options;

	const colorMap = createColorMap(data);
	const labelMap = createLabelMap(data);

	const heatMapData: ChartData<"matrix"> = {
		datasets: [
			{
				type: "matrix",
				// @ts-ignore
				data: data,
				width: widthCallback,
				height: heightCallback,
				borderColor: (ctx, options) => borderColorCallback(ctx, options, colorMap, false),
				hoverBorderColor: (ctx, options) => borderColorCallback(ctx, options, colorMap, true),
				borderRadius: 1,
				borderWidth: 1,
				backgroundColor: (ctx, options) => backgroundColorCallback(ctx, options, colorMap, false),
				hoverBackgroundColor: (ctx, options) => backgroundColorCallback(ctx, options, colorMap, true),
			},
		],
	};

	const heatMapOptions: ChartOptions<"matrix"> = {
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
					top: 0,
					bottom: 6,
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
				bodyFont: {
					size: responsiveFonts("tooltipBody"),
					family: "Montserrat",
					weight: "bold",
				},
				callbacks: {
					title: titleCallback,
					label: (tooltipItem) => labelCallback(tooltipItem, labelMap),
					labelTextColor: function () {
						return "hsl(193, 81%, 58%)";
					},
					afterTitle: afterTitleCallback,
				},
			},
		},
		scales: {
			y: {
				reverse: true,
				offset: true,
				position: "right",
				ticks: {
					callback: yTickCallback,
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
					tickLength: 0,
				},
			},
		},
	};
	return (
		<div className="chart heatmap">
			<Chart type="matrix" data={heatMapData} options={heatMapOptions} />
		</div>
	);
};

export default HeatMap;
