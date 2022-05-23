<script setup lang="ts">
import navigate from "../../utils/navigate";
import { ChevronDownIcon, SearchIcon } from "@heroicons/vue/solid";
import { ref, computed } from "vue";
import { GridColumns } from "../../models/grid";

// Props
interface Props {
  columns: Array<GridColumns>;
  data: Array<any>;
  currencySymbol: string;
}
const props = defineProps<Props>();

// Data
const selectedData: any = ref([]);

// Computed
const indeterminate = computed(
  () =>
    selectedData.value.length > 0 &&
    selectedData.value.length < props.data.length
);

// Methods
const classOption = (variant: string): string => {
  let classCss: string = "";
  switch (variant) {
    case "primary":
      classCss =
        "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500";
      break;
    case "default":
      classCss =
        "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500";
      break;
    case "success":
      classCss =
        "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500";
      break;
    case "danger":
      classCss = "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500";
      break;
    default:
      break;
  }

  return classCss;
};

const handleClick = async (action: any) => {
  switch (action.actionType) {
    case "redirect":
      navigate(action.route);
      break;
    case "modal":
      action.handler();
      break;
    case "exec-redirect":
      action.handler();
      navigate(action.route);
      break;
    default:
      break;
  }
};
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

                  <template v-for="column in columns" :key="column['Id']">
                    <th
                      scope="col"
                      class="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                      :class="column.class"
                      v-if="!column.hidden"
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
                  </template>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  v-for="object in data"
                  :key="object['Id']"
                  :class="[selectedData.includes(object['Id']) && 'bg-gray-50']"
                >
                  <td class="relative w-12 px-6 sm:w-16 sm:px-8">
                    <div
                      v-if="selectedData.includes(object['Id'])"
                      class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600"
                    ></div>
                    <input
                      type="checkbox"
                      class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                      :value="object['Id']"
                      v-model="selectedData"
                    />
                  </td>
                  <template v-for="(column, index) in columns" :key="index">
                    <td
                      v-if="!column.hidden"
                      :class="[
                        'whitespace-nowrap py-4 pr-3 text-sm',
                        selectedData.includes(object['Id']) && index == 1
                          ? 'text-indigo-600'
                          : index == 1
                          ? 'text-gray-900 font-medium'
                          : 'text-gray-500',
                        column.class,
                        column.field === 'actions'
                          ? 'flex gap-1 justify-center items-center'
                          : '',
                      ]"
                    >
                      <template v-if="index !== columns.length - 1">
                        <template v-if="column.type === 'text'">
                          {{ object[column.field] }}
                        </template>
                        <template v-if="column.type === 'money'">
                          {{ currencySymbol + " " + object[column.field] }}
                        </template>
                        <template v-if="column.type === 'badge'">
                          <span
                            class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800"
                          >
                            {{ object[column.field] }}
                          </span>
                        </template>
                      </template>
                      <template v-else>
                        <template
                          v-for="(action, index) in columns[columns.length - 1][
                            'options'
                          ]"
                          :key="index"
                        >
                          <a
                            href="#"
                            class="text-indigo-600 hover:text-indigo-900"
                            v-if="action.type === 'span'"
                            @click="handleClick(action)"
                          >
                            {{ action.label }}
                            <span class="sr-only">, {{ object["Id"] }}</span></a
                          >
                          <button
                            v-if="action.type === 'button'"
                            type="button"
                            class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                            :class="classOption(action.variant)"
                            @click="handleClick(action)"
                          >
                            {{ action.label }}
                          </button>
                          <button
                            v-if="action.type === 'icon'"
                            type="button"
                            class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                            :class="classOption(action.variant)"
                            @click="handleClick(action)"
                          >
                            <SearchIcon
                              class="h-4 w-4 text-white"
                              aria-hidden="true"
                              v-if="action.icon === 'SearchIcon'"
                            />
                          </button>
                        </template>
                      </template>
                      <dl class="font-normal lg:hidden" v-if="index == 0">
                        <template v-for="(c, ix) in columns" :key="ix">
                          <dt class="sr-only">column.label</dt>
                          <dd class="mt-1 truncate text-gray-700">
                            {{ object[c.field] }}
                          </dd>
                        </template>
                      </dl>
                    </td>
                  </template>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
