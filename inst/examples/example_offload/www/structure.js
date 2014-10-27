
/**
 * @fileOverview operate basic functions to load data from data.js
 */

 /**  
 * @description make array which loaded data from csv file
 * 
 * @param data raw data which loaded from csv file
 * 
 * @returns result_array
 * 
 */
function csv2Arr (data, liveChar) {  
	var i = 0;
	var eof = '';
	var cursor = data.charAt(i);
	var result_array = new Array();
	var result_row = "";
	var line = 0;
	while (cursor != eof) {
		if ((cursor == '\"') || (cursor == '\r') ||(cursor == '\t')||(cursor == ';')) {
		} else if ( cursor == "\n" ) {
			if (result_array.length <= line) {
				result_array.push(new Array());
				result_array[line].push(result_row);
				result_row = "";
				line++;
			}
		} else {
			result_row += cursor;
		}
		cursor = data.charAt(i++);
	}
	return result_array;
}

 /**  
 * @description load data from csv file
 * 
 * @param fileName csv file name which want to load
 * 
 * @returns dataArr number of data
 * @returns labelArr levels of data which are discrete
 * 
 */
function getData (fileName) {
	var filePath = fileName;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", filePath, false);
	xmlhttp.send(null);
	var fileContent = xmlhttp.responseText;
	var tempArr = csv2Arr(fileContent);
	var returnLabelArr = tempArr[0].toString().split(',');	
	tempArr.shift();
	var returnDataArr = tempArr;
	return { 'dataArr' : returnDataArr, 'labelArr' : returnLabelArr };
}

/**  
 * @description make 2 dimension arr
 * 
 * @param row number that want to make array size
 * 
 * @returns arr array which are made row by row
 * 
 */
function make2DArr (rows) {
	var arr = [];
	for (var i=0; i<rows; i++)
		arr[i] = [];
	return arr;
}

/**  
 * @description create main structure of data
 * 
 * @param rawArr data which are loaded from data.js
 * 
 * @returns mainArr main structure which have basic information about data
 * 
 */
function createMainStructureE (rawArr) {
	var mainArr = new Object();	
	mainArr._type = 'rootObj';
	// for tree & event part //
	mainArr.$id = 0;
	mainArr.parent = null;
	mainArr.child = null;
	mainArr.$drawFence = new Array();
	mainArr.graphObjArr = new Array();
	mainArr.$drawGraphArr = new Array();
	mainArr.refreshArr = new Array();
	///////////////////////////
	if (typeof(rawArr) == "object") {
		var labelArr = Object.keys(rawArr);		
		for (i=0; i<labelArr.length; i++) {
			if(rawArr[labelArr[i]].level == null) {
				mainArr[labelArr[i]] = rawArr[labelArr[i]];
			} else {
				mainArr[labelArr[i]] = rawArr[labelArr[i]].index;
				mainArr[labelArr[i]].index = rawArr[labelArr[i]].level;
				mainArr[labelArr[i]].isDiscrete = true;
			}
		}
		mainArr.$isOffload = false;
		mainArr.labelArr = labelArr; // for table.
		mainArr.$ans = {};
		
		mainArr.$isSelected = new Array();
		mainArr.$dataNumArr = new Array();
		mainArr.$isHidden = new Array();		
		for(var i=0; i<mainArr[labelArr[0]].length; i ++) {
			mainArr.$isSelected[i] = 0;
			mainArr.$dataNumArr[i] = i;
			mainArr.$isHidden[i] = false;
		}		
	} else {
		mainArr.$isOffload = true;		
		mainArr.relateObjName = rawArr;
		if (window[rawArr].offloadObjArr == null) {
			window[rawArr].offloadObjArr = new Array();
		    window[rawArr].offloadObjArr.push(mainArr);
		} else {
			window[rawArr].offloadObjArr.push(mainArr);
		}
		mainArr.$sendData = sendingData(rawArr);
	}
	mainArr.draw = function () {
		return draw(mainArr);
	};
	return mainArr;
}

/**  
 * @description send changed data when server-offloading graph draw
 * 
 * @param relateObjName data object which want to draw server-offloading graph
 * 
 * @ignore
 * 
 */
function sendingData (relateObjName) {
	return function () {
		window.Shiny.onInputChange(relateObjName, window[relateObjName].$isHidden);
	};
}

/**  
 * @description function call to draw graphs
 * 
 * @param dataObj data which want to draw graph
 * 
 */
function draw (dataObj) {
	for (var i=0; i<dataObj.graphObjArr.length; i++) {
		dataObj.graphObjArr[i]._draw();
	}
	
	if (dataObj.child != null) {
		for (var i=0; i<dataObj.child.length; i++) {
			var child = dataObj.child[i];
			child._calculate();
			draw(child);
		}
	}	
}

/**  
 * @description create main structure of data when use csv file
 * 
 * @param fileName csv file name that want to load
 * @param rawLev label array about discrete data
 * 
 * @returns mainArr main structure which have basic information about data
 * 
 * @ignore
 * 
 */
