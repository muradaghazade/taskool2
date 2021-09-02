let subPk = document.getElementById('sub-pk').innerText;
console.log(subPk);
getCourseQuestions = () => {
    fetch(`/api/v1/core/all-questions/`)
    .then((resp) => resp.json())
    .then((questions) => {
        questions.forEach(question => {
            if (subPk == question.subject) {
                console.log(question);
                document.querySelector(".questions-here").innerHTML += `
                <div class="card w-75 mb-3">
                <div class="card-body">
                  <h5 class="card-title">${question.title}</h5>
                  <p class="card-text">${question.description}</p>
                  <a href="/edit-question/${question.id}" class="btn btn-secondary">Edit</a>
                  <a id="delete" course_id="${question.id}" class="btn btn-danger">Delete</a>
                </div>
              </div>
                `
            }
        });
    })
}

getCourseQuestions()

document.addEventListener('click', (e) => {
   if (e.target.getAttribute('id') == 'delete') {
     course_id = e.target.getAttribute('course_id');
     confirmation = confirm("Are you sure you want to delete this question?")
     console.log(confirmation);
     if (confirmation == true) {
         fetch(`/api/v1/core/question/${course_id}/`, {
      method: "DELETE",
      headers: {
          "Content-type": "application/json",
      }
    })
      .then((resp) => resp.text())
      .then((data) => {
        // console.log(data, 'DELETED');
        
        e.target.parentElement.parentElement.style.display = "none"
      })
     }
   }
})