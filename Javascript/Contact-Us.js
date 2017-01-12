$(document).ready(function () {
    //Used to store the longnitude and latitude of the business and the user
    var lat1 = 53.224461;
    var lon1 = -0.544418;
    var lat2;
    var lon2;
    var TotalDistance;
    //Used to get the current location of the computer
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

    function showPosition(position) {
        lat2 = position.coords.latitude;
        lon2 = position.coords.longitude;
        TotalDistance = distance(lat1, lon1, lat2, lon2);
        //If it is less than 120miles/200km then this will run
        if (TotalDistance < 200) {
            $(".Deliver").text("Yes, you are under 120 miles away so we will be able to deliver your car to you")
        } else {
            $(".Deliver").text("Unfortuneatly no, you are over 120 miles away, however you can come and collect your car yourself")
        }
    }
    //Used to calculate the distance between the computer and lincoln motors
    function distance(lat1, lon1, lat2, lon2) {
        var p = 0.017453292519943295; // Math.PI / 180
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p) / 2 +
            c(lat1 * p) * c(lat2 * p) *
            (1 - c((lon2 - lon1) * p)) / 2;
        return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    }
})