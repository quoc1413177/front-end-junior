// /*
//  Muc tieu: Xu ly quan ly trung sinh vien
//  Nguoi tao: Le Buoi
//  Ngay tao : 27/03/2018
//  Version: 1.0
//  */
// function getMyEle(ele) {
// 	return document.getElementById(ele);
// }

// /*
// 	Muc tieu ham: Duyet Tat ca cac row cua table va luu tru vao mot mang du lieu
// 	Nguoi tao : Le Buoi
// 	Ngay tao: ...
// 	Version: 1.0
//  */
// function TaoMangDuLieu() {
	
	
// 	var mangDuLieu = []; // tao mang
// 	var tableSv = getMyEle('tableSinhVien');
	
// 	// vong lap 
// 	for(var i = 1; i < tableSv.rows.length; i++){// i = i + 1, i+=1, i+=2
// 	  mangDuLieu.push(tableSv.rows[i].cells[3].innerHTML); // dua du lieu vao mang
// 	}
// 	return mangDuLieu;
// }

// function TimMaxDTB() {
// 	 var duLieu = TaoMangDuLieu();
// 	 // tim max, giai thuat tim lon nhat
// 	// var max = parseFloat(duLieu[0]);
// 	 var indexMax = 0;
// 	 // duyet mang va tim phan tu nao co dtb lon hon max thi gan lai cho max
// 	 for (var i = 1; i < duLieu.length; i++) {
// 	 	var dtbThu_i = parseFloat(duLieu[i]);
// 	 	if(dtbThu_i > duLieu[indexMax] ){
// 	 		indexMax = i; // luu chi so ma thoi
// 	 	}
// 	 }

// 	 return indexMax; 
// }

// function XuatSVCoDTBLonNhat() {
// 	 // cho xuat hien div hien thi
// 	 var hienThi = getMyEle('hienthi');
// 	 hienThi.style.display = "block";

// 	 var max = TimMaxDTB(); // chi so SV co dtb lon nhat trong mang

// 	 var tableSv = getMyEle('tableSinhVien');
// 	 var tenSv = tableSv.rows[max+1].cells[2].innerHTML; // Ten sinh vien o cell thu 2
// 	 var dtb = tableSv.rows[max+1].cells[3].innerHTML; // DTB sinh vien o cell thu 2

// 	 var spanHienThi = getMyEle('svGioiNhat');
// 	 spanHienThi.innerHTML = "Ten: " +tenSv + "<br>" + " DTB la : " + dtb;

// }
var DSdiem = [];
var TB = 0; 		//note, phải gán = 0

function laydanhsachdiem(){
	//tdTB là class dc tạo ra chung cho tất cả td chứa điểm
	var Diem = document.getElementsByClassName('tdTB');
	
	for(var i = 0; i < Diem.length; i++){
		//DSdiem.push(parseFloat(Diem[i].innerHTML));
		DSdiem[i] = (parseFloat(Diem[i].innerHTML));
		TB += DSdiem[i];
	}
	console.log(DSdiem);
	TB = TB / DSdiem.length;
	console.log(TB);
	return DSdiem;
}
function Taverage(){
	var get = laydanhsachdiem();
	for(var i = 0; i < get.length; i++){
		TB += get[i]; 
	}
	TB = TB / get.length;
	console.log(TB);
}

function  Max(){
	var list = laydanhsachdiem();
	var max = 0;
	var i = 0;
	for(i = 0; i < list.length; i++)
	{
		if(max < list[i])
		{
		max = list[i];
		}
	}
	console.log(max);
	return max;
}

function Sort()
{
	var ListSort = laydanhsachdiem();
	for(var i = 0; i < ListSort.length ; i++ )
	{
		for(var j = i+1; j < ListSort.length; j++ )
		{
			if(ListSort[j] <= ListSort[i] )
			{
				var	temp = ListSort[i];
				ListSort[i] = ListSort[j];
				ListSort[j] = temp;
			}
		}
	}
	console.log(ListSort);
	return ListSort;
}
