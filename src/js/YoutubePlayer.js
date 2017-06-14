import Heartbeat from 'meister-heartbeat';
import { qualityToKbps, kbpsToQuality } from './utils/qualityToKbps';

class YoutubePlayer extends Meister.PlayerPlugin {
    constructor(config, meister) {
        super(config, meister);

        this.mediaElement = null;
        this.heartbeat = null;

        // Keep track of all the statuses
        this.isPlaying = false;
        this.playerTime = 0;
        this.videoData = null;

        // We have to wait for the iframe to be ready.
        // The ifrmaeReadyResolve will be called by onIframeReady
        this.iframeReadyPromise = new Promise((resolve) => {
            this.iframeReadyResolve = resolve;
        });

        // We need to manually resize the video element since youtube doesn't support automatic resizing.
        window.addEventListener('resize', this.onResize.bind(this));
    }

    static get pluginName() {
        return 'YoutubePlayer';
    }

    isTypeSupported(type) {
        if (type === 'youtube') {
            return true;
        }

        return false;
    }

    preloadContent() {
        return Promise.resolve();
    }

    load(item) {
        super.load(item);

        this.mediaElement = document.createElement('div');
        this.mediaElement.id = Math.random().toString();

        this.wrapper.appendChild(this.mediaElement);

        this.player = new window.YT.Player(this.mediaElement.id, {
            height: '360',
            width: '640',
            events: {
                onReady: this.onIframeReady.bind(this),
                onStateChange: this.onPlayerStateChange.bind(this),
            },
            playerVars: {
                controls: 0,
                autoplay: 1,
                modestbranding: 0,
                rel: 0,
                showinfo: 0,
            },
        });

        // We have to wait for the iframe to be ready.
        // The ifrmaeReadyResolve will be called by onIframeReady
        this.iframeReadyPromise = new Promise((resolve) => {
            this.iframeReadyResolve = resolve;
        });

        // this.meister.trigger('playerCreated');
    }

    unload() {
        this.player = null;
        this.isPlaying = false;
        this.playerTime = 0;
        this.videoData = null;
        this.heartbeat.kill();
        this.heartbeat = null;
        this.mediaElement = null;
    }

    pause() {
        if (!this.player && !this.player.pauseVideo) return;
        this.player.pauseVideo();

        // Unmute the heartbeat to continue the timeupdate.
        if (this.heartbeat) this.heartbeat.mute();
    }

    play() {
        if (!this.player || !this.player.playVideo) return;

        // Mute the heartbeat so timeupdates will not occur.
        if (this.heartbeat) this.heartbeat.unmute();
        this.player.playVideo();
    }

    onIframeReady(event) {
        this.iframeReadyResolve();

        this.heartbeat = new Heartbeat(0.2);
        this.heartbeat.beat(event => this.onHeartbeat(event));

        this.meister.trigger('itemTimeInfo', {
            isLive: false,
            duration: this.duration,
        });

        this.on('requestBitrate', this.onRequestBitrate.bind(this));

        this.onResize();
        this.meister.trigger('playerCreated');
    }

    onPlayerStateChange(event) {
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

            this.videoQualitys = qualityToKbps(this.videoQualitys);
            this.videoQualitys.forEach((bitrate, index) => this.bitrates.push({ bitrate, index }));

            const currentBitrate = qualityToKbps([this.player.getPlaybackQuality()])[0];
            const currentBitrateIndex = this.bitrates.findIndex(item => currentBitrate === item.bitrate);

            this.meister.trigger('itemMetadata', this.videoData);
            this.meister.trigger('itemBitrates', {
                bitrates: this.bitrates,
                currentIndex: currentBitrateIndex,
            });
        }
    }

    onRequestBitrate(event) {
        const bitrateItem = this.bitrates.find(bitrate => bitrate.index === event.bitrateIndex);
        const quality = kbpsToQuality(bitrateItem.bitrate);

        this.player.setPlaybackQuality(quality);
    }

    onHeartbeat(event) {
        this.playerTime = this.player.getCurrentTime();
        this.meister.trigger('_playerTimeUpdate');
    }

    onResize() {
        let width = this.meister.container.offsetWidth;
        let height = this.meister.container.offsetHeight;

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

    set currentSrc(url) {
        if (!this.player) return;

        this.iframeReadyPromise.then(() => {
            if (url.startsWith('http')) {
                console.error('Please insert a Youtube ID');
            } else {
                this.player.loadVideoById(url);
            }
        });
    }

    get playing() {
        return this.isPlaying;
    }

    get currentTime() {
        return this.playerTime;
    }

    set currentTime(time) {
        this.player.seekTo(time);
    }

    get duration() {
        if (!this.player || !this.player.getDuration) return;
        return this.player.getDuration();
    }

    get volume() {
        return this.player.getVolume() / 100;
    }

    set volume(volume) {
        if (!this.player) return;

        this.player.setVolume(volume * 100);
        this.meister.trigger('playerVolumeChange');
    }

    get muted() {
        return this.player.isMuted();
    }

    set muted(mute) {
        if (mute) {
            this.player.mute();
        } else {
            this.player.unMute();
        }
    }
}

Meister.registerPlugin(YoutubePlayer.pluginName, YoutubePlayer);

export default YoutubePlayer;
