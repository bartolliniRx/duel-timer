import styles from "./SlidingTimer.module.scss";

function SlidingTimer({
	addedClass = "",
	addedStyle = "",
	onTimerClick,
	timerRotated = false,
	isActive,
	timeValue,
	defaultTime,
}) {
	const convertedTime = time => {
		const minutes = parseInt(time / 60);
		let seconds = parseInt(time % 60);
		seconds = seconds < 10 ? "0" + seconds : seconds;
		return minutes + ":" + seconds;
	};

	const getWarningThreshold = () => {
		if (defaultTime < 15) return 0;
		if (defaultTime < 45) return 5;
		if (defaultTime < 60) return 10;
		return 15;
	};

	const showWarning =
		isActive && timeValue <= getWarningThreshold() ? styles.warning : {};

	const sliderFill = () => {
		if (!isActive) return 100;

		const rootDegree = 1.4; // stopień pierwiastka
		const scaleFactor = 100 / Math.pow(100, 1 / rootDegree); // współczynnik używany do normalizacji

		const normalizedValue = (timeValue / defaultTime) * 100;
		const adjustedValue =
			Math.pow(normalizedValue, 1 / rootDegree) * scaleFactor; // translacja wartości

		return parseFloat(adjustedValue.toFixed(1));
	};

	return (
		<div
			className={`${styles.timer} ${addedClass} ${showWarning}`}
			onClick={onTimerClick}
			style={{
				...addedStyle,
				...(timerRotated && { transform: "rotate(180deg)" }),
			}}
		>
			<div
				className={styles.slider}
				style={{
					height: `${sliderFill()}%`,
				}}
			/>
			<div className={styles.timeLeft}>
				{isActive ? convertedTime(timeValue) : convertedTime(defaultTime)}
			</div>
		</div>
	);
}

export default SlidingTimer;
