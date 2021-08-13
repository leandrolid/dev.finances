import React, { useContext, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  makeStyles
} from '@material-ui/core/';
//import DeleteIcon from '@material-ui/icons/Delete';

import api from '../services/api';

import EnhancedTableHead from './tableHead';
import { EnhancedTableToolbar } from './tableToolbar';
import { TransactionsContext } from '../contexts/transactionsContext';
import transactionButton from '../assets/transaction-button.svg';
import styles from '../styles/loading.module.css';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: 'Roboto',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  paper: {
    width: '100%',
    maxWidth: 600,
    //marginBottom: theme.spacing(2),
    boxShadow: 'none',
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    //backgroundColor: '#ffffff'
  },
  table: {
    width: '100%',
    alignItems: 'left',
    borderSpacing: 10,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  lines: {
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  tableHeader: {
    backgroundColor: '#ffffff'
  },
  align: {
    textAlign: 'left',
  },
  outflows: {
    textAlign: 'left',
    color: '#db1d1d'
  },
  inflows: {
    textAlign: 'left',
    color: '#1ba332'
  },
  label: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  date: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  delete: {
    alignSelf: 'center',
    justifySelf: 'center',
    textAlign: 'right',
    backgroundColor: ' rgba(255, 255, 255, 0)',
    border: 'none',
    cursor: 'pointer',
    marginLeft: 10
  },
  transactionButton: {
    width: 15,
  }


}));

export default function EnhancedTable() {

  const classes = useStyles();
  const [order, setOrder] = useState('desc'); //asc
  const [orderBy, setOrderBy] = useState('date');
  // eslint-disable-next-line
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [shoudDisplayRows, setShoudDisplayRows] = useState(true);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const { tableUpdate, setTableUpdate } = useContext(TransactionsContext);

  const [incomes, setIncomes] = useState([]); //console.log(incomes)
  const [outcomes, setOutcomes] = useState([]); //console.log(outcomes)

  useEffect(() => {
    async function loadInflows() {
      const user_id = localStorage.getItem('user');
      const inflows = await api.get('/inflow', {
        headers: { user_id }
      });
      setIncomes(inflows.data);
      //console.log(Infows.data)            
    }
    loadInflows();
  }, [tableUpdate]);

  useEffect(() => {
    async function loadOutflows() {
      const user_id = localStorage.getItem('user');
      const outflows = await api.get('/outflow', {
        headers: { user_id }
      });
      setOutcomes(outflows.data);
      //console.log(outfows.data)
    }
    loadOutflows();
  }, [tableUpdate]);

  const allvalues = incomes.concat(outcomes);
  //console.log(allvalues)

  let [transaction, setTransaction] = useState('');

  async function handleDelete(event, allvalue) {
    event.preventDefault();
    event.target.innerHTML = `<div class="${styles.loader}"></div>`;

    const filter = allvalue;
    let { _id } = allvalue;
    transaction = _id;
    const added = incomes.map((income) => {
      const inflow = income;
      return inflow;
    });

    if (added.indexOf(filter) > -1) { //console.log('teste 1')  
      await api.put('/inflow', { transaction });
      setTableUpdate(tableUpdate + 1);

    } else {
      await api.put('/outflow', { transaction });
      setTableUpdate(tableUpdate + 1);
    }
  }

  useEffect(() => {
    if (incomes.length > 0 || outcomes.length > 0) {
      setShoudDisplayRows(true);
    } else {
      setShoudDisplayRows(false);
    }
  }, [incomes, outcomes]);

  return (
    <div className={classes.root} id="table-root" >
      <Paper className={classes.paper}>

        <EnhancedTableToolbar numSelected={selected.length} />


        <TableContainer >
          <Table
            className={classes.table}
            id="data-table"
            aria-labelledby="tableTitle"
            aria-label="enhanced table"


          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={allvalues.length}
              className={classes.tableHeader}
            />
            {
              shoudDisplayRows
                ? (
                  <TableBody>
                    {stableSort(allvalues, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((allvalue) => {
                        const isItemSelected = isSelected(allvalue._id);
                        const labelId = allvalue._id;
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={allvalue._id}
                            selected={isItemSelected}
                            className={classes.lines}
                            value={allvalue._id}
                          //onClick={(event) => handleClick(event, allvalue._id)}
                          >

                            <TableCell
                              component="td" id={labelId}
                              scope="row"
                              padding="default"
                              className={classes.align}
                            >
                              {allvalue.description ? allvalue.description : 'Adicione uma nova despesa ou receita'}
                            </TableCell>
                            <TableCell
                              align="right"
                              className={allvalue.type ? classes.inflows : classes.outflows}
                            >
                              {allvalue.type ? null : '-'}
                              {allvalue.price
                                ? allvalue.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                : 'R$ 0,00'
                              }
                            </TableCell>
                            <TableCell align="right" className={classes.date} >

                              <div className={classes.align} >{allvalue.date}</div>
                              <form
                                id="trash"
                                onSubmit={(event) => handleDelete(event, allvalue)}>
                                <button
                                  id={allvalue._id}
                                  value={allvalue._id}
                                  onClick={event => setTransaction(event.target.value)}
                                  className={classes.delete}
                                >
                                  <img
                                    src={transactionButton}
                                    alt="Remover"
                                    className={classes.transactionButton}
                                  />
                                </button>

                              </form>


                            </TableCell>

                          </TableRow>
                        );
                      })}
                  </TableBody>
                )
                : (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    className={classes.lines}
                  //onClick={(event) => handleClick(event, allvalue._id)}
                  >

                    <TableCell
                      component="td"
                      scope="row"
                      padding="default"
                      className={classes.align}
                    />
                    <TableCell
                      component="td"
                      scope="row"
                      padding="default"
                      className={classes.align}
                    >
                      Ainda não há transações por aqui.
                    </TableCell>
                    <TableCell
                      component="td"
                      scope="row"
                      padding="default"
                      className={classes.align}
                    />
                  </TableRow>
                )
            }

          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={allvalues.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          className={classes.lines}
          alt="Linhas"
          value="Linhas"
          placeholder="Linhas"
        />
      </Paper>

    </div>
  );
}
