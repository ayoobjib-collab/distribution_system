<?php

namespace App\Enums;


enum RoutesName: string
{
    case Login = 'login';

    case CreateUser = '/user';
    case CreateTransaction = '/transaction';

    case CreateProduct = '/product';
    case CreateInvoice = '/invoice';

    case CreateAccount = '/account';
}
