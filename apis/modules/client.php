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
                    $set = " `client_name` 					=	?,	
							 `client_authorized_person` 	=	?,
							 `client_email` 				=	?,
							 `client_address_line1` 		=	?,
							 `client_address_line2` 		=	?,
							 `client_postal_code` 			=	?,
							 `client_phone_number` 			=	?,
							 `client_mobile_number`			=	?,";

                    $params  =  array(  $data['agency'],
                                $data['authorized_person'],
                                $data['email'],
                                $data['address1'],
                                $data['address2'],
                                $data['post_code'],
                                $data['phone'],
                                $data['mobile']
                    );
                }
                if(trim($data['id']) == ""){
                    $sql = "INSERT INTO `clients` 
                            SET ".$set."
                                `client_created_date` = NOW()";   
                                $common->add($sql, $params); 
                    echo json_encode(array("status"=>"success"));
                }
                if(trim($data['id']) != ""){
                    if($data['action'] == "edit"){
                        array_push($params,$data['id']);
                        $sql = "UPDATE `clients` 
                            SET ".$set."
                                `client_updated_date` = NOW() WHERE client_id = ? AND client_status = 1";   
                                $common->add($sql, $params); 
                        echo json_encode(array("status"=>"success"));

                    }
                    if($data['action'] == "delete"){
                        $sql = "UPDATE `clients` SET client_status = ?, `client_updated_date` = NOW() WHERE client_id = ? AND client_status = ?";
                        $params = array(0,$data['id'],1);
                        $common->add($sql, $params); 
                        echo json_encode(array("status"=>"success"));
                    }

                }
            }
            else{
                $start_limit = ($page-1)*$row_per_page;
                $end_limit   = $row_per_page;
                $sql = "SELECT  * FROM `clients` WHERE `client_status` = 1 LIMIT $start_limit,$end_limit";
                $result  = $common->select($sql);
                $formatted_result = array();
                foreach($result as $each_result){
                    $formatted_result[] = array('id'                    =>  $each_result['client_id'],
                                                'agency'                =>  $each_result['client_name'],
                                                'authorized_person'     =>  $each_result['client_authorized_person'],
                                                'email'                 =>  $each_result['client_email'],
                                                'address1'              =>  $each_result['client_address_line1'],
                                                'address2'              =>  $each_result['client_address_line2'],
												'post_code'             =>  $each_result['client_postal_code'],
                                                'phone'                 =>  $each_result['client_phone_number'],
                                                'mobile'                =>  $each_result['client_mobile_number']
                                        );
                }
                $countSql = "SELECT count(client_id) as total from clients";
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