/*
function createMainStructure (fileName, rawLev) {  
	var tmpArr = getData(fileName);	
	var mainArr = new Object();
	var dataArr = tmpArr.dataArr;
	var labelArr = tmpArr.labelArr;
	var pos = rawLev.Pos;
	var isSelected = make2DArr(dataArr.length);
  
	for (var i=0; i<dataArr.length; i++) {
		mainArr[labelArr[i]] = new Array();
	}

	for (var i=0; i<dataArr.length; i++) {
		var tmpArr = dataArr[i].toString().split(',');
		for (var j=0; j<labelArr.length; j++) {
			mainArr[labelArr[j]][i] = parseFloat(tmpArr[j]);
		}
		isSelected[i][0] = 0;
	}
	
	for (var j=0; j<pos.length; j++) {
		mainArr[labelArr[pos[j]]].isDiscrete = true;
		mainArr[labelArr[pos[j]]].index = rawLev.Levels[j];
	}
	
	mainArr._type = 'rootObj';
	mainArr.offloadObjArr = null;
	mainArr.labelArr = labelArr; // for table.
	
	makeEventComponent(mainArr);
	mainArr.$drawFence = isSelected;
	mainArr.$ans = "undefined";
	mainArr.$isSelected = new Array();
	mainArr.$id = 1;
	mainArr.refreshArr = new Array();
	mainArr.refreshArr[0] = null;
	mainArr.$dataNumArr = new Array();
	mainArr.$isHidden = new Array();
	
	for (var i=0; i<mainArr[labelArr[0]].length; i++) {
		mainArr.$dataNumArr[i] = i;
		mainArr.$isHidden[i] = false;
	}
	
	return mainArr;
}
*/  

