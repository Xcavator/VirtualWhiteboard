
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
      'shape': false,
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
    state.shape = false;
  });

  // Handle Eraser button click
  $('#btnBrush').on('click', function(){
    state.shape = false;
  });  
  
  // Handle Eraser button click
  $('#btnSquare').on('click', function(){
    state.shape = true;
  });

  // Handle Eraser button click
  $('#btnSave').on('click', function(){
    let image = myCanvas.toDataURL('images/png');  
   
  
    // create temporary link  
    let tmpLink = document.createElement( 'a' );  
    tmpLink.download = 'MyImage.png'; 
    tmpLink.href = image;  
   console.log(tmpLink.download);
    // temporarily add link to body and initiate the download  
    document.body.appendChild(tmpLink);  
    tmpLink.click();  
    document.body.removeChild(tmpLink);  
  });

  // Handle grid button click
  $('#btnGrid').on('click', function(){
    if(state.grid){
      state.grid = false;
      $("#myCanvas").css('background-image', "");
    } else{

      $("#myCanvas").css('background-image', "url('images/grid.png')");
      $("#myCanvas").css('background-repeat', 'repeat');

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
      if(state.shape === true){
        // canvasX = e.clientX;
        // canvasY = e.clientY;
        canvasX = e.pageX - myCanvas.offsetLeft;
        canvasY = e.pageY - myCanvas.offsetTop;
      } else{
        canvasX = e.pageX - myCanvas.offsetLeft;
        canvasY = e.pageY - myCanvas.offsetTop;
        context.moveTo(canvasX, canvasY);

      }
		})
		.mousemove(function(e){
			if(isDown !== false && state.shape !== true) {
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
      if(state.shape === true){
        let stX = canvasX;
        let stY = canvasY;
        // canvasX = e.pageX;
        // canvasY = e.pageY;
				canvasX = e.pageX - myCanvas.offsetLeft;
				canvasY = e.pageY - myCanvas.offsetTop;
				context.lineWidth = state.lineWidth;
				context.strokeStyle = state.color;
        context.rect(stX, stY, canvasX -stX, canvasY - stY);
				context.stroke();
      }
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