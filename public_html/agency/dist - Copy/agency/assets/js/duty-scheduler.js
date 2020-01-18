/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/*
 Created on : 7 Sep, 2018, 10:23:36 AM
 Author     : ansar
 */
$(function () {
  /*-- Listing table --*/       
        if ($('.handles').length) {
               $('.handles').sortable({
                   handle: 'span',
                    items: 'li:not(.drag-false)',
                    stop: function(event, ui) {
                        var tbl = $('.listing-table');
                        end_pos = ui.item.index();
                        moveColumn(tbl, start_pos, end_pos);
                    },
                    start: function(event, ui) {
                       start_pos = ui.item.index();
                    }
                });
            }

        $(document).on('click','.customisation-btn',function(){
          $('.customisation-dropdown').slideToggle();
        });

        $(document).on('click','.user-info',function(){
          $('.user-settings-list').slideToggle();
        });
        
        $(document).on('click','.submenu-list',function(e){
          e.preventDefault();
          $(this).toggleClass('opened');
          $(this).closest('.submenu-list').find('.sidebar-submenu').slideToggle();
        });

        $(document).on('click','.submenu-item', function (e) {
          return false;
        });
        


        $(document).on('click','.sidebar-colapse',function(){
          //alert('hi');
            SidebarCollapse();
        });

        
        


  //jQuery UI Datepicker
  /*$(".custom-datepicker .form-control").datepicker({
    changeMonth: true,
    changeYear: true,
    dateFormat: 'dd/mm/yy',
    container: 'body'
  });*/

  //$('.scrolltab-list').scrollingTabs({bootstrapVersion: 4});

  $('[data-toggle="tooltip"]').tooltip();

// Hide submenus
$('#sidebarMenu .collapse').collapse('hide');

  // Collapse click


  //formwrapperHeight();





////    $(".customisation-btn").click(function() {
////        $(".customisation-btn-wrapper").toggleClass("active");
////    });
//    if ($('.handles').length) {
//        $('.handles').sortable({
//            handle: 'span',
//            items: 'li:not(.drag-false)',
//            stop: function(event, ui) {
//                var tbl = $('.listing-table');
//                end_pos = ui.item.index();
//                moveColumn(tbl, start_pos, end_pos);
//            },
//            start: function(event, ui) {
//                start_pos = ui.item.index();
//            }
//        });
//    }

});


/*function formwrapperHeight(){
	var windowHght = $(window).height();
	var commonfootHght =$('.common-footer').outerHeight();
	var formwrapHeight = windowHght - commonfootHght - 10;
	$('.form-wrapper').height(formwrapHeight);
}*/
function SidebarCollapse () {
    $('.menu-collapsed').toggleClass('d-none');
    $('.sidebar-submenu').toggleClass('d-none');
    $('.submenu-icon').toggleClass('d-none');
    $('#sidebarMenu').toggleClass('sidebar-expanded sidebar-collapsed');

    // Collapse/Expand icon
    $('#collapse-icon i').toggleClass('fa-angle-double-left fa-angle-double-right');
}
