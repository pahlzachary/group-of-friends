//Run query to update matches table when user clicks match
async function matchGroupHandler(event){
     event.preventDefault();
     let group_id = event.target.value
     let user_id = req.session.user_id

     const response = await fetch(`/api/matches`, {
          method: 'POST',
          body: JSON.stringify({
               group_id,
               user_id,
               match: true
          }),
          headers: {
               'Content-Type': 'application/json'
          }
     });

     if (response.ok) {
          generateCampfire();
     } else {
          alert(response.statusText);
     }
};

//Run query to update matches table when user clicks no
async function notMatchGroupHandler(event){
     event.preventDefault();
     let group_id = event.target.value
     let user_id = req.session.user_id

     const response = await fetch(`/api/matches`, {
          method: 'POST',
          body: JSON.stringify({
               group_id,
               user_id,
               match: false
          }),
          headers: {
               'Content-Type': 'application/json'
          }
     });

     if (response.ok) {
          generateCampfire();
     } else {
          alert(response.statusText);
     }
};

//Generate new group upon match/no match selection
     //Simply reload page if route is configured to randomly select a group where matches.match = null
     //Otherwise we'll have to figure out some logic here
function generateCampfire(){
     location.reload();
};


//Event listeners
document.querySelector('#yes-btn').addEventListener('click', matchGroupHandler);
document.querySelector('#no-btn').addEventListener('click', notMatchGroupHandler);
