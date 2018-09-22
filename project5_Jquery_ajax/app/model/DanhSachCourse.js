function listCourse()
{
    this.arrayCourse = [];
}
listCourse.prototype.getCourseInfo = function(maKhoaHoc)
{
    var khoahoc = [];
    this.arrayCourse.map(function(khoahoc,index)
    {
        if(khoahoc.MaKhoaHoc == maKhoaHoc)
        {
            khoahoc = khoaHoc;
        }
    })
}