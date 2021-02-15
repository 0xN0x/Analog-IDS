/**
    @overview adds a tag @authenticated to any object
    @module plugins/auth
    @author Mickael Courtiade
 */
'use strict';
   
exports.defineTags = function(dictionary) {
    dictionary.defineTag("authenticated", {
        mustHaveValue: false,
        canHaveType: false,
        canHaveName: false,
        onTagged: function(doclet, tag) {
            doclet.authenticated = true;
        }
    });
};
