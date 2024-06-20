// create an instance of the audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// create an oscillator
const oscillator = audioContext.createOscillator();
let isOscillating = false;
let isMouseDown = false;
let lastKey = '';

function playSound(frequency) {
  if (!isOscillating) {
    oscillator.start();
    isOscillating = true;
  }

  oscillator.frequency.value = frequency;
  oscillator.connect(audioContext.destination);
}

const buttons = document.querySelectorAll('button.piano__key');

buttons.forEach((button) => {
  button.style.setProperty('--highlight', `hsl(${Math.random() * 360}, 95%, 60%)`);
});

function handleMouseDown() {
  if (!isMouseDown) {
    isMouseDown = true;
    this.classList.add('active');
    const dataFrequency = parseFloat(this.getAttribute('data-frequency'));
    playSound(dataFrequency);
  }
}

function handleMouseUp() {
  oscillator.disconnect(audioContext.destination);
  isMouseDown = false;
  buttons.forEach(button => button.classList.remove('active'));
}

buttons.forEach((button) => {
  button.addEventListener('mousedown', handleMouseDown);
  button.addEventListener('mouseup', handleMouseUp);
});

function handleKeyDown(e) {
  const { key } = e;
  
  buttons.forEach((button) => {
    const dataKey = button.getAttribute('data-key');
    if (key === dataKey || (dataKey === 'Space' && key === ' ')) {
      if (lastKey !== dataKey) {
        lastKey = dataKey;
        button.classList.add('active');
        const dataFrequency = parseFloat(button.getAttribute('data-frequency'));
        playSound(dataFrequency);
      }
    }
  });
}

function handleKeyUp(e) {
  const { key } = e;

  buttons.forEach((button) => {
    const dataKey = button.getAttribute('data-key');
    if (key === dataKey || (dataKey === 'Space' && key === ' ')) {
      button.classList.remove('active');
      oscillator.disconnect(audioContext.destination);
    }
  });
}

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);
