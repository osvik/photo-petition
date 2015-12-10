<?php

/**
 * Config file
 */

/* Enable error messages, disable when in production */
ini_set('display_startup_errors',1);
ini_set('display_errors',1);
error_reporting(E_ALL);

/* Time zone - Check PHP manual */
date_default_timezone_set('Europe/Madrid');

/* Engaging networks params */
define('CLIENT_ID', '' );
define('CAMPAIGN_ID', '');
define('FORM_ID', '');

/* Database connection */
$database = new medoo( array(
    'database_type' => 'sqlite',
    'database_file' => 'db/images.db'
));

/* Number of images from the database */
define('NUMBER_OF_IMAGES', 12);

?>
