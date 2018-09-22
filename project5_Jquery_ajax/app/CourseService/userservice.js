function UserService()
{
    this.getUser = function()
    {
        var apiURL =`http://sv.myclass.vn/api/QuanLyTrungTam/danhsachnguoidung`
        return $.ajax({
            url: apiURL,
            type:"GET",
            dataType:"json",
        })
    }
}