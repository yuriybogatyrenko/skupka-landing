<?php
if(isset($_POST['phone'])) {

    $phone = "Телефон:\r\n" . $_POST['phone'] . "\r\n\r\n";

    $message = ''; //message body

    $message .= $phone;

    if(isset($_POST['text'])) {
        $text = "Текст:\r\n" .  $_POST['text'] . "\r\n\r\n";

        $message .= $text;
    }

    $from_email = 'request@skupkanoutbukov.ru'; //sender email
    // $recipient_email = 'yurabogatyrenko@gmail.com'; //recipient email
    $recipient_email = 'stanislavrylsk@gmail.com'; //recipient email
    $subject = $_POST['name']; //subject of email


    $boundary = md5("sanwebe");


//header
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "From:".$from_email."\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary = $boundary\r\n\r\n";

//plain text
    $body = "--$boundary\r\n";
    $body .= "Content-Type: text/plain; charset=utf-8\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $body .= chunk_split(base64_encode($message));


    $sentMail = @mail($recipient_email, $subject, $body, $headers);

    if($sentMail) {
        header('Location: /thanks.html');
    }else{
        die('Could not send mail! Please check your PHP mail configuration.');
    }
}