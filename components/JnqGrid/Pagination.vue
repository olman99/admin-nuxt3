<script setup lang="ts">
import { numberLiteralTypeAnnotation } from "@babel/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/solid";

const props = defineProps({
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  total: { type: Number, required: true },
});
</script>

<template>
  <nav class="px-4 flex items-center sm:px-0 gap-1">
    <input
      type="text"
      name="offset"
      id="offset"
      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-xs border-gray-300 rounded-md w-6"
      v-model="min"
    />
    -
    <input
      type="text"
      name="limit"
      id="limit"
      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-xs border-gray-300 rounded-md w-6"
      v-model="max"
    />
    <span> / {{ total }} </span>
    <ChevronLeftIcon class="h-5 w-5 cursor-pointer" aria-hidden="true" />
    <ChevronRightIcon class="h-5 w-5 cursor-pointer" aria-hidden="true" />
  </nav>
</template>
