<?php

namespace App\GraphQL\Queries;

use App\Models\Customer;

class CustomerQuery
{
    public function search($root, array $args)
    {
        return Customer::query()
            ->where('name', 'like', $args['search'])
            ->orWhere('name', 'like', $args['search'])
            ->get();
    }
}
