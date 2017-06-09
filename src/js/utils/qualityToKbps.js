const mapping = {
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
    auto: 0,
};

export function qualityToKbps(qualitys) {
    return qualitys.map(quality => mapping[quality]);
}

export function kbpsToQuality(kbps) {
    return Object.keys(mapping).find(quality => mapping[quality] === kbps);
}
