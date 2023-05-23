import React from 'react'
import axios from 'axios'
import String from './primitives/String'
import Number from './primitives/Number'
import {Stack, Button, Card, Container, CardHeader, CardContent, Typography, 
    Snackbar, SnackbarContent, Alert, CardActions, IconButton, Grid} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';


class File extends React.Component {
  constructor(props) {
    super(props);
    // const axios = require('axios').default;
    // console.log("File Constuctor" ,this.props);
    this.state = {
        snackbar: {
            status: false,
            timeout: 5000,
            type: "success",
            text: '삭제하였습니다.'
        },
    }
  }

  selectFile(){
    if(this.props.editMode === false) {
        return false;
    }
    var me = this
    var input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.id = "uploadInput";
    
    input.click();
    input.onchange = function (event) {
        var file = event.target.files[0]
        var reader = new FileReader();

        reader.onload = function () {
            var result = reader.result;
            me.imageUrl = result;
            me.value.photo = result;
            
        };
        reader.readAsDataURL( file );
    };
  }

  edit = (bool) => {
    this.props.handleProps("editMode",bool, this.props.keyIndex);
  }

  save = async() =>{
    try {
        let temp = null;
        if(!this.props.offline) {
            if(this.props.isNew) {
                temp = await axios.post(axios.fixUrl('/files'), this.props.value)
            } else {
                temp = await axios.put(axios.fixUrl(this.props.value._links.self.href), this.props.value);
            }
        }

        // if(this.props.value) {
        //     for(let k in temp.data) this.props.value[k]=temp.data[k];
        // } else {
            // this.value = temp.data;
        this.props.handleProps("value",temp.data);
        // }
        if (this.props.keyIndex && this.props.keyIndex !== 0) {
            this.props.handleProps("editMode",false, this.props.keyIndex);
        } else {
            this.props.handleProps("editMode",false);
        }
        // this.editMode = false;
        this.props.handleProps("input", this.props.value);
        // this.$emit('input', this.value);

        if (this.props.isNew) {
            this.props.add(this.props.value);
            // this.$emit('add', this.value);
        } else {
            this.props.edit();
            // this.$emit('edit', this.value);
        }
        // this.setState({snackbar: { ...this.state.snackbar, status : true, text: "Success!!"} });
        window.location.reload()

    } catch(e) {
        if(e.response && e.response.data.message) {
            this.setState({snackbar: { ...this.state.snackbar, status : true, text: e.message} });
            // this.snackbar.text = e.response.data.message
        } else {
            this.setState({snackbar: { ...this.state.snackbar, status : true, text: e.message} });
            // this.snackbar.text = e
        }
    }
    
  }
 remove = async() => {
    try {
        if (!this.props.offline) {
            await axios.delete(axios.fixUrl(this.props.value._links.self.href))
        }

        this.props.handleProps("editMode",false, this.props.keyIndex);
        this.props.handleProps("isDeleted",true, this.props.keyIndex);
        // this.isDeleted = true;
        this.props.delete(this.props.value);
        // this.$emit('input', this.value);
        // this.$emit('delete', this.value);

    } catch(e) {
        // this.snackbar.status = true
        if(e.response && e.response.data.message) {
            this.setState({snackbar: { ...this.state.snackbar, status : true, text: e.message} });
            // this.snackbar.text = e.response.data.message
        } else {
            this.setState({snackbar: { ...this.state.snackbar, status : true, text: e.message} });
            // this.snackbar.text = e
        }
    }
  }
  
   deleteFile = async () => {
      try {
          if(!this.props.offline) {
              let temp = await axios.put(axios.fixUrl(this.props.value._links['delete'].href))
              console.log(temp.data.status,this.props.keyIndex);
              this.props.handleProps("status",temp.data.status, this.props.keyIndex)
          }
          this.props.handleProps("editMode",false, this.props.keyIndex);
      } catch(e) {
          if(e.response && e.response.data.message) {
            this.setState({snackbar: { ...this.state.snackbar, status : true, text: e.response.data.message} });
          } else {
            this.setState({snackbar: { ...this.state.snackbar, status : true, text: e} });
          }
      }
  }
render(){
    const card = (
        <React.Fragment>
            <CardHeader
                title={
                            this.props.value && this.props.value._links?
                                <Typography variant="h5" component="div">
                                    File # {this.props.value._links.self.href.split("/")[this.props.value._links.self.href.split("/").length - 1]}
                                </Typography>:
                                <Typography variant="h5" component="div">
                                    File 
                                </Typography> 
                    }
            />
            
          <CardContent sx={{ width: '100%' }}>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <String name="name" label={"Name"} onChange={this.props.onChange} value={this.props.value.name?this.props.value.name:""} editMode={this.props.editMode}/>
                <String name="type" label={"Type"} onChange={this.props.onChange}  value={this.props.value.type?this.props.value.type:""} editMode={this.props.editMode}/>
                <Number name="size" label={"Size"} onChange={this.props.onChange} value={this.props.value.size?this.props.value.size:0} editMode={this.props.editMode}/>
                <String name="status" label={"Status"} onChange={this.props.onChange} value={this.props.value.status?this.props.value.status:""} editMode={this.props.editMode}/>  
            </Typography>
          </CardContent>
          <CardActions>
              <Grid container sx={{display:'relative'}}>
                  <Grid item xs />
                  <Grid item>
                    {!this.props.editMode?<Button onClick={()=>this.edit(true)} size="small">Edit</Button>:""}
                    {this.props.editMode?<Button onClick={this.save} size="small">Save</Button>:""}
                    {!this.props.editMode?<Button onClick={this.remove} size="small">Delete</Button>:""}
                    {this.props.editMode && !this.props.isNew?<Button onClick={()=>this.edit(false)} size="small">Cancel</Button>:""}
                  </Grid>
              </Grid>
          </CardActions>
          {!this.props.editMode?
              <CardActions>
                <Grid container sx={{display: 'relative'}}>
                    <Grid item xs/>
                    <Grid item>
                        {!this.props.editMode ? <Button onClick={this.deleteFile} size="small">Delete</Button> : ""}
                    </Grid>
                </Grid>
            </CardActions>:""}
          <Snackbar open={this.state.snackbar.status} autoHideDuration={this.state.snackbar.timeout} maxSnack={3} onClose={()=>this.setState({snackbar: { ...this.state.snackbar, status : false}})}>
                <Alert onClose={this.props.handleClose} severity={this.state.snackbar.type} sx={{ width: '100%' }}>
                    {this.state.snackbar.text}
                    <Button onClick={this.props.handleClose}>
                        Close
                    </Button>
                </Alert>
            </Snackbar>
        </React.Fragment>
      );
  return (
    <div>
        <Container sx={{ minWidth: '450px', width:'100%' }}>
            <Card style={{maxWidth:"100%"}} variant={this.props.keyIndex>=0?"outlined":""}>{card}</Card>
        </Container>
    </div>
  )}
}

export default File;