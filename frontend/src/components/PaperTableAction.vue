<template>
  <table class="table" :class="tableClass">
    <thead>
      <slot name="columns">
        <th>Action</th>
        <th v-for="column in columns" :key="column">{{ column }}</th>
      </slot>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <slot :row="item">
          <td><input type="checkbox" :value="Object.values(item)[1]" @change="onCheckboxChange($event, Object.values(item)[1])"></td>
          <td
            v-for="(column, index) in columns"
            :key="index"
            v-if="hasValue(item, column)"
          >
            {{ itemValue(item, column) }}
          </td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: "paper-table-action",
  props: {
    columns: Array,
    data: Array,
    type: {
      type: String, // striped | hover
      default: "striped",
    },
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    },
  },
  methods: {
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    },
    async onCheckboxChange(event, orderId) {
      this.$emit('init-event');
      if (event.target.checked) {
        await fetch(process.env.VUE_APP_BACKEND_URL+"/follow-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: orderId,
            followup_date: new Date(),
          }),
        }).then((response) => {
          console.log("response", response);
        }).catch((error) => {
          console.log("error", error);
        })
      } else {
        await fetch(process.env.VUE_APP_BACKEND_URL+"/follow-up/"+orderId, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          console.log("response", response);
        }).catch((error) => {
          console.log("error", error);
        })
      }
    },
  },
};
</script>
<style></style>
