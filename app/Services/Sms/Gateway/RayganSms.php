<?php

namespace App\Services\Sms\Gateway;

use App\Services\Sms\Abstract\SmsGatewayAbstract;
use App\Services\Sms\Contracts\SmsGateway;

class RayganSms extends SmsGatewayAbstract implements SmsGateway
{

    public function sendSms(string $number, string $text): bool
    {
        return false;
    }

    public function sendSmsByPattern(string $number, string $text): bool
    {
        $curlObject = curl_init();

        curl_setopt($curlObject, CURLOPT_URL, $this->getApiUrl());
        curl_setopt($curlObject, CURLOPT_POST, 1);

        curl_setopt(
            $curlObject,
            CURLOPT_POSTFIELDS,
            http_build_query($this->getDataForsend($number, $code))
        );

        curl_setopt($curlObject, CURLOPT_RETURNTRANSFER, true);
        $result = (int) curl_exec($curlObject);
        curl_close($curlObject);

        if ($result > 2000) {
            return true;
        }

        return false;
    }

    private function getApiUrl()
    {
        return 'https://smspanel.trez.ir/SendPatternCodeWithUrl.ashx';
    }

    private function getDataForsend(&$number, &$code)
    {
        //password use intead of pattern
        $accessToken = '';
        $patternId =  '';

        $dataForSend['token1'] = $code;

        return array_merge(array(
            'AccessHash' => $accessToken,
            'Mobile' => $number,
            'PatternId' => $patternId,
        ), $dataForSend);
    }
}
