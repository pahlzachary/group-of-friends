let yesButton = document.querySelector('#yes-btn');
let noButton = document.querySelector('#no-btn')
//Run query to update matches table when user clicks match
async function matchGroupHandler(event){
     event.preventDefault();
      
     let groupId = yesButton.getAttribute('data-groupId');
     let userId = yesButton.getAttribute('data-userId');
     let matched = true;

     console.log('group id', groupId);
     console.log('user id', userId);

     const response = await fetch(`/api/groups/campfire`, {
          method: 'POST',
          body: JSON.stringify({
               groupId,
               userId,
               matched
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
     let groupId = noButton.getAttribute('data-groupId');
     let userId = noButton.getAttribute('data-userId');
     let matched = false;

     const response = await fetch(`/api/groups/campfire`, {
          method: 'POST',
          body: JSON.stringify({
               groupId,
               userId,
               matched
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
     document.location.replace('campfire');
};


//Event listeners
yesButton.addEventListener('click', matchGroupHandler);
noButton.addEventListener('click', notMatchGroupHandler);
