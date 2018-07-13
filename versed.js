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

function versedWrapLines(stanza) {
    // Split the stanza into an array on br tags.
    // First, replace all br tags with a UUID to make replacing easier
    var splitOnThis = '9d09153e-978b-4160-919e-f88c57c19d32';
    stanza.innerHTML = stanza.innerHTML.replace(/<br[ \/]*?>/gmi, splitOnThis);
    var arrayOfLines = stanza.innerHTML.split(splitOnThis);
    // Create an empty array into which we'll write our newly wrapped lines.
    var arrayOfSpans = [];
    // For each line, strip leading and trailing spaces,
    // wrap in a span, and remove br tags. Then,
    // once all the lines have been added to the arrayOfSpans,
    // build the new stanza from the array.
    for (var i = 0; i < arrayOfLines.length; i++) {
        var lineNumber = [i + 1];
        var line = '<span class="versed-line-number-' + lineNumber + '">' + versedStripSpaces(arrayOfLines[i]) + '</span>';
        var line = line.replace(/<br[ \/]*>/gim, '');
        arrayOfSpans.push(line);
        if ([i].index = arrayOfLines.length) {
            rebuildStanza(arrayOfSpans)
        }
    }
    function rebuildStanza(arrayOfSpans) {
        // Remove the old stanza content ...
        stanza.innerHTML = '';
        // ... and add each line to the newly built stanza.
        for (var i = 0; i < arrayOfSpans.length; i++) {
            stanza.innerHTML += arrayOfSpans[i];
        }
    }
}

function versedCountIndents(line, spaces) {

    // Get just the space and em-space characters
    // that start the line...
    var indentingSpaces = line.innerHTML.split(/[^\s\u2003]/, 1);

    // ... and return the number of em spaces in there
    return (indentingSpaces[0].match(spaces) || []).length;

}

function versedIndentLines(stanza) {

    // Get all the lines in the stanza
    var lines = stanza.querySelectorAll('[class*="versed-line-number-"]');

    // If a line is indented with em spaces, and add a class
    // so that we can further indent runover lines with CSS
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var spaces = /\u2003/gi
        var indents = versedCountIndents(line, spaces);
        var existingClass = line.getAttribute('class');
        if (indents > 0 && existingClass) {
            line.setAttribute('class', existingClass + ' versed-line-indent-' + indents + '-em');
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
            versedIndentLines(stanza);
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
