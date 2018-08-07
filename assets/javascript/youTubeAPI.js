$(document).ready(function () {
    
  
    $(document).on("click", '.track', function (event) {
        var track = $(this).attr('data-track');
        $('#youtubeBox').empty();
        $('.hides').remove();
        $('.collection').hide();
        $('.collection').addClass('animated slideInDown')
        $('.collection').show();
        youtubeApiCall(track);
        console.log("ON CLICK");
        return false;
    });
    function youtubeApiCall(track) {
        var artist = $("#artistName").val();
        var track = track;
        var query = artist + " " + track;
        console.log(query);
        $.ajax({
            cache: false,
            data: $.extend({
                key: 'AIzaSyBd9qzoC2CKQXsDv--fsMVj7BqOV_285ys',
                q: query,
                part: 'snippet',
            }, { maxResults: 1, type: 'video', videoEmbeddable: 'true' }),
            dataType: 'json',
            type: 'GET',
            timeout: 5000,
            url: 'https://www.googleapis.com/youtube/v3/search'
        })
            .done(function (data) {
                var video = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + data.items[0].id.videoId + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
                $("#youtubeBox").append(video);
                console.log(data);
            });
    }
});