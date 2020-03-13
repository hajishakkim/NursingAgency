<?php
include './common.class.php';
$common = new Common();
if(file_get_contents("php://input")){
$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $data = (array)$request;
    try{
        if(isset($data['request_items']))
        {
            $data = (array)$request->request_items;
            $result = $common->getListItems($data);
            echo json_encode($result);
            exit;
        }else{$data = array();
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
                    $common->add($sql, $params); 
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
                $sql = "SELECT * FROM `vaccancy` LIMIT $start_limit,$end_limit";
                $result  = $common->select($sql); 
                if($start_limit == '0'){
                    $countSql = "SELECT COUNT(*) AS total FROM `vaccancy`";
                    $totalCntRes  = $common->select($countSql); 
                    $totalCnt     = $totalCntRes[0]['total'];
                    $_SESSION['modules']['vaccancy']['list_count'] = $totalCnt;
                }else{
                    $totalCnt = $_SESSION['modules']['vaccancy']['list_count'];
                }
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