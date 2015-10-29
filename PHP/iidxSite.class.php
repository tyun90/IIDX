<?php

class site {
    
 
    private static $siteInfo;
    private static $loadedPage;
    
    public static function siteLogin() {   
        $username = "migeki22";
        $password = "ltce11is";
        $user = "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.2309.372 Safari/537.36";
        $cookie = dirname(__FILE__) . '/cookie.txt';
        $loginForm = "https://p.eagate.573.jp/gate/p/login.html?path=http%3A%2F%2Fp.eagate.573.jp%2Fgame%2F2dx%2F22%2Fp%2Fdjdata%2Fmusic.html&___REDIRECT=1";
        $loginAction = "https://p.eagate.573.jp/gate/p/login.html?path=http%3A%2F%2Fp.eagate.573.jp%2Fgame%2F2dx%2F22%2Fp%2Fdjdata%2Fmusic.html";
        
        $post = array (
            'KID' => $username,
            'pass' => $password
        );
        
        //login("https://p.eagate.573.jp/gate/p/login.html", "KID=migeki22&pass=ltce11is");
        
        //init cURL
        $curl = curl_init();
        
        //set URL to the forms action (where the form is being sent)
        curl_setopt($curl, CURLOPT_URL, $loginAction);
        
        //tell cURL we want to use POST
        curl_setopt($curl, CURLOPT_POST, true);
        
        //set POST fields
        curl_setopt($curl, CURLOPT_POSTFIELDS, "KID=migeki22&pass=ltce11is&OTP=");
        
        //turn off HTTPs errors
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        
        //where cookies are saved
        curl_setopt($curl, CURLOPT_COOKIESESSION, TRUE);
        curl_setopt($curl, CURLOPT_COOKIEJAR, $cookie);
        curl_setopt($curl, CURLOPT_COOKIEFILE, $cookie);
        
        //set user agent because some sites may block bot agents
        curl_setopt($curl, CURLOPT_USERAGENT, $user);
        
        //returns output
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        
        //set referer header to fool the server into thinking that reference was from the login form
        curl_setopt($curl, CURLOPT_AUTOREFERER, true);
        curl_setopt($curl, CURLOPT_REFERER, $loginForm);
        
        //set redirects to false
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, false);
        
        //execute login
        curl_exec($curl);
        
        self::$siteInfo = $curl;
        
    }
    
    public static function loadBufferPage($url, $post, $postField) {
        $user = "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.2309.372 Safari/537.36";
        $cookie = dirname(__FILE__) . '/cookie.txt';
        $curl = self::$siteInfo;
        curl_setopt($curl, CURLOPT_URL, $url);
        
        curl_setopt($curl, CURLOPT_POST, $post);
        
        //set POST fields
        curl_setopt($curl, CURLOPT_POSTFIELDS, $postField);
        
        
        //Use the same cookie file.
        curl_setopt($curl, CURLOPT_COOKIEJAR, $cookie);
        curl_setopt($curl, CURLOPT_COOKIEFILE, $cookie);
        
        //Use the same user agent, just in case it is used by the server for session validation.
        curl_setopt($curl, CURLOPT_USERAGENT, $user);
        
        //We don't want any HTTPS / SSL errors.
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        
        //Because of how the site works, cookie of the current musicList page has to be kept to go through the list of the certain style
        self::$loadedPage = curl_exec($curl);
    }
    
    
    public static function getTableParams($index, $tableClass, $element){
        $dom = new simple_html_dom();
        $dom->load(self::$loadedPage);
        $link = $dom->find($tableClass)[0]->find($element)[$index]->getAttribute("href");
        $param = explode("param=", $link)[1];
        return $param;
    }
    
    public static function temporaryTest($song, $tableClass, $element) {
        $dom = new simple_html_dom();
        $dom->load(self::$loadedPage);
        $songs = $dom->find(".table_type_list")[0]->find("a");
        foreach($songs as $songName) {
            if(stripos($songName, $song) !== false) {
                $newParam = $songName->getAttribute("href");
                $newLink = "http://p.eagate.573.jp".$newParam;
                return $newLink;
            }
//            if($songName->innertext === $song) {
//                return $song."<br>\n";
//                break;
//            }
            
        }
        return "NotFound \n";
    }
    
    public static function showBufferPage() {
        $dom = new simple_html_dom();
        $dom->load(self::$loadedPage);
        echo $dom;
        
    }
    
    public static function close() {
        curl_close(self::$siteInfo);
        
    }
    
}





?>