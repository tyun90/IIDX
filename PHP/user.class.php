<?php

class user {
    
 
    public static function login($user, $pass) {
        $query = database::query("SELECT username,password,id FROM userdata WHERE username = '{$user}' and password = '{$pass}'");
        $accountExists = $query->num_rows;
        $row = $query->fetch_array(MYSQLI_ASSOC);
        if($accountExists > 0) {
            session_start();
            $_SESSION["user"] = $row["id"];
            echo $_SESSION["user"];   
        } else {
            echo "Invalid";
        }
    }
    
    
    public static function createAccount($user, $pass, $kid, $kpw, $iidxid) {
     
        $query = database::query("SELECT id FROM userdata WHERE id = '{$iidxid}'");
        $rows = $query->num_rows;
        if ($rows > 0) {
            echo 'IIDX-ID already exists';
            //mkdir(dirname(__FILE__) . "/../Users/" . $iidxid, 0777);
            mkdir(dirname(__FILE__) . "/../Users/0000-0000", 0777);
            //fopen("../Users/".$iidxid."/lock.txt", 'w');
            fopen("../Users/0000-0000/lock.txt", 'w');
            $newPB = fopen("../Users/0000-0000/PB.json", 'w');
            //$newCurr = fopen("../Users/0000-0000/PENDUAL.json", 'w');
            songData::fillnewPB($newPB);
        } else {
            $query = database::query("INSERT INTO userdata (username, password, id, kid, kpw) VALUES ('{$user}', '{$pass}', '{$iidxid}', '{$kid}', '{$kpw}')");
            echo "Success";
        }
    }
    
    public static function findID($kid, $kpw) {
     
        $user = "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.2309.372 Safari/537.36";
        $cookie = dirname(__FILE__) . '/cookie.txt';
        $loginForm = "https://p.eagate.573.jp/gate/p/login.html?path=http%3A%2F%2Fp.eagate.573.jp%2Fgame%2F2dx%2F22%2Fp%2Fdjdata%2Fmusic.html&___REDIRECT=1";
        $loginAction = "https://p.eagate.573.jp/gate/p/login.html?path=http%3A%2F%2Fp.eagate.573.jp%2Fgame%2F2dx%2F22%2Fp%2Fdjdata%2Fmusic.html";
        
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $loginAction);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, "KID=".$kid."&pass=".$kpw."&OTP=");
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_COOKIESESSION, true);
        curl_setopt($curl, CURLOPT_COOKIEJAR, $cookie);
        curl_setopt($curl, CURLOPT_COOKIEFILE, $cookie);
        curl_setopt($curl, CURLOPT_USERAGENT, $user);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_AUTOREFERER, true);
        curl_setopt($curl, CURLOPT_REFERER, $loginForm);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, false);
        curl_exec($curl);
        
        $idURL = 'http://p.eagate.573.jp/game/2dx/22/p/djdata/status.html';
        curl_setopt($curl, CURLOPT_URL, $idURL);
        curl_setopt($curl, CURLOPT_COOKIEFILE, $cookie);
        curl_setopt($curl, CURLOPT_USERAGENT, $user);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        $page = curl_exec($curl);
        
        $dom = new simple_html_dom();
        $dom->load($page);
        $table = $dom->getElementById('dj_data_table')->find('td')[2]->innertext;
        echo $table;
        
    }
    
}


?>