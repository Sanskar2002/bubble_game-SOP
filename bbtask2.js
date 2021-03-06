function gam(){
    
var canvas = document.createElement('canvas');
    
    canvas.id="canvas";
    const W = canvas.width=window.innerWidth;
const H = canvas.height=window.innerHeight;
  
    canvas.style.zIndex=8;
    var body=document.getElementsByTagName("body")[0];
   // var div=document.getElementById("div");
   // var input=document.getElementById("btn");
    body.removeChild(document.getElementsByTagName("div")[0]);
    body.removeChild(document.getElementsByTagName("input")[0]);
    body.appendChild(canvas);
var ctx = canvas.getContext('2d');

    ctx.clearRect(0,0,W,H);
var c=0;
var score=0;
var t1=2;

var numbubbles = 5;
var vel=1;
var tm=0;

function Bubble(x,y,dx,dy,r,uid) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.r = r;
    this.uid=uid;
	this.color = 'hsl('+(Math.random()*360)+',90%,40%)';
	
	this.draw = function() {
        var g=ctx.createRadialGradient(this.x-this.r/4,this.y-this.r/4,this.r/4,this.x,this.y,this.r);
        g.addColorStop(0,"white");
        g.addColorStop(1,this.color);
		ctx.fillStyle = g;
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
		ctx.fill();
        if(t4>0){
    ctx.font="80px cursive";
    ctx.fillStyle="red"
    //ctx.fillText("Score: "+score,20,50);
    ctx.fillText(10-t4,W/2,H/2);  
         }
	}
	
	this.update = function() {
       
        
		this.x += this.dx;
		this.y += this.dy;
        if(this.dx>0&&this.dx<1){
            this.dx+=1;
        }
        if(this.dy>0&&this.dy<1){
            this.dy+=1;
        }
        if(this.dx<0&&this.dx>1){
            this.dx-=1;
        }
        if(this.dy<0&&this.dy>1){
            this.dy-=1;
        }
		//this.dx =-(this.dx);
		//this.dy =-(this.dy);
		if(this.x > W - this.r) {
			this.x = W - this.r;
			this.dx *= -1;
		} else if(this.x < this.r) {
			this.x = this.r;
			this.dx *= -1;
		}
		if(this.y > H - this.r) {
			this.y = H - this.r;
			this.dy *= -1;
		} else if(this.y < this.r) {
			this.y = this.r + 1;
			this.dy *= -1;
		}
		this.draw();
	}
}


var bubbles = [];
    var vel=5;
    var vel_inc=1;

function reset() {
    c=0.1;
    ctx.fillStyle="black";
	ctx.fillRect(0,0,W,H);
	bubbles = [];
	for(var i=0 ; i < numbubbles ; i++) {
		var x = Math.random()*W;
		var y = Math.random()*H;
		var r = Math.random()*60 + 30;
        var d= Math.random()*100000000000+10;
        c+=(Math.PI)*r*r;
		bubbles.push(new Bubble(x,y, Math.random()*vel+vel_inc, Math.random()*vel+vel_inc,r,d));
	}
}
reset();
var pause=0;
var col="orangered";

start();
     var ch=0;
