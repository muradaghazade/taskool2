createCourseUrl = "/api/v1/core/course/";
subjectURL = '/api/v1/core/create-subject/';
localStorage.setItem("course-category", 1)

document.getElementById('option1').addEventListener('click', () => {
  localStorage.setItem("course-category", 1)
})

document.getElementById('option2').addEventListener('click', () => {
  localStorage.setItem("course-category", 2)
})

document.getElementById('option3').addEventListener('click', () => {
  localStorage.setItem("course-category", 3)
})

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

subject = (subject_name, deadline,course_id) => {
    
  data = {
      title: subject_name,
      deadline: deadline,
      course:course_id
      
  }
  fetch(subjectURL, {
      method: "POST",
      headers: {
          "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        
        
        localStorage.setItem('subject_id',data.id)
        document.location.href = 'create-question'


      })
}

async function createCourse (title, teacher, price, image, description, course_deadline, minimum_age, video=null, yt_video) {
    // formdata = new FormData();
    // formdata.append("title", title);
    // formdata.append("teacher", teacher);
    // formdata.append("price", price);
    // formdata.append("image", image);
    // formdata.append("description", description);
    // formdata.append("course_deadline", course_deadline);
    // formdata.append("minimum_age", minimum_age);
    // for (const [k, v] of formdata) {
    //     console.log(k, v);
    //   }
    file = await toBase64(image)
    data = {
        title: title,
        teacher: teacher,
        price: price,
        image: file,
        youtube_video_url: yt_video,
        description: description,
        course_deadline: course_deadline,
        minimum_age: minimum_age,
        category: localStorage.getItem("course-category")
    }
    if (video != null) {
      video_file = await toBase64(video)
      data.video = video_file
  }
    fetch(createCourseUrl, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          localStorage.setItem('course_id',data.id)
          subject("Start Course", '1', data.id)
        })
}
document.getElementById("courseForm").addEventListener('submit', (e) => {
  e.preventDefault()


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
        title = document.getElementById('title').value;
  description = document.getElementById("description").value;
  price = document.getElementById("price").value;
  minimum_age = document.getElementById("age").value;
  yt_video = document.getElementById("yt_video").value;
  course_deadline = document.getElementById("time").value;
  image = document.getElementById("image").files[0];
  video = document.getElementById("video").files[0];
  
  createCourse(title,data.id, price,image, description,course_deadline,minimum_age, video, yt_video)
  
      })
  

  
  // localStorage.setItem()
})