//https://teachablemachine.withgoogle.com/models/LAvpbW9P9/
prediction1="";
prediction2="";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("Camera");
Webcam.attach(camera);

function capture_image(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'">';
    })

}
console.log("ml5 version:",ml5.version)

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/LAvpbW9P9/model.json',modelloaded)

function modelloaded(){
    console.log("modelloaded")
}

function speak(){
    var synth=window.speechSynthesis;
    speech_data_1="The first prediction is " + prediction1;
    speech_data_2=" And the second prediction is " + prediction2;
    var utterThis= new SpeechSynthesisUtterance(speech_data_1 + speech_data_2);
    synth.speak(utterThis);

}

function check(){
    img=document.getElementById("capture_image")
    classifier.classify(img,gotResults);
}

function gotResults(error,results){
    if(error){
        console.log(error)
    }else{
        console.log(results)
        document.getElementById("result_emotion_name").innerHTML=results[0].label
        document.getElementById("result_emotion_name2").innerHTML=results[1].label
        prediction1=results[0].label
        prediction2=results[1].label
        speak();

        if(prediction1 == "Happy"){
            document.getElementById("update_emoji").innerHTML="&#128522;"
        }
        if(prediction1 == "Sad"){
            document.getElementById("update_emoji").innerHTML="&#128532;"
        }
        if(prediction1 == "Angry"){
            document.getElementById("update_emoji").innerHTML="&#128545;"
        }
        if(prediction2 == "Happy"){
            document.getElementById("update_emoji2").innerHTML="&#128522;"
        }
        if(prediction2 == "Sad"){
            document.getElementById("update_emoji2").innerHTML="&#128532;"
        }
        if(prediction2 == "Angry"){
            document.getElementById("update_emoji2").innerHTML="&#128545;"
        }
    }
}
