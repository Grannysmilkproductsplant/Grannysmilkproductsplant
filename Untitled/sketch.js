
let video;
let faceMesh;
let myResults = [];
let onMeTime = 0;
let offMeTime = 0;
let rd, ld;
let cvn;
let currentOnTime;
let currentOffTime;
let paragraph;
let hasAlerted = false;
let smileHasAlerted = false;
let body;

const detectionOptions = {
  withLandmarks: true,
  withDescriptors: false,
};

function setup() {
  video = createCapture(VIDEO);
  cvn = createCanvas(windowWidth, windowHeight);
  cvn.position(0,0);
  cvn.style('z-index', '-1');
body = select('body');
  //load the model with webcam
  video.size(640, 480);
  video.hide();
  faceMesh = ml5.facemesh(video, modelLoaded);

  //set frame rate
  frameRate(30);
  let  currentTime=int(millis()/1000);

  paragraph = selectAll('p');
}


function modelLoaded() {
  console.log("model is ready");
  faceMesh.on("face", gotResults);
}

function startOnMeTimer(){
  onMeTime+=deltaTime;
  }

function startOffMeTimer(){
  offMeTime+=deltaTime;
  if(hasAlerted==true){
    offMeTime=0;
  }
  }

  function highlight(){
    // this.style('filter', '#blur(0px)');
    this.style('background-color', '#FF0000')
   }

function gotResults(results) {
    myResults = results;
    //see options
    //console.log("results", results);
   clear();
    // check if the model have the first result/exist
    if (myResults[0]) {
      //find alignedRect from console, and then find the box's position & size
       const points = myResults[0].scaledMesh;
    // for(let point of points){
    //   const size = 5;
    //   circle(point[0], point[1], size);
    // }
//trace mouth
    let md = dist(points[61][0], points[61][1], points[291][0], points[291][1]);
if(md>80 && smileHasAlerted == false && points[1][2]<-29){
  window.alert("When I see you smile, everything else fades away.");
  smileHasAlerted = true;
}else{
  smileHasAlerted = false;
}

    //head tracking
    textSize(32);
    rd = points[234][2]-points[1][2];
    ld = points[454][2]-points[1][2];

     if(rd>110 || ld>110){
body.style('opacity', '0');
     }else{
      body.style('opacity', '1');
     }
     fill(0);
     startOnMeTimer();
     currentOnTime=round(onMeTime/1000,1);
     //text(round(onMeTime/1000,1), 100, 200);

    paragraph = selectAll('p');
     for (let i = 0; i < paragraph.length; i++) {
       paragraph[i].mouseOut(function() {
        let blurAmount = 0;
         if (currentOnTime > 10) {
          blurAmount = map(currentOnTime, 10, 240, 0, 5);
          paragraph[i].style('filter', 'blur(' + blurAmount + 'px)');
         } 
       });
       paragraph[i].mouseOver(function() {
         paragraph[i].style('filter', 'blur(0px)');
       });
     }


  
//   if(currentOnTime>60){
//     paragraph=selectAll('p');
//     for (let i = 0; i < paragraph.length; i++) {
//      paragraph[i].style('filter', 'blur(2px)');
//     }
//  }

//  if(currentOnTime>90){
//   paragraph=selectAll('p');
//   for (let i = 0; i < paragraph.length; i++) {
//    paragraph[i].style('filter', 'blur(3px)');
//   }
// }

 if(currentOffTime > 5 && hasAlerted == false){
  window.alert("You may have only been gone for "+ currentOffTime +" seconds, but it felt like an eternity.")
  hasAlerted = true;
}
}
    else if(myResults[0] == null){
//       cvn.style('z-index', '2');
      startOffMeTimer();
      body.style('opacity', '0');
    fill(0);
    //text(round(offMeTime/1000,1), 100, 200);
    currentOffTime=round(offMeTime/1000,1);
    hasAlerted = false;
    }
}


// function draw(){
//     fill(0,0,255);
//     let x=100, y=100;
//     //circle(x,y,100);

//     let d = dist(mouseX,mouseY,x, y);
//     if(d<100 && mouseIsPressed){
//         fill(255,0,200);
//         circle(x,y,100);
//     }
// }
