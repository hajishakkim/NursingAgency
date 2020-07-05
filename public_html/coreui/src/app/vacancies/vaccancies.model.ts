export class Vaccancies {
    vaccancy_id: string = '';
    vaccancy_ref_number: string = '';
    vaccancy_date: string = '';
    vaccancy_client: string = '';
    vaccancy_business_unit: string = '';
    vaccancy_shift_type: string = '';
    vaccancy_job: string = '';
    vaccancy_break_time: string = '';
    vaccancy_space: string = '';
    vaccancy_location: string = '';
    vaccancy_details: string = '';
    vaccancy_created_time: string = '';
    vaccancy_updated_time: string = '';
    vaccancy_created_by: string = '';
    vaccancy_updated_by: string = '';
    vaccancy_active: string = '';
	vaccancy_candidate_id: string = '';
  }
  export class VaccanciesLabels {
    vaccancy_id: string = 'Vaccancy ID';
    vaccancy_ref_number: string = 'Refrence No';
    vaccancy_date: string = 'Date';
    vaccancy_client: string = 'Client';
    vaccancy_business_unit: string = 'Business Unit';
    vaccancy_shift_type: string = 'Shift Type';
    vaccancy_job: string = 'Jobs';
    vaccancy_break_time: string = 'Break Time';
    vaccancy_space: string = 'Space';
    vaccancy_location: string = 'Location';
    vaccancy_details: string = 'Details';
    vaccancy_created_time: string = 'Created Time';
    vaccancy_updated_time: string = 'Updated Time';
    vaccancy_created_by: string = 'Created By';
    vaccancy_updated_by: string = 'Updated BY';
    vaccancy_active: string = 'Active';
	vaccancy_candidate_id: string = "Candidate Name";
  }
  export class VaccancyGridManager {
    vaccancy_id : any = {
      value : '', 
      label : 'Vaccancy ID',
      show_default:0,
      show_current:0
    };
    vaccancy_ref_number : any = {
      value : '', 
      label : 'Refrence No',
      show_default:1,
      show_current:1
    };
    vaccancy_date : any = {
      value : '', 
      label : 'Date',
      show_default:1,
      show_current:1
    };
    vaccancy_client : any = {
      value : '', 
      label : 'Client',
      show_default:1,
      show_current:1
    };
    vaccancy_business_unit : any = {
      value : '', 
      label : 'Business Unit',
      show_default:1,
      show_current:1
    };
    vaccancy_shift_type : any = {
      value : '', 
      label : 'Shift Type',
      show_default:1,
      show_current:1
    };
    vaccancy_job : any = {
      value : '', 
      label : 'Jobs',
      show_default:1,
      show_current:1
    };
    vaccancy_break_time : any = {
      value : '', 
      label : 'Break Time',
      show_default:1,
      show_current:1
    };
	vaccancy_candidate_id: any = {
      value : '', 
      label : 'Candidate Name',
      show_default:1,
      show_current:1
    };
    vaccancy_space : any = {
      value : '', 
      label : 'Space',
      show_default:1,
      show_current:1
    };
    vaccancy_location : any = {
      value : '', 
      label : 'Location',
      show_default:1,
      show_current:1
    };
    vaccancy_details : any = {
      value : '', 
      label : 'Details',
      show_default:0,
      show_current:0
    };
    vaccancy_created_time : any = {
      value : '', 
      label : 'Created Time',
      show_default:0,
      show_current:0
    };
    vaccancy_updated_time : any = {
      value : '', 
      label : 'Updated Time',
      show_default:0,
      show_current:0
    };
    vaccancy_created_by : any = {
      value : '', 
      label : 'Created By',
      show_default:0,
      show_current:0

    };
    vaccancy_updated_by : any = {
      value : '', 
      label : 'Updated By',
      show_default:0,
      show_current:0
    };
    vaccancy_active : any = {
      value : '', 
      label : 'Active',
      show_default:0,
      show_current:0
    };

  }