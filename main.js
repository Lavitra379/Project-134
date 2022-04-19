img = "";
objects = [];
status = "";
alarm = ""
function preload(){
  alarm = loadSound('alarm.mp3');
}


function setup() {

  canvas = createCanvas(380, 380);
  canvas.center();
 
  video = createCapture(VIDEO);
  video.size(380, 380);
  video.hide()
  
  video.center();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Objects Detected ";
  document.getElementById("number_of_objects").innerHTML = "Babys detected: 1";
  
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }

  console.log(results);
  objects = results;
}


function draw() 
{
 
  image(video,0,0,380,380);
      if(status != "")
      {
      
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects; i++) {
          
          if(objects = "person")
          {
            document.getElementById("status").innerHTML = "Status : Person/Baby Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Person/Babys detected are : " + objects.length;
            alarm.stop();
          } else
          {
            document.getElementById("status").innerHTML = "Status : Person/Baby not Detected";
          
            alarm.play()

          }
          if(objects < 0)
          {
            document.getElementById("status").innerHTML = "Status : Person/Baby not Detected";
            alarm.play();
          }
          fill("#FF0000");
            text( canvas);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
      }
}