<?php

namespace App\Services\Sms\Abstract;

abstract class SmsGatewayAbstract
{
    protected $userName;
    protected $password;
    protected $pattern = '';
    protected $patternValueName;

    /**
     * Set Pattern
     */
    public function setPattern($pattern)
    {
        $this->pattern = $pattern;
        return $this;
    }

    /**
     * Set Pattern value name
     */
    public function setPatterValueName($patternValueName)
    {
        $this->patternValueName = $patternValueName;
        return $this;
    }
}
