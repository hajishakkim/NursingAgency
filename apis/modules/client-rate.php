<?php
include '../autoload/database.php';
$db = new Database();
if($db){
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
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
        
        if(trim($data['id']) == ""){
            
            $sql = "INSERT INTO `client_rate` 
                    SET `client_rate_client`                = ?,
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
                        `client_rate_public_holiday_night`  = ?,
                        `client_rate_created_date`          = NOW()";    

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
                                $data['public_hodliday_day'],
                                $data['public_hodliday_night']
                        );                   
            $db->add($sql, $params); 
            echo json_encode(array("status"=>"success"));
        }
        if(trim($data['id']) != ""){

            if($data['action'] == "edit"){
            
            }
            if($data['action'] == "delete"){
            
            }

        }
    }
    else{
        $start_limit = ($page-1)*$row_per_page;
        $end_limit   = $row_per_page;
        $sql = "SELECT SQL_CALC_FOUND_ROWS  * FROM `client_rate` LIMIT $start_limit,$end_limit";
        $result  = $db->select($sql);
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
                                        'public_hodliday_day'   =>  $each_result['client_rate_public_holiday_day'],
                                        'public_hodliday_night' =>  $each_result['client_rate_public_holiday_night']
                                );
        }
        $countSql = "SELECT FOUND_ROWS() as total";
        $totalCntRes  = $db->select($countSql); 
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
?>