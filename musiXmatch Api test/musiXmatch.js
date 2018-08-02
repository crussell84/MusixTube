$(function() {
   


$('.submit').on('click', function(event) {
console.log('We clicked')
event.preventDefault()
musiXmatchAjax()
})
var musiXmatchAjax = () => {


var song = $('.song').val()
var artist = $('.artist').val()
var desc = 'desc'

$('.divs').empty()

    $.ajax({
        type: 'GET', 
        data: {
            apikey: "252f3dcdcdbd77dd7d1efb11a9a20b7a",
            q_song: song,
            q_artist: artist,
            s_track_rating: desc,
            page_size: 5,
            format:"jsonp",
            callback:"jsonp_callback"
        },
        url: "https://api.musixmatch.com/ws/1.1/track.search",
        dataType: "jsonp",
        jsonpCallback: 'jsonp_callback',
        contentType: 'application/json',
        error: function(XMLHttpRequest, textstatus, error ) {
            console.log('THIS IS AN ERROR song' ,error,textstatus,XMLHttpRequest)
        }
    }).then(function(data){
        console.log(data)
        for(var i = 0; i < data.message.body.track_list.length; i++) {
            console.log(data.message.body.track_list[i].track.track_name)
            console.log(data.message.body.track_list[i].track.track_edit_url)
            var track = data.message.body.track_list[i].track.track_name
         
        
            var $a = $('<a>').addClass('waves-effect waves-light pulse red btn').text(track)
             $a.append('<i class="material-icons left">youtube_search_for</i>')
            $('.divs').append($a)
        }
    })
}
 

})