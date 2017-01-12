$(document).ready(function () {
    //Scrolls the page to the top when the page loads
    $(window).on('beforeunload', function () {
        $(window).scrollTop(0);
    });
    //Used to get the data for the array from localStorage
    var retrievedData = sessionStorage.getItem("Cart");
    var TotalPrice = 0;
    //If there are items that have been retrieved then this will run
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
    };
    
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