<script setup lang="ts">
import navigate from "../../utils/navigate";
import { GridOptions } from "../../models/grid";

// Props
interface Props {
  hideFilterDropdown?: boolean;
  hideOptions?: boolean;
  options: Array<GridOptions>;
}
defineProps<Props>();

// Methods
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

const handleActionButton = (button: any) => {
  switch (button.type) {
    case "redirect":
      navigate(button.route);
      break;
    case "modal":
      button.handler();
      break;
    case "alert":
      break;
    default:
      break;
  }
};
</script>

<template>
  <div class="flex justify-between mt-2 gap-2 flex-col sm:flex-row">
    <div class="flex gap-2" v-if="!hideOptions">
      <button
        type="button"
        class="inline-flex items-center px-3 py-2 border text-sm leading-4 font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
        v-for="(button, index) in options"
        :key="index"
        :class="classOption(button.variant)"
        @click="handleActionButton(button)"
      >
        {{ button.label }}
      </button>
    </div>
    <div class="flex gap-2">
      <JnqGridFilterDropdown v-if="!hideFilterDropdown" />
    </div>
  </div>
</template>
