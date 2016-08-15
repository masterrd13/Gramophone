$(document).ready(function(){
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

function grabData(){
    //takes value in input field
    var name = $("#name").val();
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
            ifrm.setAttribute('width', '50%');
            ifrm.setAttribute('height', '167');
            ifrm.setAttribute('scrolling', 'no');
            ifrm.setAttribute('frameborder', 'no');
            document.body.appendChild(ifrm);
            
        }
});
}
$('#submit').click(function(){
   
    grabData();
    
});

})
//Client ID: 26c7d767a14e16bf491cd18dbb2f90c1
//Client Secret:0d1f489079f3c8674aa27c848342dfcc