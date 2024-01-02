import React from "react";
import Select, { ActionMeta, GroupBase, StylesConfig } from "react-select";
import { LabelValue } from "@/util/StatFunctions";

export interface SelectBoxProps {
	options: LabelValue[];
	onChange: (newValue: any, actionMeta: ActionMeta<any>) => void;
	placeholder: React.ReactNode;
	value?: any;
	id: string | undefined;
}

const SelectBox: React.FC<SelectBoxProps> = ({ options, onChange, placeholder, value, id }) => {
	const coloredSelectStyles = (): StylesConfig<any, false, GroupBase<any>> => ({
		menu: (provided) => {
			return {
				...provided,
				marginTop: 0,
				fontSize: 14,
				cursor: "pointer",
				//opacity: menuIsOpen ? 1 : 0,
				transition: "all 120ms ease-in",
			};
		},
		option: (provided, state) => {
			return {
				...provided,
				cursor: "pointer",
				backgroundColor: state.isSelected ? "hsl(193, 81%, 58%)" : "white",
				"&:hover": {
					backgroundColor: state.isSelected ? "hsl(193, 81%, 58%)" : "#9ee2f5",
					transition: "all 120ms ease-out",
				},
			};
		},
		container: (provided) => {
			return {
				...provided,
				width: "100%",
			};
		},
		control: (provided) => {
			return {
				...provided,
				cursor: "pointer",
				width: "100%",
				textAlign: "left",
			};
		},
		dropdownIndicator: (provided) => ({
			...provided,
			//color: menuIsOpen ? "hsl(193, 81%, 58%)" : "hsl(215, 91%, 9%)",
			color: "hsl(193, 81%, 58%)",
			"&:hover": {
				color: "#9ee2f5",
				transition: "all 150ms ease-out",
			},
		}),
		indicatorSeparator: (provided) => ({
			...provided,
			//backgroundColor: menuIsOpen ? "hsl(193, 81%, 58%)" : "hsl(215, 91%, 9%)",
			backgroundColor: "hsl(193, 81%, 58%)",
		}),
		valueContainer: (provided) => ({
			...provided,
			padding: 0,
			paddingLeft: 2,
			paddingRight: 2,
		}),
		singleValue: (provided) => ({
			...provided,
		}),
	});

	return (
		<>
			<Select
				className={id}
				id={id}
				options={options}
				onChange={onChange}
				value={value}
				placeholder={placeholder}
				styles={coloredSelectStyles()}
			/>
		</>
	);
};

export default SelectBox;

// const getColor = (state, mode = "nonhover") => {
//   switch (mode) {
//     case "hover":
//       return state?.value?.includes("game-mode-select")
//         ? "rgba(255, 0, 0, 0.52)"
//         : "rgba(43, 192, 233, 0.5)"; // "hsl(193, 81%, 58%)";
//     default:
//       return state?.value?.includes("game-mode-select")
//         ? "rgba(255, 0, 0, 0.9)"
//         : "rgba(43, 192, 233, 1)";
//   }
// };
