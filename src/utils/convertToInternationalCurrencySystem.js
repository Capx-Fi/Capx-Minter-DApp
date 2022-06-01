import BigNumber from "bignumber.js";
BigNumber.config({ EXPONENTIAL_AT: 2 });
export function convertToInternationalCurrencySystem(labelValue) {
	// console.log("labelValue", labelValue);
	// Nine Zeroes for Billions
	const val =
		Math.abs(Number(labelValue)) >= 1.0e9
			? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(3) + "B"
			: // Six Zeroes for Millions
			Math.abs(Number(labelValue)) >= 1.0e6
			? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(3) + "M"
			: // Three Zeroes for Thousands
			Math.abs(Number(labelValue)) >= 1.0e3
			? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(3) + "K"
			: // In decimal value.
			Math.abs(Number(labelValue)) <= 1.0e-3
			? Number(labelValue)
			: Math.abs(Number(labelValue).toFixed(3));
	// console.log("val", val.toString());
	return val.toString();
}
