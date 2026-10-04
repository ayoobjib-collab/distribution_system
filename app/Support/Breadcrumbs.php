<?php

namespace App\Support;

class Breadcrumbs
{
    protected array $items = [];

    public function add(string $label, ?string $url = null): static
    {
        $this->items[] = [
            'label' => $label,
            'url'   => $url,
        ];

        return $this;
    }

    public function all(): array
    {
        return $this->items;
    }
}