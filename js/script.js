/*
File: scripts.js
GUI Assignment 3: Creating an Interactive Dynamic Table

Aurimas Alkevicius, UMass Lowell Computer Science, aurimas_alkevicius@cs.uml.edu
Copyright (c) 2021 by Alkevicius. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated by AA on July 21, 2021 at 5:18 PM
*/

// parts of this function credit to: Chuong Vu https://github.com/vdc1703/GUI/blob/master/GUI-I/HW6/js/hw6.js
function myFunction() {

    var smMplier, lgMplier, smMcand, lgMcand;
    const minOfRange = -50,
        maxOfRange = 50;

    smMplier = document.getElementById("smMultiplier").value;
    lgMplier = document.getElementById("lgMultiplier").value;
    smMcand = document.getElementById("smMultiplicand").value;
    lgMcand = document.getElementById("lgMultiplicand").value;

    // clears any previous tables
    document.getElementById('table-container').innerHTML = "";

    if (validateInput(smMplier, lgMplier, smMcand, lgMcand, minOfRange, maxOfRange)) {
        // create table if the input passed the validateInput()
        generateTable(smMplier, lgMplier, smMcand, lgMcand);
    }
}

// parts of this function credit to: Chuong Vu https://github.com/vdc1703/GUI/blob/master/GUI-I/HW6/js/hw6.js
function validateInput(smMul, lgMul, smCand, lgCand, minOfRange, maxOfRange) {

    // clear error element
    document.getElementById('errorMessage').innerHTML = "";

    // error flags
    var hasMultiplierError,
        hasMultiplicandError,
        hasEmptyField, isOutOfRange;

    // error string to be displayed
    var errorMess = "";

    // check for empty input fields
    if (smMul == "" || lgMul == "" || smCand == "" || lgCand == "") {
        hasEmptyField = true;
        errorMess += "Please fill out all the fields.<br>";
    } else { hasEmptyField = false; }

    // check if user input is within the range
    if (!isWithinRange(smMul, minOfRange, maxOfRange) || !isWithinRange(lgMul, minOfRange, maxOfRange) || !isWithinRange(smCand, minOfRange, maxOfRange) || !isWithinRange(lgCand, minOfRange, maxOfRange)) {
        isOutOfRange = true;
        errorMess += "Input values must be between -50 and 50 <br>";
    } else {
        isOutOfRange = false;
    }

    // check if small multiplier is smaller than large multiplier
    if (!hasEmptyField) {
        if (Number(smMul) > Number(lgMul)) {
            hasMultiplierError = true;
            errorMess += "Larger multiplier value can't be smaller than the smaller multiplier value. <br>";
        } else {
            hasMultiplierError = false;
        }
    }

    // check if small multiplicand is smaller than large multiplicand
    if (!hasEmptyField) {
        if (Number(smCand) > Number(lgCand)) {
            hasMultiplicandError = true;
            errorMess += "Larger multiplicand value can't be smaller than the smaller multiplicand value. <br>";
        } else {
            hasMultiplicandError = false;
        }
    }

    // display error message(s) if flagged
    if (hasMultiplierError || hasMultiplicandError || hasEmptyField || isOutOfRange == true) {
        document.getElementById('errorMessage').innerHTML = "<br><font color=#FF0000> Invalid Input Detected:</font><br>" + errorMess;
        return false;
    } else {
        return true;
    }
}

// parts of this function credit to: Chuong Vu https://github.com/vdc1703/GUI/blob/master/GUI-I/HW6/js/hw6.js
function generateTable(smMul, lgMul, smCand, lgCand) {

    // finicky outcome unless parsed to integers
    smMul = Number(smMul);
    lgMul = Number(lgMul);
    smCand = Number(smCand);
    lgCand = Number(lgCand);

    // for styling
    var element = document.getElementById("table-container");
    element.classList.add("table-container-style");

    // Generated table, will add to it as we go
    var createTable = "";

    // for generating a checkered table grid - even = light fill, odd = dark fill
    var isEven = 0;

    //for styling
    createTable += "<table id='style-table'>";

    // this loop generates rows
    for (var row = 0; row <= (lgCand - smCand + 1); row++) {
        createTable += "<tr>";

        // this loop generates data cells=>columns 
        for (var col = 0; col <= (lgMul - smMul + 1); col++) {

            // the first row of the table
            if (row == 0) {
                createTable += "<td class='header'>" + ((col == 0) ? "" : (col + smMul - 1)) + "</td>";

                // the first column of the table
            } else if (col == 0) {
                createTable += "<td class='header'>" + (row + smCand - 1) + "</td>";

                // the generate the rest of the table
            } else {

                // determine the cells background and execute multiplication
                createTable += ((Number(isEven) % 2 == 0) ? "<td class='child-blank'>" : "<td class='child-color'>") + ((row + smCand - 1) * (col + smMul - 1)) + "</td>";
                isEven++;
            }
        }

        // for making checkered pattern, each row starts with alternating fill
        row % 2 == 0 ? isEven = 0 : isEven = 1;
        createTable += "</tr>";
    }
    createTable += "</table>";

    // prints generated table
    document.getElementById('table-container').innerHTML = createTable;
}

function isWithinRange(numToValidate, minOfRange, maxOfRange) {
    return (numToValidate >= minOfRange && numToValidate <= maxOfRange);
}