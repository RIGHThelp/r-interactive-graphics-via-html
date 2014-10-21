
/**
 * @fileOverview operate between array to array
 */

/**
 * @description Function to invert data in array 
 *
 * @param {array} array an array to invert value(0 -> 1, 1 -> 0)
 * @param {array} numbers an array that want to change nodes' value
 * 
 * @returns {array} returnArray array that have inverted value from array 
 * 
 */
function invertValueArr (array, numbers) {
	
	var returnArray = array.slice(0);
	if (numbers.length == undefined) {
		returnArray[numbers] = (returnArray[numbers] + 1) % 2; 
	} else {
		for (var i=0; i<numbers.length; i++) {
			returnArray[numbers[i]] = (returnArray[numbers[i]] + 1) % 2;
		}
	}
	
	return returnArray;
}

/**
 * @description Function to make array data in array 
 *
 * @param {array} numbers an array that want to change nodes
 * @param {number} length length of array that want to make
 * @param {number} value number that want to insert in new array
 * 
 * @returns {array} returnArray new array with value 
 * 
 */
function extensionArr (numbers, length, value) {
	
	var returnArray = new Array(length);
	for (var i=0; i<length; i++) {
		returnArray[i] = 0;
	}
	
	if (numbers.length == undefined) {
		returnArray[numbers] = value;
	} else {
		for (var i=0; i<numbers.length; i++) {
			returnArray[numbers[i]] = value;
		}
	}
		
	return returnArray;
}

/**
 * @description Function to make array that have result of two array's addition
 *
 * @param {array} array1 first array that want to add
 * @param {array} array2 second array that want to add
 * 
 * @returns {array} returnArray new array with adding value 
 * 
 */
function addArr (array1, array2) {
	
	var returnArray = new Array(array1.length);
	if (array1.length == array2.length) {	
		for (var i=0; i<array1.length; i++) {
			returnArray[i] = array1[i] + array2[i];
		}
	} else {
		alert("Cannot add arrays: the length of arrays are different");
	}
	
	return returnArray;
}

/**
 * @description Function to make array that have result of two array's substraction
 *
 * @param {array} array1 first array that want to substract
 * @param {array} array2 second array that want to substract
 * 
 * @returns {array} returnArray new array with substracted value 
 * 
 */
function subtractArr (array1, array2) {
	
	var returnArray = new Array(array1.length);
	if (array1.length == array2.length) {
		for (var i=0; i<array1.length; i++) {
			returnArray[i] = array1[i] - array2[i];			
		}
	} else {
		alert("Cannot subtract arrays: the length of arrays are different");
	}
	
	return returnArray;
}

/**
 * @description Function to make 2 dimension array that have p2cArr value
 *
 * @param {array} p2cArr array that want to copy in new array
 * @param {array} c2pArr decision array length of returnArray
 * 
 * @returns {array} returnArray new array (p2cArr.length by c2pArr.length)
 * 
 */
function mergeParentChildArr (p2cArr, c2pArr) {

	var returnArray = new Array(p2cArr.length);
	for (var i=0; i<returnArray.length; i++) {
		returnArray[i] = new Array(c2pArr.length);
		
		for (var j=0; j<returnArray[i].length; j++) {
			returnArray[i][j] = 0;
		}
	}	
	
	for (var i=0; i<p2cArr.length; i++) {
		if (p2cArr[i].length == undefined) {
			if (p2cArr[i] != -1) {
				returnArray[i][p2cArr[i]] = 1;
			}
		} else {
			for (var j=0; j<p2cArr[i].length; j++) {
				returnArray[i][p2cArr[i][j]] = 1;
			}
		}
	}
	
	return returnArray;
}

/**
 * @description Function to make array that have result of two array's multiplication
 *
 * @param {array} array1 first array that want to multiply
 * @param {number} dimension1 number of array1's dimension
 * @param {array} array2 second array that want to multiply
 * @param {number} dimension2 number of array2's dimension
 * 
 * @returns {array} returnArray new array with multiplied value 
 * 
 */
function mulArr (array1, dimension1, array2, dimension2) {
	
	var returnArray = new Array(array2[0].length);
	if (dimension1 == 1 && dimension2 == 2) { // 1D X 2D
		if (array1.length == array2.length) {
			for (var i=0; i<array2[0].length; i++) {
				var temp = 0;
				for (var j=0; j<array2.length; j++) {
					temp = temp + array1[j]*array2[j][i];
				}
				returnArray[i] = temp;
			}
		} else {
			alert("Cannot multply arrays: the length of arrays are different");
		}
	}
	
	return returnArray;
}

/**
 * @description Function to make array that have result of orthogonal operate
 *
 * @param {array} array first array that want to orthogonal operation
 * @param {number} dimension number of array's dimension
 * 
 * @returns {array} returnArray new array with orthogonal array from param's array 
 * 
 */
function makeOrthogonalArr (array, dimension) {
	
	var returnArray = new Array(array[0].length);
	if (dimension == 2) {
		for (var i=0; i<returnArray.length; i++) {
			returnArray[i] = new Array(array.length);
		}
		for (var i=0; i<returnArray.length; i++) {
			for(var j=0; j<returnArray[0].length; j++) {
				returnArray[i][j] = array[j][i];
			}
		}
	}
	
	return returnArray;
}

/**
 * @description Function to print array's value in html
 *
 * @param {array} array array that want to print
 * @param {number} dimension number of array's dimension
 * 
 */
function printArr (array, dimension) {
	
	if (dimension == 1) {
		document.write("[ ");
		for (var i=0; i<array.length; i++) {
			document.write(array[i] + " ");
		}
		document.write("]");
	} else if (dimension == 2) {
		for (var i=0; i<array.length; i++) {
			document.write("[ ");
			for (var j=0; j<array[i].length; j++) {
				document.write(array[i][j] + " ");
			}
			document.write("]");
		}
	}
}
