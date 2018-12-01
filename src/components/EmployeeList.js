import React, {Component} from 'react';
import {View, Text, ListView} from 'react-native';
import {connect}  from 'react-redux';
import {employeesFetch} from '../actions';
import {Spinner} from './common';
import _ from 'lodash';
import ListItem from './ListItem';

class EmployeeList extends Component {
    componentWillMount() {
        if(!this.props.employeesFetch()) {
        this.createDataSource(this.props);
        }
    }
    
    componentWillReceiveProps(nextProps) {
        // nextProps are the next set of props that this component will render with
        // this.props is still with old set of props
        this.createDataSource(nextProps);
        
    }

    



  createDataSource({employees}) {
      const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
      });

      this.state = {
          dataSource: ds.cloneWithRows(employees)
      }; 
    }

  renderRows(employee) {
      console.log(employee);
      return <ListItem employee={employee}></ListItem>;
  }
    render() {
        // console.log(this.props.employee);
        if (!this.props.employees.length) {
            return (
                <View>
                    <Spinner></Spinner>
                    <Text>Updating records..</Text>
                </View>
            );
        }
        return (
            
            <ListView
            enableEmptySections
            dataSource={this.state.dataSource}
            renderRow={this.renderRows}>
            </ListView>
        
        );
    }
}

const mapStateToProps = (state) => {
    const employees = _.map(state.employees, (val, uid) => {
        return {...val , uid}; // {shift: 'Monday', name:'Adnan'}
    });
    return { employees };
}

export default connect(mapStateToProps, {employeesFetch})(EmployeeList);