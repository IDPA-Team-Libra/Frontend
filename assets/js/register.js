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