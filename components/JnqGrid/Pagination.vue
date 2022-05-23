<script setup lang="ts">
import { ref, onMounted, onUpdated } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/solid";

// Props
interface Props {
  totalPages: number;
  currentPage: number;
  limits: Array<number>;
  total: number;
  hidePagination: boolean;
}

const props = defineProps<Props>();

// Emits
const emit = defineEmits<{
  (e: "changePage", page: number): void;
  (e: "changeLimit", limit: number): void;
}>();

// Data
const pages = ref<Array<number>>([]);
const previousPage = ref<number>(0);
const previousTotalPages = ref<number>(0);
const limit = ref<number>(5);

// Methods
const getPages = (currentPage: number, totalPages: number): Array<number> => {
  let calculatePages = [];
  if (currentPage - 2 >= 1 && currentPage + 4 <= totalPages) {
    let initialValue = currentPage - 2;
    for (let index = initialValue; index < initialValue + 7; index++) {
      calculatePages.push(index);
    }
  } else if (currentPage - 2 < 1) {
    let finalvalue = totalPages > 7 ? 7 : totalPages;
    for (let index = 1; index <= finalvalue; index++) {
      calculatePages.push(index);
    }
  } else {
    let initialValue = totalPages - 6 > 0 ? totalPages - 6 : 1;
    for (let index = initialValue; index <= totalPages; index++) {
      calculatePages.push(index);
    }
  }
  return calculatePages;
};

const goPage = (value: string) => {
  let page = Number(value);
  if (page < 1) {
    page = 1;
  } else if (page > props.totalPages) {
    page = props.totalPages;
  }
  emit("changePage", page);
};

const changeLimit = () => {
  emit("changeLimit", limit.value);
};

// Lifecycle Hooks

onUpdated(() => {
  let calculatePages = getPages(props.currentPage, props.totalPages);

  if (
    previousPage.value !== props.currentPage ||
    (props.totalPages != 0 && previousTotalPages.value !== props.totalPages)
  ) {
    pages.value = calculatePages;
    previousPage.value = props.currentPage;
    previousTotalPages.value = props.totalPages;
  }
});
</script>

<template>
  <div
    class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
    v-if="!hidePagination"
  >
    <div class="flex-1 flex justify-between sm:hidden">
      <a
        href="#"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        @click="
          () => {
            if (currentPage > 1) {
              $emit('changePage', currentPage - 1);
            }
          }
        "
      >
        Previous
      </a>
      <a
        href="#"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        @click="
          () => {
            if (currentPage < totalPages) {
              $emit('changePage', currentPage + 1);
            }
          }
        "
      >
        Next
      </a>
    </div>
    <div
      class="hidden sm:flex-1 sm:flex sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="flex justify-between gap-2">
        <nav
          class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <a
            href="#"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            @click="
              () => {
                if (currentPage > 1) {
                  $emit('changePage', currentPage - 1);
                }
              }
            "
          >
            <span class="sr-only">Previous</span>
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          </a>
          <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
          <a
            v-for="page in pages"
            href="#"
            class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            :class="
              page === currentPage
                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
            "
            @click="$emit('changePage', page)"
          >
            {{ page }}
          </a>
          <a
            href="#"
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            @click="
              () => {
                if (currentPage < totalPages) {
                  $emit('changePage', currentPage + 1);
                }
              }
            "
          >
            <span class="sr-only">Next</span>
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
          </a>
        </nav>
        <div class="flex justify-around gap-2" v-if="totalPages > 7">
          <p class="flex text-sm text-gray-700 items-center gap-1">
            <span class="font-medium">{{ totalPages }}</span>
            <span>pages</span>
          </p>
        </div>
      </div>
      <div class="flex gap-2" v-if="totalPages > 7">
        <p class="flex text-sm text-gray-700 items-center">
          <span class="font-medium">Go to page</span>
        </p>
        <input
          type="text"
          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-1/4 sm:text-sm border-gray-300 rounded-md"
          placeholder=""
          @keydown.enter="goPage($event.target.value)"
        />
      </div>
      <div class="flex justify-around gap-2">
        <p class="flex text-sm text-gray-700 items-center gap-1">
          <span class="font-medium">{{ total }}</span>
          <span> results</span>
        </p>
        <select
          id="location"
          name="location"
          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          @change="changeLimit"
        >
          <option v-for="limit of limits">{{ limit }}</option>
        </select>
      </div>
    </div>
  </div>
</template>
