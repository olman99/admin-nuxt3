<script setup lang="ts">
const props = defineProps({
  hideFilterDropdown: { type: Boolean, required: false },
  hidePagination: { type: Boolean, required: false },
  hideOptions: { type: Boolean, required: false },
  filters: { type: Array, required: true },
  columns: { type: Array, required: true },
  options: { type: Array, required: true },
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  total: { type: Number, required: true },
});

const classOption = (variant: string): string => {
  let classCss: string = "";
  switch (variant) {
    case "primary":
      classCss =
        "border-transparent text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500";
      break;
    case "default":
      classCss =
        "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500";
      break;
    case "success":
      classCss =
        "border-transparent text-white bg-green-600 hover:bg-green-700 focus:ring-green-500";
      break;
    case "danger":
      classCss =
        "border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500";
      break;
    default:
      break;
  }

  return classCss;
};
</script>

<template>
  <div class="flex justify-between mt-2 gap-2 flex-col sm:flex-row">
    <div class="flex gap-2" v-if="!hideOptions">
      <button
        type="button"
        class="inline-flex items-center px-3 py-2 border text-sm leading-4 font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
        v-for="(opt, index) in (options as any)"
        :key="index"
        :class="classOption(opt.variant)"
      >
        {{ opt.label }}
      </button>
    </div>
    <div class="flex gap-2">
      <JnqGridFilterDropdown
        v-if="!hideFilterDropdown"
        :filters="filters"
        :columns="columns"
      />
      <JnqGridPagination
        v-if="!hidePagination"
        :min="min"
        :max="max"
        :total="total"
      />
    </div>
  </div>
</template>
