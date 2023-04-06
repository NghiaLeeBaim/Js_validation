
var nhanVienList = [];

function validateForm() {
    var taiKhoanNV = document.getElementById("tknv").value;
    var hoTenNV = document.getElementById("name").value;
    var emailNV = document.getElementById("email").value;
    var matKhauNV = document.getElementById("password").value;
    var ngayLamNV = document.getElementById("datepicker").value;
    var luongCBNV = +document.getElementById("luongCB").value;
    var chucVuNV = document.getElementById("chucvu").value;  
    var gioLamNV = +document.getElementById("gioLam").value;

    var isValid = true;

    isValid &= required(taiKhoanNV,"tbTKNV") && checkLength(taiKhoanNV,"tbTKNV", 4, 6);
    isValid &= required(hoTenNV,"tbTen") && checkHoTenNV(hoTenNV,"tbTen");
    isValid &= required(emailNV,"tbEmail") && checkEmailNV(emailNV,"tbEmail");
    isValid &= required(matKhauNV,"tbMatKhau") && checkMatKhauNV(matKhauNV,"tbMatKhau");

    isValid &= required(ngayLamNV,"tbNgay") && checkNgayLamNV(ngayLamNV,"tbNgay");
    isValid &= required(luongCBNV,"tbLuongCB") && checkLuongNV(luongCBNV,"tbLuongCB", 1000000, 20000000);
     
    isValid &= required(gioLamNV,"tbGiolam") && checkGioNV(gioLamNV,"tbGiolam", 80, 200);

    return isValid;
} 


function createNhanVien(){

    var isValid = validateForm();
    if  (!isValid)return;

    //1. lấy thông tin do người dùng nhâp từ input
    var taiKhoanNV = document.getElementById("tknv").value;
    var hoTenNV = document.getElementById("name").value;
    var emailNV = document.getElementById("email").value;
    var matKhauNV = document.getElementById("password").value;
    var ngayLamNV = document.getElementById("datepicker").value;
    var luongCBNV = +document.getElementById("luongCB").value;
    var chucVuNV = document.getElementById("chucvu").value;  
    var gioLamNV = +document.getElementById("gioLam").value;
      // 1.5 kiểm tra TK NV có bị trùng không

    for (i = 0; i < nhanVienList.length; i++) {
      if (nhanVienList[i].taiKhoanNV === taiKhoanNV) {
        alert("Tài khoản bị trùng lặp, vui lòng nhập lại !!");
        return;
      }
    }

    var nhanVien = new NhanVien(taiKhoanNV,hoTenNV,emailNV,matKhauNV,ngayLamNV,luongCBNV,chucVuNV,gioLamNV)

    console.log(nhanVienList);
    
    nhanVienList.push(nhanVien);
    
    renderNhanVien();
    saveData();
}

function renderNhanVien(data) {
    if (!data) {
      data = nhanVienList;
    }
    var html = "";
    for (var i = 0; i < data.length; i++) {
      html += `<tr>
          <td>${data[i].taiKhoanNV}</td>
          <td>${data[i].hoTenNV}</td>
          <td>${data[i].email}</td>
          <td>${data[i].ngayLam}</td>
          <td>${data[i].chucVu}</td>
          <td>${data[i].tongLuongNV()}</td>
          <td>${data[i].xepLoaiNV()}</td>
          <td>
              <button onclick="deleteNhanVien('${
                data[i].taiKhoanNV
              }')" class="btn btn-danger"> Xoá </button>
              
              <button data-target="#myModal" data-toggle="modal" onclick="getNhanVienDetail('${
                data[i].taiKhoanNV
              }')" class="btn btn-success"> Sửa </button>
          </td>
        </tr>`;
    }
    document.getElementById("tableDanhSach").innerHTML = html;
  }


  function saveData() {
    // Chuyển từ 1 mảng sang chuỗi bằng json
    var nhanVienListJSON = JSON.stringify(nhanVienList);
  
    localStorage.setItem("NV", nhanVienListJSON);
  }
  function getData() {
    var nhanVienListJSON = localStorage.getItem("NV");
    if (!nhanVienListJSON) return;
    // nếu ko có thì return
    var nhanVienListLocal = JSON.parse(nhanVienListJSON);
    nhanVienList = mapData(nhanVienListLocal);
  
    renderNhanVien();
  }

function mapData(dataFromLocal) {
  var result = [];
  for (var i = 0; i < dataFromLocal.length; i++) {
    var oldNhanVien = dataFromLocal[i];

    var newNhanVien = new NhanVien(
      oldNhanVien.taiKhoanNV,
      oldNhanVien.hoTenNV,
      oldNhanVien.email,
      oldNhanVien.matKhau,
      oldNhanVien.ngayLam,
      oldNhanVien.luongCB,
      oldNhanVien.chucVu,
      oldNhanVien.gioLam
    );

    result.push(newNhanVien);
  }
  return result;
}
function deleteNhanVien(taiKhoanNV) {
  // xóa theo mã tk
  var index = findByID(taiKhoanNV);
  if (index === -1) {
    alert("Không tìm thây TK");
    return;
  }
  nhanVienList.splice(index, 1);
  renderNhanVien();
  saveData();
  // xóa index xong in ra màn hình sau đó xóa local
}
function findByID(taiKhoan) {
  for (var i = 0; i < nhanVienList.length; i++) {
    if (nhanVienList[i].taiKhoanNV === taiKhoan) {
      return i;
    }
  }
  return -1;
}
function searchNhanVien() {
  var keyword = document.getElementById("searchName").value;
  var result = [];

  for (var i = 0; i < nhanVienList.length; i++) {
    var currentXepLoaiNV = nhanVienList[i].xepLoaiNV();
    if (currentXepLoaiNV === keyword || currentXepLoaiNV.includes(keyword)) {
      result.push(nhanVienList[i]);
    }
  }
  renderNhanVien(result);
}

