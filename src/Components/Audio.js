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
    		volume: 1,
            loop: false
    	} );

    	this.listener = new THREE.AudioListener();
    	this.sound = new THREE.PositionalAudio( this.listener );

    	this.sound.load( params.src );
    	this.sound.setRefDistance( params.refDistance );
    	this.sound.autoplay = params.autoplay;
    	this.sound.setVolume( 1 );
        this.sound.setLoop( params.loop );

    	object.mesh.add( this.sound );

    }

    addOscillator( params = {} ) {

        WHS.API.extend( params, {
            type: "sine",
            frequency: {
                value: 144
            }
        } );

        this.oscillator = this.listener.context.createOscillator();

        this.oscillator.frequency.value = params.frequency.value;
        this.oscillator.type = params.type;
        this.oscillator.start( 0 );

        this.sound.setNodeSource( this.oscillator );
    }

    isPlaying() {
        return this.sound.isPlaying;
    }

    stop() {
        this.sound.source.stop();
    }

}

WHS.World.prototype.Audio = function( obj, params ) {

	let object = new WHS.Audio( obj, params );

	return object;

}
