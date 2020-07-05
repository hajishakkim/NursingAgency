/* Usage
 * //******* put "novalidate" attribute to each form to avoid html validation *******\\
 * //******* use required attribute to mandatory inputs *******\\
 * data-vtype (attribute) : (validation rule)
 * validation rules are mentioned below:
 *   #---------------------------------------------------------------------#
 *      number          : validate any numbers
 *      wholenumber     : validate whole numbers only
 *      name            : validate name of the objects(people)
 *      text            : validate text
 *      note            : validate descriptive text
 *      email           : validate email
 *      url             : validate url ( following with http://)
 *      telephone       : validate telephone numbers (eg. +91 xxxxxxxxxx, xxx xxx xxxx, xxx-xxx-xxxx, (xxx) xxx xxxx)
 *      date            : validate date with the prefered date format
 *      datetime        : validate date with the prefered date & time format
 *      keyword         : validate code like keywords (eg , ZH01)
 *      password        : password validation
 *      strongpassword  : strong password validation
 *      sibling         : for sibling validation (Eg. password and re-type password comparison) use data-sibling-input attribute to denote id or class for the checking input
 *      saudiphone      : for saudi phone number validation 
 *   #--------------------------------------------------------------------#      
 * data-sibling-input   (attribute)         : "id/class name of the checking input" eg("#zhcode" or ".zhcode")
 * data-suggest-input   (attribute)         : "id/class name of the checking input" eg("#zhcode" or ".zhcode") this for like autosuggest inputs
 * data-suggest-input-sibling (attribute)   : "id/class name of the checking input" eg("#zhcode" or ".zhcode" or #zhcode1|#zhcode2|#zhcode3 [*data-suggest-input* must need]) this for like autosuggest recieving inputs 
 * example : <input type="text" class="form-control" id="xxxx" data-suggest-input="#yyyy" data-suggest-input-sibling="#zzzz|#mmm|.qqq"/> 
 * data-invalid-message (attribute)         : "your message here" // For custom error message for data invalid
 * data-empty-message   (attribute)         : "your message here"  // For custom error message for empty data
 * data-list-type       (attribute)         : it specifies list type, most probably in the case of list coming from list options. There have a Unassigned option, we consider that value as a null value
 * 
 **/