function getNhanVienDetail(taiKhoanNV) {
  var index = findByID(taiKhoanNV);
  if (index === -1) {
    alert("Không tìm thây ID");
    return;
  }
  var nhanvien = nhanVienList[index];
  // lấy thông tin và đưa vô form
  document.getElementById("tknv").value = nhanvien.taiKhoanNV;
  document.getElementById("name").value = nhanvien.hoTenNV;
  document.getElementById("email").value = nhanvien.email;
  document.getElementById("password").value = nhanvien.matKhau;
  document.getElementById("datepicker").value = nhanvien.ngayLam;
  document.getElementById("luongCB").value = nhanvien.luongCB;
  document.getElementById("chucvu").value = nhanvien.chucVu;
  document.getElementById("gioLam").value = nhanvien.gioLam;

  // dùng để ẩn ID
  document.getElementById("tknv").disabled = true;
  document.getElementById("btnThemNV").style.display = "none";
  document.getElementById("btnCapNhat").style.display = "block";

}
function updateNhanVien() {
  var isValid = validateForm();
    if  (!isValid)return;

  var taiKhoanNV = document.getElementById("tknv").value;
  var hoTenNV = document.getElementById("name").value;
  var emailNV = document.getElementById("email").value;
  var matKhauNV = document.getElementById("password").value;
  var ngayLamNV = document.getElementById("datepicker").value;
  var luongCBNV = +document.getElementById("luongCB").value;
  var chucVuNV = document.getElementById("chucvu").value;  
  var gioLamNV = +document.getElementById("gioLam").value;

  //   tim sv thông qua id
  var index = findByID(taiKhoanNV);
  if (index === -1) {
    alert("Không tìm thây NV");
    return;
  }
  // tìm thông tin sv ở vị trí index
  var nhanvien = nhanVienList[index];
  // ko sửa id
  nhanvien.hoTenNV = hoTenNV;
  nhanvien.email = emailNV;
  nhanvien.matKhau = matKhauNV;
  nhanvien.ngayLam = ngayLamNV;
  nhanvien.luongCB = luongCBNV;
  nhanvien.chucVu = chucVuNV;
  nhanvien.gioLam = gioLamNV;

  renderNhanVien();
  saveData();

  // Sau khi cập nhâp xong, xóa dữ liệu trên form để người tiếp theo nhập dư liêu
  
  
  document.getElementById("tknv").disabled = false;
  document.getElementById("btnCapNhat").style.display = "none";
  document.getElementById("btnThemNV").style.display = "block";
  
}

function myFunction() {
  document.getElementById("myForm").reset();
}









function required(value, spanID) {
  if (value.length === 0) {
    document.getElementById(spanID).innerHTML = "Không được bỏ trống !!!";
    return false;
  }
  document.getElementById(spanID).innerHTML = "";

  return true;
}

function checkLength(value, spanID, min, max) {
  if (value.length < min || value.length > max) {
    document.getElementById(
      spanID
    ).innerHTML = `Độ dài phải từ ${min} tới ${max} kí tự`;
    return false;
  }
  document.getElementById(spanID).innerHTML = "";
  return true;
}

function checkHoTenNV(value, spanID) {
  var pattern = /^[A-z ]+$/g;
  if (pattern.test(value)) {
    document.getElementById(spanID).innerHTML = "";
    return true;
  }
  document.getElementById(spanID).innerHTML = "Chỉ gồm các chữ từ A-z";
  return false;
}

function checkEmailNV(value, spanID) {
  var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
  if (pattern.test(value)) {
    document.getElementById(spanID).innerHTML = "";
    return true;
  }
  document.getElementById(spanID).innerHTML = "Hãy nhập địa chỉ email hợp lệ";
  return false;
}

function checkMatKhauNV(value, spanID) {
  var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/; 
  if (pattern.test(value)) {
    document.getElementById(spanID).innerHTML = "";
    return true;
  }
  document.getElementById(spanID).innerHTML = "Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt";
  return false;
}

function checkNgayLamNV(value, spanID) {
  var pattern = /(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g; 
  if (pattern.test(value)) {
    document.getElementById(spanID).innerHTML = "";
    return true;
  }
  document.getElementById(spanID).innerHTML = "Ngày làm phải đúng định dạng mm/dd/yyyy";
  return false;
}

function checkLuongNV(value, spanID, min, max) {
  if (value.length < min || value.length > max) {
    document.getElementById(
      spanID
    ).innerHTML = `Lương cơ bản từ ${min} tới ${max} `;
    return false;
  }
  document.getElementById(spanID).innerHTML = "";
  return true;
}

function checkGioNV(value, spanID, min, max) {
  if (value.length < min || value.length > max) {
    document.getElementById(
      spanID
    ).innerHTML = `Giờ làm phải từ ${min} tới ${max} `;
    return false;
  }
  document.getElementById(spanID).innerHTML = "";
  return true;
}














window.onload = function () {
  getData();
};