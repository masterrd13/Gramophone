
$(document).ready(function(){
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
function generateIframes(arrID){
	for (var i =0; i < arrID.length; i++){
		
		var ifrm = document.createElement("iframe");
		ifrm.setAttribute("width", "100%");
		ifrm.setAttribute("height", "100%");
		ifrm.setAttribute("frameboarder", "0");
		ifrm.setAttribute("allowtransparency", "true");
		ifrm.setAttribute("src", "https://embed.spotify.com/?uri=spotify:track:" + arrID[i]);
		$("#SpotifyC").append(ifrm);
        

	}
}


//SOUNDCLOUD SEARCH FUNCTION

SC.initialize({
    client_id: "26c7d767a14e16bf491cd18dbb2f90c1",
});

var stream_url = []

function print(obj){
    //resets the html content before filling it in
    $('#content').text('');
    //for loop written in shorthand for loping through each key:value
    for(var prop in obj){
        $('#content').append('<p>' + prop + ': ' + obj[prop] + '</p>');
    }
}

function getSoundCloud(){
    //takes value in input field
    var name = SearchQ;
    console.log(name);
    SC.get('/tracks', {
  q:(name), license: 'cc-by-sa'
}).then(function(tracks) {
        for (i = 0;i < tracks.length;i++){
            var stream_url = tracks[i].stream_url;
            stream_url = stream_url.substring(34,stream_url.length-7);
           
            var ifrm = document.createElement('iframe');
            console.log(stream_url);
            ifrm.setAttribute('class', 'ifrm');
            ifrm.setAttribute('src',"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/"+ stream_url+"&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true");
            ifrm.setAttribute('width', '100%');
            ifrm.setAttribute('height', '100%');
            ifrm.setAttribute('scrolling', 'no');
            ifrm.setAttribute('frameborder', 'no');
            ifrm.setAttribute('style','background: #22313F');
            $("#SoundCloudC").append(ifrm);
            
        }
});
}

//Client ID: 26c7d767a14e16bf491cd18dbb2f90c1
//Client Secret:0d1f489079f3c8674aa27c848342dfcc


SearchQ = SearchQ + "";
if (SearchQ != "undefined"){
    console.log(SearchQ);
    getSoundCloud();
    getSpotify();
}


})
