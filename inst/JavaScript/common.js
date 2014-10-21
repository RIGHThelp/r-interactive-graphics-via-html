/**
 * @fileOverview total operation functions to draw and update new state graph
 */

/**
 * @static
 * @ignore
 * 
 */
var plotWidth = 300;  //default value for plot width
var plotHeight = 300; //default value for plot height  
var plotRadius = 2;

/**  
 * @description assign RGB values to make color for continuous index
 * 
 * @param array object that have information about label
 * 
 * @returns indexArr include color value for each index
 * 
 */
function findSubSet(dataObj, labelArr, subSet) {
	for(var i = 0 ; i < labelArr.length ; i ++){
		if(dataObj[labelArr[i]].isDiscrete == undefined){
			var searchStr = new RegExp(labelArr[i], 'g'); // "g" means all search
    		subSet = subSet.replace(searchStr, "dataObj." + labelArr[i] + "[i]");
		}else{
			var searchStr = new RegExp(labelArr[i], 'g'); // "g" means all search
    		subSet = subSet.replace(searchStr, "dataObj." + labelArr[i] + ".#[dataObj." + labelArr[i] + "[i]]");
		}
	}
	var searchStr = new RegExp('#', 'g');
	subSet = subSet.replace(searchStr, "index");
	
	return subSet;
}

/**  
 * @description get information from each node
 * 
 * @param dataObj data object about drawing graph
 * @param id number that assigned each nodes
 * 
 * @returns info string type that has node information
 * 
 */
function getNodeinfo(dataObj, id) {
	var cnt = 0;
	var info ='';
	for(var name in dataObj) {
		if(!(name == 'offloadObjArr' ||name == '$dataNumArr' || name == '$ans' || name == 'optionObj' || name == '_reCalculate' || name == 'labels' || name == 'parent' || name == 'child' || name == 'refreshTable' || name == 'labelArr' || name == '_type' || name == 'refreshArr' || name == '$id' || name == '$drawFence' || name == '$isHidden' || name == 'refreshArr' || name == 'graphObjArr' || name == '$isSelected')) {
			if(dataObj[name].isDiscrete == true){
				if(cnt == 0) {
					info = name + ': ' + dataObj[name].index[dataObj[name][id]];
					cnt ++;
				} else {
					info = info + "\r\n" + name + ': ' + dataObj[name].index[dataObj[name][id]];
				}					
			} else {
				if(cnt == 0){
					info = name + ': ' + dataObj[name][id];
					cnt ++;
				}else{
					info = info + "\r\n" + name + ': ' + dataObj[name][id];
				}
			}
		}
	}
	return info;
}

/**  
 * @description get all fields name that assigned in data object
 * 
 * @param dataObj data object about drawing graph
 * 
 * @returns temp include field name
 * 
 */
function getFields(dataObj) {
	var temp = new Array();
	for(var name in dataObj) {
		if(!(name == 'offloadObjArr' || name == '$dataNumArr' || name == '$ans' || name == 'optionObj' || name == '_reCalculate' || name == 'labels' || name == 'parent' || name == 'child' || name == 'refreshTable' || name == 'labelArr' || name == '_type' || name == 'refreshArr' || name == '$id' || name == '$drawFence' || name == '$isHidden' || name == 'refreshArr' || name == 'graphObjArr' || name == '$isSelected')) {
			temp.push(name);
		}
	}
	return temp;
}

var mouseName;
var divOffsetX, divOffsetY;


/**  
 * @description get x-y position about mouse cursor
 * 
 * @param e cursor location data
 * 
 * @ignore
 * 
 */
function getCoords(e) {
	var divX, divY = 0; 
	mouseName = this.id;
	var xy_pos = getXYpos(this);
	
	if(navigator.appVersion.indexOf("MSIE") != -1) {
	   // in IE scrolling page affects mouse coordinates into an element
	   // This gets the page element that will be used to add scrolling value to correct mouse coords
		var standardBody = (document.compatMode == 'CSS1Compat') ? document.documentElement : document.body;
		
		divX = event.clientX + standardBody.scrollLeft;
		divY = event.clientY + standardBody.scrollTop;
	}
	else {
		divX = e.pageX;
		divY = e.pageY;
	}
	
	divX = divX - xy_pos['xp'];
	divY = divY - xy_pos['yp'];
	divOffsetX = xy_pos['xp'];
	divOffsetY = xy_pos['yp'];
	 // displays x and y coords in the #coords element
	document.getElementById('coords');
}

