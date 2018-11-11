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
    let d = new Date();
    let hour;
    let amOrPm;

    function dayOfWeek() {
        let d = new Date();
        let weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        let n = weekday[d.getDay()];
        return n;  
    }
 

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

        hour = (d.getHours() > 12) ? d.getHours() : d.getHours() - 12;
        amOrPm = (d.getHours() < 12) ? "AM" : "PM";


        $("#time").text(`Last Bet Update:  Morgan +1 (${dayOfWeek()} ${d.getMonth() + 1}/${d.getDate()} at ${d.getHours()}:${d.getMinutes()} ${amOrPm})`);

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

        hour = (d.getHours() < 12) ? d.getHours() : d.getHours() - 12;
        amOrPm = (d.getHours() < 12) ? "AM" : "PM";

        $("#time").text(`Last Bet Update:  Carson +1 (${dayOfWeek()} ${d.getMonth() + 1}/${d.getDate()} at ${d.getHours()}:${d.getMinutes()} ${amOrPm})`);

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



















console.log(moment().month());


});