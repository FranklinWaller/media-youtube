import scriptLoader from 'promise-script-loader';
import packageJson from '../../package.json';

class Youtube extends Meister.MediaPlugin {
    constructor(config, meister) {
        super(config, meister);

        this.player = null;
        scriptLoader(config.scriptUrl || 'https://www.youtube.com/player_api');

        // Thanks Google..
        this.onYoutubeApiReadyPromise = new Promise((resolve) => {
            this.youtubeApiReadyResolve = resolve;
        });

        window.onYouTubePlayerAPIReady = () => {
            this.youtubeApiReadyResolve();
        };
    }

    static get pluginName() {
        return 'Youtube';
    }

    static get pluginVersion() {
        return packageJson.version;
    }

    async isItemSupported(item) {
        if (item.type !== 'youtube') {
            return {
                supported: false,
                errorCode: Meister.ErrorCodes.WRONG_TYPE,
            };
        }

        return {
            supported: true,
        };
    }

    async process(item) {
        await this.onYoutubeApiReadyPromise;

        this.player = this.meister.getPlayerByType('youtube', item);

        return item;
    }

    load(item) {
        super.load(item);

        this.on('_playerTimeUpdate', this._onPlayerTimeUpdate.bind(this));
        this.on('requestSeek', this.onRequestSeek.bind(this));

        this.player.currentSrc = item.src;
    }

    get duration() {
        if (!this.player) { return NaN; }

        return this.player.duration;
    }

    get currentTime() {
        if (!this.player) { return NaN; }

        return this.player.currentTime;
    }

    set currentTime(time) {
        if (!this.player) { return; }

        this.player.currentTime = time;
    }


    _onPlayerTimeUpdate() {
        this.meister.trigger('playerTimeUpdate', {
            currentTime: this.player.currentTime,
            duration: this.player.duration,
        });
    }

    onRequestSeek(e) {
        let targetTime;

        if (!isNaN(e.relativePosition)) {
            targetTime = e.relativePosition * this.player.duration;
        } else if (!isNaN(e.timeOffset)) {
            targetTime = this.player.currentTime + e.timeOffset;
        }

        // Check whether we are allowed to seek forward.
        if (this.blockSeekForward && targetTime > this.player.currentTime) { return; }

        if (Number.isFinite(targetTime)) {
            this.player.currentTime = targetTime;
        }
    }
}

Meister.registerPlugin(Youtube.pluginName, Youtube);

export default Youtube;
