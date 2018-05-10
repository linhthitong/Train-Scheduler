
// 1. Initialize Firebase


/* <script src="https://www.gstatic.com/firebasejs/5.0.1/firebase.js"></script> */

  // Initialize Firebase


   var config = {
    apiKey: "AIzaSyBPSGtMlboulZ8YziUTG_y1FjHhU1P1Gf8",
    authDomain: "train-schedule-e5fdf.firebaseapp.com",
    databaseURL: "https://train-schedule-e5fdf.firebaseio.com",
    projectId: "train-schedule-e5fdf",
    storageBucket: "train-schedule-e5fdf.appspot.com",
    messagingSenderId: "545756763935"


};

firebase.initializeApp(config);
var database = firebase.database();

// 2. Button for adding Train Name
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrainTime = moment($("#firstTrainTime-input").val().trim(), "DD/MM/YY").format("X");
    var frequency = $("#frequency-input").val().trim();
  
// Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    role: trainDestination,
    start: firstTrainTime,
    frequency: frequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);


// Uploads train data to the database
database.ref().push(newTrain);

// Logs everything to console
console.log(newTrain.name);
console.log(newTrain.role);
console.log(newTrain.start);
console.log(newTrain.frequency);

// Alert
alert("Train successfully added");

// Clears all of the text-boxes
$("#train-name-input").val("");
$("#destination-input").val("");
$("#firstTrainTime-input").val("");
$("#frequency-input").val("");

});

