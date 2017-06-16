Youtube plugin for Meister
=========

This plugins allows youtube videos to be embedded in the meister player. 

Getting started
-----

To get started simply add the ```Youtube: {}``` and ```YoutubePlayer: {}``` to the meister configuration object:

``` JavaScript
var meisterPlayer = new Meister('#player', {
    Youtube: {},
    YoutubePlayer: {},
});

meisterPlayer.setItem({
    src: '_FVgD5KJPyE', //Only youtube ID's are supported
    type: 'youtube'
});
```

