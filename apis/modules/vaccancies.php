<?php
include '../autoload/database.php';
$db = new Database();
if($db){
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $data = array();
    try{
        if($request) $data = (array)$request->data;
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
        $sql = "SELECT * FROM `vaccancy`";
        $result  = $db->select($sql); 
        echo json_encode(array('data'=>$result));
    }
}
?>