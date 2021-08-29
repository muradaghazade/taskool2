userTokenUrl = "/api/v1/user-data/";

if (localStorage.getItem('token')) {
  document.getElementById("log-out").style.display = "block"
}
else {
  document.getElementById("log-out").style.display = "none"
}

document.getElementById("log-out").addEventListener('click', () => {
  localStorage.removeItem('token')
  document.location.href = '/login'
})

getTokenData = () => {
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
    let jwt = `Bearer ${localStorage.getItem("token")}`
    console.log(jwt);
    fetch(userTokenUrl, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": jwt
        },
        // body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((data) => {
          // console.log(data);
          // if (data.is_teacher == 1) {
          //   document.getElementById('cre-link').innerHTML = `<a class="nav-link" href="/create-course">Create Course</a>`
            
          // }
         

          if (data.username != undefined) {
            document.querySelector(".user-data-here").innerHTML = `<a href="/profile"><button class="btn auth-reg my-2 my-sm-0 ml-4" type="submit">${data.username}</button></a>`
            if (data.is_student == 1) {
            document.querySelector(".user-data-here").innerHTML = `<a href="/student-profile"><button class="btn auth-reg my-2 my-sm-0 ml-4" type="submit">${data.username}</button></a>`
              
            }
          }
          else {
            document.querySelector(".user-data-here").innerHTML = `<a href="/login" style="color:white;">
            <button class="btn auth my-2 my-sm-0 ml-4" type="submit" style="color:white;">Login</button>
          </a>
          <a href="/register-type">
            <button class="btn auth-reg my-2 my-sm-0 ml-4" type="submit">Register</button>
          </a>`
          }
        })
}

getTokenData()

searchCourse = (data) => {
 
    
  fetch('/api/v1/core/all-courses/', {
    method: "POST",
    headers: {
        "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((data) => {
  console.log(data, 'geldimee');
  localStorage.setItem("search_result", JSON.stringify(data))
  document.location.href = '/course-list'
  console.log(document.getElementById("list-here"));
  // console.log(JSON.parse(localStorage.getItem("search_result")));
    })
}



document.querySelector(".nav-search").addEventListener('submit', (e) => {
e.preventDefault();

let data = {
  
}
title = document.querySelector('.nav-input').value
data.title = title
localStorage.setItem('search_keyword', title)
searchCourse(data)
})