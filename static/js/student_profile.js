let jwt = `Bearer ${localStorage.getItem("token")}`
console.log(jwt);
fetch(`/api/v1/user-data/`, {
  method: "POST",
  headers: {
    "Content-type": "application/json",
    "Authorization": jwt
  },
  // body: JSON.stringify(data),
})
  .then((resp) => resp.json())
  .then((user) => {
    console.log(user);
    document.getElementById('user-title').innerHTML = user.username
    document.getElementById('user-fullname').innerHTML = `${user.first_name} ${user.last_name}`
    document.getElementById('user-email').innerHTML = user.email
    localStorage.setItem('user_id', user.id)
    url = "/api/v1/core/all-courses/";

    getCourseList = () => {
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          // console.log(data, 'nedibubele');
          fetch('/api/v1/core/all-order/')
            .then((resp) => resp.json())
            .then((orders) => {
              // console.log(orders);
              orders.forEach(order => {
                if (order.user == user.id) {
                  data.forEach(course => {
                    if (order.course == course.id) {
                      document.getElementById("created-section").innerHTML += `
                      <div class="card col-3" style="width: 18rem; margin:25px;padding:0;">
                      <div style="background: url(${course.image});    height: 200px;
                      background-size: cover;
                      background-repeat: no-repeat;"></div>
                      <div class="card-body">
                          <div class="row justify-content-between" style="align-items: center;">
                          <div class="col-7">
                              <h3 class="card-title" style="font-weight:bold; font-size: 17px;">${course.title}</h3>
                              <p class="card-text">for ${course.course_deadline} weeks</p>
                          </div>
                              <h5 class="card-title col-4" style="width:80%;display: flex;justify-content: center;align-items: center;background-color: rgb(245, 223, 76); border-radius: 5px;font-size:13px;color:white;padding: 10px 0px;">${course.price} AZN</h5>
                          </div>
                        <p class="card-text">${course.description}</p>
                        <a href="/course/${course.id}" class="btn btn-dark" style="color:rgb(245, 223, 76);">Choose a course</a>
                      </div>
                    </div>
                      `
                    }
                  })
                }
              });
            })
        })
    }

    getCourseList()
  })