function animate() {
    if(col=="orangered"){
     if(c>=0.75*W*H){
         console.log("gameover");
         if(ch==0){
               game_over();
             ch++;
         }
       
         if(t4>0){
    ctx.font="80px cursive";
    ctx.fillStyle="red"
    //ctx.fillText("Score: "+score,20,50);
    ctx.fillText(10-t4,W/2,H/2);  
         }
         if(flag==1){
            
            bubbles.splice(0,bubbles.length);
            numbubbles=0;
            stop(); 
             t4=0;
        ctx.font="100px cursive";
    ctx.fillStyle='hsl('+(Math.random()*360)+',90%,40%)';
    ctx.fillText("GAME OVER",W/2,H/2);
         
         }
           
         ctx.fillStyle="black";
	ctx.fillRect(0,0,W,H);
    ctx.font="20px cursive";
    ctx.fillStyle="black";
    ctx.fillText("Score: "+score,20,50);
    ctx.fillText("time: "+tm,20,80);
  
        
        }
    else{
        
        
         while(bubbles.length<numbubbles){
             
      var x = Math.random()*W;
		var y = Math.random()*H;
		var r = Math.random()*60 + 30;
        var d= Math.random()*100000000000+10;
       c+=r*Math.PI*r;
		bubbles.push(new Bubble(x,y, Math.random()*vel+vel_inc , Math.random()*vel+vel_inc,r,d));
	}
   if(numbubbles==0){
       numbubbles++;
   }
   
    }
    
    
     ctx.fillStyle="black";
	ctx.fillRect(0,0,W,H);
    ctx.font="20px cursive";
    ctx.fillStyle="white"
    ctx.fillText("Score: "+score,20,50);
    ctx.fillText("time: "+tm,20,80);
     ctx.fillStyle=col;
        ctx.fillRect(20,H-80,80,30);
    ctx.strokeStyle="skyblue";
    ctx.lineWidth="15px";
    
    ctx.strokeRect(20,H-80,80,30);
     ctx.font="20px cursive";
    ctx.fillStyle="white"
    ctx.fillText(" PAUSE ",20,H-60);
    if(flag==1){
        ctx.font="100px cursive";
    ctx.fillStyle='hsl('+(Math.random()*360)+',90%,40%)';
         ctx.fillText("GAME OVER",W/4,H/2);
        
       
    }
    if(t4>0){
    ctx.font="80px cursive";
    ctx.fillStyle="red"
    //ctx.fillText("Score: "+score,20,50);
    ctx.fillText(10-t4,W/2,H/2);  
         }
  
	
	for(var bubble of bubbles) {
		bubble.update();
		for(var bubble2 of bubbles) { 
			if(bubble !== bubble2) {
				var collision = checkCollision(bubble, bubble2);
				if(collision[0]) {
					adjustPositions(bubble,bubble2,collision[1]);
					resolveCollision(bubble,bubble2);
				}
			}
		} 
	}
	requestAnimationFrame(animate);
}
}

animate();

function checkCollision(bubbleA, bubbleB) {
	var rSum = bubbleA.r + bubbleB.r;
	var dx = bubbleB.x - bubbleA.x;
	var dy = bubbleB.y - bubbleA.y;
	return [rSum*rSum > dx*dx + dy*dy,rSum-Math.sqrt(dx*dx+dy*dy)];
}

function resolveCollision(bubbleA, bubbleB) {
	var relVel = [bubbleB.dx - bubbleA.dx,bubbleB.dy - bubbleA.dy];
	var norm = [bubbleB.x - bubbleA.x, bubbleB.y - bubbleA.y];
	var mag = Math.sqrt(norm[0]*norm[0] + norm[1]*norm[1]);
	norm = [norm[0]/mag,norm[1]/mag];
	
	var velAlongNorm = relVel[0]*norm[0] + relVel[1]*norm[1];
	if(velAlongNorm > 0)
		return;
	
	var bounce = 0.7;
	var j = -(1 + bounce) * velAlongNorm;
	j /= 1/bubbleA.r + 1/bubbleB.r;
	
	var impulse = [j*norm[0],j*norm[1]];
	bubbleA.dx -= 1/bubbleA.r * impulse[0];
	bubbleA.dy -= 1/bubbleA.r * impulse[1];
	bubbleB.dx += 1/bubbleB.r * impulse[0];
	bubbleB.dy += 1/bubbleB.r * impulse[1];
}

function adjustPositions(bubbleA,bubbleB,depth) { 
	const percent = 0.2;
	const slop = 0.01;
	var correction = (Math.max(depth - slop, 0) / (1/bubbleA.r + 1/bubbleB.r)) * percent;
	
	var norm = [bubbleB.x - bubbleA.x, bubbleB.y - bubbleA.y];
	var mag = Math.sqrt(norm[0]*norm[0] + norm[1]*norm[1]);
	norm = [norm[0]/mag,norm[1]/mag];
	correction = [correction*norm[0],correction*norm[1]];
	bubbleA.x -= 1/bubbleA.r * correction[0];
	bubbleA.y -= 1/bubbleA.r * correction[1];
	bubbleB.x += 1/bubbleB.r * correction[0];
	bubbleB.y += 1/bubbleB.r * correction[1];
}
var mouseX;
    var mouseY;
  //  var t3;

