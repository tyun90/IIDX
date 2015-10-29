//var globalIndex;
//
//function clickhere() {
// 
//    globalIndex = 2;
//    parseScores();
//    while(globalIndex > -1) {
//        parseScores();
//        globalIndex--;
//    }
//    
//}
//
//function parseScores() {
//    var xhr = new XMLHttpRequest();  
//    xhr.previous_text = '';                             
//    xhr.onerror = function() { alert("[XHR] Fatal Error."); };
//    xhr.onreadystatechange = function() {
//        try{
//            if (xhr.readyState == 4){
////                globalIndex = globalIndex - 1;
//                if(globalIndex > -1) {
//                    console.log(globalIndex);
////                    parseScores();
//                } else {
//                    //alert('DONE ALL');
//                }
//            } 
//            else if (xhr.readyState > 2){
//                if(xhr.responseText != null) {
//                    var responseText = xhr.responseText.replace(/\s/g, "");
//                    if (responseText.length != xhr.previous_text.length) {
//                        var new_response = responseText.substring(xhr.previous_text.length);
//                        document.getElementById("progress").innerHTML = new_response;
//                    } 
//                    xhr.previous_text = responseText;
//                }
//            }  
//        }
//        catch (e){
//            console.log("[XHR STATECHANGE] Exception: " + e);
//        }                     
//    };
//
//xhr.open("POST", "PHP/general.php", true);
//xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//xhr.send("action=parse&index="+globalIndex);      
//}

function findID() {
    
    var kid = document.getElementById("kid").value.trim();
    var kpw = document.getElementById("kpw").value.trim();
    var query = "action=findID&KID="+kid+"&KPW="+kpw;
    $.ajax({
        type: 'POST',
        url: 'PHP/general.php',
        data: query,
        cache: 'false',
        success: function(msg) {
            document.getElementById('IIDXID').innerHTML = msg;
            document.getElementById('submit').disabled = false;
        }
        
    });
    
}

function createAccount() {
    var username = document.getElementById("user").value.trim();
    var password = document.getElementById("pass").value.trim();
    var kid = document.getElementById("kid").value.trim();
    var kpw = document.getElementById("kpw").value.trim();
    var id = document.getElementById("IIDXID").innerHTML;
    var query = "action=create&username="+username+"&password="+password+"&KID="+kid+"&KPW="+kpw+"&IIDXID="+id;
    $.ajax({
        type: 'POST',
        url: 'PHP/general.php',
        data: query,
        cache: 'false',
        success: function(msg) {
            alert(msg);
            
        }
    });
}

function login() {
    var username = document.getElementById("login_user").value.trim();
    var password = document.getElementById("login_pass").value.trim();
    var query = "action=login&username="+username+"&password="+password;
    $.ajax({
        type: 'POST',
        url: 'PHP/general.php',
        data: query,
        cache: 'false',
        success: function(msg) {
            alert(msg);
        }
    });
}

function scraper() {
    console.log("scraping");
    var xhr= new XMLHttpRequest();
    //Load complete saved page to grab links
    xhr.open('GET', 'textage.html', true);
    xhr.onreadystatechange= function() {
        if (this.readyState!==4) return;
        if (this.status!==200) return; // or whatever error handling you want
        document.getElementById('textProgress').innerHTML= this.responseText;
        var tabledata = document.getElementById('textProgress').getElementsByTagName('table')[1].getElementsByTagName('tr');
        for(var i=1; i<tabledata.length;i++) {
            var tableRow = tabledata[i];
            scraperHelper(tableRow, 0);
            scraperHelper(tableRow, 1);
            scraperHelper(tableRow, 2);
        }
    };
    xhr.send();
}

//Helper to get all difficulties of a row [0=Another,1=Hyper,2=Normal]
function scraperHelper(tableRow, difficulty) {
    if (tableRow.children[difficulty].children.length > 1) {
        var link = tableRow.children[difficulty].children[1].getAttribute('href');
        var level = tableRow.children[difficulty].children[0].getAttribute('src');
        level = level.match(/\/[a-z]\d+/)[0].slice(2,4);
        $.ajax({
            type: 'POST',
            url: 'PHP/general.php',
            data: "action=textage&link="+link+"&level="+level+"&diff="+difficulty,
            cache: 'false',
            success: function(data) {
                console.log(data);
            }                
        });
    }
}