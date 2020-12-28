function check() {
    var pw1 = document.getElementById("pw1").value;
    var pw2 = document.getElementById("pw2").value;
    var email = document.getElementById("email").value;
    var e = document.getElementById("error");

    if(email=='')
    {
        e.textContent = "Không được để trống email";
        return false;
    }
    if(pw1 == '' || pw2 == '') {
        e.textContent = "Không được để trống mật khẩu";
        return false;
    }

    if(pw1 != pw2)
    {
        e.textContent = "Mật khẩu không khớp";
        return false;
    }

    if(pw1.length < 6)
    {
        e.textContent = "Mật khẩu gồm ít nhất 6 kí tự";
        return false;
    }
    return true;
}