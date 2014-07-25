/*************************************
 ** jQuery Elephant - localStorage  **
 ** plugin for form persistance     **
 **                          v1.0.0 **
 ** by: Don Burks                   **
 **                                 **
 *************************************/

;(function(window, $, undefined) {
  var elephFns = {
    form: null,
    formData: {},
    save: function() {
      localStorage.setItem('jquery-elephant', JSON.stringify(elephFns.formData)); 
    },
    load: function() {
      elephFns.formData = JSON.parse(localStorage.getItem('jquery-elephant')); 
      if (elephFns.formData) {
        $.each(Object.keys(elephFns.formData), elephFns.defaultValues);
      } else {
        elephFns.formData = {};
      }
    }, 
    storeData: function() {
      var box = $(this),
          label = box.attr('name');
          
      if (box.is(':checkbox') || box.is(':radio')) {
          var values = [];
              
          values.push(box.val());
          box.siblings(':checked').each(function() {
            values.push($(this).val());
          });

          elephFns.formData[label] = values;
      } else {
        elephFns.formData[label] = box.val();
      }     
            
      elephFns.save();
    },
    defaultValues: function(key, value) {
      var box = elephFns.form.find('[name="'+value+'"]'),
          value = elephFns.formData[value];
      
			if (typeof box == 'Array') {
				box.filter('[value="' + value + '"]').prop("checked", true);
			} else {
				if (!box.is(':submit')) {
					box.val(value);
				}
			}
    } 
  };

  $.fn.elephant = function() {
    elephFns.form = $(this);
    elephFns.load();

    elephFns.form.find('input, select, textarea').on('change', elephFns.storeData);

    return $(this);
  };  
})(window, jQuery);
