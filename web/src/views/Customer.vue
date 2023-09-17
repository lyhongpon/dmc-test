<script setup>
import { format } from "date-fns";
import { ref, computed } from "vue";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@vue/apollo-composable";

const fields = [
  { key: "name", label: "Name" },
  { key: "phone", label: "Phone" },
  { key: "registered_date", label: "Registration Date" },
  { key: "address", label: "Address" },
  { key: "score", label: "Score" },
  { key: "created_at", label: "Created at" },
  { key: "updated_at", label: "Updated at" },
];
const createCustomerModal = ref(false);
const newCustomerInput = ref({
  name: "",
  phone: "",
  address: "",
  registered_date: new Date(),
});

// todo: implement Pagination component
const { result } = useQuery(gql`
  query {
    customers(first: 200, page: 1) {
      data {
        id
        name
        phone
        registered_date
        address
        score
        created_at
        updated_at
      }
    }
  }
`);

const items = computed(() => result.value?.customers?.data || []);

const {
  mutate: createCustomer,
  error: createCustomerError,
  onDone: onCreatedCustomer,
} = useMutation(gql`
  mutation createCustomer(
    $name: String!
    $phone: String!
    $address: String
    $registered_date: Date
  ) {
    createCustomer(
      name: $name
      phone: $phone
      address: $address
      registered_date: $registered_date
    ) {
      id
      name
      phone
      registered_date
      address
      score
      created_at
      updated_at
    }
  }
`);

onCreatedCustomer(() => closeCreateCustomerModal());

function closeCreateCustomerModal() {
  createCustomerModal.value = false;
}
</script>

<template>
  <div>
    <h4>Customers</h4>
    <CCard>
      <CCardHeader>
        <CButton
          color="primary"
          size="sm"
          class="m-2"
          @click="createCustomerModal = true"
        >
          New
        </CButton>
      </CCardHeader>
      <CCardBody>
        <CTable :items="items" :columns="fields" />
      </CCardBody>
    </CCard>
    <CModal :visible="createCustomerModal" @close="closeCreateCustomerModal()">
      <CForm
        @submit="
          createCustomer({
            ...newCustomerInput,
            registered_date: format(
              new Date(newCustomerInput.registered_date),
              'yyyy-MM-dd'
            ),
          })
        "
      >
        <CModalHeader> Create New Customer </CModalHeader>
        <CModalBody>
          <CAlert v-if="createCustomerError" color="danger">
            Cannot register the customer.
          </CAlert>
          <div class="mb-3">
            <CFormInput
              v-model="newCustomerInput.name"
              type="text"
              id="name"
              placeholder="Name"
              aria-describedby="nameHelp"
            />
          </div>
          <div class="mb-3">
            <CFormInput
              v-model="newCustomerInput.phone"
              type="text"
              id="phone"
              placeholder="Phone Number"
              aria-describedby="phoneHelp"
            />
          </div>
          <div class="mb-3">
            <CFormInput
              v-model="newCustomerInput.address"
              type="text"
              id="address"
              placeholder="Address"
              aria-describedby="addressHelp"
            />
          </div>
          <div class="mb-3">
            <CFormInput
              v-model="newCustomerInput.registered_date"
              type="date"
              id="registered_date"
              placeholder="Registration Date"
              aria-describedby="registeredDateHelp"
            />
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" @click="closeCreateCustomerModal()">
            Close
          </CButton>
          <CButton type="submit" color="primary">Register Customer</CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  </div>
</template>
