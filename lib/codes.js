// BARCODE Writer (in pure postscript)
var BWIPJS = require("./bwip.js");

// CONFIGURE IN index.js
var types  = require("./bwipp");

// ADAPTER png || canvas
var adapter = require("./canvas");

// FONTS
var fonts  = require("./fonts");

exports.loadModules = function(modules, opts)
{

        modules.forEach(function(m) {
				types.addExport(m, opts ? opts : {
					"includetext":true,
					"guardwhitespace":false,
					"inkspread":0,
					scaleX:2,
					textyoffset:-15
				});
        });

}

exports.create = function( type, text, options )
{
	// CODER AVAILABLE
    var opts = ( types[ type ] ) ? options || types[ type ] : null;

	console.log('rescode: creating barcode with options: ' + JSON.stringify(options, undefined, 2));
    
    // BAD REQUEST
    if( !type || !text || !opts ) {
		console.log('rescode reports invalid options, returning null');
		return null;
	}

	// DEFAULTS
	var rot = opts.rot || "N"; 
	var scaleX = opts.scaleX || 1;
	var scaleY = opts.scaleY || 1;

	// GENERATE
	console.log('rescode: creating BWIPJS');
	var bw = new BWIPJS();
	console.log('rescode: creating: canvas adapter');
	bw.bitmap(new adapter);
	console.log('rescode: pushing text');
	bw.push(text);
	console.log('rescode: pushing options');
	bw.push(opts);
	console.log('rescode: pushing rescale: ' + scaleX + 'x' + scaleY);
    bw.scale(scaleX, scaleY);

	console.log('rescode: calling renderer: ' + type);
	bw.call(type);


	console.log('rescode: returning rotated barcode.');
	return bw.bitmap().create(rot);
};

