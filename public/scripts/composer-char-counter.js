$(document).ready(function() {
  const maxLength = 140; // Define the maximum character limit

  // Register event handler for the input event on the textarea
  $('.new-tweet textarea').on('input', function() {
    const textLength = $(this).val().length;
    const charsLeft = maxLength - textLength;

    // Update the counter on the page
    const counterElement = $(this).closest('.new-tweet').find('.counter');
    counterElement.text(charsLeft);

    // Add or remove the 'invalid' class to turn the counter red
    if (charsLeft < 0) {
      counterElement.addClass('invalid');
    } else {
      counterElement.removeClass('invalid');
    }
  });
});

