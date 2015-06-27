define("tags",function(a, b, c){

	var GetTags = function(str){
		if(typeof(str)=='string'&&str!='')
		{
			var tag = str.split('#');
			return tag;
		}
		else{
			return [];
		}
	};
	
	c.exports = GetTags;
})