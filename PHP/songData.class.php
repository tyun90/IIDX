<?php

class songData {
    
 
    public static function getAllData() {
     
        $file = fopen("../Users/7658-3596/Migeki.json", 'r');
        $data = json_decode(fgets($file), true);
        $fileTwo = fopen("../SongDB/songDatabase.json", 'r');
        $dataTwo = json_decode(fgets($fileTwo), true);
        foreach($data as $key => $value) {
            //Name Check
            //$data[$key]["SP"]["Another"]["Notes"] = $dataTwo[$key]["SP"]["Normal"]["Notes"];
            $tempTwo = $dataTwo[$key]["SP"];
            if (isset($tempTwo["Another"])) {
                $value["Score"]["SP"]["Another"]["Notes"] = $tempTwo["Another"]["Notes"];
                $value["Score"]["SP"]["Another"]["Level"] = $tempTwo["Another"]["Level"];
                $value["Score"]["SP"]["Another"]["BPM"] = $tempTwo["Another"]["BPM"];
            }
            if (isset($tempTwo["Hyper"])) {
                $value["Score"]["SP"]["Hyper"]["Notes"] = $tempTwo["Hyper"]["Notes"];
                $value["Score"]["SP"]["Hyper"]["Level"] = $tempTwo["Hyper"]["Level"];
                $value["Score"]["SP"]["Hyper"]["BPM"] = $tempTwo["Hyper"]["BPM"];
            }
            $value["Score"]["SP"]["Normal"]["Notes"] = $tempTwo["Normal"]["Notes"];
            $value["Score"]["SP"]["Normal"]["Level"] = $tempTwo["Normal"]["Level"];
            $value["Score"]["SP"]["Normal"]["BPM"] = $tempTwo["Normal"]["BPM"];
            echo json_encode($value, JSON_UNESCAPED_UNICODE)."|";
            
        }
    }
    
    public static function getDataCurrStyle() {
        echo "|";
        $file = fopen("../Users/7658-3596/PENDUAL.json", 'r');
        $data = json_decode(fgets($file), true);
        foreach($data as $key => $value) {
            
            echo json_encode($value, JSON_UNESCAPED_UNICODE)."|";
            
        }
    }
    
    public static function fillNewPB($userFile) {
        $songData = json_decode(fopen("../SongDB/songDatabase.json", 'r'), true);
        $newData = json_decode($userFile, true);
        foreach($songData as $key => $value) {
            $newData[$key] = $value;
        }
        
    }
    
    
}


?>