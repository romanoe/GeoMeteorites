
const GD_SERVER_ADDRESS = 'https://script.google.com/macros/s/AKfycbwgjNyIvsT0NCp-TviTk5Tvc9i279eKE9hBWPxshoZwLCkJfd82/exec';

// Cubic-Bezier(0.25,0.1,0.25,1)
// For x in [ 0 ; 1 ] (in this case in steps of 0.01)
// a = Math.pow(2 * Math.sqrt(256 * x * x - 80 * x + 13) + 32 * x - 5, 1/3)
// t = 0.25 + 0.25 * a - (0.75 / a)
// y = -1.7 * t * t * t + 2.4 * t * t + 0.3 * t
const CUBIC_BEZIER_EASE_VALUES = Object.freeze([
    0.0044878152 , 0.0099823428 , 0.0165293333 , 0.0241723958 , 0.0329515413 ,
    0.0429014371 , 0.0540493881 , 0.0664130921 , 0.0799982680 , 0.0947963057 ,
    0.1107821434 , 0.1279126190 , 0.1461255573 , 0.1653398288 , 0.1854565371 ,
    0.2063613664 , 0.2279279714 , 0.2500221409 , 0.2725063576 , 0.2952443342 ,
    0.3181051337 , 0.3409665743 , 0.3637177446 , 0.3862605840 , 0.4085105913 ,
    0.4303967987 , 0.4518611800 , 0.4728576711 , 0.4933509576 , 0.5133151609 ,
    0.5327325175 , 0.5515921191 , 0.5698887542 , 0.5876218721 , 0.6047946771 ,
    0.6214133502 , 0.6374863893 , 0.6530240577 , 0.6680379278 , 0.6825405059 ,
    0.6965449288 , 0.7100647177 , 0.7231135833 , 0.7357052704 , 0.7478534371 ,
    0.7595715614 , 0.7708728698 , 0.7817702849 , 0.7922763870 , 0.8024033875 ,
    0.8121631125 , 0.8215669924 , 0.8306260587 , 0.8393509444 , 0.8477518889 ,
    0.8558387442 , 0.8636209843 , 0.8711077158 , 0.8783076889 , 0.8852293098 ,
    0.8918806532 , 0.8982694747 , 0.9044032240 , 0.9102890571 , 0.9159338487 ,
    0.9213442047 , 0.9265264733 , 0.9314867569 , 0.9362309229 , 0.9407646142 ,
    0.9450932594 , 0.9492220823 , 0.9531561115 , 0.9569001888 , 0.9604589783 ,
    0.9638369736 , 0.9670385062 , 0.9700677523 , 0.9729287399 , 0.9756253556 ,
    0.9781613503 , 0.9805403458 , 0.9827658401 , 0.9848412128 , 0.9867697303 ,
    0.9885545505 , 0.9901987277 , 0.9917052168 , 0.9930768772 , 0.9943164774 ,
    0.9954266984 , 0.9964101370 , 0.9972693099 , 0.9980066563 , 0.9986245414 ,
    0.9991252593 , 0.9995110355 , 0.9997840299 , 0.9999463394 , 1
]);

/*
    Exports
*/

export {
    CUBIC_BEZIER_EASE_VALUES,
    GD_SERVER_ADDRESS
};
