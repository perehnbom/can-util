/*can-util@3.0.0-pre.19#dom/frag/frag*/
var getDocument = require('../document/document.js');
var fragment = require('../fragment/fragment.js');
var each = require('../../js/each/each.js');
var childNodes = require('../child-nodes/child-nodes.js');
var makeFrag = function (item, doc) {
    var document = doc || getDocument();
    var frag;
    if (!item || typeof item === 'string') {
        frag = fragment(item == null ? '' : '' + item, document);
        if (!frag.childNodes.length) {
            frag.appendChild(document.createTextNode(''));
        }
        return frag;
    } else if (item.nodeType === 11) {
        return item;
    } else if (typeof item.nodeType === 'number') {
        frag = document.createDocumentFragment();
        frag.appendChild(item);
        return frag;
    } else if (typeof item.length === 'number') {
        frag = document.createDocumentFragment();
        each(item, function (item) {
            frag.appendChild(makeFrag(item));
        });
        if (!childNodes(frag).length) {
            frag.appendChild(document.createTextNode(''));
        }
        return frag;
    } else {
        frag = fragment('' + item, document);
        if (!childNodes(frag).length) {
            frag.appendChild(document.createTextNode(''));
        }
        return frag;
    }
};
module.exports = makeFrag;