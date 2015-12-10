<?php

/**
 * API endpoint to return a list with the latest images
 */

require_once('medoo.min.php');

require_once('config.php');

require_once('functions.php');

/**
 * Retrieve a list of info from the database 
 */
function get_latest_images( $database, $limit = 5 ) {
    $datas = $database->select('images',
        array ('stime', 'created', 'id', 'title', 'description', 'first_name'),
        array(
            'LIMIT' => $limit,
            'ORDER' => 'stime DESC'
        )
    );
    
    return $datas;
}

$results = get_latest_images( $database, NUMBER_OF_IMAGES );

/* Generate output */
generate_json_output( $results );

?>