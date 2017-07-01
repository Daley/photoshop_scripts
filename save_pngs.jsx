/**
    如果你有这样的需求，请用这个脚本：
   psd里大部分图层不动，但针对某几个图层要分别保存成png(暂时只做了png）
   比如：一个应用的icon，要上很多不同的渠道，每个渠道大体不变，但边边角角总有点不一样，就可以把不一样的弄出来放到一个图层（imgs）
   将挨个保存imgs里的图片
   唉，不会描述，说不清楚
    **/
var ns = [];
var shareSets = "imgs"; //photoshop 里，这个图层文件夹里的东西分别保存开

var doc = app.activeDocument;

var set = doc.layerSets.getByName(shareSets);

if (set) {
    var layers = set.layers;
    //全隐藏  hide all
    for (var i = 0; i < layers.length; i++) {
        var lay = layers[i];
        ns.push(lay.name);
        lay.visible = false;
    }
    //挨个保存  save png one by one
    for (var i = 0; i < layers.length; i++) {
        var lay = layers[i];
        lay.visible = true;

        var n = lay.name.replace(/\//g, "");
        var url = doc.path + "/" + n + ".png";
        ns.push(url);

        var saveOptions = new PNGSaveOptions();
        saveOptions.compression = 8;
        saveOptions.interlaced = false;
        doc.saveAs(new File(url), saveOptions, true);
        lay.visible = false;
    }
}

//print 
alert(ns.join(","));