import { useState, useEffect } from "react";
import styles from "./TimerApp.module.scss";
import ControlBar from "./ControlBar";
import SlidingTimer from "./SlidingTimer";

function TimerApp() {
	const defaultTime = 15;
	const [time, setTime] = useState(defaultTime);
	const [isRunning, setIsRunning] = useState(false);
	const [activeTimer, setActiveTimer] = useState("");
	const [areTimersHidden, setTimersHidden] = useState(false);

	useEffect(() => {
		let countdown;
		if (isRunning) {
			countdown = setInterval(() => {
				setTime(prev => {
					if (prev <= 1) {
						clearInterval(countdown);
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		} else {
			clearInterval(countdown);
		}

		return () => clearInterval(countdown);
	}, [isRunning]);

	const resetTimer = timer => {
		if (activeTimer && activeTimer !== timer) {
			return;
		}
		setIsRunning(false);
		setTime(defaultTime);
		setActiveTimer(timer === "top" ? "bottom" : "top");
		setTimeout(() => setIsRunning(true), 10); // Krótka pauza przed restartem
	};

	// controls

	const handlePlay = () => {
		activeTimer && setIsRunning(true);
	};

	const handlePause = () => {
		setIsRunning(false); // Stop timera
	};

	const handleStop = () => {
		setIsRunning(false); // Stop timera
		setActiveTimer(""); // Reset aktywnego timera
		setTime(defaultTime); // Reset czasu
	};

	return (
		<div className={styles.App}>
			<SlidingTimer
				onTimerClick={() => resetTimer("top")}
				isActive={activeTimer === "top" ? true : false}
				timeValue={time}
				defaultTime={defaultTime}
				timerRotated={true}
				isHidden={areTimersHidden}
			/>
			<ControlBar
				onPlayClick={handlePlay}
				onPauseClick={handlePause}
				onStopClick={handleStop}
			/>
			<SlidingTimer
				onTimerClick={() => resetTimer("bottom")}
				isActive={activeTimer === "bottom" ? true : false}
				timeValue={time}
				defaultTime={defaultTime}
				isHidden={areTimersHidden}
			/>
		</div>
	);
}

export default TimerApp;
