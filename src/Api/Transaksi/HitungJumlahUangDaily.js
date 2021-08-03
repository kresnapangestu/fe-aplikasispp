import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiHitungJumlahUangDaily extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiHitungJumlahUangDaily.INSTANCE === null) {
      ApiHitungJumlahUangDaily.INSTANCE = new ApiHitungJumlahUangDaily();
    }
    return ApiHitungJumlahUangDaily.INSTANCE;
  }

  getJumlahUangDailyInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  showJumlahUangDailyPath = () => {
    return "transaksi/total/harian";
  };

  getJumlahUangDaily = (instance) => {
    if (instance !== null) {
      let path = BASE_URL + this.showJumlahUangDailyPath();
      return instance
        .get(path)
        .then((response) => response)
        .catch((err) => alert(err.response.data.message));
    }
  };

  requestData = (data) => {
    if (Array.isArray(data)) {
      return Promise.all(data)
      .then((response) => {
        let result = {};
        if (response) {
          result = response[0].data.uang_masuk;
          console.log("jml uang daily", result);
            return result;
          }
        })
        .catch((error) => {
          alert(error.response.data.message)
          return error;
        });
    }
  };
}