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

  $(document).on('click','.show-hide-password',function(){
    $(this).find('i').toggleClass('fa-eye-slash fa-eye');
    
  });
  /*-- Listing table --*/
       $('#listing-table').DataTable({
            paging: true,
            fixedHeader: {
                header: true,
                footer: false
            },
            "columnDefs": [{
              "targets": "no-sort",
              "orderable": false
            }],
            "pagingType": "full_numbers",
            "searching": false,
            "dom": '<"top"f>rt<"bottom"ilp><"clear">',
            destroy: true,
            "colReorder" : true

        });
             table = $('.listing-table').DataTable({
                    paging: true,
                   fixedHeader: {
                        header: true,
                        footer: false
                    },
                    "columnDefs": [{
                      "targets": "no-sort",
                    "orderable": false,
                    }],
                    "pagingType": "full_numbers",
                    "searching": false,
                    "dom": '<"top"f>rt<"bottom"ilp><"clear">',
                    destroy: true,
                    "order": [[0, "asc"]],
                    "colReorder" : true
               });
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

       

  //jQuery UI Datepicker
  $(".custom-datepicker .form-control").datepicker({
    changeMonth: true,
    changeYear: true,
    dateFormat: 'dd/mm/yy',
    container: 'body'
  });

  //$('.scrolltab-list').scrollingTabs({bootstrapVersion: 4});

  $('[data-toggle="tooltip"]').tooltip();

// Hide submenus
$('#sidebarMenu .collapse').collapse('hide');

  // Collapse click
  $('[data-toggle=sidebar-colapse]').click(function() {
      SidebarCollapse();
  });

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