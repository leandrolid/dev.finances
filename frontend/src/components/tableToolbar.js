import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
    Toolbar,
    Typography,
    lighten,
    makeStyles
} from '@material-ui/core/';

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

export const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    // const { numSelected } = props;

    return (
        <Toolbar
            className={clsx(classes.root)}
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