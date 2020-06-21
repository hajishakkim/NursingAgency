<?php
include '../autoload/database.php';
class Common extends Database
{
    public $mysql_connection = null;
    public $pagination_limit = 25;
    public $module_list_items = array(
        'client' => array('table'=>'clients','list_item'=>array('id'=>'client_id','label'=>'client_name')),
        'jobs' => array('table'=>'jobs','list_item'=>array('id'=>'jobs_id','label'=>'jobs_title')),
        'business_unit' => array('table'=>'business_unit','list_item'=>array('id'=>'business_unit_id','label'=>'business_unit_name')),
        'countries' => array('table'=>'countries','list_item'=>array('id'=>'country_id','label'=>'country_name')),
        'candidates' => array('table'=>'candidates','list_item'=>array('id'=>'candidate_id','label'=>'candidate_fname')),
    );
    function __construct()
    {
        //$this->mysql_connection = super::mysql_connection;
        self::setCORS();
        session_start();
        parent::__construct();

    }
    public function getListItems($data)
    {
        $list_response = array('list_items'=>array(),'modules'=>array(),'lists'=>array());
        if(isset($data['list_items'])){
            
            $binding_string = "";
            $binding_params = array();
            foreach($data['list_items'] as $key=>$item){
                $binding_string .= ($binding_string != "") ? ',?' : '?';
                array_push($binding_params,$item);
            }
            $list_items_sql = "SELECT 
                                list_items.list_item_id, lists.list_type, list_items.list_item_title
                               FROM list_items JOIN lists ON lists.list_id = list_items.list_item_list_id 
                               WHERE lists.list_type IN({$binding_string})";
            $list_items = $this->select($list_items_sql,$binding_params);
            if(!empty($list_items)){
                foreach($list_items as $key=>$item){
                    if(!$list_response['list_items'][$item['list_type']]) $list_response['list_items'][$item['list_type']] = array();
                    array_push($list_response['list_items'][$item['list_type']],$item);
                }
            }

        } 
        if(isset($data['modules'])){
            $list_sql = "";
            foreach($data['modules'] as $key=>$module){

                $list_module = $this->module_list_items[$module];
                if($list_sql != "") $list_sql.= " UNION ";
                $list_sql .= "SELECT 
                             '{$module}' as module,
                             {$list_module['list_item']['id']} AS id,
                             {$list_module['list_item']['label']} AS label                             
                            FROM {$list_module['table']}";
                
            }
             
            if($list_sql){    
                $list_items = $this->select($list_sql);
                
                if(!empty($list_items)){                
                    foreach($list_items as $key=>$item){
                        $module = $item['module'];
                        if(!$list_response['modules'][$module]) $list_response['modules'][$module] = array();
                        array_push($list_response['modules'][$module],$item);
                    }
                }

            }  

        }
        if(isset($data['workbench'])){
            $list_sql = "SELECT * FROM `module_list_preference` 
                    WHERE list_module = ? 
                    AND list_user_id = ?";
            $binding_params = array($data['workbench'],1);                        
            if($list_sql){            
                $list_items = $this->select($list_sql, $binding_params);
                $list_response['workbench'] = $list_items[0];
            }              
        }
        return $list_response;
    }
    public function setCORS()
    {
       // Allow from any origin
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Max-Age: 86400');    // cache for 1 day
        }

        // Access-Control headers are received during OPTIONS requests
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

            exit(0);
        }
    }
}
?>