/**  MakeLineObj  **/
var MakeLineObj = {};
(function() {
	MakeLineObj = function(dataObj, xLabel, yLabel, optionObj) {
		// for tree & event part //
		this.$id = 0;
		this.parent = dataObj;
		if (dataObj.child == null) {
			dataObj.child = new Array();
		}
		dataObj.child.push(this);
		this.child = null;
		this.$drawFence = new Array();
		this.graphObjArr = new Array();
		this.refreshArr = new Array();
		this.$isSelected = new Array();
		this._type = 'lineObj';
		this.dataObj = dataObj;
		this.xLabel = xLabel;
		this.yLabel = yLabel;
		this.optionObj = optionObj;
		this.$isOffload = dataObj.$isOffload;
	};
	MakeLineObj.prototype = {
		_calculate: function () {
			var xLabel = this.xLabel;
			var yLabel = this.yLabel;
			var dataObj = this.dataObj;
			var optionObj = this.optionObj;
			
			if (optionObj.group != undefined) {
				gLabel = optionObj.group;
			} else {
				gLabel = 'NULL';
			}
			this.gLabel = gLabel;
			if (gLabel != 'NULL' && dataObj[gLabel].isDiscrete != undefined) {
				this.groupOn = true;
				this.labelArr = ['x1', 'y1', 'x2', 'y2', gLabel];
			} else {
				this.groupOn = false;
				this.labelArr = ['x1', 'y1', 'x2', 'y2'];
			}

			if (this.groupOn == true) { // draw line with group
				this.x1 = new Array();
				this.x2 = new Array();
				this.y1 = new Array();
				this.y2 = new Array();
				this[gLabel] = new Array();
				var p2cArr = new Array(dataObj[xLabel].length);
				var c2pArr = new Array();
				var lineCnt = -1;
				var newGroup = 1;
				for (var i=0; i<dataObj[gLabel].index.length; i++) { // for one sub group
					var groupTemp = new Array();
					for (var j=0; j<dataObj[gLabel].length; j++) { // search all data
						if (i == dataObj[gLabel][j]) { // save groupTemp
							groupTemp.push(j);
						}
					}
					if (groupTemp.length > 1) {
						if (groupTemp.length > 2) {
							for (var j=0; j<groupTemp.length-1; j++) {
								this.x1.push(dataObj[xLabel][groupTemp[j]]);
								this.x2.push(dataObj[xLabel][groupTemp[j+1]]);
								this.y1.push(dataObj[yLabel][groupTemp[j]]);
								this.y2.push(dataObj[yLabel][groupTemp[j+1]]);
								this[gLabel].push(i);
								if (lineCnt == -1) {
									lineCnt ++;
								}
								if (newGroup == 1) {
									newGroup = 0;
									p2cArr[groupTemp[j]] = lineCnt;
								} else {
									p2cArr[groupTemp[j]] = [lineCnt, lineCnt+1];
									lineCnt ++;
								}
								c2pArr[lineCnt] = [groupTemp[j], groupTemp[j+1]];
							}
							newGroup = 1;
							p2cArr[groupTemp[j]] = lineCnt;
							lineCnt ++;
						} else { // groupTemp.length == 2
							this.x1.push(dataObj[xLabel][groupTemp[0]]);
							this.x2.push(dataObj[xLabel][groupTemp[1]]);
							this.y1.push(dataObj[yLabel][groupTemp[0]]);
							this.y2.push(dataObj[yLabel][groupTemp[1]]);
							this[gLabel].push(i);
							if (lineCnt == -1) {
								lineCnt ++;
							}
							p2cArr[groupTemp[0]] = lineCnt;
							p2cArr[groupTemp[1]] = lineCnt;
							c2pArr[lineCnt] = [groupTemp[0], groupTemp[1]];
							lineCnt ++;
						}
					} else {
						p2cArr[groupTemp] = -1; // disconnected dot
					}
				}
				this[gLabel].isDiscrete = true;
				this[gLabel].colorIndex = dataObj[gLabel].colorIndex;
				this[gLabel].index = dataObj[gLabel].index;		
			} else {
				this.x1 = new Array(dataObj[xLabel].length - 1);
				this.x2 = new Array(dataObj[xLabel].length - 1);
				this.y1 = new Array(dataObj[xLabel].length - 1);
				this.y2 = new Array(dataObj[xLabel].length - 1);
				this[gLabel] = new Array();
				for (var i=0; i<this.x1.length; i++) {
					this.x1[i] = dataObj[xLabel][i];
					this.x2[i] = dataObj[xLabel][i+1];
					this.y1[i] = dataObj[yLabel][i];
					this.y2[i] = dataObj[yLabel][i+1];
					this[gLabel].push(i);
				}
				
				var p2cArr = new Array(dataObj[xLabel].length);
				var c2pArr = new Array(dataObj[xLabel].length - 1);
				for (var i=0; i<c2pArr.length; i++) {
					p2cArr[i] = [i-1, i];
					c2pArr[i] = [i, i+1];
				}
				p2cArr[0] = 0;
				p2cArr[i] = i-1;
			}
			// make event handle part.
			this.mergeArr = mergeParentChildArr(p2cArr, c2pArr);
			for (var i=0; i<c2pArr.length; i++) {
				this.$isSelected[i] = 0;
			}
		},
		_reCalculate: function () {
			var xLabel = this.xLabel;
			var yLabel = this.yLabel;
			var dataObj = this.dataObj;
			var optionObj = this.optionObj;
			
			if (optionObj.group != undefined) {
				gLabel = optionObj.group;
			} else {
				gLabel = 'NULL';
			}
			this.gLabel = gLabel;
			if (gLabel != 'NULL' && dataObj[gLabel].isDiscrete != undefined) {
				this.groupOn = true;
				this.labelArr = ['x1', 'y1', 'x2', 'y2', gLabel];
			} else {
				this.groupOn = false;
				this.labelArr = ['x1', 'y1', 'x2', 'y2'];
			}

			if (this.groupOn == true) { // draw line with group
				this.x1 = new Array();
				this.x2 = new Array();
				this.y1 = new Array();
				this.y2 = new Array();
				this[gLabel] = new Array();
				var p2cArr = new Array(dataObj[xLabel].length);
				var c2pArr = new Array();
				var lineCnt = -1;
				var newGroup = 1;
				for (var i=0; i<dataObj[gLabel].index.length; i++) { // for one sub group
					var groupTemp = new Array();
					for (var j=0; j<dataObj[gLabel].length; j++) { // search all data
						if (i == dataObj[gLabel][j]) { // save groupTemp
							groupTemp.push(j);
						}
					}
					if (groupTemp.length > 1) {
						if (groupTemp.length > 2) {
							for (var j=0; j<groupTemp.length-1; j++) {
								this.x1.push(dataObj[xLabel][groupTemp[j]]);
								this.x2.push(dataObj[xLabel][groupTemp[j+1]]);
								this.y1.push(dataObj[yLabel][groupTemp[j]]);
								this.y2.push(dataObj[yLabel][groupTemp[j+1]]);
								this[gLabel].push(i);
								if (lineCnt == -1) {
									lineCnt ++;
								}
								if (newGroup == 1) {
									newGroup = 0;
									p2cArr[groupTemp[j]] = lineCnt;
								} else {
									p2cArr[groupTemp[j]] = [lineCnt, lineCnt+1];
									lineCnt ++;
								}
								c2pArr[lineCnt] = [groupTemp[j], groupTemp[j+1]];
							}
							newGroup = 1;
							p2cArr[groupTemp[j]] = lineCnt;
							lineCnt ++;
						} else { // groupTemp.length == 2
							this.x1.push(dataObj[xLabel][groupTemp[0]]);
							this.x2.push(dataObj[xLabel][groupTemp[1]]);
							this.y1.push(dataObj[yLabel][groupTemp[0]]);
							this.y2.push(dataObj[yLabel][groupTemp[1]]);
							this[gLabel].push(i);
							if (lineCnt == -1) {
								lineCnt ++;
							}
							p2cArr[groupTemp[0]] = lineCnt;
							p2cArr[groupTemp[1]] = lineCnt;
							c2pArr[lineCnt] = [groupTemp[0], groupTemp[1]];
							lineCnt ++;
						}
					} else {
						p2cArr[groupTemp] = -1; // disconnected dot
					}
				}
				this[gLabel].isDiscrete = true;
				this[gLabel].colorIndex = dataObj[gLabel].colorIndex;
				this[gLabel].index = dataObj[gLabel].index;		
			} else {
				this.x1 = new Array(dataObj[xLabel].length - 1);
				this.x2 = new Array(dataObj[xLabel].length - 1);
				this.y1 = new Array(dataObj[xLabel].length - 1);
				this.y2 = new Array(dataObj[xLabel].length - 1);
				this[gLabel] = new Array();
				for (var i=0; i<this.x1.length; i++) {
					this.x1[i] = dataObj[xLabel][i];
					this.x2[i] = dataObj[xLabel][i+1];
					this.y1[i] = dataObj[yLabel][i];
					this.y2[i] = dataObj[yLabel][i+1];
					this[gLabel].push(i);
				}
				
				var p2cArr = new Array(dataObj[xLabel].length);
				var c2pArr = new Array(dataObj[xLabel].length - 1);
				for (var i=0; i<c2pArr.length; i++) {
					p2cArr[i] = [i-1, i];
					c2pArr[i] = [i, i+1];
				}
				p2cArr[0] = 0;
				p2cArr[i] = i-1;
			}
			// make event handle part.
			this.$isSelected = new Array();
			this.mergeArr = mergeParentChildArr(p2cArr, c2pArr);
			for (var i=0; i<c2pArr.length; i++) {
				this.$isSelected[i] = 0;
			}
		}
	};
})();
/**  MakeLineObj End  **/

