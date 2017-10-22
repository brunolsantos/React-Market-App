import $ from 'jquery';
import config from '../config/config';

export function getUserId() {
    let token = localStorage.getItem("token");
    let callback;
    $.ajax({
        type: "POST",
        url: config.api_url + "/api/user/validate",
        dataType: 'json',
        beforeSend: function (request) {
            request.setRequestHeader("token", token);
        },
        success: callback
    });
    return callback;
}