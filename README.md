How to install and configure this script
================

## Downlad and install

### Download

Clone the repository with git:

`git clone https://github.com/osvik/photo-petition.git`

### How to build he project:

This project uses [Gulp](http://gulpjs.com/) to generate the css and javascript. You need to install Gulp and the required modules. After that you need to generate the code in the terminal run the following commands:

* `cd path/to/your/downloaded-site`
* Install gulp (read bellow)
* `gulp`

#### How to install Gulp

* [Install Gulp](http://gulpjs.com/)

You'll also need to install gulp's dependencies **in the site's folder** by running the commands:

* `sudo npm install --save-dev gulp-minify-css`
* `sudo npm install --save-dev gulp-uglify`
* `sudo npm install --save-dev gulp-rename`
* `sudo npm install --save-dev gulp-concat`


## Configure

### A - The connection with Engaging Networks
1. Create and publish a working data capture campaign and note the `CLIENT_ID`, `CAMPAING_ID` and `FORM_ID` values from it's form.
- Rename `api/config-DIST.php` to `api/config.php` and change `client_id`, `campaign_id` and `form_id` to match the numbers from the Engaging Networks form:

```
define('CLIENT_ID', 'xxxx' );
define('CAMPAIGN_ID', 'xxxxx');
define('FORM_ID', 'xxxx');
```

You need to confirm that the field names match the ones you are using in Engaging Networks. In case they don't you need to modify this script.

### B - The connection to Imgur

1. Obtain a *client id* from IMGUR at https://api.imgur.com/oauth2/addclient
- Rename `config-DIST.js` to `config.js` and change the authorization parameter `var client_id`

### C - The connection to the mages database

This program uses a sqlite database to store the image's URLs and other related information. This database can be edited with any online/offline compatible editor.

Ensure that the **file** with the images database (`api/db/images.db`) and the **parent folder** (`api/db/`) can be overwritten by the server. Use the right permissions/ownership for this folder and file.


### D - The location of the api folder

If the `api` folder is located a different server you may need to change the script.

## Translate

Most, if not all translations can be done editing the files `index.html` and `config.js`


