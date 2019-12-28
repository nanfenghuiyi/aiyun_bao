/**
 * 压缩图片
 * @param path
 */
function canvasDataURL(path, callback) {
  var img = new Image();
  img.src = path;
  img.onload = function () {
    var that = this;
    // 默认按比例压缩
    var w = that.width,
      h = that.height,
      scale = w / h;
    h = (w / scale);
    var quality = 0.1;  // 默认图片质量为0.7
    //生成canvas
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    // 创建属性节点
    var anw = document.createAttribute("width");
    anw.nodeValue = w;
    var anh = document.createAttribute("height");
    anh.nodeValue = h;
    canvas.setAttributeNode(anw);
    canvas.setAttributeNode(anh);
    ctx.drawImage(that, 0, 0, w, h);
    console.log(quality);
    // quality值越小，所绘制出的图像越模糊
    let base64 = canvas.toDataURL('image/jpeg', quality);
    callback(base64);
  };
}

/**
 * 防止键盘把当前输入框给挡住
 */


/**
 * 与当前时间差格式化
 * @param times 目标时间戳字符串
 * @returns {string}
 */
function timeDifference(times) {
  var str = "0";
  if (times > 0) {
    //计算出相差天数
    var days = Math.floor(times / (24 * 3600));
    //计算出小时数
    var leave1 = times % (24 * 3600);   //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600));
    //计算相差分钟数
    var leave2 = leave1 % (3600);   //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60));
    //计算相差秒数
    var leave3 = leave2 % (60); //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3);
    if (days > 0) {
      str = days + "天" + hours + "小时" + minutes + "分钟";
    } else {
      str = hours + "小时" + minutes + "分钟";
    }
  }
  return str;
};


/**
 * 时间格式化
 * @param str 目标时间戳字符串
 * @param mforat 转换格式（"yyyy-MM-dd hh:mm:ss"）
 * @returns {*}
 */
