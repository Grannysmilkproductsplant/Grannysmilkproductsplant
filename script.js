let Travel = ['It is to accpet','the necessity of', 'the simple direct going into', 'a field of vision', 'as you would cross an empty beach','to look at the ocean']
document.getElementById("travel").onclick= function(){
    document.getElementById("travel").innerHTML=Travel[Math.floor(Math.random()* Travel.length)];
};

document.getElementById("travel").onmouseenter= function(){
    document.getElementById("travel").style.color = "blue";
    // document.getElementById("shan").style.backgroundImage="conic-gradient(black,blue, white)";
    document.getElementById("travel").style.opacity="0";
    document.getElementById("travel").style.display="none";
};
document.getElementById("travel").onmouseleave= function(){
    document.getElementById("travel").style.color = "black";
    document.getElementById("travel").style.backgroundImage = "none";
    document.getElementById("travel").style.opacity="1";
    document.getElementById("travel").style.display = "block";
}