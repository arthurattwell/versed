//  Versed.js
//  (c) Arthur Attwell
//  https://arthurattwell.com
//  MIT licence

// This script structures verse so that we can format it properly with CSS.
// 
// Process:
//
// 1. Initialise
// 2. Find all verse passages
// 3. For each verse passage, find all stanzas
// 4. For each stanza, wrap each line in a span
// 5. Add a class to any line indented with em spaces
// 6. Wrap each verse passage in a div.

function versedReady() {

    // check for browser support of the features we use
    // and the presence of verse blocks
    return navigator.userAgent.indexOf('Opera Mini') === -1 &&
    'querySelectorAll' in document &&
    'innerHTML' in document &&
    'replaceChild' in document &&
    'startsWith' in document &&
    document.querySelectorAll('.versed');
}

function versedWrapVerse(verse) {

    // Wrap the verse in a div.verse-wrapper
    var wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'versed-wrapper');
    wrapper.innerHTML = verse.outerHTML;
    verse.parentNode.replaceChild(wrapper, verse);
}

function versedStripSpaces(str) {

    // Strip leading and trailing spaces, and
    // only normal spaces! Not \s which would catch em spaces
    var newStr = str.replace(/(^ +| +$)/g, '');
    return newStr;
}

function versedWrapLines(

    // Wrap each line of a stanza in a span
    // Adapted from https://gist.github.com/madrobby/1119059
    stanza,                                             // a DOM element
    match                                               // regexp to find lines
) {
    stanza.innerHTML =                                  // replace the html contents
        stanza.innerHTML.replace(                       // with the text contents
        match || /.+(?=<br[ \/]*>|[\s]*$)/gim,          // default regexp: up to a br tag,
                                                        // or the end of the stanza 
        function(line){                                 // wrapped in
                return '<span class="versed-line-' +    // span with class names
                    (stanza=-~stanza) +                 // span 1 .. span N. "stanza" is reused, and initialized.
                                                        //    ~document.body  => -1 
                                                        //    -~document.body => 1
                                                        //    -~1             => 2 
                                                        //    -~2             => 3 etc.
                    '">' + 
                    versedStripSpaces(line) +           // line of poetry, with leading/trailing spaces stripped
                    '</span>'
        }
    ).replace(/<br[ \/]*>/gim, '')                       // and remove the break elements
}

function versedCountIndents(line, spaces) {

    // Get just the space and em-space characters
    // that start the line...
    var indentingSpaces = line.innerHTML.split(/[^\s\u2003]/, 1);

    // ... and return the number of em spaces in there
    return (indentingSpaces[0].match(spaces) || []).length;

}

function versedIndentLines(verse) {

    // Get all the lines in the verse
    var lines = verse.querySelectorAll('[class*="versed-line-"]');

    // If a line is indented with em spaces, and add a class
    // so that we can further indent runover lines with CSS
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var spaces = /\u2003/gi
        var indents = versedCountIndents(line, spaces);
        if (indents > 0) {
            line.setAttribute('class','versed-line-indent-' + indents);
        }
    }
}

function versed() {

    // Find all the verse
    var versed = document.querySelectorAll('.versed');

    // For each piece of verse, get each stanza and wrap its lines
    for (var i = 0; i < versed.length; i++) {
        var verse = versed[i];
        var stanzas = verse.querySelectorAll('p');
        for (var j = 0; j < stanzas.length; j++) {
            var stanza = stanzas[j];
            versedWrapLines(stanza);
            versedIndentLines(verse);
        }

        // then wrap the verse in a div.verse-wrapper
        versedWrapVerse(verse);

    }
}

// Start when the page has loaded
window.onload = function() {
    if (versedReady) {
        versed();
    } else {
        console.log('Sorry, the browser doesn\'t support what we need for versed.js');
        return;
    }
}
