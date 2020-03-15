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
                    $set = "`jobs_client`         = ?,
                            `jobs_business_unit`  = ?,
							`jobs_title`          = ?,";

                    $params  =  array(  
								$data['client'],
                                $data['business_unit'],
								$data['job_title']
                    );
                }
                if(trim($data['id']) == ""){
                    $sql = "INSERT INTO `jobs` 
                            SET ".$set."
                                `jobs_created_date` = NOW()";   
                                $common->add($sql, $params); 
                    echo json_encode(array("status"=>"success"));
                }
                if(trim($data['id']) != ""){
                    if($data['action'] == "edit"){
                        array_push($params,$data['id']);
                        $sql = "UPDATE `jobs` 
                            SET ".$set."
                                `jobs_updated_date` = NOW() WHERE jobs_id = ? AND jobs_activity = 1";   
                                $common->add($sql, $params); 
                        echo json_encode(array("status"=>"success"));

                    }
                    if($data['action'] == "delete"){
                        $sql = "UPDATE `jobs` SET jobs_activity = ?, `jobs_updated_date` = NOW() WHERE jobs_id = ? AND jobs_activity = ?";
                        $params = array(0,$data['id'],1);
                        $common->add($sql, $params); 
                        echo json_encode(array("status"=>"success"));
                    }

                }
            }
            else{
                $start_limit = ($page-1)*$row_per_page;
                $end_limit   = $row_per_page;
                $sql = "SELECT SQL_CALC_FOUND_ROWS  * FROM `jobs` WHERE `jobs_activity` = 1 LIMIT $start_limit,$end_limit";
                $result  = $common->select($sql);
                $formatted_result = array();
                foreach($result as $each_result){
                    $formatted_result[] = array('id'                  =>  $each_result['jobs_id'],
												'client'		  =>  $each_result['jobs_client'],	
                                                'business_unit'  =>  $each_result['jobs_business_unit'],
                                                'job_title'          =>  $each_result['jobs_title']
												);
                }
                $countSql = "SELECT count(jobs_id) as total FROM `jobs` WHERE `jobs_activity` = 1 ";
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