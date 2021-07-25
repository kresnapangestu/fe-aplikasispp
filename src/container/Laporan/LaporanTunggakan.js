import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ApiShowLaporanTunggakan, ApiExportLaporanTunggakan } from "../../Api";
import { useHistory } from "react-router";
import { saveAs } from "file-saver";

const columns = [
  {
    id: "nis",
    label: "NIS",
    minWidth: 40,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "NamaSantri",
    label: "Nama Santri",
    minWidth: 150,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "bulan",
    label: "Jumlah Bulan",
    minWidth: 40,
    format: (value) => value.toFixed(2),
  },
  {
    id: "tahun",
    label: "Tahun",
    minWidth: 40,
    format: (value) => value.toFixed(2),
  },
  {
    id: "NominalTunggakan",
    label: "Nominal Tunggakan",
    minWidth: 60,
    format: (value) => value.toFixed(2),
  },
  {
    id: "aksi",
    label: "Surat Tagihan",
    minWidth: 60,
    format: (value) => value.toFixed(2),
  },
];

const rows = [];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  paperSize: {
    width: "100%",
    borderRadius: "20px",
    marginLeft: "80px",
  },
  Head: {
    color: "black",
    fontSize: "18px",
    fontFamily: "Roboto",
    fontWeight: 700,
    marginTop: "20px",
    marginLeft: "30px",
  },
  MyButton: {
    background: "#368756",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    width: "140px",
    height: "35px",
    padding: "0 30px",
    marginTop: "20px",
  },
  detailBtn: {
    background: "#368756",
    marginRight: "1%",
    color: "white",
  },
}));

function LaporanTunggakan() {
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dataLaporanTunggakan, setDataLaporanTunggakan] = React.useState([]);

  let gateway = ApiShowLaporanTunggakan.getInstance();
  let LaporanTunggakanInstance = gateway.getLaporanTunggakanInstance();

  useEffect(() => {
    let laporanTunggakanData = gateway.getDataLaporanTunggakan(
      LaporanTunggakanInstance
    );

    let result = gateway.requestData([laporanTunggakanData]);
    result.then((response) => {
      if (Array.isArray(response)) {
        console.log("ini laporan1", response);
        for (let i = 0; i < response.length; i++) {
          if (response[i].status === 200) {
            if (i === 0) {
              setDataLaporanTunggakan(response[i].data.tunggakan);
              // setDataLaporanUangMasuk(response[i].data.transaksi);
            }
          }else {
            // history.push('/errorHandler')
          }
        }
      }
    });
  }, []);

  const handleExportData = () => {
    let exportGateway = ApiExportLaporanTunggakan.getInstance();
    let exportLaporanInstance =
      exportGateway.getExportLaporanTunggakanInstance();

    let data = exportGateway.getExportLaporanTunggakan(exportLaporanInstance);
    let result = exportGateway.requestData(data);
    result.then((response) => {
      if (response) {
        var filename = "Laporan Tunggakan.pdf";
        var blob = new Blob([response], {
          type: "application/pdf;charset=utf-8",
        });
        var filesaver = saveAs(blob, filename);
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Navbar />
      <Paper className={classes.paperSize} elevation="1">
        <div className={classes.Head}>Laporan Tunggakan</div>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataLaporanTunggakan &&
                dataLaporanTunggakan.map((data) => {
                  return (
                    <TableRow hover key="{data.id_transaksi}">
                      <TableCell>{data.nis}</TableCell>
                      <TableCell>{data.nama_santri}</TableCell>
                      <TableCell>{data.jumlah_tunggakan}</TableCell>
                      <TableCell>{data.tahun}</TableCell>
                      <TableCell>{data.nominal_tunggakan}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          className={classes.detailBtn}
                        >
                          Cetak
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          className={classes.MyButton}
          style={{ margin: "2%" }}
          onClick={handleExportData}
        >
          Cetak
        </Button>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default LaporanTunggakan;
