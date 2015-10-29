<?php

//include('simple_html_dom.php');

class parser {
    
    
    public static function test($styleNum) {
        
        session_id($styleNum);
        session_start();
        session_write_close();
        
        $styleNames = ["1st style/substream", "2nd style", "3rd style", "4th style", "5th style", "6th style", "7th style", "8th style", "9th style", "10th style", "IIDX RED", "HAPPY SKY", "DistorteD", "GOLD", "DJ TROOPERS", "EMPRESS", "SIRIUS", "Resort Anthem", "Lincle", "tricoro", "SPADA", "PENDUAL"];
        $username = "migeki22";
        $password = "ltce11is";
        $user = "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.2309.372 Safari/537.36";
        //$cookie = dirname(__FILE__) . "/Test/cookie"+$_POST['index']+".txt";
        $cookie = dirname(__FILE__) . '/cookies/7658-3596/file_'.$styleNum.'data';
        $loginForm = "https://p.eagate.573.jp/gate/p/login.html?path=http%3A%2F%2Fp.eagate.573.jp%2Fgame%2F2dx%2F22%2Fp%2Fdjdata%2Fmusic.html&___REDIRECT=1";
        $loginAction = "https://p.eagate.573.jp/gate/p/login.html?path=http%3A%2F%2Fp.eagate.573.jp%2Fgame%2F2dx%2F22%2Fp%2Fdjdata%2Fmusic.html";
        
        $curlArray = array();
        
        //init cURL
        $curlArray[$styleNum] = curl_init();
        
        $curl = $curlArray[$styleNum];
        
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
        curl_setopt($curl, CURLOPT_COOKIEJAR, dirname(__FILE__) . '/cookies/7658-3596/file_'.$styleNum.'data');
        curl_setopt($curl, CURLOPT_COOKIEFILE, dirname(__FILE__) . '/cookies/7658-3596/file_'.$styleNum.'data');
        
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
        
        //check if theres any errors
        if(curl_errno($curl)){
            throw new Exception(curl_error($curl));
        }
        
        $style = array();
        set_time_limit(0); 
        ob_implicit_flush(true);
        ob_end_flush();
        
        
        $targetStyle = 'http://p.eagate.573.jp/game/2dx/22/p/djdata/music.html?list='.$styleNum.'&play_style=0&rival=&s=1&page=1#musiclist';
        $chunkOne = 'http://p.eagate.573.jp/game/2dx/22/p/djdata/music.html?list='.$styleNum.'&play_style=0&rival=&s=1&page=';
        $chunkTwo = '#musiclist';
        
        $songCount = self::countSongs($curl, $chunkOne, $chunkTwo, $cookie, $user, $styleNum);
        
        //Loads the list page into cookies. This is required to pull individual songs
        curl_setopt($curl, CURLOPT_URL, $targetStyle);
        
        //Use the same cookie file.
        curl_setopt($curl, CURLOPT_COOKIESESSION, TRUE);
        curl_setopt($curl, CURLOPT_COOKIEJAR, dirname(__FILE__) . '/cookies/7658-3596/file_'.$styleNum.'data');
        curl_setopt($curl, CURLOPT_COOKIEFILE, dirname(__FILE__) . '/cookies/7658-3596/file_'.$styleNum.'data');
        
        //Use the same user agent, just in case it is used by the server for session validation.
        curl_setopt($curl, CURLOPT_USERAGENT, $user);
        
        //We don't want any HTTPS / SSL errors.
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        
        //Because of how the site works, cookie of the current musicList page has to be kept to go through the list of the certain style
        curl_exec($curl);
        
            
        //Loop through each song page. Loop breaks when index leads to a page redirect
        $i = 0;
        while(true) {
        
            
            
            $targetURL = 'http://p.eagate.573.jp/game/2dx/22/p/djdata/music_info.html?index='.$i;

            
            //We should be logged in by now. Let's attempt to access a password protected page
            curl_setopt($curl, CURLOPT_URL, $targetURL);

            //Use the same cookie file.
            curl_setopt($curl, CURLOPT_COOKIESESSION, TRUE);
            curl_setopt($curl, CURLOPT_COOKIEFILE, dirname(__FILE__) . '/cookies/7658-3596/file_'.$styleNum.'data');

            //Use the same user agent, just in case it is used by the server for session validation.
            curl_setopt($curl, CURLOPT_USERAGENT, $user);

            //We don't want any HTTPS / SSL errors.
            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

            //Execute the GET request and print out the result.
            $song = curl_exec($curl);

            $code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
            if (($code == 301) || ($code == 302)) {
                break;
            } else {
                
                $dom = new simple_html_dom();
                $dom->load($song);

                $style = self::getSongInfo($style, $dom, $styleNum);

                //echo str_pad((round($i/$songCount, 2)*100).$styleNames[$styleNum], 1024*16, " ");
                flush();
                usleep(10000*0.1);
                $i = $i + 1;
            }
        }
        
        //self::writeToFileNew($style);
        
        echo json_encode($style);
        //$jsonOutput[$styleNames[$_POST["index"]]] = $style;
        //
        //echo (100).$styleNames[$_POST['index']];
        //echo $songCount.$styleNames[$styleNum];
        curl_close($curl);
        //Temporarily write everything to file
        //self::writeToFile($style);
        //json_encode($style, JSON_UNESCAPED_UNICODE);
        //echo json_encode($jsonOutput, JSON_UNESCAPED_UNICODE);
    }
    
