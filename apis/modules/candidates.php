<?php
include '../autoload/database.php';
$db = new Database();
if($db){
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $data = array();
    $data = array();
    $page = 1;
    $row_per_page = 10;
    try{
        if($request) $data = (array)$request->data;
        $page = $request->page ? $request->page : 1;
        $row_per_page = $request->row_per_page ? $request->row_per_page : 10;
    }catch(\Exception $e){}
    if(count($data)>0){
        
        if(trim($data['candidate_id']) == ""){
            
            $sql = "INSERT INTO `candidates` 
            (`candidate_fname`, 
            `candidate_lname`, 
            `candidate_title`, 
            `candidate_gender`, 
            `candidate_dob`, 
            `candidate_address1`, 
            `candidate_address2`, 
            `candidate_address3`, 
            `candidate_country`, 
            `candidate_postcode`, 
            `candidate_designation`, 
            `candidate_dbs_pvg_number`, 
            `candidate_dbs_pvg_issue_date`, 
            `candidate_staff_id`, 
            `candidate_payroll_id`,
            `candidate_email`,
            `candidate_pin`,
            `candidate_pin_expiry_date`,
            `candidate_phone_country_code`,`candidate_phone_number`,
            `candidate_mobile_country_code`,`candidate_mobile_phone_number`,
            `candidate_employment_type`,`candidate_status`,`candidate_ni_number`,
            `candidate_passport_number`,`candidate_issueing_country`,
            `candidate_visa_type`,`created_date`) VALUES 
            (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())";
            //print_r($data);
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
            $data['cand_status'],
            $data['ni_number'],
            $data['passport_number'],
            $data['issuing_country'],
            $data['visa_type']);
            $db->add($sql, $params); 
            echo json_encode(array("status"=>"success"));
        }
        if(trim($data['vaccancy_id']) != ""){

            if($data['action'] == "edit"){
            
            }
            if($data['action'] == "delete"){
            
            }

        }
    }
    else{
        $start_limit = ($page-1)*$row_per_page;
        $end_limit   = $row_per_page;
        $sql = "SELECT SQL_CALC_FOUND_ROWS  * FROM `candidates` LIMIT $start_limit,$end_limit";
        $result  = $db->select($sql); 
        $countSql = "SELECT FOUND_ROWS() as total";
        $totalCntRes  = $db->select($countSql); 
        $totalCnt     = $totalCntRes[0]['total'];  
        $totalPages   = $totalCnt%$row_per_page==0 ?  $totalCnt/$row_per_page : ($totalCnt/$row_per_page)+1;
        $totalPagesArr = array();
        for($i=1;$i<=$totalPages;$i++){
            array_push($totalPagesArr,$i);    
        }
        $totalPagesArrEncoded = json_encode($totalPagesArr);
        echo json_encode(array('data'=>$result,'totalCnt'=>$totalCnt ,'totalPagesArr' => $totalPagesArr));

    }
}
?>