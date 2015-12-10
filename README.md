How to install and configure this script
================

## Downlad and install

### Download

Using git:

`git clone `

### How to build he project:

This project uses [Gulp](http://gulpjs.com/) to generate the css and javascript.

To generate the code in the terminal run the following commands:

* `cd path/to/your/downloaded-site`
* Install gulp (read bellow)
* `gulp`

### How to install Gulp

1. [Install Gulp](http://gulpjs.com/)

You'll also need to install gulp's dependencies **in the site's folder** by running the commands:

* `sudo npm install --save-dev gulp-minify-css`
* `sudo npm install --save-dev gulp-uglify`
* `sudo npm install --save-dev gulp-rename`
* `sudo npm install --save-dev gulp-concat`


## Configure

### A - The connection with Engaging Networks
1. Create and publish a working data capture campaign and note the `CLIENT_ID`, `CAMPAING_ID` and `FORM_ID` values from it's form.
- Edit the `campaign_id` and `form_id` in `api/config.php` adding the correct numbers from Engaging Networks:

```
define('CLIENT_ID', 'xxxx' );
define('CAMPAIGN_ID', 'xxxxx');
define('FORM_ID', 'xxxx');
```

You may need to ensure the field names match the ones you are using in Engaging.

### B - The connection to Imgur

1. Obtain a *client id* from IMGUR at https://api.imgur.com/oauth2/addclient
- Rename `config-DIST.js` to `config.js` and change the authorization parameter `var client_id`

### C - The connection to the mages database

This program uses a sqlite database to store the image's URLs and other related information. This database can be edited with any online/offline compatible editor.

Ensure that the **file** with the images database (`api/db/images.db`) and the **parent folder** (`api/db/`) can be overwritten by the server. Use the right permissions/ownership for this folder and file.


### D - The location of the api folder

If the `api` folder is located a different server you may need to change the script.

## Translate

Most translations can be done in `index.html`, including the `script` tag at the end.

