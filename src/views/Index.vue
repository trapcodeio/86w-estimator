<script setup lang="ts">
import { computed, reactive } from "vue";

const naira = "₦";
const form = reactive({
  amount: 5000,
  days: 30,
  interest: 3
});

const percentageInterest = computed(() => form.interest / 100);

type DataItem = {
  day: number;
  balance: number;
  interest: number;
  newBalance: number;
  profit: number;
};

const data = computed(() => {
  const items: DataItem[] = [];

  let days = 0;
  let amount = form.amount;
  while (days < form.days) {
    // get 3 percent of the amount
    const startAmount = amount;
    let interest = amount * percentageInterest.value;
    // add the interest to the amount
    amount += interest;

    days++;

    // push to data
    const d = {
      day: days,
      balance: Math.floor(startAmount),
      interest: Math.floor(interest),
      newBalance: Math.floor(amount),
      profit: Math.floor(amount - form.amount)
    };

    items.push(d);
  }

  return items;
});
</script>

<template>
  <div class="container mx-auto mt-10">
    <h1 class="text-3xl font-bold text-center text-red-800">86w Estimator</h1>

    <div class="flex mt-5 lg:mt-10">
      <div class="w-full max-w-2xl mx-auto">
        <form
          class="grid grid-cols-1 md:grid-cols-3 p-3 bg-black rounded-t text-white gap-3"
        >
          <div class="col-span-1">
            <label class="block">Amount: {{ naira }}</label>
            <input v-model="form.amount" type="number" placeholder="Invested Amount" />
          </div>
          <div class="col-span-1">
            <label>Days:</label>
            <input v-model="form.days" type="number" placeholder="Invested Amount" />
          </div>
          <div class="col-span-1">
            <label>Minimum Daily Percent: %</label>
            <input v-model="form.interest" type="text" placeholder="Daily Percent" />
          </div>
        </form>

        <div class="bg-gray-100 my-10">
          <div class="table-container">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Balance</th>
                  <th>Interest</th>
                  <th>New Balance</th>
                  <th>Profit</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(item, index) in data" :key="index">
                  <tr>
                    <td class="font-bold">{{ item.day }}.</td>
                    <td>{{ naira }} {{ item.balance.toLocaleString() }}</td>
                    <td>
                      <span class="text-blue-600">
                        {{ naira }} {{ item.interest.toLocaleString() }}
                      </span>
                    </td>
                    <td>
                      <span class="text-green-600"
                        >{{ naira }} {{ item.newBalance.toLocaleString() }}</span
                      >
                    </td>
                    <td>{{ naira }} {{ item.profit.toLocaleString() }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
label {
  @apply text-sm block;
}

input {
  @apply border-2 border-gray-800 text-black;
  @apply p-2 w-full;
  @apply rounded focus:outline-0;
}
</style>
