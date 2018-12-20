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

$("#add-train-button").on("click", function(event) {
    event.preventDefault();
    trainName = $("#train-name").val().trim();
    trainDestination = $("#train-destination").val().trim();
    trainTime = $("#train-time").val().trim();
    trainFrequency = $("#train-frequency").val().trim();

    database.ref().push({
        trainName: trainName,
        trainDestination: trainDestination,
        trainTime: trainTime,
        trainFrequency: trainFrequency
    });

    console.log(trainName, trainDestination, trainTime, trainFrequency);
});