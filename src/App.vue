<template>
  <v-app>
    <v-dialog v-model="loading" fullscreen full-width>
      <v-container fluid fill-height style="background-color: rgba(255, 255, 255, 0.5);">
        <v-layout justify-center align-center>
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-layout>
      </v-container>
    </v-dialog>
    <v-container fluid class="grey lighten-5" loading>
      <v-row no-gutters>
        <v-col cols="12" sm="3" v-for="(info,index) in currentInfo" :key="index">
          <v-card outlined>
            <v-card-title>
              {{ info.name }}
              <v-btn :right="true" color="primary" :absolute="true" @click.stop="more(info.id)">More</v-btn>
            </v-card-title>
            <v-card-text v-if="info.address">
              <p>{{ info.address }}</p>
            </v-card-text>
            <v-card-text v-else>
              <p></p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog" max-width="40%">
      <v-card>
        <v-card-title>
          ID: {{modalInfo[0] ? modalInfo[0].id:''}}
          <br />
          Hash: {{modalInfo[0] ? modalInfo[0].hash:'' }}
        </v-card-title>

        <v-card-text>
          <i class="fa fa-phone"></i>
          <span v-if="number">{{modalInfo[0] ? modalInfo[0].number:''}}</span>
          <span v-else @click="number=true">CLick to view</span>
          <br />
          <i class="fa fa-envelope"></i>
          <span v-if="email">{{modalInfo[0] ? modalInfo[0].email:''}}</span>
          <span v-else @click="email=true">CLick to view</span>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-row>
      <v-col class="text-center" cols="12">
        <v-btn color="error" @click="reload">Reload Current Page</v-btn>
        <v-btn color="error" @click="firstPage">Navigate First Page</v-btn>
        <v-btn color="depressed" @click="nextFourItems">Navigate Next Four Items</v-btn>
        <v-btn color="depressed" @click="loadItems(5000)">Lazy load Four Items</v-btn>
        <v-btn color="depressed" @click="loadItems(1000)">Quick load Four Items</v-btn>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import infos from "./assets/info.js";

export default {
  name: "App",
  data() {
    return {
      loading: false,
      dialog: false,
      number: false,
      email: false,
      infos: infos.infos,
      currentInfo: [],
      modalInfo: [],
      numberPerPage: 4, // page per items
      currentPage: this.$route.params.number ? this.$route.params.number : 0 // Current page number
    };
  },
  methods: {
    reload() {
      window.location.reload();
    },
    firstPage() {
      window.location.href = window.location.origin;
    },
    nextFourItems() {
      const url = parseInt(this.currentPage) + this.numberPerPage;
      this.$router.push({ path: `/${url}` });
      this.$router.go();
    },
    loadItems(timeOut) {
      this.loading = true;
      setTimeout(() => {
        this.currentPage =
          this.currentPage === ""
            ? this.numberPerPage
            : parseInt(this.currentPage) + this.numberPerPage;
        const loadedInfos = this.infos.slice(
          this.currentPage,
          parseInt(this.currentPage) + this.numberPerPage
        );
        loadedInfos.forEach(info => {
          this.currentInfo.push(info);
        });
        this.loading = false;
        setTimeout(function() {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
          });
        }, 2);
      }, timeOut);
    },
    more(id) {
      this.dialog = true;
      this.number = false;
      this.email = false;
      this.modalInfo = [...this.currentInfo.filter(info => info.id === id)];
    }
  },
  created: function() {
    this.currentInfo = this.infos.slice(
      this.currentPage,
      parseInt(this.currentPage) + this.numberPerPage
    );
  }
};
</script>