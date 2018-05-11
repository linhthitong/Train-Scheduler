
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
    // var firstTrainTime = moment($("#firstTrainTime-input").val().trim(), "DD/MM/YY").format("X");
    var firstTrainTime = $("#firstTrainTime-input").val().trim();      
    console.log(firstTrainTime);
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
// database.ref().push(newTrain);

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

database.ref().on("child_added", function(childSnapshot, prevChildKey){
  var trainObject = childSnapshot.val();

  console.log(trainObject);
  
    var tName = trainObject.name;
    var tFrequency = trainObject.frequency;
    var tDestination = trainObject.role;
    var firstTime = trainObject.start;
    var nextTrain;
    var tMinutesTillTrain;
    var tNextTrain;

  

    
    
    var timeArray = firstTime.split(":");
    var trainTime = moment().hours(timeArray[0]).minutes(timeArray[1]);

    var maxMoment = moment.max(moment(), trainTime);

    if(maxMoment === trainTime) {
      tNextTrain = trainTime.format("hh:mm A");
      tMinutesTillTrain = trainTime.diff(moment(), "minutes");
    }
    else{
      var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
      console.log("first time converted" + firstTimeConverted);
  
      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);
  
      // Time apart (remainder)
      var tRemainder = diffTime % tFrequency;
      console.log(tRemainder);
  
      // Minute Until Train
       tMinutesTillTrain = tFrequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  
      // Next Train
       nextTrain = moment().add(tMinutesTillTrain, "minutes");
  
       tNextTrain =  moment(nextTrain).format("hh:mm");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    }



   


    console.log("*******************************************");    
    console.log(tName);
    console.log(tDestination);
    console.log(tFrequency); 
    console.log(moment(nextTrain).format("hh:mm"));   
    console.log(tMinutesTillTrain);
    console.log("************************************************")


    $("#train-table > tbody").append("<tr><td>" + tName + "</td>" +
                                      "<td>" + tDestination + "</td>" +
                                    "<td>" + tFrequency + "</td>" +
                                    "<td>" + tNextTrain + "</td>" +
                                    "<td>" + tMinutesTillTrain + "</td></tr>");
    

})
