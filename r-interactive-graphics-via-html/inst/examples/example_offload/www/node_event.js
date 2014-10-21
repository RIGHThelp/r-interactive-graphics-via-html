
/**
 * @fileOverview draw and manage menu box (right click on the graph or nodes)
 */
 
window.addEventListener('keydown',checkKeyDown,false);  
window.addEventListener('keyup',checkKeyUp,false);
var ctrlPressed = false;
var shiftPressed = false;
var aPressed = false;
var zPressed = false;
var gPressed = false;
var tmpShift = false;

/**  
 * @description check which keyboard pressed down
 * 
 * @param e keyboard signal
 * 
 * @ignore
 * 
 */
function checkKeyDown (e) {               
	if (e.keyCode == 17 || e.keyCode == 25) { //ctrl key pressed
		ctrlPressed = true;
    }
	if (e.keyCode == 16) {  //shift key pressed
		shiftPressed = true;
    }
	if (e.keyCode == 65) {  //a key pressed
    	aPressed = true;
    }
	if (e.keyCode == 71) {  //g key pressed
    	gPressed = true;
    }
	if (e.keyCode == 90) {  //z key pressed
		zPressed = true;
    }
    /*
	if (ctrlPressed == true && e.keyCode == 46) {  //del key pressed
		hideSelected();
    }
    */
	if (ctrlPressed == true && e.keyCode == 45) {  //insert key pressed
		resetSelected();
    }
}

/**  
 * @description check which keyboard pressed
 * 
 * @param e keyboard signal
 * 
 * @ignore
 * 
 */
function checkKeyUp(e) {
	if (ctrlPressed == true && zPressed != true) {
		ctrlPressed = false;
    }
	if (shiftPressed == true) {
		shiftPressed = false;
    }
	if (aPressed == true) {
		aPressed = false;
    }
	if (gPressed == true) {
		gPressed = false;
    }
	if (zPressed == true) {
		zPressed = false;
    }
}       

/**  
 * @description function call about event functions
 * 
 * @param NameArr all axis object array
 * 
 * @ignore
 * 
 */
function eventTrigger (NameArr) {
	for (var i=0; i<NameArr.length; i++) {
		hover(NameArr[i]);
		select(NameArr[i]);
		drag(NameArr[i]);
		menu(NameArr[i]);
	}
}

var dragOn = false;

/**  
 * @description manage operation about drag moving on the graph
 * 
 * @param Name graph box which want to operate drag function
 * 
 * @ignore
 * 
 */
function drag (Name) {
    var preDragMousePos;
    var aftDragMousePos;
    
    var moving = false;
    var touch = false;
    var divid;
    Name.stage.on('mousedown touchstart', function(evt){
        if ((evt.which && evt.which == 1) || (evt.button && evt.button == 0)) { //left click
        	var node = evt.targetNode;
        	if (node.getName() == 'legend') {
        		return;
        	}
            divid = mouseName;
            preDragMousePos={x: (evt.pageX-divOffsetX), y: (evt.pageY-divOffsetY)};
    
			var mousePos = Name.stage.getPointerPosition();
			Name.rangeBox.setX(mousePos.x);
			Name.rangeBox.setY(mousePos.y);
			Name.rangeBox.setWidth(0);
			Name.rangeBox.setHeight(0);
			Name.touch = true;
			Name.rangeBoxLayer.drawScene();
        }
    }); 
    var tmpx, tmpy, tmpName;
    Name.stage.on("mousemove", function (evt){
    	if ((evt.which && evt.which == 1) || (evt.button && evt.button == 0)) { //left click                            
		    if (Name.touch == true) {
		    	Name.moving = true;
	            dragOn = true;
	            if (divid == mouseName) {
	                var mousePos = {x: (evt.pageX-divOffsetX), y: (evt.pageY-divOffsetY)};
	                tmpx = divOffsetX;
	                tmpy = divOffsetY;
	                tmpName = Name;
	            } else {
	                var mousePos = {x: (evt.pageX-tmpx), y: (evt.pageY-tmpy)};
	            }
	            var x, y;
	            x = mousePos.x;
	            y = mousePos.y;
	            Name.rangeBox.setWidth(x- Name.rangeBox.getX());
	            Name.rangeBox.setHeight(y- Name.rangeBox.getY());
	            Name.rangeBoxLayer.moveToTop();
	            Name.rangeBoxLayer.drawScene();
		    }
    	}    
    }, true);
    
    Name.stage.on("mouseup", function (evt){
    	if ((evt.which && evt.which == 1) || (evt.button && evt.button == 0)) { //left click
            if (Name.moving == true) {
                aftDragMousePos = {x: (evt.pageX-tmpx), y: (evt.pageY-tmpy)};
                Name.rangeBox.setWidth(0);
                Name.rangeBox.setHeight(0);
                Name.rangeBoxLayer.drawScene();
                if (ctrlPressed == false) {
                	for (var j=0; j<Name.graphObjArr.length; j++) {
						allDeselect(Name.graphObjArr[j]);
					}
                }
                // find small x,y and big x,y
                var smallX, bigX;
    			var smallY, bigY;
    			if (preDragMousePos.x >= aftDragMousePos.x) {
    				smallX = aftDragMousePos.x;
    				bigX = preDragMousePos.x;
    			} else if (preDragMousePos.x < aftDragMousePos.x) {
    		        smallX = preDragMousePos.x;
    		        bigX = aftDragMousePos.x;
    			}
    			if (preDragMousePos.y >= aftDragMousePos.y) {
    		        smallY = aftDragMousePos.y;
    		        bigY = preDragMousePos.y;
    			} else if (preDragMousePos.y < aftDragMousePos.y) {
    		        smallY = preDragMousePos.y;
    		        bigY = aftDragMousePos.y;
    			}
    			// box search
                for (var i=0; i<Name.boxSearchArr.length; i++) {
                	Name.boxSearchArr[i](smallX, smallY, bigX, bigY);
                }
                Name.moving = false;
                Name.touch = false;
            }
        }
    }, true);
}

