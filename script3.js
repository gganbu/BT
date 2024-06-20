document.addEventListener('DOMContentLoaded', function() {
  generateBubbles();

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

var score = 0; // Initialize score

function handleClick(index) {
  var circles = document.querySelectorAll('.circle1, .circle2, .circle3, .circle4, .circle5');
  var circle = circles[index];
  circle.classList.add('circle-disappear'); // Add class to trigger animation
  setTimeout(function() {
    circle.classList.remove('circle-disappear'); // Remove class after animation
  }, 500); // Duration of the animation (in milliseconds)
  
  // Play the corresponding sound
  var sound = document.getElementById('sound' + (index + 1));
  if (sound) {
    sound.play();
  }

  // Check if there are bubbles under this circle
  var bubbleContainers = document.querySelectorAll('.bubble-container');
  bubbleContainers.forEach(function(container) {
    var bubble = container.querySelector('.bubble');
    if (bubble) {
      var rect = bubble.getBoundingClientRect();
      var circleRect = circle.getBoundingClientRect();
      if (
        rect.left < circleRect.right &&
        rect.right > circleRect.left &&
        rect.top < circleRect.bottom &&
        rect.bottom > circleRect.top
      ) {
        container.remove(); // Remove the bubble container
        score++; // Increase the score
        document.getElementById('score').textContent = score; // Update the scoreboard
      }
    }
  });
}

var bubblesContainer = document.querySelector('.bubbles');
var bubbleToggle = document.querySelector('.bubble-toggle');

function generateBubbles() {
  var bubbleSize = 60; // Bubble diameter (px)
  
  var circles = document.querySelectorAll('.circle1, .circle2, .circle3, .circle4, .circle5');
  var circlePositions = Array.from(circles).map(circle => circle.getBoundingClientRect().left + circle.offsetWidth / 2);

  // Create the bubbles
  for (var i = 0; i < circlePositions.length; i++) {
    var bubbleContainer = document.createElement('div');
    bubbleContainer.classList.add('bubble-container');
    bubbleContainer.style.left = circlePositions[i] - bubbleSize / 2 + 'px';
    var bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.dataset.circleIndex = i;
    bubbleContainer.appendChild(bubble);
    bubblesContainer.appendChild(bubbleContainer);
  }

  // Now randomize the various bubble elements
  var bubbleContainers = document.querySelectorAll('.bubble-container');
  bubbleContainers.forEach(function(container) {
    // Randomize their size
    var sizeRand = bubbleSize;

    // Randomize the time they start falling (0-5s)
    var delayRand = Math.floor(Math.random() * 6);

    // Randomize their speed (3-8s)
    var speedRand = 3 + Math.floor(Math.random() * 6);

    // Apply the new styles
    container.style.animationDuration = speedRand + 's';
    container.style.animationDelay = delayRand + 's';
    
    var bubble = container.querySelector('.bubble');
    bubble.style.width = sizeRand + 'px';
    bubble.style.height = sizeRand + 'px';
  });
}

// Toggle bubbles
bubbleToggle.addEventListener('click', function(event) {
  event.preventDefault();
  if (bubblesContainer.innerHTML.trim() === '') {
    generateBubbles();
    bubblesContainer.style.display = 'block';
    bubbleToggle.textContent = 'Bubbles Off';
  } else {
    bubblesContainer.innerHTML = '';
    bubblesContainer.style.display = 'none';
    bubbleToggle.textContent = 'Bubbles On';
  }
});
