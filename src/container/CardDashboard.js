import React, { useState } from "react";
import { Paper, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  Paper: {
    width: "270px",
    height: "100px",
    marginTop: "-40px",
    // marginLeft:"60px",
    boxShadow: "0 .15rem 1.75rem 0 rgba(58,59,69,.15)!important",
  },
  Head: {
    color:"black",
    fontSize: 13,
    fontFamily: "Roboto",
    fontWeight: 700,
    paddingTop: "10px",
    paddingBottom: "5px",
    paddingLeft: "20px",
  },
  data: {
    color: "black",
    fontSize: 24,
    fontFamily: "Roboto",
    fontWeight: 700,
    paddingLeft: "20px",
  },
}));

export default function CardDashboard({ params }) {
  const classes = useStyles();
  const [dataJumlahSantri, setJumlahSantri] = useState([]);

  return (
    <Grid container direction="row">
      {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}> */}
        <Paper
          className={classes.Paper}
          style={{ borderLeft: `5px solid ${params.color}` }}
        >
          <Grid container direction="row">
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Typography className={classes.Head}>
                {params && params.title}
              </Typography>
            </Grid>
          </Grid>
          <Grid container direction="row">
            {/* {dataJumlahSantri && */}
            <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
              <Typography className={classes.data}>
                {params && params.data}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              {params && params.icon}
            </Grid>
            {/* } */}
          </Grid>
        </Paper>
      </Grid>
    // </Grid>
  );
}
