// const EorzeaWeather = require('eorzea-weather');
// const EorzeaWeather = import("./eorzea-weather.js");
const EorzeaWeather = require('./eorzea-weather.js');
// var hoge = EorzeaWeather.getWeather(EorzeaWeather.ZONE_EUREKA_ANEMOS, new Date()); // Gales
// var hoge = EorzeaWeather.getWeather(EorzeaWeather.ZONE_AMH_ARAENG, new Date());


//var EorzeaTime = require('eorzea-time');
const EorzeaTime = require('./eorzea-time.js');
var eorzeaTime = new EorzeaTime(new Date());
console.log(eorzeaTime.toString());


const startDate = new Date();
startDate.setSeconds(0);


console.log("111");
console.log("222");

var result = checkWeather(startDate);
console.log(startDate.getDate() + "日" + startDate.getHours() + "時" + startDate.getMinutes() + "分：" + result);

console.log("333");
/*
var resutlWeather = getWeather(startDate, 60)
for (var i = 0; i < resutlWeather.length; i++) {
    console.log(resutlWeather[i].time.getDate() + "日" + resutlWeather[i].time.getHours() + "時" + resutlWeather[i].time.getMinutes() + "分：" + resutlWeather[i].weather);
}
*/

console.log("444")

const ET_ONE_HOUR = 175 * 1000
const ET_EIGHT_HOUR = ET_ONE_HOUR * 8
const ET_ONE_DAY = ET_ONE_HOUR * 24

// 直前
var startDate2 = null
var reportNum = 24
for (var i = 0; i < reportNum; i++) {
    if (startDate2 == null) {
        startDate2 = getStartTime(new Date())
    } else {
        startDate2 = new Date(startDate2.getTime() + ET_EIGHT_HOUR)
    }
    console.log(outputFormat(startDate2))
}


console.log("555")
// 直前
var startDate2 = null
var reportNum = 96 + 24 + 3
var outputStr = ""
for (var i = 0; i < reportNum; i++) {
    if (startDate2 == null) {
        startDate2 = getStartTime(new Date())
    } else {
        startDate2 = new Date(startDate2.getTime() + ET_EIGHT_HOUR)
    }
    if(i % 3 != 2){
        outputStr = outputStr +  (outputFormat(startDate2) + "、")
    } else {
        outputStr = outputStr +  (outputFormat(startDate2))
        console.log(outputStr)
        outputStr = ""
    }
}
if(outputStr != "") {
    console.log(outputStr)
    outputStr = ""
}


return;



// 出力文字列用の文字列を作成する
function outputFormat(startDate2) {
    return weatherSpacing(checkWeather(startDate2)) + "（" + hourSpacing(startDate2.getHours()) + ":" + zeroSpacing(startDate2.getMinutes()) + "）"
    //    return startDate2.toString() + "：" + checkWeather(startDate2)
}


function getStartTime(date) {
    const oneHour = 175 * 1000;
    const msec = date.getTime();
    const bell = (msec / oneHour) % 24;
    const startMsec = msec - Math.round(oneHour * bell);
    return new Date(startMsec);
};

// startDateからminutesの分だけ天気を取得して返す
// 戻り値：配列
//   要素.weather：天気の文字列
//   要素.time　 ：時間（datetime）
function getWeather(startDate, minutes) {
    var result = []

    for (var i = 0; i < minutes; i++) {
        startDate.setMinutes(startDate.getMinutes() + 1);
        var checkResult = checkWeather(startDate)

        var tmpResult = {}
        tmpResult.weather = checkResult;
        tmpResult.time = new Date(startDate);
        result.push(tmpResult);
    }

    return result;

}

// checkDateで指定された時間のボズヤ南方戦線の天気を返す。
// 戻り値：文字列（"雨"、"雷"、風"、"砂塵"、"晴れ"）
function checkWeather(checkDate) {
    var targetWeather = EorzeaWeather.getWeather(EorzeaWeather.ZONE_BOZJANSOUTHERNLINE, checkDate, { "locale": "ja" });
    return targetWeather;
}



function zeroSpacing(num) {
    return num < 10 ? "0" + num : num
}

function weatherSpacing(weatherStr) {
    return weatherStr.length < 2 ? weatherStr + "　" : weatherStr
}

function hourSpacing(hour) {
    return hour < 10 ? " " + hour : hour
}


/*

var count = 30;
var tmpDate;
for (var i = 0; i < count; i++) {
    console.log(startDate.toString());
    var hoge = EorzeaWeather.getWeather(EorzeaWeather.ZONE_BOZJANSOUTHERNLINE, startDate);
    console.log(hoge)

    startDate.setMinutes(startDate.getMinutes()+1);
    console.log()
}









*/

