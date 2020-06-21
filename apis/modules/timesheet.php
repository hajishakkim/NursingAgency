<?php
ini_set( 'error_reporting', E_ALL );
ini_set( 'display_errors', true );

include './common.class.php';
include './model/TimesheetModel.php';
  
$method     = $_SERVER['REQUEST_METHOD'];

if(file_get_contents("php://input")){
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata, 1);
}else{
    $getList    = explode("/", substr(@$_SERVER['PATH_INFO'], 1))[0];
    $request    = $_GET;
}
 
switch ($method) {
    case 'PUT':
        update($request);  
        break;
    case 'POST':
        create($request);  
        break;
    case 'GET':
        get($getList, $request);  
        break;
    default:
        handle_error($request);  
        break;
}

function create($request = array())
{
    
    $common = new Common();
    $startTime  = str_replace("T"," ", $request['startTime']);
    $endTime    = str_replace("T"," ", $request['endTime']);
    $comment    = $request['comment'] ? $request['comment'] : "";
    $data       = array(
        $request['eventTitle'],
        $startTime,
        $endTime,
        $request['client'],
        $request['candidate'],
        $comment
    );

    $sql = "INSERT INTO events
            SET 
            event_title = ? , 
            start_time = ? , 
            end_time = ? , 
            client_id = ? , 
            candidate_id = ? , 
            comments = ?";
            
    $result = $common->add($sql, $data);

    echo json_encode($result);
} 

function update($request = array())
{
    
    $common = new Common();
    $startTime  = str_replace("T"," ", $request['startTime']);
    $endTime    = str_replace("T"," ", $request['endTime']);
    $comment    = $request['comment'] ? $request['comment'] : "";
    $data       = array(
        $request['eventTitle'],
        $startTime,
        $endTime,
        $request['client'],
        $request['candidate'],
        $comment,
        $request['id'],
    );

    $sql = "UPDATE 
        events SET 
            event_title = ? , 
            start_time = ? , 
            end_time = ? , 
            client_id = ? , 
            candidate_id = ? , 
            comments = ?
            WHERE id = ?";

    $result = $common->update($sql, $data);

    echo json_encode($result);
}

function get($getList = "events", $request = array())
{
    $common = new Common();
    $timesheetModel = new TimesheetModel();
    $result = array();
    
    try{
        switch($getList){
            case "events" : 
                $start      =  str_replace("T"," ", $request['to']);
                $end        =  str_replace("T"," ", $request['from']);
                $viewType   =  isset($request['viewType']) ? $request['viewType'] : "";
                $sql        = "SELECT * FROM events WHERE start_time <= ? OR end_time >= ?";
                $data       = $common->select($sql, array($start, $end));
                $result     = $timesheetModel->processEvents($data, $viewType);
            break;
            case "resource" : 
                $viewType = isset($request['viewType']) ? $request['viewType'] : "";         
                $data = $common->getListItems(
                    array("modules" => array("client", "candidates"))
                );  
                
                $result = $timesheetModel->processResources($data, $viewType);
            break;
        }
    }catch(\Exception $e){
        file_put_contents("/var/log/test1.txt", print_r($e->getMessage,1)); 
    }  
    
    echo json_encode($result);
} 
