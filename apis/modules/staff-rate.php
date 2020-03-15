<?php
include './common.class.php';
$common = new Common();
if(file_get_contents("php://input")){
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata);
    $data     = (array)$request;
    try{
        if(isset($data['request_items']))
        {
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
            }catch(\Exception $e){}
			if(count($data)>0){
				if($data['action'] != 'delete'){
					$set = "`staff_rate_client`                = ?,
							`staff_rate_business_unit`         = ?,
							`staff_rate_job`                   = ?,
							`staff_rate_employee_type`         = ?,
							`staff_rate_week_days`             = ?,
							`staff_rate_night_time`            = ?,
							`staff_rate_friday_night`          = ?,
							`staff_rate_saturday_day`          = ?,
							`staff_rate_saturday_night`        = ?,
							`staff_rate_sunday_day`            = ?,
							`staff_rate_sunday_night`          = ?,
							`staff_rate_public_holiday_day`    = ?,
							`staff_rate_public_holiday_night`  = ?,";

					$params  =  array(  $data['client'],
										$data['business_unit'],
										$data['job'],
										$data['employee_type'],
										$data['week_days'],
										$data['night_time'],
										$data['friday_night'],
										$data['saturday_day'],
										$data['saturday_night'],
										$data['sunday_day'],
										$data['sunday_night'],
										$data['public_hodliday_day'],
										$data['public_hodliday_night']
					);
				}
				if(trim($data['id']) == ""){
					
					$sql = "INSERT INTO `staff_rate` 
							SET ".$set."
								`staff_rate_created_date`          = NOW()";    

									 
					$common->add($sql, $params); 
					echo json_encode(array("status"=>"success"));
				}
				if(trim($data['id']) != ""){

					if($data['action'] == "edit"){
						array_push($params,$data['id']);
						$sql = "UPDATE `staff_rate` 
							SET ".$set."
								`staff_rate_updated_time` = NOW() WHERE staff_rate_id = ? AND staff_rate_activity = 1";   
						$common->add($sql, $params); 
						echo json_encode(array("status"=>"success"));

					}
					if($data['action'] == "delete"){
						$sql = "UPDATE `staff_rate` SET staff_rate_activity = ?, `staff_rate_updated_time` = NOW() WHERE staff_rate_id = ? AND staff_rate_activity = ?";
						$params = array(0,$data['id'],1);
						$common->add($sql, $params); 
						echo json_encode(array("status"=>"success"));
					}

				}
			}
			else{
				$start_limit = ($page-1)*$row_per_page;
				$end_limit   = $row_per_page;
				$sql = "SELECT * FROM `staff_rate` WHERE `staff_rate_activity` = 1 LIMIT $start_limit,$end_limit";
				$result  = $common->select($sql);
				$formatted_result = array();
				foreach($result as $each_result){
					$formatted_result[] = array('id'                    =>  $each_result['staff_rate_id'],
												'client'                =>  $each_result['staff_rate_client'],
												'business_unit'         =>  $each_result['staff_rate_business_unit'],
												'job'                   =>  $each_result['staff_rate_job'],
												'employee_type'         =>  $each_result['staff_rate_employee_type'],
												'week_days'             =>  $each_result['staff_rate_week_days'],
												'night_time'            =>  $each_result['staff_rate_night_time'],
												'friday_night'          =>  $each_result['staff_rate_friday_night'],
												'saturday_day'          =>  $each_result['staff_rate_saturday_day'],
												'saturday_night'        =>  $each_result['staff_rate_saturday_night'],
												'sunday_day'            =>  $each_result['staff_rate_sunday_day'],
												'sunday_night'          =>  $each_result['staff_rate_sunday_night'],
												'public_hodliday_day'   =>  $each_result['staff_rate_public_holiday_day'],
												'public_hodliday_night' =>  $each_result['staff_rate_public_holiday_night']
										);
				}
				$countSql = "SELECT count(staff_rate_id) as total FROM `staff_rate` WHERE `staff_rate_activity` = 1";
				$totalCntRes  = $common->select($countSql); 
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
?>