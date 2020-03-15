<?php
include './common.class.php';
$common = new Common();
if(file_get_contents("php://input")){
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $data = (array)$request;
    $page = 1;
    $row_per_page = 10;
    try{
        if(isset($data['request_items']))
        {
            $data = (array)$request->request_items;
            $result = $common->getListItems($data);
            echo json_encode($result);
            exit;
        }else{
            $data = array();
            $page = 1;
            $row_per_page = 10;
            try{
                if($request) 
                {
                    $data = (array)$request->data;
                    $page = $request->page ? $request->page : 1;
                    $row_per_page = $request->row_per_page ? $request->row_per_page : 10;
                }
            }
    catch(\Exception $e){}
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
            
            $params = array($data['candidate_fname'],
            $data['candidate_lname'],
            $data['candidate_title'],
            $data['candidate_gender'],
            $data['candidate_dob'],
            $data['candidate_address1'],
            $data['candidate_address2'],
            $data['candidate_address3'],
            $data['candidate_country'],
            $data['candidate_postcode'],
            $data['candidate_designation'],
            $data['candidate_dbs_pvg_number'],
            $data['candidate_dbs_pvg_issue_date'],
            $data['candidate_staff_id'],
            $data['candidate_payroll_id'],
            $data['candidate_email'],
            $data['candidate_pin'],
            $data['candidate_pin_expiry_date'],
            $data['candidate_phone_country_code'],
            $data['candidate_phone_number'],
            $data['candidate_mobile_country_code'],
            $data['candidate_mobile_phone_number'],
            $data['candidate_employment_type'],
            $data['candidate_status'],
            $data['candidate_ni_number'],
            $data['candidate_passport_number'],
            $data['candidate_issueing_country'],
            $data['candidate_visit_type']);
            $common->add($sql, $params); 
            echo json_encode(array("status"=>"success"));
       
        }
      else if(trim($data['candidate_id']) != ""){
           If($data['action'] == "edit"){
            $sql = "UPDATE  `candidates` 
            SET  `candidate_fname` =?, 
             `candidate_lname` =?, 
             `candidate_title` =?,  
             `candidate_gender` =?,  
             `candidate_dob` =?,  
             `candidate_address1` =?,  
             `candidate_address2` =?, 
             `candidate_address3` =?,  
             `candidate_country` =?,  
             `candidate_postcode` =?, 
             `candidate_designation` =?, 
             `candidate_dbs_pvg_number` =?,  
             `candidate_dbs_pvg_issue_date`  =?,  
             `candidate_staff_id`  =?,   
             `candidate_payroll_id`  =?,
             `candidate_email`  =?,
             `candidate_pin` =?,
             `candidate_pin_expiry_date` =?, 
             `candidate_phone_country_code` =?, `candidate_phone_number` =?, 
             `candidate_mobile_country_code`  =?, `candidate_mobile_phone_number` =?, 
             `candidate_employment_type` =?, `candidate_status` =?, `candidate_ni_number` =?, 
             `candidate_passport_number`  =?,`candidate_issueing_country`  =?,
             `candidate_visa_type`  =? WHERE candidate_id = ?";
             
             $params = array($data['candidate_fname'],
             $data['candidate_lname'],
             $data['candidate_title'],
             $data['candidate_gender'],
             $data['candidate_dob'],
             $data['candidate_address1'],
             $data['candidate_address2'],
             $data['candidate_address3'],
             $data['candidate_country'],
             $data['candidate_postcode'],
             $data['candidate_designation'],
             $data['candidate_dbs_pvg_number'],
             $data['candidate_dbs_pvg_issue_date'],
             $data['candidate_staff_id'],
             $data['candidate_payroll_id'],
             $data['candidate_email'],
             $data['candidate_pin'],
             $data['candidate_pin_expiry_date'],
             $data['candidate_phone_country_code'],
             $data['candidate_phone_number'],
             $data['candidate_mobile_country_code'],
             $data['candidate_mobile_phone_number'],
             $data['candidate_employment_type'],
             $data['candidate_status'],
             $data['candidate_ni_number'],
             $data['candidate_passport_number'],
             $data['candidate_issueing_country'],
             $data['candidate_visit_type'],$data['candidate_id']);
             $common->update($sql, $params); 
            }
           else if($data['action'] == "delete"){
                $sql = "UPDATE  candidates SET candidate_activity = ?  WHERE candidate_id = ? ";
                $common->update($sql, array(2,$data['candidate_id']));
            }
            echo json_encode(array("status"=>"success"));
       }
    }
    else{
        $start_limit = ($page-1)*$row_per_page;
        $end_limit   = $row_per_page;
        $sql = "select c.*,li.list_item_title,cntry.country_name,des_cntry.country_name as designation FROM candidates c 
        left join countries  cntry ON c.candidate_country = country_id
        left join countries  des_cntry ON candidate_designation = des_cntry.country_id
        left join list_items li ON candidate_gender = list_item_id 
        left join lists ls ON ls.list_id = li.list_id AND list_type=?
        WHERE candidate_activity = ?
         LIMIT $start_limit,$end_limit";
        $result  = $common->select($sql,array('gender',1)); 
        $countSql = "SELECT count(candidate_id) as total FROM candidates WHERE candidate_activity = ?";
        $totalCntRes  = $common->select($countSql,array(1)); 
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
}catch(\Exception $e){}
}
?>