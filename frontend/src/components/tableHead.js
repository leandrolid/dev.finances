import PropTypes from 'prop-types';
import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from '@material-ui/core/';


export default function EnhancedTableHead(props) {
    // eslint-disable-next-line
    const { classes, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const headCells = [
        { id: 'description', numeric: false, disablePadding: false, label: 'Descrição' },
        { id: 'price', numeric: true, disablePadding: false, label: 'Valores' },
        { id: 'date', numeric: false, type: 'date', disablePadding: false, label: 'Datas' },
    ];

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
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};
