let submitButton = document.querySelector('#campfire-submit-btn');

console.log('create.js working');


submitButton.addEventListener('click', function(event){
     event.preventDefault();
     console.log('FUNCTION RUNNING');


     const group_name = document.querySelector('#group-name').value.trim();

     const group_location = document.querySelector('#group-location').value.trim();

     const activity_date = document.querySelector('#activity-date').value.trim();

     const open_slots = document.querySelector('#open-slots').value.trim();

     const activity_title = document.querySelector('#activity-title').value.trim();

     const activity_description = document.querySelector('#activity-description').value.trim();

     const creating_user_id = submitButton.value;

     
     const response = fetch('/api/groups', {
          method: 'POST',
          body: JSON.stringify({
               group_name,
               group_location,
               activity_title,
               activity_description,
               activity_date,
               open_slots,
               creating_user_id
          }),
          headers: {
               'Content-Type': 'application/json'
          }
     })
     .then(response => {
          debugger;
          if (response.ok) {
          console.log('OK RESPONSE', response);
          location.replace('/dashboard');
     } else {
          console.log('BAD RESPONSE', response);
          alert(response.statusText);
     }
     })
     .catch(err => {
          console.log(err);
     })    
});