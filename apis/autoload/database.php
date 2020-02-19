<?php
error_reporting(0);
class Database
{

    public $db_host = "localhost";
    public $db_user = "root";
    public $db_pass = "";
    public $db_name = "agency";

    public $mysql_connection = null;

    function __construct()
    {

        $this->mysql_connection = new mysqli($this->db_host, $this->db_user, $this->db_pass, $this->db_name);

        if ($this->mysql_connection->connect_error) {
            die("ERROR: Unable to connect: " . $this->mysql_connection->connect_error);
        }
    }
    public function query($sql, $params = array())
    {
      $stmt = $this->prepareStatement($sql, $params);
      //echo $this->getQuery($sql,$params);
      $stmt->execute();
      return $stmt;
    }
    public function prepareStatement($sql, $params = array())
    {
        $stmt = $this->mysql_connection->prepare($sql);
        $bind_param_type = array();
        $bind_params = '';
        if(!empty($params)){
            foreach($params as $key => $value){
                array_push($bind_param_type,'s');
                $bind_params = preg_replace('/\?/',("'".$params[$key]."'"),$bind_params,1);
            }
            $bind_param_string = ("'".implode("",$bind_param_type)."'");
            //$bind_param_string = implode("",$bind_param_type);
            $bind_params = ("'".implode("','",$bind_param_type)."'");
            //$bind_params = ("'".implode("','",$params)."'");
            echo ' $stmt->bind_param('.$bind_param_string.','.$bind_params.')';
            $stmt->bind_param($bind_param_string,$bind_params);
        }        
        return $stmt;
    }
    function getQuery($sql,$params) {
        for ($i=0; $i<count($params); $i++) {
          $sql = preg_replace('/\?/',("'".$params[$i]."'"),$sql,1);
        }
        return $sql;
    }
    public function select($sql, $params = array())
    {
        $stmt = $this->query($sql,$params);
        return $this->getQueryResult($stmt);
        //$result -> free_result();
    }
    public function getQueryResult($stmt)
    {
        $records = array();
        $result = $stmt->get_result();
        if(mysqli_num_rows($result)>0){
            while($row = mysqli_fetch_assoc($result)){
                array_push($records,$row);
            }
        }
        return $records;
    }
    public function add($sql, $params = array())
    {
        $result = $this->query($sql,$params);
        return true;
    }

}