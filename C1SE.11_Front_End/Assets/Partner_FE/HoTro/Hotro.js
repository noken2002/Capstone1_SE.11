//lấy dữ liệu id từ login
const account = localStorage.getItem('keyAccount');
const dataAccount = JSON.parse(account);


//------------------------Gắn sự kiện khi menu được click
// trang chủ
const menuHome = document.getElementById('id_menu_home');
menuHome.addEventListener('click', () => {
    //lấy nhảy sang trang chủ

    window.location.href = `../Home/index.html`;
});
//quản lý xe
const menuCoach = document.getElementById('id_menu_coach');
menuCoach.addEventListener('click', () => {
    //lấy nhảy sang trang quản lý xe

    window.location.href = `../Quanlyxe/quanlyxe.html`;
});
//quản lý tài xế
const menuDriver = document.getElementById('id_menu_driver');
menuDriver.addEventListener('click', () => {
    //lấy nhảy sang trang quản tài xế
    window.location.href = `../Quanlytaixe/quanlytaixe.html`;
});
//quản lý vé
const menuTicket = document.getElementById('id_menu_ticket');
menuTicket.addEventListener('click', () => {
    //lấy nhảy sang trang quản vé
    window.location.href = `../Quanlyve/Quanlyve.html`;
});
//doanh thu
const menuRevenue = document.getElementById('id_menu_revenue');
menuRevenue.addEventListener('click', () => {
    //lấy nhảy sang trang doanh thu
    window.location.href = `../Doanhthu/Doanhthu.html`;
});
//hỗ trợ
const menuSupport = document.getElementById('id_menu_support');
menuSupport.addEventListener('click', () => {
    //lấy nhảy sang trang hỗ trợ
    window.location.href = `../HoTro/Hotro.html`;
});
//Đăng xuất
const menuLogout = document.getElementById('id_menu_logout');
menuLogout.addEventListener('click', () => {
    //lấy nhảy sang trang chính
    localStorage.removeItem('keyAccount');
    window.location.href = `../../Customer_FE/HTML/HomePage.html`;
});
//---------------Gắn sự kiện khi menu được click





//------------Thêm sự kiện cho nút thêm---------------------//
const buttonAdd = document.getElementById('id_btn_add');
buttonAdd.addEventListener('click', () => {
    //Nhảy sang trang thêm
    window.location.href = `../Themquanlytaixe/Themquanlytaixe.html`;
})
//------------Thêm sự kiện cho nút thêm---------------------//



//----------------Nút quay lại------------------//
const iconUndo = document.getElementById('id_undo');
iconUndo.addEventListener('click', () => {
    //Quay về trang chủ
    window.location.href = `../Home/index.html`;
})
//----------------Nút quay lại------------------//


//--lấy thông tin chính của đối tác qua id
let imformationPartner = []
function homePartner() {//------->>>> Tên doanh nghiệp
    const apiUrl = `http://localhost:3000/partner/${dataAccount.id}`;
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



function init() {
    homePartner();
}
  
window.onload = init;