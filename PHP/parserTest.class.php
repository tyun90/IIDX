<?php

//include('simple_html_dom.php');

class parserTest {
    
    private $styleNum;
    private $songIndex;
    private $curl;
    private $songsInStyle;
    private $cookie;
    private $songCount;
    private $dom;
    private $dataPage;
    private $targetStyle;
    
    public function __construct($styleNum) {
        
        $this->styleNum = $styleNum;
        $this->songIndex = 0;
        $this->cookie = dirname(__FILE__) . '/cookies/7658-3596/file_'.$styleNum.'data';
        $this->songsInStyle = array();
        $this->songCount = 0;
        $this->targetStyle = $targetStyle = 'http://p.eagate.573.jp/game/2dx/22/p/djdata/music.html?list='.$this->styleNum.'&play_style=0&rival=&s=1&page=1#musiclist';
        $this->curl = curl_init();
        $this->dom = new simple_html_dom();
    }
    
    public function test() {
        
        $styleNames = ["1st style/substream", "2nd style", "3rd style", "4th style", "5th style", "6th style", "7th style", "8th style", "9th style", "10th style", "IIDX RED", "HAPPY SKY", "DistorteD", "GOLD", "DJ TROOPERS", "EMPRESS", "SIRIUS", "Resort Anthem", "Lincle", "tricoro", "SPADA", "PENDUAL"];
        $username = "migeki22";
        $password = "ltce11is";
        $user = "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.2309.372 Safari/537.36";
        //$cookie = dirname(__FILE__) . '/cookies/7658-3596/file_'.$styleNum.'data';
        $loginForm = "https://p.eagate.573.jp/gate/p/login.html?path=http%3A%2F%2Fp.eagate.573.jp%2Fgame%2F2dx%2F22%2Fp%2Fdjdata%2Fmusic.html&___REDIRECT=1";
        $loginAction = "https://p.eagate.573.jp/gate/p/login.html?path=http%3A%2F%2Fp.eagate.573.jp%2Fgame%2F2dx%2F22%2Fp%2Fdjdata%2Fmusic.html";
        
        
        $this->curl = curl_init();
        
        //set URL to the forms action (where the form is being sent)
        curl_setopt($this->curl, CURLOPT_URL, $loginAction);
        
        //tell cURL we want to use POST
        curl_setopt($this->curl, CURLOPT_POST, true);
        
        //set POST fields
        curl_setopt($this->curl, CURLOPT_POSTFIELDS, "KID=migeki22&pass=ltce11is&OTP=");
        
        //turn off HTTPs errors
        curl_setopt($this->curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($this->curl, CURLOPT_SSL_VERIFYPEER, false);
        
        //where cookies are saved
        curl_setopt($this->curl, CURLOPT_COOKIESESSION, TRUE);
        curl_setopt($this->curl, CURLOPT_COOKIEJAR, $this->cookie);
        curl_setopt($this->curl, CURLOPT_COOKIEFILE, $this->cookie);
        
        //set user agent because some sites may block bot agents
        curl_setopt($this->curl, CURLOPT_USERAGENT, $user);
        
        //returns output
        curl_setopt($this->curl, CURLOPT_RETURNTRANSFER, true);
        
        //set referer header to fool the server into thinking that reference was from the login form
        curl_setopt($this->curl, CURLOPT_AUTOREFERER, true);
        curl_setopt($this->curl, CURLOPT_REFERER, $loginForm);
        
        //set redirects to false
        curl_setopt($this->curl, CURLOPT_FOLLOWLOCATION, false);
        
        //execute login
        curl_exec($this->curl);
        
        //session_start();
        set_time_limit(0); 
        ob_implicit_flush(true);
        ob_end_flush();
        
        
        $chunkOne = 'http://p.eagate.573.jp/game/2dx/22/p/djdata/music.html?list='.$this->styleNum.'&play_style=0&rival=&s=1&page=';
        $chunkTwo = '#musiclist';
        
        $this->songCount = $this->countSongs($this->curl, $chunkOne, $chunkTwo, $this->cookie, $user, $this->styleNum);
        
        
        //$this->curl = $this->loadStylePage($this->curl, $this->targetStyle, $this->cookie, $user);
        //$this->loadSongPage($this->curl, $this->songIndex, $this->cookie, $user, $this->dataPage, $this->dom, $this->songsInStyle, $this->styleNum);
        
        //Loads the list page into cookies. This is required to pull individual songs
        curl_setopt($this->curl, CURLOPT_URL, $this->targetStyle);
        
        //Use the same cookie file.
        //curl_setopt($this->curl, CURLOPT_COOKIESESSION, TRUE);
        //curl_setopt($this->curl, CURLOPT_COOKIEFILE, dirname(__FILE__) . '/cookies/7658-3596/file_'.$this->styleNum.'data');
        curl_setopt($this->curl, CURLOPT_COOKIEJAR, dirname(__FILE__) . '/cookies/7658-3596/file_'.$this->styleNum.'data');
        
        
        
        //Use the same user agent, just in case it is used by the server for session validation.
        curl_setopt($this->curl, CURLOPT_USERAGENT, $user);
        
        
        //We don't want any HTTPS / SSL errors.
        curl_setopt($this->curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($this->curl, CURLOPT_SSL_VERIFYPEER, false);
        
        //Because of how the site works, cookie of the current musicList page has to be kept to go through the list of the certain style
        curl_exec($this->curl);
            
        //Loop through each song page. Loop breaks when index leads to a page redirect
        while(true) {
        
            
            //$targetURL = 'http://p.eagate.573.jp/game/2dx/22/p/djdata/music_info.html?index='.$this->songIndex;

            
            //We should be logged in by now. Let's attempt to access a password protected page
            curl_setopt($this->curl, CURLOPT_URL, 'http://p.eagate.573.jp/game/2dx/22/p/djdata/music_info.html?index='.$this->songIndex);

            //Use the same cookie file.
            //curl_setopt($this->curl, CURLOPT_COOKIESESSION, TRUE);
            //curl_setopt($this->curl, CURLOPT_COOKIEFILE, dirname(__FILE__) . '/cookies/7658-3596/file_'.$this->styleNum.'data');

            //Use the same user agent, just in case it is used by the server for session validation.
            curl_setopt($this->curl, CURLOPT_USERAGENT, $user);
            

            //We don't want any HTTPS / SSL errors.
            curl_setopt($this->curl, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($this->curl, CURLOPT_SSL_VERIFYPEER, false);

            //Execute the GET request and print out the result.
            $this->dataPage = curl_exec($this->curl);

            $code = curl_getinfo($this->curl, CURLINFO_HTTP_CODE);
            if (($code == 301) || ($code == 302)) {
                break;
            } else {
                
                $this->dom->load($this->dataPage);

                
                $this->songsInStyle = $this->getSongInfo($this->songsInStyle, $this->dom, $this->styleNum);

                echo str_pad((round($this->songIndex/$this->songCount, 2)*100).$styleNames[$this->styleNum], 1024*16, " ");
                flush();
                usleep(10000);
                $this->songIndex = $this->songIndex + 1;
            }
            
        }
        
        self::writeToFileNew($this->songsInStyle);
        //echo json_encode($this->songsInStyle);
        //echo (100).$styleNames[$this->styleNum];
        //echo $this->songCount;
        curl_close($this->curl);
    } 
    
    private function countSongs($curl, $chunkHead, $chunkTail, $cookie, $user, $styleNum) {
     
        //Assuming there are at least 15 songs per page and that each style has at least 15 songs
        $pageNum = 1;
        $numSongs = 0;
        while(true) {
            
            $pageURL = $chunkHead.$pageNum.$chunkTail;
            curl_setopt($curl, CURLOPT_URL, $pageURL);
        
            //Use the same cookie file.
            curl_setopt($curl, CURLOPT_COOKIESESSION, TRUE);
            curl_setopt($curl, CURLOPT_COOKIEFILE, dirname(__FILE__) . '/cookies/7658-3596/file_'.$styleNum.'data');
        
            //Use the same user agent, just in case it is used by the server for session validation.
            curl_setopt($curl, CURLOPT_USERAGENT, $user);
            
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        
            //We don't want any HTTPS / SSL errors.
            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
            
            $page = curl_exec($curl);
                
            $songList = new simple_html_dom();
            $songList->load($page);
            $songTable = $songList->find('.table_type_list');
            if (count($songTable) > 0) {
                $PageSongs = count($songTable[0]->find('tr'))-1;
                $numSongs = $numSongs + $PageSongs;
                $pageNum = $pageNum + 1;
            } else {
                return $numSongs;
                break;
            }
            
        }
        return $numSongs;
    }
    
    //Gets data for the current song page. Returns the final output after adding in the song info it
    private function getSongInfo($json, $musicdata, $styleNum) {
        $styleNames = ["1st style/substream", "2nd style", "3rd style", "4th style", "5th style", "6th style", "7th style", "8th style", "9th style", "10th style", "IIDX RED", "HAPPY SKY", "DistorteD", "GOLD", "DJ TROOPERS", "EMPRESS", "SIRIUS", "Resort Anthem", "Lincle", "tricoro", "SPADA", "PENDUAL"];
        //Grabs music info and formats accordingly because of how it is originally written on the html
        $musictitle = $musicdata->find('.music_info_td')[0];
        $songTitle = $this->formatSongInfo($musictitle, 1);
        $songGenre = $this->formatSongInfo($musictitle, 2);
        $songArtist = $this->formatSongInfo($musictitle, 3);
        $json[$songTitle]["Name"] = $songTitle;
        $json[$songTitle]["Artist"] = $songArtist;
        $json[$songTitle]["Genre"] = $songGenre;
        $json[$songTitle]["Style"] = $styleNames[$styleNum];
        
        //Grabs the scores
        $sp = $this->getScores($musicdata, 0);
        $json[$songTitle]["Score"]["SP"] = $sp;
        
        return $json;
        
        
    }
    
    //Because the song info is written using linebreaks, this is necessary
    public function formatSongInfo($data, $index) {
        
        $tempData = explode(">", $data)[$index];
        $tempData = explode("<", $tempData)[0];
        return trim($tempData);
        
    }
    
    
    //Gets scores based on the html score table and sp/dp accordingly. Returns an array
    private function getScores($data, $type) {
        
        $tableRows = $data->find('.table_type_minfo')[$type]->find('tr');
        $clearLampRow = $tableRows[1];
        $rankingRow = $tableRows[2];
        $EXScoreRow = $tableRows[3];
        $MissRow = $tableRows[4];
        
        $scoreArray = array();
        
        $scoreArray["Normal"] = $this->fillbyDifficulty($clearLampRow, $rankingRow, $EXScoreRow, $MissRow, 1);
        $scoreArray["Hyper"] = $this->fillbyDifficulty($clearLampRow, $rankingRow, $EXScoreRow, $MissRow, 2);
        $scoreArray["Another"] = $this->fillbyDifficulty($clearLampRow, $rankingRow, $EXScoreRow, $MissRow, 3);
        
        return $scoreArray;
        
    }
    
    //Helper function that grabs the data by difficulty and returns an array
    private function fillbyDifficulty($clearLamp, $ranking, $EXScore, $Miss, $difficulty) {
        
        $score['ClearLamp'] = $clearLamp->children($difficulty)->children(0)->getAttribute('alt');
        $hasPlayed = $ranking->children($difficulty);
        if (count($hasPlayed->children) > 0) {
            $score['Grade'] = $ranking->children($difficulty)->children(0)->getAttribute('alt');
            
            $EX = $EXScore->children($difficulty)->plaintext;
            $EX = explode("(", $EX);
            $score["EX"] = $EX[0];
            
            $score["MissCount"] = $Miss->children($difficulty)->plaintext;
        } else {
            $score["Grade"] = "-";
            $score["EX"] = "-";
            $score["MissCount"] = "-";
        }
        
        return $score;
        
    }
    
    private static function writeToFile($content) {
        $file = fopen('../Users/7658-3596/Migeki.json', 'w');
        fwrite($file, json_encode($content, JSON_UNESCAPED_UNICODE));
        fclose($file);
        $_SESSION["parseData"] = null;
        session_destroy();
        //file_put_contents('../Users/Migeki.json', json_encode($content, JSON_UNESCAPED_UNICODE));
    }
    
    private function writeToFileNew($content) {
        $lock = fopen('../Users/7658-3596/lock.txt', 'r');
        if(flock($lock, LOCK_EX)) {
            $file = json_decode(file_get_contents('../Users/7658-3596/Migeki.json'), true);
            foreach($content as $key => $value) {
                $file[$key] = $value;
            }
            file_put_contents('../Users/7658-3596/Migeki.json', json_encode($file, JSON_UNESCAPED_UNICODE));
            flock($lock, LOCK_UN);
        }
        
        
    }
    
    public static function textageParse($link, $level, $diff) {
        $user = "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.2309.372 Safari/537.36";
        $cookie = dirname(__FILE__) . '/cookie.txt';
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $link);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_USERAGENT, $user);
        
        
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
        
        //set redirects to false
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, false);
        
        //execute login
        curl_exec($curl);
        
        $page = curl_exec($curl);
        
        $dom = new simple_html_dom();
        $dom->load($page);
        
        $scripttoParse = $dom->find('script')[1];
        
        switch($diff) {
            case 0:
                $pattern = '/\bif\b\(a\)\{\bnotes=\b\d+/';
                $difficulty = "Another";
                break;
            case 1:
                $pattern = '/\bif\b\(k\)\{\bnotes=\b\d+/';
                $difficulty = "Hyper";
                break;
            case 2:
                $pattern = '/\bif\b\(l\)\{\bnotes=\b\d+/';
                $difficulty = "Normal";
                break;
        }
        
        
        preg_match($pattern, $scripttoParse, $result);
        $numNotes = explode("=", $result[0])[1];
        
        $pattern = '/\bbpm\b\=[^;]+/';
        preg_match($pattern, $scripttoParse, $result);
        $bpm = str_replace('"', '', explode("=", $result[0])[1]);
        //This regex replace is needed for the rare case where the formatting is off
        $bpm = preg_replace('/\D+/', "~", $bpm);
        
        $pattern = '/\btitle\b\=[^;]+/';
        preg_match($pattern, $scripttoParse, $result);
        $songTitle = str_replace('"', '', explode("=", $result[0])[1]);
        
        echo $songTitle;
        
        //flock test
        $flockFile = fopen('../SongDB/lock.txt', 'r');
        if (flock($flockFile, LOCK_EX)) {
            $json_data = json_decode(file_get_contents('../SongDB/songDatabase.json'), true);
            $json_data[$songTitle]["SP"][$difficulty]["Notes"] = $numNotes;
            $json_data[$songTitle]["SP"][$difficulty]["Level"] = $level;
            $json_data[$songTitle]["SP"][$difficulty]["BPM"] = $bpm;
            //ksort($json_data, SORT_NATURAL | SORT_FLAG_CASE);
            file_put_contents('../SongDB/songDatabase.json', json_encode($json_data, JSON_UNESCAPED_UNICODE));
            flock($flockFile, LOCK_UN);
        }
    }
}
                  




?>