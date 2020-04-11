<?php
include './common.class.php';
$common = new Common();
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
                    $page = $request->page ? $request->page : 1;
					$action = isset($request->action) ? $request->action : 'index';
                    $row_per_page = $request->row_per_page ? $request->row_per_page : 10;
                }
            }catch(\Exception $e){}
            if(count($data)>0 && $action!="search"){
                if($data['action'] != 'delete'){
                    $set = "`client_rate_client`                = ?,
                            `client_rate_business_unit`         = ?,
                            `client_rate_job`                   = ?,
                            `client_rate_week_days`             = ?,
                            `client_rate_night_time`            = ?,
                            `client_rate_friday_night`          = ?,
                            `client_rate_saturday_day`          = ?,
                            `client_rate_saturday_night`        = ?,
                            `client_rate_sunday_day`            = ?,
                            `client_rate_sunday_night`          = ?,
                            `client_rate_public_holiday_day`    = ?,
                            `client_rate_public_holiday_night`  = ?,";

                    $params  =  array(  $data['client'],
                                $data['business_unit'],
                                $data['job'],
                                $data['week_days'],
                                $data['night_time'],
                                $data['friday_night'],
                                $data['saturday_day'],
                                $data['saturday_night'],
                                $data['sunday_day'],
                                $data['sunday_night'],
                                $data['public_holiday_day'],
                                $data['public_holiday_night']
                    );
                }
                if(trim($data['id']) == ""){
                    $sql = "INSERT INTO `client_rate` 
                            SET ".$set."
                                `client_rate_created_date` = NOW()";   
                                $common->add($sql, $params); 
                    echo json_encode(array("status"=>"success"));
                }
                if(trim($data['id']) != ""){
                    if($data['action'] == "edit"){
                        array_push($params,$data['id']);
                        $sql = "UPDATE `client_rate` 
                            SET ".$set."
                                `client_rate_updated_time` = NOW() WHERE client_rate_id = ? AND client_rate_activity = 1";   
                                $common->add($sql, $params); 
                        echo json_encode(array("status"=>"success"));

                    }
                    if($action == "delete"){
						
                        $sql = "UPDATE `client_rate` SET client_rate_activity = ?, `client_rate_updated_time` = NOW() WHERE client_rate_id = ? AND client_rate_activity = ?";
                        $params = array(0,$data['id'],1);
                        $common->update($sql, $params); 
                        echo json_encode(array("status"=>"success"));
                    }

                }
            }
            else{
                $start_limit = ($page-1)*$row_per_page;
                $end_limit   = $row_per_page;
				$search_condition =" WHERE `client_rate_activity` = 1 ";
				$params = array();
                if($action == "search"){
                    foreach($data as $item => $value){
						$item = "client_rate_".$item;
                        if(trim($value) == "") continue;
                        if(in_array($item, $filters['value']) === false) {
                            $search_condition .= ($search_condition) ? " AND " . $item . " = ? " : $item . " = ? ";
                        } else {
                            $search_condition .= ($search_condition) ? " AND " . $item . " LIKE CONCAT( '%',?,'%')" : $item . " LIKE  CONCAT( '%',?,'%')";
                        }
                        
                        array_push($params,$value);
                    }
                    $search_condition = ($search_condition) ?  $search_condition : '';
                }
                $sql = "SELECT  * FROM `client_rate` {$search_condition}  LIMIT $start_limit,$end_limit";
                $result  = $common->select($sql,$params);
                $formatted_result = array();
                foreach($result as $each_result){
                    $formatted_result[] = array('id'                    =>  $each_result['client_rate_id'],
                                                'client'                =>  $each_result['client_rate_client'],
                                                'business_unit'         =>  $each_result['client_rate_business_unit'],
                                                'job'                   =>  $each_result['client_rate_job'],
                                                'week_days'             =>  $each_result['client_rate_week_days'],
                                                'night_time'            =>  $each_result['client_rate_night_time'],
                                                'friday_night'          =>  $each_result['client_rate_friday_night'],
                                                'saturday_day'          =>  $each_result['client_rate_saturday_day'],
                                                'saturday_night'        =>  $each_result['client_rate_saturday_night'],
                                                'sunday_day'            =>  $each_result['client_rate_sunday_day'],
                                                'sunday_night'          =>  $each_result['client_rate_sunday_night'],
                                                'public_holiday_day'   =>  $each_result['client_rate_public_holiday_day'],
                                                'public_holiday_night' =>  $each_result['client_rate_public_holiday_night']
                                        );
                }
                $countSql = "SELECT count(client_rate_id) as total FROM `client_rate` {$search_condition}";
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
?>