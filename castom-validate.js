var form_validation = {

  login : function (element, number) {

    var regex =  new RegExp('^[0-9]{' + number + '}$');

      if (! /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test($(element).val()) && ! regex.test($(element).val())) {
          var error_message = 'Enter a valid email address or phone number';
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

          switch ($(element).attr('name')) {   
              case 'login' :
                  if ('' == $(element).val()) {
                    valid_data = form_validation.required(element);
                  } else {
                    valid_data = form_validation.login(element, 11);
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

        getData($(this).serialize())       
            .then(showModal)         
            .catch(showModalError);   
        
        // $.post('save.php', $(this).serialize(), function(data){
        //   console.log(data); //callback server <-
        //   alert(data);
        // });
        //$('form')[0].submit(); default POST
      }
  });
});

function getData(body){
    console.log('Ожидание ответа...');   
    
    
    // Parse
    var end = body.indexOf('&');   


    var promise = new Promise(function(resolve, reject) {
        setTimeout(()=>{
            let data = {
                "res": ` ${body.substring(6, end)}, GOOD!`,
                "err": '500!'
            };  
            Math.random() > .5 ?  resolve(data.res) : reject(data.err);
        }, 2000);        
      })
    return promise;
}

function showModal(data){
    $('.modal-content').find('div.modal-body').text('Ответ: ' + data).addClass('active').removeClass('inactive');
    $('#myModal').modal('show');
    console.log('Данные от сервера: ', data);
}

function showModalError(err){
    $('.modal-content').find('div.modal-body').text('Ответ: ' + err).addClass('inactive').removeClass('active');
    $('#myModal').modal('show');
    console.log('Ошибка на сервере: ', err)
}