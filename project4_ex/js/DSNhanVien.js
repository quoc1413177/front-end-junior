function DanhSachNhanVien(){
	this.mangNhanVien = [];

	this.ThemNhanVien = function(nv){
		this.mangNhanVien.push(nv);
	};

	this.XuatLuong = function(){
		for(var i=0; i < this.mangNhanVien.length; i++){
			this.mangNhanVien[i].luong;
		}
	};
}
//trong trường hợp cái mớ trên bị khóa
DanhSachNhanVien.prototype.searchNV = function( key)
{
	var arrSearch = [];
    for( var i = 0; i < this.mangNhanVien.length; i++)
    {
        var tenNV =  this.mangNhanVien[i].ten;
        if( tenNV.toLowerCase().indexOf(key) != -1)
        arrSearch.push( this.mangNhanVien[i]);
	}
	return arrSearch;
}
DanhSachNhanVien.prototype.DelNV = function(keyarray)
{
	for( var i = 0; i < this.mangNhanVien.length; i++)
    {
		if( this.mangNhanVien[i].msnv == keyarray)
		{
            this.mangNhanVien.splice(i,1);
        }
    }
}
DanhSachNhanVien.prototype.Capnhat = function(NhanVien)
{
	for(var i = 0 ; i < this.mangNhanVien.length; i++)
	{
		if(this.mangNhanVien[i].msnv == NhanVien.msnv)
		{
			this.mangNhanVien[i] = NhanVien;
		}
	}
}