<?php

namespace App\Console\Commands;

use App\Enums\AdminRoute;
use App\Enums\UserRoute;
use Illuminate\Console\Command;

class GenerateEnumJson extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:enum-json';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        AdminRoute::saveToJson(resource_path('js/enums/adminRoute.json'));
        UserRoute::saveToJson(resource_path('js/enums/userRoute.json'));

        $this->info('Enum JSON file generated!');
    }
}
