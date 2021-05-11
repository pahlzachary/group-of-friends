//TODO: What's this logic for?

const { json } = require("sequelize/types")

const yesMatch = (event) => {
    fetch('/api/matched', {
        method: "POST",
        body: JSON.stringify( {
            user_id: event.target.getAttribute("data-userId"),
            group_id: event.target.getAttribute("data-groupId"),
            matched: true 
        })
    })

    .then(
     matchYes => {
         if (matchYes.status.ok) {
             document.querySelector(".email").removeAttribute("style");
         }
     }
    )
}