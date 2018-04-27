const NumericConverter = require("./converter.js");

const Converter = new NumericConverter();

test("its sets the number successfully on the converter", function() {
    Converter.setNumber(100);
    expect(Converter.number).toBe(100);
});

test("it throws an exception when a non  number is given", function() {
    expect(() => {
        Converter.setNumber("100s");
    }).toThrowError("100s is not a valid number");
});

test("it converts a number less than 100", function() {
    expect(Converter._convertLessThan100("99")).toBe("ninety nine");
});

test("it converts a number that has more than 5 digits eg 1000000, 99999 ", () => {
    expect(Converter._convertThreePowerNumber(1000000)).toBe("one million");
    expect(Converter._convertThreePowerNumber(15643353)).toBe(
        "fifteen million six hundred forty three thousand three hundred fifty three"
    );
});
test("it converts a number less than 1000", function() {
    expect(Converter._convertLessThan1000("899")).toBe(
        "eight hundred ninety nine"
    );
});

test("converts 100 to one hundred", function() {
    expect(Converter.setNumber(100).toWords()).toBe("one hundred");
});
