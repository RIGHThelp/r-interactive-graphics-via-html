
/**
 * @fileOverview operate base information to draw bar graph
 */
 
/**  
 * @description draw bar(histogram) graph
 * 
 * @constructor  
 *  
 */
 var Bar = {};

(function() {
	Bar = function(axisObj, dataObj, xLabel, yLabel, optionObj) {
		this.axisObj = axisObj;
		this.dataObj = dataObj;
		this.xLabel = xLabel;
		this.yLabel = yLabel;
		this.optionObj = optionObj;
		this.dataId = dataObj.$id ++;
		this.graphId = axisObj.numberOfGraph ++;
		this.firstDraw = true;
		this._type = 'barGraph';
		
		dataObj.graphObjArr[this.dataId] = this;
		axisObj.graphObjArr[this.graphId] = this;
		
		if (dataObj.$isOffload) {
			dataObj.$drawFence[this.dataId] = nullUpdate;
			dataObj.refreshArr[this.dataId] = nullUpdate;
			this.firstUpdate = nullUpdate;	        	
        	axisObj.hoverArr[this.graphId] = nullUpdate;
			axisObj.boxSearchArr[this.graphId] = nullUpdate;
		} else {
			dataObj.$drawFence[this.dataId] = barUpdate();
			dataObj.refreshArr[this.dataId] = makeRefresh(axisObj.stage);
			this.firstUpdate = firstUpdate(dataObj);
        	axisObj.hoverArr[this.graphId] = barHover();
			axisObj.boxSearchArr[this.graphId] = barBoxSearch(this);
		}
		
		this.colorOn = null;
		this.colorLabel = null;
		this.baseColor = null;
		
		this.legendLabel = null;
		this.barWidth = null;
		this.stacking = null;
		this.node = null;
	};
	/**
      @lends Bar.prototype
    */
	Bar.prototype = {
		/** @constructs */
		_init: function (axisObj, dataObj, xLabel, yLabel, optionObj) {
			if (axisObj.legendLabel != undefined) {
				var legendLabel = axisObj.legendLabel;
				if (dataObj[legendLabel].colorIndex == undefined) {
					addColorField(dataObj[legendLabel]);
				} else if (dataObj[legendLabel].isDiscrete == undefined && dataObj[legendLabel].color == undefined) {
					addColorField(dataObj[legendLabel]);
				}

				this.colorOn = true;
			} else {
				this.colorOn = false;
			}
			this.colorLabel = legendLabel;
			
			if (optionObj.baseColor != undefined && optionObj.baseColor != 'n') {
				this.baseColor = optionObj.baseColor;
			} else {
				this.baseColor = 'green';
			}
		},
		_draw: function () {
			if (this.firstDraw) {
				this._init(this.axisObj, this.dataObj, this.xLabel, this.yLabel, this.optionObj);
				this.firstDraw = false;
			} else {
				if (this.colorOn == true) {
					addColorField(this.dataObj[this.colorLabel]);
				}
			}
			
			this.barWidth = this.axisObj.xbarWidth;
			this._checkStacking(this.axisObj, this.dataObj, this.xLabel, this.yLabel);
			this._drawSet(this.axisObj, this.dataObj, this.xLabel, this.yLabel);
		},
		_reDraw: function () {		
			if (this.colorOn == true) {
					addColorField(this.dataObj[this.colorLabel]);
			}
			
			this.dataObj.refreshArr[this.dataId] = makeRefresh(this.axisObj.stage);
			this.axisObj.boxSearchArr[this.graphId] = barBoxSearch(this);
			
			this.barWidth = this.axisObj.xbarWidth;
			this._checkStacking(this.axisObj, this.dataObj, this.xLabel, this.yLabel);
			this._drawSet(this.axisObj, this.dataObj, this.xLabel, this.yLabel);
		},
		_checkStacking: function (axisObj, dataObj, xLabel, yLabel) {
			if (dataObj[yLabel].isDiscrete == undefined) {
				var temp = new Object();
				var max = dataObj[yLabel][0];
				var min = dataObj[yLabel][0];
				
				for (var i=0; i<dataObj[xLabel].length; i++) {
					if (temp[dataObj[xLabel][i]] == undefined) {
						temp[dataObj[xLabel][i]] = dataObj[yLabel][i];
					} else {
						temp[dataObj[xLabel][i]] = temp[dataObj[xLabel][i]] + dataObj[yLabel][i];
						if (temp[dataObj[xLabel][i]] > max) {
							max = temp[dataObj[xLabel][i]];
						} else if (temp[dataObj[xLabel][i]] < min) {
							min = temp[dataObj[xLabel][i]];
						}
						this.stacking = true;
					}
				}
				
				if (this.stacking == true) {
					if (yLabel == 'frequency') {
						axisObj._setYContinuous(max, 0);
					} else {
						axisObj._setYContinuous(max, min);
					}
					axisObj._draw();
				}
				
				delete temp;
			}
		},
		_drawSet: function (axisObj, dataObj, xLabel, yLabel) {
			var temp = axisObj._getPixelXY(dataObj[xLabel], dataObj[yLabel]);
			var xArr = temp.xArr;
			var yArr = temp.yArr;
			if (this.stacking == true) {
				this.node = new Array();
				var tempHeight = new Object();
				if (this.colorOn == true) {
					var x = 0;
					var y = 0;
					for (var i=0; i<xArr.length; i++) {

						if (!(xArr[i] == -1 || yArr[i] == -1)) {
							if (tempHeight[xArr[i]] == undefined) {
								tempHeight[xArr[i]] = axisObj.height + axisObj.plotYMargin - yArr[i];
								y = yArr[i];
							} else {
								y = yArr[i] - tempHeight[xArr[i]];
								tempHeight[xArr[i]] = axisObj.height + axisObj.plotYMargin - y;
							}
							if (axisObj.isXDiscrete) {
								xArr[i] = xArr[i] - this.barWidth/2;
							}
							this.node[i] = new Kinetic.Rect({
								name: i,
								x: xArr[i],
								y: y,
								width: this.barWidth,
								height: axisObj.height + axisObj.plotYMargin - yArr[i],
								stroke: (dataObj[this.colorLabel].isDiscrete == undefined) ? dataObj[this.colorLabel].color[i] : dataObj[this.colorLabel].colorIndex[dataObj[this.colorLabel][i]],
								fill: (dataObj[this.colorLabel].isDiscrete == undefined) ? dataObj[this.colorLabel].color[i] : dataObj[this.colorLabel].colorIndex[dataObj[this.colorLabel][i]],
								selected: 0,
								selectCnt : 0,
								opacity: 0.5,
								info: "Node: " + i + "\r\n" + getNodeinfo(dataObj, i)
							});
						} else {
							this.node[i] = null;
						}
					}
				}else{
					for (var i=0; i<xArr.length; i++) {
						if (!(xArr[i] == -1 || yArr[i] == -1)) {
							if (axisObj.isXDiscrete) {
								xArr[i] = xArr[i] - this.barWidth/2;
							}
							this.node[i] = new Kinetic.Rect({
								name: i,
								x: xArr[i],
								y: yArr[i],
								width: this.barWidth,
								height: axisObj.height + axisObj.plotYMargin - yArr[i],
								stroke: this.baseColor,
								fill: this.baseColor,
								selected: 0,
								selectCnt : 0,
								opacity: 0.5,
								info: "Node: " + i + "\r\n" + getNodeinfo(dataObj, i)
							});
						} else {
							this.node[i] = null;
						}
					}
				}					
			}else{
				this.node = new Array();
				if(this.colorOn == true){
					for(var i = 0 ; i < xArr.length ; i ++){
						if(!(xArr[i] == -1 || yArr[i] == -1)){
							if(axisObj.isXDiscrete){
								xArr[i] = xArr[i] - this.barWidth/2;
							}
							this.node[i] = new Kinetic.Rect({
								name: i,
								x: xArr[i],
								y: yArr[i],
								width: this.barWidth,
								height: axisObj.height + axisObj.plotYMargin - yArr[i],
								stroke: (dataObj[this.colorLabel].isDiscrete == undefined) ? dataObj[this.colorLabel].color[i] : dataObj[this.colorLabel].colorIndex[dataObj[this.colorLabel][i]],
								fill: (dataObj[this.colorLabel].isDiscrete == undefined) ? dataObj[this.colorLabel].color[i] : dataObj[this.colorLabel].colorIndex[dataObj[this.colorLabel][i]],
								selected: 0,
								selectCnt : 0,
								opacity: 0.5,
								info: "Node: " + i + "\r\n" + getNodeinfo(dataObj, i)
							});
						}else{
							this.node[i] = null;
						}
					}
				}else{
					for(var i = 0 ; i < xArr.length ; i ++){
						if(!(xArr[i] == -1 || yArr[i] == -1)){
							if(axisObj.isXDiscrete){
								xArr[i] = xArr[i] - this.barWidth/2;
							}
							this.node[i] = new Kinetic.Rect({
								name: i,
								x: xArr[i],
								y: yArr[i],
								width: this.barWidth,
								height: axisObj.height + axisObj.plotYMargin - yArr[i],
								stroke: 'green',
								fill: 'green',
								selected: 0,
								selectCnt : 0,
								opacity: 0.5,
								info: "Node: " + i + "\r\n" + getNodeinfo(dataObj, i)
							});
						}else{
							this.node[i] = null;
						}
					}
				}
			}				
			this.dataLayer = new Kinetic.Layer();	
			for (var i=0; i<this.node.length; i++) {
				if (this.node[i] != null) {
					this.dataLayer.add(this.node[i]);
				}
			}
			
			axisObj.stage.add(this.dataLayer);
			axisObj.dataLayerArr[this.graphId] = this.dataLayer;
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
function barBoxSearch (graphObj) {
	return function (smallX, smallY, bigX, bigY) {	
		var tmpNodeArr = new Array();
		var tmpNodeArr1 = new Array();
		if (ctrlPressed == true) {
			for (var i=0; i<graphObj.node.length; i++) {
				if ((smallX <= graphObj.node[i].getX() + graphObj.node[i].getWidth() && graphObj.node[i].getX() <= bigX) && (smallY <= graphObj.node[i].getY() + graphObj.node[i].getHeight() && graphObj.node[i].getY() <= bigY)) {
					if (graphObj.node[i].getSelected() == 1) {
						tmpNodeArr.push(graphObj.node[i].getName());
					} else {
						tmpNodeArr1.push(graphObj.node[i].getName());
					}        
				}
			}
			if (tmpNodeArr.length != undefined) {
				allGraphUpdate(graphObj, tmpNodeArr, 0);
			}
			if (tmpNodeArr1.length != undefined) {
				allGraphUpdate(graphObj, tmpNodeArr1, 1);
			}
		} else {
			for (var i=0; i<graphObj.node.length; i++) {
				if ((smallX <= graphObj.node[i].getX() + graphObj.node[i].getWidth() && graphObj.node[i].getX() <= bigX) && (smallY <= graphObj.node[i].getY() + graphObj.node[i].getHeight() && graphObj.node[i].getY() <= bigY)) {
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
function barUpdate () {
	return	function(node, selectOn) {
			if(node.getSelected() == 1 && selectOn < 0) {
				node.setSelectCnt(node.getSelectCnt() + selectOn);
				if(node.getSelectCnt() == 0) {
					node.setStroke(node.getFill());	
					node.setSelected(0);
					var tween = new Kinetic.Tween({
						node: node, 
						duration: 0.01,
						opacity: 0.5
					}).play(); 
				}
			} else if (node.getSelected() == 0 && selectOn > 0) {	
				node.setSelectCnt(node.getSelectCnt() + selectOn);
				if (node.getSelected() == 0) {
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
 function barHover () {
	return function(node, overOff) { 
		if (overOff == 1) {
			node.setOpacity(1);
			node.draw();
		} else if (overOff == 0) {
			var tween = new Kinetic.Tween({
				node: node, 
				duration: 0.01,
				opacity: 0.5
			}).play(); 
		}
	};
}
