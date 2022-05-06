<script setup lang="ts">
const props = defineProps({
  filters: { type: Array, required: true },
  specialFilters: { type: Array, required: true },
  title: { type: String, required: true },
  hidePagination: { type: Boolean, required: false },
  hideOptions: { type: Boolean, required: false },
  hideFilterDropdown: { type: Boolean, required: false },
  columns: { type: Array, required: true },
  columnsFilter: { type: Array, required: true },
  data: { type: Array, required: true },
  options: { type: Array, required: true },
  offset: { type: Number, required: false },
  limit: { type: Number, required: false },
});

const min = useState("min", () => {
  const aux = props.offset ?? 0;
  return aux + 1;
});
const max = useState("max", () => {
  return props.limit ?? 10;
});
const total = useState("total", () => 33);
</script>

<template>
  <JnqGridSearchBar :filters="filters" :title="title" />
  <JnqGridToolBar
    :hide-options="hideOptions"
    :hide-filter-dropdown="hideFilterDropdown"
    :hide-pagination="hidePagination"
    :filters="specialFilters"
    :columns="columnsFilter"
    :options="options"
    :min="min"
    :max="max"
    :total="total"
  />
  <JnqGridTable :columns="columns" :data="data" />
</template>
