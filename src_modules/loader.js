/**
 * Creator: yeliex
 * Project: whitestorm.js
 * Description:
 */

const THREE = require("three");

const
    JSON = (new THREE.JSONLoader()).load,
    Texture = (new THREE.TextureLoader()).load,
    Font = (new THREE.FontLoader()).load;

module.exports = {
    JSON,
    Texture,
    Font
};
