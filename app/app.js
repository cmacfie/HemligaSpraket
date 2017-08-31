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


    var bigAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ';
    var smallAlphabet = 'abcdefghijklmnopqrstuvwxyzåäö';

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

