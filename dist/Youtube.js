module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YoutubePlayer = exports.Youtube = undefined;

var _Youtube = __webpack_require__(3);

var _Youtube2 = _interopRequireDefault(_Youtube);

var _YoutubePlayer = __webpack_require__(4);

var _YoutubePlayer2 = _interopRequireDefault(_YoutubePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Youtube = _Youtube2.default;
exports.YoutubePlayer = _YoutubePlayer2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HeartBeat = function () {
    function HeartBeat(beatsPerS) {
        var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _classCallCheck(this, HeartBeat);

        this.intervalTime = Number.isFinite(beatsPerS) ? beatsPerS * 1000 : 5000;
        this.debug = debug;

        this.shouldCallCallback = true;

        this.lastBeat = 0;
        this.intervalId = 0;
    }

    _createClass(HeartBeat, [{
        key: 'beat',
        value: function beat() {
            var _this = this;

            var onBeat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

            if (this.intervalId) {
                if (this.debug) {
                    console.log('Removing previous interval');
                }
                clearInterval(this.intervalId);
            }

            // Interval starts firing at the end of the interval, so previous beat would have been now
            this.lastBeat = Date.now();

            this.intervalId = setInterval(function () {
                var now = Date.now();
                var timeSinceLastBeat = now - _this.lastBeat;

                _this.lastBeat = now;

                if (_this.shouldCallCallback) {
                    onBeat(timeSinceLastBeat);
                }
            }, this.intervalTime);
        }
    }, {
        key: 'mute',
        value: function mute() {
            this.shouldCallCallback = false;
        }
    }, {
        key: 'unmute',
        value: function unmute() {
            this.shouldCallCallback = true;
        }
    }, {
        key: 'kill',
        value: function kill() {
            clearInterval(this.intervalId);
        }
    }]);

    return HeartBeat;
}();

exports.default = HeartBeat;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var promiseScriptLoader = function scriptLoader(url) {
    return new Promise(function (resolve, reject) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.async = true;
        script.addEventListener("load", resolve);
        script.addEventListener("error", reject);
        document.body.appendChild(script);
    });
};

exports.default = promiseScriptLoader;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _promiseScriptLoader = __webpack_require__(2);

var _promiseScriptLoader2 = _interopRequireDefault(_promiseScriptLoader);

var _package = __webpack_require__(6);

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Youtube = function (_Meister$MediaPlugin) {
    _inherits(Youtube, _Meister$MediaPlugin);

    function Youtube(config, meister) {
        _classCallCheck(this, Youtube);

        var _this = _possibleConstructorReturn(this, (Youtube.__proto__ || Object.getPrototypeOf(Youtube)).call(this, config, meister));

        _this.player = null;
        (0, _promiseScriptLoader2.default)(config.scriptUrl || 'https://www.youtube.com/player_api');

        // Thanks Google..
        _this.onYoutubeApiReadyPromise = new Promise(function (resolve) {
            _this.youtubeApiReadyResolve = resolve;
        });

        window.onYouTubePlayerAPIReady = function () {
            _this.youtubeApiReadyResolve();
        };
        return _this;
    }

    _createClass(Youtube, [{
        key: 'isItemSupported',
        value: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(item) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(item.type !== 'youtube')) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt('return', {
                                    supported: false,
                                    errorCode: Meister.ErrorCodes.WRONG_TYPE
                                });

                            case 2:
                                return _context.abrupt('return', {
                                    supported: true
                                });

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function isItemSupported(_x) {
                return _ref.apply(this, arguments);
            }

            return isItemSupported;
        }()
    }, {
        key: 'process',
        value: function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(item) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.onYoutubeApiReadyPromise;

                            case 2:

                                this.player = this.meister.getPlayerByType('youtube', item);

                                return _context2.abrupt('return', item);

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function process(_x2) {
                return _ref2.apply(this, arguments);
            }

            return process;
        }()
    }, {
        key: 'load',
        value: function load(item) {
            _get(Youtube.prototype.__proto__ || Object.getPrototypeOf(Youtube.prototype), 'load', this).call(this, item);

            this.on('_playerTimeUpdate', this._onPlayerTimeUpdate.bind(this));
            this.on('requestSeek', this.onRequestSeek.bind(this));

            this.player.currentSrc = item.src;
        }
    }, {
        key: '_onPlayerTimeUpdate',
        value: function _onPlayerTimeUpdate() {
            this.meister.trigger('playerTimeUpdate', {
                currentTime: this.meister.currentTime,
                duration: this.meister.duration
            });
        }
    }, {
        key: 'onRequestSeek',
        value: function onRequestSeek(e) {
            var targetTime = void 0;

            if (!isNaN(e.relativePosition)) {
                targetTime = e.relativePosition * this.meister.duration;
            } else if (!isNaN(e.timeOffset)) {
                targetTime = this.meister.currentTime + e.timeOffset;
            }

            // Check whether we are allowed to seek forward.
            if (this.blockSeekForward && targetTime > this.meister.currentTime) {
                return;
            }

            if (Number.isFinite(targetTime)) {
                this.meister.currentTime = targetTime;
            }
        }
    }], [{
        key: 'pluginName',
        get: function get() {
            return 'Youtube';
        }
    }, {
        key: 'pluginVersion',
        get: function get() {
            return _package2.default.version;
        }
    }]);

    return Youtube;
}(Meister.MediaPlugin);

