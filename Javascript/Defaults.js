$(document).ready(function () {
    var navOpen = 0 //Used to tell is the sidebar is open or not
    //When this button is pressed it animate the elements to move out and display them
    $('#Cart-Pop-Out-Button').click(function () {
        //If the side bar isn't open then this will run
        if (navOpen == 0) {
            openNav();
        } else if (navOpen == 180) {
            closeNav();
        }
        //Rotates the arrow
        $('#Rotating-Arrow').css({
            "-webkit-transform": "rotate(" +navOpen +"deg)",
            "-moz-transform": "rotate(" +navOpen +"deg)",
            "transform": "rotate(" +navOpen +"deg)" /* For modern browsers(CSS3)  */
        });
    });
    varnavOpen = 0
    //To open the nav this will run
    function openNav() {
        //Used to tell js that the nav is open
        navOpen = 180;
        //Animates it out
        $('.sidenav').animate({
        'marginRight' : "-=-250px" //moves left
        }, {duration: 500, queue: false});
    }
    //To close the nav
    function closeNav() {
        //Used to tell js that the nav is closed
        navOpen = 0;
        //Animates it in
        $('.sidenav').animate({
        'marginRight' : "-=250px"
        }, {duration: 500});
    }
});