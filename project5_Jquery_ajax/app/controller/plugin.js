window.jQuery.prototype.Blink = function(object){
    var selector = $(this);

    /**Sử dụng .css nếu . animate ko dùng dc 
     * sử dụng tương tự như 1 file csss
    */
    selector.css({
        color: object.mau,
    });
    for(var i = 0; i < object.limit; i++)
    {   
    selector.fadeOut(300);
    selector.fadeIn(300);
    }
}