<?php

/**
 * Functions file
 */

 
 /**
  * Data sanitization funtion 1
  *
  */
function clean_input( $data, $size ) {
    $data = trim($data);
    $data = substr($data, 0, $size);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

 /**
  * Data sanitization funtion 2
  *
  */
function SafeInput( $msg, $limit ) {
    if ( $msg == "") {
        return $msg;
    }
    $a = filter_var( $msg, FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW );
    $b = addslashes ( $a );
    $c = substr($b, 0, $limit );
    return $c;
}

/**
 * Outputs a jSON from an asociative array
 *
 * @param array $output Associative array
 */
function generate_json_output( $output ) {
    $output = json_encode( $output);
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *" );
    echo ($output);
}

/**
 * Signs up a petition in Engaging Networks
 *
 * @param array $data The post request
 * 
 */
function signupEngagingNetworks( $userdata ) {
	$constant = array(
		'ea_requested_action' => 'ea_submit_user_form',
		'ea_javascript_enabled' => 'false',
		'ea.AJAX.submit' => 'false',
		'ea.client.id' => CLIENT_ID,
		'ea.campaign.id' => CAMPAIGN_ID,
		'ea.form.id' => FORM_ID,
		'ea.submitted.page' => '1',
	);
	$data = array_merge( $constant, $userdata );
	$url = 'https://act.greenpeace.org/ea-action/action';
	$options = array(
		'http' => array( // use key 'http' even if you send the request to https://...
			'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
			'method'  => 'POST',
			'content' => http_build_query($data),
			'follow_location' => false,
			'max_redirects' => 3
		),
	);
	$context  = stream_context_create($options);
	$result = file_get_contents($url, false, $context);
	return $result;
}

?>