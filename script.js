document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("draw-pad");
  const context = canvas.getContext("2d");

  //widthValue
  const widhtValue = document.getElementById("widthValue");

  //colorValue
  const colorValue = document.getElementById("color");

  //colorBackground
  const colorBackground = document.getElementById("colorBackground");

  //Range Button
  const range = document.getElementById("width");
  range.min = 1;
  range.max = 10;
  range.value = 3;
  range.addEventListener("change", (e) => {
    widhtValue.innerHTML = range.value.toString();
    width = range.value;
  });

  //Download Button
  const downloadButton = document.getElementById("downloadButton");
  const link = document.getElementById("link");
  downloadButton.addEventListener("click", (e) => {
    //data URL of canvas
    const data_url = canvas.toDataURL();
    link.href = data_url;
    link.download = "canvas_img.png";
  });

  //BackgroundChange
  colorBackground.value = "#ffffff";
  colorBackground.addEventListener("change", (e) => {
    var backgroundColor = colorBackground.value.toString();
    console.log(backgroundColor);
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
  });

  //ResetButton
  const resetButton = document.getElementById("resetButton");

  resetButton.addEventListener("click", (e) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
  });

  //Canavas Variables
  var width = 3;

  // Set canvas size
  canvas.width = window.innerWidth * 0.5;
  canvas.height = window.innerHeight * 0.5;

  // Initialize drawing
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  function draw(e) {
    if (!isDrawing) return;
    context.strokeStyle = colorValue.value; // Set line color
    context.lineWidth = width; // Set line width
    context.lineCap = "round"; // Set line cap style
    context.beginPath();
    context.moveTo(lastX, lastY); // Start from
    context.lineTo(e.offsetX, e.offsetY); // Go to
    context.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }

  // Event listeners for drawing
  canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", () => (isDrawing = false));
  //canvas.addEventListener("mouseout", () => (isDrawing = false));
});
