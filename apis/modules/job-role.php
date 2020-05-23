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
					$action = isset($request->action) ? $request->action : 'index';
                    $data = (array)$request->data;
                    $page = $request->page ? $request->page : 1;
                    $row_per_page = $request->row_per_page ? $request->row_per_page : 10;
                }
				
				
            }catch(\Exception $e){}
            if(count($data)>0 && $action !="search"){
                if($data['action'] != 'delete'){
                    $set = "`job_role_category`         = ?,
                            `job_role_job_role`         = ?,";

                    $params  =  array(  $data['job_role_category'],
                                $data['job_role_job_role'],
                    );
                }
                if(trim($data['job_role_id']) == ""){
                    $sql = "INSERT INTO `job_role` 
                            SET ".$set."
                                `job_role_created_date` = NOW()";   
                                $common->add($sql, $params); 
                    echo json_encode(array("status"=>"success"));
                }
                if(trim($data['job_role_id']) != ""){
                    if($data['action'] == "edit"){
                        array_push($params,$data['job_role_id']);
                        $sql = "UPDATE `job_role` 
                            SET ".$set."
                                `job_role_updated_time` = NOW() WHERE job_role_id = ? AND job_role_activity = 1";   
                                $common->UPDATE($sql, $params); 
                        echo json_encode(array("status"=>"success"));

                    }
                    if($data['action'] == "delete"){
                        $sql = "UPDATE `job_role` SET job_role_activity = ?, `job_role_updated_time` = NOW() WHERE job_role_id = ? AND job_role_activity = ?";
                        $params = array(0,$data['job_role_id'],1);
                        $common->UPDATE($sql, $params); 
                        echo json_encode(array("status"=>"success"));
                    }

                }
            }
            else{
                $start_limit = ($page-1)*$row_per_page;
                $end_limit   = $row_per_page;
				 $search_condition = " `job_role_activity` = 1";
                  $params = array();
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
					
                $sql = "SELECT   * FROM `job_role` {$search_condition} LIMIT $start_limit,$end_limit";
                $result  = $common->select($sql,$params);
                $formatted_result = array();
                foreach($result as $each_result){
                    $formatted_result[] = array('job_role_id'               =>  $each_result['job_role_id'],
                                                'job_role_category'         =>  $each_result['job_role_category'],
                                                'job_role_job_role'         =>  $each_result['job_role_job_role']
												);
                }
                $countSql = "SELECT count(job_role_id) as total FROM `job_role` {$search_condition} ";
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