Meister.registerPlugin(Youtube.pluginName, Youtube);

exports.default = Youtube;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _meisterHeartbeat = __webpack_require__(1);

var _meisterHeartbeat2 = _interopRequireDefault(_meisterHeartbeat);

var _qualityToKbps = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YoutubePlayer = function (_Meister$PlayerPlugin) {
    _inherits(YoutubePlayer, _Meister$PlayerPlugin);

    function YoutubePlayer(config, meister) {
        _classCallCheck(this, YoutubePlayer);

        var _this = _possibleConstructorReturn(this, (YoutubePlayer.__proto__ || Object.getPrototypeOf(YoutubePlayer)).call(this, config, meister));

        _this.mediaElement = null;
        _this.heartbeat = null;

        // Keep track of all the statuses
        _this.isPlaying = false;
        _this.playerTime = 0;
        _this.videoData = null;

        // We have to wait for the iframe to be ready.
        // The ifrmaeReadyResolve will be called by onIframeReady
        _this.iframeReadyPromise = new Promise(function (resolve) {
            _this.iframeReadyResolve = resolve;
        });

        // We need to manually resize the video element since youtube doesn't support automatic resizing.
        window.addEventListener('resize', _this.onResize.bind(_this));
        return _this;
    }

    _createClass(YoutubePlayer, [{
        key: 'isTypeSupported',
        value: function isTypeSupported(type) {
            if (type === 'youtube') {
                return true;
            }

            return false;
        }
    }, {
        key: 'preloadContent',
        value: function preloadContent() {
            return Promise.resolve();
        }
    }, {
        key: 'load',
        value: function load(item) {
            var _this2 = this;

            _get(YoutubePlayer.prototype.__proto__ || Object.getPrototypeOf(YoutubePlayer.prototype), 'load', this).call(this, item);

            this.mediaElement = document.createElement('div');
            this.mediaElement.id = Math.random().toString();

            this.wrapper.appendChild(this.mediaElement);

            this.player = new window.YT.Player(this.mediaElement.id, {
                height: '360',
                width: '640',
                events: {
                    onReady: this.onIframeReady.bind(this),
                    onStateChange: this.onPlayerStateChange.bind(this)
                },
                playerVars: {
                    controls: 0,
                    autoplay: 1,
                    modestbranding: 0,
                    rel: 0,
                    showinfo: 0
                }
            });

            // We have to wait for the iframe to be ready.
            // The ifrmaeReadyResolve will be called by onIframeReady
            this.iframeReadyPromise = new Promise(function (resolve) {
                _this2.iframeReadyResolve = resolve;
            });

            // this.meister.trigger('playerCreated');
        }
    }, {
        key: 'unload',
        value: function unload() {
            this.player = null;
            this.isPlaying = false;
            this.playerTime = 0;
            this.videoData = null;
            this.heartbeat.kill();
            this.heartbeat = null;
            this.mediaElement = null;
        }
    }, {
        key: 'pause',
        value: function pause() {
            if (!this.player && !this.player.pauseVideo) return;
            this.player.pauseVideo();

            // Unmute the heartbeat to continue the timeupdate.
            if (this.heartbeat) this.heartbeat.mute();
        }
    }, {
        key: 'play',
        value: function play() {
            if (!this.player || !this.player.playVideo) return;

            // Mute the heartbeat so timeupdates will not occur.
            if (this.heartbeat) this.heartbeat.unmute();
            this.player.playVideo();
        }
    }, {
        key: 'onIframeReady',
        value: function onIframeReady(event) {
            var _this3 = this;

            this.iframeReadyResolve();

            this.heartbeat = new _meisterHeartbeat2.default(0.2);
            this.heartbeat.beat(function (event) {
                return _this3.onHeartbeat(event);
            });

            this.meister.trigger('itemTimeInfo', {
                isLive: false,
                duration: this.duration
            });

            this.on('requestBitrate', this.onRequestBitrate.bind(this));

            this.onResize();
            this.meister.trigger('playerCreated');
        }
    }, {
        key: 'onPlayerStateChange',
        value: function onPlayerStateChange(event) {
            var _this4 = this;

            if (event.data === window.YT.PlayerState.PLAYING) {
                this.isPlaying = true;
                this.meister.trigger('playerPlay');
            } else if (event.data === window.YT.PlayerState.ENDED) {
                this.isPlaying = false;
                this.shouldTriggerReplay = true;
                this.meister.trigger('playerEnd');
            } else if (event.data === window.YT.PlayerState.PAUSED) {
                this.isPlaying = false;
                this.meister.trigger('playerPause');
            }

            // Parse all the metadata that are available.
            if (!this.videoData && this.player.getVideoData().title !== '') {
                this.videoData = this.player.getVideoData();
                this.videoQualitys = this.player.getAvailableQualityLevels();

                this.bitrates = [];

                this.videoQualitys = (0, _qualityToKbps.qualityToKbps)(this.videoQualitys);
                this.videoQualitys.forEach(function (bitrate, index) {
                    return _this4.bitrates.push({ bitrate: bitrate, index: index });
                });

                var currentBitrate = (0, _qualityToKbps.qualityToKbps)([this.player.getPlaybackQuality()])[0];
                var currentBitrateIndex = this.bitrates.findIndex(function (item) {
                    return currentBitrate === item.bitrate;
                });

                this.meister.trigger('itemMetadata', this.videoData);
                this.meister.trigger('itemBitrates', {
                    bitrates: this.bitrates,
                    currentIndex: currentBitrateIndex
                });
            }
        }
    }, {
        key: 'onRequestBitrate',
        value: function onRequestBitrate(event) {
            var bitrateItem = this.bitrates.find(function (bitrate) {
                return bitrate.index === event.bitrateIndex;
            });
            var quality = (0, _qualityToKbps.kbpsToQuality)(bitrateItem.bitrate);

            this.player.setPlaybackQuality(quality);
        }
    }, {
        key: 'onHeartbeat',
        value: function onHeartbeat(event) {
            this.playerTime = this.player.getCurrentTime();
            this.meister.trigger('_playerTimeUpdate');
        }
    }, {
        key: 'onResize',
        value: function onResize() {
            var width = this.meister.container.offsetWidth;
            var height = this.meister.container.offsetHeight;

            if (document.webkitFullscreenElement) {
                width = window.screen.width;
                height = window.screen.height;
                this.resetNormalModeAfterFullScreen = true;
            } else if (this.resetNormalModeAfterFullScreen) {
                width = this.beforeFullscreenWidth;
                height = this.beforeFullscreenHeight;
                this.resetNormalModeAfterFullScreen = false;
            }

            if (!document.webkitFullscreenElement) {
                this.beforeFullscreenWidth = width;
                this.beforeFullscreenHeight = height;
            }

            if (!this.player) return;

            // Not exactly sure what causes the height to be subtracted with 4
            // But if this is removed, youtube will add a few pixels in height everytime you resize.
            this.player.setSize(width, height - 4);
        }
    }, {
        key: 'currentSrc',
        set: function set(url) {
            var _this5 = this;

            if (!this.player) return;

            this.iframeReadyPromise.then(function () {
                if (url.startsWith('http')) {
                    console.error('Please insert a Youtube ID');
                } else {
                    _this5.player.loadVideoById(url);
                }
            });
        }
    }, {
        key: 'playing',
        get: function get() {
            return this.isPlaying;
        }
    }, {
        key: 'currentTime',
        get: function get() {
            return this.playerTime;
        },
        set: function set(time) {
            this.player.seekTo(time);
        }
    }, {
        key: 'duration',
        get: function get() {
            if (!this.player || !this.player.getDuration) return;
            return this.player.getDuration();
        }
    }, {
        key: 'volume',
        get: function get() {
            return this.player.getVolume() / 100;
        },
        set: function set(volume) {
            if (!this.player) return;

            this.player.setVolume(volume * 100);
            this.meister.trigger('playerVolumeChange');
        }
    }, {
        key: 'muted',
        get: function get() {
            return this.player.isMuted();
        },
        set: function set(mute) {
            if (mute) {
                this.player.mute();
            } else {
                this.player.unMute();
            }
        }
    }], [{
        key: 'pluginName',
        get: function get() {
            return 'YoutubePlayer';
        }
    }]);

    return YoutubePlayer;
}(Meister.PlayerPlugin);

