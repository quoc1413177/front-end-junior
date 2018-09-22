/**
 * Coder:
 * Date Created:
 * Content:
 */
var UBERX_1 = 8000;
var UBERX_2 = 12000;
var UBERX_3 = 10000;

var UBERSUV_1 = 9000;
var UBERSUV_2 = 14000;
var UBERSUV_3 = 12000;

var UBERBLACK_1 = 10000;
var UBERBLACK_2 = 16000;
var UBERBLACK_3 = 14000;
var sum ;
function tinhtien(){
    //get data from id
    var soKM = document.getElementById('txtSoKM').value;
    var wait = document.getElementById('TimeWait').value;
    soKM = parseInt(soKM);
    wait = parseFloat(wait);

    var ubertype;
    ubertype = cartype();
    //Sử dụng console.log để hiển thị trực tiếp trên console
    //Hoặc có thể dùng breakpoint và F10
    console.log(ubertype);

    /**Thực hiện tính tiền */
    switch (ubertype) 
    {   //ubertype = uberX
        case "uberX":
            sum = SumTien(soKM,UBERX_1,UBERX_2,UBERX_3,wait,2000);
            break;
        //ubertype = uberSUV
        case "uberSUV":
            sum = SumTien(soKM,UBERSUV_1,UBERSUV_2,UBERSUV_3,wait,3000);
            break;
        //ubertype = uberBlack
        case "uberBlack":
            sum = SumTien(soKM,UBERBLACK_1,UBERBLACK_2,UBERBLACK_3,wait,4000);
            break;
    }
    console.log(sum);

//lấy id của 1 div đưa vào biến 
//từ đó chỉnh thuộc tính
var ttien = document.getElementById('divThanhTien');
/*//vd:
ttien.style.display = "block";
ttien.style.backgroundColor = "green";
*/
ttien.classList.add('dongia__config');
//tại id=xuatTien biến nó thành 1 span
//innerHTML đưa giá trị vào trong thẻ đã tạo đó
var spanThanhTien = document.getElementById('xuatTien');
spanThanhTien.innerHTML = sum;
}
//note: để bên trong funtion th2 khi funtion dc gọi
//divThanhTien mới hiển thị

function SumTien(KM,price1,price2,price3,wait_time,wait_price)
{
    if(KM <=1){
        return price1 + wait_time*wait_price;
    }
    else if(KM >1 && KM <= 20){
        return price1 + price2*(KM -1) + wait_time*wait_price;
    }
    else if(KM > 20){
        return price1 + 19*price2 + (KM -20)*price3 + wait_time*wait_price;
    }
    
}
function cartype()
{
//radio button ko lấy value
var uberX = document.getElementById('uberX');
var uberSUV = document.getElementById('uberSUV');
var uberBlack = document.getElementById('uberBlack');
    if(uberX.checked == true)
    {
        return "uberX";
    }
    else if(uberSUV.checked == true)
    {
        return "uberSUV";
    }
    else if(uberBlack.checked == true)
    {
        return "uberBlack";
    }
}

/**--------------------IN HÓA ĐƠN-------------------- */
function InHoaDon(){
    /**tạo function riêng khi bấm in hóa đơn */
    var soKM = document.getElementById('txtSoKM').value;
    var wait = document.getElementById('TimeWait').value;
    soKM = parseInt(soKM);
    wait = parseFloat(wait);
    var sum1 = 0,sum2 = 0,sum3 = 0;
    
    //auto xóa mỗi khi click in hoa don
    var tbody = document.getElementById('tbBody');
    tbody.innerHTML = '';
    
    var ubertype = cartype();
    switch (ubertype) 
    {   //ubertype = uberX
        case "uberX":
            if(soKM <= 1){
                sum1 = UBERX_1;
                DynamicRow('km dau tien',1,UBERX_1,sum1);
            }
            else if(soKM > 1 && soKM <= 20 ){
                sum1 =  UBERX_1;
                sum2 =  (soKM - 1)* UBERX_2;
                DynamicRow('km dau tien',1,UBERX_1,sum1);
                DynamicRow('1km - 20km',soKM-1,UBERX_2,sum2);
            }
            else if(soKM > 20 ){
                sum1 =  UBERX_1;
                sum2 =  19*UBERX_2;
                sum3 =  (soKM - 20)*UBERX_3;
                DynamicRow('km dau tien',1,UBERX_1,sum1);
                DynamicRow('1km - 20km',19,UBERX_2,sum2);
                DynamicRow('> 20km',soKM-20,UBERX_3,sum3);
            }
            //Tao dòng thời gian chờ
            var tiencho = wait*2000;
            DynamicRow('Thoi Gian Cho:',wait,2000,tiencho); 
            break;
        //ubertype = uberSUV
        case "uberSUV":
            sum = SumTien(soKM,UBERSUV_1,UBERSUV_2,UBERSUV_3,wait,3000);
            break;
        //ubertype = uberBlack
        case "uberBlack":
            sum = SumTien(soKM,UBERBLACK_1,UBERBLACK_2,UBERBLACK_3,wait,4000);
            break;
    }
    var total =  document.getElementById('tongtien');
    sum = SumTien(soKM,UBERX_1,UBERX_2,UBERX_3,wait,2000);
    total.innerHTML = sum;
}

function DynamicRow(chitiet,sd,DonGia,thanhtien){

    var tbody = document.getElementById('tbBody');
    

    var row = document.createElement('tr');
    var tdchitiet = document.createElement('td');
    var tdSuDung = document.createElement('td');
    var tdDonGia = document.createElement('td');
    var tdThanhTien = document.createElement('td');

    tdchitiet.innerHTML = chitiet;
    tdSuDung.innerHTML = sd;
    tdDonGia.innerHTML = DonGia;
    tdThanhTien.innerHTML = thanhtien;

    row.appendChild(tdchitiet);
    row.appendChild(tdSuDung);
    row.appendChild(tdDonGia);
    row.appendChild(tdThanhTien);

    tbody.appendChild(row);
}
//auto ra km đầu tiên