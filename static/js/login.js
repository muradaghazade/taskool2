let loginUrl = '/api/v1/login/';

login = (username,password) => {
    // formdata = new FormData();
    // formdata.append("firstname", firstname);
    // formdata.append("lastname", lastname);
    // formdata.append("email", email);
    // formdata.append("password1", password1);
    // formdata.append("password2", password2);
    // formdata.append("age", age);
    // formdata.append("is_teacher", true);
    // formdata.append("is_student", false);
    // for (const [k, v] of formdata) {
    //     console.log(k, v);
    //   }
    data = {
        username: username,
        password: password
    }
    fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data.detail);
          var d = new Date();
          d.setMonth(d.getMonth() + 1);
          console.log(d)
          localStorage.setItem("token", data.access);
          document.cookie = `token=${data.access}; expires=${d} UTC; path=/`
          if (data.detail != "No active account found with the given credentials") {
            document.location.href = '/'
            
          }
          else {
            document.getElementById("callback").innerHTML = data.detail
          }
        })
}

document.getElementById("loginForm").addEventListener('submit', (e) => {
    e.preventDefault()
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    login(username,password)
})