"use client";
import React, { useState, memo, ReactNode, ChangeEvent, ReactElement, JSXElementConstructor, HTMLProps } from "react";
import { DateTime } from "luxon";
import ReactSlider from "react-slider";
import styled, { css } from "styled-components";


interface StyledTrackProps {
	index: number;
}
interface TextWrapperProps {
	offsetX: string;
}

const StyledSlider = styled(ReactSlider)``;
const StyledThumb = styled.div`
	display: flex;
	flex-direction: column;
	align-content: center;
	align-items: center;
	height: 25px;
	line-height: 1.25;
	width: 25px;
	top: 0px;
	text-align: center;
	background-color: rgba(62, 198, 235, 1);
	color: #fff;
	border-radius: 50%;
	border-color: white;
	border: 2px solid #fff;
	cursor: grab;
	font-size: 0.875rem;
`;
const TextWrapper = styled.div<TextWrapperProps>`
	width: auto;
	white-space: nowrap;
	${({ offsetX }) => css`transform: translate3d(${offsetX}, 1.125rem, 0);`}
`;
const StyledTrack = styled.div<StyledTrackProps>`
	top: 10px;
	height: 10px;
	background: ${(props) => (props.index === 2 ? "#ddd" : props.index === 1 ? "rgba(62, 198, 235, 1)" : "#ddd")};
	border-radius: 999px;
`;
const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 50px;
`;

const Track = (
	props: HTMLProps<HTMLDivElement>,
	state: {
		index: number;
		value: number | readonly number[];
	}
) => <StyledTrack {...props} index={state.index} />;

const Thumb = (
	props: HTMLProps<HTMLDivElement>,
	state: {
		index: number;
		value: number | readonly number[];
		valueNow: number;
	},
	startDate: DateTime,
	endDate: DateTime
) => {
	const dateDiff = endDate.diff(startDate, "days").days;
	const dateString = DateTime.now().plus({ days: state.valueNow - 364 });
	const formatted = dateDiff <= 90 ? dateString.toFormat("LL/dd/yy") : dateString.toFormat("LLL dd yy");
	const offsetX = dateDiff > 90 ? 0 : Math.min(lerp(minXOffset, maxXOffset, 1 - (dateDiff - 7) / 90.0), maxXOffset);

	return (
		<StyledThumb {...props}>
			<TextWrapper offsetX={(state.index == 0 ? "-" + Math.max(0, offsetX).toString() : Math.max(0, offsetX).toString()) + "rem"}>{formatted}</TextWrapper>
		</StyledThumb>
	);
};

const lerp = (x: number, y: number, a: number) => Math.round(x * (1.0 - a) + y * a * 100) / 100;
const minXOffset = 0.0;
const maxXOffset = 2.0;

interface DateRangeSliderProps {
	initialStartDate: DateTime;
	initialEndDate: DateTime;
	onDateRangeChange: (startDate: DateTime, endDate: DateTime) => void;
}
// TODO: Change min and max values to initials
export const DateFilter: React.FC<DateRangeSliderProps> = ({ initialStartDate, initialEndDate, onDateRangeChange }) => {
	const [startDate, setStartDate] = useState<DateTime>(initialStartDate);
	const [endDate, setEndDate] = useState<DateTime>(initialEndDate);
	
	const onChange = (value: number | readonly number[], index: number) => {
		if (typeof value == "object") {
			if (index == 0) {
				const newDate = DateTime.now().plus({ days: value[0] - 364 });
				setStartDate(newDate);
				onDateRangeChange(newDate, endDate);
			} else {
				const newDate = DateTime.now().plus({ days: value[1] - 364 });
				setEndDate(newDate);
				onDateRangeChange(startDate, newDate);
			}
		}
	};
	return (
		<StyledContainer>
			<StyledSlider
				defaultValue={[0, 364]}
				min={0}
				max={364}
				renderTrack={Track}
				renderThumb={(props, state) => Thumb(props, state, startDate || DateTime.now(), endDate || DateTime.now())}
				pearling
				minDistance={7}
				onChange={onChange}
			/>
		</StyledContainer>
	);
};
