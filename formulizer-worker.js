onmessage = function(event) {
	var w = event.data.w;
	var h = event.data.h;
	var bs = event.data.bs
	var imgFn  = new Function("t", event.data.code );
	var buffer = event.data.buf32;
	var tStart =  event.data.tStart;
	var tEnd =  event.data.tEnd;
	
	switch (  event.data.colorMode )
	{
		case 0:
		case 1:
			for (var t = tStart; t < tEnd; t++) 
			{
				buffer[t] = (( imgFn( t ) & 0xffffff ) >>> bs) | 0xff000000;
			}
		break;
		case 2:
			for (var t = tStart; t < tEnd; t++) 
			{
				var v = (imgFn( t )  >>> bs) & 0xff 
				buffer[t] = v<<16 | v << 8 | v | 0xff000000;
			}
		break;
		case 3:
			for (var t = tStart; t < tEnd; t++) 
			{
				var v = ((imgFn( t ) >>> bs) & 1)*255; 
				buffer[t] = v<<16 | v << 8 | v | 0xff000000;
			}
		break;
	}
		
	postMessage({
		buf32: buffer,
		tStart: tStart,
		tEnd: tEnd
	});
};
