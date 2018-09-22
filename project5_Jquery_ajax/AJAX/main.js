$(document).ready(function(){
   // $("#NoiDungVanBan").load("data.txt");
    
   $("#btnGetXML").click(function()
   {
        $.ajax({
            type:"GET",//phương thức lấy
            datatype:"xml",//định dạng file
            url: "./DanhSachNguoiDung.xml",
        }).done(function(data)
        {
            console.log(data);
            // var arrayUser = data.getElementsByTagName("NguoiDung");
            // var tableCtnt="";
            // for( var i = 0; i < arrayUser.length; i++)
            // {
            //     /**
            //      * đầu tiên quét NguoiDung ( đây là 1 array NguoiDung)
            //      * bên trong NguoiDung có các TagName(file xml gán tagname)
            //      * khi getElementsByTagName nó trả về mảng, chứ ko như class vs id
            //      * => lấy phần tử 0
            //      */
            //     var array = arrayUser[i];
            //     tableCtnt +=`
            //     <tr>
            //         <td>${array.getElementsByTagName("TaiKhoan")[0].innerHTML}</td>
            //         <td>${array.getElementsByTagName("MatKhau")[0].innerHTML}</td>
            //         <td>${array.getElementsByTagName("HoTen")[0].innerHTML}</td>
            //         <td>${array.getElementsByTagName("Email")[0].innerHTML}</td>
            //         <td>${array.getElementsByTagName("SoDT")[0].innerHTML}</td>
            //     </tr>`
            // }
            var arrayUser = $(data).find("NguoiDung");
            $(arrayUser).each(function(){
                var array = arrayUser[i];
                    tableCtnt +=`
                    <tr>
                        <td>${array.find("TaiKhoan").html()}</td>
                        <td>${array.find("MatKhau").html()}</td>
                        <td>${array.find("HoTen").html()}</td>
                        <td>${array.find("Email").html()}</td>
                        <td>${array.find("SoDT").html()}</td>
                    </tr>` 
            })

        }).fail(function(data)
        {
            console.log(data);
        });
    })

    $("#btnGetJSON").click(function()
   {
        $.ajax({
            type:"GET",//phương thức lấy
            datatype:"json",//định dạng file
            url: "DanhSachNguoiDung.json",
        }).done(function(arrayUser){
            var noiDungTable = "";
            for(var i = 0; i, arrayUser.length; i++)
            {
                var array = arrayUser[i];
                    noiDungTable +=`
                    <tr>
                        <td>${array.Taikhoan}</td>
                        <td>${array.MatKhau}</td>
                        <td>${array.HoTen}</td>
                        <td>${array.Email}</td>
                        <td>${array.SoDT}</td>
                    </tr>` 
            }
            $("#tblDanhSachUser").html(noiDungTable);
        }).fail(function(error){
            
        })
    })
})