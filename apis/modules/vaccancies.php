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
        
        if(trim($data['vaccancy_id']) == ""){
            
            $sql = "INSERT INTO `vaccancy` 
            (`vaccancy_ref_number`, 
            `vaccancy_date`, 
            `vaccancy_client`, 
            `vaccancy_business_group`, 
            `vaccancy_shift_type`, 
            `vaccancy_job`, 
            `vaccancy_break_time`, 
            `vaccancy_space`, 
            `vaccancy_location`, 
            `vaccancy_details`, 
            `vaccancy_created_time`, 
            `vaccancy_updated_time`, 
            `vaccancy_created_by`, 
            `vaccancy_updated_by`, 
            `vaccancy_active`) VALUES 
            (?,?,?,?,?,?,?,?,?,?,NOW(),NOW(),1,1,1)";
            //print_r($data);
            $params = array($data['vaccancy_ref_number'],
            $data['vaccancy_date'],
            $data['vaccancy_client'],
            $data['vaccancy_business_group'],
            $data['vaccancy_shift_type'],
            $data['vaccancy_job'],
            $data['vaccancy_break_time'],
            $data['vaccancy_space'],
            $data['vaccancy_location'],
            $data['vaccancy_details']);            
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
        $sql = "SELECT SQL_CALC_FOUND_ROWS  * FROM `vaccancy` LIMIT $start_limit,$end_limit";
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