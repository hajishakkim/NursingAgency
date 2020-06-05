<?php
include './common.class.php';
$common = new Common();
$staff  = new Staff();
if(file_get_contents("php://input")){
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata);
    $data     = (array)$request;
    try{
       if(isset($request->request_items))
        {
			 $params = (array)$request->request_items;
            $result = $common->getListItems($params);
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
					$action = isset($request->action) ? $request->action : 'index';
                    $page = $request->page ? $request->page : 1;
                    $row_per_page = $request->row_per_page ? $request->row_per_page : 10;
                }
            }catch(\Exception $e){}
			if(count($data)>0 && $action !="search"){
				if($data['action'] != 'delete'){
					$set = "    `staff_ref_id` = ?, 
								`staff_client_id` = ?,
								`staff_doj` = ?,
								`staff_shift_type` = ?,
								`staff_business_unit_id` = ?,
								`staff_space` = ?,
								`staff_location` = ?,
								`staff_details` = ?,
								`staff_created_date` = NOW(),
								`staff_activity` = ?";

					$params  =  array(  $data['staff_ref_id'],
										$data['staff_client_id'],
										$data['staff_doj'],
										$data['staff_shift_type'],
										$data['staff_business_unit_id'],
										$data['staff_space'],
										$data['staff_location'],
										$data['staff_details'],
										1
										
					);
				}
				if(trim($data['staff_id']) == ""){
					
					if($data['staff_username'] && $data['staff_password']){
						$saltStr = $staff->saltGenarator();
						$encryptedPassword = $staff->encryptPassword($data['staff_password'],$saltStr);
						$set    .= ", staff_user_name = ?, staff_password = ?, staff_salt = ?";
						array_push($params, $data['staff_username'], $encryptedPassword, $saltStr);
					}
					
					$sql = "INSERT INTO `staffs` 
							SET ".$set;
							$common->add($sql, $params); 
					echo json_encode(array("status"=>"success"));
				}
				if(trim($data['staff_id']) != ""){

					if($data['action'] == "edit"){
						array_push($params,$data['staff_id']);
						$sql = "UPDATE `staffs` 
							SET ".$set."
								,`staff_updated_date` = NOW() WHERE staff_id = ? ";  
						$common->UPDATE($sql, $params); 
						echo json_encode(array("status"=>"success"));

					}
					if($action == "delete"){
						$sql = "UPDATE `staffs` SET staff_activity = ?, `staff_updated_date` = NOW() WHERE staff_id = ? ";
						$params = array(0,$data['staff_id']);
						$common->UPDATE($sql, $params); 
						echo json_encode(array("status"=>"success"));
					}

				}
			}
			else{
				$start_limit = ($page-1)*$row_per_page;
				$end_limit   = $row_per_page;
				$search_condition = " `staff_activity` = 1";
                  $params = array();
                    foreach($data as $item => $value){
                        if(trim($value) == "") continue;
                        if(in_array($item, $filters['value']) === false) {
                            $search_condition .= ($search_condition) ? " AND " .$item . " = ? " : $item . " = ? ";
                        } else {
                            $search_condition .= ($search_condition) ? " AND " . $item . " LIKE CONCAT( '%',?,'%')" : $item . " LIKE  CONCAT( '%',?,'%')";
                        }
                        
                        array_push($params,$value);
                    }
                    $search_condition = ($search_condition) ? " WHERE ". $search_condition : '';
				$sql = "SELECT * FROM `staffs` {$search_condition} LIMIT $start_limit,$end_limit";
				$result  = $common->select($sql,$params);
				$formatted_result = array();
				foreach($result as $each_result){
					$formatted_result[] = $each_result ;
				}
				$countSql = "SELECT count(staff_id) as total FROM `staffs` {$search_condition}";
				$totalCntRes  = $common->select($countSql,$params); 
				$totalCnt     = $totalCntRes[0]['total'];  
				$totalPages   = $totalCnt%$row_per_page==0 ?  $totalCnt/$row_per_page : ($totalCnt/$row_per_page)+1;
				$totalPagesArr = array();
				for($i=1;$i<=$totalPages;$i++){
					array_push($totalPagesArr,$i);    
				}
				$totalPagesArrEncoded = json_encode($totalPagesArr);
				echo json_encode(array('data'=>$formatted_result,'totalCnt'=>$totalCnt ,'totalPagesArr' => $totalPagesArr));
			}
        }
    }catch(\Exception $e){echo $e;}
}

class Staff
{
	/**
	*saltGenarator
	*/
	public function saltGenarator(){
		$charString = "1234567890abcdefghijklmnopqrstuvwxyz";
		$totLength  = 35;
		$sltLength  = 21;
		$sltStr     = "";
		for($i = 0; $i < $sltLength; $i++){
			$sltStr .=  $charString[mt_rand(0,$totLength)];
		}
		$algo       = '6';
		$rounds     = '5042';
		$cryptSalt  = '$'.$algo.'$rounds='.$rounds.'$'.$sltStr;
		return $cryptSalt;
	}
	
	/**
	*encryptPassword
	*/
	public function encryptPassword($password = '', $salt = ''){
		$sha1Password   = sha1($password);
		$encryptPssword = crypt($sha1Password,$salt);
		return $encryptPssword;
	}
}
?>
