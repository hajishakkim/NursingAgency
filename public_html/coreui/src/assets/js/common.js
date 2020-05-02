/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
  var dateFormat = "mm/dd/yy";

  //bootstrap colorpicker initialization
 // $('.colorpicker-component').colorpicker({
   // color: '#f00000',
    //format: 'hex'
  //});

  //tooltip initialization
  try{
    $('[data-toggle="tooltip"]').tooltip({
      container: 'body',
      trigger: 'hover'
    });
  }catch(e){}
  // Bootstrap Select
  try{
    $('.selectpicker').selectpicker({
      container: 'body'
    });
  }catch(e){}

  // Bootstrap multi-Selectpicker
  //$('.mulitselectpicker').multiselectpicker({
    //multipleCloser: true,
    //selectedTextLimit: 3,
  //});

  //Bootstrap jQuery ScrollingTab
  //$('.tab-light-blue .nav-tabs , .tab-white .nav-tabs').scrollingTabs();

  //jQuery UI Datepicker
  $(".custom-datepicker .form-control").datepicker({
    changeMonth: true,
    changeYear: true,
    dateFormat: dateFormat,
    container: 'body'
  });

  //jQuery UI Timepicker
  /*$(".custom-timepicker .form-control").timepicker({
    timeFormat: 'hh:mm:ss',
    container: 'body',
    interval: 15
  });*/

  //jQuery UI Date-timepicker
  /* $(".custom-timepicker .form-control").datetimepicker({
   timeFormat: "hh:mm tt"
   }); */

  //dataTable initialize function
  setTimeout(function() {
    //dataTableDraw();
  });

  //Multiple dropdown functionalities
  moreCollapse($('.multipletag-wrap'));
  $('body').on('click', '.multipletag-icon', function() {
    var ths = $(this);
    ths.closest('.multipletag-wrap').find('.multipletag-sec').removeClass('expanded').find('.more-btn').removeClass('collapsed');
    ths.toggleClass('active');
    ths.closest('.multipletag-wrap').find('.multipletag-dropdown').toggle();
    if (ths.hasClass('active')) {
      drpdownPosition(ths);
    }
  });
  $('body').on('change', '.multipletag-dropdown .multipletag-checkbox', function() {
    var wraps = $(this).closest('.multipletag-wrap');
    var ths = $(this);
    var thsId = ths.closest('li').attr('data-id');
    var thsText = ths.closest('.checkbox').find('.text').text();
    if (ths.prop('checked')) {
      var listItem = '<span data-val="' + thsId + '" class="multipletag-item">' + thsText + ' <i class="fal fa-times remove"></i></span>';
      ths.closest('.multipletag-wrap').find('.multipletag-sec-inner').append(listItem);
    } else {
      ths.closest('.multipletag-wrap').find('.multipletag-item').each(function() {
        if (thsId === $(this).attr('data-val')) {
          $(this).remove();
        }
      });
    }
    moreCollapse(wraps);
  });
  $('body').on('click', '.multipletag-item .remove', function() {
    var wraps = $(this).closest('.multipletag-wrap');
    var thsId = $(this).closest('.multipletag-item').attr('data-val');
    $(this).closest('.multipletag-wrap').find('.multipletag-dropdown li').each(function() {
      if (thsId === $(this).attr('data-id')) {
        $(this).find('.multipletag-checkbox').prop('checked', false);
      }
    });
    $(this).closest('.multipletag-item').remove();
    moreCollapse(wraps);
  });
  $('body').on('click', '.multipletag-sec .more-btn', function() {
    var ths = $(this);
    ths.closest('.multipletag-wrap').find('.multipletag-dropdown').hide().removeAttr('style');
    ths.closest('.multipletag-wrap').find('.multipletag-icon').removeClass('active');
    ths.toggleClass('collapsed');
    if (ths.hasClass('collapsed')) {
      ths.text('Collapse');
      $(this).closest('.multipletag-sec').addClass('expanded');
    } else {
      ths.text('More');
      $(this).closest('.multipletag-sec').removeClass('expanded');
    }
  });

  //table functionalities
  $('body').on('change', '.select-row input[type="checkbox"]', function() {
    var unchecked = 0;
    $(this).closest('tr').toggleClass('tr-checked');
    $('.select-row input[type="checkbox"]').each(function() {
      if (!$(this).prop('checked')) {
        unchecked++;
      }
    });
    if (unchecked === 0) {
      $('.select-row-th input[type="checkbox"]').prop('checked', true);
    } else {
      $('.select-row-th input[type="checkbox"]').prop('checked', false);
    }
  });
  $('body').on('change', '.select-row-th input[type="checkbox"]', function() {
    if ($(this).prop('checked')) {
      $('.select-row input[type="checkbox"]').prop('checked', true);
      $('.select-row').closest('tr').addClass('tr-checked');
    } else {
      $('.select-row input[type="checkbox"]').prop('checked', false);
      $('.select-row').closest('tr').removeClass('tr-checked');
    }
  });
  $('body').on('click', 'td .right-arrow', function() {
    $(this).closest('tr').toggleClass('expanded');
    $(this).find('i').toggleClass('fa-chevron-circle-right fa-chevron-circle-down');
    if ($(this).closest('tr').hasClass('expanded')) {
      var expandTr = '<tr class="tr-expansion"><td colspan="13"><div class="expanded-area"><p>Expanded content here...</p></div></td></tr>';
      $(this).closest('tr').after(expandTr);
      $(this).attr('data-original-title', 'Collapse Row');
    } else {
      $(this).closest('tr').next('.tr-expansion').remove();
      $(this).attr('data-original-title', 'Expand Row');
    }
  });





  //common page functionalities
  $('.UIkit-wrapper').scroll(function() {
    $('#ui-timepicker-div, #ui-datepicker-div').hide();
    $('.btn-group.bootstrap-select, .bs-container.bootstrap-select, .btn-group.multi-select, .bs-container.multi-select').removeClass('open');
    $('.multipletag-dropdown').hide().removeAttr('style');
    $('.multipletag-wrap .multipletag-icon').removeClass('active');
  });

  $(window).resize(function() {
    drpdownPosition($('.multipletag-icon'));
    $('#allTable_wrapper .dataTables_scrollBody').height(calcTableHeight());
    $('#allTable_wrapper .dataTables_empty').css('height', calcTableHeight() + 'px');
  });

  $('body').click(function(e) {
    if ($(e.target).closest('.multipletag-wrap').length === 0 && ($(e.target).closest('.multipletag-item').length === 0)) {
      $('.multipletag-dropdown').hide().removeAttr('style');
      $('.multipletag-wrap .multipletag-icon').removeClass('active');
    }
  });
  
  fixedHeaderTable($('.table-wrapper'));
  
});

