(()=>{"use strict";class t{constructor(t,i,s,h,e,l){this.radius=t,this.color=i,this.x=s,this.y=h,this.dx=e,this.dy=l}render(t){t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI),t.fillStyle=this.color,t.fill(),t.closePath()}move(){this.x+=this.dx,this.y+=this.dy}}class i{constructor(t,i,s,h,e,l){this.x=t,this.y=i,this.width=s,this.height=h,this.color=e,this.status=l}render(t){1===this.status&&(t.beginPath(),t.rect(this.x,this.y,this.width,this.height),t.fillStyle=this.color,t.fill(),t.closePath())}}class s{constructor(t,i,s,h,e){this.x=t,this.y=i,this.color=s,this.width=h,this.height=e}draw(t){t.beginPath(),t.rect(this.x,this.y,this.width,this.height),t.fillStyle=this.color,t.fill(),t.closePath()}}class h{constructor(t){this.color=t}draw(t,i,s){t.fillStyle=this.color,t.fillRect(0,0,i,s)}}class e{constructor(t,i,s,h,e){this.x=t,this.y=i,this.color=s,this.score=h,this.font=e}render(t){t.font=this.font,t.fillStyle=this.color,t.fillText(`Score: ${this.score}`,this.x,this.y)}update(t){this.score+=t}reset(){this.score=0}}class l{constructor(t,i,s,h,e){this.x=t,this.y=i,this.color=s,this.lives=h,this.font=e,this.initialLives=h}render(t){t.font=this.font,t.fillStyle=this.color,t.fillText(`Lives: ${this.lives}`,this.x,this.y)}loseLife(){this.lives=Math.max(0,this.lives-1)}reset(){this.lives=this.initialLives}}const r=document.getElementById("myCanvas"),d=r.getContext("2d"),a=new class{constructor(i,r,d){this.ctx=i,this.width=r,this.height=d,this.gameOver=!1,this.gameWon=!1,this.background=new h("#00008B"),this.ball=new t(10,"#39FF14",r/2,d-30,2,-2),this.paddle=new s((r-75)/2,d-10,"#39FF14",75,10),this.score=new e(8,20,"#39FF14",0,"16px Arial"),this.lives=new l(r-65,20,"#39FF14",3,"16px Arial"),this.bricks=[],this.rightPressed=!1,this.leftPressed=!1,this.initBricks(),this.bindEventHandlers()}initBricks(){const t=["#E53935","#1E88E5","#43A047","#FDD835","#FB8C00"];for(let s=0;s<6;s+=1){this.bricks[s]=[];for(let h=0;h<5;h+=1){const e=85*s+30,l=30*h+30,r=t[h%t.length];this.bricks[s][h]=new i(e,l,75,20,r,1)}}}bindEventHandlers(){document.addEventListener("keydown",(t=>this.keyDownHandler(t)),!1),document.addEventListener("keyup",(t=>this.keyUpHandler(t)),!1),document.addEventListener("mousemove",(t=>this.mouseMoveHandler(t)),!1)}draw(){if(this.ctx.clearRect(0,0,this.width,this.height),this.background.draw(this.ctx,this.width,this.height),this.drawBricks(),this.ball.render(this.ctx),this.paddle.draw(this.ctx),this.score.render(this.ctx),this.lives.render(this.ctx),this.gameOver)this.drawGameOver();else if(this.gameWon)this.drawGameWon();else{if(this.collisionDetection(),this.handlePaddleMovement(),this.ball.move(),(this.ball.x+this.ball.dx>this.width-this.ball.radius||this.ball.x+this.ball.dx<this.ball.radius)&&(this.ball.dx=-this.ball.dx),this.ball.y+this.ball.dy<this.ball.radius)this.ball.dy=-this.ball.dy;else if(this.ball.y+this.ball.dy>this.height-this.ball.radius)if(this.ball.x>this.paddle.x&&this.ball.x<this.paddle.x+this.paddle.width)this.ball.dy=-this.ball.dy;else{if(this.lives.loseLife(),this.lives.lives<=0)return this.gameOver=!0,void this.drawGameOver();this.resetBallAndPaddle()}requestAnimationFrame((()=>this.draw()))}}drawBricks(){for(let t=0;t<this.bricks.length;t+=1)for(let i=0;i<this.bricks[t].length;i+=1)1===this.bricks[t][i].status&&this.bricks[t][i].render(this.ctx)}collisionDetection(){let t=!0;for(let i=0;i<this.bricks.length;i+=1)for(let s=0;s<this.bricks[i].length;s+=1){const h=this.bricks[i][s];1===h.status&&(t=!1,this.ball.x>h.x&&this.ball.x<h.x+h.width&&this.ball.y>h.y&&this.ball.y<h.y+h.height&&(this.ball.dy=-this.ball.dy,h.status=0,this.score.update(1)))}t&&(this.gameWon=!0)}drawGameOver(){this.ctx.fillStyle="rgba(0, 0, 0, 0.7)",this.ctx.fillRect(0,0,this.width,this.height),this.ctx.font="36px Arial",this.ctx.fillStyle="#39FF14",this.ctx.textAlign="center",this.ctx.fillText("GAME OVER",this.width/2,this.height/2),this.ctx.font="24px Arial",this.ctx.fillText("Click to restart",this.width/2,this.height/2+50),this.ctx.canvas.addEventListener("click",(()=>document.location.reload()),{once:!0})}drawGameWon(){this.ctx.fillStyle="rgba(0, 0, 0, 0.7)",this.ctx.fillRect(0,0,this.width,this.height),this.ctx.font="36px Arial",this.ctx.fillStyle="#39FF14",this.ctx.textAlign="center",this.ctx.fillText("YOU WIN!",this.width/2,this.height/2),this.ctx.font="24px Arial",this.ctx.fillText("CLICK TO PLAY AGAIN",this.width/2,this.height/2+50),this.ctx.canvas.addEventListener("click",(()=>document.location.reload()),{once:!0})}keyDownHandler(t){"Right"===t.key||"ArrowRight"===t.key?this.rightPressed=!0:"Left"!==t.key&&"ArrowLeft"!==t.key||(this.leftPressed=!0)}keyUpHandler(t){"Right"===t.key||"ArrowRight"===t.key?this.rightPressed=!1:"Left"!==t.key&&"ArrowLeft"!==t.key||(this.leftPressed=!1)}mouseMoveHandler(t){const i=t.clientX-this.ctx.canvas.offsetLeft;i>0&&i<this.width&&(this.paddle.x=i-this.paddle.width/2)}handlePaddleMovement(){this.rightPressed&&this.paddle.x<this.width-this.paddle.width?this.paddle.x+=7:this.leftPressed&&this.paddle.x>0&&(this.paddle.x-=7)}resetBallAndPaddle(){this.ball.x=this.width/2,this.ball.y=this.height-30,this.ball.dx=2,this.ball.dy=-2,this.paddle.x=(this.width-this.paddle.width)/2}}(d,r.width,r.height);a.draw()})();