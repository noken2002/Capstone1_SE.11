let customers =[];
function fetchCustomersData() {

    const apiUrl = 'http://localhost:3000/customers';
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const tbody = document.querySelector('.table tbody');
  
        tbody.innerHTML = '';
        console.log("dataaaaa",data)
        customers = data.data;
        customers.forEach(item => {
          const newRow = document.createElement('tr');
          newRow.innerHTML = `
            <td style="padding-left: 30px;">Khách : ${item.full_name} <br> SDT: ${item.phone_number}</td>
            <td>Điểm đón: Bến xe Đà Nẵng</td>
            <td style="line-height: 50px;"><i class="fa-solid fa-phone-volume"></i> <i style="margin-left: 30px;" class="fa-solid fa-user-astronaut"></i></td>
          `;
          tbody.appendChild(newRow);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }
function init() {
    fetchCustomersData();
}

window.onload = init;
