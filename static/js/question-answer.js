pk = document.getElementById("pk").innerText;

userAnswerUrl = '/api/v1/core/user-answer/';
userAnswerDataUrl = `/api/v1/core/question/${pk}/`;
let theGreatSubjectId

// console.log(userAnswerDataUrl);

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

let usable_ids = localStorage.getItem('id_list').split(',')

let next_id = usable_ids.indexOf(pk) + 1

// console.log(usable_ids[next_id-1], 'ddddd');

// console.log(usable_ids[usable_ids.length - 1],'aaaa');

if(usable_ids[next_id-1] == usable_ids[usable_ids.length - 1]){
  document.getElementById('next-a').href = `/congrats`
  
}
else {
  document.getElementById('next-a').href = `/question/${usable_ids[next_id]}`
}




getQuestionOptions = () => {
  fetch(`/api/v1/core/all-options/`)
    .then((resp) => resp.json())
    .then((data) => {
      // console.log(data);
      data.forEach(element => {
        if (element.question == pk) {
          document.querySelector(".radio-butto-container").innerHTML +=
            `<div class="rad-small col-lg-4 col-sm-4" val="${element.content}">
    
              <input type="radio" name="q" id="optionn">
              <span class="option">${element.content}</span>
          </div>
          
          
          `
          document.querySelector(".video").innerHTML +=
            `<video controls>
              <source src="${data.video}" type="video/mp4">  
        </video>
        <div>
          <img src="${data.image}">
        </div>
        `
        }

      });

    })
}

getQuestionData = () => {
  fetch(userAnswerDataUrl)
    .then((resp) => resp.json())
    .then((data) => {
      // console.log(data);
      theGreatSubjectId = data.subject
      console.log(theGreatSubjectId);
      getQuestionOptions()
      document.getElementById("question-title").innerHTML = data.title
      document.getElementById("question-name").innerHTML = data.title
      document.getElementById("question-desc").innerHTML = data.description
      // document.getElementById("success-here").innerHTML = data.is_success
      if (data.is_auto === true){
        document.getElementById("video").style.display = "none";
      }else{
        document.getElementById("open-form").style.display = "block";
        if (data.video != null) {
          document.getElementById("video").innerHTML =`<div>
          ${data.video}
          </div>` 
        }
        
        if (data.image != null) {
          document.getElementById('q-image').innerHTML = `
      <img style="width: 400px; margin-right: 150px;" src="${data.image}" />
      `
        }

        // if (data.url) {
          document.getElementById('for-url').innerHTML = `<a href="${data.url}">${data.url}</a>`
        // }
      

      }

      // console.log(data, "adadada");

      if (data.is_auto == false) {
        document.getElementById("next").style.display = "none"
        document.getElementById("next-a").style.display = "block"
      }

      // console.log(data.answer_type);

      data.answer_type.forEach(e => {
        fetch(`/api/v1/core/answer-type/${e}/`)
    .then((resp) => resp.json())
    .then((type) => {
        console.log(type);
        document.querySelector(`.${type.title}`).style.display = 'block'
    })
      })



    })
}

answerQuestion = (answer) => {

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
      // console.log(user);
      data = {
        answer: answer,
        question: pk,
        user: user.id,
        feedback: ""

      }
      fetch(userAnswerUrl, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        })
        .then((resp) => resp.json())
        .then((data) => {
          // console.log(data);

          fetch(`/api/v1/core/question/${data.question}`)
            .then((resp) => resp.json())
            .then((question) => {
              if (question.correct_answer == data.answer) {

                fetch(`/api/v1/core/question/${question.id}/`, {
                    method: "PATCH",
                    headers: {
                      "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                      is_success: true
                    }),
                  })
                  .then((resp) => resp.json())
                  .then((result) => {
                    // console.log(result);
                    document.getElementById("success-here").innerHTML = "Question answered successfully"
                    document.getElementById('next').style.display = 'none'
                    document.getElementById('next-a').style.display = 'block'
                  })
              } else {
                document.getElementById("success-here").innerHTML = "Question answered unsuccessfully!"
                document.getElementById('next').style.display = 'none'
                document.getElementById('next-a').style.display = 'block'
              }

            })

        })
    })


}







async function answerOpenQuestion(video=null, image=null, text="") {

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
    .then( async (user) => {
      // console.log(user);
      data = {
        // answer: text,
        question: pk,
        user: user.id,
        feedback: ""

      }
      console.log(data, "here");
      if (image != null) {
        data.image = await toBase64(image)

    }

    if (video != null) {
        
        data.video = await toBase64(video)
    }

    if (text != "") {
        
      data.answer = text
  }
  else {
    data.answer = 'blank'
  }


      console.log(data);
      fetch(userAnswerUrl, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        })
        .then((resp) => resp.json())
        .then((data) => {
          // console.log(data);

          

        })
    })


}







document.getElementById("next").addEventListener('click', (e) => {
  e.preventDefault()
  optionss = document.querySelectorAll("#optionn")
  
// console.log(video,image);
  optionss.forEach(e => {
    if (e.checked) {
      // console.log(e.parentElement.getAttribute("val"),'salam'); 
      answerQuestion(e.parentElement.getAttribute("val"))
      
    }
  })
  
})

getQuestionData()



document.getElementById("open-form").addEventListener('submit', (e) => {
  e.preventDefault();
  let ans_textt = document.getElementById("answer-textt").value
  let video = document.getElementById("video-input").files[0]
  let image = document.getElementById("image-input").files[0]
  // console.log(video, image);
  answerOpenQuestion(video, image, ans_textt)
})



getAllQuestions = () => {
  week_n = $('#courseobj').data('week');


  fetch('/api/v1/core/all-questions/')
  .then((resp) => resp.json())
  .then((data) => {

    data.forEach(e => {
      if(e.subject == theGreatSubjectId) {
        document.getElementById(`week${e.week}`).parentElement.classList.remove('d-none')
        document.getElementById(`week${e.week}`).children[0].innerHTML += `
        <a style="color: white; text-decoration: none; " href="/question/${e.id}"><div class="d-flex flex-column justify-content-center p-2" style="border:1px solid #525252;">
                        <h6>${e.title}</h6>
                        <p style="margin: 0;">${e.description}</p>
                    </div></a>
        `
        // document.getElementById('questions-ul').innerHTML += `
        // <a href="/question/${e.id}" style="color: white; text-decoration: none;">
        // <li class="row li-class">
        //         <h4 class="col-10 title-class">${e.title}</h4>
        //         <p class="ml-1 col-12 type-class">${e.description}</p>
        //         </li>
        //         </a>
        // `
      }
    })
    
  })
}

getAllQuestions()


getCompletementLevel = () => {
  let questions = localStorage.getItem('id_list').split(',')
  let oneQuestionProcent = Math.round(100/questions.length)
  let pageNumber = questions.indexOf(pk)
  console.log(pageNumber);
  document.querySelector('.progress-bar').style.width = `${oneQuestionProcent*pageNumber}%`
  document.getElementById('progress-here').innerHTML = oneQuestionProcent*pageNumber
}

getCompletementLevel()