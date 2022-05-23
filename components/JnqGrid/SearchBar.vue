<script setup lang="ts">
import { SearchIcon } from "@heroicons/vue/solid";
import { ref, onUpdated } from "vue";

// Props
interface Props {
  filters: Array<{
    label: string;
    value: string;
    filter: string;
  }>;
  queryFilters: Array<{
    label: string;
    value: string;
    filter: string;
  }>;
  title: string;
}

const props = defineProps<Props>();

// Emits
const emit = defineEmits<{
  (
    e: "updateFilters",
    value: Array<{ label: string; value: string; filter: string }>
  ): void;
}>();

// Data
const search = ref<string>("");
const searchFilters = ref<
  Array<{ label: string; value: string; filter: string }>
>([]);

// Methods
const addFilter = (filter: { label: string; filter: string }) => {
  searchFilters.value.push({
    label: filter.label,
    value: search.value,
    filter: filter.filter,
  });
  search.value = "";
  emit("updateFilters", searchFilters.value);
};

const removeFilter = (label: string, value: string) => {
  let index = searchFilters.value.findIndex(
    (el: any) => el.label === label && el.value === value
  );

  if (index != -1) {
    searchFilters.value.splice(index, 1);
  }

  emit("updateFilters", searchFilters.value);
};

// Lifecycle Hooks
onUpdated(() => {
  searchFilters.value = props.queryFilters;
});
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
    <h1 class="text-2xl font-semibold text-gray-900">{{ title }}</h1>
    <div
      class="mt-1 relative rounded-md shadow-sm w-full sm:w-3/5 border-indigo-600 ring-indigo-600"
    >
      <div class="flex items-center flex-wrap flex-1 gap-1 w-full">
        <JnqGridFilter
          v-for="filter in searchFilters"
          :label="filter.label"
          :text="filter.value"
          @removeFilter="removeFilter"
        />
        <input
          type="search"
          name="search-filter"
          id="search-filter"
          v-model="search"
          class="grow ring-0 border-0 focus:ring-0 focus:border-0 inline-block pr-10 sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <SearchIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <div :class="search != '' ? '' : 'hidden'">
        <div class="absolute z-20 w-full left-0">
          <div class="py-0.5 text-sm bg-white border border-gray-300">
            <a
              v-for="filter in filters"
              class="block py-0.5 px-5 cursor-pointer hover:bg-indigo-600 hover:text-white"
              @click="addFilter(filter as any)"
            >
              Search for {{ (filter as any).label }}:
              <span x-text="textInput" class="font-semibold">{{ search }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
