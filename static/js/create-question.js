let is_auto;

let yes_btn = document.querySelector('.yes')
let no_btn = document.querySelector('.no')
const correct_ans = document.querySelector('.correct_answer_div')
let other = document.querySelector('.other')
let options_div = document.querySelector('.options_div')
let text_spn = document.querySelector('#text1')
let video_spn = document.querySelector('#video1')
let image_spn = document.querySelector('#image1')
let link_spn = document.querySelector('#link1')
let leftSideDiv = document.getElementById("left-side-div")
let leftSideDivPro = document.getElementById("left-side-div-pro")
let rightSide = document.getElementById("right-side")
let questionTitle = document.getElementById("question-title")
let questionText = document.getElementById("question-text")
let saveBtn = document.getElementById("save-btn")
let doneBtn = document.getElementById("done-btn")

let upl_video = document.querySelector('#video')
let upl_image = document.querySelector('#image')
let upl_link = document.querySelector('#link')

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });




getCourseWeeks = () => {
    console.log(localStorage.getItem('subject_id'));
    data = {
        subject:localStorage.getItem('subject_id')
    }
    fetch('/api/v1/core/course-weeks/', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((data) => {
            let weeks = data[0]['course_deadline']
            for (let i = 1; i <= weeks; i++) {
                console.log(i);
                document.getElementById('menu').innerHTML += `
                <span>Week ${i}</span>
                <input type="radio" name="week" id="${i}" class="dropdown-item" value="Week ${i}">
                `
            }
        })
        
}

getCourseWeeks()



  
yes_btn.addEventListener('click', event => {
    correct_ans.style = 'display:block'
    other.style = 'display:none'
    options_div.style = 'display:block'
    leftSideDiv.style = 'display:none'
    leftSideDivPro.style = 'display:block'
    questionText.style= 'display:block'
    questionTitle.style= 'display:block'
    saveBtn.style = 'display:block; margin: 0 auto;'
    document.getElementById('done').style.display = 'block'
    document.getElementById('answer-here').style.display = "none"

    is_auto = true
    console.log(is_auto);
});

no_btn.addEventListener('click', event => {
    correct_ans.style = 'display:none'
    other.style = 'display:block'
    options_div.style = 'display:none'
    leftSideDiv.style = 'display:block'
    leftSideDivPro.style = 'display:none'
    questionText.style= 'display:none'
    // questionText.style= 'display:block'
    questionTitle.style= 'display:block'
    saveBtn.style = 'display:block; margin: 0 auto;'
    document.getElementById('done').style.display = 'block'
    document.getElementById('answer-here').style.display = "block"
    is_auto = false
    console.log(is_auto);
});



video_spn.addEventListener('click', event => {
    if(video_spn.innerText=='+'){
        document.getElementById('video-div').style = 'display:flex'
        document.getElementById('video-div').style = 'justify-content:center'
        video_spn.innerText = '-'
    }else if(video_spn.innerText == '-'){
        document.getElementById('video-div').style = 'display:none'
        video_spn.innerText = '+'

    }
});

text_spn.addEventListener('click', event => {
    if(text_spn.innerText=='+'){
        document.getElementById('question-text').style = 'display:flex'
        document.getElementById('question-text').style = 'justify-content:center'
        text_spn.innerText = '-'
    }else if(text_spn.innerText == '-'){
        document.getElementById('question-text').style = 'display:none'
        text_spn.innerText = '+'

    }
});

image_spn.addEventListener('click', event => {
    if(image_spn.innerText=='+'){
        document.getElementById('image-div').style = 'display:flex'
        document.getElementById('image-div').style = 'justify-content:center'
        image_spn.innerText = '-'
    }else if(image_spn.innerText == '-'){
        document.getElementById('image-div').style = 'display:none'
        image_spn.innerText = '+'

    }
});

link_spn.addEventListener('click', event => {
    if(link_spn.innerText=='+'){
        document.getElementById('link-div').style = 'display:flex'
        document.getElementById('link-div').style = 'justify-content:center'
        link_spn.innerText = '-'
    }else if(link_spn.innerText == '-'){
        document.getElementById('link-div').style = 'display:none'
        link_spn.innerText = '+'

    }
});


questionUrl = '/api/v1/core/question/';
optionUrl = '/api/v1/core/option/';


questionCreate = (title, question,correct_answer,subject_id,options, is_auto, week) => {
    
    data = {
        title: title,
        description: question,
        correct_answer:correct_answer,
        is_auto:is_auto,
        is_success:0,
        subject:subject_id,
        week:week
        
    }
    fetch(questionUrl, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
        //   localStorage.setItem('question_id',data.id)
          console.log('buradaaaaa');
          for (let i of options) {
            if (i != "") {
                console.log('burada');
                optionCreate(i, data.id)
            }
        }
        document.getElementById("question-success").innerHTML = `<p style="color: green;">Question created successfuly!</p>`
        })
}

