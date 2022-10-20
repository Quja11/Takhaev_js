(function($) {
  
   



  $.fn.myPlugin = function(options) {
    //defaults = $.extend(defaults, options)
    //var options = $.extend({}, defaults, params);

    //$(this).click(function(){
     // $(this).css("color", options.color);
    //})
    var defaults = {
      value : 43
    }

    defaults = $.extend(defaults, options);
    

    return this.each(function() {
      
        this.value = defaults.value;



      
      
  });



    

  };
}(jQuery));