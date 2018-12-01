import React, {Component} from 'react';
import { Card, CardSection, Input, Button, Spinner } from './common';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import { emailChanged, passChanged, loginUser } from '../actions';

class LoginForm extends Component {
  
  onEmailChange(text) {
    this.props.emailChanged(text);
  }
  onPassChange(text) {
    this.props.passChanged(text);
  }

  onButtonPress() {
      const {email, pass} = this.props;
      this.props.loginUser({email, pass});
  }

  renderError() {
      if (this.props.error) {
          return (
            <View style={{backgroundColor: 'white'}}>
            <Text style={styles.errorTextStyle}>
                {this.props.error}
            </Text>
            </View>
          );
      }
  }

  renderButton() {
      if(this.props.loading) {
          return <Spinner size='large' />;
      } else {
      return <Button onPress={this.onButtonPress.bind(this)}>Login</Button>;
      }
  }

  render() {
    return (
      <React.Fragment>
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholders="email@gmail.com"
            onChangeTexts={this.onEmailChange.bind(this)}
            values={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholders="password"
            onChangeTexts={this.onPassChange.bind(this)}
            values={this.props.pass}
          />
        </CardSection>

        {this.renderError()}

        <CardSection>
        {this.renderButton()}
        </CardSection>
      </Card>
      </React.Fragment>
    );
  }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

function mapStateToProps({auth}) {
 return {
     email: auth.email,
     pass: auth.pass,
     error: auth.error,
     loading: auth.loading
};
}

export default connect(mapStateToProps, {emailChanged, passChanged, loginUser})(LoginForm);