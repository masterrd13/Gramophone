
function getUrlVars() {
var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
vars[key] = value;
});
return vars;
}
var SearchQ = getUrlVars()["search"];
console.log(SearchQ);


//SPOTIFY SEARCH FUNCTION
var arr = [];
function getSpotify(){
	var name= SearchQ;
	console.log(name);
	$.ajax({
		url: 'https://api.spotify.com/v1/search?q=' + name + "&type=track",
			success: function(result){
				
				for (var i = 0; i < result.tracks.items.length; i++){
					var strHREF = result.tracks.items[i].href;
					strHREF = strHREF.substr(34, strHREF.length);		
					arr.push(strHREF);
				}
				generateIframes(arr);
			}
	})
}

function print(adj){
	$('#content').text('');
	for(var prop in obj){
		$('#content').append('<p>' + prop + ':' + obj[prop] + '</p>');
	}
}
//$('#search').click(function(){
//	getSpotify();
//})


function generateIframes(arrID){
	for (var i =0; i < arrID.length; i++){
		
		var ifrm = document.createElement("iframe");
		ifrm.setAttribute("width", "50%");
		ifrm.setAttribute("height", "80");
		ifrm.setAttribute("frameboarder", "0");
		ifrm.setAttribute("allowtransparency", "true");
		ifrm.setAttribute("src", "https://embed.spotify.com/?uri=spotify:track:" + arrID[i]);
		document.body.appendChild(ifrm);

	}
}


SearchQ = SearchQ + "";
if (SearchQ != "undefined"){
    console.log(SearchQ);
    getSpotify();
}


