url = "/api/v1/core/all-user-answers/";

getUserAnswers = () => {
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      data.forEach(element => {
          document.getElementById("created-section").innerHTML += `
          <h1> Subject Name </h1>

        <div class="col-12 created">
            <span> ${element.question} </span>
            <a href=""> write a feedback</a>
        </div>

          `
      });
    })
}

getUserAnswers()