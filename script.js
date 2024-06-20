document.addEventListener('DOMContentLoaded', function() {
  bubbles(); // Call the bubbles function when the page loads
  
  // Add event listeners to circles
  var circles = document.querySelectorAll('.circle1, .circle2, .circle3, .circle4, .circle5');
  circles.forEach(function(circle, index) {
      circle.addEventListener('click', function() {
          handleClick(index);
      });
  });

  // Add event listener for keydown
  document.addEventListener('keydown', function(event) {
    switch(event.key) {
      case 'ArrowUp':
        handleClick(0);
        break;
      case 'ArrowLeft':
        handleClick(1);
        break;
      case 'ArrowDown':
        handleClick(2);
        break;
      case 'ArrowRight':
        handleClick(3);
        break;
      case ' ':
        handleClick(4);
        break;
    }
  });
});

function handleClick(index) {
  var circles = document.querySelectorAll('.circle1, .circle2, .circle3, .circle4, .circle5');
  var circle = circles[index];
  circle.classList.add('circle-disappear'); // Add class to trigger animation
  setTimeout(function() {
      circle.style.display = 'none'; // Hide the clicked circle after animation
      circle.classList.remove('circle-disappear'); // Remove class after animation
      setTimeout(function() {
          circle.style.display = 'block'; // Reappear the circle after a delay
      }, 4000); // Adjust the delay (in milliseconds) as needed
  }, 500); // Duration of the animation (in milliseconds)
  
  // Play the corresponding sound
  var sound = document.getElementById('sound' + (index + 1));
  if (sound) {
      sound.play();
  }
}

var bubblesContainer = document.querySelector('.bubbles');
var bubbleToggle = document.querySelector('.bubble-toggle');

function bubbles() {
  // Settings
  var minBubbleCount = 20, // Minimum number of bubbles
      maxBubbleCount = 60, // Maximum number of bubbles
      minBubbleSize = 3, // Smallest possible bubble diameter (px)
      maxBubbleSize = 12; // Maximum bubble blur amount (px)

  // Calculate a random number of bubbles based on our min/max
  var bubbleCount = minBubbleCount + Math.floor(Math.random() * (maxBubbleCount + 1));

  // Create the bubbles
  for (var i = 0; i < bubbleCount; i++) {
    var bubbleContainer = document.createElement('div');
    bubbleContainer.classList.add('bubble-container');
    var bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubbleContainer.appendChild(bubble);
    bubblesContainer.appendChild(bubbleContainer);
  }

  // Now randomize the various bubble elements
  var bubbleContainers = document.querySelectorAll('.bubble-container');
  bubbleContainers.forEach(function(container) {
    // Randomize the bubble positions (0 - 100%)
    var posRand = Math.floor(Math.random() * 101);

    // Randomize their size
    var sizeRand = minBubbleSize + Math.floor(Math.random() * (maxBubbleSize + 1));

    // Randomize the time they start rising (0-15s)
    var delayRand = Math.floor(Math.random() * 16);

    // Randomize their speed (3-8s)
    var speedRand = 3 + Math.floor(Math.random() * 9);

    // Random blur
    var blurRand = Math.floor(Math.random() * 3);

    // Apply the new styles
    container.style.left = posRand + '%';
    container.style.animationDuration = speedRand + 's';
    container.style.animationDelay = delayRand + 's';
    container.style.filter = 'blur(' + blurRand + 'px)';
    
    var bubble = container.querySelector('.bubble');
    bubble.style.width = sizeRand + 'px';
    bubble.style.height = sizeRand + 'px';
  });
}

// Toggle bubbles
bubbleToggle.addEventListener('click', function(event) {
  event.preventDefault();
  if (bubblesContainer.innerHTML.trim() === '') {
    bubbles();
    bubblesContainer.style.display = 'block';
    bubbleToggle.textContent = 'Bubbles Off';
  } else {
    bubblesContainer.innerHTML = '';
    bubblesContainer.style.display = 'none';
    bubbleToggle.textContent = 'Bubbles On';
  }
});