/**  MakeBoxObj  **/
var MakeBoxObj = {};
(function() {
	
	MakeBoxObj = function(dataObj, xLabel, yLabel, optionObj) {		
		this.$id = 0;
		this.parent = dataObj;
		if (dataObj.child == null) {
			dataObj.child = new Array();
		}
		dataObj.child.push(this);
		this.child = null;
		this.$drawFence = new Array();
		this.graphObjArr = new Array();
		this.refreshArr = new Array();
		this.$isSelected = new Array();
		
		this._type = 'boxObj';
		this.dataObj = dataObj;
		this.xLabel = xLabel;
		this.yLabel = yLabel;
		this.optionObj = optionObj;
		this.$isOffload = dataObj.$isOffload;
		
		this._calculate();
	};
	MakeBoxObj.prototype = {
		_calculate: function() {
			// reload data.
			var dataObj = this.dataObj;
			var xLabel = this.xLabel;
			var yLabel = this.yLabel;
			var optionObj = this.optionObj;
			
			for (var i=0; i<xLabel.length; i++) {
				this[xLabel[i]] = new Array();
				if (dataObj[xLabel[i]].isDiscrete != undefined) {
					this[xLabel[i]].isDiscrete = dataObj[xLabel[i]].isDiscrete;
					this[xLabel[i]].index = dataObj[xLabel[i]].index;
				}
			}
			
			if(dataObj[xLabel].isDiscrete == true){
				// discrete.
				var isDiscrete = true;
				var boxNum = dataObj[xLabel].index.length;
				var boxNumDataArr = make2DArr(boxNum);
				var boxNumDataNumArr = make2DArr(boxNum);
				// push elements into each box.
				for(var i = 0 ; i < dataObj[xLabel].length ; i ++){
					if(dataObj[xLabel][i] == undefined){
						alert(i + ", " + dataObj[xLabel][i]);
					}
					
					boxNumDataArr[dataObj[xLabel][i]].push(dataObj[yLabel][i]);
					boxNumDataNumArr[dataObj[xLabel][i]].push(i);
				}			
			}else{
				var isDiscrete = false;
				var boxNum = 1;
				var boxNumDataArr = new Array();
				var boxNumDataNumArr = new Array();
				boxNumDataArr[0] = dataObj[yLabel];
				boxNumDataNumArr[0] = new Array();
				for(var i = 0 ; i < dataObj[yLabel].length ; i ++){
					boxNumDataNumArr[0][i] = i;
				}
			}
			
			this[xLabel] = dataObj[xLabel];
			this[yLabel] = dataObj[yLabel];
			// make tags.
			this.x = new Array();
			this.y = new Array();

			this.median = new Array();
			this.q1 = new Array();
			this.q3 = new Array();
			this.upperFence = new Array();
			this.lowerFence = new Array();
			this.isOutlier = new Array();
			
			var hasArr = new Array();
			var stableSort = function(dataA, dataB){
			    if (dataA.a == dataB.a) return dataA.b > dataB.b ? 1 : -1;
			    if (dataA.a > dataB.a) return 1;
			    return -1;
			};		
			// calculate tags.
			var nodeCnt = 0;
			for(var i = 0 ; i < boxNum ; i ++){
				// copy value of array.
				var tempArr = boxNumDataArr[i].slice(0);
				var tempDataNumberArr = new Array();
				var outliers = new Array();
				var outliersDataNumber = new Array();			

				for(j = 0 ; j < tempArr.length; j ++){
					tempArr[j] = {a: tempArr[j], b: j};
				}
				// sort data
				tempArr.sort(stableSort);
				
				for(var j = 0 ; j < tempArr.length ; j ++){
					tempDataNumberArr[j] = boxNumDataNumArr[i][tempArr[j].b];
					tempArr[j] = tempArr[j].a;
				}
				// get values which are needed to draw box.
				var q3 = findQuartile(tempArr, 3);
				var median = findQuartile(tempArr, 2);
				var q1 = findQuartile(tempArr, 1);
				// calculate upper fence.
				var tmpUpFence = findMaxBelowFence(tempArr, q1, q3);
				var upperFence = tmpUpFence.fence;
				var upperFenceNumber = tmpUpFence.fenceNumber;
				// extract upper outliers.
				for(var j = upperFenceNumber + 1 ; j < tempArr.length ; j ++){
					outliers.push(tempArr[j]);
					outliersDataNumber.push(tempDataNumberArr[j]);
				}
				// calculate below fence.
				var tmpDownFence = findMinAboveFence(tempArr, q1, q3);
				var lowerFence = tmpDownFence.fence;
				var lowerFenceNumber = tmpDownFence.fenceNumber;
				// extract upper outliers.
				for(var j = 0 ; j < lowerFenceNumber ; j ++){
					outliers.push(tempArr[j]);
					outliersDataNumber.push(tempDataNumberArr[j]);
				}
				
				//set tag and hasArr with box data.
				this.median[nodeCnt] = median;
				this.isOutlier[nodeCnt] = false;
				this.q1[nodeCnt] = q1;
				this.q3[nodeCnt] = q3;
				this.upperFence[nodeCnt] = upperFence;
				this.lowerFence[nodeCnt] = lowerFence;
				this.x[nodeCnt] = i;
				this.y[nodeCnt] = q3;
				
				// save hasArr.
				hasArr[nodeCnt] = new Array();
				for(var j = lowerFenceNumber ; j < upperFenceNumber + 1 ; j ++){
					hasArr[nodeCnt].push(tempDataNumberArr[j]);
				}
				//alert(hasArr[nodeCnt]);
				nodeCnt ++;
				
				//set tag and hasArr with outlier data.
				for(var j = 0 ; j < outliers.length ; j ++, nodeCnt ++){
					this.median[nodeCnt] = 0;
					this.isOutlier[nodeCnt] = true;
					this.q1[nodeCnt] = 0;
					this.q3[nodeCnt] = 0;
					this.upperFence[nodeCnt] = 0;
					this.lowerFence[nodeCnt] = 0;
					this.x[nodeCnt] = i;
					this.y[nodeCnt] = outliers[j];
					hasArr[nodeCnt] = new Array();
					hasArr[nodeCnt].push(outliersDataNumber[j]);
				}
			}
			// event set
			var p2cArr = new Array(dataObj[xLabel].length);			
			for(var i = 0 ; i < hasArr.length ; i ++){
				for(var j = 0 ; j < hasArr[i].length ; j ++){
					p2cArr[hasArr[i][j]] = i;
				}		
			}	
		
			this.mergeArr = mergeParentChildArr(p2cArr, hasArr);			
			for (var i=0; i<hasArr.length; i++) {
				this.$isSelected[i] = 0;
			}
		},
		_reCalculate: function() {
			// reload data.
			var dataObj = this.dataObj;
			var xLabel = this.xLabel;
			var yLabel = this.yLabel;
			var optionObj = this.optionObj;
			
			for (var i=0; i<xLabel.length; i++) {
				this[xLabel[i]] = new Array();
				if (dataObj[xLabel[i]].isDiscrete != undefined) {
					this[xLabel[i]].isDiscrete = dataObj[xLabel[i]].isDiscrete;
					this[xLabel[i]].index = dataObj[xLabel[i]].index;
				}
			}
			
			if(dataObj[xLabel].isDiscrete == true){
				// discrete.
				var isDiscrete = true;
				var boxNum = dataObj[xLabel].index.length;
				var boxNumDataArr = make2DArr(boxNum);
				var boxNumDataNumArr = make2DArr(boxNum);
				// push elements into each box.
				for(var i = 0 ; i < dataObj[xLabel].length ; i ++){
					if(dataObj[xLabel][i] == undefined){
						alert(i + ", " + dataObj[xLabel][i]);
					}
					
					boxNumDataArr[dataObj[xLabel][i]].push(dataObj[yLabel][i]);
					boxNumDataNumArr[dataObj[xLabel][i]].push(i);
				}			
			}else{
				var isDiscrete = false;
				var boxNum = 1;
				var boxNumDataArr = new Array();
				var boxNumDataNumArr = new Array();
				boxNumDataArr[0] = dataObj[yLabel];
				boxNumDataNumArr[0] = new Array();
				for(var i = 0 ; i < dataObj[yLabel].length ; i ++){
					boxNumDataNumArr[0][i] = i;
				}
			}
			
			this[xLabel] = dataObj[xLabel];
			this[yLabel] = dataObj[yLabel];
			// make tags.
			this.x = new Array();
			this.y = new Array();

			this.median = new Array();
			this.q1 = new Array();
			this.q3 = new Array();
			this.upperFence = new Array();
			this.lowerFence = new Array();
			this.isOutlier = new Array();
			var hasArr = new Array();
			var stableSort = function(dataA, dataB){
			    if (dataA.a == dataB.a) return dataA.b > dataB.b ? 1 : -1;
			    if (dataA.a > dataB.a) return 1;
			    return -1;
			};		
			// calculate tags.
			var nodeCnt = 0;
			for(var i = 0 ; i < boxNum ; i ++){
				// copy value of array.
				var tempArr = boxNumDataArr[i].slice(0);
				var tempDataNumberArr = new Array();
				var outliers = new Array();
				var outliersDataNumber = new Array();			

				for(j = 0 ; j < tempArr.length; j ++){
					tempArr[j] = {a: tempArr[j], b: j};
				}
				// sort data
				tempArr.sort(stableSort);
				
				for(var j = 0 ; j < tempArr.length ; j ++){
					tempDataNumberArr[j] = boxNumDataNumArr[i][tempArr[j].b];
					tempArr[j] = tempArr[j].a;
				}
				// get values which are needed to draw box.
				var q3 = findQuartile(tempArr, 3);
				var median = findQuartile(tempArr, 2);
				var q1 = findQuartile(tempArr, 1);
				// calculate upper fence.
				var tmpUpFence = findMaxBelowFence(tempArr, q1, q3);
				var upperFence = tmpUpFence.fence;
				var upperFenceNumber = tmpUpFence.fenceNumber;
				// extract upper outliers.
				for(var j = upperFenceNumber + 1 ; j < tempArr.length ; j ++){
					outliers.push(tempArr[j]);
					outliersDataNumber.push(tempDataNumberArr[j]);
				}
				// calculate below fence.
				var tmpDownFence = findMinAboveFence(tempArr, q1, q3);
				var lowerFence = tmpDownFence.fence;
				var lowerFenceNumber = tmpDownFence.fenceNumber;
				// extract upper outliers.
				for(var j = 0 ; j < lowerFenceNumber ; j ++){
					outliers.push(tempArr[j]);
					outliersDataNumber.push(tempDataNumberArr[j]);
				}
				
				//set tag and hasArr with box data.
				this.median[nodeCnt] = median;
				this.isOutlier[nodeCnt] = false;
				this.q1[nodeCnt] = q1;
				this.q3[nodeCnt] = q3;
				this.upperFence[nodeCnt] = upperFence;
				this.lowerFence[nodeCnt] = lowerFence;
				this.x[nodeCnt] = i;
				this.y[nodeCnt] = q3;
				
				// save hasArr.
				hasArr[nodeCnt] = new Array();
				for(var j = lowerFenceNumber ; j < upperFenceNumber + 1 ; j ++){
					hasArr[nodeCnt].push(tempDataNumberArr[j]);
				}
				//alert(hasArr[nodeCnt]);
				nodeCnt ++;
				
				//set tag and hasArr with outlier data.
				for(var j = 0 ; j < outliers.length ; j ++, nodeCnt++){
					this.median[nodeCnt] = 0;
					this.isOutlier[nodeCnt] = true;
					this.q1[nodeCnt] = 0;
					this.q3[nodeCnt] = 0;
					this.upperFence[nodeCnt] = 0;
					this.lowerFence[nodeCnt] = 0;
					this.x[nodeCnt] = i;
					this.y[nodeCnt] = outliers[j];
					hasArr[nodeCnt] = new Array();
					hasArr[nodeCnt].push(outliersDataNumber[j]);
				}
			}
			// event set
			var p2cArr = new Array(dataObj[xLabel].length);		
			for(var i = 0 ; i < hasArr.length ; i ++){
				for(var j = 0 ; j < hasArr[i].length ; j ++){
					p2cArr[hasArr[i][j]] = i;
				}		
			}	
			
			this.mergeArr = mergeParentChildArr(p2cArr, hasArr);		
			this.$isSelected = new Array();
			for (var i=0; i<hasArr.length; i++) {
				this.$isSelected[i] = 0;
			}
		}
	};
})();
/**  ddply  **/
//optionObj can be bin.
var ddply = {};
(function() {
	ddply = function (dataObj, labels, optionObj) {
		// for tree & event part //
		this.$id = 0;
		this.parent = dataObj;
		if (dataObj.child == null) {
			dataObj.child = new Array();
		}
		dataObj.child.push(this);
		this.child = null;
		this.$drawFence = new Array();
		this.graphObjArr = new Array();
		this.refreshArr = new Array();
		this.$isSelected = new Array();
		this._type = 'histObj';
		this.dataObj = dataObj;
		this.labels = labels;
		this.optionObj = optionObj;
		this.$isOffload = dataObj.$isOffload;
		
		this._calculate();
	};
	ddply.prototype = {
		_calculate: function () {
			var dataObj = this.dataObj;
			var labels = this.labels;
			var optionObj = this.optionObj;
			
			// copy fields from dataObj (parent)
			for (var i=0; i<labels.length; i++) {
				this[labels[i]] = new Array();
				if (dataObj[labels[i]].isDiscrete != undefined) {
					this[labels[i]].isDiscrete = dataObj[labels[i]].isDiscrete;
					this[labels[i]].index = dataObj[labels[i]].index;
				}
			}
			
			this['frequency'] = new Array();
			this['hasArr'] = new Array();
			// binning continuous data.
			var binArr = new Array(labels.length);
			var indexArr = make2DArr(labels.length);
			var factoredArr = make2DArr(labels.length);
			for (var i=0; i<labels.length; i++) {
				if (dataObj[labels[i]].isDiscrete == undefined) {
					// find indexArr, factoredArr of continuous labels.
					var temp = binning(dataObj[labels[i]], optionObj.bin);
					indexArr[i] = temp.indexArr;
					factoredArr[i] = temp.factoredArr;
					dataObj[labels[i]].max = temp.tempMax;
					dataObj[labels[i]].min = temp.tempMin;
			  } else {
				// make indexArr of discrete label.
				for (var j=0; j<dataObj[labels[i]].index.length; j++) {
					indexArr[i][j] = j;
				}
			  }
			}
			
		 // calculate frequency
			var tmpObj = new Object();
			for (var i=0; i<dataObj[labels[0]].length; i++) {
				var temp = tmpObj;
				for (var j=0; j<labels.length; j++) {
					if (dataObj[labels[j]].isDiscrete == undefined) {
						cnt = indexArr[j][factoredArr[j][i]];
					} else {
						cnt = dataObj[labels[j]][i];
					}
					temp = addField(temp, cnt);
				}
				// for debugging
				// document.write("<br>");
				if (temp['frequency'] == undefined) {
					temp['frequency'] = 1;
					temp['hasArr'] = new Array();
					temp['hasArr'].push(i);
				} else {
					temp['frequency'] ++;
					temp['hasArr'].push(i);
				}
			}
			
			// set the array of fields by using recursive function.
			setNode(0, labels.length, labels, indexArr, tmpObj, this);
			
			// copy max and min value for matching with axis binnig.
			for (var i=0; i<labels.length; i++) {
				if (dataObj[labels[i]].max != undefined) {
					this[labels[i]].max = dataObj[labels[i]].max;
					this[labels[i]].min = dataObj[labels[i]].min;
				}
			}
			
			var hasArr = this['hasArr'];
			delete this['hasArr'];
			// make event handle part
			var p2cArr = new Array(dataObj[labels[0]].length);
			
			for (var i=0; i<hasArr.length; i++) {
				for (var j=0; j<hasArr[i].length; j++) {
					p2cArr[hasArr[i][j]] = i;
				}
			}
		
			// make event handle part.
			this.mergeArr = mergeParentChildArr(p2cArr, hasArr);
			for (var i=0; i<hasArr.length; i++) {
				this.$isSelected[i] = 0;
			}
		},
		_reCalculate: function () {
			var dataObj = this.dataObj;
			var labels = this.labels;
			var optionObj = this.optionObj;
			
			// copy fields from dataObj (parent)
			for (var i=0; i<labels.length; i++) {
				this[labels[i]] = new Array();
				if (dataObj[labels[i]].isDiscrete != undefined) {
					this[labels[i]].isDiscrete = dataObj[labels[i]].isDiscrete;
					this[labels[i]].index = dataObj[labels[i]].index;
				}
			}
			
			this['frequency'] = new Array();
			this['hasArr'] = new Array();
			// binning continuous data.
			var binArr = new Array(labels.length);
			var indexArr = make2DArr(labels.length);
			var factoredArr = make2DArr(labels.length);
			for (var i=0; i<labels.length; i++) {
				if (dataObj[labels[i]].isDiscrete == undefined) {
					// find indexArr, factoredArr of continuous labels.
					var temp = binning(dataObj[labels[i]], optionObj.bin);
					indexArr[i] = temp.indexArr;
					factoredArr[i] = temp.factoredArr;
					dataObj[labels[i]].max = temp.tempMax;
					dataObj[labels[i]].min = temp.tempMin;
			  } else {
				// make indexArr of discrete label.
				for (var j=0; j<dataObj[labels[i]].index.length; j++) {
					indexArr[i][j] = j;
				}
			  }
			}
			
		 // calculate frequency
			var tmpObj = new Object();
			for (var i=0; i<dataObj[labels[0]].length; i++) {
				var temp = tmpObj;
				for (var j=0; j<labels.length; j++) {
					if (dataObj[labels[j]].isDiscrete == undefined) {
						cnt = indexArr[j][factoredArr[j][i]];
					} else {
						cnt = dataObj[labels[j]][i];
					}
					temp = addField(temp, cnt);
				}
				// for debugging
				// document.write("<br>");
				if (temp['frequency'] == undefined) {
					temp['frequency'] = 1;
					temp['hasArr'] = new Array();
					temp['hasArr'].push(i);
				} else {
					temp['frequency'] ++;
					temp['hasArr'].push(i);
				}
			}
			
			// set the array of fields by using recursive function.
			setNode(0, labels.length, labels, indexArr, tmpObj, this);
			
			// copy max and min value for matching with axis binnig.
			for (var i=0; i<labels.length; i++) {
				if (dataObj[labels[i]].max != undefined) {
					this[labels[i]].max = dataObj[labels[i]].max;
					this[labels[i]].min = dataObj[labels[i]].min;
				}
			}
			
			var hasArr = this['hasArr'];
			delete this['hasArr'];
			
			// make event handle part
			var p2cArr = new Array(dataObj[labels[0]].length);
			for (var i=0; i<hasArr.length; i++) {
				for (var j=0; j<hasArr[i].length; j++) {
					p2cArr[hasArr[i][j]] = i;
				}
			}
			
			// make event handle part.
			this.mergeArr = mergeParentChildArr(p2cArr, hasArr);
			this.$isSelected = new Array();
			for (var i=0; i<hasArr.length; i++) {
				this.$isSelected[i] = 0;
			}
		}
	};
})();
/**  ddply End  **/
/**  binning  **/
//only for continuous object.
function binning (labelObj, bin) {
	//alert("structure_binning");
// only work for continuous object.
	if (labelObj.isDiscrete == undefined) {
		var temp = findMaxMinValue(labelObj);
		var tempMax = temp.max;
		var tempMin = temp.min;
		//alert(tempMax + ", " + tempMin);
		if (bin == undefined) {
			var tickRange = (tempMax - tempMin) / 5;
			var tmp = Math.ceil(Math.log(tickRange) / Math.log(10));
			bin = setTickRange(tmp, tickRange);
		}
	    //check the fixpoint.
		var fixPoint = 0;
		if (bin.toString().indexOf('.') != -1) {
			fixPoint = bin.toString().substring(bin.toString().indexOf('.')+1, bin.toString().length).length;
		}
		if (tempMax > 0) {
			var max = parseFloat((Math.ceil(tempMax / bin) * bin).toFixed(fixPoint));
		} else {
			var max = parseFloat((Math.ceil(tempMax / bin) * bin + bin).toFixed(fixPoint));
		}
		if (tempMax == max) {
			max = max + bin;
		}
		var min = parseFloat((Math.floor(tempMin / bin) * bin).toFixed(fixPoint));
		var indexArr = new Array();
	    // set index
		for (var i=0; ; i++) {
			indexArr[i] =  parseFloat(min + i * bin).toFixed(fixPoint);
			if (indexArr[i] == max)
				break;
			if (indexArr[i] > max) {
				alert("Error in \"binning\": javascript calculation error!");
				break;
			}
		}
		var factoredArr = new Array();
		for (var i=0; i<labelObj.length; i++) {
			var cnt = parseInt((labelObj[i] - min) / bin);
			factoredArr[i] = cnt;
		}
		return {
	      'max': max,
	      'min': min,
	      'tempMax': tempMax,
	      'tempMin': tempMin,
	      'indexArr': indexArr,
	      'factoredArr': factoredArr
	    };
	} else {
		alert("The input of the binning should be continuous.");
		return;
	}
}
/**  binning End  **/

