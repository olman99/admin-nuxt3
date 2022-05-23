<script setup lang="ts">
import { XIcon } from "@heroicons/vue/solid";

// Props
interface Props {
  label: string;
  text: string;
}

defineProps<Props>();

// Emits
defineEmits<{ (e: "removeFilter", label: string, text: string): void }>();
</script>

<template>
  <div class="flex h-5/6 left-0">
    <div
      class="bg-indigo-600 inline-flex items-center rounded-md text-sm border border-indigo-600"
    >
      <span
        class="flex items-center px-1 rounded-md leading-relaxed truncate bg-indigo-600 text-white"
        >{{ label }}</span
      >
      <span
        class="flex items-center px-1 leading-relaxed truncate bg-white text-black"
        >{{ text }}</span
      >
      <div class="h-full rounded-r-md bg-white">
        <XIcon
          class="inline-block rounded-r-md align-middle h-4 w-4 ml-2 pr-1 cursor-pointer text-gray-500 hover:text-indigo-600 focus:outline-none"
          @click="$emit('removeFilter', label, text)"
        />
      </div>
    </div>
  </div>
</template>
