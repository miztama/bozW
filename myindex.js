const EorzeaWeather = require('./eorzea-weather.js');

const ET_ONE_HOUR = 175 * 1000
const ET_EIGHT_HOUR = ET_ONE_HOUR * 8
const ET_ONE_DAY = ET_ONE_HOUR * 24

exec()

function exec() {
    // const EorzeaTime = require('./eorzea-time.js');

    // var eorzeaTime = new EorzeaTime(new Date());
    // console.log(eorzeaTime.toString());


    var startDate = null
    var reportNum = 48
    var outputStr = ""
    var tmpStr = ""
    var result = {}

    for (var i = 0; i < reportNum; i++) {
        if (startDate == null) {
            startDate = getStartTime(new Date())
        } else {
            startDate = new Date(startDate.getTime() + ET_EIGHT_HOUR)
        }
        if (i % 3 != 2) {
            tmpStr = tmpStr + (outputFormat(startDate) + "、")
        } else {
            tmpStr = tmpStr + (outputFormat(startDate)) + "\n"
            outputStr += tmpStr
            // console.log(tmpStr)
            tmpStr = ""
        }
    }
    if (tmpStr != "") {
        outputStr += tmpStr
        // console.log(outputStr)
    }

    console.log("output is")
    console.log(outputStr)

    domChange(outputStr)

    return;
}



function domChange(wResult){

    var elem = document.getElementById("wResult")
    elem.innerHTML = wResult
}



// 出力文字列用の文字列を作成する
function outputFormat(startDate) {
    return weatherSpacing(checkWeather(startDate)) + "（" + hourSpacing(startDate.getHours()) + ":" + zeroSpacing(startDate.getMinutes()) + "）"
    //    return startDate.toString() + "：" + checkWeather(startDate)
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

