function DanhSachUser(){
    this.manguser = [];
    
}

DanhSachUser.prototype.ThemUSER = function(nd)
{
    this.manguser.push(nd);
};

DanhSachUser.prototype.DelUser = function(tk)
{
    for( var i = 0; i < this.manguser.length; i++)
    {
        var user = this.manguser[i];
        if(user.TaiKhoan == tk)
        {
            //Xóa người dùng tại vị trí thứ i
            this.manguser.splice(i,1);
        }
    }
};
DanhSachUser.prototype.DelListUser = function(list)
{   
    for( var i = 0; i < list.length; i++)
    {
        var listAcc = list[i];
        this.DelUser(listAcc);
    }
};
DanhSachUser.prototype.GetInfo = function(tk)
{
    for( var i = 0; i < this.manguser.length; i++)
    {
        var user = this.manguser[i];
        if(tk == user.TaiKhoan)
        {
            return user;
        }
    }
    return null;
}
DanhSachUser.prototype.UpdateUser = function(user)
{
    for( var i = 0; i < this.manguser.length; i++)
    {
        if(this.manguser[i].TaiKhoan == user.TaiKhoan)
        {
            this.manguser[i].MatKhau = user.MatKhau;
            this.manguser[i].Hoten = user.Hoten;
            this.manguser[i].Email = user.Email; 
            this.manguser[i].SoDT = user.SoDT; 
            this.manguser[i].MaLoaiNguoiDung = user.MaLoaiNguoiDung; 
            this.manguser[i].TenLoaiNguoiDung = user.TenLoaiNguoiDung;  
        }
    }
}
DanhSachUser.prototype.SearchUser = function(key)
{
    var cmService = new commonService();
    key = cmService.getSeoTitle(key.trim().toLowerCase());
    //Tạo 1 đối tượng mới chứa kết quả tìm kiếm 
    // và dữ liệu của đứa cần tìm
    var SearchArray = new DanhSachUser();
    for( var i = 0; i < this.manguser.length; i++)
    {
        var user = this.manguser[i];
        var hten = cmService.getSeoTitle(user.Hoten.trim().toLowerCase());
        if(hten.search(key) != -1)
        {
            SearchArray.ThemUSER(this.manguser[i]);
        }
    }
    return SearchArray;
}