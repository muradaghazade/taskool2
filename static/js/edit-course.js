let pk = document.getElementById("pk").innerText
let subPk = document.getElementById('sub-pk').innerText
localStorage.setItem('course_id', pk)
localStorage.setItem('subject_id', subPk)

// console.log(pk);

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

let editUrl = `/api/v1/core/course/${pk}/`

function getCourseData(){
    fetch(editUrl)
    .then((resp) => resp.json())
    .then((data) => {
      // console.log(data);
      document.getElementById("title").value = data.title
      document.getElementById("description").value = data.description
      document.getElementById("price").value = data.price
      document.getElementById("age").value = data.minimum_age
      document.getElementById("time").value = data.course_deadline
      document.getElementById("yt_video").value = data.youtube_video_url
    //   document.getElementById("image").files = data.image


    document.getElementById("courseForm").addEventListener('submit', (e) => {

      e.preventDefault()

      title = document.getElementById("title").value
      description = document.getElementById("description").value
      price = document.getElementById("price").value
      age = document.getElementById("age").value
      time = document.getElementById("time").value
      yt_video = document.getElementById("yt_video").value

//       image = document.getElementById("image").files[0]
// console.log(image);
//       file = await toBase64(image)
//       console.log(file);

      data = {
        title: title,
        price: price,
        description: description,
        course_deadline: time,
        minimum_age: age,
        youtube_video_url:yt_video
    }

    fetch(editUrl, {
      method: "PATCH",
      headers: {
          "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        document.location.href = '/profile'
      })


    })

    })
}

getCourseData()