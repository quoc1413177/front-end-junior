//đây là đối tượng quản lý
var arrayNV = new DanhSachNhanVien();

function addNV(){

    kiemtrainput('ho','tbHo','Vui Lòng không để trống');
    kiemtrainput('ten','tbTen','Vui Lòng không để trống');
    kiemtrainput('msnv','tbmsnv','Vui Lòng không để trống');
    kiemtrainput('datepicker','tbNgayLam','Vui Lòng không để trống');
    kiemtrainput('chucvu','tbChucvu','Vui Lòng không để trống');

    if(kiemtrainput('msnv','tbmsnv','Vui Lòng không để trống') == true)
    {
        KiemTraDoDai('msnv','tbmsnv','ko thỏa độ dài',2,16);
    }
    var ho = document.getElementById('ho').value;
    var ten = document.getElementById('ten').value;
    var manv = document.getElementById('msnv').value;
    var ngaylam = document.getElementById('datepicker').value;
    var chucvu = document.getElementById('chucvu').value;

    var NhanVienMoi = new NhanVien(ho,ten,manv,ngaylam,chucvu);
    /**
     * trong NhanVien có var luong và tinhluong() có/ko trả giá trị
     * khi gọi hàm này luong sẽ có giá trị từ tinhluong()
     * sau đó push tất cả vào arrayNV => InArray[i].luong
     */
    NhanVienMoi.tinhLuong();
    //ThemNhanVien là hàm bên thư viện DSNhanVien
    // push các dữ liệu này vào đối tượng quản lý
    // đối tượng quản lý gọi function có khả năng push để push vào
    arrayNV.ThemNhanVien(NhanVienMoi);
    console.log(arrayNV.mangNhanVien);
    dynamicTable(arrayNV.mangNhanVien);
}

/**-------DỰA ID GỌI HÀM THAY VÌ ONCLICK---------*/
document.getElementById('btnAddMem').addEventListener("click",addNV);
document.getElementById('searchd').addEventListener('keyup',search);
document.getElementById('btnCapNhat').addEventListener('click',CapNhatNV);
/**-------------------TẠO BẢNG------------------ */
function dynamicTable( InArray ){
    var tbody = document.getElementById('tableSV');
    tbody.innerHTML='';

    for(var i = 0; i < InArray.length; i++)
    {
        var trtag = document.createElement('tr');

        var tdMaNV= document.createElement('td');
        var tdHo= document.createElement('td');
        var tdTen= document.createElement('td');
        var tdNgayLam= document.createElement('td');
        var tdChucVu= document.createElement('td');
        var tdSalary= document.createElement('td');
        var tdThaoTac = document.createElement('td');

        tdMaNV.innerHTML = InArray[i].msnv;
        tdHo.innerHTML = InArray[i].ten;
        tdTen.innerHTML = InArray[i].ho;
        tdNgayLam.innerHTML = InArray[i].ngaylam;
        tdChucVu.innerHTML = InArray[i].chucvu;
        tdSalary.innerHTML = InArray[i].luong;
        
        var button = `<button class="btn btn-primary" 
        data-msnv="${InArray[i].msnv}"
        id="btnDel_${InArray[i].msnv}">Delete</button>

        <button class="btn btn-warning" 
        data-manv="${InArray[i].msnv}"
        data-ho="${InArray[i].ho}"
        data-ten="${InArray[i].ten}"
        data-ngaylam="${InArray[i].ngaylam}"
        data-chucvu="${InArray[i].chucvu}"

        id="btnSua_${InArray[i].msnv}">Fix</button>`;
        
        tdThaoTac.innerHTML =  button;
        trtag.appendChild(tdMaNV);
        trtag.appendChild(tdHo);
        trtag.appendChild(tdTen);
        trtag.appendChild(tdNgayLam);
        trtag.appendChild(tdChucVu);
        trtag.appendChild(tdSalary);
        trtag.appendChild(tdThaoTac);

        
        tbody.appendChild(trtag);
        //bỏ trong vòng for sẽ tạo button đại diện cho dòng 
        XoaNhanVien('btnDel_' + InArray[i].msnv); // tương tự như cộng chuỗi trong PHP
        HienThiCapNhat('btnSua_' + InArray[i].msnv);
    }
}
/**-------------------TÌM KIẾM------------------ */
function search()
{   
    var key = document.getElementById('searchd').value.toLowerCase().trim();
    dynamicTable(arrayNV.searchNV(key));
}

function XoaNhanVien(element)
{
    document.getElementById(element).addEventListener('click',
    function()
    {
    var XoaID = this.getAttribute('data-msnv');
    console.log(XoaID);
    arrayNV.DelNV(XoaID);
    dynamicTable(arrayNV.mangNhanVien);
    }
    )
}

function HienThiCapNhat(element)
{
    document.getElementById(element).addEventListener('click',
    function(){
        var ho = this.getAttribute('data-ho');
        var ten = this.getAttribute('data-ten');
        var manv = this.getAttribute('data-manv');
        var ngaylam = this.getAttribute('data-ngaylam');
        var chucvu = this.getAttribute('data-chucvu');

        document.getElementById('ho').value = ho;
        document.getElementById('ten').value = ten;
        document.getElementById('msnv').value = manv;
        document.getElementById('datepicker').value = ngaylam;
        document.getElementById('chucvu').value = chucvu;

        document.getElementById('msnv').setAttribute('readonly',true);
    }
    )
}
function CapNhatNV()
{
    var ho = document.getElementById('ho').value;
    var ten = document.getElementById('ten').value;
    var manv = document.getElementById('msnv').value;
    var ngaylam = document.getElementById('datepicker').value;
    var chucvu = document.getElementById('chucvu').value;

    var capnhatNV = new NhanVien(ho,ten,manv,ngaylam,chucvu);
    capnhatNV.tinhLuong();
    arrayNV.Capnhat(capnhatNV);
    dynamicTable(arrayNV.mangNhanVien);
}

/**-----------------------VALIDIATION--------------------- */
function kiemtrainput(idfield,idtable,WarningContent){
    var ho = document.getElementById(idfield).value;
    if( ho == '')
    {
        document.getElementById(idtable).innerHTML = WarningContent;       
    }
    else{
        document.getElementById(idtable).innerHTML = '';
        return true;
    }
}

/**kiem tra độ dài PASS */
function KiemTraDoDai(idfield,idtable,WarningContent,min,max)
{
    var txtfield = document.getElementById(idfield).value;
    if(txtfield.length < min || txtfield.length > max)
    {
        document.getElementById(idtable).innerHTML = WarningContent+"["+min+";"+max+"]";
    }
    else{
        document.getElementById(idtable).innerHTML = '';
    }
}

/**KIEM TRA CHUỖI ĐỊNH DẠNG */
function kiemtratext(idfield,idtable,WarningContent)
{
    //check regular expression ACEGIk
    var txtfield = document.getElementById(idfield).value;
    var patt = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
    "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
    "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$");
    if(!patt.test(txtfield)){
        document.getElementById(idtable).innerHTML = WarningContent;
    }
    else{
        document.getElementById(idtable).innerHTML = '';
    }
}
function getele(id)
{
    return document.getElementById(id);
}