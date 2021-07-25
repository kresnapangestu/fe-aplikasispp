import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { ApiShowRiwayatTransaksi } from "../Api";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { useHistory } from "react-router";

const columns = [
  { id: "no", label: "ID Transaksi", minWidth: 60 },
  { id: "transaksi", label: "Transaksi", minWidth: 170 },
  {
    id: "tglTransaksi",
    label: "Tanggal Transaksi",
    minWidth: 150,
    format: (value) => value.toFixed(2),
  },
  {
    id: "NamaSantri",
    label: "Nama Santri",
    minWidth: 60,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "nominal",
    label: "Nominal Pembayaran",
    minWidth: 60,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "tipe",
    label: "Tipe Transaksi",
    minWidth: 60,
    format: (value) => value.toLocaleString("en-US"),
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
    height: 48,
    padding: "0 30px",
    marginTop: "20px",
  },
  deleteBtn: {
    background: "#FC4445",
    marginLeft: "1%",
    color: "white",
  },
  pic: {
    width: 30,
  },
}));

function RiwayatTransaksi() {
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = React.useState(0);
  const [dataRiwayatTransaksi, setDataRiwayatTransaksi] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [shallRender, setShallRender] = React.useState(false);

  let gateway = ApiShowRiwayatTransaksi.getInstance();

  let RiwayatTransaksiInstance = gateway.getRiwayatTransaksiInstance();
  useEffect(() => {
    let riwayatTransaksiData = gateway.getDataRiwayatTransaksi(
      RiwayatTransaksiInstance
    );

    let result = gateway.requestData([riwayatTransaksiData]);
    result.then((response) => {
      if (Array.isArray(response)) {
        // if (response.status === 200) {
        setDataRiwayatTransaksi(response);
        // }
      }
    });
  }, [shallRender]);
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
        <div className={classes.Head}>Riwayat Transaksi</div>
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
              {dataRiwayatTransaksi &&
                dataRiwayatTransaksi.map((data) => {
                  return (
                    <TableRow hover key="{data.id_transaksi}">
                      <TableCell>{data.id_transaksi}</TableCell>
                      <TableCell>
                        SPP {data.tanggal_transaksi} {data.status_transaksi} {data.kode_unik}
                      </TableCell>
                      <TableCell>{data.tanggal_transaksi}</TableCell>
                      <TableCell>{data.nama_santri}</TableCell>
                      <TableCell>{data.total_bayar}</TableCell>
                      <TableCell>{data.status_transaksi}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
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

export default RiwayatTransaksi;
