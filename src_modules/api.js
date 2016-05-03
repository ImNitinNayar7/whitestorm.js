const THREE = require("three");
const {loadJSON, loadTexture, loadFont} = require("./loader");

/**
 * Extending object with other objects.
 *
 * @param {Object} object - Object that will be overwritten.
 * @param {...Objects} extensions - other objects that will be merged to first.
 * @return {Object} Extended object.
 */
const extend = function (object, ...extensions) { // $.extend alternative, ... is the spread operator.

    for (var extension of extensions) {
        //console.log(extension);
        //console.log(typeof extension);

        if (!extension)
            continue; // Ignore null and undefined objects and paramaters.

        for (var prop of Object.getOwnPropertyNames(extension)) { // Do not traverse the prototype chain.
            if (object[prop] != undefined
                && object[prop].toString() == '[object Object]'
                && extension[prop].toString() == '[object Object]')

            //Goes deep only if object[prop] and extension[prop] are both objects !
                extend(object[prop], extension[prop]);

            else
                object[prop] = ( object[prop] === 0 ) ? 0 : object[prop];
            if (typeof object[prop] == "undefined") object[prop] = extension[prop]; // Add values that do not already exist.
        }
    }

    return object;
};

/**
 * Texture. Loads texture object.
 *
 * @param {String} url - Url adress of texture *JSON*.
 * @param {Object} options - Parameters of texture.
 * @return {Object} Three.JS texture.
 */
const texture = function (url, options) {

    'use strict';

    var texture = loadTexture(url);

    if (options) {

        var opt = extend(options, {

            offset: {
                x: 0,
                y: 0
            },

            repeat: {
                x: 1,
                y: 1
            }

        });

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

        texture.offset.set(opt.offset.x, opt.offset.y);
        texture.repeat.set(opt.repeat.x, opt.repeat.y);

        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.LinearMipMapLinearFilter;

    }

    return texture;

};

const loadMaterial = function (material = {}, isPhysics = true) {

    'use strict';

    if (typeof material.kind !== "string")
        console.error("Type of material is undefined or not a string. @loadMaterial");

    var scope = {
        _type: material.kind,
        _restitution: !isNaN(parseFloat(material.restitution)) ?
            material.restitution : !isNaN(parseFloat(material.rest)) ?
            material.rest : 0.3,
        _friction: !isNaN(parseFloat(material.friction)) ?
            material.friction : !isNaN(parseFloat(material.fri)) ?
            material.fri : 0.8
    };

    if (material.texture) material.map = texture(material.texture);

    var params = extend({}, material);

    delete params["kind"];

    delete params["friction"];
    delete params["fri"];

    delete params["restitution"];
    delete params["rest"];

    delete params["useCustomMaterial"];
    delete params["useVertexColors"];

    switch (material.kind) {
        case "basic":
            scope._material = new THREE.MeshBasicMaterial(params);
            break;

        case "linebasic":
            scope._material = new THREE.LineBasicMaterial(params);
            break;

        case "linedashed":
            scope._material = new THREE.LineDashedMaterial(params);
            break;

        case "material":
            scope._material = new THREE.Material(params);
            break;

        case "depth":
            scope._material = new THREE.MeshDepthMaterial(params);
            break;

        case "face":
            scope._material = new THREE.MeshFaceMaterial(params);
            break;

        case "lambert":
            scope._material = new THREE.MeshLambertMaterial(params);
            break;

        case "normal":
            scope._material = new THREE.MeshNormalMaterial(params);
            break;

        case "phong":
            scope._material = new THREE.MeshPhongMaterial(params);
            break;

        case "pointcloud":
            scope._material = new THREE.PointCloudMaterial(params);
            break;

        case "rawshader":
            scope._material = new THREE.RawShaderMaterial(params);
            break;

        case "shader":
            scope._material = new THREE.ShaderMaterial(params);
            break;

        case "spritecanvas":
            scope._material = new THREE.SpriteCanvasMaterial(params);
            break;

        case "sprite":
            scope._material = new THREE.SpriteMaterial(params);
            break;
    }

    if (isPhysics)
        scope._materialP = Physijs.createMaterial(
            scope._material,
            scope._friction,
            scope._restitution
        );

    return scope;
};

/**
 * WhitestormJS plugin loop
 *
 * @param  {Function} func - Function to be executed
 */
var loops = [];
const Loop = function (func) {

    var loop = {
        func: func,
        id: loops.length,
        clock: new THREE.Clock(),
        enabled: false
    };
    const start = function () {
        loop.clock.start();
        loop.enabled = true;
    };
    const stop = function () {
        loop.clock.stop();
        loop.enabled = false;
    };
    const remove = function () {
        loop.clock.stop();
        loop.enabled = false;
        loops.filter(el => {
            return el !== loop;
        });
    };
    loops.push(loop);
};

module.exports = {
    extend,
    loadMaterial,
    texture,
    Loop,
    loadJSON,
    loadTexture,
    loadFont
};