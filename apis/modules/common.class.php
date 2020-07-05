<?php
include '../autoload/database.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../services/PHPMailer/src/Exception.php';
require '../services/PHPMailer/src/PHPMailer.php';
require '../services/PHPMailer/src/SMTP.php';

require_once "../services/vendor/autoload.php";

class Common extends Database
{
    public $mysql_connection = null;
    public $pagination_limit = 25;
    public $module_list_items = array(
        'client' => array('table'=>'clients','list_item'=>array('id'=>'client_id','label'=>'client_name')),
        'jobs' => array('table'=>'jobs','list_item'=>array('id'=>'jobs_id','label'=>'jobs_title')),
        'business_unit' => array('table'=>'business_unit','list_item'=>array('id'=>'business_unit_id','label'=>'business_unit_name')),
		'candidates'    => array('table'=>'candidates','list_item'=>array('id'=>'candidate_id','label'=>'candidate_fname')),
        'countries' => array('table'=>'countries','list_item'=>array('id'=>'country_id','label'=>'country_name')),
    );
    function __construct()
    {
        //$this->mysql_connection = super::mysql_connection;
        self::setCORS();	
        session_start();

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
	public function InsertUserSecureData($data=array()){
					$randompassword = "";
					$pw_str = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz';
					$randompassword = substr(str_shuffle($pw_str), 0, 7); 
					$user_id   = $data['user_id'];
					$user_mail = $data['user_mail'];
					$user_role = $data['user_role'];
					$userData = array('user_name'=>$user_mail,'pwd' => $randompassword,'name'=>$data['user_name']);
					self::sendMail($userData);
					$user_sql = "INSERT INTO users_secure SET user_id = ? ,user_name = ?,user_password =?,user_role=?";
					$this->add($user_sql,array($user_id,$user_mail,$randompassword,$user_role));
					
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
	public function sendMail($userData=array()){
		
		if($userData['user_name']!=''){
		$mail = new PHPMailer(true);
		try {
			//Server settings
			$mail->SMTPDebug = 0;   
			$mail->isSMTP();   
			$mail->SMTPOptions = array(
			'ssl' => array(
				'verify_peer' => false,
				'verify_peer_name' => false,
				'allow_self_signed' => true
			)
			);	
			$mail->Host = 'smtp.gmail.com'; // Set the SMTP server to send through
			$mail->SMTPAuth   = true;       // Enable SMTP authentication
			$mail->Username   = 'ajeeshxp@gmail.com';   // SMTP username
			$mail->Password   = 'ajeeshXp@11121990';     // SMTP password
			$mail->SMTPSecure = 'tls';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
			$mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
	
		   //Recipients
			$mail->setFrom('ajeeshxp@gmail.com', 'Care bee Services');
			$mail->addAddress($userData['user_name'], '');     // Add a recipient
		  //  $mail->addAddress('');               // Name is optional
		  //  $mail->addReplyTo('', 'Information');
		  //  $mail->addCC('');
		  //  $mail->addBCC('');

			// Attachments
		  //  $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
		   // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

		// Content
		$mail->isHTML(true);                                  // Set email format to HTML
		$mail->Subject = 'Care Bee Registration';
		$email_body =  file_get_contents('../templates/email_templ1.php');
		$email_body = str_replace("CANDIDATE_NAME", $userData["name"], $email_body);
		$email_body = str_replace("{{user_username}}", $userData["user_name"], $email_body);
		$email_body = str_replace("{{user_pwd}}",$userData['pwd'], $email_body);
	//	$mail->Body    = 'Hi <b>'.$userData["name"].'</b> This is your login credentials.
		//<br> Username:'.$userData["user_name"].'<br>Password:'.$userData['pwd'].'<br> Good Luck';
		$mail->Body    = $email_body;
		$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
	if(!$mail->send()) {
		echo 'Message could not be sent.';
		echo 'Mailer Error: ' . $mail->ErrorInfo;
	} 
	} catch (Exception $e) {
		echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
	}
		
	}
	}
}
?>