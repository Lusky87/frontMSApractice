import React, { Component } from 'react';
import axios from "axios";
import {Dialog, Grid, IconButton, SpeedDial, SpeedDialIcon, Stack,
        List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography} from "@mui/material";
import File from "../File";
import CloseIcon from "@mui/icons-material/Close";

class FileList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            values: [],
            newValue: {},
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
        this.setState({
            ...this.state,
            values: temp.data._embedded.files,
            newValue: {
                'name': '',
                'type': '',
                'size': 0,
                'status': ''
            }
        });
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
    closeDialog = () => {
        this.state.setState({...this.state, openDialog: false});
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
        return (
            <div>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                        {this.state.values.map((data, n)=>{
                            return (
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar src={data.photo ? data.photo:'https://cdn.vuetifyjs.com/images/cards/cooking.png'} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline',fontSize:'25px', fontWeight:700 }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    [ Id :  {data.id}  ]
                                                    [ Name : {data.name}  ]
                                                    [ Type :  {data.type}  ]
                                                    [ Size :  {data.size}  ]
                                                    [ Status :  {data.status}  ]
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            )
                        })}
                    </List>
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
export default FileList;