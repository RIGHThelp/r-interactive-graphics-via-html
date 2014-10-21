
/**
 * @fileOverview operate to make table which represent data
 */
 
 /**  
 * @description delete row at table
 * 
 * @param tableID identical number that assigned for each table box
 * 
 */
function deleteRow(tableID) {
	try {
		var table = document.getElementById(tableID);
		var rowCount = table.rows.length;
 
		for(var i = 2 ; i < rowCount ; i ++) {
			var row = table.rows[i];
	        if(1){
	            table.deleteRow(i);
	            rowCount--;
	            i--;
	        }
		}
    }catch(e){
        alert(e);
    }
}

 /**  
 * @description reload table data
 * 
 * @param tableID identical number that assigned for each table box
 * @param mainArr data object which want to write a data using table box
 * 
 */
function refreshTable(tableID, mainArr){
	return function() {
		deleteRow(tableID);
		var table = document.getElementById(tableID);
		var rowCount = table.rows.length;
		var row = table.insertRow(rowCount);
		var colCount = table.rows[0].cells.length;
		var colWidth=100;
		var cnt = 0;
		for(var i = 0 ; i < mainArr.$isSelected.length ; i ++){
			if(mainArr.$isSelected[i] == 1){
				rowCount = table.rows.length;
				row = table.insertRow(rowCount);
				var newcell = row.insertCell(0);
				newcell.align = 'center';
				newcell.style.backgroundColor = '#cfe444';
				newcell.style.color = 'black';
				newcell.innerHTML = i;
				newcell.width = colWidth;
				
				for(var j = 1 ; j < colCount ; j ++) {
					var newcell = row.insertCell(j);			
					newcell.align = 'center';
					newcell.style.color = 'black';
					newcell.width = colWidth;
					if(mainArr[mainArr.labelArr[j-1]].isDiscrete == true){
						newcell.innerHTML = mainArr[mainArr.labelArr[j-1]].index[mainArr[mainArr.labelArr[j-1]][i]];
					}else{
						newcell.innerHTML = mainArr[mainArr.labelArr[j-1]][i];
					}					
				}
			}
		}		
	};
}

 /**  
 * @description make html code to draw table on the browser
 * 
 * @param tableID identical number that assigned for each table box
 * @param mainArr data object which want to write a data using table box
 * @param height height of table box
 * 
 */
function makeTable(tableID, mainArr, height){
	var colWidth=100;
	mainArr.refreshTable = refreshTable(tableID, mainArr);
	document.write("<style>");
	document.write("table.selectedInfo { width: "+((colWidth)*(mainArr.labelArr.length+1)-1)+"px; }");			
	document.write("#"+"css"+tableID+" { width: "+ ((colWidth+1)*(mainArr.labelArr.length+1)+16) +"px;}");
	document.write("#"+"css"+tableID+" { height: " + height + "px;}"); 
	document.write("table.scrollable .node     div { width: "+colWidth+"px; text-align:center;  }");
	document.write("table.scrollable .column div { width: "+colWidth+"px; text-align:center;  }");

	document.write("</style>"); 

	document.write("<div id="+"css"+tableID+" class=\"scrollableContainer\" style=\"float: left; position : relative; display:block; margin : 10px 1px 0px 10px ;\">");
	document.write(" <div id="+"css"+tableID+" style=\"overflow: auto; \">");
	document.write("<table id=" + tableID + " class=\"scrollable\">");
	document.write("<thead>");
	document.write("<tr>");
	document.write("<th class=\"node\"><div>node<br>(number)</div></th>");
	for(var i = 0 ; i < mainArr.labelArr.length ; i ++){
		document.write("<th class=\"column\"><div>" + mainArr.labelArr[i] + "</div></th>");
	}	  			
	
	document.write("</tr>");
	document.write("</thead>");
	document.write("<tbody id="+"csstbody"+tableID+">");		
	document.write("<tr style=\"display:none; \"> ");			//style=\"display:none\">
	document.write("<td><div>-</div></td>");
	for(var i = 0 ; i < mainArr.labelArr.length ; i ++){
		document.write("<td ><div>-</div></td>");
	}
	document.write("</tr>");
	document.write("</tbody>");
	document.write("</table>");
	document.write(" </div>");
	document.write(" </div>");
}
