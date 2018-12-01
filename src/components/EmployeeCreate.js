import React, {Component} from 'react';
import { Card, CardSection, Input, Button} from './common';
import {Picker, Text} from 'react-native';
import { connect } from 'react-redux';
import {employeeUpdate, employeeCreate} from '../actions/EmployeeActions';
import EmployeeForm from './EmployeeForm';


class EmployeeCreate extends Component {

  onButtonPress() {
    const {name, phone, shift} = this.props;
    this.props.employeeCreate({name, phone, shift: shift || 'Monday'});
  }

    render() {
        return <Card>
            <EmployeeForm {...this.props} />
            <CardSection>
              <Button onPress={this.onButtonPress.bind(this)}>Add</Button>
            </CardSection>
          </Card>
    }
}



const mapStateToProps = ({ employeeForm }) => {
    const { name, phone, shift } = employeeForm;
    return {name, phone, shift};
}

export default connect(mapStateToProps, {employeeUpdate, employeeCreate})(EmployeeCreate);