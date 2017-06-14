import scriptLoader from 'promise-script-loader';

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

    _onPlayerTimeUpdate() {
        this.meister.trigger('playerTimeUpdate', {
            currentTime: this.meister.currentTime,
            duration: this.meister.duration,
        });
    }

    onRequestSeek(e) {
        let targetTime;

        if (!isNaN(e.relativePosition)) {
            targetTime = e.relativePosition * this.meister.duration;
        } else if (!isNaN(e.timeOffset)) {
            targetTime = this.meister.currentTime + e.timeOffset;
        }

        // Check whether we are allowed to seek forward.
        if (this.blockSeekForward && targetTime > this.meister.currentTime) { return; }

        if (Number.isFinite(targetTime)) {
            this.meister.currentTime = targetTime;
        }
    }
}

Meister.registerPlugin(Youtube.pluginName, Youtube);

export default Youtube;
