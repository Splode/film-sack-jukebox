function reqListener () {
  console.log(this.responseText);
}



var phpReq = new XMLHttpRequest(); //New request object
phpReq.onload = function() {
    //This is where you handle what to do with the response.
    //The actual data is found on this.responseText

    rssData = JSON.parse(this.responseText);

    console.dir(rssData);
};
// phpReq.open("get", "./static/frog.php", true);
phpReq.open("get", '/api/static/frog.php', true);

phpReq.send();