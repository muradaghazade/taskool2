let comments = document.getElementById('comments')

let discussion = document.getElementById('discussion')
let comment_button = document.getElementById('comment_button')

comments.innerHTML = ' '



discussion.addEventListener('click' , async function (e) {
    comments.innerHTML = ' '
    e.preventDefault()
    let id = location.pathname.split('/')[2]
    let response  = await fetch(`/api/v1/core/question-comments/${id}/`)
    commentList = await response.json()
    for (let comment of commentList){
        let isoDate = comment.created_at;
        var d = new Date(isoDate);
        let date = d.toLocaleString('en-GB'); 
        comments.innerHTML += `<div class="text-left border-bottom pb-3 mb-3"><p class="text-muted ">${comment.author.username}:</p>
        <p class="h5">${comment.content}</p>
        <p class="text-muted mt-0 mb-0"><small >${date}</small></p></div>`   
    }

})

comment_button.addEventListener('click', async function(e) {
    e.preventDefault()

    let comment_content = document.getElementById('comment_input').value
    let id = location.pathname.split('/')[2]
console.log(e.target.dataset.userid);
let jwt = `Bearer ${localStorage.getItem("token")}`
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
    let dataa = {
        'author': user.id,
        'question':id,
        'content': comment_content


    }
    let jwt = `Bearer ${localStorage.getItem("token")}`
    fetch(`/api/v1/core/question-comments/${id}/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": jwt
        },
        method: 'POST',
        body: JSON.stringify(dataa)
    })
    .then(resp => resp.json())
    .then(e => {
        console.log(e, 'hereeeee');
        document.getElementById('comment_input').value = ' '
        comments.innerHTML = ' '
        fetch(`/api/v1/core/question-comments/${id}/`)
        .then((resp) => resp.json())
            .then((commentList) => {
                console.log(commentList);
                for (let comment of commentList){
                            let isoDate = comment.created_at;
                            var d = new Date(isoDate);
                            let date = d.toLocaleString('en-GB'); 
                            comments.innerHTML += `<div class="text-left border-bottom pb-3 mb-3"><p class="text-muted ">${comment.author.username}:</p>
                            <p class="h5">${comment.content}</p>
                            <p class="text-muted mt-0 mb-0"><small >${date}</small></p></div>`   
                        }
            })
    })
    // document.getElementById('comment_input').value = ' '
    // let status = await response.ok;
    //  if(status === true){
    //     comments.innerHTML = ' '
    //     let response  = await fetch(`/api/v1/core/question-comments/${id}/`)
    //     commentList = await response.json()
    //     for (let comment of commentList){
    //         let isoDate = comment.created_at;
    //         var d = new Date(isoDate);
    //         let date = d.toLocaleString('en-GB'); 
    //         comments.innerHTML += `<div class="text-left border-bottom pb-3 mb-3"><p class="text-muted ">${comment.author.username}:</p>
    //         <p class="h5">${comment.content}</p>
    //         <p class="text-muted mt-0 mb-0"><small >${date}</small></p></div>`   
    //     }
    //  }

  })
    
    

    
})
