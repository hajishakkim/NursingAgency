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
					$action = isset($request->action) ? $request->action : 'index';
                    $page = $request->page ? $request->page : 1;
                    $row_per_page = $request->row_per_page ? $request->row_per_page : 10;
                }
				
				
            }catch(\Exception $e){}
            if(count($data)>0 && $action !="search"){
                if($data['action'] != 'delete'){
                    $set = "`jobs_client`         = ?,
                            `jobs_business_unit`  = ?,
							`jobs_title`          = ?,";

                    $params  =  array(  
								$data['jobs_client'],
                                $data['jobs_business_unit'],
								$data['job_title']
                    );
                }
                if(trim($data['jobs_id']) == ""){
                    $sql = "INSERT INTO `jobs` 
                            SET ".$set."
                                `jobs_created_date` = NOW()";   
                                $common->add($sql, $params); 
                    echo json_encode(array("status"=>"success"));
                }
                if(trim($data['jobs_id']) != ""){
                    if($data['action'] == "edit"){
                        array_push($params,$data['jobs_id']);
                        $sql = "UPDATE `jobs` 
                            SET ".$set."
                                `jobs_updated_date` = NOW() WHERE jobs_id = ? AND jobs_activity = 1";   
                                $common->add($sql, $params); 
                        echo json_encode(array("status"=>"success"));

                    }
                    if($data['action'] == "delete"){
                        $sql = "UPDATE `jobs` SET jobs_activity = ?, `jobs_updated_date` = NOW() WHERE jobs_id = ? AND jobs_activity = ?";
                        $params = array(0,$data['jobs_id'],1);
                        $common->UPDATE($sql, $params); 
                        echo json_encode(array("status"=>"success"));
                    }

                }
            }
            else{
				 $search_condition = " `jobs_activity` = 1";
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
                $start_limit = ($page-1)*$row_per_page;
                $end_limit   = $row_per_page;
                $sql = "SELECT   * FROM `jobs`  {$search_condition} LIMIT $start_limit,$end_limit";
                $result  = $common->select($sql,$params);
                $formatted_result = array();
                foreach($result as $each_result){
                    $formatted_result[] = array('jobs_id'                  =>  $each_result['jobs_id'],
												'jobs_client'		  =>  $each_result['jobs_client'],	
                                                'jobs_business_unit'  =>  $each_result['jobs_business_unit'],
                                                'jobs_title'          =>  $each_result['jobs_title']
												);
                }
                $countSql = "SELECT count(jobs_id) as total FROM `jobs` {$search_condition}";
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