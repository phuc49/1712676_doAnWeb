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

function checkLogin() {
    var pw = document.getElementById("pw").value;
    var email = document.getElementById("email").value;
    var e = document.getElementById("error");

    if(email=='')
    {
        e.textContent = "Không được để trống email";
        return false;
    }
    if(pw == '') {
        e.textContent = "Không được để trống mật khẩu";
        return false;
    }

    if(pw1.length < 6)
    {
        e.textContent = "Mật khẩu gồm ít nhất 6 kí tự";
        return false;
    }
    return true;
}

function checkChangePw() {
    var pw1 = document.getElementById("new-password").value;
    var pw2 = document.getElementById("confirm-password").value;
    var current = document.getElementById("current-password").value;
    var e = document.getElementById("error");

    if(current=='')
    {
        e.textContent = "Không được để trống mật khẩu hiện tại";
        return false;
    }
    if(pw1 == '' || pw2 == '') {
        e.textContent = "Không được để trống mật khẩu mới";
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


function checkPw() {
    var pw1 = document.getElementById("new-pw").value;
    var pw2 = document.getElementById("confirm-pw").value;
    var e = document.getElementById("error");

    if(pw1 == '' || pw2 == '') {
        e.textContent = "Không được để trống mật khẩu mới";
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

function checkInfo() {
    let phone = document.getElementById("info-phone").value;
    var e = document.getElementById("error-phone");
    if(!phone || phone.length !=10 || isNaN(phone))
    {
        e.textContent = "Vui lòng điền số điện thoại hợp lệ";
        return false;
    }

    return true;
}


function checkEmail() {
    var email = document.getElementById("email").value;
    var e = document.getElementById("error");

    if(email=='')
    {
        e.textContent = "Không được để trống email";
        return false;
    }

    return true;
}

function checkUserCmt()
{
    const user = document.getElementById("user").value;
    const content = document.getElementById("content").value;
    const name = document.getElementById("customer_name").value;
    if(content == '') return false;
    if(isNaN(user) && name == ''){
        var e = document.getElementById("error");
        e.textContent = "Vui lòng điền tên hoặc đăng nhập để thêm bình luận";
        return false;
    }
    return true;
}