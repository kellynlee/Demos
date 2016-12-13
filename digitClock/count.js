var window_width = 1024;
var window_height = 500;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARFINA_LEFT = 10;
var currentShowTime = 0;
const ballColor = ["#ED5564","#FFCE55","#49CFAE","#4FC0E8","#FB6E52","#A0D468","#AC92ED","#EC87C0"];
var ball = [];
window.onload = function(){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    canvas.width = window_width;
    canvas.height = window_height;
    currentShowTime = getCurrentTime();
    setInterval(
        function(){
        render(context);
        update();
    },50);
}
function getCurrentTime(){
    var d = new Date();
    var ret = d.getHours()*3600+ d.getMinutes()*60+ d.getSeconds();
    return ret;
}
function update(){
    var nextd = new Date();
    var nextShowTime = nextd.getHours()*3600+ nextd.getMinutes()*60+nextd.getSeconds();

    var nextHour = parseInt(nextShowTime/3600);
    var nextMinute = parseInt((nextShowTime-nextHour*3600)/60);
    var nextSecond = nextShowTime-nextHour*3600-nextMinute*60;

    var curhour = parseInt(currentShowTime/3600);
    var curminute = parseInt((currentShowTime-curhour*3600)/60);
    var cursecond = currentShowTime-curhour*3600-curminute*60;

    if (nextSecond != cursecond)
    {
        if(parseInt((curhour/10) != (nextHour/10)))
        {
            addBall(MARFINA_LEFT,MARGIN_TOP,parseInt(curhour/10));
        }
        if (parseInt(curhour%10) != parseInt(nextHour%10))
        {
            addBall(MARFINA_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curhour%10));
        }
        if (parseInt(curminute/10) != parseInt(nextMinute/10))
        {
            addBall(MARFINA_LEFT+40*(RADIUS+1),MARGIN_TOP,parseInt(curminute/10));
        }
        if (parseInt(curminute%10) != parseInt(nextMinute%10))
        {
            addBall(MARFINA_LEFT+55*(RADIUS+1),MARGIN_TOP,parseInt(curminute%10));
        }
        if (parseInt(cursecond/10) != parseInt(nextSecond/10))
        {
            addBall(MARFINA_LEFT+80*(RADIUS+1),MARGIN_TOP,parseInt(cursecond/10));
        }
        if (parseInt(cursecond%10) != parseInt(nextSecond%10))
        {
            addBall(MARFINA_LEFT+95*(RADIUS+1),MARGIN_TOP,parseInt(cursecond%10))
        }
        currentShowTime = nextShowTime;
    }
  updateBall();
}

function updateBall(){
    for (var i = 0;i<ball.length;i++)
    {
        ball[i].x += ball[i].vx;
        ball[i].y += ball[i].vy;
        ball[i].vy += ball[i].g;
        if (ball[i].y >= window_height-RADIUS)
        {
            ball[i].y = window_height-RADIUS;
            ball[i].vy = -ball[i].vy*0.6;
        }
    }
}

function addBall(x,y,num){
    for(var i = 0;i<digit[num].length;i++)
    {
        for (var j = 0;j<digit[num][i].length;j++)
        {
            if (digit[num][i][j] == 1)
            {
                var newBall = {
                    x:x+2*j*(RADIUS+1)+(RADIUS+1),
                    y:y+2*i*(RADIUS+1)+(RADIUS+1),
                    g:1+Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*5,
                    vy:-5,
                    color:ballColor[Math.floor(Math.random()*ballColor.length)]

                }
                ball.push(newBall);
            }
        }
    }
}
function render(cxt){
    cxt.clearRect(0,0,window_width,window_height);
    var curhour = parseInt(currentShowTime/3600);
    var curminute = parseInt((currentShowTime-curhour*3600)/60);
    var cursecond = currentShowTime-curhour*3600-curminute*60;
    renderDigit(MARFINA_LEFT,MARGIN_TOP,parseInt(curhour/10),cxt);
    renderDigit(MARFINA_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curhour%10),cxt);
    renderDigit(MARFINA_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);
    renderDigit(MARFINA_LEFT+40*(RADIUS+1),MARGIN_TOP,parseInt(curminute/10),cxt);
    renderDigit(MARFINA_LEFT+55*(RADIUS+1),MARGIN_TOP,parseInt(curminute%10),cxt);
    renderDigit(MARFINA_LEFT+70*(RADIUS+1),MARGIN_TOP,10,cxt);
    renderDigit(MARFINA_LEFT+80*(RADIUS+1),MARGIN_TOP,parseInt(cursecond/10),cxt);
    renderDigit(MARFINA_LEFT+95*(RADIUS+1),MARGIN_TOP,parseInt(cursecond%10),cxt);

    for (var i = 0;i<ball.length;i++)
    {
        cxt.fillStyle = ball[i].color;
        cxt.beginPath();
        cxt.arc(ball[i].x,ball[i].y,RADIUS,0,2*Math.PI);
        cxt.closePath();
        cxt.fill();
    }

}

function renderDigit(x,y,num,cxt){
    cxt.fillStyle = "rgb(0,102,153)";
    for (var i = 0;i<digit[num].length;i++)
    {
        for(var j = 0;j<digit[num][i].length;j++ )
        {
            if (digit[num][i][j] == 1)
            {
                cxt.beginPath();
                cxt.arc(x+2*j*(RADIUS+1)+(RADIUS+1),y+2*i*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
                cxt.closePath();

                cxt.fill();
            }
        }
    }
}