function format(str, format) {
  var date = new Date(str * 1000);
  var o = {
    "M+": date.getMonth() + 1, //month
    "d+": date.getDate(), //day
    "h+": date.getHours(), //hour
    "m+": date.getMinutes(), //minute
    "s+": date.getSeconds(), //second
    "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
    "S": date.getMilliseconds() //millisecond
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
};

/**
 * 替换电话号码或者身份证号码
 * @param str 目标字符串
 * @returns {string}
 */
function number(str) {
  if (str != null && str != "") {
    var string = "";
    if (str.length == 11) {
      string = str.substr(0, 3) + '****' + str.substr(7);
    } else if (str.length == 12) {
      string = str.substr(0, 3) + '****' + str.substr(8);
    } else if (str.length == 18) {
      string = str.substr(0, 4) + '**********' + str.substr(14);
    } else {
      string = str;
    }
    return string;
  } else {
    return ""
  }
};

/**
 * 补全两位小数
 * @param number 目标数字
 * @returns {*}
 */
function formatTwoDecimal(number) {
  if (isNaN(parseFloat(number))) {
    return false;
  }
  let mNumber = Math.round(number * 100) / 100;
  let s_x = mNumber.toString();
  let pos_decimal = s_x.indexOf('.');
  if (pos_decimal < 0) {
    pos_decimal = s_x.length;
    s_x += '.';
  }
  while (s_x.length <= pos_decimal + 2) {
    s_x += '0';
  }
  return s_x;
};

/**
 * 转货币单位
 * @param number 目标数据
 * @param places 小数位数
 * @param symbol 钱币符号
 * @param thousand 分割符号
 * @param decimal 小数点符号
 * @returns {string}
 */
function formatMoney(number, places, symbol, thousand, decimal) {
  number = number || 0;
  places = !isNaN(places = Math.abs(places)) ? places : 2;
  symbol = symbol !== undefined ? symbol : "";
  thousand = thousand || ",";
  decimal = decimal || ".";
  let negative = number < 0 ? "-" : "";
  let i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "";
  let j = i.length > 3 ? i.length % 3 : 0;
  return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};

  //司机身份解析 1 司机， 2 售票员
function getEmployeeTypeStatus(employee_type) {
  if (employee_type != null && employee_type != "") {
    var type = "";
    switch (employee_type) {
      case "1":
        type = "司机";
        break;
      case "2":
        type = "售票员";
        break;
    }
    return type;
  } else {
    return ""
  }
};

  //消息类型格式解析
function getNewsType(type) {
  if (type != null && type != "") {
    var str = "";
    switch (type) {
      case 1:
        str = "支出";
        break;
      case 2:
        str = "收入";
        break;
      case 3:
        str = "退款";
        break;
    }
    return str;
  } else {
    return ""
  }
};
  //消息状态格式解析
function getNewsStatus(status) {
  let str = "";
  switch (status) {
    case 0:
      str = "审核中";
      break;
    case 1:
      str = "成功";
      break;
    case -1:
      str = "失败";
      break;
  }
  return str;
};


  //判断提交的参数是否完整
function detectionParam(json) {
  let str = "";
  if (json != null && json != "") {
    for (let key in json) {
      if (json[key] == "") {
        str = authenInfoDetection(key);
        break;
      }
    }
  }
  return str;
};

  //认证信息提交检查
function authenInfoDetection(text) {
  let str = "";
  switch (text) {
    case "pro_code":
      str = "请选择注册省份";
      break;
    case "pro_name":
      str = "请选择注册省份";
      break;
    case "city_code":
      str = "请选择注册城市";
      break;
    case "city_name":
      str = "请选择注册城市";
      break;
    case "ad_code":
      str = "请选择注册城区";
      break;
    case "ad_name":
      str = "请选择注册城区";
      break;
    case "company_name":
      str = "请输入公司全称";
      break;
    case "name":
      str = "请输入姓名";
      break;
    case "ID":
      str = "请输入身份证号码";
      break;
    case "image_id_a":
      str = "请上传身份证正面照";
      break;
    case "image_id_b":
      str = "请上传身份证背面照";
      break;
    case "image_drivers":
      str = "请上传驾驶证照";
      break;
    case "first_issue":
      str = "请选择首次领驾驶证日期";
      break;
    case "brand":
      str = "请选择注册车辆";
      break;
    case "model":
      str = "请选择注册车辆";
      break;
    case "color":
      str = "请选择注册车辆颜色";
      break;
    case "plate_no_short":
      str = "请选择注册车辆车牌简称";
      break;
    case "plate_no":
      str = "请输入注册车辆车牌号码";
      break;
    case "vehicle_owner":
      str = "请输入注册车辆所有人姓名";
      break;
    case "register_date":
      str = "请选择注册车辆行驶证注册日期";
      break;
    case "image_driving_a":
      str = "请上传行驶证正本照";
      break;
    case "image_driving_b":
      str = "请上传行驶证副本照";
      break;
    case "image_group":
      str = "请上传照片";
      break;
    case "qualification_no":
      str = "请输入服务证编号";
      break;
    case "image_qualification":
      str = "请上传服务证照";
      break;
    case "image":
      str = "请上传照片";
      break;
    case "short_no":
      str = "请选择车牌简称";
      break;
    case "seats":
      str = "请填写核载人数";
      break;
    case "type":
      str = "请填写核载人数";
      break;
    case "unified_social_credit_code":
      str = "请填写企业代码";
      break;
    case "image_enterprise_license":
      str = "请上传企业营业执照照";
      break;
    case "phone":
      str = "请填写联系电话";
      break;
    default: break;
  }
  return str;
};
/**
 * 重复大巴车状态
 * @param status
 */
function repeatType(status) {
  let str = "";
  switch (status) {
    case 1:
      str = "有效";
      break;
    case 2:
      str = "重复";
      break;
    default: break;
  }
  return str;
}

export { //很关键
  canvasDataURL,
  timeDifference,
  format,
  number,
  formatTwoDecimal,
  formatMoney,
  getEmployeeTypeStatus,
  getNewsType,
  getNewsStatus,
  detectionParam,
  authenInfoDetection,
  repeatType
}