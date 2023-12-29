const fontMap = new Map();
fontMap.set("title", 20);
fontMap.set("xTick", 12);
fontMap.set("yTick", 10);
fontMap.set("xTitle", 16);
fontMap.set("yTitle", 16);
fontMap.set("tooltipTitle", 14);
fontMap.set("tooltipBody", 14);

export function responsiveFonts(type) {
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

export function onChartResize(chart, newSize) {
	if (chart.config.options.scales.x.ticks.font) {
		chart.config.options.scales.x.ticks.font.size = responsiveFonts("xTick");
	}
	if (chart.config.options.scales.x.title && chart.config.options.scales.x.title.font) {
		chart.config.options.scales.x.title.font.size = responsiveFonts("xTitle");
	}
	if (chart.config.options.scales.y.ticks.font) {
		chart.config.options.scales.y.ticks.font.size = responsiveFonts("yTick");
	}
	if (chart.config.options.scales.y.title && chart.config.options.scales.y.title.font) {
		chart.config.options.scales.y.title.font.size = responsiveFonts("yTitle");
	}
	chart.config.options.plugins.title.font.size = responsiveFonts("title");
	chart.config.options.plugins.tooltip.titleFont.size = responsiveFonts("tooltipTitle");
	chart.config.options.plugins.tooltip.bodyFont.size = responsiveFonts("tooltipBody");
}