canvas.addEventListener("click", mouseOver, false);
function mouseOver(e) {
    var mouseX = e.x;
    var mouseY = e.y;

    for (var i = 0; i < bubbles.length; i++) {
        if (mouseX >= (bubbles[i].x-bubbles[i].r) && mouseX <= (bubbles[i].x + bubbles[i].r) &&
            mouseY >= (bubbles[i].y-bubbles[i].r) && mouseY <= (bubbles[i].y + bubbles[i].r)) {
           // var touchedBubble = bubbles.findIndex(bubbles => bubbles.uid === this.uid);
            
            //t3=setInterval(player_death_effect(bubbles[i].x,bubbles[i].y,bubbles[i].color),0.00001);
           
            c-=Math.PI*bubbles[i].r*bubbles[i].r;
            score+=1;
            numbubbles--;
            
        bubbles.splice(i, 1);
           
        }
        
    }  
    if((mouseX>=20&&mouseX<=100)&&(mouseY>=H-80&&mouseY<=H-50)){
        if(col=="orangered"){
           col="red"; 
            ctx.fillStyle=col;
        ctx.fillRect(20,H-80,80,30);
    ctx.strokeStyle="skyblue";
    ctx.lineWidth="15px";
    
    ctx.strokeRect(20,H-80,80,30);
     ctx.font="20px cursive";
    ctx.fillStyle="white"
    ctx.fillText(" PAUSE ",20,H-60);
            window.cancelAnimationFrame(animate);
            stop();
           
        }
        else{
            col="orangered";
            animate();
            start();
        }
        
    }
    
    return mouseX, mouseY;
}
var timer;
function start(){
    timer=setInterval(tm_,1000);
}
function tm_(){
    tm++;
    if(tm%2==0||numbubbles==1){
        numbubbles+=t1;
    }
    if(tm%10==0){
        t1++;
        //vel+=1;
        //vel_inc+=1;
        for(i=0;i<bubbles.length;i++){
            bubbles[i].dx+=1;
            bubbles[i].dy+=1;
        }
    }
}
function stop(){
    clearInterval(timer);
    timer=null;
}

/*function player_death_effect(x,y,color){
   // window.console.log("a");
        var spedx=2;
       var spedy=2;
      var w=20;
       var h=20;
    while(w>0&&h>0){
      //  window.console.log("a");
            if(x+w>window.W){
                window.console.log("a");
                if(spedx<0){
                    spedx=spedx-(spedx*2);
                }else{
                   spedx=spedx*-1;
                }
                if(spedy<0){
                   spedy=spedy-(spedy*2);
                }else{
                    spedy=spedy*-1;
                } 
            }
            if(y<=0){
                if(spedx<0){
                    spedx=spedx-(spedx*2);
                }else{
                    spedx=spedx*-1;
                }
                if(spedy<0){
                    spedy=spedy-(spedy*2);
                }else{
                   spedy=spedy*-1;
                } 
            }
            if(y+h>=window.H){
                if(spedx<0){
                    spedx=spedx-(spedx*2);
                }else{
                    spedx=spedx*-1;
                }
                if(spedy<0){
                    spedy=spedy-(spedy*2);
                }else{
                    spedy=spedy*-1;
                } 
            }
            //we decrement the hieght and width of particles to make a fading effect :
            w-=0.03;
            h-=0.03;
            //draw the particle in in canvas
           ctx.fillStyle="white";
           ctx.fillRect(x+=spedx,y+=spedy,w,h);
        
    }
    if(w<=0||h<=0){
       clearInterval(t3); 
    }
    
        
    }
    */
    var t_over,t4=0,flag=0;
    function game_over(){
        t_over=setInterval(inc_,1000);
    }
    function inc_(){
        window.console.log(t4);
        if(c>=0.75*W*H){
            t4+=1;
            if(t4>10){
                flag=1;
                clearInterval(t_over);
                t4=0;
            }
        }
        else{
            t4=0;
            clearInterval(t_over);
            ch=0;
            
        }
    }
}