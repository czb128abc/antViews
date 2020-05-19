/* eslint-disable no-useless-escape */

export const typeUtils = {
  isString(o) {
    // 是否字符串
    return Object.prototype.toString.call(o).slice(8, -1) === 'String';
  },

  isNumber(o) {
    // 是否数字
    return Object.prototype.toString.call(o).slice(8, -1) === 'Number';
  },

  isObj(o) {
    // 是否对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Object';
  },

  isArray(o) {
    // 是否数组
    return Object.prototype.toString.call(o).slice(8, -1) === 'Array';
  },

  isDate(o) {
    // 是否时间
    return Object.prototype.toString.call(o).slice(8, -1) === 'Date';
  },

  isBoolean(o) {
    // 是否boolean
    return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean';
  },

  isFunction(o) {
    // 是否函数
    return Object.prototype.toString.call(o).slice(8, -1) === 'Function';
  },

  isNull(o) {
    // 是否为null
    return Object.prototype.toString.call(o).slice(8, -1) === 'Null';
  },

  isUndefined(o) {
    // 是否undefined
    return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined';
  },

  isFalse(o) {
    if (!o || o === 'null' || o === 'undefined' || o === 'false' || o === 'NaN') return true;
    return false;
  },

  isTrue(o) {
    return !this.isFalse(o);
  },

  isIos() {
    const u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
      // 安卓手机
      // return "Android";
      return false;
    }
    if (u.indexOf('iPhone') > -1) {
      // 苹果手机
      // return "iPhone";
      return true;
    }
    if (u.indexOf('iPad') > -1) {
      // iPad
      // return "iPad";
      return false;
    }
    if (u.indexOf('Windows Phone') > -1) {
      // winphone手机
      // return "Windows Phone";
      return false;
    }
    return false;
  },

  checkStr(str, type) {
    switch (type) {
      case 'phone': // 手机号码
        return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
      case 'tel': // 座机
        return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
      case 'card': // 身份证
        return /^\d{15}|\d{18}$/.test(str);
      case 'pwd': // 密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
        return /^[a-zA-Z]\w{5,17}$/.test(str);
      case 'postal': // 邮政编码
        return /[1-9]\d{5}(?!\d)/.test(str);
      case 'QQ': // QQ号
        return /^[1-9][0-9]{4,9}$/.test(str);
      case 'email': // 邮箱
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
      case 'money': // 金额(小数点2位)
        return /^\d*(?:\.\d{0,2})?$/.test(str);
      case 'URL': // 网址
        return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(
          str,
        );
      case 'IP': // IP
        return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(
          str,
        );
      case 'date': // 日期时间
        return (
          /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) ||
          /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
        );
      case 'number': // 数字
        return /^[0-9]$/.test(str);
      case 'english': // 英文
        return /^[a-zA-Z]+$/.test(str);
      case 'chinese': // 中文
        return /^[\u4E00-\u9FA5]+$/.test(str);
      case 'lower': // 小写
        return /^[a-z]+$/.test(str);
      case 'upper': // 大写
        return /^[A-Z]+$/.test(str);
      case 'HTML': // HTML标记
        return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
      default:
        return true;
    }
  },
};
