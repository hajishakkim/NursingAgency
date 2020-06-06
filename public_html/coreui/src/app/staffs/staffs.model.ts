export class Staffs {
  staff_id: string = '';
 // name: string = '';
  staff_ref_id : string ='';
  staff_doj : string = '';
  staff_client_id: string = '';
  staff_shift_type : string ='';
  staff_business_unit_id : string = '';
  staff_space: string = '';
  staff_location : string ='';
  staff_details : string = '';
}
export class StaffLabels {
  staff_id: string = 'Staff ID';
  staff_ref_id: string = 'Ref Number';
  staff_doj: string = 'Date of join';
  staff_client_id: string = 'Client';
  staff_business_unit_id: string = 'Business Unit';
  staff_shift_type: string = 'Shift Type';
  staff_space: string = 'Space';
  staff_location: string = 'Location';
  staff_details: string = 'Details';
}
export class StaffGridManager {
  staff_id : any = {
    value : '', 
    label : 'Staff ID',
    show_default:0,
    show_current:0
  };
  staff_ref_id : any = {
    value : '', 
    label : 'Refrence Number',
    show_default:1,
    show_current:1
  };
  staff_doj : any = {
    value : '', 
    label : 'Date of join',
    show_default:1,
    show_current:1
  };
  staff_client_id : any = {
    value : '', 
    label : 'Client',
    show_default:1,
    show_current:1
  };
  staff_business_unit_id : any = {
    value : '', 
    label : 'Business Unit',
    show_default:1,
    show_current:1
  };
  staff_shift_type : any = {
    value : '', 
    label : 'Shift Type',
    show_default:1,
    show_current:1
  };
  staff_space : any = {
    value : '', 
    label : 'Space',
    show_default:1,
    show_current:1
  };
  staff_location : any = {
    value : '', 
    label : 'Location',
    show_default:1,
    show_current:1
  };
  staff_details : any = {
    value : '', 
    label : 'Details',
    show_default:1,
    show_current:1
  };





















}