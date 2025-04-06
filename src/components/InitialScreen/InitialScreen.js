import { useState } from "react";
import styles from "./InitialScreen.module.scss";
import TimerInput from "./TimerInput";

function InitialScreen({ onSetTime }) {
	const [minutes, setMinutes] = useState("01");
	const [seconds, setSeconds] = useState("00");
	const time = parseInt(minutes) * 60 + parseInt(seconds);

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				onSetTime(time);
			}}
			className={styles.initialScreen}
		>
			<div className={styles.timeInputs}>
				<TimerInput val={minutes} setter={setMinutes} />:
				<TimerInput val={seconds} setter={setSeconds} />
			</div>
			<button disabled={minutes + seconds < 1}>START</button>
		</form>
	);
}

export default InitialScreen;
