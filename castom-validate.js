var form_validation = {

  email : function (element) {
      if (! /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test($(element).val())) {
          var error_message = 'Enter a valid email address';
          this.add_error(element, error_message);
          return false;
      }
      return true;
  },

  required : function (element) {
    if ('' == $(element).val()) {
        var error_message = 'This field is required field';
        this.add_error(element, error_message);
        return false;
    }
    return true;
  },


  add_error: function (element, error_message) {
      $(element).closest('.form-group').find('span.message').text(error_message);
      $(element).addClass('has-error');
  }
};

$(function () {
  var valid_data = true;
  $('form').on('submit', function (e) {
      e.preventDefault();

      $('span.message').text('');

      $.each($('input'), function (index, element) {

          $(element).removeClass('has-error');

          switch ($(element).attr('type')) {   
              case 'email' :
                  if ('' == $(element).val()) {
                    valid_data = form_validation.required(element);
                  } else {
                    valid_data = form_validation.email(element);
                  }
                  break;
              case 'password' :
                  valid_data = form_validation.required(element);
                  break;
          }

          if(! valid_data) {
              return false;
          }
      });
      
      if(valid_data) {   
        $.post('save.php', $(this).serialize(), function(data){
          console.log(data); //callback server <-
          alert(data);
        });
        //$('form')[0].submit(); default POST
      }
  });
});