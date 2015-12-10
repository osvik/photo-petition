<?php

/**
 * API endpoint to insert an image
 */

require_once('medoo.min.php');

require_once('config.php');

require_once('functions.php');

/**
 * Insert data into the images database
 */
function insert_image($database, $post) {
    $database->insert('images', array(
        'stime' => microtime(true),
        'created' => date("Y-m-d H:i:s"),
        'id' => $post['id'],
        'deletehash' => $post['deletehash'],
        'title' => $post['title'],
        'description' => $post['description'],
        'first_name' => $post['first_name'],
        'email' => $post['email'],
        'ip' => $post['ip']
    ));  
    
}
 
$post = array();

$post['id'] = isset( $_POST['id'] ) ? clean_input( filter_var($_POST['id'] , FILTER_SANITIZE_STRING), 10 ) : '';
$post['deletehash'] = isset( $_POST['deletehash'] ) ? clean_input( filter_var($_POST['deletehash'] , FILTER_SANITIZE_STRING), 20 ) : '';
$post['title'] = isset( $_POST['title'] ) ? clean_input( filter_var($_POST['title'] , FILTER_SANITIZE_STRING), 140 ) : '';
$post['description'] = isset( $_POST['description'] ) ? clean_input( filter_var($_POST['description'] , FILTER_SANITIZE_STRING), 640 ) : '';

$post['first_name'] = isset( $_POST['first_name'] ) ? clean_input( filter_var($_POST['first_name'] , FILTER_SANITIZE_STRING), 140 ) : '';
$post['email'] = isset( $_POST['email'] ) ? clean_input( filter_var($_POST['email'] , FILTER_SANITIZE_EMAIL), 140 ) : '';
$post['ip'] = isset( $_SERVER['REMOTE_ADDR'] ) ? clean_input( filter_var($_SERVER['REMOTE_ADDR'] , FILTER_SANITIZE_STRING), 45 ) : '';

insert_image($database, $post);

/* Generate jSON output */
$output = array();
$output['OK'] = "It's OK";
generate_json_output( $output );
 
?>
