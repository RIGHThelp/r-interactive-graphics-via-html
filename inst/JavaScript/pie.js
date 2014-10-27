
/**
 * @fileOverview operate base information to draw pie graph
 */
 
 /**  
 * @description draw pie graph
 * 
 * @constructor  
 *  
 */
 var Pie = {};
(function() {	
	Pie = function(axisObj, dataObj, xLabel, yLabel, optionObj) {
		this.axisObj = axisObj;
		this.dataObj = dataObj;
		this.xLabel = xLabel;
		this.yLabel = yLabel;
		this.optionObj = optionObj;
		this.dataId = dataObj.$id ++;
		this.graphId = axisObj.numberOfGraph ++;
		this.firstDraw = true;
		this._type = 'pieGraph'
		
		dataObj.graphObjArr[this.dataId] = this;
		axisObj.graphObjArr[this.graphId] = this;
		if (dataObj.$isOffload) {
			dataObj.$drawFence[this.dataId] = nullUpdate;
			dataObj.refreshArr[this.dataId] = nullUpdate;
			this.firstUpdate = nullUpdate;	        	
        	axisObj.hoverArr[this.graphId] = nullUpdate;
			axisObj.boxSearchArr[this.graphId] = nullUpdate;
		} else {
			dataObj.$drawFence[this.dataId] = pieUpdate();
			dataObj.refreshArr[this.dataId] = makeRefresh(axisObj.stage);
			this.firstUpdate = firstUpdate(dataObj);
			axisObj.hoverArr[this.graphId] = pieHover();
			axisObj.boxSearchArr[this.graphId] = pieBoxSearch(this);
		}
	};
	/**
      @lends Bar.prototype
    */
	Pie.prototype = {
		/** @constructs */
		_init: function(axisObj, dataObj, xLabel, yLabel, optionObj) {
			// check color
			if(axisObj.legendLabel != undefined){
				var legendLabel = axisObj.legendLabel;
				if(dataObj[legendLabel].colorIndex == undefined){
					addColorField(dataObj[legendLabel]);
				}else if(dataObj[legendLabel].isDiscrete == undefined && dataObj[legendLabel].color == undefined){
					addColorField(dataObj[legendLabel]);
				}

				this.colorOn = true;
			}else{
				this.colorOn = false;
			}
			this.colorLabel = legendLabel;
		},
		_draw: function() {
			if (this.firstDraw) {
				this._init(this.axisObj, this.dataObj, this.xLabel, this.yLabel, this.optionObj);
				this.firstDraw = false;
			} else {
				if (this.colorOn == true) {
					addColorField(this.dataObj[this.colorLabel]);
				}
			}
			
			this.barWidth = this.axisObj.xbarWidth;
			this._drawSet(this.axisObj, this.dataObj, this.xLabel, this.yLabel, this.optionObj);
		},
		_reDraw: function(){
			if (this.colorOn == true) {
					addColorField(this.dataObj[this.colorLabel]);
			}
			this.dataObj.refreshArr[this.dataId] = makeRefresh(this.axisObj.stage);
			this.axisObj.boxSearchArr[this.graphId] = pieBoxSearch(this);
			this.barWidth = this.axisObj.xbarWidth;
			this._drawSet(this.axisObj, this.dataObj, this.xLabel, this.yLabel, this.optionObj);
		},
		_drawSet: function(axisObj, dataObj, xLabel, yLabel, optionObj) {
			this.node = new Array();
			var degree = 0;
			// calculate total frequency.
			var totalFreq = 0;
			for(var i = 0 ; i < dataObj[xLabel].length ; i ++){
				totalFreq = totalFreq + dataObj[yLabel][i];
			}
			if(this.colorOn == true){
				for(var i = 0 ; i < dataObj[xLabel].length ; i ++){
					this.node[i] = new Kinetic.Wedge({						
						name : i,
						freq: dataObj[yLabel][i],
						x: axisObj.plotXMargin + axisObj.width/2,
						y: axisObj.plotYMargin + axisObj.height/2,
						radius: 100,
						rotationDeg: -90 + degree,	
						angleDeg: dataObj[yLabel][i]/totalFreq * 360,
						stroke: (dataObj[this.colorLabel].isDiscrete == undefined) ? dataObj[this.colorLabel].color[i] : dataObj[this.colorLabel].colorIndex[dataObj[this.colorLabel][i]],
						fill: (dataObj[this.colorLabel].isDiscrete == undefined) ? dataObj[this.colorLabel].color[i] : dataObj[this.colorLabel].colorIndex[dataObj[this.colorLabel][i]],
						strokeWidth: 0.2,
						opacity : 0.5,
						selected : 0,
						selectCnt : 0,
						info: "Node: " + i + "\r\n" + getNodeinfo(dataObj, i)
					});
					degree = degree + dataObj[yLabel][i]/totalFreq * 360;
				}
			}else{
				for(var i = 0 ; i < dataObj[xLabel].length ; i ++){
					this.node[i] = new Kinetic.Wedge({						
						name : i,
						freq: dataObj[yLabel][i],
						x: axisObj.plotXMargin + axisObj.width/2,
						y: axisObj.plotYMargin + axisObj.height/2,
						radius: 100,
						rotationDeg: -90 + degree,	
						angleDeg: dataObj[yLabel][i]/totalFreq * 360,
						fill: 'green',
						stroke: 'green',
						strokeWidth: 0.2,
						opacity : 0.5,
						selected : 0,
						selectCnt : 0,
						info: "Node: " + i + "\r\n" + getNodeinfo(dataObj, i)
					});
					degree = degree + dataObj[yLabel][i]/totalFreq * 360;
				}
			}
			
			this.dataLayer = new Kinetic.Layer();	
			for(var i = 0 ; i < this.node.length ; i ++){
				this.dataLayer.add(this.node[i]);
			}
			
			axisObj.dataLayerArr[this.graphId] = this.dataLayer;
			axisObj.stage.add(this.dataLayer);
		}
	};
})();

