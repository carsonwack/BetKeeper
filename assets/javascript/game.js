$(document).ready(function () {


    var config = {
        apiKey: "AIzaSyDe5kHxv7J3Vasl8S4LeS-tBA0zpSksd6U",
        authDomain: "bet-keeper0712.firebaseapp.com",
        databaseURL: "https://bet-keeper0712.firebaseio.com",
        storageBucket: "bet-keeper0712.appspot.com",
    };
    firebase.initializeApp(config);

    let database = firebase.database();


    let morganTotal = 0;
    let carsonTotal = 0;
    let scoreCurrent = $("#score").text();

 

    function chBackCol(color) {
        document.body.style.background = color;
    }



    $(document).on("click", "#morgan-button", function () {
        document.body.style.background = "red";
        document.getElementById("score").style.fontSize = "xx-large";
        setTimeout(function () {
            chBackCol("darkgray");
            document.getElementById("score").style.fontSize = "initial";
        }, 1500);

        $("#time").text("Last button click: \xa0\xa0 Morgan +1  " + "\xa0\xa0\xa0" + "-" + "\xa0\xa0\xa0" + moment().format("dddd MMM DD [at] hh:mm a"));

        morganTotal++;

        // UPDATES SCORE TAG
        if (morganTotal - carsonTotal > 0) {
            $("#score").text(`Morgan up by $${morganTotal - carsonTotal}`);
        }
        else if (morganTotal - carsonTotal < 0) {
            $("#score").text(`Carson up by $${Math.abs(morganTotal - carsonTotal)}`);
        }
        else {
            $("#score").text(`EVEN`);
        }
        //  STORES CURRENT SCORE TAG & TIME IN FIREBASE (FROM VARIABLES & TAGS)
        database.ref().set({
            morganTotal: morganTotal,
            carsonTotal: carsonTotal,
            score: $("#score").text(),
            time: $("#time").text(),
        });

        //  ON BUTTON CLICK, UPDATES TAGS WITH NEWLY STORED SCORE & TIME
        database.ref().on("value", function (snapshot) {

            $("#score").text(snapshot.val().score);
            carsonTotal = snapshot.val().carsonTotal;
            morganTotal = snapshot.val().morganTotal;
            $("#time").text(snapshot.val().time);

        }, function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });
    });



    $(document).on("click", "#carson-button", function () {
        document.body.style.background = "blue";
        document.getElementById("score").style.fontSize = "xx-large";
        setTimeout(function () {
            chBackCol("darkgray");
            document.getElementById("score").style.fontSize = "initial";
        }, 1500);

        setTimeout(`${chBackCol("blue")}`, 1000);

        $("#time").text("Last button click: \xa0\xa0 Carson +1" + "\xa0\xa0\xa0" + "-" + "\xa0\xa0\xa0" + moment().format("dddd MMM DD [at] hh:mm a"));

        carsonTotal++;

        // UPDATES SCORE TAG
        if (morganTotal - carsonTotal > 0) {
            $("#score").text(`Morgan up by $${morganTotal - carsonTotal}`);
        }
        else if (morganTotal - carsonTotal < 0) {
            $("#score").text(`Carson up by $${Math.abs(morganTotal - carsonTotal)}`);
        }
        else {
            $("#score").text(`EVEN`);
        }

         //  STORES CURRENT SCORE TAG & TIME IN FIREBASE (FROM VARIABLES & TAGS)
        database.ref().set({
            morganTotal: morganTotal,
            carsonTotal: carsonTotal,
            score: $("#score").text(),
            time: $("#time").text(),
        });

        //  ON BUTTON CLICK, UPDATES TAGS WITH NEWLY STORED SCORE & TIME
        database.ref().on("value", function (snapshot) {

            $("#score").text(snapshot.val().score);
            carsonTotal = snapshot.val().carsonTotal;
            morganTotal = snapshot.val().morganTotal;
            $("#time").text(snapshot.val().time);

        }, function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });
    });







    // ON PAGE RELOAD, UPDATES TAGS
    database.ref().on("value", function (snapshot) {

        $("#score").text(snapshot.val().score);
        carsonTotal = snapshot.val().carsonTotal;
        morganTotal = snapshot.val().morganTotal;
        $("#time").text(snapshot.val().time);

    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });


});