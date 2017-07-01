// enable double clicking from the Macintosh Finder or the Windows Explorer
//#target photoshop


// This script closes all the open documents in Photosop WITHOUT saving
// Use with care


while (app.documents.length >= 1) {
    fileClose(SaveOptions.DONOTSAVECHANGES);
}



// fileClose function for closing current document

function fileClose(options) {

    app.activeDocument.close(options);
}