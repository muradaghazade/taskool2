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
                </div>
              </div>
                `
            }
        });
    })
}

getCourseQuestions()