/**  
 * @description manage operation about selecting node on the graph
 * 
 * @param Name graph box which want to operate drag function
 * 
 * @ignore
 * 
 */
function select (Name) {
	var tmpNodeArr = new Array();
	Name.stage.on('click', function (evt) {
		if ((evt.which && evt.which == 1) || (evt.button && evt.button == 0)) { //left click
			if (!(ctrlPressed || shiftPressed || aPressed || gPressed)) {
				var node = evt.targetNode;
				if (isNaN(node.getName())) {
					if (dragOn == true) {
			            dragOn = false;
			            return;
			        }
					Name.touch = false;
					for (var i=0; i<Name.graphObjArr.length; i++) {
						allDeselect(Name.graphObjArr[i]);
					}
				}
			}
		}		
	});
	for (var i=0; i<Name.dataLayerArr.length; i++) {
		(function (i) {
			Name.dataLayerArr[i].on('click', function (evt) {
				var node = evt.targetNode;
				if (dragOn == true) {
					dragOn = false;
		            return;
		        }
				Name.touch = false;
				if (!isNaN(node.getName())) {
					if (aPressed) {
						for (var j=0; j<Name.graphObjArr.length; j++) {
							allSelect(Name.graphObjArr[j]);
						}
	            	} else if (ctrlPressed) {
	                	allGraphUpdate(Name.graphObjArr[i], node.getName(), null, 'ctrl');
	            	} else {
						allGraphUpdate(Name.graphObjArr[i], node.getName(), 1, null);
	            	}
				}
			});
		})(i);
	}
}

/**  
 * @description manage operation about mouse over the nodes
 * 
 * @param Name graph box which want to operate hover function
 * 
 * @ignore
 * 
 */
function hover (Name) {
	for (var i=0; i<Name.dataLayerArr.length; i++) {
		(function (i) { 
			Name.dataLayerArr[i].on('mouseover mousemove dragmove', function(evt) {
				if (Name.moving == true) {                       
					return;
				}
				var node = evt.targetNode;
				document.body.style.cursor = "pointer";
				var mousePos = node.getStage().getPointerPosition();
				var mousePos = node.getStage().getPointerPosition();
				
				if (mousePos.x < Name.plotXMargin + Name.width/2 && mousePos.y < Name.plotYMargin + Name.height/2) {//set tooltip box position
					Name.tooltip.setPosition({x: mousePos.x + 8, y: mousePos.y + 2})
				} else if (mousePos.x < Name.plotXMargin + Name.width/2 && mousePos.y > Name.plotYMargin + Name.height/2) {
					Name.tooltip.setPosition({x: mousePos.x + 2, y: mousePos.y - 2 - Name.tooltip.getHeight()});
				} else if (mousePos.x > Name.plotXMargin + Name.width/2 && mousePos.y < Name.plotYMargin + Name.height/2) {
					Name.tooltip.setPosition({x: mousePos.x - 2 - Name.tooltip.getWidth(), y: mousePos.y + 2});
				} else {
					Name.tooltip.setPosition({x: mousePos.x - 2 - Name.tooltip.getWidth(), y: mousePos.y - 2 - Name.tooltip.getHeight()});
				}
				Name.tooltip.getText().setText(node.getInfo());
				Name.tooltipLayer.moveToTop();
				Name.tooltip.show();
				Name.tooltipLayer.draw();
				
				if(node.getSelected() == 0){
					Name.hoverArr[i](node, 1);
				}
			});
			Name.dataLayerArr[i].on('mouseout', function(evt) {
				if (dragOn == true) {                       
					dragOn = false;
					return;
				}
				
				var node = evt.targetNode;
				document.body.style.cursor = "default";
				Name.tooltip.hide();
				Name.tooltipLayer.draw();
				if (node.getSelected() == 0) {
					Name.hoverArr[i](node, 0);
				} else {
					if (node.getOpacity() == 0.5) {
						node.setOpacity(1);
						node.draw();
					}				
				}
			});
		})(i);
	}
}
