/**
 * NOTE: QUẢN LÝ USER CỦA ADMIN
 */

 /**POP-UP THÊM NGƯỜI DÙNG */

 /** id => #
      * class => .
      * gọi như css
      */
var arrayUser = new DanhSachUser();
//click btnThemNguoidung thì btnModal tự dc click theo
$("#btnThemNguoiDung").click(function()
{
    $("#btnModal").trigger('click');
    // trước đó,javascript 
    //thay đổi nội dung chỉ dc áp dụng cho các ô input
    //và dùng innerhtml
    //Juery hỗ trợ hàm html()
    //có thể thảy đổi luôn nội dung của class dc DOM
    $(".modal-title").html('Thêm Người Dùng');
    
    /**----Tạo nút thêm và Hủy */
    var modalFooter = `
    <button class="btn btn-success" id="btnThem">Thêm Người Dùng<button>
    <button class="btn btn-dark" data-dismiss="modal">Hủy<button>`
    $(".modal-footer").html(modalFooter);

    //clear dữ liệu input
    $('.modal-body input').val('');
});

/**--------FUNCTION THÊM USER ----------*/
function AddUser()
{
//val() có thể lấy data và set ngược lại data
var taikhoan = $("#TaiKhoan").val();
var HoTen = $("#HoTen").val();
var MatKhau = $("#MatKhau").val();
var Email = $('#Email').val();
var soDT = $('#SoDienThoai').val();
var maloaiUser = $('#Loaiuser').val();
var tenloaiUser = $('#LoaiUser option:selected').text();
// console.log(tenloaiUser);

var NewUser = new user(taikhoan,MatKhau,HoTen,Email,soDT,maloaiUser,tenloaiUser);
arrayUser.ThemUSER(NewUser);

// console.log(arrayUser);
PhanTrang(arrayUser.manguser);

//Ẩn Pop-Up sau khi thêm
$('.close').trigger('click');

//Lưu dữ liệu vào local
SaveLocal();
}


/**---------TẠO BẢNG VỚI JQUERY-----------*/
function taoBang(arrayin)
{
    var contentable = '';
    for(var i = 0; i < arrayin.length; i++)
    {//lấy theo user.js
        var user = arrayin[i];
        contentable +=`
        <tr>
            <td>
                <input type="checkbox" class="chkUser" 
                value="${user.TaiKhoan}">
            </td>
            <td>${user.TaiKhoan}</td>
            <td>${user.MatKhau}</td>
            <td>${user.Hoten}</td>
            <td>${user.Email}</td>
            <td>${user.SoDT}</td>
            <td>
            <button class="btn btn-danger btnXoa" 
            taikhoan="${user.TaiKhoan}">Xóa</button>
            
            <button class="btn btn-primary btnSua" 
            taikhoan="${user.TaiKhoan}">Fix</button>
            </td>
        </tr>
    `
    /**button XÓA đăc biệt phải khai báo class - btnXoa, 
     * ko khai báoID 
     * với các ID trùng nhau jquery sẽ chỉ chấp nhận cái 1st
     * attribute là thuộc tính bất kỳ, ngoài class,id,style
     * và ta gán cho attribute "taikhoan" GIÁ TRỊ MÀ TA ĐẶT LÀ KHÓA CHÍNH*/
    }
    $('#tblDanhSachNguoiDung').html(contentable);
}

/**LƯU VÀO LOCAL STORAGE */
function SaveLocal()
{
    localStorage.setItem("DanhSachUser",JSON.stringify(arrayUser.manguser));
    //("tên đại diện", chuỗi dc lưu)
    //note: nếu lần sau(sau khi đóng tab/ mở lại)
    // lưu trùng tên thì sẽ dc thay 
}
/**LẤY DỮ LIỆU TỪ LOCAL STORAGE */
function GetLocal()
{
    var manglocal = JSON.parse(localStorage.getItem("DanhSachUser"));
    if( manglocal != null)
    {
        arrayUser.manguser = manglocal;
        taoBang(arrayUser.manguser);
    }
    
}



//DOM TỚI THẺ CHA => CHUYỂN HƯỚNG TỚI #btnThem
//vì #btnThem là id/nút dc tạo ra chỉ sau khi #btnModal dc click
//=> ko thể DOM trực tiếp
$("body").delegate('#btnThem','click',AddUser);
$("body").delegate('.btnXoa','click',function () 
{
    var btnXoa = $(this); //"this" sẽ phân biệt nó là của array đối tượng nào nào 
    var taikhoan =  btnXoa.attr("taikhoan");
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
          //Xóa
        arrayUser.DelUser(taikhoan);
        //Load lại bảng
        // TỐT HƠN NÊN LOAD LẠI BẰNG CÁCH PHÂN TRANG
        PhanTrang(arrayUser.manguser);
        
        setTimeout(() => {
            $('.swal-overlay--show-modal').trigger('click');
        }, 1000);
        } 
        
        else {
          swal("Your imaginary file is safe!");
        }
      });
});
$("#btnXoaNguoiDung").click(function () 
{
    var arraychecked = [];
/*    //truy cập tất cả phần tử có chkUser 
    //a.k.a truy cập đến dữ liệu đối tượng có class dc khai báo
    var list = document.getElementsByClassName("chkUser");
    for(var i = 0; i < list.length; i++ )
    {
        if(list[i].checked)
        {
            arraychecked.push(list[i].value);
        }
    }    */
    $(".chkUser").each(function () 
    {
        //$ : dom và lấy đối tượng dưới dạng document
        var list = $(this);
        var taikhoan = $(list).val(); //lấy giá trị của đối tượng
        if( $(list).is(":checked") )
        {
            arraychecked.push(taikhoan);
        }    
    })
    arrayUser.DelListUser(arraychecked);
    taoBang(arrayUser.manguser);
});

