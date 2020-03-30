import React, { useState } from 'react';
import {GET_POLICY} from '../graphql/queries/GetPolicy';
import { useQuery } from '@apollo/react-hooks';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import LinearProgress from '@material-ui/core/LinearProgress';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        PolizApp | Ivano J. García
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Main = () => {
  const classes = useStyles();
  const [loadData, setLoadData] = useState(true);
  const { loading, error, data } = useQuery(GET_POLICY);


  if (loading) {
      setTimeout(() => {
        setLoadData(false)
      }, 2000);
  }
  if(data){
    console.log(data.getCostByEmployee)
  }

  const openGithub = e => {
    e.preventDefault();
    window.location.href = "https://github.com/ivanojgarcia";
  }
  const openLinkedin = e => {
    e.preventDefault();
    window.location.href = "https://www.linkedin.com/in/ivano-garcia-6742a0b7/";
  }
  return (
    <React.Fragment>
      {(loadData) && <LinearProgress color="secondary" />}
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CardMembershipIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            PolizApp
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Costo de Polizas según la cobertura
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Aplicación para el cálculo de las polizas según la cantidad de Hijos y edad, segementado entre Poliza de Salud/vida y Dental
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                    <Button variant="contained" color="primary" startIcon={<GitHubIcon />} onClick={openGithub}>
                            Github del Desarrollador
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" color="primary" startIcon={<LinkedInIcon />} onClick={openLinkedin}>
                            LinkedIn del Desarrollador
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
        {(loadData) ? <p>Cargando...</p> : <Grid container spacing={4}>
            <Typography variant="h4" gutterBottom>
                Empleados con Coberturas de un {data.getCostByEmployee.percentage}%.
            </Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Empleado Nº</TableCell>
                        <TableCell align="right">Edad</TableCell>
                        <TableCell align="right">Cantidad de Hijos</TableCell>
                        <TableCell align="right">Cobertura de Salud</TableCell>
                        <TableCell align="right">Cobertura Dental</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.getCostByEmployee.withPolicy.map((row, i) => (
                        <TableRow key={i+1}>
                            <TableCell component="th" scope="row">
                                {i+1}
                            </TableCell>
                            <TableCell align="right">{row.age}</TableCell>
                            <TableCell align="right">{row.childs}</TableCell>
                            <TableCell align="right">{`${row.coverageHealth} UF`}</TableCell>
                            <TableCell align="right">{`${row.coverageDental} UF`}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="h4" gutterBottom style={{marginTop: "25px"}}>
                Empleados sin Coberturas.
            </Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Empleado Nº</TableCell>
                        <TableCell align="right">Edad</TableCell>
                        <TableCell align="right">Cantidad de Hijos</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.getCostByEmployee.withoutPolicy.map((row, i) => (
                        <TableRow key={i+1}>
                            <TableCell component="th" scope="row">
                                {i+1}
                            </TableCell>
                            <TableCell align="right">{row.age}</TableCell>
                            <TableCell align="right">{row.childs}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
          </Grid> }
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          PolizApp
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Desarrollado con pasión con Tecnología de Calidad
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
export default Main;