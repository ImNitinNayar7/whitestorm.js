/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.Audio = class Audio {
    constructor( object, params = {} ) {

    	WHS.API.extend( params, {
    		autoplay: false,
    		src: "",
    		refDistance: 20,
    		volume: 1
    	} );
        console.log("A");
        console.log(object);

    	let listener = new THREE.AudioListener();
    	let sound = new THREE.PositionalAudio( listener );

    	sound.load( params.src );
    	sound.setRefDistance( params.refDistance );
    	sound.autoplay = params.autoplay;
    	sound.setVolume( 1 );

    	object.mesh.add( sound );

    }
}

WHS.World.prototype.Audio = function( obj, params ) {

	let object = new WHS.Audio( obj, params );

	return object;

}
