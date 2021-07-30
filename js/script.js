function myFunction() {

    var smMplier, lgMplier, smMcand, lgMcand
    const min = -50,
        max = 50;

    smMplier = document.getElementById("smMultiplier").value
    lgMplier = document.getElementById("lgMultiplier").value
    smMcand = document.getElementById("smMultiplicand").value
    lgMcand = document.getElementById("lgMultiplicand").value


    document.getElementById('table-container').innerHTML = ""

    if (validateInput(smMplier, lgMplier, smMcand, lgMcand, min, max)) {
        // create table if the input passed the isWithinRange
        generateTable(smMplier, lgMplier, smMcand, lgMcand);
    }
    // else {
    //     // print empty table if failed to pass the checkvalid form
    //     document.getElementById('table').innerHTML = "";
    // }

}

function validateInput(smMul, lgMul, smCand, lgCand, min, max) {
    // make error id be empty first
    document.getElementById('errorMessage').innerHTML = ""

    // Define variables for checking errors
    var valError1,
        valError2,
        hasEmptyField, isOutOfRange

    // define and declare variable for errorMessage tag and set it is empty
    var errorMess = "";

    if (smMul == "" || lgMul == "" || smCand == "" || lgCand == "") {
        hasEmptyField = true
        errorMess += "Please fill out all the fields.<br>";
    } else { hasEmptyField = false }
    console.log(isWithinRange(lgMul, min, max))

    if (!isWithinRange(smMul, min, max) || !isWithinRange(lgMul, min, max) || !isWithinRange(smCand, min, max) || !isWithinRange(lgCand, min, max)) {
        isOutOfRange = true;
        errorMess += "Input values must be between -50 and 50 <br>";
    } else { isOutOfRange = false; }

    // Check the max value bigger than min value for Column
    if (!hasEmptyField) {

        if (Number(smMul) > Number(lgMul)) {

            valError1 = true;
            errorMess += "Larger multiplier value can't be smaller than the smaller multiplier value. <br>";

        } else {
            valError1 = false;
        }
    }
    // Check the max value bigger than min value for Row
    if (!hasEmptyField) {
        if (Number(smCand) > Number(lgCand)) {
            valError2 = true;
            errorMess += "Larger multiplicand value can't be smaller than the smaller multiplicand value. <br>";
        } else {
            valError2 = false;
        }
    }
    console.log(errorMess);


    // or logical to return true or false
    if (valError1 || valError2 || hasEmptyField || isOutOfRange == true) {
        // print out the Error Message
        document.getElementById('errorMessage').innerHTML = "<br><font color=#FF0000> Invalid Input Detected:</font><br>" + errorMess;
        return false;
    } else {
        return true;
    }
}

function generateTable(smMul, lgMul, smCand, lgCand) {
    // cast all variable to Number for calculation to print out the dynamic table
    smMul = Number(smMul);
    lgMul = Number(lgMul);
    smCand = Number(smCand);
    lgCand = Number(lgCand);

    var element = document.getElementById("table-container");
    element.classList.add("table-container-style")
        // define and declare variable for CreateTable tag and set it is empty
    var CreateTable = "";
    // check variable use for determine when is the cell have background corlor or not
    var check = 0;
    CreateTable += "<table id='style-table'>";
    // console.log('fRow: %O', fRow); // For debug in Console
    // create table with rows based on input
    for (var row = 0; row <= (lgCand - smCand + 1); row++) {
        // open table tag
        CreateTable += "<tr>";
        // for create cell for each row (like column) 
        for (var col = 0; col <= (lgMul - smMul + 1); col++) {
            //console.log('Column: %O', col); // For debug in Console
            //console.log('Row: %O', row); // For debug in Console
            // if the cell is on first row and first column, empty space, else css style will be first
            if (row == 0) {
                CreateTable += "<td class='header'>" + ((col == 0) ? "" : (col + smMul - 1)) + "</td>";
                // if cell fall in first column, css style will be first
            } else if (col == 0) {
                CreateTable += "<td class='header'>" + (row + smCand - 1) + "</td>";
                // the rest of cell in the table with rest style
            } else {
                // cell background based on check variable
                CreateTable += ((Number(check) % 2 == 0) ? "<td class='child-blank'>" : "<td class='child-color'>") + ((row + smCand - 1) * (col + smMul - 1)) + "</td>";
                // increase check by 1
                check++;
            }
        }
        // reset check based on row to determind 0 or 1
        row % 2 == 0 ? check = 0 : check = 1;
        // closed row tag
        CreateTable += "</tr>";
    }
    CreateTable += "<td class='header'>";
    // closed table tag
    CreateTable += "</table>";

    // Print out the Dynamic table
    document.getElementById('table-container').innerHTML = CreateTable;
}

function isWithinRange(numToValidate, min, max) {
    return (numToValidate >= min && numToValidate <= max);

}

// function sub() {
//     var num1, num2, num3, num4;
//     var allNums = document.getElementsByClassName("inputNum");
//     // set the input values to newly created variables and use parseInt to make sure they are used as integers
//     num1 = parseInt(allNums[0].value, 10);
//     num2 = parseInt(allNums[1].value, 10);
//     num3 = parseInt(allNums[2].value, 10);
//     num4 = parseInt(allNums[3].value, 10);

//     createMultTable(num1, num2, num3, num4); // call function to actually create the mult table using the inputted values
// }

// function createMultTable(n1, n2, n3, n4) {

//     var tableSpace = document.getElementById("mTContainer"); // get the place in the HTML file where we will be adding the table
//     table = document.createElement("table"); // create the table element
//     table.setAttribute("id", "multTable"); // add an id to the table for styling

//     //place table tag into html file, in the specified table area
//     tableSpace.replaceChild(table, tableSpace.childNodes[0]);

//     // The nested for loops below create the multiplication table by
//     // going row by row, and multiplying each row value by the column
//     // value.
//     for (i = n3; i <= n4; i++) {
//         tr = document.createElement("tr"); //create a new row each iteration of the outer for loop
//         tr.setAttribute("class", "row"); // set class of table's row to "row" for easy styling

//         for (j = n1; j <= n2; j++) {
//             td = document.createElement("td"); // create a new column item within the row during each iteration of the inner loop
//             td.setAttribute("class", "column"); // set this column class to "column" for easy styling later on
//             td.innerHTML = i * j; // set the inner html of each place in the table to the proper multiplication product
//             tr.appendChild(td); // add the product to the row
//         }
//         table.appendChild(tr); // Add the row with all the products to the table, and then repeat for the user specified range
//     }
// }