/**  setNode  **/
//set the fields of the root object recursively. 
function setNode (myNumber, endNumber, labels, indexArr, temp, root) {
	if (endNumber > 1) {
		var cnt1 = 0;
		var cnt2 = 0;
		for (var i=0; i<indexArr[myNumber].length; i++) {
			if (temp[indexArr[myNumber][i]] != undefined) {
				cnt1 = setNode(myNumber + 1, endNumber - 1, labels, indexArr, temp[indexArr[myNumber][i]], root);
				for (t=0; t<cnt1; t++) {
					root[labels[myNumber]].push(parseFloat(indexArr[myNumber][i]));
				}
				cnt2 = cnt2 + cnt1;
			}
		}
		return cnt2;
	} else {
		var cnt = 0;
		for (var i=0; i<indexArr[myNumber].length; i++) {
			if (temp[indexArr[myNumber][i]] != undefined) {
				var frequency = temp[indexArr[myNumber][i]].frequency;
				cnt ++;
				root[labels[myNumber]].push(parseFloat(indexArr[myNumber][i]));
				root['frequency'].push(frequency);
				root['hasArr'].push(temp[indexArr[myNumber][i]].hasArr);
			}
		}
		return cnt;
	}
}
/**  setNode End  **/

/**  addField  **/
//add new field and return added field.
function addField (obj, fieldName) {
	if (obj[fieldName] == undefined)
		obj[fieldName] = new Object();
	return obj[fieldName];
}
/**  addField End  **/
