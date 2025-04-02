import { useState } from "react";
import styles from "./InitialScreen.module.scss";

function InitialScreen({ addedClass = "" }) {
	const [minutes, setMinutes] = useState("");
	const [seconds, setSeconds] = useState("");

	const numberValidate = (e, prev, setter) => {
		let number = e.target.value.replace(/\D/g, "");
		if (number > 59) number = prev;
		setter(number);
	};

	return (
		<div className={`${styles.initialScreen} ${addedClass}`}>
			<div className={styles.timeInputs}>
				<input
					type="text"
					autoCorrect="off"
					autoComplete="off"
					inputMode="numeric"
					pattern="[0-9]*"
					placeholder="mm"
					value={minutes}
					onChange={e => numberValidate(e, minutes, setMinutes)}
				/>
				:
				<input
					type="text"
					autoCorrect="off"
					autoComplete="off"
					inputMode="numeric"
					pattern="[0-9]*"
					placeholder="ss"
					value={seconds}
					onChange={e => numberValidate(e, seconds, setSeconds)}
				/>
			</div>
			<button>START </button>
		</div>
	);
}

export default InitialScreen;
