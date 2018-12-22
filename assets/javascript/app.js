  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDm9Jku2wrP8xwQ8-Ys8cEKff9VWIXFXco",
    authDomain: "trainscheduler-91a77.firebaseapp.com",
    databaseURL: "https://trainscheduler-91a77.firebaseio.com",
    projectId: "trainscheduler-91a77",
    storageBucket: "trainscheduler-91a77.appspot.com",
    messagingSenderId: "634435265553"
  };
  firebase.initializeApp(config);
var database = firebase.database();
var timeFormat = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

$("#add-train-button").on("click", function(event) {
    event.preventDefault();
    trainName = $("#train-name").val().trim();
    trainDestination = $("#train-destination").val().trim();
    trainTime = $("#train-time").val().trim();
    trainFrequency = $("#train-frequency").val().trim();
    

    if (!timeFormat.test(trainTime)) {
        alert("Please input the time in HH:MM format (military time)");
    }
    else if (!typeof trainFrequency === "number") {
        alert("Please enter the minutes in a numerical value");
    }
    else {
        database.ref().push({
            trainName: trainName,
            trainDestination: trainDestination,
            trainTime: trainTime,
            trainFrequency: trainFrequency
        });

        console.log(trainName, trainDestination, trainTime, trainFrequency);
    };
    
});

database.ref().on("child_added", function(snapshot) {
    var sv = snapshot.val();
    var newRow = $("<tr>")

    var nameTD = $("<td>").text(sv.trainName);
    var destinationTD = $("<td>").text(sv.trainDestination);
    var frequencyTD = $("<td>").text(sv.trainFrequency);

    // Convert time so a train doesn't start at the time of entry
    var firstTrainTimeConverted = moment(sv.trainTime, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    var timePassed = diffTime % sv.trainFrequency;
    var minutesTilTrain = sv.trainFrequency - timePassed;
    var nextTrain = moment().add(minutesTilTrain, "minutes");

    var nextArrivalTD = $("<td>").text(moment(nextTrain).format("LT"));
    var minutesAwayTD = $("<td>").text(minutesTilTrain);
    newRow.append(nameTD, destinationTD, frequencyTD, nextArrivalTD, minutesAwayTD);
    $("tbody").append(newRow);

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});