
/**
 * @fileOverview operate to make search box
 */
 
 /**  
 * @description make sesarch box on the browser
 * 
 * @param searchBoxIdString
 * @param mainArr data object which want to search a data using search box
 * 
 * @ignore
 * 
 */
function makeSearchButton(searchBoxIdString, mainArr)
{
	var searchBoxId = searchBoxIdString.slice(9);
	// to access mainArr from booleanSearch function later
	window["mainArrOfSearch"+searchBoxId] = mainArr;
	// make form 
	document.write("<div class=\"search_wrap\"><form id=\"searchForm");
	document.write(searchBoxId);
	document.write("\">");

	// make answer button
	document.write("<a id=\"ansId\" href=\"#\" class=\"ansButton\" onclick=\"addAnsToSearchBox(");
	document.write(searchBoxId);
	document.write("); return false;\">Ans</a>");
	
	// make answer clear button
	document.write("<a id=\"clearAnsId\" href=\"#\" class=\"ansButton\" onclick=\"printClearAns(");
	document.write(searchBoxId);
	document.write(", mainArrOfSearch");
	document.write(searchBoxId);
	document.write("); return false;\">Clr Ans</a>");
	
	// make answer label
	document.write("<label> [ans] : </label>");
	document.write("<label id=\"label");
	document.write(searchBoxId);
	document.write("\">undefined</label>");
	
	// make text input box
	document.write("<input type=\"text\" id=\"searchBox");
	document.write(searchBoxId);
	document.write("\" name=\"searchId");
	document.write(searchBoxId);
	document.write("\" placeholder=\"Please input boolean statement...\" " +
			"onkeydown=\"if (event.which || event.keyCode){if ((event.which == 13) || (event.keyCode == 13))" +
			" {booleanSearch(");
	document.write(searchBoxId);
	document.write(", mainArrOfSearch");
	document.write(searchBoxId);
	document.write("); printAns(");
	document.write(searchBoxId);
	document.write(", mainArrOfSearch");
	document.write(searchBoxId);
	document.write("); return false;}};\"/>");	

	// make search button
	document.write("<a id=\"searchBtn\" href=\"#\" class=\"myButton\" onClick=\"booleanSearch(");
	document.write(searchBoxId);
	document.write(", mainArrOfSearch");
	document.write(searchBoxId);
	document.write("); printAns(");
	document.write(searchBoxId);
	document.write(", mainArrOfSearch");
	document.write(searchBoxId);
	document.write("); return false;\">Search</a>");
	
	// make clear button
	document.write("<a id=\"clearBtn\" href=\"#\" class=\"myButton\" onClick=\"clearSearchBox(");
	document.write(searchBoxId);
	document.write("); return false;\">Clear</a>");
	
	// close form 
	document.write("<br><br></form></div>");
	
	// call auto complete function (jQuery)
	if(this.cnt == undefined){ // temporary static cnt.
		this.cnt = 0;
	}else{
		this.cnt ++;
	}
	if(this.cnt == 0){
		document.write("<link rel=\"stylesheet\" href=\"http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css\"/>");
		document.write("<script src=\"http://code.jquery.com/jquery-1.9.1.js\" type=\"text/javascript\"></script>");
		document.write("<script src=\"http://code.jquery.com/ui/1.10.3/jquery-ui.js\" type=\"text/javascript\"></script>");
	}else{
		this.cnt = 1;
	}	
	document.write("<script>");
	document.write("autoComplete(");
	document.write(searchBoxId);
	document.write(", mainArrOfSearch");
	document.write(searchBoxId);
	document.write(");</script>");
}

/**  
 * @description clear all values on the search box
 * 
 * @param searchBoxId identical number that assigned for each search box
 * 
 */
function clearSearchBox(searchBoxId)
{
	var textBox = document.getElementById("searchBox"+searchBoxId);
	textBox.value = '';	
}

/**  
 * @description clear ans value
 * 
 * @param searchBoxId identical number that assigned for each search box
 * @param mainArr data object which want to search a data using search box
 * 
 */
function printClearAns(searchBoxId, mainArr)
{
	mainArr.$ans = "undefined";
	document.getElementById('label'+searchBoxId).innerHTML = "undefined";
}

/**  
 * @description add ans condition value on the search box
 * 
 * @param searchBoxId identical number that assigned for each search box
 * 
 */
function addAnsToSearchBox(searchBoxId)
{
    var textBox = document.getElementById("searchBox"+searchBoxId);
    textBox.value = textBox.value + "[ans]";
}

/**  
 * @description save ans to ansShow in order to show it in label
 * 
 * @param searchBoxId identical number that assigned for each search box
 * @param mainArr data object which want to search a data using search box
 * 
 */
