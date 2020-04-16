/* eslint-disable no-useless-escape */
function isZipCode(message = '邮政编码格式不对') {
  return {
    pattern: /^[0-9]{6}$/,
    message,
  };
}

function isLetterOrNumber(message = '只能包括英文字母和数字') {
  return {
    pattern: /^[a-zA-Z0-9]*$/,
    message,
  };
}

function isLegalCode(message = '只能包括英文字母和数字以及()+-/*&#%[];,.') {
  return {
    pattern: /^[A-Za-z0-9\(\)\+\-\/\*\&\#\%\[\]\;\,\.\（\）\／\＊\＆\＃\％\［\］\；\，\．\【\】]*$/,
    message,
  };
}

function isRequireString(message = '不能为空') {
  return {
    required: true,
    transform: value => {
      if (typeof value === 'string') {
        return (value || '').trim();
      }
      return value;
    },
    message,
  };
}

function isLegalString(message = '不能包含非法字符(`~!@^_=<>?"{}\')') {
  return {
    pattern: /^[^`~!@^_=<>?"{}']*$/,
    message,
  };
}

function isLegalNumber(message = '不是一个合法的数字') {
  return {
    pattern: /^[0-9]\d*(.\d+)*$/,
    message,
  };
}
function isNegativeAndPositiveNumber(message = '不是一个合法的正负数') {
  return {
    pattern: /^(-)*[0-9]\d*(.\d+)*$/,
    message,
  };
}

function isIpAddress(message = '不是一个有效的ip地址') {
  return {
    pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
    message,
  };
}

function maxDecimalsLength(len, message) {
  const msg = message === undefined ? `小数最多${len}位(正数)` : message;
  return {
    pattern: new RegExp(String.raw`^\d+(.\d{0,${len}})?$`),
    message: msg,
  };
}

function maxStringLength(maxLen, message) {
  const msg = message === undefined ? `文本长度最多为${maxLen}` : message;
  return { max: maxLen, message: msg };
}

function minStringLength(maxLen, message) {
  const msg = message === undefined ? `文本长度最少为${maxLen}` : message;
  return { max: maxLen, message: msg };
}

const required = { required: true, message: '必填' };

function createRules(...args) {
  return [...args];
}

export default {
  /** 是一个邮政编码 */
  isZipCode,
  /** 只能是字母或数字 */
  isLetterOrNumber,
  /** 是一个合法的编号 */
  isLegalCode,
  /** 不能是一个空字符串 */
  isRequireString,
  /** 是一个合法的字符串 */
  isLegalString,
  /** 是一个合法的数字 */
  isLegalNumber,
  /** 是一个合法的ip 地址  */
  isIpAddress,
  /** 最多几位小数 */
  maxDecimalsLength,
  /** 文本长度最多为x */
  maxStringLength,
  /** 文本长度最少为 */
  minStringLength,
  isNegativeAndPositiveNumber,
  required,
  createRules,
};
