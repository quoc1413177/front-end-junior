$(document).ready(function(){
    var dsCourse = new listCourse();
    var svCourse = new courseService();
    var svUser = new UserService();
//--------------------------------------------- 
    svCourse.getCourse()
    // sau khi get về, nó trả về dữ liệu dc qui định tên là data
    //ta gán/lưu nó vào arrayCourse để quản lý dưới này 
    .done(function(data){
        dsCourse.arrayCourse = data;
        LoadListCourse(data);
    })
    .fail(function(error){
        console.log(error);
    });
//---------------------------------------------
    svUser.getUser()
    // get về được MangNguoiDung
    .done(function(MangNguoiDung){
        LoadSelectUser(MangNguoiDung);
    })
    .fail(function(error){
        console.log(error);
    });
    
    
    /**-------------------add---------------------- */
    $("body").delegate('#btnThemKH','click',function()
    {
    var svCourse = new courseService();
    var khoaHoc = new KhoaHoc();
    khoaHoc.MaKhoaHoc = $("#MaKhoaHoc").val();
    khoaHoc.TenKhoaHoc = $("#TenKhoaHoc").val();
    khoaHoc.MoTa = $("#MoTa").val();
    khoaHoc.MoTa = CKEDITOR.Instances.MoTa.getData();
    khoaHoc.LuotXem = $("#LuotXem").val();
    khoaHoc.NguoiTao = $("#NguoiTao").val();
    //Gọi service post dữ liệu lên server
    svCourse.ThemKhoaHoc(khoaHoc)
    .done(function(ketqua){
        if(ketqua)
        {
            location.reload();
        }
    })
    .fail(function(fail){
        console.log(fail);
    })
    });

    /**-------------------load về---------------------- */
    $("body").delegate(".btnSua","click",function(){
        $("#btnModal").trigger('click');
        $(".modal-title").html("SỬA khóa học");
        var modalFooter = `
        <button class="btn btn-success" id="btnLuu">Save</button>
        <button class="btn btn-dark" data-dismiss="modal">Cancel</button>
    `
    $(".modal-footer").html(modalFooter); 
        
        var MaKhoaHoc = $(this).attr("makhoahoc");
        var khoahoc = dsCourse.getCourseInfo(MaKhoaHoc);
        if(khoahoc != null)
        {
            $("#MaKhoaHoc") = val(khoahoc.MaKhoaHoc);
            $("#TenKhoaHoc") = val(khoahoc.TenKhoaHoc);
            $("#MoTa") = val(khoahoc.MoTa);
            $("#LuotXem") = val(khoahoc.LuotXem);
            $("#Nguoitao") = val(khoahoc.NguoiTao);
        }

    })
    /**-------------------Lưu---------------------- */
    $("body").delegate("#btnLuu","click",function(){
        var khoaHoc = new KhoaHoc();
        khoaHoc.MaKhoaHoc =  $("#MaKhoaHoc").val();
        khoaHoc.TenKhoaHoc =$("#TenKhoaHoc").val();
        khoaHoc.MoTa =$("#MoTa").val();
        khoaHoc.LuotXem =$("#LuotXem").val();
        khoaHoc.NguoiTao = $("#Nguoitao").val();
        svCourse.UpdateKhoaHoc(khoaHoc)
        .done(function(kq){
            if(kq){
                location.reload();
            }
        })  
        .fail(function(fail){
            console.log(fail);
        })
    })
});

function LoadListCourse(array)
{
    var CtnTable = '';
    /**
     * còn array chỉ là đối tượng quản lý
     * như quản lý user, ta phải truyền tham số arrayUser.manguser
     * khoahoc: đối tượng mảng dc tả về
     * index: vị trí phần tử
     * dùng map thay cho for, xài tốt hơn each
     */
    array.map(function(khoahoc,index){
        var moTa = khoahoc.MoTa;
        if(khoahoc.MoTa != null)
        {
            khoahoc.MoTa.length >= 100 
            ? moTa = khoahoc.MoTa.substring(0,100)+"..." 
            : moTa = khoahoc.MoTa;
        }
        CtnTable +=`
        <tr>
            <td></td>
            <td>${khoahoc.MaKhoaHoc}/td>
            <td>${khoahoc.TenKhoaHoc}</td>
            <td>${moTa}...</td>
            <td><img src='${khoahoc.HinhAnh}' width="75" height="50"></td>
            <td>${khoahoc.NguoiTao}</td>
            <td>
            <button class="btn btn-danger btnXoa" 
            taikhoan="${khoahoc.MaKhoaHoc}">Xóa</button>
            
            <button class="btn btn-primary btnSua" 
            taikhoan="${khoahoc.MaKhoaHoc}">Fix</button>
            </td>
        </tr>
        `
    });
    $("#tblDanhSachCourse").html(CtnTable);
}
function LoadSelectUser(array)
{
    var CtnSelect = '';
    array.map(function(user,index){
        if(user.MaLoaiNguoiDung == "GV")
        {
            CtnSelect +=`
            <option value="${user.TaiKhoan}">${user.HoTen}</option>
            `
        }
    });
    $("#Nguoitao").html(CtnSelect);
}


/**-----------BTN Thêm Khóa Học -------------------*/
$("#btnThemCourse").click(function()
{
    $("#btnModal").trigger('click');
    $(".modal-title").html('Thêm Khóa học');
    
    /**----Tạo nút thêm và Hủy */
    var modalFooter = `
    <button class="btn btn-success" id="btnThemKH">Thêm Khóa Học<button>
    <button class="btn btn-dark" data-dismiss="modal">Hủy<button>`
    $(".modal-footer").html(modalFooter);

    //clear dữ liệu input
    $('.modal-body input').val('');
    CKEDITOR.instances.MoTa.setData("");
});