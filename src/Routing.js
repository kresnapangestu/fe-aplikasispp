import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import LandingPage from "./container/LandingPage";
import Dashboard from "./container/Dashboard";
import RiwayatTransaksi from "./container/RiwayatTransaksi";
import LaporanTunggakan from "./container/Laporan/LaporanTunggakan";
import LaporanKeuangan from "./container/Laporan/LaporanKeuangan";
import DaftarSantri from "./container/Santri/DaftarSantri";
import DetailDataSantri from "./container/Santri/DetailDataSantri";
import TambahDataSantri from "./container/Santri/TambahDataSantri";
import SuntingDataSantri from "./container/Santri/SuntingDataSantri";
import AkunSantri from "./container/Santri/AkunSantri";
import InputSPP from "./container/InputSPP";
import AkunOperator from "./container/Operator/AkunOperator";
import TambahAkunOperator from "./container/Operator/TambahAkunOperator";
import DetailDataOperator from "./container/Operator/DetailDataOperator";
import EditDataOperator from "./container/Operator/EditDataOperator";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { getToken, removeUserSession, setUserSession } from './components/Common';

function Routing() {
    // const [authLoading, setAuthLoading] = useState(true);
 
    useEffect(() => {
      const token = getToken();
      if (!token) {
        return;
      }
    //   axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
    //     setUserSession(response.data.token, response.data.user);
    //     setAuthLoading(false);
    //   }).catch(error => {
    //     removeUserSession();
    //     setAuthLoading(false);
    //   });
    }, []);
    // if (authLoading && getToken()) {
    //     return <div className="content">Checking Authentication...</div>
    //   }

  return (
    <div className="Route">
      <BrowserRouter>
        <Switch>
          <PublicRoute exact path="/" component={LandingPage} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/DaftarSantri" component={DaftarSantri} />
          <PrivateRoute
            exact
            path="/DaftarSantri/Detail/:id"
            component={DetailDataSantri}
          />
          <PrivateRoute
            exact
            path="/DaftarSantri/Tambah"
            component={TambahDataSantri}
          />
          <PrivateRoute
            exact
            path="/DaftarSantri/Sunting/:id"
            component={SuntingDataSantri}
          />
          <PrivateRoute exact path="/AkunSantri" component={AkunSantri} />
          <PrivateRoute exact path="/AkunAdmin" component={AkunOperator} />
          <PrivateRoute
            exact
            path="/AkunAdmin/Tambah"
            component={TambahAkunOperator}
          />
          <PrivateRoute
            exact
            path="/AkunAdmin/Sunting/:id"
            component={EditDataOperator}
          />
          <PrivateRoute
            exact
            path="/AkunAdmin/Detail/:id"
            component={DetailDataOperator}
          />
          <PrivateRoute exact path="/LaporanKeuangan" component={LaporanKeuangan} />
          <PrivateRoute exact path="/LaporanTunggakan" component={LaporanTunggakan} />
          <PrivateRoute exact path="/RiwayatTransaksi" component={RiwayatTransaksi} />
          <PrivateRoute exact path="/InputSPP" component={InputSPP} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
