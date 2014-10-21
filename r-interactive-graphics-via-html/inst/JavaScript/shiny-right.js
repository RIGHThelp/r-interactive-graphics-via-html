
/**
 * @fileOverview operate to make server-offloading graphs
 * @ignore
 */
 
var cnt = 0;
var offload;
var rightOutputBinding = new Shiny.OutputBinding();
rightOutputBinding.find = function(scope){
	return $(scope).find(".right-output");
};
rightOutputBinding.renderValue = function (el, data) {
	if (cnt > 0) {//if(data change)
		if (data != null) {
			for (var name in data) {
				window[el.id][name] = data[name];
			}
			window[el.id].draw();
		}		
	}
	cnt++;
};
Shiny.outputBindings.register(rightOutputBinding, 'div.rightOutputBinding');
