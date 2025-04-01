import styles from "./SlidingTimer.module.scss";

function SlidingTimer({
	onTimerClick,
	timerRotated = false,
	isActive,
	timeValue,
	defaultTime,
	isHidden,
}) {
	const convertedTime = time => {
		const minutes = parseInt(time / 60);
		let seconds = parseInt(time % 60);
		seconds = seconds < 10 ? "0" + seconds : seconds;
		return minutes + ":" + seconds;
	};

	const hiddenStyle = {
		opacity: "0",
		flex: "0",
	};

	const getWarningThreshold = () => {
		if (defaultTime < 15) return 0;
		if (defaultTime < 45) return 5;
		if (defaultTime < 60) return 10;
		return 15;
	};

	const showWarning =
		isActive && timeValue <= getWarningThreshold() ? styles.warning : null;

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
			className={`${styles.timer} ${showWarning}`}
			onClick={onTimerClick}
			style={{
				...(isHidden && hiddenStyle),
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
