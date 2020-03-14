<?php
include './common.class.php';
$common = new Common();
$common->setCORS();
echo json_encode(
    array(
        "email"     =>"kalesh@k.com",
        "userName"  => "kalesh",
        "userId"    => "1",
<<<<<<< HEAD
        "token"     => "zdasfdsa6r5sad674ads6765",
        "angency"   => "carebee"
    ));
=======
        "token"     => "zdasfdsa6r5sad674ads6765"
    )
);
>>>>>>> 8244d449b6048d344d543cbfff38d06120c16c0e
