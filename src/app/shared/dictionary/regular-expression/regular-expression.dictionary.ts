export const RegularExpression = {
  onlyNumbers: /^\d+$/,
  onlyNumbersAndLetters: /[a-zA-ZñÑá-úÁ-Ú-Z0-9 ]+(\s\w+)*$/i,
  onlyNumbersAndTwoDecimals: /^\d*[.,]?\d{0,2}$/g,
  onlyNumbersAndLettersHypenAndSlash: /[a-zA-ZñÑá-úÁ-Ú-Z0-9 ]+(\s\w+)*$/i,
  onlyNumbersAndLettersUppercase: /^[A-Z0-9]+$/,
  replaceDotOnString: /\./g,
};
