"use client";
import React, { useState, HTMLProps, useEffect, useCallback } from "react";
import { DateTime } from "luxon";
import ReactSlider from "react-slider";
import styled from "styled-components";

interface StyledTrackProps {
	$index: number;
}
const StyledSlider = styled(ReactSlider)``;
const StyledThumb = styled.div`
	top: 0px;
	height: 24px;
	width: 24px;
	background-color: rgba(62, 198, 235, 1);
	color: #fff;
	border-radius: 50%;
	border-color: white;
	border: 2px solid #fff;
	cursor: grab;
	font-size: 0.875rem;
	z-index: 0;
`;
const StyledTrack = styled.div<StyledTrackProps>`
	top: 6px;
	height: 12px;
	background: ${(props) => (props.$index === 2 ? "#ddd" : props.$index === 1 ? "rgba(62, 198, 235, 1)" : "#ddd")};
	border-radius: 999px;
	z-index: 0;
`;
const StyledContainer = styled.div`
	height: 24px;
	z-index: 0;
	max-width: 100%;
	resize: horizontal;
`;

interface DateRangeSliderProps {
	minDate: DateTime;
	range: number;
	onDateRangeChange: (startDate: DateTime, endDate: DateTime) => void;
}

export const DateFilter: React.FC<DateRangeSliderProps> = ({ minDate, range, onDateRangeChange }) => {
	const [dateRange, setDateRange] = useState<number>(range);
	const [value, setValue] = React.useState([0, range]);

	// Update the selected date range when parent component provides new range
	useEffect(() => {
		setDateRange(range);
		// TODO: maybe try to keep existing range by comparing new dates
		setValue([0, range]);
	}, [range]);

	const onChange = (value: number | readonly number[], index: number) => {
		if (typeof value == "object") {
			// "controlled component"
			setValue([value[0], value[1]]);
			onDateRangeChange(minDate.plus({ days: value[0] }).startOf("day"), minDate.plus({ days: value[1] }).endOf("day"));
		}
	};

	return (
		<>
			<StyledContainer>
				<StyledSlider
					value={value}
					min={0}
					max={dateRange}
					renderTrack={(props, state) => <StyledTrack {...props} $index={state.index}></StyledTrack>}
					renderThumb={(props, _) => <StyledThumb {...props}></StyledThumb>}
					pearling
					minDistance={0}
					onChange={onChange}
				/>
			</StyledContainer>
			<div className="date-range">
				<p>{minDate.plus({ days: value[0] }).startOf("day").toFormat("LLL d, y")}</p>
				<p>{minDate.plus({ days: value[1] }).endOf("day").toFormat("LLL d, y")}</p>
			</div>
		</>
	);
};
