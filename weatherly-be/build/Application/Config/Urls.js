"use strict";
module.exports = (name, id) => {
    const { APPID, APPBASEURL } = process.env;
    return `${APPBASEURL}/${name}?id=${id}&appid=${APPID}`;
};
