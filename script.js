// TODO: Save shapes

window.onload = function() {
	let myCanvas = document.getElementById("myCanvas");
	let context = myCanvas.getContext("2d");
  
  let state = {
      'canvasX': 0,
      'canvasY': 0,
      'color':'#000000',
      'drawing': true,
      'erasing': false,
      'hasFocus': false,
      'interactive': false,
      'isDown': false,
      'eraserWidth': 25,
      'lineWidth': 6,
      'grid': false
  };

  // Fill Window Width and Height
  myCanvas.width = window.innerWidth;
	myCanvas.height = window.innerHeight;
	// Set Background Color
  context.fillStyle="#ffffff";
  context.fillRect(0,0,myCanvas.width,myCanvas.height);
  
  $('#sizeVal').html(state.lineWidth);
  

  $('button.color').on('click', function(){
    state.color = $(this).css('background-color');
  }); 

  $('#palette').on('input', function(){
    state.color = $(this).val();
  }); 
  
  // Handle clear button click
  $('#btnClear').on('click', function(){
    context.clearRect(0, 0, myCanvas.width, myCanvas.height);
  });

  // Handle Eraser button click
  $('#btnEraser').on('click', function(){
    state.color = context.fillStyle;
  });

  // Handle grid button click
  $('#btnGrid').on('click', function(){
    if(state.grid){
      state.grid = false;
      $("#myCanvas").css('background-image', "");
    } else{
      
      // myCanvas.style.backgroundImage = "url('images/grid.png')";
			// myCanvas.style.backgroundRepeat = "repeat";
			// whiteboard.style.borderStyle = "none";
			// whiteboard.style.borderWidth = "none";

      $("#myCanvas").css('background-image', "url('images/grid.png')");
      $("#myCanvas").css('background-repeat', 'repeat');
      // $("#myCanvas").css('background-size', 'cover');

      state.grid = true;
    }
  });

  $('#sizeBar').on('input', function(){
    state.lineWidth = $(this).val();
    $('#sizeVal').html(state.lineWidth);
  });

    // Mouse Event Handlers
	if(myCanvas){
		var isDown = false;
		var canvasX, canvasY;
		context.lineWidth = state.lineWidth;
		
		$(myCanvas)
		.mousedown(function(e){
			isDown = true;
			context.beginPath();
			canvasX = e.pageX - myCanvas.offsetLeft;
			canvasY = e.pageY - myCanvas.offsetTop;
			context.moveTo(canvasX, canvasY);
		})
		.mousemove(function(e){
			if(isDown !== false) {
				canvasX = e.pageX - myCanvas.offsetLeft;
				canvasY = e.pageY - myCanvas.offsetTop;
				context.lineTo(canvasX, canvasY);
				context.lineWidth = state.lineWidth;
				context.strokeStyle = state.color;
				context.stroke();
			}
		})
		.mouseup(function(e){
			isDown = false;
			context.closePath();
		});
	}
	
	// Touch Events Handlers
	draw = {
		started: false,
		start: function(evt) {

			context.beginPath();
			context.moveTo(
				evt.touches[0].pageX,
				evt.touches[0].pageY
			);

			this.started = true;

		},
		move: function(evt) {

			if (this.started) {
				context.lineTo(
					evt.touches[0].pageX,
					evt.touches[0].pageY
				);

				context.strokeStyle = state.color;
				context.lineWidth = state.lineWidth;
				context.stroke();
			}

		},
		end: function(evt) {
			this.started = false;
		}
	};
	
	// Touch Events
	myCanvas.addEventListener('touchstart', draw.start, false);
	myCanvas.addEventListener('touchend', draw.end, false);
	myCanvas.addEventListener('touchmove', draw.move, false);
	
	// Disable Page Move
	document.body.addEventListener('touchmove',function(evt){
		evt.preventDefault();
	},false);
};