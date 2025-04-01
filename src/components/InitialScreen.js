import styles from "./InitialScreen.module.scss";

function InitialScreen({ addedClass = "" }) {
	return (
		<div className={`${styles.initialScreen} ${addedClass}`}>
			<div className={styles.timeInputs}>
				<input type="number" placeholder="mm" step="1" min="0" max="60" />:
				<input type="number" placeholder="ss" step="1" min="0" max="60" />
			</div>
		</div>
	);
}

export default InitialScreen;
