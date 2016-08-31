(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};

    /**
    * @desc(A short description) Album information and private attribute
    * @type(The type, such as {Object}, {Array}, {Number}, etc.) {Object}
    */
    var currentAlbum = Fixtures.getAlbum();

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
        SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
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
    * @function getSongIndex
    * @desc A private function getting the index of a song
    * @param {Object} song
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    /**
    * @desc Active song object from list of songs and public attribute
    * @type {Object}
    */
    SongPlayer.currentSong = null;

    /**
    * @function play
    * @desc This public method plays current or new song
    * @param {Object} song
    */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
          setSong(song);
          playSong(song);
      } else if (SongPlayer.currentSong === song) {
          if (currentBuzzObject.isPaused()) {
              playSong(song);
          }
      }
    };

    /**
    * @function pause
    * @desc This public method pauses the selected song
    * @param {Object} song
    */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };
    /**
    * @function previous
    * @desc This public method goes to the previous song
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();
