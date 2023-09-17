<script setup>
import { computed, ref } from "vue";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@vue/apollo-composable";

const purchase = ref({
  customer_id: null,
  amount: null,
});
const successCreatedPurchase = ref("");
const search = ref("");
const { result, refetch, variables, error } = useQuery(
  gql`
    query customerSearch($search: String!) {
      customerSearch(search: $search) {
        id
        name
        phone
      }
    }
  `,
  { search }
);

function searchCustomer() {
  variables.value = { search: search.value };
  successCreatedPurchase.value = false;
  refetch();
}

const customers = computed(() => result.value?.customerSearch || []);

const { mutate: createPurchase, onDone: onCreatedCustomer } = useMutation(gql`
  mutation createPurchase($customer_id: Int!, $amount: Float!) {
    createPurchase(customer_id: $customer_id, amount: $amount) {
      id
      amount
      created_at
    }
  }
`);

onCreatedCustomer(() => {
  variables.value = { search: "" };
  successCreatedPurchase.value = true;
  refetch();
});
</script>

<template>
  <div>
    <h1>Customer Lookup</h1>
    <CForm @submit.prevent="searchCustomer({ search })">
      <CRow class="gap-0 mb-3">
        <CCol>
          <CFormInput
            v-model="search"
            type="text"
            id="search"
            placeholder="Search (Phone or Name)"
            aria-describedby="searchHelp"
          />
        </CCol>
        <CCol>
          <CButton type="submit" color="primary">Search</CButton>
        </CCol>
      </CRow>
    </CForm>

    <CAlert v-if="successCreatedPurchase" color="success">
      Purchase has been saved</CAlert
    >
    <CAlert v-else-if="error" color="info"> Customer Not Found</CAlert>
    <CCard v-for="customer in customers" :key="customer.id" class="mb-3">
      <CForm>
        <CCardBody>
          <p>Name: {{ customer.name }}</p>
          <p>Phone: {{ customer.phone }}</p>
          <CFormInput
            v-if="purchase.customer_id !== customer.id"
            type="text"
            placeholder="Enter Purchase Amount"
            style="max-width: 500px"
            @focus="() => (purchase.customer_id = customer.id)"
          />
          <CFormInput
            v-else
            v-model="purchase.amount"
            type="text"
            placeholder="Enter Purchase Amount"
            style="max-width: 500px"
          />
        </CCardBody>
        <CCardFooter>
          <CButton
            type="submit"
            color="primary"
            :disabled="
              purchase.customer_id !== customer.id || purchase.amount <= 0
            "
            @click="
              createPurchase({
                customer_id: Number(customer.id),
                amount: Number(purchase.amount),
              })
            "
            >Save Purchase</CButton
          >
        </CCardFooter>
      </CForm>
    </CCard>
  </div>
</template>
