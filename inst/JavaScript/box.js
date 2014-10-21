
/**
 * @fileOverview operate base information to draw box graph
 */
 
/**  
 * @description operate max value of vertical line under fence
 * 
 * @param Data number array of corresponding data
 * @param q1 min value of square box graph
 * @param q3 max value of square box graph
 * 
 * @returns properties properties of value and number
 *  
 */
function findMaxBelowFence(Data, q1, q3)
{
    var iqr = q3 - q1;    
    var fence = q3 + 1.5*iqr;
    var fenceNumber;
    var outliers = new Array();
    var cnt = 0;
    var maxValue = q3;
    for(var i = 0 ; i < Data.length ; i ++){
    	if(Data[i] > maxValue && Data[i] <= fence){
    		maxValue = Data[i];
    		fenceNumber = i;
    	}
	}
	return {fence : maxValue, fenceNumber: fenceNumber};
}

/**  
 * @description operate min value of vertical line over fence
 * 
 * @param Data number array of corresponding data
 * @param q1 min value of square box graph
 * @param q3 max value of square box graph
 * 
 * @returns properties properties of value and number
 *  
 */
function findMinAboveFence(Data, q1, q3)
{
    var iqr = q3 - q1;    
    var fence = q1 - 1.5*iqr;
    var fenceNumber;
    var outliers = new Array();
    var cnt = 0;
    var minValue = q1;
    for(var i = 0 ; i < Data.length ; i ++){
    	if(Data[i] < minValue && Data[i] >= fence){
    		minValue = Data[i];
    		fenceNumber = i;
    	}
	}
    return {fence : minValue, fenceNumber: fenceNumber};
}

/**  
 * @description operate max and min value of box graph (q1, q3)
 * 
 * @param Data number array of corresponding data
 * @param q1 min value of square box graph
 * @param q3 max value of square box graph
 * 
 * @returns Data[] data value of corresponding data q1, q3, median
 *  
 */
function findQuartile(Data, _th)
{     
    var p = _th/4;
    var n = Data.length;
    var j = parseInt(n*p);
    var g = n*p - j;
    if(g == 0){
        return (Data[j-1] + Data[j]) / 2;
    }else{ //g > 0
        return Data[j];
    }
    
}

/**  
 * @description draw box-whisker graph
 * 
 * @constructor  
 *  
 */
