function makeFacebookLink(url) {
    var encodedURL = encodeURIComponent(url);
    var shareURL = "http://www.facebook.com/sharer.php?u=" + encodedURL;
    return shareURL
}

function makeTwitterLink(text, url) {
    var encodedText = encodeURIComponent(text);
    var encodedURL = encodeURIComponent(url);
    var shareURL = "http://twitter.com/intent/tweet?text=" + encodedText + encodeURIComponent(" ") + encodedURL + "&source=webclient";
    return shareURL
}

function makeGoogleplusLink(url) {
    var encodedURL = encodeURIComponent(url);
    var shareURL = "https://plus.google.com/share?url=" + encodedURL;
    return shareURL
}

function makeLinkedinLink(url) {
    var encodedURL = encodeURIComponent(url);
    var shareURL = "https://www.linkedin.com/cws/share?url=" + encodedURL;
    return shareURL
}


function displayImgur() { // Executed at page load and when a new photo is uploaded.
    
if( $("#imgurImageList").length ) {

    $.ajax({
        url: api_folder_url + "api/latest-images.php",
        type: "GET",
        beforeSend: function(){
            $("#imgurImageList").empty();
        }
    }).done( function(data) {
        var imageID, imageURL, imageImgur;
        $.each( data, function(index, value) {
            imageID = value.id;
            imageURL = "http://i.imgur.com/" + imageID + "b.jpg";
            imageImgur = "http://imgur.com/" + imageID;
            $("#imgurImageList").append('<li><a target="_blank" href="' + imageImgur + '"><img src="' + imageURL  + '" alt="" /></a></li>');
        });
    });
    }
    
}

window.atempts3 = 0;

validator3 = $("#postImage").validate({

    submitHandler: function(form) {

        atempts3 = atempts3 + 1;

        if ( atempts3 == 1 ) {

            if( $("#file").val() !="" ) {

                var formData = new FormData();
                formData.append('image', $('input[type=file]')[0].files[0]);
                formData.append("title", $("#title").val() );
                formData.append("description", $("#description").val() );

                $.ajax({
                    url: "https://api.imgur.com/3/upload",
                    type: "POST",
                    headers: {
                      "Authorization": "Client-ID " + client_id
                    },
                    data: formData,
                    contentType: false,
                    processData: false,
                    beforeSend: function() {

                        // Show Waiting for the upload message
                        $("#postImageUploading").removeClass("hidden").addClass("show");
                    }
                }).done( function(data) {

                    /* AFTER THE IMAGE UPLOAD */

                        /* Send data to the sqlite database */
                        var first_name = $("#postImage #first_name").val();
                        var email = $("#postImage #email").val();
                        $.ajax({

                            "url" : api_folder_url + "api/insert-image.php",
                            "type" : "POST",
                            "data" : {
                                "first_name": first_name ,
                                "email": email,
                                "id" : data.data.id,
                                "deletehash": data.data.deletehash,
                                "title": data.data.title,
                                "description" : data.data.description
                            }
                        }).done( function(data2) {
                            
                            // After data is inserted in the SQLITE database
                            
                            // Remove the "uploading" message
                            $("#postImageUploading").removeClass("show").addClass("hidden");
                            
                            // Show uploaded photo in thank you message
                            var smallPhotoURL = "http://i.imgur.com/" + data.data.id + "l.jpg";
                            $("#uploadedPhoto img").prop("src", smallPhotoURL);
                            $("#uploadedPhoto").removeClass("hidden").addClass("show");
                            
                            // Facebook and Twitter Links
                            var facebookShareLink = makeFacebookLink("http://imgur.com/" + data.data.id );
                            var twitterShareLink = makeTwitterLink( $("#title").val(), "http://imgur.com/" + data.data.id);
                            var googleplusShareLink = makeGoogleplusLink("http://imgur.com/" + data.data.id );
                            var linkedinShareLink = makeLinkedinLink("http://imgur.com/" + data.data.id );
                            $("#facebookShareLink").prop("href", facebookShareLink );
                            $("#twitterShareLink").prop("href", twitterShareLink );
                            $("#googleplusShareLink").prop("href", googleplusShareLink );
                            $("#linkedinShareLink").prop("href", linkedinShareLink );
                            $("#shareLinks").removeClass("hidden").addClass("show");
                            
                            // Make a meme link
                            $("#memeShareLink").prop("href", "http://imgur.com/memegen/create/" + data.data.id );
                            $("#memeLink").removeClass("hidden").addClass("show");
                            
                            displayImgur();
                            
                        }).error( function(data2) {
                            // Error inserting data in SQLLITE
                            $("#postImageUploading").removeClass("show").addClass("hidden");
                        });
                        /* / Send data to the sqlite database */

                    /* /AFTER THE IMAGE UPLOAD */

                    // Google Analytics upload event
                    typeof ga == "function" && ga('send', 'event', campaign_name, 'Upload', 'OK' );
                    typeof (_gaq ) == "object" && _gaq.push(['_trackEvent', campaign_name, 'Upload', 'OK']);

                }).always(function(){


                }).error(function(){

                    // Error sending the data to Imgur
                    // Show error message
                    // Google Analytics error event
                    typeof ga == "function" && ga('send', 'event', campaign_name, 'Upload', 'Error' );
                    typeof (_gaq ) == "object" && _gaq.push(['_trackEvent', campaign_name, 'Upload', 'Error']);

                });                


        } // /endif $("#file").val() !=""


        /* BEGIN - Send data to Engaging */
        var first_name = $("#postImage #first_name").val();
        var email =$("#postImage #email").val();

        jQuery.ajax({

            "url" : api_folder_url + "api/insert-record.php",
            "type" : "POST",
            "data" : {
                "first_name": first_name,
                "email": email,
                "id_number": "",
                "privacy": "Y"
            }

        }).done( function(data) {

            /* This code executes if the Ajax call works well */
            typeof ga == "function" && ga('send', 'event', campaign_name, 'Signup', 'OK' );
            typeof (_gaq ) == "object" && _gaq.push(['_trackEvent', campaign_name, 'Signup', 'OK']);

        }).always( function() {

            $("#postImage").addClass("hidden");
            $("#postImagethankyou").removeClass("hidden").addClass("show");
            
            $('html, body').animate({
					scrollTop: $("#postImagethankyou").offset().top
				}, 1000);

        }).error( function() {

            typeof ga == "function" && ga('send', 'event', campaign_name, 'Signup', 'Error' );
            typeof (_gaq ) == "object" && _gaq.push(['_trackEvent', campaign_name, 'Signup', 'Error']);

        });

        /* END - Send data to Engaging */ 

        } // Endif Atempts3

    },

    messages: {
        first_name: {
            required: error_messages.first_name_required
        },
        email: {
            required: error_messages.email_required,
            email: error_messages.email_email
        },
        file: {
            accept: error_messages.file_accept
        },
        privacy: {
            required:error_messages.privacy_required
        }
    },
    
    rules: {
        file: {
            accept: "image/jpeg"
        }
    }

});


// Show existing images in the galery
displayImgur();