$(function($) {
     //$datetimeformat,$dateformat global date & datetime formats
     $.fn.formvalidation_init = function(form){
         
         console.log('form'+form+" :input");
         console.log($('form'+form+" :input"));
             $('form'+form+" :input").each(function(){
                                if($(this).context.nodeName === "INPUT" && ($(this).attr('type') == 'text' || $(this).attr('type') == 'password')){
                    if(typeof($(this).attr('readonly')) != 'undefined' || $(this).attr('readonly') == 'validate'){
                        $(this).change(function(event) {
                            $(this).validateField('on');
                        });
                        if($(this).data('vtype') == 'date' || $(this).data('vtype') == 'datetime'){
                            $(this).keydown(function(event){
                                if(event.keyCode == '8' || event.keyCode == '46'){
                                    $(this).val('');
                                };
                            });
                            $(this).keydown(function(event) {
                                $(this).validateField('on');
                            });
                        }
                    }else{
                        if((typeof($(this).data('suggest-input')) != 'undefined')){
                            $suggest_input = ($(this).data('suggest-input').indexOf('#') == 0) ? $(this).data('suggest-input') : $(this).next();
                            var input = $(this);
                            $(this).keydown(function(event) {
                                $suggest_input = ($(this).data('suggest-input').indexOf('#') != -1) ? $(this).data('suggest-input') : $(this).next();
                                clearTimeout(timeout);
                                $($suggest_input).val('');
                            });
                            $(this).change(function(event) {
                                $suggest_input = ($(this).data('suggest-input').indexOf('#') != -1) ? $(this).data('suggest-input') : $(this).next();
                                clearTimeout(timeout);
                                $(this).hideError();
                                //$($suggest_input).val('');
                            });
                            $($suggest_input).change(function(event) {
                                //input.validateField('on');
                            });
                            //remove this feature by Me on 4/4//2017 
                            /*$(this).blur(function(event){
                               var $sibling = '';
                               $(this).escapeError();
                               if((typeof($(this).data('suggest-input-sibling')) != 'undefined')){
                                    $sibling = $(this).data('suggest-input-sibling').split('|');
                               }
                               timeout = setTimeout(function(){ 
                                   input.validateField('on');     
                                   if($sibling.length>0){
                                       for(i=0;i<$sibling.length;i++){
                                            $($sibling[i]).escapeError();
                                       }
                                   }
                               }, 1000);
                            });*/
                        }  
                        if((typeof($(this).data('virtual-input')) != 'undefined')){
                            $virtual_input = $(this).data('virtual-input');
                            var input = $(this);
                            $($virtual_input).keyup(function(event) {
                                $(input).validateField('on');
                            });
                        }
                        $(this).keyup(function(event) {
                            $(this).validateField('on');
                            if((typeof($(this).data('suggest-input')) != 'undefined')){
                                $(this).escapeError();
                            }
                            /*$(this).change(function(event) {
                                try{$(this).setCustomValidity('')}catch(e){}
                            });*/
                        });
                        $(this).focusout(function() {    
                            $(this).hideError();
                        })
                        $(this).focusin(function() {
                            $(this).showError();
                        })
                        try{$(this).setCustomValidity('')}catch(e){}
                        if($(this).data('vtype') == 'date' || $(this).data('vtype') == 'datetime'){
                            $(this).change(function(event) {
                                $(this).validateField('off');
                                //try{$(this).setCustomValidity('')}catch(e){}
                            });
                        }
                    }
                }
                if($(this).context.nodeName === "SELECT"){
                    $(this).change(function(event) {
                        $(this).validateField('on');
                    });
                    $(this).blur(function() {    
                        $(this).hideError();
                    })
                    $(this).click(function() {
                        $(this).validateField('on');
                    })
                }
                if($(this).context.nodeName === "TEXTAREA"){
                    if(typeof($(this).attr('readonly')) != 'undefined'){
                        $(this).change(function(event) {
                            $(this).validateField('on');
                        });
                    }else{
                        $(this).keyup(function(event) {
                           $(this).validateField('on');
                        });
                        $(this).focus(function() {
                            $(this).showError();
                        })
                        $(this).blur(function() {
                            $(this).hideError();
                        })
                    }
                }                 
            });
     },
     $.fn.validation = function(form){
        var form = (form) ? form : ('#'+this.attr('id'));
        var input = null;
        var submit = true;
        console.log($('form'+form+" :input"));
        $('form'+form+" :input").each(function(){
            if(typeof($(this).data('vtype')) != 'undefined'){
                //console.log($(this) + " : " + $(this).validateField());
                ($(this).validateField() === true) ? '' : submit = false;
            }
        });
        return submit;
     },
     $.fn.validateField = function(error_msg_status){
         switch($(this).data('vtype')){
             case 'number':
                 return $(this).execute(error_msg_status);
             break;
             case 'text':
                 return $(this).execute(error_msg_status);
             break;
             case 'note':
                 return $(this).execute(error_msg_status);
             break;
             case 'name':
                  return $(this).execute(error_msg_status);
             break;
             case 'date':
                  return $(this).execute(error_msg_status);
             break;
             case 'datetime':
                  return $(this).execute(error_msg_status);
             break;
             case 'telephone':
                  return $(this).execute(error_msg_status);
             break;
             case 'email':
                  return $(this).execute(error_msg_status);
             break;
             case 'url':
                  return $(this).execute(error_msg_status);
             break;
             case 'keyword':
                  return $(this).execute(error_msg_status);
             break;
             case 'input':
                  return $(this).execute(error_msg_status);
             break;
             case 'password':
                  return $(this).execute(error_msg_status);
             break;
             case 'strongpassword':
                  return $(this).execute(error_msg_status);
             break;             
             case 'sibling':
                  return $(this).execute(error_msg_status);
             break;
             case 'saudiphone' :
                 return $(this).execute(error_msg_status);
             break;
         }
         //$(this).execute();
     },
     $.fn.execute = function(error_msg_status){
        var $beforeCheck = true;
        _this = this[0];
        _this = $(_this);      
        
        if(_this[0].nodeName === "SELECT"){
            if($(_this[0]).attr('required') && $(_this[0]).val() == "Unassigned" && $(_this[0]).data('list-type') == 'list_options') $beforeCheck = false;
        }
        var $suggest_input = null,$virtual_input = null; 
        if(typeof($(_this[0]).attr('data-suggest-input')) != 'undefined'){
            $suggest_input = ($(_this[0]).attr('data-suggest-input').indexOf('#') == 0) ? $(_this[0]).attr('data-suggest-input') : $(_this[0]).next();
            $virtual_input = ($(_this[0]).attr('data-error-area') != "") ? $(_this[0]).siblings($(_this[0]).attr('data-error-area')) : null;
            if($virtual_input != null && typeof($(_this[0]).attr('data-suggest-input-pos')) != 'undefined'){
                $suggest_input = ($(_this[0]).attr('data-suggest-input-pos') == "top") ? $(_this[0]).prev() : $suggest_input ;
            }
        }else if((typeof($(_this[0]).attr('data-virtual-input')) != 'undefined')){
            $virtual_input = $(_this[0]).attr('data-virtual-input');
        }
        var input_field = ($suggest_input != null) ? $($suggest_input) : ($virtual_input != null) ? $($virtual_input) : _this;
        var display_field = _this;
        var error_field = ($virtual_input != null) ? $($virtual_input) : _this;
        var vtype = $(_this[0]).attr('data-vtype');
        $(error_field).siblings('span.error-msg').hide();//new added not check well
        $(error_field).attr('title', '');
        if(typeof(display_field.attr('required')) != 'undefined' && input_field.val() == ""){                
            console.log(input_field);
            if((typeof($($suggest_input)) != 'undefined') && input_field.val() == "" && display_field.val() != ""){
                $msg = (typeof(display_field.data('invalid-message')) != 'undefined') ? display_field.data('invalid-message') : eval('error_message.'+vtype+'.invalid');
            }else {
                $msg = (typeof(display_field.data('empty-message')) != 'undefined') ? display_field.data('empty-message') : eval('error_message.'+vtype+'.empty');
            }
            $(error_field).parents().closest('.form-group').addClass('has-error');
            $(error_field).addClass('input-error');
            $(error_field).siblings('span.error-msg').eq(0).html($msg);
            $(error_field).attr('title', $msg);
            if(error_msg_status === "on")
                $(error_field).siblings('span.error-msg').eq(0).show();
            return false;
        }else if(input_field.val() != ""){
            var input_str = input_field.val();
            if(input_str!=null && input_str!=''){//#Mod_Rx_removemandatory
                input_str = input_str.replace(/"/g, '\\"');
                if(vtype === 'note') {
                  input_str = input_str.replace(/\n/g, " ");
                }
            }
            fn = 'input_field.'+vtype+'Validation("'+input_str+'")';
            //fn = 'input_field.'+vtype+'Validation("'+input_field.val()+'")';
            if(vtype === 'date') {
                fn = 'input_field.'+vtype+'Validation("'+input_field.val()+'","'+display_field.data('date-format')+'")';
                error_message.datetime.invalid = 'Invalid date ['+display_field.data('date-format')+']';
            }
            if(vtype === 'datetime') {
                fn = 'input_field.'+vtype+'Validation("'+input_field.val()+'","'+display_field.data('date-format')+'")';
                error_message.datetime.invalid = 'Invalid datetime ['+display_field.data('date-format')+' H:i]';
            }
            if(vtype === 'sibling') {
                fn = 'input_field.'+vtype+'Validation("'+input_field.val()+'","'+$($(_this[0]).data('sibling-input')).val()+'")';
                error_message.datetime.invalid = 'Invalid datetime ['+display_field.data('date-format')+' H:i]';
            }
            if(eval(fn) && $beforeCheck){
                $(error_field).removeClass('input-error');
                if(!$(error_field).parents().closest('.form-group').find('.form-control').hasClass('input-error'))
                    $(error_field).parents().closest('.form-group').removeClass('has-error');
                $(error_field).siblings('span.error-msg').eq(0).hide();
                return true;
            }else{
                $(error_field).parents().closest('.form-group').addClass('has-error');
                $(error_field).addClass('input-error');
                $msg = (typeof(input_field.data('invalid-message')) != 'undefined') ? input_field.data('invalid-message') : eval('error_message.'+vtype+'.invalid');
                $(error_field).siblings('span.error-msg').eq(0).html($msg);
                $(error_field).attr('title', $msg);
                if(error_msg_status === "on")
                    $(error_field).siblings('span.error-msg').eq(0).show();
                return false;
            }
         } else if(input_field.val() == "" && display_field.val() != ""){
            $(error_field).parents().closest('.form-group').addClass('has-error'); 
            $(error_field).addClass('input-error');
            $msg = (typeof(display_field.data('empty-message')) != 'undefined') ? display_field.data('empty-message') : eval('error_message.'+vtype+'.empty');
            $(error_field).siblings('span.error-msg').eq(0).html($msg);
            $(error_field).attr('title', $msg);
            if(error_msg_status === "on")
                $(error_field).siblings('span.error-msg').eq(0).show();
            return false;
         } else if(display_field.val() == ""){            
            $(error_field).removeClass('input-error');
            if(!$(error_field).parents().closest('.form-group').find('.form-control').hasClass('input-error'))
                $(error_field).parents().closest('.form-group').removeClass('has-error');   
            $msg = (typeof(display_field.data('empty-message')) != 'undefined') ? display_field.data('empty-message') : eval('error_message.'+vtype+'.empty');
            $(error_field).siblings('span.error-msg').eq(0).html($msg);
            $(error_field).attr('title', $msg);
            $(error_field).siblings('span.error-msg').eq(0).hide();
            return true;
         }   
         return true;
     },
     $.fn.showError = function (){
          if($(this).parents().closest('.form-group').hasClass('has-error') && $(this).hasClass('input-error')){
                $(this).siblings('span.error-msg').eq(0).show();
          }
     },
     $.fn.escapeError = function (){
          $(this).removeClass('input-error');
          $(this).nextAll('span.error-msg').eq(0).hide();
          $(error_field).attr('title', '');
     },
     $.fn.hideError = function (){
          $(this).nextAll('span.error-msg').eq(0).hide();
          $(error_field).attr('title', '');
     },
     $.fn.wholenumberValidation = function(value){
         var reg = /^\d+$/;
         return (reg.test(value)) ? true : false;
     },
     $.fn.numberValidation = function(value){
         var reg = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/;
         $number_valid =  (reg.test(value)) ? true : false;
         if(typeof($(this[0]).attr('min')) != 'undefined'){
             if(parseFloat($(this[0]).attr('min')) > parseFloat(value)){
                 $number_valid = false;
             }
         }
         return $number_valid;
     },
     $.fn.textValidation = function(text){
         return text.match(textRegEx);
     },
     $.fn.noteValidation = function(note){
         return note.match(noteRegEx);
     },
     $.fn.nameValidation = function(name){
         return name.match(nameRegEx);
     },
     $.fn.dateValidation = function(date,dateformat){
         var regex = '';
         $.each( date_formats, function( index, date_format ){
                if(date_format.format === dateformat){
                    regex = date_format.regex;
                }
         });
         return date.match(regex);
     },
     $.fn.datetimeValidation = function(date,dateformat){
         time = date.split(' ')[1];
         date = date.split(' ')[0];
         var regex = '';
         $.each( date_formats, function( index, date_format ){
                if(date_format.format === dateformat){
                    regex = date_format.regex;
                }
         });
         if(date.match(regex)){
             return time.match(timeRegEx);             
         }
         return false;
     },  
     $.fn.timeValidation = function (time){
        return time.match(timeRegEx);
     },
     $.fn.inputValidation = function(data){
         return (data.trim().length>0) ? true : false;
     },
     $.fn.keywordValidation = function(keyword){
         return keyword.match(keywordRegEx);
     },
     $.fn.mobilenumberValidation = function(){
         
     },
     $.fn.telephoneValidation = function(phone){
         return phone.match(phoneRegEx);
     },
     $.fn.emailValidation = function(email){
          return email.match(emailRegEx);
     },
     $.fn.urlValidation = function(url){
         return url.match(urlRegEx);
     },
     $.fn.passwordValidation = function(pwd){
         return pwd.match(pwdRegEx);
     }
     $.fn.strongpasswordValidation = function(pwd){
         return pwd.match(strongpwdRegEx);
     }
     $.fn.siblingValidation = function(value1,value2){
         return (value1 === value2) ? true : false;
     }
     $.fn.suggestValidation = function(){
         
     }  
     $.fn.saudiphoneValidation = function(pwd) {
        return pwd.match(saudiRegex);
     }
     $.fn.resetValidation = function(){
        var form = this;
        $('form#'+form.attr('id')+" .form-group").each(function(){
            $(this).removeClass('has-error');
            if($(this).hasClass('input-error')){
                $(this).siblings('span.error-msg').eq(0).hide();
            }            
        });
        return true;
     }
     var timeout = null;
     var error_message = 
        {  'number':{'empty':'Required','invalid':'Invalid number'},
           'wholenumber':{'empty':'Required','invalid':'Invalid number'},
           'name':{'empty':'Required','invalid':'Invalid name'},
           'text':{'empty':'Required','invalid':'Invalid text'},
           'note':{'empty':'Required','invalid':'Invalid text'},
           'input':{'empty':'Required','invalid':'Please enter data'},
           'telephone':{'empty':'Required','invalid':'Invalid phone number'},           
           'date':{'empty':'Required','invalid':'Invalid date'},
           'datetime':{'empty':'Required','invalid':'Invalid date time'},
           'email':{'empty':'Required','invalid':'Invalid email'},
           'url':{'empty':'Required','invalid':'Invalid URL [*http://]'},
           'keyword':{'empty':'Required','invalid':'Invalid data'},
           'password':{'empty':'Required','invalid':'Minimum 6 characters,special character not allowed'},
           'strongpassword':{'empty':'Required','invalid':'Minimum 8 characters,atleast 1 number & special character'},
           'sibling':{'empty':'Required','invalid':'Values does not match'},
           'saudiphone':{'empty':'Required','invalid':'Mobile number is not valid '},
        }
     var emailRegEx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
     var urlRegEx = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
     var nameRegEx = /^[a-zA-Z ]{1,10}$/;
     var pwdRegEx  = /^[A-Za-z0-9]{6,}$/i; //Simple Password  
     var strongpwdRegEx  = /^(?=.*[A-Z].*[A-Z])(?=.*[-_!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,20}$/i; // Strong Password
     var keywordRegEx = /^[a-zA-Z]+[0-9]*[a-zA-Z]*$/;
     //var textRegEx  = /^[a-zA-Z0-9&._-]+$/;
     //var textRegEx  = /^[a-zA-Z 0-9_-]+$/;
     //var textRegEx  = /^(?=.*[a-z0-9])[a-z0-9!@#$%&~()?,=\-_'`\[\]\{\};":*.]{7,}$/;
     var textRegEx   = /^(?=.*[a-z0-9])[a-z0-9 !@#$%&~()?,=\-_'`\[\]\{\};":*.]{0,}$/i;
     var noteRegEx   = /^(?=.*[a-z0-9])[a-z0-9 A-Z0-9 ^!@#$%&~()?,=\-_'`\n\[\]\{\};":*.]{0,}$/i;     
     var pattern = /^\d{10}$/;
     var phoneRegEx = /(^)[+[(]{0,1}\d{3}[)]{0,1}[\s-]{0,1}\d{3}[\s-]{0,1}\d{4}$/
     var timeRegEx = /([01]\d|2[0-3]):([0-5]\d)$/
     var date_formats = { 'ymd_hyphen':{'format':'YYYY-MM-DD','jsformat':'Y-m-d','regex':/^((((19|[2-9]\d)\d{2})\-(0[13578]|1[02])\-(0[1-9]|[12]\d|3[01]))|(((19|[2-9]\d)\d{2})\-(0[13456789]|1[012])\-(0[1-9]|[12]\d|30))|(((19|[2-9]\d)\d{2})\-02\-(0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))\-02\-29))$/},'ymd_slash':{'format':'YYYY/MM/DD','jsformat':'Y/m/d','regex':/^((((19|[2-9]\d)\d{2})\/(0[13578]|1[02])\/(0[1-9]|[12]\d|3[01]))|(((19|[2-9]\d)\d{2})\/(0[13456789]|1[012])\/(0[1-9]|[12]\d|30))|(((19|[2-9]\d)\d{2})\/02\/(0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))\/02\/29))$/},'dmy_hyphen':{'format':'DD-MM-YYYY','jsformat':'d-m-Y','regex':/^(((0[1-9]|[12]\d|3[01])\-(0[13578]|1[02])\-((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\-(0[13456789]|1[012])\-((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\-02\-((19|[2-9]\d)\d{2}))|(29\-02\-((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/},'dmy_slash':{'format':'DD/MM/YYYY','jsformat':'d/m/Y','regex':/^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/},'mdy_hyphen':{'format':'MM-DD-YYYY','jsformat':'m-d-Y','regex' : /^(((0[13578]|1[02])\-(0[1-9]|[12]\d|3[01])\-((19|[2-9]\d)\d{2}))|((0[13456789]|1[012])\-(0[1-9]|[12]\d|30)\-((19|[2-9]\d)\d{2}))|(02\-(0[1-9]|1\d|2[0-8])\-((19|[2-9]\d)\d{2}))|(02\-29\-((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/},'mdy_slash':{'format':'MM/DD/YYYY','jsformat':'m/d/Y','regex' : /^(((0[13578]|1[02])\/(0[1-9]|[12]\d|3[01])\/((19|[2-9]\d)\d{2}))|((0[13456789]|1[012])\/(0[1-9]|[12]\d|30)\/((19|[2-9]\d)\d{2}))|(02\/(0[1-9]|1\d|2[0-8])\/((19|[2-9]\d)\d{2}))|(02\/29\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/}};
     var saudiRegex  = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
});