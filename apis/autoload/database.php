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
      $stmt->execute();
      return $stmt;
    }
    public function prepareStatement($sql, $params = array())
    {
        $stmt = $this->mysql_connection->prepare($sql);
        if(!empty($params)){
            $bind_param_type = '';
            foreach ($params as $key => $index){
                $bind_param_type .= 's';
            }
            call_user_func_array(array($stmt, "bind_param"), array_merge(array($bind_param_type), array_map( function( &$item ) { return $item; }, $params ) ));
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