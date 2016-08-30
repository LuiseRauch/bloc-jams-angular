(function() {
  function SongPlayer() {
    var SongPlayer = {};

    var currentSong = null;

    /**
    * @desc(A short description) Buzz object audio file
    * @type(The type, such as {Object}, {Array}, {Number}, etc.) {Object}
    */
    var currentBuzzObject = null;

    /**
    * @function(Name of the function) setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param(A list of parameters and their type) {Object} song
    */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentSong = song;
    };

    SongPlayer.play = function(song) {
      if (currentSong !== song) {
        setSong(song);
        currentBuzzObject.play();
        song.playing = true;
      }
    };

    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();
