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
					$action = isset($request->action) ? $request->action : 'index';
                    $row_per_page = $request->row_per_page ? $request->row_per_page : 10;
                }
            }
    catch(\Exception $e){}
     	$timestamp             = trim($data['candidate_dob'])!='' ? strtotime($data['candidate_dob']) :'';
	    $data['candidate_dob'] = date("yyyy-mm-dd", $timestamp);	
        if(count($data)>0 &&  $action == "save"){
            $where_sql = "";
                if(trim($data['candidate_id']) == ""){
                    $sql = "INSERT INTO ";
                }
                if(trim($data['candidate_id']) != ""){
                    $sql = "UPDATE ";
                    $where_sql = " WHERE candidate_id = ? ";
                }
            $sql .= "`candidates` SET 
            `candidate_fname` = ?, 
            `candidate_lname` = ?, 
            `candidate_title` = ?, 
            `candidate_gender` = ?, 
            `candidate_dob` = ?, 
            `candidate_address1` =?, 
            `candidate_address2` =?, 
            `candidate_address3` =?, 
            `candidate_country` =?, 
            `candidate_postcode` =?, 
            `candidate_designation` =?, 
            `candidate_dbs_pvg_number` =?, 
            `candidate_dbs_pvg_issue_date` =?, 
            `candidate_staff_id` =?, 
            `candidate_payroll_id` =?,
            `candidate_email` =?,
            `candidate_pin` =?,
            `candidate_pin_expiry_date` =?,
            `candidate_phone_country_code` =? ,`candidate_phone_number` =?,
            `candidate_mobile_country_code` =?,`candidate_mobile_phone_number` =?,
            `candidate_employment_type` =?,`candidate_status` =?,`candidate_ni_number`=?,
            `candidate_passport_number`=?,`candidate_issueing_country`=?,
            `candidate_visa_type`=?,`created_date`=NOW() {$where_sql}";
            
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
            $data['candidate_visa_type']) ;
            if($where_sql != "") {
			array_push($params,$data['candidate_id']);
			$common->update($sql, $params);
			}else{
				$common->add($sql, $params);
				
				  $cnd_sql = "SELECT candidate_id,candidate_email FROM candidates order by candidate_id desc limit 1"; 
				  $result  = $common->select($cnd_sql); 
				  if(count($result)>0){
					  $user_mail = $result[0]['candidate_email'] ;
					if($user_mail !=''){
						$user_id   = $result[0]['candidate_id'] ;
						$usrData   = array('user_mail' => $user_mail,'user_id' => $user_id,'user_role'=> 2);
						$result    = $common->InsertUserSecureData($usrData);
					}
				  }	
			}
			echo json_encode(array("status"=>"success"));
			exit;
       }
	   if(count($data)>0 && $action == "delete"){
		if(trim($data['candidate_id']) != ""){
			$sql = "DELETE FROM candidates WHERE candidate_id = ?";
			$common->delete($sql, array($data['candidate_id']));
			return true;
		}
				
       }
	   else{
        $start_limit = ($page-1)*$row_per_page;
        $end_limit   = $row_per_page;
		 $search_condition = " WHERE candidate_activity = ?";
               $params = array(1);
                if($action == "search"){
                    foreach($data as $item => $value){
                        if(trim($value) == "" || $value == null) continue;
                        if(in_array($item, $filters['value']) === false) {
                            $search_condition .= ($search_condition) ? " AND " . $item . " = ? " : $item . " = ? ";
                        } else {
                            $search_condition .= ($search_condition) ? " AND " . $item . " LIKE CONCAT( '%',?,'%')" : $item . " LIKE  CONCAT( '%',?,'%')";
                        }
                        
                        array_push($params,$value);
                    }
                   // $search_condition = ($search_condition) ? . $search_condition : '';
                }
		
		
        $sql = "SELECT * FROM candidates c 
        {$search_condition} 
         LIMIT $start_limit,$end_limit"; 
		 
		 $result  = $common->select($sql,$params); 

        $countSql = "SELECT count(candidate_id) as total FROM candidates {$search_condition} ";
        $totalCntRes  = $common->select($countSql,$params); 
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