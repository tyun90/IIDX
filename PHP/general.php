<?php

require "database.class.php";
require "parser.class.php";
require "course.class.php";
require "iidxSite.class.php";
require "user.class.php";
require "songData.class.php";
require "parserTest.class.php";
include_once ('simple_html_dom.php');

header('Content-Type: text/html; charset=utf-8');

ini_set('display_errors', 1);
error_reporting(E_ALL);

database::connect();

switch($_POST["action"]) {
   
    case "login":
        $username = database::escapeString($_POST["username"]);
        $password = md5(database::escapeString($_POST["password"]));
        user::login($username, $password);
        break;
    
    case "parse":
        parser::test($_POST['index']);
        break;
    case "findID":
        $kid = $_POST["KID"];
        $kpw = $_POST["KPW"];
        user::findID($kid, $kpw);
        break;
    
    case "create":
        $username = database::escapeString($_POST["username"]);
        $password = md5(database::escapeString($_POST["password"]));
        $kid = database::escapeString($_POST["KID"]);
        $kpw = md5(database::escapeString($_POST["KPW"]));
        $id = database::escapeString($_POST["IIDXID"]);
        user::createAccount($username, $password, $kid, $kpw, $id);
        break;
    case "songs":
        course::createCourse($_POST["type"], "TEST");
        break;
    case "loadData":
        songData::getAllData();
        songData::getDataCurrStyle();
        break;
    case "submit":
        course::saveCourse($_POST["first"], $_POST["second"], $_POST["third"], $_POST["fourth"]);
        break;
    case "textage":
        parser::textageParse($_POST['link'], $_POST['level'], $_POST['diff']);
        break;
    case "test":
        $parseTest = new parserTest($_POST['index']);
        $parseTest->test();
}




?>