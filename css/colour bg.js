const colors = ["lightblue", "lightgreen", "lightcoral", "lavender", "yellow"];

setInterval(() => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = randomColor;
}, 3000);

