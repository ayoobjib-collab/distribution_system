<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'account_permission',
            'product_permission',
            'invoice_permission',
            'transaction_permission',
            'report_permission',
            'user_permission',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $adminRole->syncPermissions(Permission::all());

        $salesRole = Role::firstOrCreate(['name' => 'salesman', 'guard_name' => 'web']);
        $salesRole->syncPermissions([
            'invoice_permission',
        ]);

        $adminUser = User::firstOrCreate(
            ['email' => 'admin@distributor.com'],
            [
                'full_name' => 'مدیر سیستم',
                'mobile' => '09132732868',
                'password' => Hash::make('09132732868'),
                'is_active' => true,
            ]
        );

        $adminUser->assignRole($adminRole);
    }
}
