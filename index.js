var canvas = $("canvas");
var ctx = canvas[0].getContext("2d");
var size = 1;
var color = $("#color").val();
var lastEvent;
var tool;

$("#size").change(function () {
  size = $(this).val();
  console.log(size);
});

$("#color").change(function () {
  color = $(this).val();
});

//set canvas width and height
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

//save button
var link = document.createElement('a');
link.innerHTML = 'download image';
link.addEventListener('click', function (ev) {
  link.href = canvas[0].toDataURL();
  link.download = "mypainting.png";
}, false);
link.className += 'btn btn-primary';
document.body.appendChild(link);

$('input[type="file"]').change(function (e) {
  ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
  var img = new Image;
  img.onload = function () {
    ctx.drawImage(this, 0, 0);
  }

  img.src = $(this)[0].files[0].name
});


// the controller
$("#tool").change(function () {
  $("#alert").html(
    $(this)
      .children("option:selected")
      .val() + " activate"
  );
  tool = $(this)
    .children("option:selected")
    .val();
  $(canvas).off();
  window[tool]();
});

function pen() {

  console.log("done");

  canvas
    .mousedown(function (e) {
      lastEvent = e;
    })
    .mousemove(function (e) {
      if (e.buttons == 1) {
        e.preventDefault();
        ctx.beginPath();
        ctx.moveTo(lastEvent.offsetX, lastEvent.offsetY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        ctx.stroke();
        lastEvent = e;
      }
    });
}
//Eraser
function eraser() {
  {
    console.log('eraser');
    canvas
      .mousedown(function (e) {
        lastEvent = e;
      })
      .mousemove(function (e) {
        if (e.buttons == 1) {
          console.log("eraser");
          e.preventDefault();
          ctx.beginPath();
          ctx.moveTo(lastEvent.offsetX, lastEvent.offsetY);
          ctx.lineTo(e.offsetX, e.offsetY);
          ctx.lineWidth = 2 * size;
          ctx.strokeStyle = "white";
          ctx.stroke();
          lastEvent = e;
        }
      });
  }
}

//line

function line() {
  var click = 0;
  canvas.mousedown(function (e) {
    if (click == 0) {
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    } else {
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.lineWidth = size;
      ctx.strokeStyle = color;
      ctx.stroke();
    }
    if (click >= 1) {
      click = 0;
    } else {
      click++;
    }
  });
}

//rectangle ;)

function rectangleFill() {
  var first = [];
  var second = [];
  var click = 0;

  canvas.mousedown(function (e) {
    if (click == 0) {
      first[0] = e.offsetX;
      first[1] = e.offsetY;
      click++;
    } else {
      console.log("done");
      second[0] = e.offsetX;
      second[1] = e.offsetY;
      ctx.fillStyle = color;
      ctx.fillRect(
        first[0],
        first[1],
        second[0] - first[0],
        second[1] - first[1]
      );
      click = 0;
    }
  });
}

function rectangle() {
  var first = [];
  var second = [];
  var click = 0;

  canvas.mousedown(function (e) {
    if (click == 0) {
      first[0] = e.offsetX;
      first[1] = e.offsetY;
      click++;
    } else {
      second[0] = e.offsetX;
      second[1] = e.offsetY;
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.strokeRect(
        first[0],
        first[1],
        second[0] - first[0],
        second[1] - first[1]
      );
      click = 0;
    }
  });
}