    private static function countSongs($curl, $chunkHead, $chunkTail, $cookie, $user, $styleNum) {
     
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
    private static function getSongInfo($json, $musicdata, $styleNum) {
        $styleNames = ["1st style/substream", "2nd style", "3rd style", "4th style", "5th style", "6th style", "7th style", "8th style", "9th style", "10th style", "IIDX RED", "HAPPY SKY", "DistorteD", "GOLD", "DJ TROOPERS", "EMPRESS", "SIRIUS", "Resort Anthem", "Lincle", "tricoro", "SPADA", "PENDUAL"];
        //Grabs music info and formats accordingly because of how it is originally written on the html
        $musictitle = $musicdata->find('.music_info_td')[0];
        $songTitle = self::formatSongInfo($musictitle, 1);
        $songGenre = self::formatSongInfo($musictitle, 2);
        $songArtist = self::formatSongInfo($musictitle, 3);
        $json[$songTitle]["Name"] = $songTitle;
        $json[$songTitle]["Artist"] = $songArtist;
        $json[$songTitle]["Genre"] = $songGenre;
        $json[$songTitle]["Style"] = $styleNames[$styleNum];
        
        //Grabs the scores
        $sp = self::getScores($musicdata, 0);
        $json[$songTitle]["Score"]["SP"] = $sp;
        
        self::writeToFileNew($json);
        return $json;
        
        
    }
    
    //Because the song info is written using linebreaks, this is necessary
    private static function formatSongInfo($data, $index) {
        
        $tempData = explode(">", $data)[$index];
        $tempData = explode("<", $tempData)[0];
        return trim($tempData);
        
    }
    
    
    //Gets scores based on the html score table and sp/dp accordingly. Returns an array
    private static function getScores($data, $type) {
        
        $tableRows = $data->find('.table_type_minfo')[$type]->find('tr');
        $clearLampRow = $tableRows[1];
        $rankingRow = $tableRows[2];
        $EXScoreRow = $tableRows[3];
        $MissRow = $tableRows[4];
        
        $scoreArray = array();
        
        $scoreArray["Normal"] = self::fillbyDifficulty($clearLampRow, $rankingRow, $EXScoreRow, $MissRow, 1);
        $scoreArray["Hyper"] = self::fillbyDifficulty($clearLampRow, $rankingRow, $EXScoreRow, $MissRow, 2);
        $scoreArray["Another"] = self::fillbyDifficulty($clearLampRow, $rankingRow, $EXScoreRow, $MissRow, 3);
        
        return $scoreArray;
        
    }
    
    //Helper function that grabs the data by difficulty and returns an array
    private static function fillbyDifficulty($clearLamp, $ranking, $EXScore, $Miss, $difficulty) {
        
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
    
    private static function writeToFileNew($content) {
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
                preg_match($pattern, $scripttoParse, $result);
                $numNotes = explode("=", $result[0])[1];
                $type = "SP";
                break;
            case 1:
                $pattern = '/\bif\b\(k\)\{\bnotes=\b\d+/';
                $difficulty = "Hyper";
                preg_match($pattern, $scripttoParse, $result);
                $numNotes = explode("=", $result[0])[1];
                $type = "SP";
                break;
            case 2:
                $pattern = '/\bif\b\(l\)\{\bnotes=\b\d+/';
                $difficulty = "Normal";
                preg_match($pattern, $scripttoParse, $result);
                $numNotes = explode("=", $result[0])[1];
                $type = "SP";
                break;
            case 6:
                $pattern = '/\bif\b\(g\)\{\bnotes=\b\d+/';
                $difficulty = "Beginner";
                preg_match($pattern, $scripttoParse, $result);
                $numNotes = explode("=", $result[0])[1];
                $type = "SP";
                break;
            case 7:
                $pattern = '/\bif\b\(l\)\{\bnotes=\b\d+/';
                $difficulty = "Normal";
                preg_match_all($pattern, $scripttoParse, $result);
                $numNotes = explode("=", $result[0][1])[1];
                $type = "DP";
                break;
            case 8:
                $pattern = '/\belse\b\{\bnotes=\b\d+/';
                $difficulty = "Hyper";
                preg_match($pattern, $scripttoParse, $result);
                $numNotes = explode("=", $result[0])[1];
                $type = "DP";
                break;
            case 9:
                $pattern = '/\bif\b\(a\)\{\bnotes=\b\d+/';
                $difficulty = "Another";
                preg_match_all($pattern, $scripttoParse, $result);
                $numNotes = explode("=", $result[0][1])[1];
                $type = "DP";
                break;
        }
        
        
//        preg_match($pattern, $scripttoParse, $result);
//        $numNotes = explode("=", $result[0])[1];
        
        $pattern = '/\bbpm\b\=[^;]+/';
        preg_match($pattern, $scripttoParse, $result);
        $bpm = str_replace('"', '', explode("=", $result[0])[1]);
        //This regex replace is needed for the rare case where the formatting is off
        $bpm = preg_replace('/\D+/', "~", $bpm);
        
        $pattern = '/\btitle\b\=[^;]+/';
        preg_match($pattern, $scripttoParse, $result);
        $songTitle = str_replace('"', '', explode("=", $result[0])[1]);
        
        echo $numNotes.$difficulty;
        
        //flock test
        $flockFile = fopen('../SongDB/lock.txt', 'r');
        if (flock($flockFile, LOCK_EX)) {
            $json_data = json_decode(file_get_contents('../SongDB/songDatabase2.json'), true);
            $json_data[$songTitle]["SP"][$difficulty]["Notes"] = $numNotes;
            $json_data[$songTitle]["SP"][$difficulty]["Level"] = $level;
            $json_data[$songTitle]["SP"][$difficulty]["BPM"] = $bpm;
            //ksort($json_data, SORT_NATURAL | SORT_FLAG_CASE);
            file_put_contents('../SongDB/songDatabase2.json', json_encode($json_data, JSON_UNESCAPED_UNICODE));
            flock($flockFile, LOCK_UN);
        }
    }
}
                  




?>