async function manualQuestionCreate(title, question,image = null, video = null, edu_url,subject_id, is_auto, answer_type, week) {
    // console.log(image);
    // console.log(video);
    // console.log(answer_type);
    data = {
        title: title,
        description: question,
        edu_url:edu_url,
        is_auto:is_auto,
        is_success:0,
        subject:subject_id,
        answer_type: answer_type,
        week: week
        
    }
    if (image != null) {
        img_file = await toBase64(image)
        data.image = img_file

    }

    if (video != null) {
        // video_file = await toBase64(video)
        data.video = video
    }




    
    fetch(questionUrl, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((data) => {
           console.log(data);
           document.getElementById("question-success").innerHTML = `<p style="color: green;">Question created successfuly!</p>`
        //    localStorage.setItem('question_id', data.id)
        //    console.log('buradaaaaa');
        //    document.location.href = '/'
        })
}

let answer_type_list = []

document.querySelectorAll('.vur').forEach(e => {
    e.addEventListener('click', (el) => {
        
        if(el.target.innerText=='+'){
            answer_type_list.push(parseInt(e.parentElement.getAttribute('id')))
            console.log(answer_type_list);
            if(el.target.previousElementSibling.innerText == '- Text'){
            document.getElementById('answer-here').innerHTML += `<textarea class="mb-3" id="text-id" style="border: 1px solid black; padding: 20px; border-radius: 5px; width:250px; margin: 0 auto;"></textarea>`
            el.target.innerText = '-'
            }
            else if (el.target.previousElementSibling.innerText == '- Picture') {
                document.getElementById('answer-here').innerHTML += `<div class="mb-3" id="picture-id" style="border: 1px solid black; padding: 20px; border-radius: 5px; width:250px; margin: 0 auto;">Image here</div>`
                el.target.innerText = '-'
            }
            else if (el.target.previousElementSibling.innerText == '- Video') {
                document.getElementById('answer-here').innerHTML += `<div class="mb-3" id="video-id" style="border: 1px solid black; padding: 20px; border-radius: 5px; width:250px; margin: 0 auto;">Video here</div>`
                el.target.innerText = '-'
            }
            else if (el.target.previousElementSibling.innerText == '- URL') {
                document.getElementById('answer-here').innerHTML += `<input class="mb-3" id="url-id" style="border: 1px solid black; padding: 10px; border-radius: 5px; width:250px; margin: 0 auto;" placeholder="URL here">`
                el.target.innerText = '-'
            }
            // console.log("musbete girdi")
        }else if(el.target.innerText=='-'){
            answer_type_list.splice(answer_type_list.indexOf(parseInt(e.parentElement.getAttribute('id'))), 1)
            console.log(answer_type_list);
            if(el.target.previousElementSibling.innerText == '- Text'){
                document.getElementById("text-id").remove()
                el.target.innerText = '+'
                }
                else if (el.target.previousElementSibling.innerText == '- Picture') {
                    document.getElementById("picture-id").remove()
                    el.target.innerText = '+'
                }
                else if (el.target.previousElementSibling.innerText == '- Video') {
                    document.getElementById("video-id").remove()
                    el.target.innerText = '+'
                }
                else if (el.target.previousElementSibling.innerText == '- URL') {
                    document.getElementById("url-id").remove()
                    el.target.innerText = '+'
                }
                // console.log("menfie girdi")
        }

    })
})



document.querySelector(".question_form").addEventListener('submit', (e) => {
    e.preventDefault()
    let week;
    let title = document.getElementById('title').value;
    let question = document.getElementById('question').value
    let correct_answer = document.getElementById('correct_answer').value;
    let image = document.getElementById('image').files[0];
    let video = document.getElementById('video').value;
    let link = document.getElementById('link').value;
    var inputs = document.querySelectorAll('.option')
    subject_id = localStorage.getItem('subject_id')

    console.log(document.querySelectorAll('.dropdown-item'));

    document.querySelectorAll('.dropdown-item').forEach(e => {
        if (e.checked) {
            // console.log(e.getAttribute('id'));
            week = e.getAttribute('id')
        }
    })

    console.log(week, 'weeeek');

    var options = []
    
    for (let i of inputs){
        options.push(i.value)
    }

    console.log(options);
   
    

    

    if(document.querySelector('.correct_answer_div').style.display == 'block'){
        questionCreate(title,question,correct_answer,subject_id, options, is_auto, week)
        console.log('bura girdim');
        // for (let i of options) {
        //     if (i != "") {
        //         console.log('burada');
        //         optionCreate(i, localStorage.getItem("question_id"))
        //     }
        // }
    }
    else if(other.style.display == 'block'){
        // console.log(answer_type_list);
        // console.log('haaa');
        manualQuestionCreate(title, question, image, video, link,subject_id, is_auto, answer_type_list, week)
    }
   
    

});






optionCreate = (content, question) => {
    
    data = {
        content: content,
        question: question,
        
    }
    fetch(optionUrl, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
        })
}