/**  
 * @description check location of mouse cursor on the graph
 * 
 * @param graphObj data object to draw graph
 * @param smallX value of x_axis' minimum value
 * @param smallY value of y_axis' minimum value
 * @param bigX value of x_axis maximum value
 * @param bigY value of y_axis maximum value
 * 
 */
function pieBoxSearch(graphObj) {
	return function(smallX, smallY, bigX, bigY)	{	
		var tmpNodeArr = new Array();
		var tmpNodeArr1 = new Array();
		if(ctrlPressed == true) {
			for(var i = 0 ; i < graphObj.node.length ; i ++){
				if((smallX <= graphObj.node[i].getX() + graphObj.node[i].getWidth() && graphObj.node[i].getX() <= bigX) && (smallY <= graphObj.node[i].getY() + graphObj.node[i].getHeight() && graphObj.node[i].getY() <= bigY)){
					if(graphObj.node[i].getSelected() == 1){
						tmpNodeArr.push(graphObj.node[i].getName());
					}else{
						tmpNodeArr1.push(graphObj.node[i].getName());
					}        
				}
			}
		
			if(tmpNodeArr.length != undefined){
				allGraphUpdate(graphObj, tmpNodeArr, 0);
			}
			if(tmpNodeArr1.length != undefined){
				allGraphUpdate(graphObj, tmpNodeArr1, 1);
			}				
		}else{
			for(var i = 0 ; i < graphObj.node.length ; i ++){
				if((smallX <= graphObj.node[i].getX() + graphObj.node[i].getWidth() && graphObj.node[i].getX() <= bigX) && (smallY <= graphObj.node[i].getY() + graphObj.node[i].getHeight() && graphObj.node[i].getY() <= bigY)){
					tmpNodeArr.push(graphObj.node[i].getName());
				}
			}
			allGraphUpdate(graphObj, tmpNodeArr, 1);
		}
		
	};
}

/**  
 * @description change node shape when click or unclick event
 * 
 * @param node object that change node shape
 * @param selectOn flag value about next state
 * 
 */
function pieUpdate() {
	return	function(node, selectOn) {
		if(node.getSelected() == 1 && selectOn < 0){		//unselect
			node.setSelectCnt(node.getSelectCnt() + selectOn);	
			if(node.getSelectCnt() == 0){
				node.setStroke(node.getFill());
				node.setOpacity(0.5);
				node.setSelected(0);
			}
		}else if(selectOn > 0){		// select
			node.setSelectCnt(node.getSelectCnt() + selectOn);
			if(node.getSelected() == 0){
				node.setStroke('black');
				node.setOpacity(1);
				node.setSelected(1);
			}
		}
		node.draw();
	};
}

/**  
 * @description change node shape when mouse over on the node
 * 
 * @param node object that change node shape
 * @param overOff flag value about next state
 * 
 */
 function pieHover() {
	return function(node, overOff) {
		if(overOff == 1){
			node.setOpacity(1);
			node.draw();
		}else if(overOff == 0){
			var tween = new Kinetic.Tween({
				node: node, 
				duration: 0.01,
				opacity: 0.5
			}).play();
		}			
	};
}
