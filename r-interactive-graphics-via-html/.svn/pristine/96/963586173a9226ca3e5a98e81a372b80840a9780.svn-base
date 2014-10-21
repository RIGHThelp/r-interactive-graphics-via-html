
/**
 * @fileOverview operate base information to draw scatter graph
 */
 
/**  
 * @description draw dot(scatter) graph
 * 
 * @constructor  
 *  
 */
 var Dot = {};
(function() {
	Dot = function(axisObj, dataObj, xLabel, yLabel, optionObj) {
		this.axisObj = axisObj;
		this.dataObj = dataObj;
		this.xLabel = xLabel;
		this.yLabel = yLabel;
		this.optionObj = optionObj;
		this.dataId = dataObj.$id++;
		this.graphId = axisObj.numberOfGraph++;
		this.firstDraw = true;
		this._type = "dotGraph";

		dataObj.graphObjArr[this.dataId] = this;
		axisObj.graphObjArr[this.graphId] = this;

		if (dataObj.$isOffload) {
			dataObj.$drawFence[this.dataId] = nullUpdate;
			dataObj.refreshArr[this.dataId] = nullUpdate;				
	    	this.firstUpdate = nullUpdate;
			axisObj.hoverArr[this.graphId] = nullUpdate;
			axisObj.boxSearchArr[this.graphId] = nullUpdate;
		} else {
			dataObj.$drawFence[this.dataId] = dotUpdate();
			dataObj.refreshArr[this.dataId] = makeRefresh(axisObj.stage);				
	    	this.firstUpdate = firstUpdate(dataObj);
			axisObj.hoverArr[this.graphId] = dotHover();
			axisObj.boxSearchArr[this.graphId] = dotBoxSearch(this);
		}
		
	};
	/**
      @lends Bar.prototype
    */
	Dot.prototype = {
		/** @constructs */
		_init: function (axisObj, dataObj, xLabel, yLabel, optionObj) {
			this.radius = (optionObj.radius == undefined) ? (2) : (optionObj.radius); // default radius is 2
			if(axisObj.legendLabel != undefined){
				var legendLabel = axisObj.legendLabel;
				if(dataObj[legendLabel].isDiscrete != true && dataObj[legendLabel].colorIndex == undefined){
					addColorField(dataObj[legendLabel]);
				}else if(dataObj[legendLabel].isDiscrete == undefined && dataObj[legendLabel].color == undefined){
					addColorField(dataObj[legendLabel]);
				}
				this.colorOn = true;
			}else{
				this.colorOn = false;
			}
			this.colorLabel = legendLabel;
			
			if(optionObj.baseColor != undefined && optionObj.baseColor != 'n'){
				this.baseColor = optionObj.baseColor;
			}else{
				this.baseColor = 'green';
			}
			
			if(optionObj.subSet != undefined && optionObj.subSet != 'n'){
				var subSet = findSubSet(dataObj, dataObj.labelArr, optionObj.subSet);					
			}else{
				var subSet = -1;
			}
			this.subSet = subSet;
		},
		_draw: function () {
			if (this.firstDraw) {
				this._init(this.axisObj, this.dataObj, this.xLabel, this.yLabel,this.optionObj);
				this.firstDraw = false;
			}
			this._drawSet(this.axisObj, this.dataObj, this.xLabel, this.yLabel, this.optionObj);
		},
		_reDraw: function () {
			this.dataObj.refreshArr[this.dataId] = makeRefresh(this.axisObj.stage);
			this.axisObj.boxSearchArr[this.graphId] = dotBoxSearch(this);
			this._drawSet(this.axisObj, this.dataObj, this.xLabel, this.yLabel, this.optionObj);
		},
		_drawSet: function(axisObj, dataObj, xLabel, yLabel, optionObj) {
			var temp = axisObj._getPixelXY(dataObj[xLabel], dataObj[yLabel]);
			var xArr = temp.xArr;
			var yArr = temp.yArr;
			var labelArr = getFields(dataObj);				
			var subSet = this.subSet;
			this.node = new Array();
			if (this.colorOn == true) {
				for (var i=0; i<xArr.length; i++) {						
					if (!(xArr[i] == -1 || yArr[i] == -1) && (subSet == -1 || eval(subSet))) {
						this.node[i] = new Kinetic.Circle({
							name: i,
							x: xArr[i],
							y: yArr[i],
							radius: this.radius,
							stroke: (dataObj[this.colorLabel].isDiscrete == undefined) ? dataObj[this.colorLabel].color[i] : dataObj[this.colorLabel].colorIndex[dataObj[this.colorLabel][i]],
							fill: (dataObj[this.colorLabel].isDiscrete == undefined) ? dataObj[this.colorLabel].color[i] : dataObj[this.colorLabel].colorIndex[dataObj[this.colorLabel][i]],
							selected: 0,
							opacity: 0.5,
							info: "Node: " + i + "\r\n" + getNodeinfo(dataObj, i)
						});
					} else {
						this.node[i] = null;
					}
				}
			} else {
				for (var i=0; i<xArr.length; i++) {
					if (!(xArr[i] == -1 || yArr[i] == -1) && (subSet == -1 || eval(subSet))) {
						this.node[i] = new Kinetic.Circle({
							name: i,
							x: xArr[i],
							y: yArr[i],
							radius: this.radius,
							stroke: this.baseColor,
							fill: this.baseColor,
							selected: 0,
							opacity: 0.5,
							info: "Node: " + i + "\r\n" + getNodeinfo(dataObj, i)
						});
					} else {
						this.node[i] = null;
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
	}
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
function dotBoxSearch (graphObj) {
	return function (smallX, smallY, bigX, bigY) {
		var tmpNodeArr = new Array();
		var tmpNodeArr1 = new Array();
		if (ctrlPressed == true) {
			for (var i=0; i<graphObj.node.length; i++) {
				if (smallX <= graphObj.node[i].getX() && graphObj.node[i].getX() <= bigX && smallY <= graphObj.node[i].getY() && graphObj.node[i].getY() <= bigY) {
					tmpNodeArr.push(graphObj.node[i].getName());
				}
			}
			allGraphUpdate(graphObj, tmpNodeArr, null, 'ctrl');
		} else {
			for (var i=0; i<graphObj.node.length; i++) {
				if (smallX <= graphObj.node[i].getX() && graphObj.node[i].getX() <= bigX && smallY <= graphObj.node[i].getY() && graphObj.node[i].getY() <= bigY) {
					tmpNodeArr.push(graphObj.node[i].getName());
				}
			}
			allGraphUpdate(graphObj, tmpNodeArr, 1, null);
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
function dotUpdate () {
	return	function (node, selectOn) {
		if (node.getSelected() == 1 && selectOn < 0) {		//unselect
			node.setStroke(node.getFill());
			node.setScaleX(1);
			node.setScaleY(1);
			node.setOpacity(0.5);
			node.setSelected(0);
		} else if (node.getSelected() == 0 && selectOn > 0) {	//select
			node.setStroke('black');
			node.setScaleX(2);
			node.setScaleY(2);
			node.setOpacity(1);
			node.setSelected(1);
			node.moveToTop();
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
function dotHover () {
	return function (node, overOff) {// over: 1 , off: 0
		if (overOff == 1) {
			node.setScaleX(1.5);
			node.setScaleY(1.5);
			node.draw();
		} else if (overOff == 0) {
			var tween = new Kinetic.Tween({
				node: node, 
				duration: 0.01,
				scaleX: 1,
				scaleY: 1
			}).play(); 
		}
	};
}
