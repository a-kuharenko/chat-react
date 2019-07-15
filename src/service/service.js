const getNewId = () => (new Date()).getTime();

function toFormatDate(date){
    return date.toJSON().replace(/T/, ' ').replace(/\..{4}/, '');
}

export {
    getNewId, 
    toFormatDate
};