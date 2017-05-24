function PiranhaPlant(map,left,top){
	// call the super-constructor
	Character.call(this,map,{
		left: left,
		top: top,			
		speed: 0,		
		spriteData: {
			image: _images.enemies,
			frameWidth: 29,
			frameHeight: 29,
			interval: 200,			
		}
	});
	this.addSprite({
		startFrame: 28,
		framesCount: 2,
		marginTop: 4,
		marginBottom: 13,
		marginLeft: 12,
		marginRight: 12
		
	});
	
	
	this.maxheight = this.height;
	this.isRaising = false;
	
	this.sleepDelay = 5000;	// sleep 5 seconds
	this.lastSleep = 0;		
	
	this.awakeDelay = 2000;	// keep awake for 2 seconds
	this.lastAwake = 0;	
	this.canDamage = true; // if it's sleeping, it won't be able to damage player
}

PiranhaPlant.prototype = new Character();

PiranhaPlant.prototype.update = function(){

	AnimatedSprite.prototype.update.call(this);
	
	var newTick = (new Date()).getTime();
	
	if(newTick-this.lastSleep<this.sleepDelay || 
		newTick-this.lastAwake<this.awakeDelay)
		return;
		
	this.canDamage = true;
	if(this.isRaising)
	{
		this.top--;
		this.height++;
		if(this.height==this.maxheight)
		{
			this.isRaising = false;
			this.lastAwake = newTick;
		}
	}
	else
	{
		this.top++;
		this.height--;	
		if(this.height==0)
		{
			this.lastSleep = newTick;
			this.isRaising = true;
			this.canDamage = false;
		}
	}
	
	this.currentSprite.marginBottom = this.frameHeight-this.height;
	
}
