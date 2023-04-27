export default class Utilities {
  getQueryString(options) {
    let queryString = "?";
    for (let key in options) {
      queryString += key + "=" + options[key] + "&";
    }
    return queryString;
  }
}
