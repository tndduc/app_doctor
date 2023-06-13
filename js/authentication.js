const token = localStorage.getItem("token");
console.log(token);
let full_name;
let id_user;
let username = ""; // Thay đổi giá trị username tùy ý
const urlAuth = myVariable+`/api/user`;
const requestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};
fetch(urlAuth, requestOptions)
  .then((response) => response.text())
  .then((data) => {
    console.log(data);
    username = data;
    const url = myVariable+`/api/patient/get-profile?username=${username}`;
    const requestOptionsGetUser = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(url, requestOptionsGetUser)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        full_name =data.first_name + " " + data.last_name;
        id_user= data.id;
      })
      .catch((error) => {
        // window.location=gitlink+"/login.html";
        console.log(error);
      });
  })
  .catch((error) => {
    window.location=gitlink+"/login.html";
    // Xử lý lỗi
    console.log(error);
  });