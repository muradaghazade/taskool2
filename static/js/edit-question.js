let pk = document.getElementById("pk").innerText

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  let holyOptions = []
  
  let editUrl = `/api/v1/core/question/${pk}/`
  
  function getCourseData(){
      fetch(editUrl)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data.is_auto);
        document.getElementById("title").value = data.title
        document.getElementById("description").value = data.description
      //   document.getElementById("image").files = data.image
  
      if (data.is_auto == true) {
        // console.log('yes');
        document.getElementById('correct_answer').innerHTML = `
        <label for="description">Correct answer<span></span></label>
                <input name="correct_answer" id="correctanswer" value="${data.correct_answer}">
        `
        fetch('/api/v1/core/all-options/')
      .then((resp) => resp.json())
      .then((options) => {
        countId = 0
        options.forEach(option => {
          if (option.question == data.id) {
            holyOptions.push(option.id)
            countId+=1
            console.log(option);
            document.getElementById('options-here').innerHTML += `
            <div class="item">
            <label for="name">Option ${countId}</label>
            <input id="option${option.id}" type="text" name="name" value="${option.content}" />
            </div>
            `
          }
        });
      })
    }
    else {
      console.log(data.answer_type);
      document.getElementById('types-here').innerHTML =`<h3 class="mb-3">Answer types</h3>`
      data.answer_type.forEach(type => {
        fetch(`/api/v1/core/answer-type/${type}`)
      .then((resp) => resp.json())
      .then((data) => {
        document.getElementById('types-here').innerHTML += `
        
    <h6>${data.title}</h6>

        `
      })
      });
    }

    // console.log(holyOptions);

      document.getElementById("courseForm").addEventListener('submit', (e) => {
  
        e.preventDefault()

        console.log(document.getElementById('correctanswer'));
        if (document.getElementById('correctanswer')) {
          correct_answer = document.getElementById('correctanswer').value
        }
  console.log(correct_answer);
        title = document.getElementById("title").value
        description = document.getElementById("description").value
  

        

  //       image = document.getElementById("image").files[0]
  // console.log(image);
  //       file = await toBase64(image)
  //       console.log(file);


  holyOptions.forEach(id => {
    content = document.getElementById(`option${id}`).value
    optionData = {
      content: content
  }
   fetch(`/api/v1/core/option/${id}/`, {
    method: "PATCH",
    headers: {
        "Content-type": "application/json",
    },
    body: JSON.stringify(optionData),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
    })
  });

 

  
        data = {
          title: title,
          description: description,
          correct_answer:correct_answer
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
        })
  
  
      })
  
      })
  }
  
  getCourseData()