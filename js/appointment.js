const dateStartInput = document.getElementById('input_time_start');
const dateEndInput = document.getElementById('input_time_end');
const today = new Date();
const sevenDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const sevenDaysLater = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
const formattedDateStart = sevenDaysAgo.toISOString().split('T')[0];
const formattedDateEnd = sevenDaysLater.toISOString().split('T')[0];
const now = new Date();
const datetime = now.toISOString().slice(0, 16);
const now2 = new Date();
now2.setHours(now2.getHours() + 2);
const datetime2 = now2.toISOString().slice(0, 16);
const list_app = document.getElementById('list_app');
const get_app = document.getElementById('get-app');
var images = document.getElementsByClassName('myImage');
dateStartInput.value = formattedDateStart;
dateEndInput.value = formattedDateEnd;

function GettAppointment() {
    let dateTimeStart = dateStartInput.value+"%2000%3A00%3A00";
    let dateTimeEnd = dateEndInput.value+"%2000%3A00%3A00";
    let url = myVariable+`/api/appointment/get-all?end_dt_time=${dateTimeEnd}&start_dt_time=${dateTimeStart}`;
    const requestOptionsGetApp = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(url);
    fetch(url, requestOptionsGetApp)
      .then((response) => response.json())
      .then((list_appointment_response) => {
        let html = "";
        list_appointment_response.forEach(item => {
            if(item.patient==null){
                html += `
                <div class="card">
                    <div class="content-card">
                        <img class="myImage" src="`+myVariable+"/api/images/"+item.physician.image+`" alt="">
                        <div class="body-card">
                            <div class="info-doctor">
                                <span class="name-doctor">${item.physician.last_name} ${item.physician.first_name}</span>
                                <br>
                                <span class="intro-doctor">Neurology</span>
                            </div>
                            <div class="time">
                                <i class="fa-solid fa-clock"></i>
                                <span>12h20 to 13/30 - 2023/06/01</span>
                            </div>
                            <div class="location">
                                <i class="fa-solid fa-person-shelter"></i>
                                <span>room 1 floor 1 </span>
                            </div>
                        </div>
                    </div>
                    <button type="button" id="${item.id}" class="btn btn-primary btn-booking" 
                    data-toggle="modal" data-target="#exampleModal">Booking + </button>
                </div>
              `;
            }
        
        });
        
        list_app.innerHTML = html;
        const btn_booking = document.querySelectorAll('.btn-booking');
        btn_booking.forEach(button=>{
          button.addEventListener('click', event => {
            console.log(event)
            // Lấy ra id của button đang được click
            id_appointment = event.target.id;
            console.log(`You clicked on button  with id ${id_appointment}`);
            const data = {
                end_dt_time:"2000-10-10 01:01:01",
                id: id_appointment,
                id_patient: 0,
                id_physician: 0,
                id_room: 0,
                start_dt_time: "2000-10-10 01:01:01",
                status: username,
                title: "Patient"
            };
            const url = myVariable+"/api/appointment/booking";
            console.log(data);
            const requestOptions = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data)
              };
            
              fetch(url, requestOptions)
                .then(response => response.json())
                .then(data => console.log(data),
                window.location=gitlink+"/oke.html"
                )
                .catch(error => console.log(error));
          });
        })
      })
      .catch((error) => {
        console.log(error); 
      });
  }
  get_app.addEventListener("click",function(){
    GettAppointment()
  })
  for (var i = 0; i < images.length; i++) {
    images[i].addEventListener('error', imageError);
  }
  function imageError(event) {

    var img = event.target;
    img.src = 'img/2.jpg'; // Đường dẫn của hình ảnh thay thế
    img.alt = 'Không thể tải được hình ảnh'; // Văn bản thay thế khi không thể tải hình ảnh
    console.log(img);
  }