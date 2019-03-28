//提交标志，防止重复提交 woky 2007.04.09
var SubmitFlag = false;

/*******************************************************************************
 * 功能：根据组件下载是否完成，控制进度条 作者：woky 日期：2004.02.26
 ******************************************************************************/
function loadWin(){    
    var userNameVal = getCookieVal("oauser");
    var psdVal = getCookieVal("oapsw");
    if(userNameVal.length>0)
    {
        document.form1.userN.value = userNameVal;
        document.form1.passWs.focus();
    }else{
        document.form1.userN.focus();
    }
}
loadWin();


function changePassword(src){
    var value=src.value;
    if(value!=""){
        value = base_encode64(value);
    }
    return value;
}

function setupDBConfigure(){
    if(document.form1.dbConfigure.value=="false"){
        openDBSetUp();
    }
}

function getCookieVal(sName) {
    var search = sName + "=";
    var returnvalue = "";
    if (document.cookie.length > 0) {
       offset = document.cookie.indexOf(search)
       if (offset != -1) {
          offset += search.length
          end = document.cookie.indexOf(";", offset);
          if (end == -1) end = document.cookie.length;           
          returnvalue=unescape(document.cookie.substring(offset, end))
       }
    }    
    return returnvalue; 
}

function setCookieVal(sName,sValue){
    var toDay = new Date();
    var expDay = toDay.getTime() + (365 * 24 * 60 * 60 * 1000);
    toDay.setTime(expDay);
    document.cookie = sName + "=" + sValue + "; expires=" + toDay.toGMTString();
}

function clearLogin(){
    document.all.passW.value = "";
    document.all.passWs.value = "";
    document.all.userN.value = "";
}

function openNewWin(){
    var widthX = screen.availWidth - 10;
    var heightY = screen.availHeight - 30;
    var r=Math.round(Math.random()*1000);
    window.open("/main/main.jsp", "mainwin"+r,"width="+widthX+",height="+heightY+",top=0,left=0,scrollbars=0,toolbar=0,titlebar=0,menubar=0,status=0,location=0,directories=0,resizable=yes");
    CloseWin();
//window.location.href="/main/main.jsp";
}

// 打开组件下载窗口
function openDownloadWin(){
    var height=window.screen.height-600;
    var width=window.screen.width-560;
    var r=Math.round(Math.random()*1000);
    window.open("../sysform/995/download.jsp?A" + new Date().getTime() + "=" + new Date().getTime(), "download"+r,"width=560,height=600,top="+(height/2)+",left="+(width/2)+",scrollbars=1,toolbar=0,titlebar=0,menubar=0,status=0,location=0,directories=0");
}

function openAboutWin(){
    var height=window.screen.height-350;
    var width=window.screen.width-450;
    var r=Math.round(Math.random()*1000);
    window.showModalDialog("/about.jsp?A" + new Date().getTime() + "=" + new Date().getTime(), "download"+r,"dialogWidth:400px;dialogHeight:296px;dialogTop:"+(height/2)+";dialogLeft:"+(width/2)+";scrollbars:0;toolbar:0;titlebar:0;menubar:0;status:0;location:0;directories:0");
}
 /*Description: 关闭窗口(现在已经改为不通过调用WinContrl组件)
  * Param: srcPage 控制窗口的Title
  * return: 
  * author woky 2004.06.08
  */
  function CloseWin(){
    var ua=navigator.userAgent;
    var ie=navigator.appName=="Microsoft Internet Explorer" ? true : false;
    if(ie) {
        var IEversion=parseFloat(ua.substring(ua.indexOf("MSIE ")+5,ua.indexOf(";",ua.indexOf("MSIE "))))
         if(IEversion< 5.5){
             var str  = '<object id=winClose classid="clsid:ADB880A6-D8FF-11CF-9377-00AA003B7A11">';
            str += '<param name="Command" value="Close"></object>';
            document.body.insertAdjacentHTML("beforeEnd", str);
            document.all.winClose.Click();
         }else{
            window.opener =null;
            window.open('', '_self');    // 在IE7.0下不会弹出提示窗口
            window.close();
         }
    }else{
        window.close()
    }
}

function isIE() {
    var ie = !-[1,]; 
    if(ie) {
        return true;
    }
    else {
        alert("您使用的不是IE浏览器,为了得到更好的体验,请重新使用IE来登录系统！");
        CloseWin();
        return false;
    }
}

function login(event) {
    if(event.keyCode == 13) {
        $('#a_login').click();
    }
}

