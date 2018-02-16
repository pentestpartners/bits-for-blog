// Debugging function to enumerate a JavaScript object
function enumerateObject(obj)
{
	for (key in obj)
	{
		console.log(key + ": " + obj[key]);
	}
}

// This is where we do our stuff
function newWriteCharacteristic(data)
{
	hexstr="";
	//enumerateObject(data);
	for (i=0;i<data.length;i++)
	{
		// JavaScript can be very manky somethings
		// >>>0 is to force the byte to be signed
		// the slice is to pad with 0s
		b=(data[i]>>>0)&0xff;
		n=b.toString(16);
		hexstr += ("00" + n).slice(-2)+" ";
	}
	console.log("Output: " + hexstr);
	this.writeCharacteristic(data);
}

function hookIt()
{
	var ble=Java.use("com.fender.tone.services.BluetoothLeService");
	ble.writeCharacteristic.implementation=newWriteCharacteristic;
}

// Hook in and replace the functions we're intercepting
Java.perform(hookIt);
