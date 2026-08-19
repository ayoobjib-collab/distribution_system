<?php

namespace App\Support;

use Hashids\Hashids;

class InvoiceHash
{
    private Hashids $hashids;

    public function __construct()
    {
        $this->hashids = new Hashids(
            config('app.key'),
            10
        );
    }

    public function encode(int $id): string
    {
        return $this->hashids->encode($id);
    }

    public function decode(string $hash): ?int
    {
        $ids = $this->hashids->decode($hash);

        return $ids[0] ?? null;
    }
}
