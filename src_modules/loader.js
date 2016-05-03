/**
 * Creator: yeliex
 * Project: whitestorm.js
 * Description:
 */

const THREE = require("three");

const
    JSON = new THREE.JSONLoader(),
    Texture = new THREE.TextureLoader(),
    Font = new THREE.FontLoader();

module.exports = {
    JSON,
    Texture,
    Font
};