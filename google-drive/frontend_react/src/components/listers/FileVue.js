import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import sharedComponent from '../../react-entry';
// import FileCards from 'app2/Button';
// const RemoteButton = React.lazy(() => import('app2/Button'));
// const RemoteButton2 = React.lazy(() => import('remote_vue/FileCards'));
class FileVue extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        
        return (
            <div>
                <React.Suspense fallback="Loading Button">
                    {/* <RemoteButton /> */}
                    {/* <RemoteButton2 /> */}
                </React.Suspense>
            </div>
        )
    }

};

export default FileVue; 