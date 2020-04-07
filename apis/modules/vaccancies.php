<?php
include './common.class.php';
$common = new Common();

$filters = array('value' => array('vaccancy_id',
            'vaccancy_ref_number',
            'vaccancy_date',
            'vaccancy_break_time',
            'vaccancy_space',
            'vaccancy_location',
            'vaccancy_details'),
    'ref' => array('vaccancy_client',
            'vaccancy_business_unit',
            'vaccancy_shift_type',
            'vaccancy_shift_type',
            'vaccancy_job'));
   
if(file_get_contents("php://input")){
    $request = json_decode(file_get_contents("php://input"));
    try{
        if(isset($request->request_items))
        {
            $params = (array)$request->request_items;
            $result = $common->getListItems($params);
            echo json_encode($result);
            exit;
        }else{
            $data = array();
            $row_per_page = $common->pagination_limit;
            try{
                if($request) 
                {
                    $data = (array)$request->data;
                    $action = isset($request->action) ? $request->action : 'index';
                    $page = $request->page ? $request->page : 1;
                    $row_per_page = $request->row_per_page ? $request->row_per_page : 10;
                }
            }catch(\Exception $e){}           
            if(count($data)>0 && $action == "save_grid"){
                $sql = "INSERT INTO `module_list_preference`
                    (list_user_id, list_module, list_preference_data) 
                    VALUES(?,?,?) ON DUPLICATE KEY UPDATE list_preference_data = ?";
                $params = array('1','vaccancy',$data['list_preference_data'],$data['list_preference_data']);
                $common->update($sql, $params);
            }else if(count($data)>0 && $action == "save"){
                
                $where_sql = "";
                if(trim($data['vaccancy_id']) == ""){
                    $sql = "INSERT INTO ";
                }
                if(trim($data['vaccancy_id']) != ""){
                    $sql = "UPDATE ";
                    $where_sql = " WHERE vaccancy_id = ? ";
                }
                    $sql .= "`vaccancy` SET
                    `vaccancy_ref_number`       = ?, 
                    `vaccancy_date`             = ?, 
                    `vaccancy_client`           = ?, 
                    `vaccancy_business_unit`    = ?, 
                    `vaccancy_shift_type`       = ?, 
                    `vaccancy_job`              = ?, 
                    `vaccancy_break_time`       = ?, 
                    `vaccancy_space`            = ?, 
                    `vaccancy_location`         = ?, 
                    `vaccancy_details`          = ?, 
                    `vaccancy_created_time`     = NOW(), 
                    `vaccancy_updated_time`     = NOW(), 
                    `vaccancy_created_by`       = 1, 
                    `vaccancy_updated_by`       = 1, 
                    `vaccancy_active`           = 1 {$where_sql}";
                    
                    $params = array($data['vaccancy_ref_number'],
                    $data['vaccancy_date'],
                    $data['vaccancy_client'],
                    $data['vaccancy_business_unit'],
                    $data['vaccancy_shift_type'],
                    $data['vaccancy_job'],
                    $data['vaccancy_break_time'],
                    $data['vaccancy_space'],
                    $data['vaccancy_location'],
                    $data['vaccancy_details']);   
                    
                    if($where_sql != "") {
                        array_push($params,$data['vaccancy_id']);
                        $common->update($sql, $params);
                    }else{
                        $common->add($sql, $params);
                    }

                    //echo json_encode(array("status"=>"success"));
            }
            if(count($data)>0 && $action == "delete"){
                
                if(trim($data['vaccancy_id']) != ""){
                    $sql = "DELETE FROM vaccancy WHERE vaccancy_id = ?";
                    $common->delete($sql, array($data['vaccancy_id']));
                    return true;
                }
            }
            else{              
                $start_limit = ($page-1)*$row_per_page;
                $end_limit   = $row_per_page;
                $search_condition = "";
                $params = array();
                if($action == "search"){
                    foreach($data as $item => $value){
                        if(trim($value) == "") continue;
                        if(in_array($item, $filters['value']) === false) {
                            $search_condition .= ($search_condition) ? " AND " . $item . " = ? " : $item . " = ? ";
                        } else {
                            $search_condition .= ($search_condition) ? " AND " . $item . " LIKE CONCAT( '%',?,'%')" : $item . " LIKE  CONCAT( '%',?,'%')";
                        }
                        
                        array_push($params,$value);
                    }
                    $search_condition = ($search_condition) ? " WHERE ". $search_condition : '';
                }
                $sql = "SELECT * FROM `vaccancy` {$search_condition} LIMIT $start_limit,$end_limit";
                //echo $common->getQuery($sql,$params);
                $result  = $common->select($sql,$params); 

                $countSql = "SELECT COUNT(*) AS total FROM `vaccancy` {$search_condition}";
                $totalCntRes  = $common->select($countSql,$params); 
                $totalCnt     = $totalCntRes[0]['total'];
                //$_SESSION['modules']['vaccancy']['list_count'] = $totalCnt;

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