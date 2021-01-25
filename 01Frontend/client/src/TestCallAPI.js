import React, { Component } from 'react';


class TestCallAPI extends React.Component {

    constructor(props) {
        super(props)
        this.state = {apiResponse:""};
        this.callAPI()
    }
    
    callAPI() {
        fetch("http://localhost:9000/testAPI")
        .then (res => res.text())
        .then (res => this.setState({apiResponse: res}))
    }


    render() {
        return (
            <div>
                <p>{this.state.apiResponse}</p>
            </div>
        );
    }
}

// const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

// export default Form.create()(WrappedNormalLoginForm);



export default TestCallAPI;