const declensions = {
  sentense: ['предложение', 'предложения', 'предложений'],
  word: ['слово', 'слова', 'слов'],
  character: ['знак', 'знака', 'знаков'],
};

export const getWordDeclension = (number, type) => {
  let result;
  let count;
  count = number % 100;

  if (count >= 5 && count <= 20) {
    result = declensions[type]['2'];
  } else {
    count %= 10;
    if (count === 1) {
      result = declensions[type]['0'];
    } else if (count >= 2 && count <= 4) {
      result = declensions[type]['1'];
    } else {
      result = declensions[type]['2'];
    }
  }
  return result;
};
