<?php

class database {
    private static $db;
    private $mysqli;
    
    private function __construct() {
        $this->mysqli = new mysqli('localhost', 'root', '', 'userinfo');
    }

    public static function connect() {
        self::$db = new self();
    }
    
    public static function query($q) {
        return self::$db->mysqli->query($q);
    }
    
    public static function escapeString($string) {
        return self::$db->mysqli->real_escape_string($string);
    }
    
}



?>