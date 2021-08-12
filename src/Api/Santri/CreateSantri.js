import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiCreateSantri extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiCreateSantri.INSTANCE === null) {
      ApiCreateSantri.INSTANCE = new ApiCreateSantri();
    }
    return ApiCreateSantri.INSTANCE;
  }

  getSantriInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  createSantriPath = () => {
    return "santri";
  };

  createDataSantri = (
    instance,
    namaSantri,
    nis,
    gender,
    tanggalLahir,
    alamat,
    noHp,
    namaWali,
    jumlahTunggakan,
    kelas,
    subsidi,
    callback
  ) => {
    if (instance !== null) {
      let params = {
        nis: nis,
        nama_santri: namaSantri,
        tanggal_lahir: tanggalLahir,
        alamat: alamat,
        no_hp: noHp,
        nama_wali: namaWali,
        jenis_kelamin: gender,
        subsidi: subsidi,
        jumlah_tunggakan: jumlahTunggakan,
        nama_kelas: kelas,
      };
      let path = BASE_URL + this.createSantriPath();
      return instance
        .post(path, params)
        .then((response) => {
          console.log("ini awalan", response);
          callback();
        })

        .catch((err) => alert(err.response.data.message));
    }
  };

  requestData = (data) => {
    if (Array.isArray(data)) {
      return Promise.all(data)
        .then((response) => {
          let result = [];
          for (let i = 0; i < response[0].data.santri.length; i++) {
            result.push(
              response[0].data.santri[i] ? response[0].data.santri[i] : null
            );
          }
          return result;
        })
        .catch((error) => alert(error.response.data.message));
    }
  };
}