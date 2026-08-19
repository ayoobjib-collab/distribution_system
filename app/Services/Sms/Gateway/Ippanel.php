<?php

namespace App\Services\Sms\Gateway;

use App\Services\Sms\Abstract\SmsGatewayAbstract;
use App\Services\Sms\Contracts\SmsGateway;

class Ippanel extends SmsGatewayAbstract implements SmsGateway
{
    public string $periodTime;

    private string $sender = '3000505';
    private string $url = "https://ippanel.com/services.jspd";

    public function sendSms(string $number, string $text): bool
    {
        $this->periodTime = time();

        $to[] = $number;

        $param = array(

            'uname' => $this->userName,
            'pass' => $this->password,

            'from' => $this->sender,
            'message' => $text,
            'to' => json_encode($to),
            'time' => $this->periodTime,
            'op' => 'send'
        );

        $handler = curl_init($this->url);

        curl_setopt($handler, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($handler, CURLOPT_POSTFIELDS, $param);
        curl_setopt($handler, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($handler);

        $response = json_decode($response);

        # Curl close
        $handler = null;

        $res_code = $response[0] ?? 'res code not set';

        if ($res_code == 0)
            return true;


        return false;
    }

    public function sendSmsByPattern(string $number, string $text): bool
    {
        return false;
    }
}
