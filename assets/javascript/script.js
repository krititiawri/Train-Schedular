// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD6g_3V1H9FUbgAAVrn5691zXmV8VEuoM8",
    authDomain: "train-homework7.firebaseapp.com",
    databaseURL: "https://train-homework7.firebaseio.com",
    projectId: "train-homework7",
    storageBucket: "",
    messagingSenderId: "386316409458"
  };
  firebase.initializeApp(config);
  var dataRef = firebase.database();
  // Current date and time
 var currentTime =  moment().format('MMMM Do YYYY, h:mm:ss a');
   $("#jumbotron2").html(currentTime);
// Setting image
  var pic = $("<img>");
  pic.attr("src","assets/images/clock.png");
  pic.attr("class","image");
  $("#jumbotron2").prepend(pic);
// To set data to firebase on click of Sumit Button 
    $("#addbtn").on("click",function(){
function getData(){
  // Grab User Input
  	var trainName = $("#trainname").val().trim();
  	var destination = $("#Destination").val().trim();
  	var firstTrain = $("#start-input").val().trim();
  	var frequency = $("#Frequency").val().trim();
// Creates local "temporary" object for holding train data
var newTrain = {
	train:trainName,
	destination:destination,
	firstTrain:firstTrain,
	frequency:frequency
};
// Upload train data to Firebase
	dataRef.ref().push(newTrain);
// Clears all of the text-boxes
	$("#trainname").val("");
	$("#Destination").val("");
	$("#start-input").val("");
	$("#Frequency").val("");
}
getData();
 });
 
//display data
  	dataRef.ref().on("child_added",function(childSnapshot){
    	console.log(childSnapshot.val().train);
  		console.log(childSnapshot.val().destination);
  		console.log(childSnapshot.val().firstTrain);
  		console.log(childSnapshot.val().frequency);
// Stroring the value from child node to variables
        var train = childSnapshot.val().train;
        var destination = childSnapshot.val().destination;
        var firstTrain = childSnapshot.val().firstTrain;
        var frequency = childSnapshot.val().frequency;
// pushed back 1 year to make sure it comes before current time
        var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
// Current Time
    	var currentTime = moment();
 // Calculating Time Difeerence
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var remainder = diffTime%frequency;
        console.log(remainder);
// calculating How many minutes aay the train is
        var minuteRemmainig = frequency-remainder;
        console.log(minuteRemmainig);
        var nextTrain = moment().add(minuteRemmainig, "minutes");
        console.log(nextTrain);
        var arrivalTime = moment(nextTrain).format("hh:mm");
// Append DOM
  		$("#CurrentTrainSchedule > tbody").append("<tr><td>" + train + "</td><td>" + 
  		destination + "</td><td>" +
  		arrivalTime  + "</td><td>" +frequency + "</td><td>"+ minuteRemmainig +"</td>"+ 
  		"<td><button class='btn btn-primary' id='updatebtn' type='button'>Update</button></td>"
  		+"<td><button class='btn btn-danger' id='delbtn' type='button'>Delete</button></td></tr>");
  	});
//refreashes train data every minute
setInterval(function(){
    location.reload();
  }, 60000)

// Facing problem with updat and delete firebase data

// .....................................................................
// $("#CurrentTrainSchedule").on("click","#delbtn",function(){
// 	var trainKey = $(this);
// 	// dataRef.ref("child_added/"+trainKey).remove();
// 	//   $('.'+ trainKey).remove();


// });
// var editTrainKey = "";
//  $("#CurrentTrainSchedule").on("click","#updatebtn",function(){
//     var $this = $(this);
//     dataRef.ref("child_added/" + editTrainKey).once('value').then(function(childSnapshot) {
//     		var trainName = $("#trainname").val().trim();
//   	var destination = $("#Destination").val().trim();
//   	var firstTrain = $("#start-input").val().trim();
//   	var frequency = $("#Frequency").val().trim();
 

// // Creates local "temporary" object for holding train data

// var newTrain = {
// 	train:trainName,
// 	destination:destination,
// 	firstTrain:firstTrain,
// 	frequency:frequency
// };
//         $('#trainname').val(childSnapshot.val().train);
//         $('#Destination').val(childSnapshot.val().destination);
//         $('#start-input').val(moment.unix(childSnapshot.val().firstTrain).format('HH:mm'));
//         $('#Frequency').val(childSnapshot.val().frequency);
//         // $('#trainKey').val(childSnapshot.key);
// });
//     console.log($this);
//     var tds = $this.closest('tr').find('td').filter(function() {
//         return $(this).find('#updatebtn').length === 0;
//     });
//     if ($this.html() === 'Update') {
//  	 	var trainName = $("#trainname").val().trim();
//   	var destination = $("#Destination").val().trim();
//   	var firstTrain = $("#start-input").val().trim();
//   	var frequency = $("#Frequency").val().trim();
 

// // Creates local "temporary" object for holding train data

// var newTrain = {
// 	train:trainName,
// 	destination:destination,
// 	firstTrain:firstTrain,
// 	frequency:frequency
// };
// // Upload train data to Firebase
// 	dataRef.ref().push(newTrain);
//         $this.html('Save');
		
// 		console.log(newTrain);
//         tds.prop('contenteditable', true);
//     } else {
//         $this.html('Update');
//         tds.prop('contenteditable', false);
//     }
// });


