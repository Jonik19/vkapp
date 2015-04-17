<?php
require('../api/lib/Csrf.php');
require('../api/Config.php');
require('../api/lib/User.php');


use Lib\Csrf;
// use Lib\User;

//settings
session_start();

if(!isset($_GET['auth_key']) || !isset($_GET['api_id']) || !isset($_GET['viewer_id']) ) {
  echo 'Go to IFrameq';
  return false;
}

$auth_key = $_GET['auth_key'];
$api_id = $_GET['api_id'];
$viewer_id = $_GET['viewer_id'];

$my_auth_key = md5($api_id . '_' . $viewer_id . '_' . Config::get('api_secret'));

if($auth_key === $my_auth_key) {
  $csrf = Lib\Csrf::generateCsrf();

  User::save(array(
    'id' => $viewer_id
  ));

  require('./main.html');
} else {
  echo "Go to IFrame";
}
