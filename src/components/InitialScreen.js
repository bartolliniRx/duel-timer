import { useState } from "react";
import styles from "./InitialScreen.module.scss";

function InitialScreen({ addedClass = "" }) {
	const [minutes, setMinutes] = useState("01");
	const [seconds, setSeconds] = useState("00");

	const numberValidate = (e, prev) => {
		let number = e.target.value.replace(/\D/g, ""); // check for letters
		if (number > 59 || number.length > 2) number = prev; // format & value validation
		return number;
	};

	const leading0 = (e, setter, action) => {
		let number = e;
		if (action) {
			if (number.length === 2 && number[0] === "0") number = number[1];
		} else {
			number = number.length === 1 ? "0" + number : number;
		}
		setter(number);
	};

	const timerInput = (val, setter) => {
		return (
			<input
				type="text"
				autoCorrect="off"
				autoComplete="off"
				inputMode="numeric"
				pattern="[0-9]*"
				placeholder="--"
				value={val}
				onFocus={e => {
					leading0(val, setter, 1); // remove leading 0
					setTimeout(() => e.target.select(), 10); // wait for value to change
				}}
				onBlur={() => leading0(val, setter, 0)} // add leading 0
				onChange={e => setter(numberValidate(e, minutes))}
			/>
		);
	};

	return (
		<div className={`${styles.initialScreen} ${addedClass}`}>
			<div className={styles.timeInputs}>
				{timerInput(minutes, setMinutes)}:{timerInput(seconds, setSeconds)}
			</div>
			<button>START </button>
		</div>
	);
}

export default InitialScreen;
