// object constructor - location, minimum customer per hour,
// maximum customers per hour, and average donuts per customer.
function DonutShop (locale, minimum, maximum, average) {
  this.locale = locale;
  this.minimum = minimum;
  this.maximum = maximum;
  this.average = average;
  this.donutDemand = function() {
    var perHourDemand;
    var total = 0;
    var numHours = hours.length - 1 //minus location cell
    var table = document.getElementsByTagName('table')[0]; //get 1st table
    var row = table.insertRow(1); //insert row starting at index 1
    //insert location to row at cell index 0
    row.insertCell(0).innerHTML = this.locale;

    //loop through each hour from 7am - 6pm, 12 hours
    for(var i = 1; i < numHours ; i++) {

      // donut demand per hour
      perHourDemand = (Math.floor(Math.random() * (this.maximum - this.minimum)) + this.minimum) * this.average;
      total += perHourDemand; //hourly total

      // insert perHourDemand to row starting at cell index 1
      row.insertCell(i).innerHTML = perHourDemand.toFixed(0);
    }
    // insert hourly total to row at last cell index number.
    row.insertCell(numHours).innerHTML = total.toFixed(0);
  };
}

// hours of operation in an array - table header data
var hours = ["Location", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "Total"];

// create table with location, hours of operation, and Total headings
var donutTable = document.createElement('table');
var row = document.createElement('tr');
hours.forEach(function(hour) {
  var th = document.createElement('th');
  th.textContent = hour;
  row.appendChild(th);
  donutTable.appendChild(row);
});
// insert table to html body
document.body.appendChild(donutTable);

//instantiate new DonutShop location objects
var downtownDS = new DonutShop("Downtown", 8, 43, 4.50);
var capitolHillDS = new DonutShop("Capitol Hill", 4, 37, 2.00);
var southLakeUnionDS = new DonutShop("South Lake Union", 9, 23, 6.33);
var wedgewoodDS = new DonutShop("Wedgewood", 2, 28, 1.25);
var ballardDS = new DonutShop("Ballard", 8, 58, 3.75);

// array to hold DonutShop objects
var donutShopArr = [];
donutShopArr.push(ballardDS);
donutShopArr.push(wedgewoodDS);
donutShopArr.push(southLakeUnionDS);
donutShopArr.push(capitolHillDS);
donutShopArr.push(downtownDS);

// call DonutShop.donutDemand method for each object in array
function renderDonutShopArr(){
  for(var i = 0; i < donutShopArr.length; i++) {
    donutShopArr[i].donutDemand();
  }
}
renderDonutShopArr();

// delete table rows
function removeTableRow(){
  var arrLength = donutShopArr.length + 1;
  for(var i = 1; i < arrLength; i++){
    var el = document.getElementsByTagName('table')[0];
    el.deleteRow(1);
  }
}

// populate drop-down list with location
function selectLocation(){
var select = document.getElementById("selectLocation");
  for(var i = 0; i < donutShopArr.length; i++){
    var opt = donutShopArr[i].locale;
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
  }
}
selectLocation();

// remove all locations from drop-down list
function removeAllLoc(){
  var arrLength = donutShopArr.length + 1;
  for(var i = 1; i < arrLength; i++){
    var el = document.getElementById("selectLocation");
    el.remove(1);
  }
}

// this function handles submission of new donut shop location form
var handleLocationSubmit = function(event){
  event.preventDefault();
  var place = event.target.place.value;
  var minCust = event.target.minCust.value;
  var maxCust = event.target.maxCust.value;
  var averagePur = event.target.averagePur.value;
  var updatePlace = event.target.locations.value;

// clear form after add/update location
function clearForm(){
  event.target.place.value = null;
  event.target.minCust.value = null;
  event.target.maxCust.value = null;
  event.target.averagePur.value = null;
  event.target.locations.value = "blank";
}

  if((!place && updatePlace === "blank") || (!minCust || isNaN(minCust)) || (!maxCust || isNaN(maxCust)) || (!averagePur || isNaN(averagePur))) {
    alert('Fields cannot be empty and Minimum, Maximum, and Average fields must be a number!');
    return;
  }
  // match location name for updating
  if (updatePlace !== "blank"){
    for(i = 0; i < donutShopArr.length; i++){
      if(updatePlace === donutShopArr[i].locale){
        donutShopArr[i].minimum = minCust;
        donutShopArr[i].maximum = maxCust;
        donutShopArr[i].average = averagePur;
        removeTableRow(); //remove table rows
        renderDonutShopArr(); //render rows and data
        clearForm(); //clear form
      }
    }
  }
  else {
    // add new location
    var newLocation = new DonutShop(place, minCust, maxCust, averagePur);
    newLocation.donutDemand(); //render new location row and data
    removeAllLoc(); //remove all location from drop-down list
    donutShopArr.push(newLocation); //push new location object into array
    selectLocation(); //populate drop-down list with locations
    clearForm(); //clear form
  }
};

// Form and button event listener
var locationForm = document.getElementById('location-form');
locationForm.addEventListener('submit', handleLocationSubmit);







