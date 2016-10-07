<?php
include_once '../vendor/autoload.php';
use \Firebase\JWT\JWT;

$DatosDePost = file_get_contents('php://input');
$usuario = json_decode($DatosDePost);

if($usuario->correo == 'usuario' && $usuario->clave == 'clave')
{
	$key = "1234";
	$token["username"]="unUsuario";
	$token["TipoUsuario"]="admin";
	$token["iat"]=time();
	$token["exp"]=time()+20;
	
	
	$jwt = JWT::encode($token, $key);

	$array["MiTokendePHP"] = $jwt;

}
else
{
	$array["MiTokendePHP"] = false;
}

echo json_encode($array);

?>