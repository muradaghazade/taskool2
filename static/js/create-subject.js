var plus_btn = document.querySelector('.created');
var form = document.querySelector('form');
var next = document.querySelector('.next');
// console.log(form);
// console.log($(".form_subject")); 
// plus_btn.addEventListener('click', event => {
//     form.style='display:block'
//     next.style='display:block'
// });

subjectURL = '/api/v1/core/create-subject/';



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

        })
}

document.querySelector(".from_subject").addEventListener('submit', (e) => {
    e.preventDefault()
    let subject_name = document.getElementById('name').value;
    let deadline = document.getElementById('deadline').value;
    course_id = localStorage.getItem('course_id')
    console.log(course_id,'dsadsasdasda');
    // form.style='display:none'
    
    
    
    subject(subject_name,deadline,course_id)

});