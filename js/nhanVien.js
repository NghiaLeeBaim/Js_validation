function NhanVien(taiKhoan,hoTen,email,matKhau,ngayLam,luongCB,chucVu,gioLam){
    this.taiKhoanNV = taiKhoan;
    this.hoTenNV = hoTen;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.luongCB = luongCB;
    this.chucVu = chucVu;
    this.gioLam = gioLam; 

    this.tongLuongNV = function () {
        if(this.chucVu === "Sếp"){
            return this.luongCB * 3
        }else if (this.chucVu === "Trưởng phòng"){
            return this.luongCB * 2
        }else{
            return this.luongCB * 1
        }
    };
    this.xepLoaiNV = function () {
        if (this.gioLam >= 192 ){
          return "xuất sắc";
        }else if(this.gioLam >= 176){
          return "giỏi";
        }else if(this.gioLam >= 160){
          return "khá";
        }else{
          return "trung bình";
        }
      };
    
}