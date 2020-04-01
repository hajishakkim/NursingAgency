<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$mail = new PHPMailer(true);
	public   $sendto   = '';
	public   $subject  = '';
	public   $content  = '';

class email
{
	function sendMail(){
		$mail = new PHPMailer();
		$subject = $this->subject;
		$content = $this->content;
		$mail->isSMTP();
		$mail->SMTPDebug = 4;
		$mail->SMTPAuth = true;
		$mail->SMTPSecure = 'tls';
		$mail->Host = 'smtp.gmail.com';
		$mail->Port = 587;
		$mail->Username = "hajishakkim47@gmail.com";
		$mail->Password = "12345hajis";
		$mail->Mailer   = "smtp";
		$mail->setFrom('hajishakkim47@gmail.com', 'Mailer');
		$mail->addAddress($this->sendto);     // Add a recipient
		//$mail->addAddress('shyjukpkumarakom@gmail.com');       
		$mail->Subject = $subject;
		$mail->WordWrap   = 80;
		$mail->MsgHTML($content);
		$mail->isHTML(true);
		if(!$mail->Send()) 
			echo $mail->ErrorInfo;
		else 
		echo "Mail sent";
	}
}


?>