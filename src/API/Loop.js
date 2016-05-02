/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS plugin loop
 *
 * @param  {Function} func - Function to be executed
 */
WHS.Loop = function( func ) {

    this.loop = {
        func: func,
        id: WHS.loops.length,
        clock: new THREE.Clock(),
        enabled: false
    };

    WHS.loops.push( this.loop );

}

/**
 * Starts the loop
 */
WHS.Loop.prototype.start = function() {

    this.loop.clock.start();

    this.loop.enabled = true;

};

/**
 * Stops the loop
 */
WHS.Loop.prototype.stop = function() {

    this.loop.clock.stop();

    this.loop.enabled = false;

};

/**
 * Removes loop from WHS.loops array.
 */
WHS.Loop.prototype.remove = function() {

    this.loop.clock.stop();

    this.loop.enabled = false;

    WHS.loops.filter( el => {
    	return el !== this.loop;
    });

};
