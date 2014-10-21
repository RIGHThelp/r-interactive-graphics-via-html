
/**
 * @fileOverview test structure.js
 */

function test_make2DArr () {
	
	var test_rows = 5;
	var returnArray = make2DArr(test_rows);
	
	if(returnArray.length != test_rows) {
		alert("The length of returnArray.length is different");
		return;
	}
	
	alert("test_make2DArr finish");
}

function test_createMainStructureE () {
	
	var test_rawArr = {
		"carat":[0.23,0.21,0.23,0.29,0.31,0.24],
		"cut":{"level":["Fair","Good","Very Good","Premium","Ideal"],"index":[4,3,1,3,1,2]},
		"color":{"level":["D","E","F","G","H","I","J"],"index":[1,1,1,5,6,6]},
		"clarity":{"level":["I1","SI2","SI1","VS2","VS1","VVS2","VVS1","IF"],"index":[1,2,4,3,1,5]},
		"depth":[61.5,59.8,56.9,62.4,63.3,62.8],
		"table":[55,61,65,58,58,57],
		"price":[326,326,327,334,335,336],
		"x":[3.95,3.89,4.05,4.2,4.34,3.94],
		"y":[3.98,3.84,4.07,4.23,4.35,3.96],
		"z":[2.43,2.31,2.31,2.63,2.75,2.48]}

	var test_labelArr = ["carat", "cut", "color", "clarity", "depth", "table", "price", "x", "y", "z"];
	var returnObject = createMainStructureE(test_rawArr);
	
	if(returnObject.$id != 0) {
		alert("The element of id is different");
		return;
	}
	
	for(var i=0; i<test_labelArr.length; i++) {
		if(returnObject.labelArr[i] != test_labelArr[i]) {
			alert("The element of labelArr are different");
			return;
		}
	}
	
	alert("test_createMainStructureE finish");
}

/**  addField  **/
//add new field and return added field.
function addField (obj, fieldName) {
	if (obj[fieldName] == undefined)
		obj[fieldName] = new Object();
	return obj[fieldName];
}
/**  addField End  **/