function next(evt) {
    if(event.keyCode == 13) {
        event.keyCode = 9;
    }
}

// 输完密码后回车，如果有验证码，输入验证码，没验证就提交表单
function pwdKeyDown(event) {
    if(event.keyCode == 13) {
        var validFlag = document.form1.validFlag.value;
        if(validFlag != null && validFlag == '1') {
            event.keyCode = 9;
        }
        else {
            $('#a_login').click();
        }
    }
}

/**
 * 生成验证码
 */
function createValid() {
    SubmitFlag = false;
    var validFlag = document.getElementById('hdn_valid_flag').value;
    if(validFlag == 1) {
        document.getElementById('kaptchaImage').src = '/servlet/Kaptcha?A' + new Date().getTime();
    }
}
createValid();

var base_keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/" + "=";
function base_encode64(input) { 
   input = unicodetoBytes(input); 
   var output = ""; 
   var chr1, chr2, chr3 = ""; 
   var enc1, enc2, enc3, enc4 = ""; 
   var i = 0; 
   do { 
      chr1 = input[i++]; 
      chr2 = input[i++]; 
      chr3 = input[i++]; 
      enc1 = chr1 >> 2; 
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4); 
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6); 
      enc4 = chr3 & 63; 
      if (isNaN(chr2)) { 
         enc3 = enc4 = 64; 
      } else if (isNaN(chr3)) { 
         enc4 = 64; 
      } 
      output = output + 
         base_keyStr.charAt(enc1) + 
         base_keyStr.charAt(enc2) + 
         base_keyStr.charAt(enc3) + 
         base_keyStr.charAt(enc4); 
      chr1 = chr2 = chr3 = ""; 
      enc1 = enc2 = enc3 = enc4 = ""; 
   } while (i < input.length); 
   return output; 
}
function unicodetoBytes(s) 
{ 
    var result=new Array(); 
    if(s==null || s=="") return result; 
    result.push(255); 
    result.push(254); 
    for(var i=0;i<s.length;i++) 
    { 
        var c=s.charCodeAt(i).toString(16); 
        if(c.length==1) c="000"+c; 
        else if(c.length==2) c="00"+c; 
        else if(c.length==3) c="0"+c; 
        var var1=parseInt( c.substring(2),16); 
        var var2=parseInt( c.substring(0,2),16); 
        result.push( var1);
        result.push(var2) ; 
    } 
    return result; 
} 

$(document).ready(function () {
    $('#a_login').click(function(){
        var userName = document.form1.userN.value;
        var userPwd = document.form1.passWs.value;
        var validFlag = document.form1.validFlag.value;
        var validCode = '';
        try{
            validCode = document.form1.validCode.value;
        }catch(e) {}
        
        if(isIE() && !SubmitFlag){
            SubmitFlag=true;
            if (userName == "") {
                alert("请输入登录用户名！");
                document.form1.userN.focus();
                createValid();
            } 
            else if (userPwd == "") {
                alert("请输入登录密码！");
                document.form1.passWs.focus();
                createValid();
            } 
            else if (validFlag != "" && validFlag == 1 && validCode == "") {
                alert("请输入验证码！");
               // document.form1.passWs.focus();
                document.form1.validCode.focus();
                createValid();
            } 
            else {
                var num= "";
                var loginData = "";
                if(document.form1.isloginKey.value==1) {
                   num = loginKey.getDogNumber();
                   loginData = loginKey.getLoginData();
                }
                setCookieVal("oauser", document.form1.userN.value);
                userPwd = changePassword(document.form1.passWs);
                $.ajax({
                    type : "post",
                    dataType : 'json', 
                    url : '/login/login_valid.jsp?p=' + new Date().getTime() + Math.random(),
                    data: {name : userName, pwd : userPwd, code : validCode, flag : validFlag, key : num, data : loginData},
                    success : function(loginUser) {
                        if (loginUser != null && loginUser.isLogin == 'true' ) {
                            SubmitFlag = true;
                            document.form1.passWs.value = "";
                            openNewWin();
                        }
                        else {
                        	if(loginUser.message=="验证码错误"||loginUser.message=="用户名称或者密码错误，如果连续输入密码错误5次，IP将被锁定!"z){
           
                        		 window.location.href = 'indexVal.jsp'; 
                        	}else{
                        		 window.location.href = 'index.jsp'; 
                        	}
                            alert(loginUser.message);
                           
                        }
                    }
                });
            }
        }
    });
    //重新获取验证码
    $('#kaptchaImage').click(function() {
        createValid();
    });
})
