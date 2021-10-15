pk = document.getElementById("page-pk").innerText;

url = `/api/v1/core/course/${pk}`;

console.log(url);

let course_id;


function renderStars(n){
  let stars = $('.rating-star')
  for(let i=0;i<n;i++){
    $(stars[i]).css('color','yellow')
  }
}


getCourseDetail = () => {
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      course_id = data.id
      console.log(data);
      renderStars(data['get_avg_rating'])
      document.querySelectorAll(".the-title").forEach(element => {
          element.innerHTML = data.title
      });
      document.querySelectorAll(".course-price").forEach(element => {
        element.innerHTML = `${data.price} AZN`
    });
    document.querySelectorAll(".deadline").forEach(element => {
      element.innerHTML = `${data.course_deadline}`
  });
      fetch(`/api/v1/edit-user/${data.teacher}`)
        .then((resp) => resp.json())
        .then((user) => {
        console.log(user.last_name);
        document.querySelectorAll(".teacher-here").forEach(element => {
            element.innerHTML = `${user.first_name} ${user.last_name}`
        });
    })
      document.querySelector(".description").innerHTML = data.description
      document.querySelector(".min-age").innerHTML = data.minimum_age
      if (data.video) {
        document.getElementById('video-div').innerHTML = `<video controls style="width: 550px;">
        <source src="${data.video}" type="video/mp4">  
  </video>`
        
      }
      if(data.youtube_video_url) {
        let yt_index = data.youtube_video_url.indexOf('=')+1
        let yt_new = data.youtube_video_url.substring(yt_index)
        console.log(yt_new);
        document.querySelector(".yt_video_div").innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${yt_new}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      }
      // document.querySelector('.main-ddd').style.backgroundImage = `url(${data.image})`
    })
}

getCourseDetail()

renderSubjects = () => {

  let id_list = []

  fetch(`/api/v1/core/all-subjects/`)
        .then((resp) => resp.json())
        .then((data) => {
          data.forEach(e => {
            if(e.course == pk) {
              document.querySelector(".subjects-here").innerHTML += 
              `<div style="border-radius: 5px;" class="px-3 pt-3 mb-3">
  <h5>${e.title}</h5>
  <div style="color: gray;" class="d-flex">
      <div class="d-flex">
          <i class="fas fa-birthday-cake"></i>
          <p class="ml-1">${e.deadline} weeks</p>
      </div>
      <div class="d-flex ml-3">
  
      </div>
  </div>
  </div>`

  document.querySelector(".len").innerHTML = `${data.length} subjects`



  fetch(`/api/v1/core/all-questions/`)
        .then((resp) => resp.json())
        .then((quest) => {
          // console.log(quest);
          quest.forEach(el => {
            // console.log(el.subject, e.id, "caaa");
            if(el.subject == e.id) {
              // console.log(el.id);
              id_list.push(el.id)

            }
          })

          console.log(id_list);
       localStorage.setItem('id_list', id_list)
       let ids = localStorage.getItem('id_list')
       let usable_ids = ids.split(',');
       document.getElementById("start-a").href = `/question/${usable_ids[0]}`
        })



  
            }
            
          })
       
    })
}

renderSubjects()


createOrder = () => {
 



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
        .then((user_data) => {
          console.log(user_data);

          promo = localStorage.getItem("promocode")

          data = {
            user: user_data.id,
            course: pk,
            successfuly_paid: false
        }

        if (promo != null) {
          data.promocode = promo
        }

        fetch(`/api/v1/core/order/`, {
    method: "POST",
    headers: {
        "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      // document.getElementById("congrats-div").innerHTML = `<p style="color: green;">You successfuly bought this course!</p>`
      // https://e-commerce.kapitalbank.az/index.jsp?ORDERID=10253&SESSIONID=1661DD2BD23BC67D6CBF84FE847B369F
      if (data.status != 'free'){
      document.location.href = `${data.url}?ORDERID=${data.order_id}&SESSIONID=${data.session_id}`
      }
      else {
        free_data = {
          successfuly_paid: true
        }
        fetch(`/api/v1/core/order/${data.id}/`, {
          method: "PATCH",
          headers: {
              "Content-type": "application/json",
          },
          body: JSON.stringify(free_data),
        })
          .then((resp) => resp.json())
          .then((update_data) => {
            console.log(update_data);
          })
      document.getElementById("start-course").style.display = 'block'
        document.querySelector('#order-button').style.display = 'none'
      }
    })

        })




}

document.getElementById("order-button").addEventListener('click', () => {
  createOrder()
})

$('.rate-star').hover(function(e){
  n = $(e.target).data('value') -1;
  stars = $('.rate-star');
  $(stars).css('color','white');
  for (let i=0;i<=n;i++){
    $(stars[i]).css('color','yellow')
  }
})

function myRating(n=false){
  if(!n){
    n = $('#rating-obj').data('rating');
  }
  if (n>0){
    stars = $('.rate-star');
    for (let i=0;i<n;i++){
      $(stars[i]).css('color','yellow')
    }
  }
}

$('#rate').on('mouseleave',function(){
  $('.rate-star').css('color','white')
  myRating()
})
$('.rate-star').click(async function(e){
  n = $(e.target).data('value');
  let jwtt = `Bearer ${localStorage.getItem("token")}` 
  data = {
    'course':pk,
    'rating':n
  }
  response = await fetch('/api/v1/core/rating/',{
    method: "POST",
    headers: {
        "Content-type": "application/json",
        "Authorization": jwtt
    },
    body:JSON.stringify(data)
  })
  res_status = await response.status;
  if(res_status==201){
    $('#rating-obj').data('rating',n)
    myRating()
  }

})
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
        .then((data) => {
          console.log(data);
          fetch(`/api/v1/core/all-order/`)
          .then((resp) => resp.json())
          .then((orders) => {
            console.log(orders);
            orders.forEach(e => {
              if (e.course == pk && e.user == data.id && e.successfuly_paid == true) {
                document.getElementById('rate').classList.remove('d-none')
                myRating()
               console.log(e);
              document.getElementById("congrats-div").innerHTML = `<p style="color: green;">You have bought this course!</p>`
              // document.location.href = '/core/login'
              document.getElementById("start-course").style.display = 'block';
              document.querySelectorAll('.hide-me').forEach(e => {
                e.classList.add('d-none')
                e.classList.remove('d-flex')
              })
             }
            })
          })
        })
        
        if(localStorage.getItem("token")){
          document.getElementById("book-place").style = 'display:block'
          document.getElementById('order-button-two').style = 'display:none'
        }else{
          document.getElementById("order-button").style = 'display:none'
          document.getElementById('order-button-two').style.display = 'block'
        }



getPromocodeDiscount = (course_id, code) => {
  data = {
    course: course_id,
    code: code
  }
  fetch(`/api/v1/core/use-promocode/`, {
    method: "POST",
    headers: {
        "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data);

        if (data.message == "Promocode activated!"){
          localStorage.setItem("promocode", data.code_id)
          document.getElementById("promocode-message").style.color = "green"
        }
        else {
          document.getElementById("promocode-message").style.color = "red"
        }
        document.getElementById("promocode-message").innerText = data.message
    })
}

document.getElementById('promocode-form').addEventListener('submit', (e) => {
    e.preventDefault()
    code = document.getElementById("promocode").value
    getPromocodeDiscount(pk, code)
})