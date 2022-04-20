module.exports = (name: string, id: string) => {
  const { APPID, APPBASEURL } = process.env;

  return `${APPBASEURL}/${name}?id=${id}&appid=${APPID}`;
};
