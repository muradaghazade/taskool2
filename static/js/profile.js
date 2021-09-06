getUsersUrl = '/api/v1/core/all-courses/';


async function getCourseList() {


 

  let jwt = `Bearer ${localStorage.getItem("token")}`
  // console.log(jwt,'salammmm');
  fetch("/api/v1/user-data/", {
      method: "POST",
      headers: {
          "Content-type": "application/json",
          "Authorization": jwt
      },
     
    })
      .then((resp) => resp.json())
      .then((user) => {
        console.log(user);
        document.getElementById('user-title').innerHTML = user.username
    document.getElementById('user-fullname').innerHTML = `${user.first_name} ${user.last_name}`
    document.getElementById('user-email').innerHTML = user.email
    localStorage.setItem('user_id', user.id)
        localStorage.setItem('user_id',user.id)
        fetch(getUsersUrl)
    .then((resp) => resp.json())
    .then((data) => {
      // console.log(data,'jnasjcknascksancksancskancsajkcnsajcsajsnans');
      data.forEach(element => {
        
        // console.log(element.teacher, "dfdfdhfd");
        if (user.id == element.teacher) {
          // console.log(element.is_shared);
          if (element.is_shared == true) {
            document.getElementById("created-section").innerHTML += `

            <div class="card col-3" style="width: 18rem; margin:25px;padding:0;"  id="${element.id}">
                      <div style="background: url(${element.image});    height: 200px;
                      background-size: cover;
                      background-repeat: no-repeat;"></div>
                      <div class="card-body">
                          <div class="row justify-content-between" style="align-items: center;">
                          <div class="col-7">
                              <h3 class="card-title" style="font-weight:bold; font-size: 17px;">${element.title}</h3>
            
                          </div>
                                                        </div>
                        <p class="card-text">${element.description}</p>
                        <div class="button-here">
                            <p style="color: green;">Published <i style="color: green;" class="fas fa-check"></i></p>
                        </div>
                        <a href="/edit-course/${element.id}" class="btn btn-dark" style="color:rgb(245, 223, 76);">Edit</a>
                        
                            <button id="delete" class="btn btn-dark" style="color:rgb(245, 223, 76);">Delete</button>
                      </div>
                    </div>



          
        
                    `
          }
          else {
            document.getElementById("created-section").innerHTML += `


            <div class="card col-3" style="width: 18rem; margin:25px;padding:0;"  id="${element.id}">
                      <div style="background: url(${element.image});    height: 200px;
                      background-size: cover;
                      background-repeat: no-repeat;"></div>
                      <div class="card-body">
                          <div class="row justify-content-between" style="align-items: center;">
                          <div class="col-7">
                              <h3 class="card-title" style="font-weight:bold; font-size: 17px;">${element.title}</h3>
            
                          </div>
                                                        </div>
                        <p class="card-text">${element.description}</p>
                        <div class="button-here">
                            <button id="publish" style="border:none; margin-bottom: 15px; background: none;">Publish</button>
                        
                        </div>
                        <a href="/edit-course/${element.id}" class="btn btn-dark" style="color:rgb(245, 223, 76);">Edit</a>
                        
                            <button id="delete" class="btn btn-dark" style="color:rgb(245, 223, 76);">Delete</button>
                      </div>
                    </div>

          
          
                    `
          }
          
                    // if (element.is_shared != true) {
                    //   document.getElementById('publish').parentElement.innerHTML = `<button id="publish" style="border:none; background: none;">Publish</button>`
                    // }
                    // else {
                    //   document.getElementById('publish').parentElement.innerHTML = `<p style="color: green;">Published <i style="color: green;" class="fas fa-check"></i></p>`

                    // }
                  // addButtonToCard()
                 
        }
        else {
          document.getElementById("created-section").innerHTML += ""
        }
          
      });
    })
      })

    
}

getCourseList()

// console.log(document.getElementById("course-here").firstElementChild);


// publishCourse = () => {
//   // console.log(document.getElementById("course-here").firstElementChild);
//   document.getElementById('publish').addEventListener('click', function() {
    
//   })

// }

// addButtonToCard = () => {
//   document.querySelectorAll('.button-here').forEach(e => {
//     let btn = document.createElement('button')
//     btn.setAttribute('class', 'publish')
//     btn.innerHTML = "Publish"
//     e.appendChild(btn)
//     btn.addEventListener('click', () => {
//       console.log('hi');
//     })
//   })
// }


document.addEventListener('click', (e) => {
 if (e.target.getAttribute('id') == 'publish') {
  data = {
    is_shared: true
  }
  pk = e.target.parentElement.parentElement.parentElement.getAttribute("id")
  console.log(pk);
  fetch(`/api/v1/core/course/${pk}/`, {
    method: "PATCH",
    headers: {
        "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data, 'published');
      e.target.parentElement.innerHTML = `<p style="color: green;">Published <i style="color: green;" class="fas fa-check"></i></p>`
    })
 }
 else if (e.target.getAttribute('id') == 'delete') {
  pk = e.target.parentElement.parentElement.getAttribute("id")
  console.log(pk);
  confirmation = confirm("Are you sure you want to delete this question?")

  if (confirmation == true) {
    fetch(`/api/v1/core/course/${pk}/`, {
      method: "DELETE",
      headers: {
          "Content-type": "application/json",
      }
    })
      .then((resp) => resp.text())
      .then((data) => {
        // console.log(data, 'DELETED');
        
        e.target.parentElement.parentElement.style.display = "none"
      })
  }
  
 }
})





async function getSharedCourseList() {


 

  let jwt = `Bearer ${localStorage.getItem("token")}`
  // console.log(jwt,'salammmm');
  fetch("/api/v1/user-data/", {
      method: "POST",
      headers: {
          "Content-type": "application/json",
          "Authorization": jwt
      },
     
    })
      .then((resp) => resp.json())
      .then((user) => {
        console.log(user);
        localStorage.setItem('user_id',user.id)
        fetch(getUsersUrl)
    .then((resp) => resp.json())
    .then((data) => {
      // console.log(data,'jnasjcknascksancksancskancsajkcnsajcsajsnans');
      data.forEach(element => {
        
        // console.log(element.teacher, "dfdfdhfd");
        if (user.id == element.teacher && element.is_shared == true) {
          
          document.getElementById("shared-course-here").innerHTML += `
          
          <div style="width: 1300px;" class="col-1 created" id="${element.id}">
                        <div class="card">
                            <div class="for-image">
                                <img src="${element.image}" class="card-img-top" alt="...">
                            </div>
                            <div class="card-body p-0">
                              <h5 class="card-title text-center mt-2">${element.title}</h5>
                            </div>
                            <div class="d-flex" style="justify-content: space-around;">
                            <div>
                            <a href="/edit-course/${element.id}">Edit</a>
                            </div>
                            </div>
                          </div>
                    </div>
                    `
                  // addButtonToCard()
        }
        else {
          document.getElementById("course-here").innerHTML += ""
        }
          
      });
    })
      })

    
}


getSharedCourseList()