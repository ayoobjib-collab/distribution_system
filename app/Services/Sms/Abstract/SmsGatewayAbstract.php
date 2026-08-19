<?php

namespace App\Services\Sms\Abstract;

abstract class SmsGatewayAbstract
{
    protected string $userName;
    protected string $password;
    protected string $pattern = '';
    protected string $patternValueName;

    public function __construct(string $userName, string $password)
    {
        $this->userName = $userName;
        $this->password = $password;
    }

    /**
     * Set Pattern
     */
    public function setPattern(string $pattern)
    {
        $this->pattern = $pattern;
        return $this;
    }

    /**
     * Set Pattern value name
     */
    public function setPatterValueName(string $patternValueName)
    {
        $this->patternValueName = $patternValueName;
        return $this;
    }
}
