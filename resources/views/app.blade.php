<!DOCTYPE html>
<html
    lang="{{ str_replace('_', '-', app()->getLocale()) }}"
    dir="rtl"
    class="<?= 'true' == ($_COOKIE['lightMode'] ?? '') ? 'light' : '' ?>">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'LaraReact') }}</title>

    <!-- Scripts -->
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
    @inertiaHead

</head>

<body>
    @inertia

    <div id="modalWrap"></div>
</body>

</html>