import { DateTime, WeekdayNumbers } from "luxon";

export type HeatMapCalendar = {
	x: string;
	y: WeekdayNumbers;
	d: DateTime<true>;
	v: number;
};

export type HeatMapLabels = {
	label: string[];
	value: HeatMapCalendar[];
};

export type LabelValue = {
	value: string;
	label: string;
};

export type LocationAccuracyHeatMapData = {
	x: number;
	y: number;
	v: number;
};
