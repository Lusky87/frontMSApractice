import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FormControl, InputLabel, Input} from '@mui/material';

class Number extends Component {
    
    render() {
        return (
            <div style={{'width':'100%'}}>
                {this.props.editMode?
                <div style={{'width':'100%'}}>
                    <FormControl variant="standard" sx={{width:'100%'}}>
                        <InputLabel htmlFor="component-simple">{this.props.label}</InputLabel>
                        <Input name={this.props.name?this.props.name:""} value={this.props.value} onChange={this.props.onChange} style={{'width':'100%'}}/>
                    </FormControl>
                </div>
                :(`${this.props.label} : ${this.props.value}`)}
            </div>
        );
    }
}

Number.defaultProps = {
    editMode: false,
    label: "",
    value: 0
}
Number.propTypes = {
    editMode: PropTypes.bool,
    name: PropTypes.string,
    label : PropTypes.string,
    value : PropTypes.number
};


export default Number;