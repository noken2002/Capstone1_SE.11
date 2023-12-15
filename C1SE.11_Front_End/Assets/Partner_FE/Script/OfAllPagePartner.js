
//--lấy thông tin chính của đối tác qua id
let imformationPartner = []
function homePartner() {//------->>>> Tên doanh nghiệp
    const apiUrl = `http://localhost:3000/partner/${id}`;
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const divPartner = document.querySelector(`.company`);
        divPartner.innerHTML = '';
        imformationPartner = data.data;
        console.log('Data: ', data);
        imformationPartner.forEach(e => {
            divPartner.innerHTML = `
            <img class="imgCompany" src="./public/images/business-building.png" />
            <h4>${e.company_name}</h4>`;
        })
    })
    .catch(error => console.error('Error fetching data:', error));
}

//lấy dữ liệu cho mục quản lý xe
let dataManagerCoach = [];
function printManagerCoach(){//------------>In ra danh sách cách vé
    const apiUrl = `http://localhost:3000/partner/coach/${id}`;
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const tbody = document.querySelector(`.table tbody`);
        divPartner.innerHTML = '';
        dataManagerCoach = data.data;
        console.log('Data: ', data);
        dataManagerCoach.forEach((e,index) => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <th scope="row">${index+1}</th>
                <td>${e.license_plate}</td>
                <td>${e.seat_capacity}</td>
                <td>${e.service_level}</td>
                <td></td>
                <td></td>`;
        })
    })
    .catch(error => console.error('Error fetching data:', error));
}

//lấy dữ liệu cho quản lý tài xế


//lấy dữ liệu cho mục quản lý vé


//lấy dữ liệu cho mục quản lý doanh thu



function init() {
    homePartner();
}
  
window.onload = init;