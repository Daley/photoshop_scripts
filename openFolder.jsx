// enable double clicking from the Macintosh Finder or the Windows Explorer
//#target photoshop


///////////////////////////
//       SET-UP          //
///////////////////////////


// A list of file extensions to skip, keep them lower case

gFilesToSkip = Array("db", "xmp", "thm", "txt", "doc", "md0", "tb0", "adobebridgedb", "adobebridgedbt", "bc", "bct");


// Pops open a dialog for the user to choose the folder of documents to process

var inputFolder = Folder.selectDialog("Select a folder of documents to process");


// Pops open a dialog for the user to set the output folder

//var outputFolder = Folder.selectDialog("Select a folder for the output files");



///////////////////////////
//         MAIN          //
///////////////////////////



// Open Folder of Images

OpenFolder();


// show the path to an output folder

//alert(outputFolder);



///////////////////////////
//       FUNCTIONS       //
///////////////////////////



// Given the a Folder of files, open them

function OpenFolder() {
    var filesOpened = 0;
    var fileList = inputFolder.getFiles();
    for (var i = 0; i < fileList.length; i++) {
        // Make sure all the files in the folder are compatible with PS
        if (fileList[i] instanceof File && !fileList[i].hidden && !IsFileOneOfThese(fileList[i], gFilesToSkip)) {
            open(fileList[i]);
            filesOpened++;
        }
    }
    return filesOpened;
}


// given a file name and a list of extensions
// determine if this file is in the list of extensions

function IsFileOneOfThese(inFileName, inArrayOfFileExtensions) {
    var lastDot = inFileName.toString().lastIndexOf(".");
    if (lastDot == -1) {
        return false;
    }
    var strLength = inFileName.toString().length;
    var extension = inFileName.toString().substr(lastDot + 1, strLength - lastDot);
    extension = extension.toLowerCase();
    for (var i = 0; i < inArrayOfFileExtensions.length; i++) {
        if (extension == inArrayOfFileExtensions[i]) {
            return true;
        }
    }
    return false;
}