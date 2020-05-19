function convertToStarsArray(stars) {
    const num = stars.toString().substring(0,1);
    const array = [];
    for(let i = 0; i < 5; i++){
        array.push(i <= num? 1: 0);
    }
    return array;
}

module.exports = {
    convertToStarsArray: convertToStarsArray
}