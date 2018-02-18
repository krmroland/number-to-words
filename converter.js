/**
 * look up for defining our values
 * @type {Object}
 */
var lookup = {
	1: "one",
	2: "two",
	3: "three",
	4: "four",
	5: "five",
	6: "six",
	7: "seven",
	8: "eight",
	9: "nine",
	10: "ten",
	11: "eleven",
	12: "twelve",
	13: "thirteen",
	14: "fourteen",
	15: "fifteen",
	16: "sixteen",
	17: "seventeen",
	18: "eighteen",
	19: "nineteen",
	20: "twenty",
	30: "thirty",
	40: "forty",
	50: "fifty",
	60: "sixty",
	70: "seventy",
	80: "eighty",
	90: "ninety"
};

/**
 * the powers object
 * @type {Object}
 */
var powers = {
	100: "hundred",
	1000: "thousand",
	1000000: "million",
	1000000000: "billion",
	1000000000: "trillion"
};

/**
 * The numeric converter
 *
 */
function NumericConverter() {}

NumericConverter.prototype.setNumber = function(number) {
	//we have to make sure we are dealing with numbers
	//the + tries to convert an input to a number and return NaN(Not a number on failure)
	if (isNaN(+number) && !isFinite(number)) {
		throw new Error(number + " is not a valid number");
	}
	//for now we will wory about integers
	this.number = Number.parseInt(number);
	return this;
};

/**
 * converts intance number to words
 * @return {string}
 */
NumericConverter.prototype.toWords = function() {
	return this.number ? this._convert(this.number) : "";
};

/**
 * convrets a given number to words
 * i prefer to prefix _ for all methods that would be private in a real oop language
 * @param  {Number}
 * @return {String}
 */
NumericConverter.prototype._convert = function(number) {
	//numbers that exist in the above look up
	if (number in lookup) {
		return lookup[number];
	}

	//numbers less than 100 eg 46
	if (number < 100) {
		return this._convertLessThan100(number);
	}
	//numbers less than 1000
	if (number < 1000) {
		return this._convertLessThan1000(number);
	}
	// at this point we know we have a 3 multiple power number
	// eg 1000 which is 10^3 , 1000,000 10^6, 1,000,000,000 10^9
	// so we will use that to our advatage

	return this._convertThreePowerNumber(number);
};

/**
 * @todo  remove this method when drting up this code
 * converts all numbers less than 100
 * @param  {Number} number
 * @return {String}
 */
NumericConverter.prototype._convertLessThan100 = function(number) {
	//we will need to split it hundreds, tens and ones
	//eg 46/10 is 4 (integer division) , 4*10 is 40
	var tens = Number.parseInt(number / 10) * 10;

	var tensLabel = lookup[tens];

	// we will then need the remainder or ones
	var remainder = number % 10;

	//we are sure that the remainder is something in our lookup unless it is a zero
	//
	return remainder > 0 ? tensLabel + " " + lookup[remainder] : tensLabel;
};

/**
 * @todo  likely to delete this method
 * converts all numbers less than 10000
 * @param  {Number} number
 * @return {String}
 */
NumericConverter.prototype._convertLessThan1000 = function(number) {
	//first we will need to know how many hundreds we are working with

	// eg 695 , 695/100 as integer will give us 6
	var hundreds = Number.parseInt(number / 100);

	//
	var hundredsLabel = lookup[hundreds] + " " + powers[100];

	// we will then need the remainder ie 95 for our example 695
	var remainder = number % 100;
	// we know the remainder is
	return remainder > 0
		? hundredsLabel + " " + this._convert(remainder)
		: hundredsLabel;
};

/**
 * @todo  swap out recursion for something like looks
 * converts three power Number units like million ,trillion, billion
 * @param  {Number} number
 * @return {String}
 */
NumericConverter.prototype._convertThreePowerNumber = function(number) {
	//case study 254,000,900
	//first we will want to know which unit we are working with
	//for 254,000,000 the unit is million
	//we know all our upper units are to the powers of multiples of 3
	//say 1000=>10^3, 1M=>10^6 and 1B=>10^9,
	//so will get the number of digits and we round it of to the nearest multiple of 3
	var result = [];

	var powerUnit = 10 ** (Number.parseInt(Math.log10(number) / 3) * 3);

	var numberOfUnits = Number.parseInt(number / powerUnit);

	// this would give us 254 and we will convert it and push it to the result
	result.push(this._convert(numberOfUnits));

	if (!powers.hasOwnProperty(powerUnit)) {
		var values = Object.values(powers);
		throw new Error(
			"Values are defined upto a " + values[values.length - 1]
		);
	}

	result.push(powers[powerUnit]);
	//we will also have to push the power label of of the powerUnit,
	//we know its in the lookup and so we go for it

	//remainder , this would be 900 in ou case
	var remainder = number % powerUnit;
	//we check if the remainder is greater than 0,
	//use recursion to convert in and add it to result
	remainder > 0 ? result.push(this._convert(remainder)) : null;

	//at this point we explode our results and join them using an empty string for the start
	return result.join(" ");
};

//Rendering the  app for demo purpoes
(function() {
	var app = document.getElementById("app");

	var Converter = new NumericConverter();

	function onInputHandler(event) {
		var words = "";

		try {
			words = Converter.setNumber(event.target.value).toWords();
		} catch (e) {
			words = e.message;
		}
		result.value = words;
	}

	/**
	 * appends a label to input
	 * @param  {Element} input
	 * @param  {String} labelValue
	 * @return {Element}
	 */
	function appendLabelToInput(input, labelValue) {
		var rootInput = document.createElement("div");
		rootInput.setAttribute("class", "form-group");
		var label = document.createElement("label");
		label.textContent = labelValue;

		rootInput.appendChild(label);
		rootInput.appendChild(input);
		return rootInput;
	}

	//creates an iput
	var input = document.createElement("input");
	//set its acctributes like type and text
	input.setAttribute("type", "text");
	input.setAttribute("placeholder", "Please insert A number");
	input.setAttribute("class", "form-control");
	//creates a resuts text areas
	var result = document.createElement("textarea");
	//set the class and make it readonly
	result.setAttribute("readonly", true);
	result.setAttribute("class", "form-control");
	result.setAttribute("placeholder", "Result will appear here");

	//regester an event listener for when the input valu changes
	input.addEventListener("input", onInputHandler);

	app.appendChild(appendLabelToInput(input, "Number"));
	app.appendChild(appendLabelToInput(result, "Inwords"));
})();
