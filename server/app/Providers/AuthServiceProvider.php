<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    public function boot()
    {
        $this->registerPolicies();

        //Passport::routes();
    }
}
/***
 * Client ID: 1
Client secret: kVDEkrqXuXy8XOgAYBOm874ktntSvzXHmQOikdSy
Password grant client created successfully.
Client ID: 2
Client secret: LnS6N2IwKzSYNpUmKp9qCGUiKugyGqxx4b6OFS2A
 */
