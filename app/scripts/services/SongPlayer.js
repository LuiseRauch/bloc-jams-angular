(function() {
  function SongPlayer() {
    var SongPlayer = {};

    /**
    * @desc(A short description) selected song object and private attribute
    * @type(The type, such as {Object}, {Array}, {Number}, etc.) {Object}
    */
    var currentSong = null;

    /**
    * @desc Buzz object audio file and private attribute
    * @type {Object}
    */
    var currentBuzzObject = null;

    /**
    * @function(Name of the function) setSong
    * @desc A private function stopping the currently playing song and loading the new audio file as currentBuzzObject
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

    /**
    * @function playSong
    * @desc A private function playing the current song and setting the playing property of the song object to true
    * @param {Object} song
    */
    var playSong = function(song){
      currentBuzzObject.play();
      song.playing = true;
    };

    /**
    * @function SongPlayer.play
    * @desc This public method plays the selected song
    * @param {Object} song
    */
    SongPlayer.play = function(song) {
      if (currentSong !== song) {
        setSong(song);
        playSong(song);
      }
    };

    /**
    * @function SongPlayer.pause
    * @desc This public method pauses the selected song
    * @param {Object} song
    */
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
