$(function () {

    $('.collection').hide();
    $('.first').hide();

    $('.submit').on('click', function (event) {
        console.log('clicked!');
        event.preventDefault();
        searchArtist();
        $('.validate').val('');
        $('.hides').html(`<h3 class='animated fadeInDownBig'>Now click a button to get the video!</h3>`);
        $('.first').fadeIn(2000);
    })

    var searchArtist = () => {

        var artist = $('.validate').val().toLowerCase().trim();
        var desc = 'desc';

        $('.tbody').empty();

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
            console.log(`This is your ${JSON.stringify(data)}`);
            //creating a for loop to get to the tracks we need
            for (var i = 0; i < data.message.body.track_list.length; i++) {
                console.log(data.message.body.track_list[i].track.track_name);

                var track = data.message.body.track_list[i].track.track_name;

                var $btn = $('<a>').addClass('animated flipInX waves-effect waves-light btn-large pulse purple track col s12').text(track)
                    .attr('data-track', track);
                //this took me a bit to figure out how to get each button into a different row, but this seems to work well
                var $td = $('<td>').append($btn);
                var $row = $('<tr>').append($td);
                $('.tbody').append($row);
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

            var database = firebase.database();

            // here is us saving each search
            var htmlSearch = artist;

            var dbSearch = {
                search: htmlSearch
            };
            database.ref('searches').push(dbSearch);

            //alright this shows us the last 5 searches (def needs a little styling love)
            database.ref('searches/').orderByChild('artist') //limits the amound appended to 5. 
                .limitToLast(5).on('value', function (snapshot) {
                    $('.emptyMe').empty('.emptyMe');
                    snapshot.forEach(function (childSnapshot) {
                        console.log(`CHILD SNAP YO ${childSnapshot.val()}`);
                        var topChildren = childSnapshot.val();

                        $('.emptyMe').append(`<li class='collection-item animated shake purple white-text center-align'>${topChildren.search}</li>`)
                        console.log(topChildren.search);
                    })
                })
        })

    }
    $('.parallax').parallax();
})

