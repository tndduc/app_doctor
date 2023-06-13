
const error_span = document.getElementById("error");
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", function(event) {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    event.preventDefault();
    const requestBody = {
        username: username,
        password: password
      };
    fetch(myVariable+"/api/auth/patient/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  }).then((response) => {
    if (!response.ok) {
      if(response.status==401){
        error_span.innerHTML = "User name or password incorrect"
      }
      throw new Error(`Lỗi khi gọi API: ${response.status}`);
      
    }
    return response.json();
  })
    .then(data => {
      // Lưu token vào local storage để sử dụng trong các yêu cầu API khác
      localStorage.setItem("token", data.token);
      console.log(data.token);
     window.location=gitlink+'/index.html';
    })
    .catch(error => {
      console.error("Đăng nhập không thành công: ", error,requestBody);
    });
});