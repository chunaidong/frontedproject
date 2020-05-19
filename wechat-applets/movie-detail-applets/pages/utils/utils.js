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

module.exports = {
    convertToStarsArray: convertToStarsArray,
    http: http
}