//tạo biến global cho các function sd
var sinhVienArray = [];

function addSV()
{
    var name = document.getElementById('txtName').value;
    var birth = document.getElementById('txtBirth').value;
    var lop = document.getElementById('txtClass').value;
    var math = document.getElementById('txtMath').value;
    var phys = document.getElementById('txtPhys').value;
    var hoa = document.getElementById('txtHoa').value;
    var type = KiemTraSV();
    // Sử dụng cú pháp của chuỗi JSON
    var sinhVien = {
        Name: name,
        Birth: birth,
        Class: lop,
        Math: math,
        Phy: phys,
        Hoa: hoa,
        Type: type,
        diemTB: function()
        {
            return tb = ( parseFloat(this.Math)
             + parseFloat(this.Phy)
             + parseFloat(this.Hoa) )/3;
        }
    }
    sinhVienArray.push(sinhVien);
    dynamicTable(sinhVienArray);
    console.log(sinhVienArray);
}

function KiemTraSV()
{
    var radSV = document.getElementsByClassName('rdHS');
    for( var i = 0; i < radSV.length; i++)
    {
        if( radSV[i].checked)
        return radSV[i].value;
    }
}

function dynamicTable( InArray ){
    var tbody = document.getElementById('tableSV');
    tbody.innerHTML='';

    for(var i =0; i < InArray.length; i++)
    {
        var trtag = document.createElement('tr');

        var tdHoTen= document.createElement('td');
        var tdLop= document.createElement('td');
        var tdNgay= document.createElement('td');
        var tdTB= document.createElement('td');

        tdHoTen.innerHTML = InArray[i].Name;
        tdLop.innerHTML = InArray[i].Class;
        tdNgay.innerHTML = InArray[i].Birth;
        tdTB.innerHTML = InArray[i].diemTB();

        trtag.appendChild(tdHoTen);
        trtag.appendChild(tdLop);
        trtag.appendChild(tdNgay);
        trtag.appendChild(tdTB);

        
        tbody.appendChild(trtag);
    }
}

function MaxSV()
{
    var ArMax = [];
    var PMax = sinhVienArray[0].diemTB();
    
    for (var i = 0; i < sinhVienArray.length; i++)
    {
        if(sinhVienArray[i].diemTB() > PMax)
        {   
            ArMax = [];
            ArMax.push(sinhVienArray[i]);
            PMax = sinhVienArray[i].diemTB();
            console.log(PMax);
        }
        else if(sinhVienArray[i].diemTB() == PMax)
        {
            ArMax.push(sinhVienArray[i]);
        }
    }
    dynamicTable(ArMax);
    
}
// function DiemTB(){
//     for( var i = 0; i< sinhVienArray.length; i++)
//     {
//         if(sinhVienArray.Name=="Quoc")
//         {
//             var tb = ( parseFloat(sinhVienArray.Math)
//             + parseFloat(sinhVienArray.Phys)
//             + parseFloat(sinhVienArray.Hoa) )/3;
//         }
//     }
// }

