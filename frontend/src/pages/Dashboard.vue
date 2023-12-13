<template>
  <div>
    <!--Stats cards-->
    <div class="row">
      <div
        class="col-md-6 col-xl-3"
        v-for="stats in statsCards"
        :key="stats.title"
      >
        <stats-card>
          <div
            class="icon-big text-center"
            :class="`icon-${stats.type}`"
            slot="header"
          >
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{ stats.title }}</p>
            {{ stats.value }}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{ stats.footerText }}
          </div>
        </stats-card>
      </div>
    </div>

    <!-- tables  -->
    <div class="row">
      <div class="col-6">
        <card :title="table1.title" :subTitle="table1.subTitle">
          <div slot="raw-content" class="table-responsive" style="overflow: auto; max-height: 400px !important;">
            <paper-table-action :data="table1.data" :columns="table1.columns" @init-event="update">
            </paper-table-action>
          </div>
        </card>
      </div>
      <div class="col-6">
        <card :title="table2.title" :subTitle="table2.subTitle">
          <div slot="raw-content" class="table-responsive">
            <paper-table :data="table2.data" :columns="table2.columns">
            </paper-table>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import { PaperTable,PaperTableAction } from "@/components";
import { StatsCard, ChartCard } from "@/components/index";
import Chartist from "chartist";

const tableColumns = [
  "order_id",
  "customer_id",
  "customer_name",
  "product_id",
  "product_name",
  "quantity",
  "total_price",
  "date"
];
const tableData = [
  {
    order_id:"1",
    customer_id:"1",
    customer_name:"1",
    product_id:"1",
    product_name:"1",
    quantity:"1",
    total_price:"1",
    date:"1",
  },
];

const tableColumns2 = [
  "_id",
  "order_id",
  "followup_date",
];
const tableData2 = [
  {
    _id:"1",
    order_id:"1",
    followup_date:"1",
  },
];

export default {
  components: {
    StatsCard,
    ChartCard,
    PaperTable,
    PaperTableAction,
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    // get the data from the server
    return {
      table1: {
        title: "Orders",
        subTitle: "List of all orders",
        columns: [...tableColumns],
        data: [...tableData],
      },
      table2: {
        title: "FollowUps",
        subTitle: "List of all FollowUps",
        columns: [...tableColumns2],
        data: [...tableData2],
      },
      statsCards: [
        {
          type: "warning",
          icon: "ti-server",
          title: "Orders",
          value: 0,
          footerText: "Updated now",
          footerIcon: "ti-reload",
        },
        {
          type: "success",
          icon: "ti-wallet",
          title: "Follow Ups",
          value: 0,
          footerText: "Last day",
          footerIcon: "ti-calendar",
        },
        {
          type: "danger",
          icon: "ti-pulse",
          title: "Errors",
          value: "23",
          footerText: "In the last hour",
          footerIcon: "ti-timer",
        },
        {
          type: "info",
          icon: "ti-twitter-alt",
          title: "Followers",
          value: "+45",
          footerText: "Updated now",
          footerIcon: "ti-reload",
        },
      ],
      usersChart: {
        data: {
          labels: [
            "9:00AM",
            "12:00AM",
            "3:00PM",
            "6:00PM",
            "9:00PM",
            "12:00PM",
            "3:00AM",
            "6:00AM",
          ],
          series: [
            [287, 385, 490, 562, 594, 626, 698, 895, 952],
            [67, 152, 193, 240, 387, 435, 535, 642, 744],
            [23, 113, 67, 108, 190, 239, 307, 410, 410],
          ],
        },
        options: {
          low: 0,
          high: 1000,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false,
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3,
          }),
          showLine: true,
          showPoint: false,
        },
      },
      activityChart: {
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mai",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          series: [
            [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
            [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795],
          ],
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false,
          },
          height: "245px",
        },
      },
      preferencesChart: {
        data: {
          labels: ["62%", "32%", "6%"],
          series: [62, 32, 6],
        },
        options: {},
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    update(){
      this.init();
    },
    async init(){
      await this.fetchOrders();
      await this.fetchFollowUps();
    },
    async fetchOrders() {
      try {
        const response = await fetch(process.env.VUE_APP_BACKEND_URL+'/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Assuming data.ordersCount contains the count of orders
        this.statsCards[0].value = data.length;
        this.table1.data = data;
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    },
    async fetchFollowUps() {
      try {
        const response = await fetch(process.env.VUE_APP_BACKEND_URL+'/follow-up', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        console.log(data);

        for(let i=0;i<data.length;i++){
          const order_id = data[i].order_id;
          const checkbox = document.querySelector(`input[value="${order_id}"]`);
          if (checkbox) {
            checkbox.checked = true;
          }
        }

        // Assuming data.ordersCount contains the count of orders
        this.statsCards[1].value = data.length;
        // Assuming data.ordersCount contains the count of orders
        this.table2.data = data;
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    },
  },
};

</script>
<style></style>
