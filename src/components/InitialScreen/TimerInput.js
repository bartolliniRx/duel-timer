function TimerInput({ val, setter }) {
	const numberValidate = (e, prev) => {
		let number = e.target.value.replace(/\D/g, ""); // check for letters
		if (number > 59 || number.length > 2) number = prev; // format & value validation
		return number;
	};

	const leading0 = (e, setter, doRemove) => {
		let number = e;
		if (doRemove) {
			if (number.length === 2 && number[0] === "0") number = number[1];
		} else {
			while (number.length < 2) {
				number = "0" + number;
			}
		}
		setter(number);
	};

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
				leading0(val, setter, true); // remove leading 0
				setTimeout(() => e.target.select(), 10); // wait for value to change
			}}
			onBlur={() => leading0(val, setter, false)} // add leading 0
			onChange={e => setter(numberValidate(e, val))}
		/>
	);
}

export default TimerInput;
