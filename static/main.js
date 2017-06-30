function reqListener () {
  console.log(this.responseText);
}

var oReq = new XMLHttpRequest(); //New request object
oReq.onload = function() {
    //This is where you handle what to do with the response.
    //The actual data is found on this.responseText
    // console.log(this.responseText);
    // console.dir(this.responseText);
    var test = JSON.parse(this.responseText);
    // var test = this.responseText;
    console.dir(test);
    console.log(typeof test);
};
oReq.open("get", "./static/frog.php", true);
//                               ^ Don't block the rest of the execution.
//                                 Don't wait until the request finishes to
//                                 continue.
oReq.send();
