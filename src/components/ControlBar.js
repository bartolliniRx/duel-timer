import styles from "./ControlBar.module.scss";
import playIcon from "../assets/icons8-play-32.png";
import pauseIcon from "../assets/icons8-pause-32.png";
import stopIcon from "../assets/icons8-stop-32.png";

function ControlBar({ addedStyle, onPlayClick, onPauseClick, onStopClick }) {
	return (
		<div className={styles.bar} style={addedStyle}>
			<div className={styles.controlBttn} onClick={onPlayClick}>
				<img src={playIcon} alt="" />
			</div>
			<div className={styles.controlBttn} onClick={onPauseClick}>
				<img src={pauseIcon} alt="" />
			</div>
			<div className={styles.controlBttn} onClick={onStopClick}>
				<img src={stopIcon} alt="" />
			</div>
		</div>
	);
}

export default ControlBar;
