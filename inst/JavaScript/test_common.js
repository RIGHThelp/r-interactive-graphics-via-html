/**
 * @fileOverview test common.js
 */

function test_getFields() {
	
	var test_dataObj = {A:"text A", 
		B:"text B", 
		offloadObjArr:"text offloadObjArr", 
		C:"text C", 
		optionObj:"text optionObj", 
		dataNumArr:"text dataNumArr",
		$ans:"text $ans",
		};
		
	var returnArray = getFields(test_dataObj);
	var answerArray = ["A", "B", "C", "dataNumArr"];
	
	if(returnArray.length != answerArray.length) {
		alert("The length of arrays are different");
		return;
	}
	
	for(var i=0; i<answerArray.length; i++) {
		
		if(returnArray[i] == "offloadObjArr" || returnArray[i] == "$ans") {
			alert("This element must be eliminated from this array");
			return;
		}
		
		if(returnArray[i] != answerArray[i]) {
			alert("The element of arrays are different");
			return;
		}
	}
	
	alert("test_getFields finish");
}

function test_nullUpdate () {
	
	var test_array1 = [1, 2, 3, 4, 5];
	var test_array2 = ["A", "B", "C", "D", "E"];
	var test_array3 = ["To be or not to be, that is problem"];
	
	var returnArray = nullUpdate(test_array1, test_array2, test_array3);
	
	if(returnArray != null) {
		alert("The result of arrays are different");
		return;
	}
	
	alert("test_nullUpdate finish");
}

function test_findMaxMinValue () {
	
	var test_Data = 5;
	var returnArray = findMaxMinValue(test_Data);
	
	if(returnArray.max != 5) {
		alert("The result of max value is different");
		return;
	}
	
	if(returnArray.min != 5) {
		alert("The result of min value is different");
		return;
	}
	
	test_Data = [1, 6, 7, 2, 10, 5, 8, 3, 4, 9];
	returnArray = findMaxMinValue(test_Data);
	
	if(returnArray.max != 10) {
		alert("The result of max value is different");
		return;
	}
	
	if(returnArray.min != 1) {
		alert("The result of min value is different");
		return;
	}
	
	alert("test_findMaxMinValue finish");
}
