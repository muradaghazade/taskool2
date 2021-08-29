url = "/api/v1/core/all-courses/";

getCourseList = () => {
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      let courses = []
      data.forEach(e => {
        console.log(e.category);
        if (e.category == 1 && e.is_shared == true) {
          courses.push(e)
        }
      })
      console.log(courses);
      console.log(courses.slice(0,4));
      console.log(document.querySelector(".fleximg"));
      courses.slice(0,4).forEach(element => {
          document.querySelector(".flexxx").innerHTML += `
          
          <div class="col-md-3 mb-3 col-12">
          <div class="card" style=" height: 350px;">
          <a href="/course/${element.id}" style="color: black; text-decoration: none;">
  <div class="card-img-top" style="background: url(${element.image}); height: 170px; background-size: cover;"></div>
</a>

  <div class="card-body">
  <h4 class="mt-3">${element.title}</h4>
  <p>${element.description}</p>
  <h6 class="card-text">${element.price}AZN</h6>
  </div>
</div>
          </div>






         
        
        
          `
      });
    })
}

getInternshipList = () => {
  fetch(url)
  .then((resp) => resp.json())
  .then((data) => {
    let courses = []
    data.forEach(e => {
      console.log(e.category);
      if (e.category == 2 && e.is_shared == true) {
        courses.push(e)
      }
    })
    console.log(courses);
    console.log(courses.slice(0,4));
    console.log(document.querySelector("#fleximg2"));
    courses.slice(0,4).forEach(element => {
        document.querySelector("#fleximg2").innerHTML += `
        <div class="col-md-3 col-12" style="padding: 50px 30px;">
        <a style="text-decoration: none;" href="course/${element.id}">

        <div style="background: url(${element.image}); background-size: cover; background-repeat: no-repeat; height: 350px; padding: 20px; padding-top: 250px; border-radius: 3px;">
          <h3 style="color: white; font-weight: 200;">Price ${element.price}AZN</h3>
          <span style="color: white;">${element.title}</span>
          </div>
          </a>
        </div>
      
        `
    });
  })
}

// getBTaskList = () => {
//   fetch(url)
//   .then((resp) => resp.json())
//   .then((data) => {
//     let courses = []
//     data.forEach(e => {
//       console.log(e.category);
//       if (e.category == 3 && e.is_shared == true) {
//         courses.push(e)
//       }
//     })
//     console.log(courses);
//     console.log(courses.slice(0,4));
//     console.log(document.querySelector("#fleximg3"));
//     courses.slice(0,4).forEach(element => {
//         document.querySelector("#fleximg3").innerHTML += `

//         <div class="col-md-3 mb-3 col-12">
//           <div class="card" style=" height: 350px;">
//           <a href="/course/${element.id}" style="color: black; text-decoration: none;">
//   <div class="card-img-top" style="background: url(${element.image}); height: 170px; background-size: cover;"></div>
// </a>

//   <div class="card-body">
//   <h4 class="mt-3">${element.title}</h4>
//   <p style="height: 50px; overflow: scroll;">${element.description}</p>
//   <h6 class="card-text">AZN${element.price}</h6>
//   </div>
// </div>
//           </div>
        
        
      
//         `
//     });
//   })
// }

// url_users = "http://localhost:8000/api/v1/show-users/";

// getUsersList = () => {
//     fetch(url)
//     .then((resp) => resp.json())
//     .then((data) => {
//       console.log(data.slice(0,4));
//       console.log(document.querySelector(".fleximg"));
//       data[0].forEach(element => {
//           document.querySelector(".instructor__title").innerHTML += `
          
//           <div class="insimg">
//             <img src="${element.image}" alt="" />
//           </div>
//           <div class="instext">
//             <h3>Become an instructor</h3>
//             <p>
//               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem
//               molestiae nulla veritatis esse quam soluta atque eum vel. A esse
//               alias obcaecati suscipit dolorem maxime consequatur corrupti
//               temporibus voluptatibus qui?
//             </p>
//             <button>Start teaching today</button>
//           </div>
          
        
//           `
//       });
//     })
// }

// getCourseList()

getCourseList()
getInternshipList()
getBTaskList()




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



document.querySelector(".nav2-search").addEventListener('submit', (e) => {
e.preventDefault();

let data = {
  
}
title = document.querySelector('.nav2-input').value
data.title = title
localStorage.setItem('search_keyword', title)
searchCourse(data)
})

