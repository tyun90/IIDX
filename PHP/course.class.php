<?php

    class course{
                          
        
        public static function createCourse($type, $courseName) {
            
            $file = fopen("../Users/7658-3596/Migeki.json", 'r');
            
            switch ($type) {
                case 'listAll':
                    echo self::allSongs($file);
                    break;
                case 'RandomAll':
                    echo self::randomAll($file);
                    break;
            }            
        }
        
        
        private static function allSongs($songList) {
            $json = json_decode(fgets($songList), true);
            $songNames = array();
            foreach($json as $key => $value) {
                array_push($songNames, $key);
                echo $key."|";
            }
        }
        
        private static function randomAll($songList) {
            $json = json_decode(fgets($songList));
            $songNames = array();
            foreach($json as $key => $value) {
                array_push($songNames, $key);
            }
            $maxSongs = count($songNames)-1;
            $one = rand(0, $maxSongs);
            $two = rand(0, $maxSongs);
            $three = rand(0, $maxSongs);
            $four = rand(0, $maxSongs);
            //self::saveCourse($songNames[$one], $songNames[$two], $songNames[$three], $songNames[$four]);
            return $songNames[$one]."|".$songNames[$two]."|".$songNames[$three]."|".$songNames[$four];
        }
        
        public static function saveCourse($one, $two, $three, $four) {
            set_time_limit(0);
            $Alphabet = ["abcd","efgh","ijkl","mnop","qrst","uvwxyz"];
            $songList = [$one, $two, $three, $four];
            $firstLetters = [$one[0], $two[0], $three[0], $four[0]];
            $arrayIndex = 0;
            $pageNum = 0;
            for($arrayIndex = 0; $arrayIndex<4; $arrayIndex=$arrayIndex+1) {
                for($pageNum = 0; $pageNum<6; $pageNum=$pageNum+1) {
                    if(stripos($Alphabet[$pageNum], $firstLetters[$arrayIndex]) !== false) {   
                        $firstLetters[$arrayIndex] = $pageNum;
                        break;
                    }
                    if ($pageNum == 5) {
                        $firstLetters[$arrayIndex] = 6;   
                    }
                }
            }
            site::siteLogin();
            site::loadBufferPage('http://p.eagate.573.jp/game/2dx/22/p/customize/orc_make.html', false, "");
            $times = 0;
            $newLink = "";
            while ($times < 4) {
                $param = site::getTableParams($times, ".table_orico", 'a');
                $newLink = "list=".$firstLetters[$times]."&s=2&pos=".$times."&param=".$param."&style=0";
                site::loadBufferPage('http://p.eagate.573.jp/game/2dx/22/p/customize/orc_course_set_music.html', true, $newLink);
                $newLink = site::temporaryTest($songList[$times], ".table_type_list", 'a');
                site::loadBufferPage($newLink, false, "");
                $times = $times + 1;
            }
            site::showBufferPage();
            $submitParam = explode("param=", $newLink)[1];
            $submitLink = "strCourseName=TEST&strCourseKind=0&strCheck=1&param=".$submitParam."&send=%8D%EC%90%AC%82%B7%82%E9";
            site::loadBufferPage("http://p.eagate.573.jp/game/2dx/22/p/customize/orc_regist.html", true, $submitLink);
            site::close();
        }
        
        
    }
?>