$("body").delegate('.btnSua','click',function () 
{
    //khi nhấn Fix, ta thao tác lại với modal
    //Thao tác với Pop_Up
    $("#btnModal").trigger('click');
    $(".modal-title").html('cập nhật thông tin');
    var modalFooter = `
        <button class="btn btn-success" id="btnUpdate">Save</button>
        <button class="btn btn-dark" data-dismiss="modal">Cancel</button>
    `
    $(".modal-footer").html(modalFooter);
    
    var acc = $(this).attr("taikhoan");
    var user = arrayUser.GetInfo(acc);
    if(user != null)
    {
         $("#TaiKhoan").val(user.TaiKhoan);
         $("#HoTen").val(user.HoTen);
         $("#MatKhau").val(user.MatKhau);
         $('#Email').val(user.Email);
         $('#SoDienThoai').val(user.soDT);
         $('#Loaiuser').val(user.MaLoaiNguoiDung);
    }    
});

$("body").delegate('#btnUpdate','click',function ()
{
    var taikhoan = $("#TaiKhoan").val();
    var HoTen = $("#HoTen").val();
    var MatKhau = $("#MatKhau").val();
    var Email = $('#Email').val();
    var soDT = $('#SoDienThoai').val();
    var maloaiUser = $('#Loaiuser').val();
    var tenloaiUser = $('#LoaiUser option:selected').text();

    var UserMoi = new user(taikhoan,MatKhau,HoTen,Email,soDT,maloaiUser,tenloaiUser);
    arrayUser.UpdateUser(UserMoi);

    console.log(arrayUser);
    //Update xog phân trang luôn 
    //vì phân trang cũng đã chứa tạo bảng
    PhanTrang(arrayUser.manguser);

    //Ẩn Pop-Up sau khi thêm
    $('.close').trigger('click');

    //Lưu dữ liệu vào local
    SaveLocal();
}) 
/**----------AUTO LẤY LOCAL STORAGE --------------*/
GetLocal();
/**------------Lấy xog tự động phân trang lun ----*/
PhanTrang(arrayUser.manguser);
/**------------TEST HIGH CHART -------------------*/
ChartCreate();
/**----------TẠO PAGINATION ----------------------*/

function simpleTemplating(data)
{
    html = '';
    for(var i = 0; i < data.length; i++)
    {//lấy theo user.js
        var user = data[i];
        html +=`
        <tr>
            <td>
                <input type="checkbox" class="chkUser" 
                value="${user.TaiKhoan}">
            </td>
            <td>${user.TaiKhoan}</td>
            <td>${user.MatKhau}</td>
            <td class="tdHoTen">${user.Hoten}</td>
            <td>${user.Email}</td>
            <td>${user.SoDT}</td>
            <td>
            <button class="btn btn-danger btnXoa" 
            taikhoan="${user.TaiKhoan}">Xóa</button>
            
            <button class="btn btn-primary btnSua" 
            taikhoan="${user.TaiKhoan}">Fix</button>
            </td>
        </tr>
    `
    }
    return html
}

function PhanTrang(newData){
//id của dữ liệu muốn phân trang
$('#pagination-container').pagination(
    {
    dataSource: newData,
    pageSize:3 ,
    showGoInPut: true,
    shoGoButton: true,
    callback: function(data) 
    {
        var html = simpleTemplating(data);
        $('#tblDanhSachNguoiDung').html(html);
    }
})
}

function ChartCreate()
{
Highcharts.chart('container', {

    title: {
      text: 'Solar Employment Growth by Sector, 2010-2016'
    },
  
    subtitle: {
      text: 'Source: thesolarfoundation.com'
    },
  
    yAxis: {
      title: {
        text: 'Number of Employees'
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
  
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },
  
    series: [{
      name: 'Installation',
      data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
      name: 'Manufacturing',
      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
      name: 'Sales & Distribution',
      data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
      name: 'Project Development',
      data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    }, {
      name: 'Other',
      data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    }],
  
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  
  });
}
//tìm kie51m người dùng
$('#txtTuKhoa').keyup(function () 
{
    var tuKhoa = $('#txtTuKhoa').val();
    var keylength = tuKhoa.length;
    
    //tạo 1 đối tượng để lấy đối tượng dc trả về
    var arraySearch = arrayUser.SearchUser(tuKhoa);
    PhanTrang(arraySearch.manguser);

    //Duyệt mảng td có class tdHoTen
    $(".tdHoTen").each(function(){
        /**
         * lấy giá trị bên trong
         * có thể xài .html()
         * $this chính là tdHoTen
         * search() là hàm của javascript
         */
        var hten = $(this).text(); 
        var viTriKey = hten.search(tuKhoa);
        /** biến từ vị trí key lấy dc thành 1 thẻ span Highlight  */
        var chuoiKQ = 
            `${hten.substring(0,viTriKey)} 
            <span class="Highlight">${tuKhoa}</span>
            ${hten.substring(viTriKey + keylength)}`;

        $(this).html(chuoiKQ); //=> gán ngược lại cho tdHoTen
    });
    $(".Highlight").Blink({mau:"red",limit:"5"});
})
