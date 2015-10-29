var app = angular.module("courseCreation", ['ngRoute', 'ngAnimate']);

app.factory("factory", function($http) {
 
    var factory = {
    
        data: [],
        dataLoaded: false,
        scorePage: {
            dataCURR: [],
            dataPB: [],
            dataLoaded: false,
            currentPage: {
                ScoreMain: "",
                InnerOption: "",
            },
        },
        
        loadData: function() {
            return $http({
                method: 'POST',
                url: 'PHP/general.php',
                data: "action=loadData",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        },
        
        getSongList: function(action, type) {
            return $http({
                method: 'POST',
                url: 'PHP/general.php',
                data: "action="+action+"&type="+type,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        },
        submitCourse: function(first, second, third, fourth) {
            return $http({
                method: 'POST',
                url: 'PHP/general.php',
                data: "action=submit&first="+first+"&second="+second+"&third="+third+"&fourth="+fourth,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        },
        setData: function(data, dataCurr) {
            this.scorePage.dataPB = data;
            this.scorePage.dataCURR = dataCurr;
            this.scorePage.dataLoaded = true;
        }
    };
    
    return factory;
});


app.controller("mainController", function($scope) {
    
});

app.controller("createController", function($scope, factory) {
    
    $scope.pageState = "type";
    $scope.prevStates = [];
    
    $scope.changeState = function(state) {
        $scope.prevStates.push($scope.pageState);
        $scope.pageState = state;
    }
    
    $scope.back = function(state) {
        $scope.pageState = $scope.prevStates.pop();
        
    }
    
    $scope.canSubmit = false;
    
    $scope.courseList = {
        
        first: "",
        second: "",
        third: "",
        fourth: "",
    }
    
    $scope.songs = [];
    
    $scope.inputName = "";
    
    
    $scope.addToCourse = function(index) {
        $scope.courseList[index] = $scope.inputName;
        $scope.inputName = false;
        if($scope.courseList.first != "" && $scope.courseList.second != "" && $scope.courseList.third != "" && $scope.courseList.fourth != "") {
         
            $scope.canSubmit = true;
            
        }
        
    }
    
    $scope.removeFromCourse = function(index) {
        
        $scope.courseList[index] = "";
        $scope.canSubmit = false;
        
    }
    
    $scope.pickedSong = function(name) {
        $scope.inputName = name;
    }
    
    $scope.courseCreator = function(type) {
    
        switch(type) {
            
            case 'listAll':
                factory.getSongList("songs","listAll").success(function(data) {
                    var songArray = data.split('|');
                    //songArray = songArray.splice(0, songArray.length-1);
                    $scope.songs = songArray;
                    console.log(songArray);
                    
                });
                break;

            case 'randomAll':
                factory.getSongList("songs" , "RandomAll").success(function(data) {
                    songList = data.split('|');
                    document.getElementById("songOne").innerHTML = songList[0];
                    document.getElementById("songTwo").innerHTML = songList[1];
                    document.getElementById("songThree").innerHTML = songList[2];
                    document.getElementById("songFour").innerHTML = songList[3];
                    $scope.courseList.first = songList[0];
                    $scope.courseList.second = songList[1];
                    $scope.courseList.third = songList[2];
                    $scope.courseList.fourth = songList[3];
                });
                break;
                
            case 'submit':
                factory.submitCourse($scope.courseList.first, $scope.courseList.second, $scope.courseList.third, $scope.courseList.fourth).success(function(data) {
                });
                break;
        };
    }
});

app.controller("scoreController", ["$scope", "$routeParams", "factory" , function($scope, $routeParams, factory) {
 
    $scope.scoreData = [];
    $scope.scoreDataCurr = [];
    $scope.selectedStyle = "";
    
    $scope.$on("$routeChangeSuccess", function($currentRoute, $previousRoute) {
        if(factory.dataLoaded) {
            $scope.scoreData = factory.scorePage.dataPB;
        } else {
            factory.loadData().success(function(data) {
                //Splits 2 sets of data which is separated by ||.
                var fullArray = data.split("||");
                
                var pbData = fullArray[0].split('|');
                var currData = fullArray[1].split('|');
                
                //Last element of 2nd array is an empty string so this removes it
                currData.pop();
                
                //Redundant with json_encode from server? Don't want to mess with it and break it yet. Need to look into
                parsedPB = pbData.map(function(element) {
                    //console.log(element);
                    return JSON.parse(element);
                });
                
                parsedCURR = currData.map(function(element) {
                    //console.log(element);
                    return JSON.parse(element);
                });
                
                $scope.scoreData = parsedPB;
                $scope.scoreDataCurr = parsedCURR;
                factory.setData(parsedPB, parsedCURR);
                //console.log($scope.scoreData);
            });
            
        }
    });
    
    $scope.difficulty = "Another";
    
    $scope.setDifficulty = function(diff) {
        $scope.difficulty = diff;
    }
}]);


app.controller("uploadController", function($scope) {
    $scope.uploadProgress = {};
    
    //Possibly going to change
    $scope.upload = function() {
        console.log("Uploading");
        var globalIndex = 0;
        var pattern = /.[\D]+/;
        while(globalIndex > -1) {
            var xhr = new XMLHttpRequest();  
            xhr.previous_text = '';
            console.log("Running");
            xhr.onerror = function() { alert("[XHR] Fatal Error."); };
            xhr.onreadystatechange = function() {
                try{
                    if (xhr.readyState == 4){
                        if(globalIndex > -1) {
                            console.log(globalIndex);
                        } else {
                            console.log("Done");
                        }
                    } 
                    else if (xhr.readyState > 2){
                        if(xhr.responseText != null) {
                            //Replace the space padding which was needed to flush data from server
                            var responseText = xhr.responseText.replace(/\s/g, "");
                            //Only run this chunk if the response lengths aren't the same because same length = same data;
                            if (responseText.length != xhr.previous_text.length) {
                                var new_response = responseText.substring(xhr.previous_text.length);
                                var style = new_response.match(pattern);
                                console.log(style);
                                var percent = new_response.replace(pattern, "");
                                console.log(percent);
                                document.getElementById("progress").innerHTML = new_response;
                            } 
                            xhr.previous_text = responseText;
                        }
                    }  
                }
                catch (e){
                    console.log("[XHR STATECHANGE] Exception: " + e);
                }                     
            };

            xhr.open("POST", "PHP/general.php", true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send("action=parse&index="+globalIndex);      
            globalIndex--;
        }    
    }
});

app.directive("uploadProgress", function() {
   return {
       restrict: 'E',
       scope: {
           progress: '@'
       },
       template: "<div>{{progress}}</div>"
   }
});



app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        controller: 'mainController',
        templateUrl: 'index.html'
    })
    .when('/login', {  
        templateUrl: 'JS/MainApp/login.html'
    })
    .when('/newAccount', {
        templateUrl: 'JS/MainApp/newAccount.html'  
    })
    .when('/CourseCreator', {
        controller: 'createController',
        templateUrl: 'JS/MainApp/selectType.html'
    })
    .when('/score', {   
        controller: 'scoreController',
        templateUrl: 'JS/MainApp/scoreView.html'
    })
    .when('/upload', {
        controller: 'uploadController',
        templateUrl: 'JS/MainApp/Upload.html'
    })
});