const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d");
let mousePos = { x: 0, y: 0 };

var distance = 160;
var mouseDistance = 2000;
var minSize = 50;
var maxSize = 80;
var colors = ["#1fcdf0", "#3fe8b5", "#cfe83f", "#e8933f", "#e8443f", "#e83f7a", "#de52d5", "#af52de", "#5e52de", "#5277de", "#52de7d", "#52de3f", "#52de1f"];

function Update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //mouse position
  const ratio = { x: canvas.width / canvas.clientWidth, y: canvas.height / canvas.clientHeight };
  const mouseCanvasPos = { x: mousePos.x * ratio.x, y: mousePos.y * ratio.y }

  //red square
  /*ctx.beginPath();
  ctx.fillRect(mouseCanvasPos.x - 25, mouseCanvasPos.y - 25, 25, 25)
  ctx.closePath();*/

  let rowColor = 0;
  if (rowColor >= colors.length) { rowColor = 0; }

  for (let row = 0; row < canvas.height + distance; row += distance) {

    let colColor = 0;
    if (colColor >= colors.length) { colColor = 0; }

    for (let col = 0; col < canvas.width + distance; col += distance) {
      const x = col - mouseCanvasPos.x;
      const y = row - mouseCanvasPos.y;
      const distance = Math.sqrt(x * x + y * y);

      let size = minSize;
      if (distance < mouseDistance) {
        size = maxSize - (maxSize - minSize) * (distance / mouseDistance);
      }

      //draw circle
      ctx.beginPath();
      ctx.arc(col, row, size, 0, 2 * Math.PI)

      ctx.fillStyle = colors[(rowColor + colColor) % colors.length];
      ctx.fill()

      ctx.closePath();

      colColor++;
    }
    rowColor++;
  }

  window.requestAnimationFrame(Update);
}
Update()

window.addEventListener("mousemove", function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  console.log(mouseX, mouseY);
  mousePos.x = mouseX;
  mousePos.y = mouseY;
})
