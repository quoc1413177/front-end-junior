function courseService(){
    this.getCourse = function()
    {
        var apiURL =`http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc`
        return $.ajax({
            url: apiURL,
            type:"GET",
            dataType:"json",
        })
    }
}
courseService.prototype.ThemKhoaHoc = function(khoaHoc)
{
    //khoaHoc là data của back-end, phải lấy về đúng
    var apiURL =`http://sv.myclass.vn/api/QuanLyTrungTam/ThemKhoaHoc`
        return $.ajax({
            url: apiURL,
            type:"POST",
            dataType:"json",
            data: khoaHoc,
        })
}
courseService.prototype.UpdateKhoaHoc = function(khoaHoc)
{
    //khoaHoc là data của back-end, phải lấy về đúng
    var apiURL =`http://sv.myclass.vn/api/QuanLyTrungTam/capnhatkhoahoc`
        return $.ajax({
            url: apiURL,
            type:"PUT",
            dataType:"json",
            data: khoaHoc,
        })
}


