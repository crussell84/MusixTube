$(function () {

    $('.submit').on('click', function (event) {
        console.log('clicked!')
        event.preventDefault();
        searchArtist()

    })

    var searchArtist = () => {

        var artist = $('.validate').val().trim()
        var desc = 'desc'

        $('.tbody').empty()

        $.ajax({
            type: 'GET',
            data: {
                apikey: '252f3dcdcdbd77dd7d1efb11a9a20b7a',
                q_artist: artist,
                s_track_rating: desc,
                page_size: 5,
                format: 'jsonp',
                callback: 'jsonp_callback'
            },
            url: 'https://api.musixmatch.com/ws/1.1/track.search',
            dataType: 'jsonp',
            jsonpCallback: 'jsonp_callback',
            contentType: 'application/json',
            error: function (XMLHttpRequest, textstatus, error) {
                console.log(`this is an error type = ${XMLHttpRequest}${textstatus}${error}`)
            }
        }).then(function (data) {
            console.log(`This is your ${JSON.stringify(data)}`)
            //creating a for loop to get to the tracks we need

            for (var i = 0; i < data.message.body.track_list.length; i++) {
                console.log(data.message.body.track_list[i].track.track_name)

                var track = data.message.body.track_list[i].track.track_name


                //So this is working, but im sure we are going to have to add more when we incorporate the youtube api
                //Buttons are ugly right now... figured this is still kind of a rough draft... but good to know it works
                var $btn = $('<a>').addClass('waves-effect waves-light btn pulse purple track').text(track)
                    .append(`<i class="material-icons left">youtube_search_for</i>`).attr('data-track', track);
                //this took me a bit to figure out how to get each button into a different row, but this seems to work well
                var $td = $('<td>').append($btn)
                var $row = $('<tr>').append($td) 
                $('.tbody').append($row)
            }
            // Initialize Firebase
            var config = {
                apiKey: "AIzaSyA1qKS9HgfqEm5eGR8ERt_lgnzEb_-tUZM",
                authDomain: "musixtube-68650.firebaseapp.com",
                databaseURL: "https://musixtube-68650.firebaseio.com",
                projectId: "musixtube-68650",
                storageBucket: "musixtube-68650.appspot.com",
                messagingSenderId: "62207883054"
            };
            firebase.initializeApp(config);

            var database = firebase.database()

            //here is us saving each search
            //I am doing some research on how we are going to track the most common 

            var htmlSearch = artist

            var dbSearch = {
                search: htmlSearch
            }
            database.ref('searches').push(dbSearch)





        })
    }
})
