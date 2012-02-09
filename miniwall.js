/*
 * This file is part of miniwall. See the file README for more info.
 */

var MAX_TWEETS = 10;           // Maximum number of displayed tweets
var SEARCH_STRING = '%23ACTA'; // URL encoded search string (%23 == #)

var queryArg = '?q='+SEARCH_STRING;

function updateTweets() {

    // get some tweets by making a request to the twitter search api:
    $.getJSON('http://search.twitter.com/search.json'
            +queryArg + '&callback=?', function(response){

        // format the tweets as html
        // and prepend the received tweets to the list:
        $.each(response.results, function(key, val) {
            li = $('<li>').attr('id','tweet'+key).hide().css('opacity','0.0');
            li.append($('<img>').attr('src',val.profile_image_url).attr('alt',''));
            li.append($('<span>').attr('class','userName').html(val.from_user_name+': '));
            li.append(val.text);
            li.append($('<div>').attr('class','clear'));

            $('#tweets').prepend(li);

            li.slideDown("slow",function(){
                $(this).animate({opacity:'1.0'},500);
                if ($('#tweets li').length > MAX_TWEETS) $('#tweets li').last().remove();
            });
        }); // END: $.each(response.results)
        queryArg = response.refresh_url; // twitter adds ?since_id=LASTID to URL

    }); // END: getJSON( Twitter Search API )

    // do the same request after five seconds:
    setTimeout("updateTweets()",5000);

} // END: updateTweets()

$('document').ready(function(){
    updateTweets();
});
