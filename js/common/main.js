define("common/main", function(a, b, c) {

	var hrefParamsArray = GetSessionIdFromHref(window.location.search);

	function GetSessionIdFromHref(search) {


		var args = search.substring(1);
		
		var retval = {};
		args = args.split("&");

		for (var i = 0; i < args.length; i++) {
			str = args[i];
			var arg = str.split("=");
			if (arg.length <=0) continue;
			if (arg.length ==1) retval[arg[0]] = true;
			else retval[arg[0]] = arg[1];
		}
		return retval;
	}
	c.exports = {
		hrefParamsArray: hrefParamsArray
	}
});