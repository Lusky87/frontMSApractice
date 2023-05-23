import React, { Component } from 'react';
import axios from 'axios';
import {Button, Card, Box, CardContent, Typography, CardActions} from '@mui/material'
import { useParams } from 'react-router-dom';

class FileDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: null,
            editMode: false,
        }
        var me = this;
        var {id} = useParams;
        var temp = axios.get(axios.fixUrl('files/'+ id))
        if (temp.data) {
            me.item = temp.data
        }
    }
    goList() {
        var path = window.location.href.slice(window.location.href.indexOf("/#/"), window.location.href.lastIndexOf("/#"));
        path = path.replace("/#/", "/");
        this.$router.push(path);
    }
    edit() {
        this.editMode = true;
    }
    async remove(){
        try {
            if (!this.offline) {
                await axios.delete(axios.fixUrl(this.item._links.self.href))
            }

            this.editMode = false;

            this.$emit('input', this.item);
            this.$emit('delete', this.item);

        } catch(e) {
            console.log(e)
        }
    }
    render() {
        const card = (
            <React.Fragment>
              <CardContent>
                <Typography variant="h5" component="div">
                    File # {this.props.item._links.self.href.split("/")[this.props.item._links.self.href.split("/").length - 1]}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  
                </Typography>
              </CardContent>
              <CardActions>
                {this.state.editMode?<Button onClick={this.edit()} size="small">Edit</Button>:""}
                {this.state.editMode?<Button onClick={this.save} size="small">Save</Button>:""}
                {!this.state.editMode?<Button onClick={this.remove()} size="small">Delete</Button>:""}
                {this.state.editMode?<Button onClick={this.setState({...this.state, editMode:false})} size="small">Cancel</Button>:""}
              </CardActions>
            </React.Fragment>
          );
        return (
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">{card}</Card>
            </Box>
        );
    }
}

FileDetail.propTypes = {

};

export default FileDetail;