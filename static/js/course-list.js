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
            <div class="card col-3" style="width: 18rem; margin:25px; padding: 0 !important;">
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
            
        <div class="card col-3" style="width: 18rem; margin:25px; padding: 0 !important;">
        <img src="${e.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <div class="row justify-content-between" style="align-items: center;">
            <div class="col-7">
                <h3 class="card-title" style="font-weight:bold;">${e.title}</h3>
                <p class="card-text">for ${e.course_deadline} weeks</p>
            </div>
                <h5 class="card-title col-4" style="width:80%;display: flex;justify-content: center;align-items: center;background-color: rgb(245, 223, 76); border-radius: 5px;font-size:16px;color:white;padding: 10px 0px;">${e.price} AZN</h5>
            </div>
          <p class="card-text">${e.description}</p>
          <a href="/course/${e.id}" class="btn btn-dark" style="color:rgb(245, 223, 76);">Choose a course</a>
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