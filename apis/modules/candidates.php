<?php
include '../autoload/database.php';
$db = new Database();
if($db){
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $data = array();
    try{
		if($request) $data = (array)$request->data;
		
    }catch(\Exception $e){}
    if(count($data)>0){
		//if(!trim($data['candidate_id'])){
            $sql = "INSERT INTO `candidates` 
            SET `candidate_fname` 			= ?,
			`candidate_lname` 			= ?,
			`candidate_title` 			= ?,
			`candidate_gender` 			= ?,
			`candidate_dob` 			= ?,
			`candidate_address1` 		= ?,
			`candidate_address2` 		= ?,
			`candidate_address3` 		= ?,
			`candidate_country` 		= ?,
			`candidate_postcode` 		= ?,
			`candidate_designation` 	= ?,
			`candidate_dbs_pvg_number` 	= ?,
			`candidate_dbs_pvg_date` 	= ?,
			`candidate_staff_id` 		= ?,
			`candidate_payroll_id` 		= ?,
			`candidate_email` 			= ?,
			`candidate_pin_number` 		= ?,
			`candidate_pin_expiry_date` = ?,
			`candidate_phone_country_code` 	= ?,
			`candidate_phone_number` 	= ?,
			`candidate_mobile_country_code` = ?,
			`candidate_mobile_phone_number` = ?,
			`candidate_employment _type` 	= ?,
			`candidate_status` 			= ?,
			`candidate_ni_number` 		= ?,
			`candidate_passport_number` = ?,
			`candidate_issueing _country` 	= ?,
			`candidate_visit_type` 		= ?,
			`created_date` 				= NOW()";
			
			$params = array($data['first_name'],
							$data['middle_name'],
							$data['sur_name'],
							$data['gender'],
							$data['dob'],
							$data['address1'],
							$data['address2'],
							$data['address3'],
							$data['country'],
							$data['postcode'],
							$data['designation'],
							$data['dbs_pvg_number'],
							$data['dbs_pvg_issue_date'],
							$data['staff_id'],
							$data['payroll_id'],
							$data['email'],
							$data['pin'],
							$data['pin_expire_date'],
							$data['phone_country_code'],
							$data['phone'],
							$data['mobile_country_code'],
							$data['mobile'],
							$data['employment_type'],
							$data['status'],
							$data['ni_number'],
							$data['passport_number'],
							$data['issuing_country'],
							$data['visa_type']);
							echo $db->getQuery($sql, $params);
        
			$db->add($sql, $params); 
            echo "success";
        //}
        if(trim($data['candidate_id']) != ""){

            if($data['action'] == "edit"){
            
            }
            if($data['action'] == "delete"){
            
            }

        }
    }
    else{
        $sql = "SELECT * FROM `candidates`";
        $result  = $db->select($sql); 
        echo json_encode(array('data'=>$result));
    }
}
?>