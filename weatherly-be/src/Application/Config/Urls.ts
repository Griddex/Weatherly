module.exports = (name: string, q: string) => {
  const { APPID, APPBASEURL } = process.env;

  return `${APPBASEURL}/${name}?q=${q}&appid=${APPID}`;
};
