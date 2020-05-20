function convertToStarsArray(stars) {
    const num = stars.toString().substring(0,1);
    const array = [];
    for(let i = 0; i < 5; i++){
        array.push(i <= num? 1: 0);
    }
    return array;
}
function http(url,callback){
    wx.request({
        url: url,
        method:'GET',
        header:{
            "Content-type":"application/json"
        },
        success: res => {
            callback(res.data);
        },
        fail: error => {
            console.log(error)
        }
    })
}

function convertToCastString(casts) {
    var castsjoin = "";
    for (var idx in casts) {
        castsjoin = castsjoin + casts[idx].name + " / ";
    }
    return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
    var castsArray = []
    for (var idx in casts) {
        var cast = {
            img: casts[idx].avatars ? casts[idx].avatars.large : "",
            name: casts[idx].name
        }
        castsArray.push(cast);
    }
    return castsArray;
}

module.exports = {
    convertToStarsArray: convertToStarsArray,
    http: http,
    convertToCastString:convertToCastString,
    convertToCastInfos:convertToCastInfos
}