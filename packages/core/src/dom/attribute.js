import { isobject, isarray, isequal } from 'js-helpers/helpers';
import { errorBuilder } from '../utils/errorLogger';
import { sce } from './renderer/sce';
import { ElementStyle } from './style';
import { ElementClassList } from './classlist';
/**
 * 
 * @param {*} nativeElement 
 * @param {*} name 
 * @param {*} value 
 */
export function AttributeAppender(nativeElement, prop, value) {
    if (isobject(prop)) {
        for (var name in prop) {
            nativeElement.setAttribute(name, prop[name]);
        }
    } else {
        nativeElement.setAttribute(prop, value);
    }
}

AttributeAppender.style = function(nativeElement, value, template) {
    if (isobject(value)) {
        ElementStyle(nativeElement, value);
    } else {
        ElementStyle.set(nativeElement, template.props, value, template.suffix);
    }
};

AttributeAppender.innerhtml = function(nativeElement, value) {
    nativeElement.innerHTML = sce.trustAsHTML(value);
};

AttributeAppender.src = function(nativeElement, value) {
    if (!isarray(nativeElement.tagName, ['IMG', 'IFRAME'])) {
        errorBuilder("src is not a valid property of " + nativeElement.tagName);
    }
    nativeElement.setAttribute('src', value);
};

AttributeAppender.href = function(nativeElement, value) {
    if (!isequal('A', nativeElement.tagName)) {
        errorBuilder("href is not a valid property of " + nativeElement.nativeElement.tagName);
    }

    nativeElement.setAttribute('href', value);
};

AttributeAppender.class = function(nativeElement, value) {
    ElementClassList.add(nativeElement, value);
};

AttributeAppender.checked = function(nativeElement, isChecked) {
    _optionalType(nativeElement, isChecked, 'checked');
};

AttributeAppender.selected = function(nativeElement, isChecked) {
    _optionalType(nativeElement, isChecked, 'selected');
};

/**
 * 
 * @param {*} nativeElement 
 * @param {*} isSelected 
 * @param {*} type 
 */
function _optionalType(nativeElement, isSelected, type) {
    nativeElement[isSelected ? 'setAttribute' : 'removeAttribute'](type, isSelected);
    nativeElement[type] = isSelected
}