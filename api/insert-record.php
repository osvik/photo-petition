<?php

/**
 * API endpoint to sign a petition in Engaging Networks
 */

require_once('medoo.min.php');
 
require_once('config.php');

require_once('functions.php');

/**
 * Get and sanitize post data
 */
function getPostData() {
	$post = array();
	$post['first_name'] = isset( $_POST['first_name'] ) ? SafeInput( $_POST['first_name'], 30): '';
	$post['email'] = isset( $_POST['email'] ) ? addslashes( filter_var( $_POST['email'], FILTER_SANITIZE_EMAIL ) ) : '';
	return $post;
}

/**
 * Check how many errors there's in the form data
 */
function errorsInForm( $postData ) {
    $errors = array();
    // first_name
    if ( !$postData['first_name'] ) {
        array_push( $errors, 'first_name');
    }   
    // email
    if ( ( $postData['email']!="" and !filter_var( $postData['email'], FILTER_VALIDATE_EMAIL) ) or ( $postData['email']=="" )  ) {
        array_push( $errors, 'email');
    }
    return $errors;
}

// --------- PROCESS ---------

// Input
$postData = getPostData();
$errorsInForm = errorsInForm( $postData );

if ( count( $errorsInForm ) == 0 ) {
	$data = array(
	'first_name' => $postData['first_name'],
	'email' => $postData['email']
	);
	signupEngagingNetworks( $data );
}

// --------- Output Json
$response = array();
$response['error_count'] = count( $errorsInForm ) ;
$response['errors'] = $errorsInForm;
$response['post'] = $postData;

generate_json_output( $response );

?>