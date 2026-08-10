<?php
return [
    'main' => [
        [
            'title' => 'خانه',
            'url' => '/',
        ],
        [
            'title' => 'درباره ما',
            'url' => '/about',
            'children' => [
                ['title' => 'Team', 'url' => '/team'],
                ['title' => 'History', 'url' => '/history'],
            ]
        ]
    ]
];
