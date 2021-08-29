questionUrl = '/api/v1/core/option/';



questionCreate = (content, question) => {
    
    data = {
        content: content,
        question: question,
        
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
        })
}

document.querySelector(".form_option").addEventListener('submit', (e) => {
    e.preventDefault()
    var inputs = document.querySelectorAll('.option')

    options = []
    
    for (let i of inputs){
        options.push(i.value)
    }

    console.log(options);
   
    for (let i of options) {
        if (i != "") {
            questionCreate(i, 2)
        }
    }

});