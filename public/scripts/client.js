$(document).ready(function() {
  // Function to render a single tweet
  const renderTweet = function(tweet) {
    const $tweet = $('<article>').addClass('tweet');

    const $header = $('<header>');
    const $div = $('<div>');
    const $avatar = $('<img>').attr('src', tweet.user.avatars);
    const $name = $('<span>').text(tweet.user.name);
    const $handle = $('<span>').text(tweet.user.handle);
    $div.append($avatar, $name);
    $header.append($div, $handle);

    const $content = $('<div>').addClass('content').text(tweet.content.text);

    const $footer = $('<footer>').text(timeago.format(tweet.created_at));

    $tweet.append($header, $content, $footer);
    return $tweet;
  };

  // Function to render all tweets
  const renderTweets = function(tweets) {
    const $tweetsContainer = $('#tweets-container');
    $tweetsContainer.empty();

    tweets.forEach(function(tweet) {
      const $tweet = renderTweet(tweet);
      $tweetsContainer.prepend($tweet);
    });
  };

  // Function to load tweets from the server
  const loadTweets = function() {
    $.ajax({
      url: "/tweets", // Replace this URL with your server endpoint for fetching tweets
      type: "GET",
      dataType: "json",
      success: function(response) {
        renderTweets(response); // Call the renderTweets function with the JSON response
      },
      error: function(error) {
        console.error("Error loading tweets:", error);
      }
    });
  };
  
  // Function to handle form submission and posting new tweet to the server
  $('#tweet-form').on('submit', (function(event) {    event.preventDefault();

    const tweetText = $('#tweet-text').val();
    const MAX_TWEET_LENGTH = 140;

    if (!tweetText) {
      alert('Empty Tweet');
    } else if (tweetText.length > MAX_TWEET_LENGTH) {
      alert('Long Tweet');
    } else {
      $.ajax('/tweets', { 
        method: 'POST',
        data: $(this).serialize()
      })
      .then(() => {
        $('#tweet-text').val('');
        loadTweets();
      });
    }
  }));

  // Fetch and render tweets on page load
  loadTweets();
});

