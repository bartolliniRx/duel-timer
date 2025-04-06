import { useState, useEffect } from "react";
import styles from "./App.module.scss";
import ControlBar from "./components/ControlBar";
import SlidingTimer from "./components/SlidingTimer";
import InitialScreen from "./components/InitialScreen/InitialScreen";

function TimerApp() {
	const [defaultTime, setDefaultTime] = useState(15);
	const [time, setTime] = useState(defaultTime);
	const [isRunning, setIsRunning] = useState(false);
	const [activeTimer, setActiveTimer] = useState("");
	const [areTimersHidden, setTimersHidden] = useState(true);

	// timer funcionality
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

	// styles
	const wrapperPos = areTimersHidden // slide items depending on current view
		? { transform: "translateY(-50%)" }
		: { transform: "translateY(0)" };

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
		setTimersHidden(true);
	};

	return (
		<div className={styles.App}>
			<div className={styles.movingWrapper} style={wrapperPos}>
				<SlidingTimer
					onTimerClick={() => resetTimer("top")}
					isActive={activeTimer === "top" ? true : false}
					timeValue={time}
					defaultTime={defaultTime}
					timerRotated={true}
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
				/>
				<InitialScreen
					onSetTime={e => {
						setTimersHidden(false);
						setDefaultTime(e);
						setTime(e);
					}}
				/>
			</div>
		</div>
	);
}

export default TimerApp;
