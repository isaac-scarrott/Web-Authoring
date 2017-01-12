$(document).ready(function () {
    //To check if the page is landscape as that is what it is optimized to be
    if (window.innerHeight > window.innerWidth) {
        alert("Please use Landscape!");
    }
    //When the window is resized it will check if it is stillz landscape
    $(window).resize(function () {
        if (window.innerHeight > window.innerWidth) {
            alert("Please use Landscape!");
        }
    });
    var CarColour = "Mango-Polar-Silver"
    var WheelColour = "Wheels-1"
        //When you click to change the colour of the car this will run
    $("#Colour-Picker img").on("click", function () {
            CarColour = this.id;
            //Changes the image displayed
            $("#Car").html('<img src="Images/Customize-CLA/' + WheelColour + '/' + CarColour + '.png">');
            //Used to display Magno Polar Silver correctly
            if (CarColour == "Mango-Polar-Silver") {
                CarColour = "Magno Polar Silver"
            }
            //Changes the car colour text
            $("#Car-Colour").text(CarColour)
        })
        //When you click to change the car rims then this will run
    $("#Wheel-Picker img").on("click", function () {
            WheelColour = this.id;
            //Changes the image displayed
            $("#Car").html('<img src="Images/Customize-CLA/' + WheelColour + '/' + CarColour + '.png">');
            //Used to call the wheels by the correct name
            if (WheelColour == "Wheels-1") {
                //changes the wheel name text
                $("#Car-Wheels").text("Himilaya Grey Wheels")
            } else {
                //changes the wheel name text
                $("#Car-Wheels").text("Ice White Wheels")
            }
        })
        //Used to save the data into a JSON file
    function saveText(text, filename) {
        var a = document.createElement('a');
        a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(text));
        a.setAttribute('download', filename);
        a.click()
    }
    //Used to get the data from the JSON file
    var retrievedData = sessionStorage.getItem("Cart");
    var TotalPrice = 0;
    //
    if (retrievedData) {
        //Puts the objects from the JSON file into the array
        var Cart = JSON.parse(retrievedData);
        //Gets the length of the array
        var cartLength = Cart.length;
        //For each of the items in the array
        for (var i = 0, len = Cart.length; i < len; i++) {
            //Used to display the cart
            $('#Cart-Items').append('<p id="Cart-Items-Side"><span id="Car-Name">' + Cart[i].name + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Cart[i].price + "&nbsp;&nbsp;&nbsp;&nbsp;x" + '<span id="Quantity">' + Cart[i].count + '</span>&nbsp;&nbsp;&nbsp;<span id="quantity-down-' + i + '" class="quan-down">-</span></p>');
            CarPrice = (Cart[i].price)
                //Used to calculate the totalprice of all of the items in the basket
            TotalPrice = TotalPrice + CarPrice * parseInt(Cart[i].count);
            //Displays the total price
            $('#Total-Price').text(TotalPrice);
        }
    } else {
        //Creates a new array called Cart
        var Cart = [];
    }
    var BasketEmpty
        //Checks if there are objects in the array
    if (cartLength == 0) {
        BasketEmpty = true;
    } else {
        BasketEmpty = false;
    }
    //Used to create a new object
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