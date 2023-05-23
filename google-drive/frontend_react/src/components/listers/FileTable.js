import React, { Component } from 'react';
import axios from "axios";
import {Dialog, Grid, IconButton, SpeedDial, SpeedDialIcon, Stack, TablePagination,
    Paper, Table, TableHead ,TableRow, TableContainer, TableBody, TableCell} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import File from "../File";
import CloseIcon from "@mui/icons-material/Close";

class FileTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            headers:
                [
                    { field: "id", headerName: "id", width:100, sortable: true,type: 'number', headerAlign: 'center',},
                    { field: "name", headerName: "name", width:100, sortable: true,headerAlign: 'center',},
                    { field: "type", headerName: "type", width:100, sortable: true,headerAlign: 'center', },
                    { field: "size", headerName: "size", width:100, sortable: true,type: 'number', },
                    { field: "status", headerName: "status", width:100, sortable: true,headerAlign: 'center', }
                ],
            values: [],
            newValue: {},
            page:1,
            rowsPerPage:5,
            offline:false,
            tick : true,
            editMode: true,
            openDialog : false,
        }
    }

    async componentDidMount () {
        let me = this.props;
        if(this.state.offline){
            if(!me.values) me.values = [];
            return;
        }

        let temp = await axios.get(axios.fixUrl('/files'));
        temp = temp.data._embedded.files.map(obj => {
            return { ...obj, id:obj._links.self.href.split("/")[obj._links.self.href.split("/").length - 1] }
        });
        this.setState({
            ...this.state,
            values: temp,
            newValue: {
                'name': '',
                'type': '',
                'size': 0,
                'status': ''
            }
        });
    }
    descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => this.descendingComparator(a, b, orderBy)
            : (a, b) => -this.descendingComparator(a, b, orderBy);
    }

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
    stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }
    handleChange = ({target}) => {
        console.log("String change", target );
        // this.setState({ newValue: {...this.state.newValue,[target.name]:target.value} });
        this.setState((state) => {
            return {...state, newValue: {...state.newValue,[target.name]:target.value}}
        });
    }
    handleProps = (name, value, index) => {
        if (index >= 0) {
            // console.log(name, value, index, this.state.values);
            this.setState((state) => {
                return {...state, values: this.state.values.map((el,i)=>i===index?{...el, [name]:value}:el)}
            });
        } else {
            this.setState({ [name]: value });
        }
    }
    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    }
    handleChangeRowsPerPage = (event) => {
        // this.setRowsPerPage(+event.target.value);
        this.setState({page: 0, rowsPerPage:event.target.value});
    }
    handleClose = (props) => {
        this.setState({ open: false });
    }
    handleOpen = (props) => {
        this.setState({ open: true });
    }
    append = (value) => {
        this.setState({...this.state, tick: false,editMode:true, newValue:{}, values:this.state.values.push(value)});
        this.handleClose();
        // this.$emit('input', this.values);
        // this.$nextTick(function(){
        //     this.tick=true
        // })
    }
    edit = () => {
        this.setState({ editMode: true });
    }

    render() {
        const { headers, values} = this.state;
        return (
            <div>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    sx={{width:'100%'}}
                    spacing={2}
                >
                    <Paper sx={{ width: '100%', overflow: 'hidden', height: 400, }}>
                        <DataGrid
                            rows={values}
                            columns={headers}
                            pageSize={this.state.rowsPerPage}
                            rowsPerPageOptions={[5,10,15]}
                        >
                        </DataGrid>
                    </Paper>
                </Stack>
                <SpeedDial
                    ariaLabel="SpeedDial controlled open example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                    onClick={this.handleOpen}
                    open={this.state.open}
                />
                <Dialog
                    fullScreen
                    fullWidth={false}
                    maxWidth={false}
                    open={this.state.open}
                    onClose={this.handleClose}
                    // TransitionComponent={Transition}
                >
                    <Grid container sx={{display:'relative'}}>
                        <Grid item xs>
                            {<File offline={this.state.offline} isNew={true} editMode={this.state.editMode} value={this.state.newValue} onChange={this.handleChange}
                                   handleProps={this.handleProps} add={this.append} edit={this.edit} handleClose={this.handleClose} />}
                        </Grid>
                        <Grid>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={this.handleClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Dialog>
            </div>
        );
    }
}
export default FileTable;