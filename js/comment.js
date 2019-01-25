// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
            xhr.setRequestHeader('Content-Type', 'text/plain charset=UTF-8');
            xhr.withCredentials = true;
        }
    }
});

$(document).ready(function () {

    $("#csrftoken").val(csrftoken);
    $("#submit_comment").click(function (e) {
        e.preventDefault();
        var name = $("#name").val();
        var email = $("#email").val();
        var number = $("#number").val();
        var content = $("#content").val();
        var csrfmiddlewaretoken = getCookie("csrftoken");
        if (name == "" || email == "" || number == "" || content == "") {
            $("#comment_error_msg").show();
            return
        }
        params = {
            name: name,
            email: email,
            number: number,
            content: content,
        };
        data = JSON.stringify(params);
        // var params = $.param($("#comment_form input:no-button"));
        $.ajax({
            url: host + "/api/comments/",
            type: "POST",
            contentType: "application/json",
            data: data,
            headers: {
                "X-CSRFtoken": csrfmiddlewaretoken,
                'Content-Type': 'text/plain charset=UTF-8',
            },
            xhrFields: {
                withCredentials: true
            },
            success: function (resp) {
                $("#comment_error_msg").html(resp.msg);
                $("#comment_error_msg").show();
                $("#content").html("")
            },
            error: function () {
                $("#comment_error_msg").html("失败了，知道为什么失败吗，一个厨师不看菜谱，看上兵法了");
                $("#comment_error_msg").show();
            }
        })

    })
});
