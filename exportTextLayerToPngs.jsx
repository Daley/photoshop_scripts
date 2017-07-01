//调用[Folder]的[selectDialog]命令，弹出文件夹选择窗口，提示用户选择输出web图片的文件夹，并将文件夹存储在变量[outputFolder]中。
var outputFolder = Folder.selectDialog("选择输出的文件夹");
//定义一个变量[doc]，表示当前文档。
var doc = app.activeDocument;

//定义一个变量[option]，表示图片的输出格式。
var option = new ExportOptionsSaveForWeb();
//设置图片输出时支持透明度。
option.transparency = true;
//设置图片输出的色彩范围为256色。
option.colors = 256;
//设置图片输出的格式为GIF格式。
option.format = SaveDocumentType.COMPUSERVEGIF;

var pngOp=new PNGSaveOptions();
pngOp.compression=7;
pngOp.interlaced=false;

var layer=doc.activeLayer;

if(layer&&layer.kind==LayerKind.TEXT){
    outputFolder=outputFolder+"/"+layer.name;
    var folder1 = Folder(outputFolder);
    if(!folder1.exists){
        folder1.create();
    }
    var textItemRef = layer.textItem;
    var str=textItemRef.contents;
    for(var i=0;i<str.length;i++){
        var c=str.charAt(i);
        textItemRef.contents=c;
        //ayer.copy();
        
        var bounds = layer.bounds;
        var width    = bounds[2] - bounds[0];
        var height   = bounds[3] - bounds[1];
        app.documents.add(width, height, 72, "tmp", NewDocumentMode.RGB, DocumentFill.TRANSPARENT);
        //app.activeDocument.paste();
        var newDoc=app.activeDocument;
        app.activeDocument=doc;

        var tLayer=newDoc.layers;
        var targetLayer = layer.duplicate( newDoc, ElementPlacement.PLACEATBEGINNING )
        app.activeDocument=newDoc;
        targetLayer.translate(-bounds[0],-bounds[1]);
        
        var file = new File(outputFolder + "/" + c + ".png");
        //app.activeDocument.exportDocument(file, ExportType.SAVEFORWEB, option);
        
        var saveOptions = new PNGSaveOptions();
        saveOptions.compression = 8;
        saveOptions.interlaced = false;
        app.activeDocument.saveAs(file, saveOptions, true);
        
        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        
        app.activeDocument = doc;
    }
    textItemRef.contents=str;
    
 }
/*
//添加一个循环，遍历所有图层。
for(var i=0; i＜layers.length; i++)
{
	//将当前遍历到的图层拷贝到内存。并获得当前图层的尺寸大小。这个尺寸排除了图层特效如阴影、外发光等产生的范围。
	layers[i].copy();
	var bounds = layers[i].bounds;

	 //计算当前图层的宽度，为范围数组变量的第三个值与第一个值的差。
	var width    = bounds[2] - bounds[0];
	 //计算当前图层的高度，为范围数组变量的第四个值与第二个值的差。
	var height   = bounds[3] - bounds[1];

	 //创建一个新文档，新文档的尺寸为拷贝到内存中图层的尺寸一致。
	app.documents.add(width, height, 72, "myDocument", NewDocumentMode.RGB, 
                                        DocumentFill.TRANSPARENT);

	//将内存中的图层，复制到新文档。
	app.activeDocument.paste();

	 //定义一个变量[file]，作为图层输出的路径。
	var file = new File(outputFolder + "/Output" + i + ".gif");

	 //调用[activeDocument]对象的[exportDocument]方法，将新文档导出为GIF图片。
	app.activeDocument.exportDocument(file, ExportType.SAVEFORWEB, option);

	 //调用[activeDocument]对象的[close]方法，关闭新文档。[close]方法内的参数，表示关闭新文档时，不再存储新文档。
	app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

	 //将Photoshop的当前文档，重置为网页设计稿文档。
	app.activeDocument = doc;
}*/