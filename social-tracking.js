/*********************************************************************
 *
 * SocialTrackingJS
 * Analyticsで解析を取れるソーシャルボタンを設置できるJSライブラリ
 * version: 0.1
 * author: yuu@creatorish
 * authro url: http://creatorish.com
 * url: http://creatorish.com/lab/5037
 * 
 * Copyright 2012 creatorish.com. All Rights Reserved.
 * 
 * ga_social_tracking.js
 * buttons using Google Analytics social tracking feature.
 * author: api.nickm@gmail.com (Nick Mihailovski)
 * author: api.petef@gmail.com (Pete Frisella)
 * url: https://code.google.com/p/analytics-api-samples/source/browse/trunk/src/tracking/javascript/v5/social/ga_social_tracking.js?hl=ja
 * 
 * Copyright 2012 Google Inc. All Rights Reserved.
 *
 *********************************************************************/


var SocialTracking = {
	lang: "ja",
	locale: "ja_JP",
	trackId: null,
	appId: null,
	status: true,
	cookie: true,
	xfbml: true,
	domain: location.hostname,
	subdomain: false,
	multidomain: false,
	socialTracking: true,
	position: "foot",
	api: {
		analytics: true,
		facebook: true,
		twitter: true,
		google: true,
		hatena: true,
		pinterest: true
	},
	onload: function() {}
};

var _gaq = _gaq || [];
var _ga = _ga || [];

var SocialTracking = SocialTracking || {};
(function(SocialTracking) {
	var setting = {
		lang: "ja",
		locale: "ja_JP",
		trackid: null,
		appId: null,
		status: true,
		cookie: true,
		xfbml: true,
		domain: location.hostname,
		subdomain: false,
		multidomain: false,
		socialTracking: true,
		position: "foot",
		api: {
			analytics: true,
			facebook: true,
			twitter: true,
			google: true,
			hatena: true,
			pinterest: true
		},
		onload: function() {}
	};
	
	setting = extend(setting,SocialTracking);
	
	var APIS = {
		analytics: ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + ".google-analytics.com/ga.js",
		facebook: "//connect.facebook.net/"+setting.locale+"/all.js",
		twitter: "//platform.twitter.com/widgets.js",
		google: "//apis.google.com/js/plusone.js",
		hatena: "//b.st-hatena.com/js/bookmark_button.js",
		pinterest: "//assets.pinterest.com/js/pinit.js"
	};
	
	var loadedCount = 0;
	var useAPI = [];
	var target;
	if (setting.position === "head") {
		target = document.head;
	} else {
		target = document.body;
	}
	
	function init() {
		if (setting.trackid) {
			_gaq.push(['_setAccount', setting.trackid]);
			if (setting.subdomain || setting.multidomain) {
				_gaq.push(['_setDomainName', setting.domain+'.']);
			}
			if (setting.multidomain) {
				_gaq.push(['_setAllowLinker', true]);
			}
			_gaq.push(['_trackPageview']);
		}
		if (setting.api.google) {
			___gcfg = {lang: setting.lang};
		}
		for (var name in setting.api) {
			if (setting.api[name] === true) {
				useAPI.push(APIS[name]);
			}
		}
		for (var i = 0; i < useAPI.length; i++) {
			loadScript(useAPI[i],loadedScript);
		}
	}
	function extend(obj,extObj) {
		for (var key in extObj) {
			if (typeof(extObj[key]) === "object") {
				extend(obj[key],extObj[key]);
			} else {
				obj[key] = extObj[key];
			}
		}
		return obj;
	}
	function loadScript(src,callback) {
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.async = true;
		s.src = src;
		target.appendChild(s);
		if (callback) {
			s.onload = callback;
			s.onreadystatechange = function(){
				if(this.readyState === "loaded" || this.readyState === "complete"){
					callback(this);
			    }
			};
		}
	}
	function loadedScript(script) {
		script.onload = script.onreadystatechange = null;
		++loadedCount;
		if (loadedCount === useAPI.length) {
			if (setting.socialTracking) {
				setSocialTrackCode();
				if (setting.api.facebook === true) {
					_ga.trackFacebook();
				}
				if (setting.api.twitter === true) {
					_ga.trackTwitter();
				}
			}
			if (setting.api.facebook === true) {
				FB.init({
					appId      : setting.appId, // App ID
					status     : setting.status, // check login status
					cookie     : setting.cookie, // enable cookies to allow the server to access the session
					xfbml      : setting.xfbml  // parse XFBML
				});
			}
			if (setting.onload) {
				setting.onload();
			}
		}
	}
	function setSocialTrackCode() {
		_ga.getSocialActionTrackers_ = function( network, socialAction, opt_target, opt_pagePath) {
			return function() {
				var trackers = _gat._getTrackers();
				for (var i = 0, tracker; tracker = trackers[i]; i++) {
					tracker._trackSocial(network, socialAction, opt_target, opt_pagePath);
				}
			};
		};
		_ga.trackFacebook = function(opt_pagePath) {
			try {
				if (FB && FB.Event && FB.Event.subscribe) {
					FB.Event.subscribe('edge.create', function(opt_target) {
						_gaq.push(_ga.getSocialActionTrackers_('facebook', 'like',opt_target, opt_pagePath));
					});
					FB.Event.subscribe('edge.remove', function(opt_target) {
						_gaq.push(_ga.getSocialActionTrackers_('facebook', 'unlike',opt_target, opt_pagePath));
					});
					FB.Event.subscribe('message.send', function(opt_target) {
						_gaq.push(_ga.getSocialActionTrackers_('facebook', 'send',opt_target, opt_pagePath));
					});
				}
			} catch (e) {
			}
		};
		_ga.trackTwitterHandler_ = function(intent_event, opt_pagePath) {
			var opt_target; //Default value is undefined
			if (intent_event && intent_event.type === 'tweet' || intent_event.type === 'click') {
				if (intent_event.target.nodeName === 'IFRAME') {
					opt_target = _ga.extractParamFromUri_(intent_event.target.src, 'url');
				}
				var socialAction = intent_event.type + ((intent_event.type === 'click') ? '-' + intent_event.region : ''); //append the type of click to action
				_gaq.push(_ga.getSocialActionTrackers_('twitter', socialAction, opt_target, opt_pagePath));
			}
		};
		_ga.trackTwitter = function(opt_pagePath) {
			intent_handler = function(intent_event) {
				_ga.trackTwitterHandler_(intent_event, opt_pagePath);
			};
			twttr.events.bind('click', intent_handler);
			twttr.events.bind('tweet', intent_handler);
		};
		_ga.extractParamFromUri_ = function(uri, paramName) {
			var regex = new RegExp('[\\?&#]' + paramName + '=([^&#]*)');
			var params = regex.exec(uri);
			if (params !== null) {
				return unescape(params[1]);
			}
			return uri;
		};
	}
	init();
})(SocialTracking);