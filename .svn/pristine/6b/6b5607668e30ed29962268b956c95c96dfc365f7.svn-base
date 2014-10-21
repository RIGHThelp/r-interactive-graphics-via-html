
/**
 * @fileOverview test array.js
 */

function test_invertValueArr () {
	
	var test_array = [1, 1, 0, 1, 1, 0, 0, 1, 0, 1];
	var test_number = 3;
	
	var returnArray = invertValueArr(test_array, test_number);
	var answerArray = [1, 1, 0, 0, 1, 0, 0, 1, 0, 1];
	
	for(var i=0; i<answerArray.length; i++) {
		if(returnArray[i] != answerArray[i]) {
			alert("The element of arrays are different(single number invert)");
			return;
		}
	}
	
	var test_number = [1, 3, 5, 7];
	var returnArray = invertValueArr(test_array, test_number);
    var answerArray = [1, 0, 0, 0, 1, 1, 0, 0, 0, 1];
    
    for(var i=0; i<answerArray.length; i++) {
		if(returnArray[i] != answerArray[i]) {
			alert("The element of arrays are different(multiple number invert)");
			return;
		}
	}
	
	alert("test_invertValueArr finish");
}

function test_extensionArr () {
	
	var test_numbers = [1, 2, 5, 9];
	var test_length = 10;
	var test_value = 1;
	
	var returnArray = extensionArr(test_numbers, test_length, test_value);
	var answerArray = [0, 1, 1, 0, 0, 1, 0, 0, 0, 1];
	
	if(returnArray.length != test_length) {
		alert("The length of arrays are different");
		return;
	}
	
	for(var i=0; i<test_length; i++) {
		if(returnArray[i] != answerArray[i]) {
			alert("The element of arrays are different(multiple number invert)");
			return;
		}
	}
	
	alert("test_extensionArr finish");
}

function test_addArr () {
	
	var test_array1 = [1, 0, 1, -1, 0, 1, 1, 0, -1, 0];
	var test_array2 = [0, 1, -1, 1, 1, 0, 0, -1, 1, 1];
	
	var returnArray = addArr(test_array1, test_array2);
	var answerArray = [1, 1, 0, 0, 1, 1, 1, -1, 0, 1];
	
	for(var i=0; i<test_array1.length; i++) {
		if(returnArray[i] != answerArray[i]) {
			alert("The result of arrays are different");
			return;
		}
	}
	
	alert("test_addArr finish");
}

function test_subtractArr () {
	
	var test_array1 = [1, 0, 1, 1, 0, 1, 1, 0, 1, 0];
	var test_array2 = [0, 1, 1, 0, 1, 0, 0, -1, 1, 1];
	
	var returnArray = subtractArr(test_array1, test_array2);
	var answerArray = [1, -1, 0, 1, -1, 1, 1, 1, 0, -1];
	
	for(var i=0; i<test_array1.length; i++) {
		if(returnArray[i] != answerArray[i]) {
			alert("The result of arrays are different");
			return;
		}
	}
	
	alert("test_subtractArr finish");
}

function test_mulArr () {
	
	var test_array1 = [1, 1, 0, 1, 1];
	var test_dimension1 = 1;
	var test_array2 = [[0, 1, 0, 1, 1], [0, 1, 1, 0, 1], [1, 1, 0, 0, 1], [1, 1, 1, 0, 0], [1, 1, 0, 1, 0]];
	var test_dimension2 = 2;
	
	var returnArray = mulArr(test_array1, test_dimension1, test_array2, test_dimension2)
	var answerArray = [2, 4, 2, 2, 2]
	
	if(returnArray.length != answerArray.length) {
		alert("The length of arrays are different");
		return;
	}
	
	for(var i=0; i<answerArray.length; i++) {
		if(returnArray[i] != answerArray[i]) {
			alert("The result of arrays are different");
			return;
		}
	}
	
	alert("test_mulArr finish");
}

function test_makeOrthogonalArr() {
	
	var test_array = [[0, 1, 0, 1, 1], [0, 1, 1, 0, 1], [1, 1, 0, 0, 1], [1, 1, 1, 0, 0], [1, 1, 0, 1, 0]];
	var test_dimension = 2;
	
	var returnArray = makeOrthogonalArr(test_array, test_dimension);
	var answerArray = [[0, 0, 1, 1, 1], [1, 1, 1, 1, 1], [0, 1, 0, 1, 0], [1, 0, 0, 0, 1], [1, 1, 1, 0, 0]];
				
	for (var i=0; i<returnArray.length; i++) {
		for(var j=0; j<returnArray[0].length; j++) {
			if(returnArray[i][j] != answerArray[i][j]) {
				alert("The result of arrays are different");
				return;
			}
		}
	}
		
	alert("test_makeOrthogonalArr finish");
}
