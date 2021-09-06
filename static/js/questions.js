let comments = document.getElementById('comments')

let discussion = document.getElementById('discussion')
let comment_button = document.getElementById('comment_button')

comments.innerHTML = ' '



discussion.addEventListener('click' , async function (e) {
    comments.innerHTML = ' '
    e.preventDefault()
    let id = location.pathname.split('/')[2]
    let response  = await fetch(`http://127.0.0.1:8000/api/v1/core/question-comments/${id}/`)
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

    let data = {
        'author': e.target.dataset.userid,
        'question':id,
        'content': comment_content


    }
    let jwt = `Bearer ${localStorage.getItem("token")}`
    let response = await fetch(`http://127.0.0.1:8000/api/v1/core/question-comments/${id}/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": jwt
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
    document.getElementById('comment_input').value = ' '
    let status = await response.ok;
     if(status === true){
        comments.innerHTML = ' '
        let response  = await fetch(`http://127.0.0.1:8000/api/v1/core/question-comments/${id}/`)
        commentList = await response.json()
        for (let comment of commentList){
            let isoDate = comment.created_at;
            var d = new Date(isoDate);
            let date = d.toLocaleString('en-GB'); 
            comments.innerHTML += `<div class="text-left border-bottom pb-3 mb-3"><p class="text-muted ">${comment.author.username}:</p>
            <p class="h5">${comment.content}</p>
            <p class="text-muted mt-0 mb-0"><small >${date}</small></p></div>`   
        }
     }

    
})


