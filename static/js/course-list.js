url = "/api/v1/core/all-courses/";

getCourseList = () => {
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      data.forEach(element => {
          console.log(element.category);
          if (element.category == 1 && element.is_shared == true) {
            document.getElementById("list-here").innerHTML += `
            <div class="card col-3" style="width: 18rem; margin:25px">
            <img src="${element.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <div class="row justify-content-between" style="align-items: center;">
                <div class="col-7">
                    <h3 class="card-title" style="font-weight:bold;">${element.title}</h3>
                    <p class="card-text">for ${element.course_deadline} weeks</p>
                </div>
                    <h5 class="card-title col-4" style="width:80%;display: flex;justify-content: center;align-items: center;background-color: rgb(245, 223, 76); border-radius: 5px;font-size:16px;color:white;padding: 10px 0px;">${element.price} AZN</h5>
                </div>
              <p class="card-text">${element.description}</p>
              <a href="/course/${element.id}" class="btn btn-dark" style="color:rgb(245, 223, 76);">Choose a course</a>
            </div>
          </div>
            `
          }
          
      });
    })
}





if (localStorage.getItem('search_result')) {
    JSON.parse(localStorage.getItem("search_result")).forEach(e => {
        console.log(e);
        document.getElementById("list-here").innerHTML += `
            <div class="d-flex">
                              <div style="width: 84%;">
                                  <div class="card mb-3" style="max-width: 100%;">
                                      <div class="row no-gutters">
                                          <div class="col-md-4">
                                              <img src="${e.image}" class="card-img"
                                                  alt="...">
                                          </div>
                                          <div class="card__flex__column ml-3 my-3">
                                              <div class="mb-3">
                                                  <h3 class="card-title"><b>${e.title}</h3>
                                                  <p class="card-text" style="color: rgb(175, 169, 169);">${e.description}</p>
  
                                              </div>
                                              <div>
                                                  <i style="color: gray;" class="far fa-user"></i><small style="padding-left: 5px;color: gray;">from ${e.minimum_age} years</small>
                                                 
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div  style="height: 210px">
                                  <div class="ml-1">
                                      <div class="card" style="max-width: 100%; background-color:white;">
                                          <div class="text-success ml-2 mt-2">retund in case of visa rejection <span class="border border-success" style="padding: 2px 4px; border-radius:50%;">?</span></div>
                                          <br>
                                          
                                          <div class="ml-2" style="line-height: 15px;">
                                              <h5 class="">From ${e.price} $</h5>
                                              <small class="">for ${e.course_deadline} weeks</small>
                                              <br> 
                                              <br>
                                              <br> 
                                          </div>
                                      </div>
                                  </div>
                                  <a href="/course/${e.id}">
                                  <button type="button" style="padding: 8px 27px; border: none;color: white;background-color: mediumturquoise;"><h4>Choose a course</h4> </button>
                                  </a>
                                  </div>
  
                          </div>
            `

            document.getElementById('reset-btn-div').style.display  = 'block'
            document.getElementById('keyword').innerHTML = localStorage.getItem('search_keyword')
    })
}
else {
    getCourseList()
}


document.getElementById('reset-search').addEventListener('click', () => {
    localStorage.removeItem('search_result')
    location.reload();
})