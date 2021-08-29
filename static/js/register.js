registerURL = '/api/v1/register/';



register = (username, firstname, lastname, email, password1, password2, age, number, occupation) => {
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
        first_name: firstname,
        last_name: lastname,
        email: email,
        password: password1,
        password2: password2,
        age: age,
        number: number,
        occupation:occupation,
        is_teacher: true,
        is_student: false
    }
    fetch(registerURL, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resp) => {console.log(resp)
        localStorage.setItem('last_response_code', resp.status)
        return resp.json()
        })
        .then((data) => {
          // console.log(data);
          if (localStorage.getItem('last_response_code') != 201) {
            for (const [key, value] of Object.entries(data)) {
              console.log(key, value);
              document.getElementById("callbacks").innerHTML += `
              <p>*${value}</p>
              ` 
            }
          }
          else {
            // console.log('partdatdin')
            document.location.href = '/login'
          }
        })
}

document.getElementById("regForm").addEventListener('submit', (e) => {
    e.preventDefault()
    let username = document.getElementById('username').value;
    let firstname = document.getElementById('firstname').value;
    let lastname = document.getElementById('lastname').value;
    let email = document.getElementById('email').value;
    let password1 = document.getElementById('password1').value;
    let password2 = document.getElementById('password2').value;
    let age = document.getElementById('age').value;
    let number = document.getElementById('number').value;
    let occupation = document.getElementById('occupation').value;
    console.log(firstname);
    register(username, firstname, lastname, email, password1, password2, age, number, occupation)
})