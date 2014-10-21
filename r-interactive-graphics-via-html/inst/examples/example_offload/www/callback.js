
/**
 * @fileOverview operate about event functions
 */
 
/**
 * @static
 * @ignore
 * 
 */
var legendArr = ['right', 'left', 'topright', 'topleft', 'default'];
var widthArr = [-100, -10, -1, 1, 10, 100];
var heightArr = [-100, -10, -1, 1, 10, 100];
var binArr = [-1, 1];
var array_of_functions = [
                          function(Name, label) { changeXAxis(Name, label) },
                          function(Name, label) { changeYAxis(Name, label) },
                          function(Name, label) { changeColor(Name, label) },
                          function(Name, label) { changeWidth(Name, label) },
                          function(Name, label) { changeHeight(Name, label) },
                          function(Name, label) { changeBin(Name, label) }
                      ];

/**
 * @static
 * @ignore
 * 
 */
var changeXAxis = function (Name, label){
	alert(label);
}
var changeYAxis = function (Name, label){
	alert(label);
}
var changeColor = function (Name, label){
	alert(label);
}
var changeWidth = function (Name, label){
	alert(label);
}
var changeHeight = function (Name, label){
	alert(label);
}
var changeBin = function (Name, label){
	alert(label);
}

/**
 * @description manage event operation about hide nodes & lines
 * 
 * @param {object} Name object that incoming hide signal graph 
 * 
 */
function hideSelected(Name) {
	var rootObjArr = new Array();
	
	for(var i = 0 ; i < Name.graphObjArr.length ; i ++){
		var temp = Name.graphObjArr[i].dataObj;
		while(temp.parent != null){
			temp = temp.parent;
		}
		
		for(var j = 0 ; j < rootObjArr.length ; j ++){
			if(temp == rootObjArr[j]) 
				break;
		}
		if(j == rootObjArr.length){
			rootObjArr.push(temp);
		}
	}
	
	for(var i = 0 ; i < rootObjArr.length ; i ++){	
		
		if(rootObjArr[i].$isOffload)
			continue;
		
		var tempData = make2DArr(rootObjArr[i].labelArr.length); //n by n
		var tempStatus = new Array();
		var labelArr = rootObjArr[i].labelArr;
		var liveNumArr = new Array();
		var deadNumArr = new Array();
	
		for(var j = 0; j < rootObjArr[i].$isSelected.length ; j ++){
			if(rootObjArr[i].$isSelected[j] == 0) {
				for(var t = 0 ; t < tempData.length ; t ++){
					tempData[t].push(rootObjArr[i][labelArr[t]][j]);
				}	
				liveNumArr.push(j);
			}else{
				deadNumArr.push(j);
			}
		}

		for(var j = 0 ; j < deadNumArr.length ; j ++){
			rootObjArr[i].$isHidden[rootObjArr[i].$dataNumArr[deadNumArr[j]]] = true;
		}
		
		var tmp = new Array();
		for(var j = 0 ; j < liveNumArr.length ; j ++){
			tmp.push(rootObjArr[i].$dataNumArr[liveNumArr[j]]);
		}
		rootObjArr[i].$dataNumArr = tmp;		
		
		for(var j = 0 ; j < labelArr.length ; j ++){
			for(var t = 0 ; t < tempData[j].length ; t ++){
				rootObjArr[i][labelArr[j]][t] = tempData[j][t];
			}
			for(var k = t ; k < t + (rootObjArr[i][labelArr[j]].length - t) ; k ++){
				delete rootObjArr[i][labelArr[j]][k];
			}
			rootObjArr[i][labelArr[j]].splice(t, (rootObjArr[i][labelArr[j]].length - t));
		}
		
		rootObjArr[i].$isSelected = new Array(liveNumArr.length);
		for(var j = 0; j < rootObjArr[i].$isSelected.length; j++) {
			rootObjArr[i].$isSelected[j] = 0;
		}
				
		if(rootObjArr[i].child != null){
			for(var j = 0 ; j < rootObjArr[i].child.length ; j ++){
				childReCalculate(rootObjArr[i].child[j]);
			}
		}
	}
	
	for(var i = 0 ; i < AllAxisObjArr.length ; i ++){
		AllAxisObjArr[i]._reDraw();
	}
	eventTrigger(AllAxisObjArr);
	
	for(var i = 0 ; i < rootObjArr.length ; i ++){
		if(rootObjArr[i].offloadObjArr != null){
			for(var j = 0 ; j < rootObjArr[i].offloadObjArr.length ; j ++){
				rootObjArr[i].offloadObjArr[j].$sendData(rootObjArr[i].$isHidden);
			}
		}
	}
	
}

/**
 * @description function call to redraw when hide event occur
 * 
 * @ignore
 */
function childReCalculate(object) {
	object._reCalculate();	
	if(object.child != null) {
		for(var i = 0 ; i < object.child.length ; i ++){
			childReCalculate(object.child[i]);
		}
	}
}

/**
 * @description function call to redraw when reset event occur
 * 
 * @ignore
 */
function resetSelected(Name) {
	window.top.location.reload();
}
