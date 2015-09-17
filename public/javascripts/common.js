var DM = {};

DM.Common = {
	convertArray : function (data) { 
			        	
		var o = {};

		for (var i = 0, l = data.length; i < l; i++) {
			if (typeof (o[data[i].name]) == 'undefined'){
				o[data[i].name] = data[i].value;
			} else {
			    o[data[i].name] += "," + data[i].value; 
			}
		};
		
		return o; 
	}
};