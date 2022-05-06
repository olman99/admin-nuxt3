<script setup lang="ts">
import { ChevronDownIcon } from "@heroicons/vue/solid";
import { ref, computed } from "vue";

const props = defineProps({
  columns: { type: Array, required: true },
  data: { type: Array, required: true },
});

const selectedData: any = ref([]);

const indeterminate = computed(
  () =>
    selectedData.value.length > 0 &&
    selectedData.value.length < props.data.length
);
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
          <div
            class="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
          >
            <div
              v-if="selectedData.length > 0"
              class="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16"
            >
              <button
                type="button"
                class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Bulk edit
              </button>
              <button
                type="button"
                class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Delete all
              </button>
            </div>
            <table class="min-w-full table-fixed divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="relative w-12 px-6 sm:w-16 sm:px-8">
                    <input
                      type="checkbox"
                      class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                      :checked="
                        indeterminate || selectedData.length === data.length
                      "
                      :indeterminate="indeterminate"
                      @change="
                        selectedData = ($event.target as HTMLInputElement).checked
                          ? data.map((p: any) => p.ID)
                          : []
                      "
                    />
                  </th>
                  <th
                    scope="col"
                    class="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                    v-for="column in (columns as any)"
                    :class="column.class"
                  >
                    <a href="#" class="group inline-flex">
                      {{ column.label }}
                      <span
                        class="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                      >
                        <ChevronDownIcon
                          class="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  v-for="object in (data as any)"
                  :key="object.ID"
                  :class="[selectedData.includes(object.ID as never) && 'bg-gray-50']"
                >
                  <td class="relative w-12 px-6 sm:w-16 sm:px-8">
                    <div
                      v-if="selectedData.includes(object.ID as never)"
                      class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600"
                    ></div>
                    <input
                      type="checkbox"
                      class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                      :value="object.ID"
                      v-model="selectedData"
                    />
                  </td>
                  <td
                    v-for="(column, index) in (columns as any)"
                    :class="[
                      'whitespace-nowrap py-4 pr-3 text-sm',
                      selectedData.includes(object.ID as never) && index == 0
                        ? 'text-indigo-600'
                        : index == 0
                        ? 'text-gray-900 font-medium'
                        : 'text-gray-500',
                      column.class,
                    ]"
                    :key="index"
                  >
                    {{ object[column.label] }}
                    <dl class="font-normal lg:hidden" v-if="index == 0">
                      <template v-for="(c, ix) in (columns as any)" :key="ix">
                        <dt class="sr-only">column.label</dt>
                        <dd class="mt-1 truncate text-gray-700">
                          {{ object[c.label] }}
                        </dd>
                      </template>
                    </dl>
                  </td>
                  <td
                    class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                  >
                    <a href="#" class="text-indigo-600 hover:text-indigo-900"
                      >Edit<span class="sr-only">, {{ object.ID }}</span></a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
