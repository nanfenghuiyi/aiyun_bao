/**
 * Created by keyC on 2019/12/28.
 */

  /**
   * IP 配置
   * @type {string}
   */
  
  let server1 = ""
  let server2 = ""
  let server3 = ""
  if (window.location.host == 'aybapi.a56999.com' || window.location.host == 'static.a56999.com') {
    server1 = "https://aybapi.a56999.com/";
    server2 = "https://static.a56999.com/";
    server3 = "https://src.a56999.com/";
  } else {
    server1 = "http://sit.aybapi.a56999.com/";
    server2 = "http://sit.static.a56999.com/";
    server3 = "http://sit.src.a56999.com/";
  }

  let ip1 = server1 + "Web/";
  let ip2 = server1 + "Tool/";
  let ip3 = server1 + "Common/";

const user_id = "3e4414e6-f287-4d6b-b194-4cb1624e8627";

  /**
   * 分享相关接口
   */
  //获取我的分享二维码
const getShareQR = ip1 + "Share/getQRCode";
  //获取我的分享信息
const getShareContent = ip1 + "Share/getShareContent";
  //获取我的推荐人数
const getRecommendDetail = ip1 + "Share/getRecommendDetail";
  //分享链接注册获取图片验证码
const getShareLinkImgCode = ip3 + "getImgCode";
  //分享链接注册检测图片验证码
const getShareLinkCheckImgCode = ip3 + "checkImgCode";
  //分享链接注册获取短信验证码
const getShareLinkSmsCode = ip3 + "getSmsCode";
  //分享链接注册检测短信验证码
const getShareLinkCheckSmsCode = ip3 + "checkSmsCode";
  //分享链接注册账户检测手机号
const getShareLinkCheckPhone = ip3 + "validatePhone";
  //分享链接注册账户
const getShareLinkRegister = ip3 + "register";
  //分享链接下载地址
const downloadUrl = ip1 + "WebShare/downloadUrl";

  /**
   * 钱包相关接口
   */
//获取钱包消息详情
const getPropertyDetail = ip1 + "Common/getPropertyDetail";
//获取支付结果详情
const getPayResult = ip1 + "Pay/orderQuery";

/**
   * 支付相关接口
   */
//获取账单信息
const getPayInfo = ip1 + "Pay/getPayInfo";
//下单
const unifiedOrder = ip1 + "Pay/unifiedOrder";
//获取预估价格详情
const getDetailEstimateInfo = ip1 + "PriceDescription/getDetailEstimateInfo";
//获取价格配置详情
const getPriceConfig = ip1 + "PriceDescription/getPriceConfig";


  /**
   * 认证相关接口
   */
  //上传认证图片
const uploadPicture = ip2 + "upload";
  //获取乘客实名认证
const getPassengerRealNameInfo = ip1 + "Certification/getPassengerRealNameInfo";
  //提交乘客实名认证
const submitPassengerRealNameInfo = ip1 + "Certification/passenger";
  //获取司机快车认证信息
const getExpressDriverInfo = ip1 + "Certification/getExpressDriverInfo";
  //提交司机快车认证
const submitExpressDriver = ip1 + "Certification/expressDriver";
  //获取司机出租车认证信息
const getTaxiDriverInfo = ip1 + "Certification/getTaxiDriverInfo";
  //提交司机出租车认证
const submitTaxiDriver = ip1 + "Certification/taxiDriver";
  //获取大巴车管理者认证
const getBusManagerInfo = ip1 + "Certification/getBusManagerInfo";
  //提交大巴车管理者认证
const submitBusManager = ip1 + "Certification/busManager";
  //获取大巴车认证
const getBusInfo = ip1 + "Bus/getBusInfo";
  //提交大巴车认证
const submitBusInfo = ip1 + "Bus/addBus";
  //获取大巴车类型
const getBusType = ip2 + "getBusType";
  //获取大巴车雇员认证
const getBusEmployees = ip1 + "Bus/getEmployeeInfo";
  //检查大巴车雇员是否被添加
