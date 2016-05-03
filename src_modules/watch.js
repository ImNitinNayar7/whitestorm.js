/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
 */

const Watch = function (queue) {

    'use strict';
    queue = Array.isArray(queue) ? queue.slice() : [];
    const add = function (element) {

        queue.push(element);

        return this;
    };
    const remove = function (element) {

        queue = queue.filter(function (item) {
            return item != element;
        });

        return this;
    };

    return {
        add,
        remove
    };
};

export {
  Watch as default
};
