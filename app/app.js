'use strict';
// Declare app level module which depends on views, and components

var myApp = angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version',
    'ngclipboard',
]);

myApp.controller('myAppController', function ($scope) {


    $scope.secretLanguage;
    $scope.realLanguage;

    var normalImagePath = "img/MoaAndMans_original.png";
    var mansWink = "img/MoaAndMans_MansWink.png";
    var moaWink = "img/MoaAndMans_MoaWink.png";
    var bothWink = "img/MoaAndMans_BothWink.png";


    var bigAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ';
    var smallAlphabet = 'abcdefghijklmnopqrstuvwxyzåäö';

    // blinkImage();

    $scope.fromSecret = function(){
        $scope.realLanguage = translateFromSecretLanguage($scope.secretLanguage);
    }

    $scope.fromReal = function(){
        $scope.secretLanguage = translateFromRealLanguage($scope.realLanguage);
    }

    function translateFromRealLanguage(textString){
        var result = "";
        for(var i = 0; i < textString.length; i++){
            var currChar = textString.charAt(i);
            if(bigAlphabet.indexOf(currChar) !== -1){
                var translatedChar =  bigAlphabet.charAt((bigAlphabet.indexOf(currChar)+1)%bigAlphabet.length);
                result += translatedChar;
            } else if(smallAlphabet.indexOf(currChar) !== -1){
                var translatedChar =  smallAlphabet.charAt((smallAlphabet.indexOf(currChar)+1)%smallAlphabet.length);
                result += translatedChar;
            } else {
                result += currChar;
            }
        }
        return result;
    }

    $(document).ready(function(){
        $('.tooltipped').tooltip({delay: 10});
    });

    $scope.showToolTip = function(){
        if($('.toast').length > 0){
            Materialize.Toast.removeAll();
        }
        Materialize.toast('Kopierad!', 1500);
    };

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    //------------CSS SETTINGS -----------------------------------------------------

    var newSize = $(window).width() > $(window).height ? $(window).width()/3 : $(window).height() /3;
    $('.imageHolder').css({'width':newSize, 'height':newSize});

    sleep(1200).then(function(){
        blinkMansImage();
    });
    sleep(2300).then(function(){
        blinkMoaImage();
    });

    function blinkMansImage(){
        return new Promise(function(resolve, reject) {
            $('#mansWink').attr('src', mansWink);
            sleep(150).then(function(){
                $('#mansWink').attr('src', "");
                resolve();
            });
            var pauseTime = Math.floor(1000 * Math.random()*10 + 3000);
            sleep(pauseTime).then(function(){
               blinkMansImage();
            });
        });
    }

    function blinkMoaImage(){
        return new Promise(function(resolve, reject) {
            $('#moaWink').attr('src', moaWink);
            sleep(150).then(function(){
                $('#moaWink').attr('src', "");
                resolve();
            });
            var pauseTime = Math.floor(1000 * Math.random()*10 + 3000);
            sleep(pauseTime).then(function(){
                blinkMoaImage();
            });
        });
    }


    function translateFromSecretLanguage(textString){
        var result = "";
        for(var i = 0; i < textString.length; i++){
            var currChar = textString.charAt(i);
            if(bigAlphabet.indexOf(currChar) !== -1){
                var translatedChar =  bigAlphabet.charAt((bigAlphabet.indexOf(currChar)+bigAlphabet.length-1)%bigAlphabet.length);
                result += translatedChar;
            } else if(smallAlphabet.indexOf(currChar) !== -1){
                var translatedChar =  smallAlphabet.charAt((smallAlphabet.indexOf(currChar)+bigAlphabet.length-1)%smallAlphabet.length);
                result += translatedChar;
            } else {
                result += currChar;
            }
        }
        return result;
    }
});


myApp.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/view1'});
}]);

