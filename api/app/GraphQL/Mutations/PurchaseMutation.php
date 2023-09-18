<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\DB;

class PurchaseMutation
{
    public function create($root, array $args)
    {
        return DB::transaction(function () use ($root, $args) {
            // create new purchase
            $purchase = \App\Models\Purchase::create($args);

            // update user score
            $purchase->load('customer');
            $customer = $purchase->customer;
            $totalAmount = $customer->purchases()->sum('amount') + $args['amount'];
            $customer->update(['score' => intval($totalAmount / 10)]);

            return $purchase;
        });
    }
}
