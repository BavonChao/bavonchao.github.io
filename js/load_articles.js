$(document).ready(function () {
    $.ajax({
        url: host + "/api/articles/",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (request) {
            var articles_html = '';
            for (var i = 0; i < request.length; i++) {
                articles_html += '<div class=\"col-sm-6 col-lg-4 mb-4\">' +
                '<div class=\"blog-entry\">' +
                '<a href="'+request[i].url+'"><img src="' + request[i].img_url +
                '" alt="Image placeholder" class="img-fluid"></a>' +
                '<div class="blog-entry-text">' +
                '<h3><a href="' + request[i].url + '">' + request[i].title +
                '</a></h3>' +
                '<p class="mb-4">' + request[i].article_summary + '</p>' +
                '<div class="meta">\n' +
                '<a href="#"><span class="icon-calendar"></span>' + request[i].publish_date + '</a>' +
                '<a href="#"><span class="icon-bubble"></span> ' + request[i].comment_count + '</a>' +
                '</div></div></div></div>'
                ;
            }
            $("#articles").html(articles_html)
        },
        error: function () {
            $("#article_error_msg").show()
        }
    });
});