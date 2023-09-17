<script setup>
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";

const { result } = useQuery(gql`
  query {
    users_count
    customers_count
    purchases_count
  }
`);
</script>

<template>
  <div id="dashboard">
    <CRow>
      <CCol :xs="3">
        <CWidgetStatsA class="mb-4" color="primary">
          <template #value>{{ result?.users_count || 0 }} </template>
          <template #title><p>Users</p></template>
        </CWidgetStatsA>
      </CCol>
      <CCol :xs="3">
        <CWidgetStatsA class="mb-4" color="info">
          <template #value>{{ result?.customers_count || 0 }}</template>
          <template #title><p>Customers</p></template>
        </CWidgetStatsA>
      </CCol>
      <CCol :xs="3">
        <CWidgetStatsA class="mb-4" color="danger">
          <template #value>{{ result?.purchases_count || 0 }} </template>
          <template #title><p>Purchases</p></template>
        </CWidgetStatsA>
      </CCol>
    </CRow>
  </div>
</template>