/**  
 * @description get X, Y coords, and displays Mouse coordinates
 * 
 * @param elm cursor location data
 * 
 * @returns xp x position
 * @returns yp y position
 * 
 * @ignore
 * 
 */
function getXYpos(elm) {
	X = elm.offsetLeft;       
	Y = elm.offsetTop;        
	
	elm = elm.offsetParent;    // set elm to its offsetParent
	
	 //use while loop to check if elm is null
	 // if not then add current 
	 //offsetTop to y and set elm to its offsetParent
	while(elm != null) {
		X = parseInt(X) + parseInt(elm.offsetLeft);
		Y = parseInt(Y) + parseInt(elm.offsetTop);
		elm = elm.offsetParent;
	}
    // returns an object with "divXp" (Left), "=yp" (Top) position
	return {'xp':X, 'yp':Y};
}

/**  
 * @description input child's array which means current state
 * 
 * @param parent graph object which locate upper level of tree
 * @param child graph object which locate below level of tree
 * @param mergeArr result of merge operation
 * 
 */
function birthReport (parent, child, mergeArr) {
	child.parent = parent;
	if(parent.child == null){
		parent.child = new Array();
	}
	parent.child.push(child);
	child.child = null;
	child.mergeArr = mergeArr;
	child.refreshArr = new Array();
}

/**  
 * @description update child's array which means current state
 * 
 * @param child graph object which locate below level of tree
 * @param mergeArr result of merge operation
 * 
 * @ignore
 * 
 */
function ModifyBirth (child, mergeArr) {
	child.mergeArr = mergeArr;
}

/**  
 * @description update null
 * 
 * @ignore
 */
function nullUpdate (a, b, c) {
	return;
}

/**  
 * @description update all graphs after select & unselect event
 * 
 * @param graphObj graph object which have data
 * @param nodes information object about each nodes
 * @param selectOn state about selecr & unselect
 * @param keyBoard state about ctrl keyboard
 * 
 */
function allGraphUpdate (graphObj, nodes, selectOn, keyBoard) {
	graphObj.firstUpdate(nodes, selectOn, keyBoard);
}

// process of firstUpdate
// 1. AfterStatus - $isSelected => update nodes
// 2. Propagate afterStatus to parent & child
/**  
 * @description determine select & unselect array operation between ctrl pressed or unpressed
 * 
 * @param firstObj graph object which have data
 * @param nodes information object about each nodes
 * @param selectOn state about selecr & unselect
 * @param keyBoard state about ctrl keyboard
 * 
 */
function firstUpdate (firstObj) {
	return function (nodes, selectOn, keyBoard) {
		var object = firstObj;
		if (keyBoard == 'ctrl') {
			var temp = invertValueArr(object.$isSelected, nodes);
		} else {
			var temp = extensionArr(nodes, object.$isSelected.length, selectOn);
		}
		updateRecursive(object, temp, null);
	};
}

/**  
 * @description operate select & unselect array and reactive to graph
 * 
 * @param object graph object which have data
 * @param nodeArr information object about each nodes
 * @param beforeObject raw data about graph object before operation
 * 
 */
function updateRecursive (object, nodeArr, beforeObject) {
	var temp = subtractArr(nodeArr, object.$isSelected);
	var nodeArr = new Array();
	var nodeVal = new Array();
	for (var i=0; i<temp.length; i++) {
		if (temp[i] != 0) {
			nodeArr.push(i)
			nodeVal.push(temp[i]);
		}
	}
	
	if (nodeArr.length != 0) {
		for (var i=0; i<object.graphObjArr.length; i++) {
			var node = object.graphObjArr[i].node;
			var func = object.$drawFence[i];
			for (var j=0; j<nodeArr.length; j++) {
				func(node[nodeArr[j]], nodeVal[j]);
			}
		}
	} else {
		return;
	}
	
	// update $isSelected
	object.$isSelected = addArr(object.$isSelected, temp);
	for (var i=0; i<object.refreshArr.length; i++) {
		object.refreshArr[i]();
	}
	if(object.refreshTable != undefined){
		object.refreshTable();
	}
	
	// Parent Update
	if (object.parent != null && object.parent != beforeObject) {
		var parent = object.parent;
		var mergeArr = object.mergeArr;
		mergeArr = makeOrthogonalArr(mergeArr, 2);
		var temp = mulArr(object.$isSelected, 1, mergeArr, 2);	
		updateRecursive(parent, temp, object);
	}
	// Child Update
	if (object.child != null) {
		for (var i=0; i<object.child.length; i++) {
			var child = object.child[i];
			if (child != beforeObject) {
				var mergeArr = child.mergeArr;
				var temp = mulArr(object.$isSelected, 1, mergeArr, 2);
				updateRecursive(child, temp, object);
			}
		}
	}
}

