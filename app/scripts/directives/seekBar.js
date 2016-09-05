(function() {
   function seekBar($document) {

     /**
     * @function calculatePercent
     * @desc Calculates the horizontal percent along the seek bar where the event occurred.
     * @param {Object} seekBar  holds the element that matches the directive, which we can call jQuery methods on.
     * @param {Object} event    javascript event object, or click handler
     * @returns {Number}
     */
     var calculatePercent = function(seekBar, event) {
       var offsetX = event.pageX - seekBar.offset().left;
       var seekBarWidth = seekBar.width();
       var offsetXPercent = offsetX / seekBarWidth;
       offsetXPercent = Math.max(0, offsetXPercent);
       offsetXPercent = Math.min(1, offsetXPercent);
       return offsetXPercent;
     };

     return {
       templateUrl: '/templates/directives/seek_bar.html',
       replace: true,
       restrict: 'E',
       scope: {
         onChange: '&'
       },
       link: function(scope, element, attributes) {
         scope.value = 0;
         scope.max = 100;

         var seekBar = $(element);

         attributes.$observe('value', function(newValue) {
           scope.value = newValue;
         });

         attributes.$observe('max', function(newValue) {
           scope.max = newValue;
         });

         /**
         * @function percentString
         * @desc A private function calculating a percent based on the value and maximum value of a seek bar
         * @returns {String} as the relevant percentage
         */
         var percentString = function () {
           var value = scope.value;
           var max = scope.max;
           var percent = value / max * 100;
           return percent + "%";
         };

         /**
         * @function fillStyle
         * @desc is a public method that updates the position of the seek bar thumb
         * @returns {Object} with the css property as the key, and the value a string of the percentage
         */
         scope.fillStyle = function() {
           return {width: percentString()};
         };

         /**
         * @function thumbStyle
         * @desc is a public method that returns the width of the seek bar fill element based on the calculated percent
         * @returns {Object} with the css property as the key, and the value a string of the percentage
         */
         scope.thumbStyle = function() {
           return {left: percentString()};
         };

         /**
         * @function onClickSeekBar
         * @desc is a public method that updates the seek bar value based on the seek bar's width and the location of the user's click on the seek bar
         */
         scope.onClickSeekBar = function(event) {
           var percent = calculatePercent(seekBar, event);
           scope.value = percent * scope.max;
           notifyOnChange(scope.value);
         };

         /**
         * @function trackThumb
         * @desc is a public method that uses $apply to constantly apply the change in value of scope.value as the user drags the seek bar thumb
         */
         scope.trackThumb = function() {
           $document.bind('mousemove.thumb', function(event) {
             var percent = calculatePercent(seekBar, event);
             scope.$apply(function() {
               scope.value = percent * scope.max;
               notifyOnChange(scope.value);
             });
           });

           $document.bind('mouseup.thumb', function() {
             $document.unbind('mousemove.thumb');
             $document.unbind('mouseup.thumb');
           });
         };
         var notifyOnChange = function(newValue) {
           if (typeof scope.onChange === 'function') {
             scope.onChange({value: newValue});
           }
         };
       }
     };
   }

   angular
     .module('blocJams')
     .directive('seekBar', ['$document', seekBar]);
 })();
