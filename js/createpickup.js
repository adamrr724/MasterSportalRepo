/***** Pickup Game Object gets info from user input *****/
function PickupGame(namePickupGame, sport, skill, age, recurring, notes, contact) {
  this.namePickupGame = namePickupGame;
  this.sport = sport;
  this.skill = skill;
  this.age = age;
  this.gameLocation = [];
  this.date = [];
  this.recurring = recurring;
  this.notes = notes;
  this.contact = contact;
}

/***** Pickup Game Location Object gets info from user input *****/
function GameLocation(street, city, state, zip) {
  this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip;
}

/***** Returns full address after error checking for cap errors in city *****/
GameLocation.prototype.fullAddress = function () {
  this.city = this.city.toLowerCase();
  this.city = this.city[0].toUpperCase() + this.city.slice(1);
  return this.street + ", " + this.city + ", " + this.state + " " + this.zip;
};

/***** Pickup Game Date Object gets info from user input *****/
function GameDate(gameDate, gameTime) {
  this.gameDate = gameDate;
  this.gameTime = gameTime;
}

/***** Returns full date *****/
GameDate.prototype.fullDate = function () {
  return "On " + this.gameDate + " at "+ this.gameTime;
};

var resetFields = function() {
  $("input.new-event-name").val("");
  $("input.website").val("");
  $("textarea.notes").val("");
  $("input.host-email").val("");
  $("input.address").val("");
  $("input.city").val("");
  $("input.state").val("");
  $("input.zip").val("");
}

/*** jQuery ***/
$(document).ready(function() {

  /*** Create a pickup game ***/
  $("form#create-pu-game").submit(function(event) {
    event.preventDefault();

    var name = $("input.new-event-name").val();
    var sport = $("select.sport-type").val();
    var skill = $("select.skill-level").val();
    var age = $("select.age").val();
    var recurring = $("select.recurring").val();
    var notes = $("textarea.notes").val();
    var contact = $("input.host-email").val();
    var newPickup = new PickupGame (name, sport, skill, age, recurring, notes, contact);

    /**** Get location section ****/
    var street = $("input.address").val();
    var city = $("input.city").val();
    var state = $("select.state").val();
    var zip = $("input.zip").val();
    var newLocation = new GameLocation (street, city, state, zip);
    newPickup.gameLocation.push(newLocation.fullAddress());

    /*** Get date-time ***/
    var date = $("input.date").val();
    var time = $("input.time").val();
    var newDate = new GameDate (date, time);
    newPickup.date.push(newDate.fullDate());

    $(".resultshow").show();
    $("ul#pickup-games").append("<li><span class='pugs'>" + newPickup.namePickupGame + "</span></li>");

    resetFields();

    $(".pugs").last().click(function() {
      $(".show-pickup-details").show();
      $("#event-name").text(newPickup.namePickupGame);
      $("#location").text(newPickup.gameLocation);
      $("#sport").text(newPickup.sport);
      $("#skills").text(newPickup.skill);
      $("#age").text(newPickup.age);
      $("#recurring").text(newPickup.recurring);
      $("#contact").text(newPickup.contact);
      $("#notes").text(newPickup.notes);
    });
  resetFields();
  });
});
