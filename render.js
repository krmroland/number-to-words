//Rendering the  app for demo purpoes
(function() {
    const app = document.getElementById("app");

    const Converter = new NumericConverter();

    function onInputHandler(event) {
        let words = "";

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
        const rootInput = document.createElement("div");
        rootInput.setAttribute("class", "form-group");
        const label = document.createElement("label");
        label.textContent = labelValue;

        rootInput.appendChild(label);
        rootInput.appendChild(input);
        return rootInput;
    }

    //creates an iput
    const input = document.createElement("input");
    //set its acctributes like type and text
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Please insert A number");
    input.setAttribute("class", "form-control");
    //creates a resuts text areas
    const result = document.createElement("textarea");
    //set the class and make it readonly
    result.setAttribute("readonly", true);
    result.setAttribute("class", "form-control");
    result.setAttribute("placeholder", "Result will appear here");

    //regester an event listener for when the input valu changes
    input.addEventListener("input", onInputHandler);

    app.appendChild(appendLabelToInput(input, "Number"));
    app.appendChild(appendLabelToInput(result, "Inwords"));
})();
