$(document).ready(function () {
    //Makes the page unscrollable on load if the width is more than 790px
    if ($(window).width() >= 790) {
        $('html, body').css('overflowY', 'hidden');
    }
    //If the window is resized it will check to see if the width is less than 789px, if it is then it will make the page scrollable
    $(window).resize(function () {
        if ($(window).width() <= 789) {
            $('html, body').css('overflowY', 'auto');
        }
    });
    //Scrolls the page to the top when the page is loaded
    $(window).on('beforeunload', function () {
        $(window).scrollTop(0);
    });

    //Hides some of the images for the slide show
    $("#slideshow > figure:gt(0)").hide();
    //Used to fade images in and out for the slideshow
    setInterval(function () {
        $('#slideshow > figure:first')
            .fadeOut(1000)
            .next()
            .fadeIn(1000)
            .end()
            .appendTo('#slideshow');
    }, 10000);
    //Used to fade in the different types of vehicles
    $('figure.container a').click(function (e) {
        //makes the page scrolllable
        $('html, body').css('overflowY', 'auto');
        //Gets the liks of the page
        var linkHfef = $(this).attr('href');
        //Fades out all of the cotainers
        $(".Car-Container").fadeOut('slow');
        setTimeout(function () {
            $(linkHfef).fadeIn('slow'); //Fades in the selected containter
        }, 1000);
        e.preventDefault()
    });
    //Used to save the json file locally
    function saveText(text, filename) {
        var a = document.createElement('a');
        a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(text));
        a.setAttribute('download', filename);
        a.click()
    }
    //Used to get the data from localStorage
    var retrievedData = sessionStorage.getItem("Cart");
    //stores the total price of the vehicles in the car
    var TotalPrice = 0;
    //will run if Cart is not empty
    if (retrievedData) {
        //Puts the data from the JSON file into the array Cart
        var Cart = JSON.parse(retrievedData);
        //Gets the number of objects in the Cart
        var cartLength = Cart.length;
        //Runs for each of the object in the cart
        for (var i = 0, len = Cart.length; i < len; i++) {
            //Used to display the items in the cart in the shopping cart
            $('#Cart-Items').append('<p id="Cart-Items-Side"><span id="Car-Name">' + Cart[i].name + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Cart[i].price + "&nbsp;&nbsp;&nbsp;&nbsp;x" + '<span id="Quantity">' + Cart[i].count + '</span>&nbsp;&nbsp;&nbsp;<span id="quantity-down-' + i + '" class="quan-down">-</span></p>');
            CarPrice = (Cart[i].price)
                //calculates the new totalPrice
            TotalPrice = TotalPrice + CarPrice * parseInt(Cart[i].count);
            //Changes the total price text to the correct value
            $('#Total-Price').text(TotalPrice);
        }
    } else {
        //Otherwise it will create the empty array Cart
        var Cart = [];
    }
    var BasketEmpty
        //Checks if there are items in the array
    if (cartLength == 0) {
        BasketEmpty = true;
    } else {
        BasketEmpty = false;
    }
    //Used to store objects in the array
    var Item = function (name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    };
    var AddedItemsCounter = 0
        //This will add items to the basket - save and display
    $(".Add-To-Basket").click(function () {
            //17 is the most items that can be in the cart
            if (AddedItemsCounter < 17) {
                //Gets the id of the car to add to the cart
                var carToAdd = $(this).attr('id');
                //Gets the title of the car to add to the cart
                var CarTitle = $('#' + carToAdd + '-Title').text();
                //If there are items in the basket then this will run
                if (BasketEmpty === false) {
                    var filled = false;
                    //Checks to see if the item has already been added to the cart
                    for (var i = 0, len = Cart.length; i < len; i++) {
                        //If it has then this will run
                        if (Cart[i].name === CarTitle) {
                            //Increase the quanityty by one
                            Cart[i].count = Cart[i].count + 1;
                            //Loads the car price
                            var intCarPrice = Cart[i].price;
                            filled = true;
                        }
                    }
                    if (filled === false) {
                        //Gets the car price from the html code
                        var CarPrice = $('#' + carToAdd + '-Price').text();
                        //Converts the car price to an integer for calculations
                        var intCarPrice = parseInt(CarPrice.substring(1));
                        //Quanity wanted
                        var CarCount = 1
                            //created the object
                        var item = new Item(CarTitle, intCarPrice, CarCount)
                            //Pushes the new object to the array
                        Cart.push(item)
                    }
                    //If there are no items in the basket then this will run
                } else {
                    //Gets the car price from the html code
                    var CarPrice = $('#' + carToAdd + '-Price').text();
                    //Converts the car price to an integer for calculations
                    var intCarPrice = parseInt(CarPrice.substring(1));
                    //Quanity wanted
                    var CarCount = 1
                        //created the object
                    var item = new Item(CarTitle, intCarPrice, CarCount)
                        //Pushes the new object to the array
                    Cart.push(item)
                }
                //Clears the cart displayed on screen
                $("#Cart-Items").empty();
                TotalPrice = 0;
                //For each of the objects in the array
                for (var i = 0, len = Cart.length; i < len; i++) {
                    //Displays them in the shopping cart
                    $('#Cart-Items').append('<p id="Cart-Items-Side"><span id="Car-Name">' + Cart[i].name + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Cart[i].price + "&nbsp;&nbsp;&nbsp;&nbsp;x" + '<span id="Quantity">' + Cart[i].count + '</span>&nbsp;&nbsp;&nbsp;<span id="quantity-down-' + i + '" class="quan-down">-</span></p>');
                    CarPrice = (Cart[i].price)
                        //Calculates the new TotalPrice
                    TotalPrice = TotalPrice + CarPrice * parseInt(Cart[i].count);
                    //Displays the new TotalPrice
                    $('#Total-Price').text(TotalPrice);
                }
                //Converts the array CART into a JSON friendly format
                var JSONReadyCart = JSON.stringify(Cart);
                //Stores the item in the localStorage
                sessionStorage.setItem('Cart', JSONReadyCart);
                //More than 17 items in the basket and this will be displayed
            } else {
                alert("Basket Full!")
            }
        })
        //For decreasing the quantity
    $(document).on('click', '.quan-down', function () {
        //Gets the row in the array
        var row = (this.id).slice(-1);
        //If there is more than 1 in the count
        if (Cart[row].count > 1) {
            //Decreases the quantity by 1
            Cart[row].count = Cart[row].count - 1;
            //Converts the array CART into a JSON friendly format
            var JSONReadyCart = JSON.stringify(Cart);
            //Stores the item in the localStorage
            sessionStorage.setItem('Cart', JSONReadyCart);
            //More than 17 items in the basket and this will be displayed
        } else {
            //Will simply remove the item if there is only 1, this is effient as it will also save space as it moves objects to avoid wasiting space
            Cart.splice(row, 1);
        }
        //Clears the cart displayed on screen
        $("#Cart-Items").empty();
        TotalPrice = 0;
        //For each of the objects in the array
        for (var i = 0, len = Cart.length; i < len; i++) {
            //Displays them in the shopping cart
            $('#Cart-Items').append('<p id="Cart-Items-Side"><span id="Car-Name">' + Cart[i].name + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Cart[i].price + "&nbsp;&nbsp;&nbsp;&nbsp;x" + '<span id="Quantity">' + Cart[i].count + '</span>&nbsp;&nbsp;&nbsp;<span id="quantity-down-' + i + '" class="quan-down">-</span></p>');
            CarPrice = (Cart[i].price)
                //Calculated the new TotalPrice
            TotalPrice = TotalPrice + CarPrice * parseInt(Cart[i].count);
            //Displays the new total price
            $('#Total-Price').text(TotalPrice);
        }
        BasketEmpty = false;
        //Converts the array CART into a JSON friendly format
        var JSONReadyCart = JSON.stringify(Cart);
        //Stores the item in the localStorage
        sessionStorage.setItem('Cart', JSONReadyCart);
    })
});