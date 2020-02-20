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
        
        if(trim($data['job_id']) == ""){
            
            $sql = "INSERT INTO `jobs` 
            (`job_id`, 
            `job_title`, 
            `job_client_id`, 
            `job_business_unit_id`, 
            `created_date`, 
            `job_status`) VALUES 
            (?,?,?,?,NOW(),1)";
            //print_r($data);
            $params = array($data['job_id'],
            $data['job_title'],
            $data['job_client_id'],
            $data['job_business_unit_id']);            
            $db->add($sql, $params); 
            echo json_encode(array("status"=>"success"));
        }
        if(trim($data['job_id']) != ""){

            if($data['action'] == "edit"){
                $sql = "UPDATE `jobs` 
               SET  `job_title`=?, 
                `job_client_id` = ?, 
                `job_business_unit_id` =? WHERE `job_id` = ? ";
                //print_r($data);
                $params = array(
                $data['job_title'],
                $data['job_client_id'],
                $data['job_business_unit_id'],$data['job_id']);            
                $db->add($sql, $params); 
                echo json_encode(array("status"=>"updates"));
            
            }
            if($data['action'] == "delete"){
                $sql = "DELETE FROM `jobs`  WHERE `job_id` = ? ";
                 //print_r($data);
                 $params = array($data['job_id']);            
                 $db->add($sql, $params); 
                 echo json_encode(array("status"=>"Deleted"));
            }

        }
    }
    else{
        $sql = "SELECT * FROM `jobs`";
        $result  = $db->select($sql); 
        echo json_encode(array('data'=>$result));
    }
}
?>