/**  
 * @description draw each graph refreshable
 * 
 * @param stage draw from root graph object
 * 
 * @ignore
 */
function makeRefresh (stage, id) {
	return function () {
		stage.draw();
	}
}

/**  
 * @description operate when all nodes are selected
 * 
 * @param graphObj graph object which have data
 * 
 */
function allSelect (graphObj) {
	var temp = new Array();
	for (var i=0; i<graphObj.node.length; i++) {
		temp.push(graphObj.node[i].getName());
	}
	allGraphUpdate(graphObj, temp, 1, null);	
}

/**  
 * @description operate when all nodes are deselected
 * 
 * @param graphObj graph object which have data
 * 
 */
function allDeselect (graphObj) {
	var temp = new Array();
	for (var i=0; i<graphObj.node.length; i++) {
		temp.push(graphObj.node[i].getName());
	}
	allGraphUpdate(graphObj, temp, 0, null);
}

/**  
 * @description find min, max value at data object
 * 
 * @param data data array which want to know min, max value
 * 
 * @returns max max value of data array
 * @returns min min value of data array
 * 
 */
function findMaxMinValue (Data) {
	if (Data.length != undefined) {
		var maxValue = Data[0];
		var minValue = Data[0];
		for (var i=1; i<Data.length; i++) {
			if (Data[i]>maxValue) {
				maxValue=Data[i];
			}
			if (Data[i]<minValue) {
				minValue=Data[i];
			}
		}
	} else {
		var maxValue = Data;
		var minValue = Data;
	}
	return {
		'max' : maxValue,
		'min' : minValue
	};
}

/**  
 * @description set tik range of axis
 *
 * @ignore
 * 
 */
function setTickRange (x, tickRange) {
	if (tickRange/Math.pow(10,x) < 0.1) {tickRange = 0.1 * Math.pow(10,x); }
	else if (tickRange/Math.pow(10,x) <= 0.2) {tickRange = 0.2 * Math.pow(10,x); }
	else if (tickRange/Math.pow(10,x) <= 0.25) {tickRange = 0.25 * Math.pow(10,x); }
	else if (tickRange/Math.pow(10,x) <= 0.3) {tickRange = 0.3 * Math.pow(10,x); }
	else if (tickRange/Math.pow(10,x) <= 0.4) {tickRange = 0.4 * Math.pow(10,x); }
	else if (tickRange/Math.pow(10,x) <= 0.5) {tickRange = 0.5 * Math.pow(10,x); }
	else if (tickRange/Math.pow(10,x) <= 0.6) {tickRange = 0.6 * Math.pow(10,x); }
	else if (tickRange/Math.pow(10,x) <= 0.7) {tickRange = 0.7 * Math.pow(10,x); }
	else if (tickRange/Math.pow(10,x) <= 0.75 ){tickRange = 0.75 * Math.pow(10,x); }
	else if (tickRange/Math.pow(10,x) <= 0.8) {tickRange = 0.8 * Math.pow(10,x); }
	else if (tickRange/Math.pow(10,x) <= 0.9) {tickRange = 0.9 * Math.pow(10,x); }
	else if (tickRange/Math.pow(10,x) <= 1.0) {tickRange = 1.0 * Math.pow(10,x); }
	return tickRange;
}

Array.prototype.remove = function(idx) {
    return (idx<0 || idx>this.length) ? this : this.slice(0, idx).concat(this.slice(idx+1, this.length));
};
