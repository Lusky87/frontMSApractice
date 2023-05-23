import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FormControl, InputLabel, Input} from '@mui/material';

class String extends Component {

    render() {
        return (
            <div style={{'width':'100%'}}>
                {this.props.editMode?
                <div style={{'width':'100%'}}>
                    <FormControl variant="standard" sx={{width:'100%'}}>
                        <InputLabel htmlFor="component-simple">{this.props.label}</InputLabel>
                        <Input name={this.props.name?this.props.name:""} value={this.props.value} onChange={this.props.onChange} fullWidth/>
                    </FormControl>
                </div>
                :(`${this.props.label} : ${this.props.value}`)}
            </div>
        );
    }
}

String.defaultProps = {
    editMode: false,
    label: "",
    value: {type: String, default: ''}
}
String.propTypes = {
    editMode: PropTypes.oneOfType([PropTypes.bool]),
    name: PropTypes.string,
    label : PropTypes.string,
    value : PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array])
};

export default String;