// Image to ASCII reference from 
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/166-ascii-image.html
// https://youtu.be/55iwMYv8tGI


let sourceText;
let poem;
let img;
let startIndex = 0;
let cnv;

function preload() {
  img = loadImage("img.jpg");
  sourceText = loadStrings("bedroom.txt");
}

function setup() {
  cnv = createCanvas(1366, 768); 
  let cnvX = (windowWidth - width)/2;
  let cnvY = (windowHeight - height)/2;
  cnv.position(cnvX, cnvY);
  poem = sourceText.join(' ');
  textFont("Courier-Bold");
}

function draw() {
  background(0);
  frameRate(10);
  
  let charIndex = startIndex;
  let w = width / img.width;
  let h = height / img.height;
  img.loadPixels();
    for (let j = 0; j < img.height; j++) {
  for (let i = 0; i < img.width; i++) {
      const pixelIndex = (i + j * img.width) * 4;
      const r = img.pixels[pixelIndex + 0];
      const g = img.pixels[pixelIndex + 1];
      const b = img.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      
      noStroke();
      fill(avg);      
      textSize(w*1.2);
      textAlign(CENTER, CENTER);
      
      text(poem.charAt(charIndex % poem.length), i * w + w * 0.5, j * h + h * 0.5);
      charIndex++;
    }
  }
  
  startIndex++;
  
  
}