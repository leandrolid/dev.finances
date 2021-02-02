import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  //IconButton,
  //Tooltip,
  lighten, makeStyles } from '@material-ui/core/';
//import DeleteIcon from '@material-ui/icons/Delete';


import api from '../../services/api';


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

const headCells = [
  { id: 'description', numeric: false, disablePadding: false, label: 'Descrição' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Valores' },
  { id: 'date', numeric: false, type: 'date' , disablePadding: false, label: 'Datas' },
];

function EnhancedTableHead(props) {
  // eslint-disable-next-line
  const { classes, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={classes.tableHeader} >
      <TableRow>
        
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              className={classes.label}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  highlight: {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
  },
  title: {
    flex: '1 1 100%',
    fontFamily: 'Roboto',    
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  // const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root )}
    >
      
      {
      //numSelected > 0 ? (
      // <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
      //    {numSelected} {numSelected === 1 ? 'transação' : 'transações'}
      //  </Typography>
      //) : null 
    }

        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Transações
        </Typography>

    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: 'Roboto',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems : 'center',
    justifyContent : 'center',
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
  tableHeader:{
    backgroundColor: '#ffffff'
  },
  align: {
    textAlign:'left',
  },
  outflows: {
    textAlign:'left',
    color: '#db1d1d'
  },
  inflows: {
    textAlign:'left',
    color: '#1ba332'
  },
  label:{
    fontFamily:'Roboto',
    fontWeight: 'bold',
  },
  date: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  delete: {
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
    textAlign: 'right'
  }


}));

export default function EnhancedTable() {

    const [ incomes, setIncomes ] = useState([])
    const [ outcomes, setOutcomes ] = useState([])
 
    //console.log(incomes)
    //console.log(outcomes)

    useEffect(() => {
        async function loadInflows(){
            const user_id = localStorage.getItem('user')
            const inflows = await api.get('/inflow', {
                headers: { user_id }
            })            
            setIncomes(inflows.data);            
            //console.log(Infows.data)            
        }
        loadInflows()
    }, [])

    useEffect(() => {
        async function loadOutflows(){
            const user_id = localStorage.getItem('user')
            const outflows = await api.get('/outflow', {
                headers: { user_id }
            })            
            setOutcomes(outflows.data);            
            //console.log(outfows.data)            
        }
        loadOutflows()
    }, [])

    const allvalues = incomes.concat(outcomes)
    //console.log(allvalues)


  const classes = useStyles();
  const [order, setOrder] = useState('desc'); //asc
  const [orderBy, setOrderBy] = useState('date');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = allvalues.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

/*
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };
  */

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  //const emptyRows = rowsPerPage - Math.min(rowsPerPage, incomes.length - page * rowsPerPage);

  const [del, setDel ] = useState( {} );

  async function handleDelete(event, allvalue) {
    
    const filter = allvalue
    //console.log(filter)
    
    const added = incomes.map( (income) => { 
      const inflow = income
      return inflow
      
    })
    
    //console.log(added)
    
    const removed = outcomes.map( (outcome) => { 
      const outflow = outcome
      return outflow
      
    })
    
    //console.log(removed)



    if ( added.indexOf(filter) > -1){ //console.log('teste 1')  
    console.log('entrada')
    console.log(filter)
    
    //await api.delete('/inflow', { filter })

    //window.location.reload(false);
  
  } else{
    
    //const transaction = {transaction: del} 

    console.log('saída')
    

    await api.delete('/outflow',  {del} )
    console.log({del})
    //window.location.reload(false);
  }

}



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
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={allvalues.length}
              className={classes.tableHeader}
            />
            <TableBody>
              {stableSort(allvalues, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((allvalue ) => {

                  const isItemSelected = isSelected(allvalue._id);
                  const labelId = allvalue._id


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
                        component="th" id={labelId} 
                        scope="row" 
                        padding="default"
                        className={classes.align}
                        >
                        {allvalue.description}
                      </TableCell>
                      <TableCell align="right" 
                      className={ allvalue.type ? classes.inflows : classes.outflows} >
                        { allvalue.type ? null : '-'}
                        R$ {allvalue.price},00</TableCell>
                      <TableCell align="right" className={classes.date} >

                        <div className={classes.align} >{allvalue.date}</div>
                        <form 
                        onSubmit={(event) => handleDelete(event, allvalue)}>

                          <button
                          id={allvalue._id}
                          onClick={ event => setDel(event.target.id) }
                          className={classes.delete} 
                          
                          >[X]</button> 

                        </form>
                        

                      </TableCell>
                      
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={ allvalues.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          className={classes.lines}
        />
      </Paper>
      
    </div>
  );
}
