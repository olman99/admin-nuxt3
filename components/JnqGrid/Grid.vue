<script setup lang="ts">
import { onBeforeMount, provide, ref } from "vue";
import persistance from "../../libs/dataPersistance";
import { GridColumns, GridOptions, GridQueryFilters } from "../../models/grid";

// Props
interface Props {
  filters: Array<GridQueryFilters>;
  specialFilters: Array<string>;
  title: string;
  hidePagination?: boolean;
  hideOptions?: boolean;
  hideFilterDropdown?: boolean;
  columns: Array<GridColumns>;
  columnsFilter: Array<GridColumns>;
  refreshData: Function;
  name: string;
  options: Array<GridOptions>;
  currencySymbol: string;
}
const props = defineProps<Props>();

// Provide
provide("specialFilters", props.specialFilters);

// Data
const data = ref([]);
const limit = ref(5);
const limits = ref([5, 10, 50, 100]);
const offset = ref(0);
const total = ref(0);
const totalPages = ref(0);
const currentPage = ref<number>(1);
const queryFilters = ref<Array<{ label: string; value: string }>>([]);

// Methods
const refreshData = async () => {
  const db = await props.refreshData(
    offset.value,
    limit.value,
    queryFilters.value
  );

  data.value = db.data;
  total.value = db.total;
  offset.value = db.offset;
  limit.value = db.limit;
  totalPages.value = db.totalPages;
  currentPage.value = db.offset + 1;
};

const updateFilters = async (
  filters: Array<{ label: string; value: string }>
) => {
  queryFilters.value = filters;
  offset.value = 0;
  await refreshData();
};

const changePage = async (value: number) => {
  currentPage.value = value;
  // offset.value = (currentPage.value - 1) * limit.value;
  offset.value = currentPage.value - 1;
  await refreshData();
};

const changeLimit = async (value: number) => {
  limit.value = value;
  // offset.value = (currentPage.value - 1) * limit.value;
  offset.value = currentPage.value - 1;
  await refreshData();
};

// Lifecycle Hooks
onBeforeMount(async () => {
  const db = await persistance.get("persistance", props.name);
  if (db != undefined) {
    limit.value = db.limit;
    data.value = db.data;
    offset.value = db.offset;
    total.value = db.total;
    totalPages.value = db.totalPages;
    queryFilters.value = JSON.parse(db.queryFilters);
    currentPage.value = offset.value + 1;
  }

  await refreshData();
});
</script>

<template>
  <JnqGridSearchBar
    :filters="filters"
    :query-filters="queryFilters"
    :title="title"
    @update-filters="updateFilters"
  />
  <JnqGridToolBar
    :hide-options="hideOptions"
    :hide-filter-dropdown="hideFilterDropdown"
    :options="options"
  />
  <JnqGridTable
    :columns="columns"
    :data="data"
    :currencySymbol="currencySymbol"
  />
  <JnqGridPagination
    :hide-pagination="hidePagination"
    :totalPages="totalPages"
    :currentPage="currentPage"
    :limits="limits"
    :total="total"
    @change-page="changePage"
    @change-limit="changeLimit"
  />
</template>