Meister.registerPlugin(YoutubePlayer.pluginName, YoutubePlayer);

exports.default = YoutubePlayer;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.qualityToKbps = qualityToKbps;
exports.kbpsToQuality = kbpsToQuality;
var mapping = {
    // Unknown high resolution
    highres: 100000000,

    // 2160p
    hd2160: 35000000,

    // 1440p
    hd1440: 16000000,

    // 1080p
    hd1080: 8000000,

    // 720p
    hd720: 5000000,

    // 480p
    large: 2500000,

    // 360p
    medium: 1000000,

    // 240p
    small: 400000,

    // 144p
    tiny: 80000,

    // Auto
    auto: 0
};

function qualityToKbps(qualitys) {
    return qualitys.map(function (quality) {
        return mapping[quality];
    });
}

function kbpsToQuality(kbps) {
    return Object.keys(mapping).find(function (quality) {
        return mapping[quality] === kbps;
    });
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {
	"name": "@npm-wearetriple/meister-plugin-youtube",
	"version": "5.1.0",
	"description": "Meister plugin for playing Youtube videos",
	"main": "dist/Hls.js",
	"keywords": [
		"meister",
		"video",
		"plugin"
	],
	"repository": {
		"type": "git",
		"url": "https://github.com/meisterplayer/media-youtube.git"
	},
	"author": "Triple",
	"license": "Apache-2.0",
	"dependencies": {
		"meister-heartbeat": "^1.0.2",
		"promise-script-loader": "^0.1.3"
	},
	"devDependencies": {
		"meister-js-dev": "^3.1.0",
		"meister-gulp-webpack-tasks": "^1.0.6",
		"babel-preset-es2015": "^6.24.0",
		"babel-preset-es2017": "^6.22.0",
		"gulp": "^3.9.1"
	}
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
//# sourceMappingURL=Youtube.js.map