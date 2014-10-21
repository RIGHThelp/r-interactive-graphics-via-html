
/**
 * @fileOverview draw and manage menu box (right click on the graph or nodes)
 */
 
 var menuOn = false;
 
 /**  
 * @description draw and check menu box on the graph
 * 
 * @param Name graph object which want to draw menu box
 * 
 * @ignore
 * 
 */
function menu(Name)
{       
    Name.menuLayer = new Kinetic.Layer();
    Name.menu = new Kinetic.Group({
		opacity: 0.95,
        visible: false
    });
    Name.menuText = new Array();
    Name.menuRect = new Array();
    var menuName = ["Hide", "Reset"]; //add topmenu element you want.    
    for(var i = 0 ; i < menuName.length ; i ++){
        Name.menuText[i] = new Kinetic.Text({
			y: 25 * i,
			text: '',
			fontFamily: 'Calibri',
			fontSize: 15,
			padding: 5,
			fill: 'white'
        })      
        Name.menuRect[i] = new Kinetic.Rect({
			y: 25 * i,
			width: 90,
			height: 25,
			fill: '#93b21a'
        });
        Name.menu.add(Name.menuRect[i]).add(Name.menuText[i]);
        Name.menuText[i].setText(' ' + menuName[i]);                              
        (function (i) { 
            Name.menuText[i].on('mouseover', function(evt){
            	for(var k = 0 ; k < menuName.length ; k ++){
            		Name.menuRect[k].setFill('#93b21a');
                    Name.menuText[k].setFill('white');
            	}
                Name.menuRect[i].setFill('#cfe444');
                Name.menuText[i].setFill('black');
                Name.menuLayer.draw();
                if(i == 0 || i == 1 || i == 2){ //if "Hide", "Reset", "Table" no sub menu       
                    for(var j = 0; j < optionMenuName.length ; j ++){
                        Name.optionMenu[j].hide();
                        Name.optionMenuLayer.draw();                               
                        Name.subMenu[j].hide();
                        Name.subMenuLayer[j].draw();
                    }
                    for(var j = 0; j < regressionMenuName.length ; j ++){
                        Name.regressionMenu[j].hide();
                        Name.regressionMenuLayer.draw();
                    }
                }
            });
            Name.menuRect[i].on('mouseover', function(evt){
            	for(var k=0; k<menuName.length; k++){
            		Name.menuRect[k].setFill('#93b21a');
                    Name.menuText[k].setFill('white');
            	}
            	Name.menuRect[i].setFill('#cfe444');
                Name.menuText[i].setFill('black');
                Name.menuLayer.draw();
            	if(i == 0 || i == 1 || i == 2){ //if "Hide", "Reset", "Table", "Regression" no sub menu       
                    for(var j = 0 ; j < optionMenuName.length ; j ++){
                            Name.optionMenu[j].hide();
                            Name.optionMenuLayer.draw();
                            Name.subMenu[j].hide();
                            Name.subMenuLayer[j].draw();
                    }
                    for(var j = 0; j < regressionMenuName.length ; j ++){
                        Name.regressionMenu[j].hide();
                        Name.regressionMenuLayer.draw();
                    }
                }
            });
		    Name.menuText[i].on('mouseout', function(evt){
		            Name.menuRect[i].setFill('#93b21a');
		            Name.menuText[i].setFill('white');
		            Name.menuLayer.draw();
		    });
		    Name.menuRect[i].on('mouseout', function(evt){
		            Name.menuRect[i].setFill('#93b21a');
		            Name.menuText[i].setFill('white');
		            Name.menuLayer.draw();
		    });
	    })(i);
    }
    Name.menuLayer.add(Name.menu);
    Name.stage.add(Name.menuLayer);
    
    Name.menuText[0].on('click', function(evt){
    	hideSelected(Name);
        Name.menu.hide();
        Name.menuLayer.draw();  
    });
    Name.menuRect[0].on('click', function(evt){
        hideSelected(Name);
        Name.menu.hide();
        Name.menuLayer.draw();  
    });
    Name.menuText[1].on('click', function(evt){
        resetSelected(Name);
        Name.menu.hide();
        Name.menuLayer.draw();  
    });
    Name.menuRect[1].on('click', function(evt){
		resetSelected(Name);
        Name.menu.hide();
        Name.menuLayer.draw();                  
    });
            
    var regressionMenuName = ['linear', 'loess']; //add option element you want.
    Name.regressionMenuLayer = new Kinetic.Layer();
    Name.regressionMenu = new Array(regressionMenuName.length);
    for(var i = 0 ; i < regressionMenuName.length ; i++){
        Name.regressionMenu[i] = new Kinetic.Group({
                opacity: 0.95,
                visible: false
        });
    }
    Name.regressionMenuText = new Array();
    Name.regressionMenuRect = new Array();    
    
    for(var i = 0 ; i < regressionMenuName.length ; i ++){
        Name.regressionMenuText[i] = new Kinetic.Text({
    	    x: 88,
            y: 25* i,
            text: '',
            fontFamily: 'Calibri',
            fontSize: 15,
            padding: 5,
            fill: 'white'
        })      
        Name.regressionMenuRect[i] = new Kinetic.Rect({
    		x: 93,
            y: 25 * i,
            width: 90,
            height: 25,
            fill: '#EEAD0E'
        });
        Name.regressionMenu[i].add(Name.regressionMenuRect[i]).add(Name.regressionMenuText[i]);
        Name.regressionMenuText[i].setText(' '+regressionMenuName[i]);                              
        (function (i) { 
        	Name.regressionMenuText[i].on('mouseover', function(evt){
        		Name.menuRect[3].setFill('#cfe444');
                Name.menuText[3].setFill('black');  
                Name.menuLayer.draw();//menu higlighed		
            	for(var k = 0 ; k < regressionMenuName.length ; k ++){
            		Name.regressionMenuRect[k].setFill('#EEAD0E');
                    Name.regressionMenuText[k].setFill('white');
            	}
                Name.regressionMenuRect[i].setFill('FFD700');
                Name.regressionMenuText[i].setFill('black');
                Name.regressionMenuLayer.draw();                        
            });
            Name.regressionMenuRect[i].on('mouseover', function(evt){
            	Name.menuRect[3].setFill('#cfe444');
                Name.menuText[3].setFill('black');  
                Name.menuLayer.draw();//menu higlighed	
            	for(var k = 0; k < regressionMenuName.length ; k ++){
            		Name.regressionMenuRect[k].setFill('#EEAD0E');
                    Name.regressionMenuText[k].setFill('white');
            	}
                Name.regressionMenuRect[i].setFill('#FFD700');
                Name.regressionMenuText[i].setFill('black');
                Name.regressionMenuLayer.draw();
            });
            Name.regressionMenuText[i].on('mouseout', function(evt){
                Name.regressionMenuRect[i].setFill('#EEAD0E');
                Name.regressionMenuText[i].setFill('white');
                Name.regressionMenuLayer.draw();
            });
            Name.regressionMenuRect[i].on('mouseout', function(evt){
                Name.regressionMenuRect[i].setFill('EEAD0E');
                Name.regressionMenuText[i].setFill('white');
                Name.regressionMenuLayer.draw();
            });    
        })(i);
    }
    for(var i = 0; i < regressionMenuName.length ; i ++){
        Name.regressionMenuLayer.add(Name.regressionMenu[i]);
    }
    Name.stage.add(Name.regressionMenuLayer);
    // regression regression.
    Name.regressionMenuText[0].on('click', function(evt){
    	linearSendArr(Name);
        Name.menu.hide();
        Name.menuLayer.draw();  
    });
    Name.regressionMenuRect[0].on('click', function(evt){
    	linearSendArr(Name);
        Name.menu.hide();
        Name.menuLayer.draw(); 
    });
    // loess regression.
    Name.regressionMenuText[1].on('click', function(evt){
    	loessSendArr(Name);
        Name.menu.hide();
        Name.menuLayer.draw();  
    });
    Name.regressionMenuRect[1].on('click', function(evt){
    	loessSendArr(Name);
        Name.menu.hide();
        Name.menuLayer.draw(); 
    });
    
    // under option.
    var optionMenuName = ['xAxis', 'yAxis', 'color', 'width', 'height', 'bin']; //add option element you want.
    Name.optionMenuLayer = new Kinetic.Layer();
    Name.optionMenu = new Array(optionMenuName.length);
    for(var i = 0 ; i < optionMenuName.length ; i ++){
        Name.optionMenu[i] = new Kinetic.Group({
            opacity: 0.95,
            visible: false
        });
    }
    Name.optionMenuText = new Array();
    Name.optionMenuRect = new Array();    
    
    for(var i = 0 ; i < optionMenuName.length ; i ++){
        Name.optionMenuText[i] = new Kinetic.Text({
    	    x: 88,
            y: 25 * i,
            text: '',
            fontFamily: 'Calibri',
            fontSize: 15,
            padding: 5,
            fill: 'white'
        })      
        Name.optionMenuRect[i] = new Kinetic.Rect({
    		x: 93,
            y: 25 * i,
            width: 90,
            height: 25,
            fill: '#EEAD0E'
        });
        Name.optionMenu[i].add(Name.optionMenuRect[i]).add(Name.optionMenuText[i]);
        Name.optionMenuText[i].setText(' '+optionMenuName[i]);                              
        (function (i) { 
        	Name.optionMenuText[i].on('mouseover', function(evt){
        		Name.menuRect[4].setFill('#cfe444');
                Name.menuText[4].setFill('black');  
                Name.menuLayer.draw();//menu higlighed	
            	for(var k = 0 ; k < optionMenuName.length ; k ++){
            		Name.optionMenuRect[k].setFill('#EEAD0E');
                    Name.optionMenuText[k].setFill('white');
            	}
                Name.optionMenuRect[i].setFill('FFD700');
                Name.optionMenuText[i].setFill('black');
                Name.optionMenuLayer.draw();
                for(var j=0; j<optionMenuName.length; j++){
                    Name.subMenu[j].hide();
                    Name.subMenuLayer[j].draw();    
                }                       
                Name.subMenuLayer[i].moveToTop();                    
                Name.subMenu[i].show();
                Name.subMenuLayer[i].draw();                    
            });
            Name.optionMenuRect[i].on('mouseover', function(evt){
            	Name.menuRect[4].setFill('#cfe444');
                Name.menuText[4].setFill('black');  
                Name.menuLayer.draw();//menu higlighed	
            	for(var k=0; k<optionMenuName.length; k++){
            		Name.optionMenuRect[k].setFill('#EEAD0E');
                    Name.optionMenuText[k].setFill('white');
            	}
                Name.optionMenuRect[i].setFill('#FFD700');
                Name.optionMenuText[i].setFill('black');
                Name.optionMenuLayer.draw();
                for(var j=0; j<optionMenuName.length; j++){
                    Name.subMenu[j].hide();
                    Name.subMenuLayer[j].draw();    
                }       
               Name.subMenuLayer[i].moveToTop();
                Name.subMenu[i].show();
                Name.subMenuLayer[i].draw();
            });
            Name.optionMenuText[i].on('mouseout', function(evt){
                    Name.optionMenuRect[i].setFill('#EEAD0E');
                    Name.optionMenuText[i].setFill('white');
                    Name.optionMenuLayer.draw();
            });
            Name.optionMenuRect[i].on('mouseout', function(evt){
                    Name.optionMenuRect[i].setFill('EEAD0E');
                    Name.optionMenuText[i].setFill('white');
                    Name.optionMenuLayer.draw();
            });    
        })(i);
    }
    for(var i = 0; i < optionMenuName.length ; i ++){
        Name.optionMenuLayer.add(Name.optionMenu[i]);
    }
    Name.stage.add(Name.optionMenuLayer);
    
    Name.subMenuLayer = new Array(optionMenuName.length);
    Name.subMenu = new Array(optionMenuName.length);
    for(var i = 0; i < optionMenuName.length ; i ++){
        Name.subMenuLayer[i] = new Kinetic.Layer();
        Name.subMenu[i] = new Kinetic.Group({
            opacity: 0.95,
            visible: false
        });
    }
    Name.subMenuText = make2DArr(optionMenuName.length);
    Name.subMenuRect = make2DArr(optionMenuName.length);
    var subMenuName =  make2DArr(optionMenuName.length);
    for(j = 0 ; j < optionMenuName.length ; j ++){
		switch(j){
    		case 0 : 
    		case 1 :
    		case 2 :
                subMenuName[j] = Name.labelArr;
                break;
    		case 3 :
    		case 4 :
    			subMenuName[j] = ['-100px', '-10px', '-1px', '+1px', '+10px', '+100px'];
                break;
    		case 5 :
    			subMenuName[j] = ['-1', '+1'];
                break;
            default :
            	break;
		}
        (function (j) {
            for(var i = 0; i < subMenuName[j].length ; i ++){
                Name.subMenuText[j][i] = new Kinetic.Text({
                    x: 180,
                    y: 25 * i + 25 * j,
                    text: '',
                    fontFamily: 'Calibri',
                    fontSize: 15,
                    padding: 5,
                    fill: 'white'
                });      
                Name.subMenuRect[j][i] = new Kinetic.Rect({
                    x: 185,     
                    y: 25 * i,
                    y: 25 * i + 25 * j,
                    width: 90,
                    height: 25,
                    fill: '#7a8eb9'
                });     
                Name.subMenu[j].add(Name.subMenuRect[j][i]).add(Name.subMenuText[j][i]);
                Name.subMenuText[j][i].setText(' ' + subMenuName[j][i]);  
                (function (i) { 
                    Name.subMenuText[j][i].on('click', function(evt){
                    	array_of_functions[j](Name, Name.labelArr[i]);
                    });
                    Name.subMenuRect[j][i].on('click', function(evt){
                    	array_of_functions[j](Name, Name.labelArr[i]);
                    });
                    Name.subMenuText[j][i].on('mouseover', function(evt){
                    	Name.optionMenuRect[j].setFill('#FFD700');
                        Name.optionMenuText[j].setFill('black');  
                        Name.optionMenuLayer.draw();//option menu higlighed	
                		Name.subMenuRect[j][i].setFill('#516ca3');
                        Name.subMenuText[j][i].setFill('white');     
                        Name.subMenu[j].show();
                        Name.subMenuLayer[j].draw(); 
                        Name.menuLayer.draw();
                    });
                    Name.subMenuRect[j][i].on('mouseover', function(evt){
                    	Name.optionMenuRect[j].setFill('#FFD700');
                        Name.optionMenuText[j].setFill('black');  
                        Name.optionMenuLayer.draw();//option menu higlighed	
                        Name.subMenuRect[j][i].setFill('#516ca3');
                        Name.subMenuText[j][i].setFill('white');
                        Name.subMenu[j].show();
                        Name.subMenuLayer[j].draw();
                        Name.menuLayer.draw();
                    });
                    Name.subMenuText[j][i].on('mouseout', function(evt){
                        Name.subMenuRect[j][i].setFill('#7a8eb9');
                        Name.subMenuText[j][i].setFill('white');            
                    });
                    Name.subMenuRect[j][i].on('mouseout', function(evt){
                        Name.subMenuRect[j][i].setFill('#7a8eb9');
                        Name.subMenuText[j][i].setFill('white');
                    });     
                })(i); 
            }
        })(j); 
    }
    for(var j = 0; j < optionMenuName.length ; j ++){
        Name.subMenuLayer[j].add(Name.subMenu[j]);
        Name.stage.add(Name.subMenuLayer[j]);
    }
   
    Name.stage.on('click', function(evt){
        if((evt.which && evt.which == 3) || (evt.button && evt.button == 2)){ //right click
        	if(menuOn == true){
        		// hide all menu.
        		for(var j = 0; j < optionMenuName.length ; j ++){
                		Name.optionMenu[j].hide();
                        Name.subMenu[j].hide();
                        Name.subMenuLayer[j].draw();
                }
        		for(var j = 0 ; j < regressionMenuName.length ; j ++){
        			Name.regressionMenu[j].hide();
        		}
        		Name.regressionMenuLayer.draw();
        		Name.optionMenuLayer.draw();
        	}else{
        		menuOn = true;
        	}       	
            var node = evt.targetNode;
            //update menu
            var menuHeight = 25*menuName.length;
            var menuWidth = 90;
            var mousePos = node.getStage().getPointerPosition();
            /*****************/
            /*	2	|	1	*/
            /*---------------*/
            /*	3	|	4	*/
            /****************/      
            if(mousePos.x < Name.plotXMargin + Name.width/2 && mousePos.y < Name.plotYMargin + Name.height/2){//2nd quadrant
                Name.menu.setPosition({x: mousePos.x, y: mousePos.y});
                Name.optionMenuLayer.setPosition({x: mousePos.x, y: mousePos.y});
                Name.regressionMenuLayer.setPosition({x: mousePos.x, y: mousePos.y + 75});
                for(var j = 0 ; j < subMenuName.length ; j ++){
                	Name.subMenuLayer[j].setPosition({x: mousePos.x, y: mousePos.y});
                }                                
            }else if(mousePos.x < Name.plotXMargin + Name.width/2 && mousePos.y > Name.plotYMargin + Name.height/2){//3rd quadrant
                Name.menu.setPosition({x: mousePos.x, y: mousePos.y - menuHeight});
                Name.optionMenuLayer.setPosition({x: mousePos.x, y: mousePos.y - menuHeight});
                Name.regressionMenuLayer.setPosition({x: mousePos.x, y: mousePos.y - menuHeight + 75});
                for(var j = 0 ; j < subMenuName.length ; j ++){
                	Name.subMenuLayer[j].setPosition({x: mousePos.x , y: mousePos.y - 25*optionMenuName[0].length - 25*(subMenuName[j].length-1)/2});
                }                    
            }else if(mousePos.x > Name.plotXMargin + Name.width/2 && mousePos.y < Name.plotYMargin + Name.height/2){//1st quadrant
                Name.menu.setPosition({x: mousePos.x - menuWidth, y: mousePos.y});
                Name.optionMenuLayer.setPosition({x: mousePos.x  - menuWidth, y: mousePos.y});
                Name.regressionMenuLayer.setPosition({x: mousePos.x  - menuWidth, y: mousePos.y + 75});
                for(var j = 0 ; j < subMenuName.length ; j ++){
                	Name.subMenuLayer[j].setPosition({x: mousePos.x - 5 - 3*menuWidth, y: mousePos.y});
                }
            }else{//4th quadrant
                Name.menu.setPosition({x: mousePos.x  - menuWidth , y: mousePos.y - menuHeight});
                Name.optionMenuLayer.setPosition({x: mousePos.x  - menuWidth , y: mousePos.y  - menuHeight});
                Name.regressionMenuLayer.setPosition({x: mousePos.x  - menuWidth , y: mousePos.y  - menuHeight + 75});
                for(var j = 0 ; j < subMenuName.length ; j ++){
                	Name.subMenuLayer[j].setPosition({x: mousePos.x - 5 - 3*menuWidth, y: mousePos.y - 25*optionMenuName[0].length  - 25*(subMenuName[j].length-1)/2});
                }
            }
            Name.menuLayer.moveToTop();
            Name.menu.show();
            Name.menuLayer.draw();
        }else if((evt.which && evt.which == 1) || (evt.button && evt.button == 0)){ //left click
            if(menuOn == true){
            	// hide all menu.
                Name.menu.hide();
                Name.menuLayer.draw();
        		for(var j = 0; j < optionMenuName.length ; j ++){
                		Name.optionMenu[j].hide();
                        Name.subMenu[j].hide();
                        Name.subMenuLayer[j].draw();
                }
        		for(var j = 0 ; j < regressionMenuName.length ; j ++){
        			Name.regressionMenu[j].hide();
        		}
        		Name.regressionMenuLayer.draw();
        		Name.optionMenuLayer.draw();
            }
        }
	});        
}
