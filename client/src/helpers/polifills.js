/* eslint-disable no-bitwise */
/* eslint-disable operator-assignment */
/* eslint-disable no-extend-native */
if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
    targetLength = targetLength >> 0;
    padString = String(padString || ' ');
    if (this.length > targetLength) {
      return String(this);
    }
    targetLength -= this.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length);
    }
    return padString.slice(0, targetLength) + String(this);
  };
}