const checkUserExist = ip1 + "Bus/checkUserExist";
  //更新大巴车雇员信息
const updateEmployeeInfo = ip1 + "Bus/updateEmployeeInfo";
  //获取大巴车雇员信息
const getEmployeesInfo = ip1 + "Bus/getEmployeeSelfInfo";
  //提交大巴车雇员类型
const submitBusEmployees = ip1 + "Bus/addEmployee";

  /**
   * 评价相关接口
   */

  /**
   * 地址相关接口
   */
  //获取省
const getProvinces = ip2 + "getProvinces";
  //获取城市
const getCities = ip2 + "getCities";
  //获取区县
const getAds = ip2 + "getAds";

  /**
   * 大巴车快速认证相关接口
   */
  //获取快速上传状态
const getUploaderStatus = ip1 + "BusUploader/getUploaderStatus";
  //快速上传名片获取负责城市
const getUploaderCity = ip1 + "BusUploader/uploaderCity";
  //快速上传名片
const uploadInfo = ip1 + "BusUploader/uploadInfo";
  //快速上传联系信息
const leaveWords = ip1 + "BusUploader/leaveWords";

/**
     * 消息相关接口
     */
//获取大巴车上传记录详情
const getAllUploadedBus = ip1 + "BusUploader/getAllUploadedBus";
//获取重复大巴车上传者信息
const getBusUploaderInfo = ip1 + "BusUploader/getBusUploaderInfo";

  /**
   * 车辆类型
   */
  //获取所有车辆类型
const getAllCarType = ip2 + "getCars";
  //获取车辆对应logo
const carLogo = server3 + "Upload/cars/";

const plateShortList = ["京", "津", "沪", "渝", "黑", "吉", "辽", "甘", "陕", "贵", "云", "川", "晋", "冀", "青",
    "鲁", "豫", "苏", "皖", "浙", "闽", "赣", "湘", "鄂", "粤", "琼", "蒙", "新", "藏", "宁", "桂", "港", "澳"];
const plateletterList = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q",
    "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const color = [{ color: "white", name: "白色" },
  { color: "red", name: "红色" },
  { color: "black", name: "黑色" },
  { color: "silver", name: "银色" },
  { color: "champagne", name: "香槟色" },
  { color: "gray", name: "灰色" },
  { color: "blue", name: "蓝色" },
  { color: "yellow", name: "黄色" },
  { color: "green", name: "绿色" },
  { color: "coffee", name: "咖啡色" },
  { color: "orange", name: "橙色" },
  { color: "other", name: "其他" }];

// 当前地址
let baseUrl = ''

export default {
  server1,
  server2,
  server3,
  baseUrl,
  user_id,
  getShareQR,
  getShareContent,
  getRecommendDetail,
  getShareLinkImgCode,
  getShareLinkCheckImgCode,
  getShareLinkSmsCode,
  getShareLinkCheckSmsCode,
  getShareLinkCheckPhone,
  getShareLinkRegister,
  downloadUrl,
  uploadPicture,
  getPassengerRealNameInfo,
  submitPassengerRealNameInfo,
  getExpressDriverInfo,
  submitExpressDriver,
  getTaxiDriverInfo,
  submitTaxiDriver,
  getBusManagerInfo,
  submitBusManager,
  getBusInfo,
  submitBusInfo,
  getBusType,
  getBusEmployees,
  checkUserExist,
  updateEmployeeInfo,
  getEmployeesInfo,
  submitBusEmployees,
  getProvinces,
  getCities,
  getAds,
  getUploaderStatus,
  getUploaderCity,
  uploadInfo,
  leaveWords,
  getAllCarType,
  carLogo,
  plateShortList,
  plateletterList,
  color,
  getPropertyDetail,
  getPayResult,
  getPayInfo,
  unifiedOrder,
  getDetailEstimateInfo,
  getPriceConfig,
  getAllUploadedBus,
  getBusUploaderInfo
}