var Box = {};
(function() {
	
	Box = function(axisObj, dataObj, optionObj) {
		this.axisObj = axisObj;
		this.dataObj = dataObj;
		this.optionObj = optionObj;
		this.dataId = dataObj.$id++;
		this.graphId = axisObj.numberOfGraph++;
		this.firstDraw = true;
		
		dataObj.graphObjArr[this.dataId] = this;
		axisObj.graphObjArr[this.graphId] = this;
		
		if (dataObj.$isOffload) {
			dataObj.$drawFence[this.dataId] = nullUpdate;
			dataObj.refreshArr[this.dataId] = nullUpdate;
			this.firstUpdate = nullUpdate;	        	
        	axisObj.hoverArr[this.graphId] = nullUpdate;
			axisObj.boxSearchArr[this.graphId] = nullUpdate;
		} else {
			dataObj.$drawFence[this.dataId] = boxUpdate();
			dataObj.refreshArr[this.dataId] = makeRefresh(axisObj.stage);
			this.firstUpdate = firstUpdate(dataObj);
			axisObj.hoverArr[this.graphId] = boxHover();
			axisObj.boxSearchArr[this.graphId] = boxBoxSearch(this);			
		}
		
		this.radius = null;
		this.baseColor = null;
		this.node = null;
		this.dataLayer = null;
	};
	/**
      @lends Box.prototype
    */
	Box.prototype = {
		/** @constructs */
		_init: function(axisObj, dataObj, optionObj) {			
			this.radius = (optionObj.radius == undefined) ? (2) : (optionObj.radius); // default radius is 2

			if(optionObj.baseColor != undefined && optionObj.baseColor != 'n'){
				this.baseColor = optionObj.baseColor;
			}else{
				this.baseColor = 'green';
			}
		},
		_draw: function() {
			if (this.firstDraw) {
				this._init(this.axisObj, this.dataObj, this.optionObj);
				this.firstDraw = false;
			}
			
			this._drawSet(this.axisObj, this.dataObj, this.optionObj);
		},
		_reDraw: function() {
			this.dataObj.refreshArr[this.dataId] = makeRefresh(this.axisObj.stage);
			this.axisObj.boxSearchArr[this.graphId] = boxBoxSearch(this);			
			this._drawSet(this.axisObj, this.dataObj, this.optionObj);
		},
		_drawSet : function(axisObj, dataObj, optionObj) {	
			var median = axisObj._getPixelY(dataObj.median);
			var isOutlier = dataObj.isOutlier;
			var q1 = axisObj._getPixelY(dataObj.q1);
			var q3 = axisObj._getPixelY(dataObj.q3);
			var upperFence = axisObj._getPixelY(dataObj.upperFence);
			var lowerFence = axisObj._getPixelY(dataObj.lowerFence);
			var x = axisObj._getPixelX(dataObj.x);
			var y = axisObj._getPixelY(dataObj.y);
			var width = (axisObj.isXDiscrete == true) ? axisObj.xbarWidth : axisObj.width - 20;
			
			this.node = new Array();
			var cnt = 0;
			for(var i = 0 ; i < median.length ; i ++){
				if(!(y[i] == -1)){
					if(isOutlier[i] == false){
						var IQR = q1[i] - q3[i];
						var upFence = upperFence[i];
						var loFence = lowerFence[i];
						var med = median[i];
						this.node[cnt] =  new Kinetic.BoxWhisker({
							name: i,
							x: (axisObj.isXDiscrete == true) ?  x[i] : axisObj._getPixelX((axisObj.xMax + axisObj.xMin)/2),
							y:  y[i],
							stroke: 'black',
							strokeWidth: 2,
							width: width,
							height: IQR,
							upFence: upFence - q3[i],
							loFence: loFence - q1[i],
							med: med - q3[i],
							fill: this.baseColor,
							opacity: 0.5,
							selected: 0,
							selectCnt : 0,
							isOutlier: false,
							info: "Node: " + i + "\r\n" + "UpFence: " + dataObj.upperFence[i] + "\r\n" + "LoFence: " + dataObj.lowerFence[i] + "\r\n" + "q3: " + dataObj.q3[i] + "\r\n" + "q1: " + dataObj.q1[i] + "\r\n" + "Median: " + dataObj.median[i], 
							offset: {x: width/2, y:0}
						});
						cnt ++;
					}else{
						this.node[cnt] = new Kinetic.Circle({
							name: i,
							x: (axisObj.isXDiscrete == true) ?  x[i] : axisObj._getPixelX((axisObj.xMax - axisObj.xMin)/2),
							y: y[i],
							radius: this.radius,
							stroke: this.baseColor,
							fill: this.baseColor,
							selected: 0,
							selectCnt : 0,
							opacity: 0.5,
							isOutlier: true,
							info: "Node: " + i + "\r\n" + "X: " + dataObj.x[i] + "\r\n" +"Y: : " + dataObj.y[i]
						});
						cnt ++;
					}
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

(function() {
    Kinetic.BoxWhisker = function(config) {
        this.___init(config);
    };

    Kinetic.BoxWhisker.prototype = {
        ___init: function(config) {
            Kinetic.Shape.call(this, config);
            this.className = 'BoxWhisker';
            this.sceneFunc(this._sceneFunc);
        },
        _sceneFunc: function(context) {
            var width = this.getWidth(),
                height = this.getHeight(),
                upFence = this.getUpFence(),
                loFence = this.getLoFence(),
                med = this.getMed();
				context.beginPath();
				context.rect(0, 0, width, height);
				context.moveTo(width/2, 0); // (width/2, 0)
				context.lineTo(width/2, upFence);  // (width/2, relative upperFence)
				context.moveTo(width/2, height); // (width/2, height)
				context.lineTo(width/2, height + loFence);  // (width/2, relative lowerFence)
				context.moveTo(0, med);	// (0, relative median)
				context.lineTo(width, med); // (width, relative median)
				context.closePath();
				context.fillStrokeShape(this);
		}
	};
	
    Kinetic.Util.extend(Kinetic.BoxWhisker, Kinetic.Shape);    
    Kinetic.Factory.addGetterSetter(Kinetic.BoxWhisker, 'upFence', 0);
    Kinetic.Factory.addGetterSetter(Kinetic.BoxWhisker, 'loFence', 0);
    Kinetic.Factory.addGetterSetter(Kinetic.BoxWhisker, 'med', 0);
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
function boxBoxSearch(graphObj) {
	return function(smallX, smallY, bigX, bigY) {
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
			allGraphUpdate(graphObj, tmpNodeArr, 0);
			allGraphUpdate(graphObj, tmpNodeArr1, 1);
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
function boxUpdate() {
	return	function(node, selectOn) {
		if(node.getSelected() == 1 && selectOn < 0) {
			if(node.getIsOutlier()) {
				node.setStroke(node.getFill());
				node.setScaleX(1);
				node.setScaleY(1);
				node.setOpacity(0.5);
				node.setSelected(0);
			} else {
				node.setSelectCnt(node.getSelectCnt() - 1);	
				if(node.getSelectCnt() == 0) {
					node.setOpacity(0.5);
					node.setSelected(0);
				}
			}
		} else if(selectOn > 0) {		
			if(node.getIsOutlier()) {
				node.setStroke('black');
				node.setScaleX(2);
				node.setScaleY(2);
				node.setOpacity(1);
				node.setSelected(1);
				node.moveToTop();
			}else{
				node.setSelectCnt(node.getSelectCnt() + 1);
				if(node.getSelected() == 0){
					node.setOpacity(1);
					node.setSelected(1);
				}
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
function boxHover() {
	return	function(node, overOff) {
		if(overOff == 1){
			if(node.getIsOutlier()){
				node.setScaleX(1.5);
				node.setScaleY(1.5);
				
			} else {
				node.setOpacity(1);
			}
			node.draw();
		} else if(overOff == 0) {
			if(node.getIsOutlier()){
				var tween = new Kinetic.Tween({
					node: node, 
					duration: 0.01,
					scaleX: 1,
					scaleY: 1
				}).play();
			}else{
				var tween = new Kinetic.Tween({
					node: node, 
					duration: 0.01,
					opacity: 0.5
				}).play();
			}				
		}
	};
}
