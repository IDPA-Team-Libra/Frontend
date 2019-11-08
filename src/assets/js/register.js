function register_switchPassword() {
    var password_field = $("#password");
    var password_lock = $("#password_lock");
    if (password_field.attr('type') == "password") {
        password_field.attr('type', "txt");
        password_lock.text("lock_open");
    } else {
        password_field.attr('type', "password");
        password_lock.text("lock");
    }
}

function register_registerPressed(){
    var top_triangle = $(".triangle-up");
    var bottom_triangle = $(".triangle-down");
    bottom_triangle.animate({top: '250px'});
}