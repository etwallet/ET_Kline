let
  //版本
  version = "1.0",
  w = window,
  defaultSite = ['cnzz', 'google'],
  start_time = new Date().getTime(),
  U_COOKIE_KEY = '__fmsid', //userid cookie
  googleId = typeof dataLayer != 'undefined' && typeof dataLayer[1] != 'undefined' && typeof dataLayer[1][1] != 'undefined' ? dataLayer[1][1] : '',
  apiTypes = ['_trackPageview', '_trackEvent', '_setCustomVar', '_setAccount', '_setAutoPageview'];

/**
 * @param  siteConfig array
 */
let kStat = function(siteConfig){
  if(typeof siteConfig != 'object'){
    siteConfig = defaultSite;
  }
  return new kStat.prototype.init(siteConfig);
}

kStat.getStartTime = function(){
  return start_time;
}

kStat.getKUserId = function(){
  return kUserID;
}

kStat.setUid = function(uid){
  kUserID = uid;
}


//用户唯一码，在客户端中是用户手机IMEI码
let kUserID = getUid();

function getApiType(config){
  let k = inArray(config[0], apiTypes);
  (k < 0) && config.splice(0, 0, "_trackEvent");
  return config;
}

//发送链接
function sendStat(url){
  url += (url.indexOf("?") > -1 ? '&_t=' : '?_t=') + new Date().getTime();
  new Image().src = url;
}

//是否有百度统计
function hasBaidu(){
  return typeof w._hmt == 'object';
}
function addBaiduEvent(eventArr){
  let config = getApiType(eventArr.slice(0));
  hasBaidu() && w._hmt.push(config);
}
//是否有站长统计
function hasCnzz(){
  return typeof w._czc == 'object';
}
function addCnzzEvent(eventArr){
  let config = getApiType(eventArr.slice(0));
  hasCnzz() && w._czc.push(config);
}


function addGoogleEvent(eventArr){
  if(!googleId) return ;
  if(inArray(eventArr[0], apiTypes) > -1){//暂时只能发event统计
    eventArr.slice(1);
  }
  //谷歌配置
  let
    tid = googleId,
    cid = kUserID,
    baseUrl = 'https://www.google-analytics.com/collect';
  let
    ec = typeof eventArr[0] != 'undefined' ? eventArr[0] : "",
    ea = typeof eventArr[1] != 'undefined' ? eventArr[1] : "",
    el = typeof eventArr[2] != 'undefined' ? eventArr[2] : "",
    ev = typeof eventArr[3] != 'undefined' ? eventArr[3] : 0;
  let url = baseUrl + '?v=1&tid='+ tid + '&cid='+ cid + '&t=event&ec='+ ec +'&ea=' + ea + '&el=' + el + '&ev=' + ev;
  sendStat(url);
}

function setCookie(name,value,hours){
  let host = w.location.host;
  let topDomain = host.match(/[\w-]+\.[\w]{2,3}$/g); //这个并不能匹配如com.cn的域名，但对我们够用了
  topDomain && (host = topDomain[0]);
  if(arguments.length>2){
    let expireDate=new Date(new Date().getTime()+hours*3600000);
    document.cookie = name + "=" + encodeURIComponent(value) + "; path=/; domain="+host+"; expires=" + expireDate.toGMTString();
  }else{
    document.cookie = name + "=" + encodeURIComponent(value) + "; path=/; domain="+host;
  }
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i=0; i<ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}

function inArray( elem, arr, i ) {
  let len,
    emptyArr = [];
  if ( arr ) {
    if ( emptyArr.indexOf ) {
      return emptyArr.indexOf.call( arr, elem, i );
    }

    len = arr.length;
    i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

    for ( ; i < len; i++ ) {
      // Skip accessing in sparse arrays
      if ( i in arr && arr[ i ] === elem ) {
        return i;
      }
    }
  }
  return -1;
}

//生成uid
function generateUid(len,randStr){
  let randchar=["0","1","2","3","4","5","6","7","8","9",
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
  ];
  let r="";
  let d=new Date();
  for (let i=0;i<len;i++){
    let index=parseInt(Math.random()*Math.pow(10,6))%randchar.length;
    r+=randchar[index];
  }
  if(randStr && randStr==1){
    return r;
  }
  return d.getTime()+r;
}

//获取uid
function getUid(){
  let kuid = getCookie(U_COOKIE_KEY);
  if(!kuid){
    kuid = generateUid(6); //生成用户id
    setCookie(U_COOKIE_KEY, kuid);
  }
  return kuid;
}

//添加前缀
function addPrefix(arr) {
  for(let i = 0 ; i < arr.length ; i++){
    switch (i){
      case 0:
        arr[i] = 'ec_' + arr[i];
        break;
      case 1:
        arr[i] = 'ea_' + arr[i];
        break;
      case 2:
        arr[i] = 'el_' + arr[i];
        break;
    }
  }
  return arr;
}

//获取
kStat.prototype = {
  ver : version,
  siteConfig : [],
  init : function(siteConfig){
    this.siteConfig = siteConfig;
    return this;
  },
  push : function(eventArr, apiType){

    eventArr = addPrefix(eventArr);

    for(let i in this.siteConfig){
      switch (this.siteConfig[i]){
        case 'baidu':
          addBaiduEvent(eventArr, apiType);
          break;
        case 'google':
          addGoogleEvent(eventArr, apiType);
          break;
        case 'cnzz':
          addCnzzEvent(eventArr, apiType);
          break;
      }
    }
  },
  setGoogleId : function(gid){
    googleId = gid;
  }
}

kStat.prototype.init.prototype = kStat.prototype;

export default kStat()