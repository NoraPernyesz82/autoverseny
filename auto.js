"use strict";

let app = angular.module('myApp', []);

let adatok = [];

app.controller('myCtrl', ['$http', '$scope', function($http, $scope){
    $http.get('autoverseny.csv')
    .then(function(response){
        $scope.alomany = response.data;
        $scope.tomb = $scope.alomany.split('\n');
        for (let i = 0; i < $scope.tomb.length; i++) {
            adatok.push({
                'csapat' : $scope.tomb[i].split(';')[0],
                'versenyzo' : $scope.tomb[i].split(';')[1],
                'eletkor' : $scope.tomb[i].split(';')[2],
                'palya' : $scope.tomb[i].split(';')[3],
                'korido' : $scope.tomb[i].split(';')[4],
                'kor' : $scope.tomb[i].split(';')[5],
            }); 
        }
        $scope.hossz = adatok.length - 1;
        $scope.masodperc = 0;
        for (let j = 0; j < adatok.length; j++) {
            if (adatok[j].versenyzo == 'Fürge Ferenc' && adatok[j].palya == 'Gran Prix Circuit' && adatok[j].kor == 3) {
                $scope.masodperc = Number(adatok[j].korido.split(':')[1]) * 60 + Number(adatok[j].korido.split(':')[2]);
                break;
            }
        }
    });
}]);

app.controller('myControl', function($scope){
    $scope.leker = function(){
        let nev = document.getElementById('nev').value;
        $scope.legjobbKorido = "";
        $scope.helyszin = "";
        let legjobb = 0;
        let vane = false;
        for (let i = 0; i < adatok.length; i++) {
            let masodperc = Number(adatok[i].korido.split(':')[1]) * 60 + Number(adatok[i].korido.split(':')[2]);
            if (adatok[i].versenyzo == nev) {
                if (legjobb < masodperc) {
                    $scope.legjobbKorido = adatok[i].korido;
                    $scope.helyszin = adatok[i].palya;
                    legjobb = masodperc;
                    vane = true;
                }
            } 
        }
       /* if (vane) {
            $scope.kiir = `${$scope.helyszin}, ${$scope.legjobbKorido}`;
        }
        else{
            $scope.kiir = "Nincs ilyen versenyző az állományban";
        }*/
        $scope.kiir = (vane ? `${$scope.helyszin}, ${$scope.legjobbKorido}` : "Nincs ilyen versenyző az állományban")
    }
});