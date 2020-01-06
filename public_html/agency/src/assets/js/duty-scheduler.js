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
