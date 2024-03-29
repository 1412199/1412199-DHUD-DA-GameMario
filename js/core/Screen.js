function Screen(canvas,isWelcomeScreen){
	var timer;
	var width = canvas.width;
	var height = canvas.height;
	var context = canvas.getContext("2d");
	var mario;
	if(isWelcomeScreen)
	{
		mario = new AnimatedSprite({
			image: _images.mario,
			frameWidth: 29,
			frameHeight: 29,
			interval: 80,
			left: canvas.width/2-10,
			top: 80,
			width: 20,
			height: 20
		});
		mario.addSprite({
			name: "run_right",
			startFrame: 8,
			framesCount: 3,
			marginBottom: 14,
			marginLeft: 8,
			marginRight: 10
		});
	}
	this.items = [];
	// this method/event is actived in the end of draw() method
	this.afterDraw = null;
	this.beforeDraw = null;

	this.update = function(){
		if(mario)
			mario.update();

		for(var i=0;i<this.items.length;i++){
			this.items[i].update();
		}
	};
	this.draw = function(){

		context.fillStyle = "#555555";
		context.fillRect(0,0,width,height);

		if(this.beforeDraw)
			this.beforeDraw(context);

		// draw title
		if(isWelcomeScreen)
		{
			context.font = "32px Arial";
			context.fillStyle = "white";
			context.fillText(TITLE_TEXT,canvas.width/2,40);
		}
		if(mario)
			mario.draw(context);

		for(var i=0;i<this.items.length;i++){
			this.items[i].draw(context);
		}

		if(isWelcomeScreen)
		{
			context.font = "10px Arial";
			context.fillStyle = "white";
			context.fillText(INFO_TEXT,canvas.width/2,canvas.height-40);
		}

		if(this.afterDraw)
			this.afterDraw(context);
	};
	this.start = function(){
		this.stop();
		var self = this;
		// register events
		canvas.onclick = function(e){
			// raise the onclick event of each MenuItem when it is clicked
			var x = e.pageX - this.offsetLeft;
			var y = e.pageY - this.offsetTop;
			for(var i=0;i<self.items.length;i++){
				if(self.items[i].onclick && self.items[i].contain(x,y))
					self.items[i].onclick(x,y);
			}
		};
		canvas.onmousemove = function(e){
			// change the isMouseOver property of each MenuItem
			var x = e.pageX - this.offsetLeft;
			var y = e.pageY - this.offsetTop;
			canvas.style.cursor = 'default';
			for(var i=0;i<self.items.length;i++){
				self.items[i].isMouseOver = self.items[i].contain(x,y);
				// change the cursor type to hand
				if(self.items[i].isMouseOver)
					canvas.style.cursor = 'pointer';
			}
		};
		timer = setInterval(function(){
			self.update();
			self.draw();
		},1000/FPS);
	};
	this.stop = function(){
		if(timer)
			clearInterval(timer);
		timer = null;
		canvas.style.cursor = 'default';
		canvas.onmousemove = null;
		canvas.onclick = null;
	};
	this.addItem = function(item){
		this.items.push(item);
	};
}
