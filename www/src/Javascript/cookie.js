/**
 * Created by zhouzixing on 2016-09-30.
 */
(function () {
    function Cookie() {
        // 获取单值cookie
        this.get = function(name) {
            var start = document.cookie.indexOf(encodeURIComponent(name)) ;
            var end = document.cookie.indexOf(';', start) ;
            if(end == -1) {
                end = document.cookie.length;
            }
            return decodeURIComponent(document.cookie.substring(start+name.length+1,end));
        };

        // 设置单值cookie
        this.set = function(name, value, expires, path, domain, secure) {
            var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
            // 设置默认过期时间为七天
            if(expires == undefined) {
                var date = new Date();
                date.setTime(date.getTime() + 7*24*60*60*1000);
                expires = date ;
            }
            if(expires instanceof Date) {
                cookieText += "; expires=" + expires.toGMTString();
            }
            if(path != undefined) {
                cookieText += "; path=" + path;
            }
            if(domain != undefined) {
                cookieText += "; domain" + domain;
            }
            if(secure != undefined) {
                cookieText += "; secure";
            }
            document.cookie = cookieText;
        };

        // 清除单值cookie
        this.unset = function(name, path, domain, secure) {
            this.set(name, '', new Date(0), path, domain, secure );
        };

        // 设置多值cookie
        this.setAll = function(name, subCookies, expires, path, domain, secure) {
            var cookieText = ";" + encodeURIComponent(name) + "=",
                arr = new Array();
            for(var attr in subCookies) {
                arr.push([encodeURIComponent(attr)] + ":" + encodeURIComponent(subCookies[attr]));
            }
            this.set(name, arr.join('&'), expires, path, domain, secure);
        };

        // 获取多值cookie
        this.getAll = function(name) {
            var obj = {};
            var arr = this.get(name).split('&');
            for(var i = 0, len = arr.length; i < len; i++) {
                var tmpArr = arr[i].split(':');
                obj[decodeURIComponent(tmpArr[0])] = decodeURIComponent(tmpArr[1]);
            }
            return obj;
        };

        // 获取多值cookie的子cookie
        this.getSub = function(name, subname) {
            var obj = this.getAll(name);
            return obj[subname];
        };

        // 清除指定的多值cookie
        this.unsetAll = function(name,path,domain,secure) {
            this.unset(name, '', new Date(0), path, domain, secure);
        };

        // 清除指定多值cookie的子cookie
        this.unsetSub = function(name, subname,path, domain, secure) {
            var obj = this.getAll(name);
            delete obj[subname];
            this.setAll(name, obj, null, path, domain, secure);
        };
    };
    $.extend({
        cookie : new Cookie()
    })
})();