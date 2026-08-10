<?php

namespace App\Services\Sms;

use App\Services\Sms\Abstract\SmsGatewayAbstract;

class SmsManager
{
    protected SmsGatewayAbstract $gateway;

    public function __construct()
    {
        $defaultGateway = config('sms.dafault_gateway');
        $defaultGateway = config("sms.gateways.$defaultGateway");

        $class = $defaultGateway['class'];
        $this->gateway = new $class();
    }

    /**
     * Call any method of sms class by __call
     */
    public function __call($method, $arguments)
    {
        if (method_exists($this->gateway, $method))
            return $this->gateway->$method(...$arguments);

        throw new \BadMethodCallException("Method {$method} does not exist on Gateway");
    }

    public function logSms(){

    }
}
