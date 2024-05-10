export const getWindDirection = (degDirection) => {
    let textDirection;

    if (degDirection >= 349 || degDirection <= 11) {
      textDirection = "N";
    } else if (degDirection >= 12 && degDirection <= 33) {
      textDirection = "NNE";
    } else if (degDirection >= 34 && degDirection <= 56) {
      textDirection = "NE";
    } else if (degDirection >= 57 && degDirection <= 78) {
      textDirection = "ENE";
    } else if (degDirection >= 79 && degDirection <= 101) {
      textDirection = "E";
    } else if (degDirection >= 102 && degDirection <= 123) {
      textDirection = "ESE";
    } else if (degDirection >= 124 && degDirection <= 146) {
      textDirection = "SE";
    } else if (degDirection >= 147 && degDirection <= 168) {
      textDirection = "SSE";
    } else if (degDirection >= 169 && degDirection <= 191) {
      textDirection = "S";
    } else if (degDirection >= 192 && degDirection <= 213) {
      textDirection = "SSW";
    } else if (degDirection >= 214 && degDirection <= 236) {
      textDirection = "SW";
    } else if (degDirection >= 237 && degDirection <= 258) {
      textDirection = "WSW";
    } else if (degDirection >= 259 && degDirection <= 281) {
      textDirection = "W";
    } else if (degDirection >= 282 && degDirection <= 303) {
      textDirection = "WNW";
    } else if (degDirection >= 304 && degDirection <= 326) {
      textDirection = "NW";
    } else if (degDirection >= 327 && degDirection <= 348) {
      textDirection = "NNW";
    }

    return textDirection;
  };