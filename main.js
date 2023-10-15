var cat = 0;
var dog = 0;
var hen = 0;
var rabbit = 0;
var background_noise = 0;

function startClassification() {
    navigator.mediaDevices.getUserMedia({
        audio: true
    });
    classifier = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/MAMtH_Zhl/model.json', modelReady);
}

function modelReady() {
    classifier.classify(gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        random_number_r = Math.floor(Math.random() * 255) + 1;
        random_number_g = Math.floor(Math.random() * 255) + 1;
        random_number_b = Math.floor(Math.random() * 255) + 1;

        console.log("Red " + random_number_r);
        console.log("Green " + random_number_g);
        console.log("Blue " + random_number_b);

        document.getElementById("detected").style.color = "rgb(" + random_number_r + "," + random_number_g + "," + random_number_b + ")";
        document.getElementById("detected").style.fontFamily = 'Roboto Condensed' + "," + 'Roboto Condensed' + "," + 'Roboto Condensed';

        document.getElementById("voice").innerHTML = "Detected Voice Is Of - " + results[0].label;
        document.getElementById("voice").style.color = "rgb(" + random_number_r + "," + random_number_g + "," + random_number_b + ")";
        document.getElementById("voice").style.fontFamily = 'Roboto Condensed' + "," + 'Roboto Condensed' + "," + 'Roboto Condensed';

        img = document.getElementById("image");

        if (results[0].label == "Barking") {
            img.src = "DOG.jpg";
            dog = dog + 1;
            document.getElementById("detected").innerHTML = "Detected Dog - " + dog;
        } else if (results[0].label == "Meowing") {
            img.src = "CAT.avif";
            cat = cat + 1;
            document.getElementById("detected").innerHTML = "Detected Cat - " + cat;
        } else if (results[0].label == "Clucking") {
            img.src = "HEN.png";
            hen = hen + 1;
            document.getElementById("detected").innerHTML = "Detected Hen - " + hen;
        } else if (results[0].label == "Squeaking") {
            img.src = "RABBIT.avif";
            rabbit = rabbit + 1;
            document.getElementById("detected").innerHTML = "Detected Rabbit - " + rabbit;
        } else {
            img.src = "BACKGROUND VOICE.gif";
            background_noise = background_noise + 1;
            document.getElementById("detected").innerHTML = "Detected Background Noise - " + background_noise;
        }
    }
}