// functions
function drpdownPosition(ths) {
  var maxHgt = 250;
  var wndwHgt = $(window).height();
  var boxWdth = ths.closest('.multipletag-wrap').find('.multipletag-dropdown').outerWidth();
  var boxHgt = ths.closest('.multipletag-wrap').find('.multipletag-dropdown').outerHeight();
  var tops = ths.offset().top + 31;
  var lefts = ths.offset().left - boxWdth + 30;
  if (wndwHgt < (tops + boxHgt)) {
    tops = ths.offset().top - boxHgt;
    if (tops < 0) {
      tops = 0;
      maxHgt = ths.offset().top - 3;
    }
  }
  ths.closest('.multipletag-wrap').find('.multipletag-dropdown').css({
    top: tops,
    left: lefts,
    'max-height': maxHgt
  }, 1000);
}

function moreCollapse(ths) {
  var innerHgt = ths.find('.multipletag-sec-inner').outerHeight();
  if (innerHgt > 28) {
    ths.addClass('with-more');
  } else {
    ths.removeClass('with-more');
  }
}

function dataTableDraw() {
  $('#allTable').dataTable({
    scrollX: true,
    "scrollY": calcTableHeight() + 'px',
    paging: true,
    fixedHeader: {
      header: true,
      footer: false
    },
    pagingType: "full_numbers",
    searching: false,
    dom: '<"top"f>rt<"bottom"ilp><"clear">',
    destroy: true,
    pageLength: 25,
    lengthMenu: [10, 25, 50, 100],
    responsive: true,
    fnDrawCallback: function() {
      var rows = this.fnGetData();
      if (rows.length === 0) {
        $('.dataTables_empty').css('height', calcTableHeight() + 'px');
      }
      $('#allTable_wrapper .dataTables_scrollBody').height(calcTableHeight());
      $('#allTable_wrapper .dataTables_scrollBody').scroll(function() {


      });
    }
  });
}

function calcTableHeight() {
  var height = $(window).height() / 3;
  return height;
}


function setDataTable(options,table){
  console.log(options);
  var default_options = {
    paging: true,
    


  };
  options = (options != null) ? options : default_options;
  table = (table!='') ? table : '#listing-table';
  $(table).DataTable(options);
}
function setDataTableInit(table){
  table = (table!='') ? table : '#listing-table';
  $(table).DataTable();
}
function refreshSelectpicker(){
  try{
    $('.selectpicker').selectpicker({
      container: 'body'
    });
  }catch(e){}
  $('.custom-datepicker input').datepicker();
}
function fixedHeaderTable(ths) {
  setTimeout( function(){
    _fixedHeaderTable(ths);
  },50);
}

// Fixed Table Header
function _fixedHeaderTable(ths) {
  var widthArray = [];
  ths.find('.table').css('width', '');
  
  ths.find('.table-header').css('padding-right', '');

  ths.find('.table-body .table tr:first td').each(function() {
    widthArray.push($(this).outerWidth());
  });
  ths.find('.table-header .table th').each(function(e) {
    widthArray[e] = ($(this).outerWidth() < widthArray[e]) ? widthArray[e] :$(this).outerWidth();
    $(this).css({
      'width': widthArray[e],
      'min-width': widthArray[e]
    });
  });
  ths.find('.table-body .table tr:first td').each(function(e) {
    $(this).css({
      'width': widthArray[e],
      'min-width': widthArray[e]
    });
  });
  var bodyWdth = ths.find('.table-body .table').outerWidth();
  var tophdrhght = $('.main-top-head').outerHeight();
  var tablehdrhght = $('.table-header').outerHeight();
  var tablefooterhght = $('.table-footer').outerHeight(); 
  var bodyHgt = $(window).height() - tophdrhght - tablehdrhght - tablefooterhght - 125;
  var bodyTableHgt = ths.find('.table-body .table').outerHeight();
  console.log(bodyWdth)
  ths.find('.table-header .table, .table-body .table').outerWidth(bodyWdth);
  ths.find('.table-body').css('max-height', bodyHgt);
  if (bodyHgt < bodyTableHgt) {
    var scrollBarwdth = $('.table-body')[0].offsetWidth - $('.table-body')[0].clientWidth;
    ths.find('.table-header').addClass('scrolling');
    ths.find('.table-header').css('padding-right', scrollBarwdth);
  } else {
    ths.find('.table-header').removeClass('scrolling');
    ths.find('.table-header').css('padding-right', '');
  }
  ths.find('.table-body').scroll(function(e) {
    ths.find('.table-header-inner').scrollLeft(e.target.scrollLeft);
  });
  
};
