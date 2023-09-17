<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\DB;

class PurchaseMutation
{
    public function create($root, array $args)
    {
        return DB::transaction(function () use ($root, $args) {
            $purchase = \App\Models\Purchase::create($args);
            $purchase->customer()->increment('score');

            return $purchase;
        });
    }
}
