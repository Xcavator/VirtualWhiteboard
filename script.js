

window.onload = function() {
	let myCanvas = document.getElementById("myCanvas");
	let context = myCanvas.getContext("2d");
  
  let state = {
      'canvasX': 0,
      'canvasY': 0,
      'color':'#0000FF',
      'drawing': true,
      'erasing': false,
      'hasFocus': false,
      'interactive': false,
      'isDown': false,
      'eraserWidth': 25,
      'lineWidth': 6
  };

  // Fill Window Width and Height
  myCanvas.width = window.innerWidth;
	myCanvas.height = window.innerHeight;
	// Set Background Color
  context.fillStyle="#fff";
  context.fillRect(0,0,myCanvas.width,myCanvas.height);
  

  $('button.color').on('click', function(){
	// $('button.color').on('click', {this.style.background-color}, function(color){
	// console.log(state.color);
    // console.log(this.style.background-color);
    // state.color = this.style.background-color;
    // event.srcElement.
    console.log($(this).css('background-color'));
    state.color = $(this).css('background-color');
  }); 
  
  // click(function changeColor() {
  //   context.strokeStyle = this.style.color;
  // });

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