function printAns(searchBoxId, mainArr)
{
	// save ans to ansShow in order to show it in label
	var ansShow = mainArr.$ans;	   
	var discreteCnt = 0;
	
    for(var i = 0 ; i < mainArr.labelArr.length ; i ++)
    {
    	if(mainArr[mainArr.labelArr[i]].isDiscrete == undefined){//continuous
	    	var tmpStr = "mainArr\[\""+mainArr.labelArr[i]+"\"]\[i\]";    
		    ansShow = replaceAll(ansShow, tmpStr, mainArr.labelArr[i]);
    	}else{
    		var tmpStr = "temp[\"" + discreteCnt + "\"][i]";
    		ansShow = replaceAll(ansShow, tmpStr, mainArr.labelArr[i]);
    		discreteCnt ++;
    	}
    }
    
	var tmpStr = '';	
	tmpStr = ansShow.replace(/</g,'< ');//cannot understand why "<" do not work, "< " works.
	document.getElementById('label'+searchBoxId).innerHTML = tmpStr;
	if(ansShow==''){		
		printClearAns();
	}
}

/**  
 * @description find values which matched with boolean condition
 * 
 * @param searchBoxId identical number that assigned for each search box
 * @param mainArr data object which want to search a data using search box
 * 
 */
function booleanSearch(searchBoxId, mainArr)
{
	var searchIdString = "searchId" + searchBoxId;
	var inputStr = document.getElementsByName(searchIdString)[0].value;
	var findingNumber = new Array();
	
	var discreteCnt = 0;
	for(var i = 0 ; i < mainArr.labelArr.length ; i ++)
	{		
		if(mainArr[mainArr.labelArr[i]].isDiscrete == true){//continuous
			discreteCnt++;
		}
	}
	var temp = make2DArr(discreteCnt);
	discreteCnt = 0;
	
	// replace labelArr to mainArr[labelArr]
	for(var i = 0 ; i < mainArr.labelArr.length ; i ++)
	{		
		if(mainArr[mainArr.labelArr[i]].isDiscrete == undefined){//continuous
			var searchStr = new RegExp(mainArr.labelArr[i], 'g'); // "g" means all search
			inputStr = inputStr.replace(searchStr, "mainArr[\"" + mainArr.labelArr[i] + "\"][i]");		
		}else{//discrete
			var searchStr = new RegExp(mainArr.labelArr[i], 'g'); // "g" means all search
			for(var j = 0 ; j < mainArr[mainArr.labelArr[i]].length ; j ++){
				temp[discreteCnt].push(mainArr[mainArr.labelArr[i]].index[mainArr[mainArr.labelArr[i]][j]]); 
			}
			inputStr = inputStr.replace(searchStr, "temp[\"" + discreteCnt + "\"][i]");
			discreteCnt ++;
		}
		
	}
	inputStr =inputStr.replace(/\[ans\]/gi, "("+mainArr.$ans+")"); 
	
	//current answer update.
	mainArr.$ans=inputStr; 
	// find node number which satisfies boolean condition
	var temp = new Array(mainArr.$isSelected.length);
	for(var i = 0 ; i < mainArr.$isSelected.length ; i ++)
	{	
		temp[i] = 0;
		if(eval(inputStr)){			
			findingNumber.push(i);
		}
	}

	for(var i = 0 ; i < findingNumber.length ; i ++){
		temp[findingNumber[i]] = 1;
	}
	
	updateRecursive(mainArr, temp, mainArr.$isSelected);
}

/**  
 * @description replace all string
 * 
 * @param str
 * @param originalStr 
 * @param replacedStr 
 * 
 * @ignore
 */
function replaceAll(str, orginalStr, replacedStr){
	return str.split(orginalStr).join(replacedStr);
}

/**
 * @ignore
 */
//auto complete (Reference, http://jqueryui.com/autocomplete/#multiple)
function autoComplete(searchBoxId, mainArr){
	(function(){
	    var availableTags = mainArr.labelArr;
	    function split( val ) {
	        return val.split( / \s*/ );
	    }
	    function extractLast( term ) {
	    	return split( term ).pop();
	    }
	    $( "#searchBox"+searchBoxId )
	    	// don't navigate away from the field on tab when selecting an item
		.bind( "keydown", function( event ) {
		  if ( event.keyCode === $.ui.keyCode.TAB &&
			  $( this ).data( "ui-autocomplete" ).menu.active ) {
			event.preventDefault();
		  }
		})
		.autocomplete({
			minLength: 0,
			source: function( request, response ) {
			// delegate back to autocomplete, but extract the last term
			response( $.ui.autocomplete.filter(
			  availableTags, extractLast( request.term ) ) );
			},
			focus: function() {
			// prevent value inserted on focus
			return false;
			},
			select: function( event, ui ) {
				var terms = split( this.value );
				// remove the current input
				terms.pop();
				// add the selected item
				terms.push( ui.item.value );
				// add placeholder to get the comma-and-space at the end
				terms.push( "" );
				this.value = terms.join( " " );
				return false;
			}
		});
	});	
}
