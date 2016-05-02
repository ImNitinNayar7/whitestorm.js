/**
 * Creator: yeliex
 * Project: whitestorm.js
 * Description:
 */

import WHS from 'whitestormjs';

WHS.debug = true;

const App = new WHS.World({
    stats: "fps",
    autoresize: true,
    gravity: {
        x: 0,
        y: -100,
        z: 0
    },
    camera: {
        far: 10000,
        y: 10,
        z: 30
    },
    container: document.getElementById("render-content")
});
App.Sphere(
    {
        geometry: {
            radius: 3
        },
        mass: 10,
        onlyvis: false,
        material: {
            color: 0xffffff,
            kind: "basic"
        },
        pos: {
            x: 0,
            y: 100,
            z: 0
        }
    });
App.ground = App.Plane({
    geometry: {
        width: 250,
        height: 250
    },
    mass: 0,
    material: {
        color: 0xff0000,
        kind: "basic"
    },
    pos: {
        x: 0,
        y: 0,
        z: 0
    },
    rot: {
        x: -Math.PI / 2
    }
});
App.start();
