$(document).ready(function () {

    //Will move scroll the page to the top when it is first loaded
    $(window).on('beforeunload', function () {
        $(window).scrollTop(0);
    });
    //used to navigate the page
    $('.slide').click(function (e) {
        var linkHfef = $(this).attr('href'); //Stores the link of the person the user wishes to scoll to
        //animates to the selected link
        $('html, body').animate({
            scrollTop: $(linkHfef).offset().top
        });
        //Prevents the default action from happening
        e.preventDefault()
        //Changes the aside to make the current person that the user is looking at to bold
        $(linkHfef).click(function () {
            $(linkHfef).toggle().css('font-weight', 'bold');
        });
    });
    //When a child list item of #Links is pressed this will change the page navigation 
    $("#Links li").on("click", function (e) {
        //Prevents the default action from happening
        e.preventDefault();
        //Changes all the other list items to normal size and normal boldness
        $(this).siblings("#Links li").css({
            'font-size': '100%',
            'font-weight': 'normal'
        });
        //Changes the selected list item to be bigger and boldee
        $(this).css({
            'font-size': '130%',
            'font-weight': 'bold'
        });
        //Makes the list items transparcy change with an animation
        $(this).siblings("#Links li").fadeTo(300, 0.6);
        $(this).fadeTo(300, 1);
    });
    //Will fade out the welcome screen when you press the body
    $("body").on("click", function () {
        $("#Welcome").fadeOut(1000);
        $(".fade").delay(1300).animate({
            opacity: 100
        }, 9000);
    });
});