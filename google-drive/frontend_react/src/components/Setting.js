import React from 'react'
import { lazy } from 'react';
import axios from 'axios'
import String from './primitives/String'
import Number from './primitives/Number'
import {Stack, Button, InputLabel, Select, MenuItem, FormControl, FormHelperText} from '@mui/material'


class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedComponent:"",
            componentList:["string"],
        }
    }

    edit = (bool) => {
        this.props.handleProps("editMode",bool, this.props.keyIndex);
    }
    onChange = (e, i) => {
        console.log(e,i);
        this.state.selectedComponent = e.target.value;
        this.state.componentList.push(e.target.value);
    }
    render(){
        const titleStyle = { marginLeft:"4%", marginTop:"10px" };
        const me = this.props.propObj;
        const stringTmpl = (<String name="name" label={"Name"} onChange={this.props.change} value={me.name?me.name:""} editMode={me.editMode}/>);
        const numberTmpl = (<Number name="size" label={"Size"} onChange={this.props.change} value={me.size?me.size:0} editMode={me.editMode}/>);
        return (
            <div>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <h1 style={titleStyle}>Setting</h1>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">Component-Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={this.state.selectedComponent}
                            label="componentType"
                            onChange={this.onChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="string">String</MenuItem>
                            <MenuItem value="number">Number</MenuItem>
                        </Select>
                        <FormHelperText>Select component Type</FormHelperText>
                    </FormControl>
                    {this.state.componentList.map(function (component,i) {
                        console.log("component",component,i);
                        return (component==="string"?<string-tmpl key={i}/>:"")
                    })}
                    <Button variant="contained">Apply</Button>
                </Stack>
            </div>
        )}
}

export default Setting;