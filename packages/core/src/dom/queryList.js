import { Subject } from '../rx/subject';
import { removeFromArray, addToArray } from 'js-helpers/helpers';

function QueryList() {
    this._list = [];
    Object.defineProperties(this, {
        length: {
            get: function() {
                return this._list.length;
            }
        },
        first: {
            get: function() {
                return this._list[0];
            }
        },
        last: {
            get: function() {
                return this._list[this.length - 1];
            }
        }
    });
}

QueryList.prototype.add = function(element, index, emitEvent) {
    addToArray(this._list, element, index);
    if (emitEvent) {
        this.onChanges.next({
            value: element,
            type: 'add'
        });
    }
};

QueryList.prototype.get = function(element) {
    if (element) {
        return this._list.find(function(ele) {
            return ele === element
        });
    }

    return this._list;
};

QueryList.prototype.filter = function(callback) {
    this._list.filter(callback);
};

QueryList.prototype.forEach = function(callback) {
    this._list.forEach(callback);
};

QueryList.prototype.reduce = function(callback, accumulator) {
    return this._list.reduce(callback, accumulator);
};

QueryList.prototype.some = function(callback) {
    return this._list.some(callback);
};

QueryList.prototype.map = function(callback) {
    return this._list.map(callback);
};

QueryList.prototype.getByIndex = function(index) {
    return this._list[index];
};

QueryList.prototype.find = function(callback) {
    return this._list.find(callback);
};

QueryList.prototype.toString = function() {
    return JSON.stringify(this._list);
};

QueryList.prototype.destroy = function() {
    while (this._list.length) {
        var element = this._list.pop();
        if (element) element.remove();
    }
    this.onChanges.destroy();
};

QueryList.prototype.remove = function(element) {
    var index = this._list.findIndex(function(ele) {
        return ele === element;
    });

    return this.removeByIndex(index);
};

QueryList.prototype.hasIndex = function(index) {
    return this._list.length - 1 > index;
}

QueryList.prototype.removeByIndex = function(index) {
    var element = removeFromArray(this._list, index);
    this.onChanges.next({
        value: element,
        type: 'detached'
    });

    return element;
};

QueryList.prototype.onChanges = new Subject();