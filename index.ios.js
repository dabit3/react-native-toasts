/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Animated,
  Dimensions
} from 'react-native';

let windowWidth = Dimensions.get('window').width
let windowHeight = Dimensions.get('window').height

class toasts extends Component {

  constructor(props) {
    super(props)
    this.state = {
      toastShown: false,
      toastColor: 'green',
      message: ''
    }
    this.animatedYValue = new Animated.Value(-70),
    this.animatedXValue = new Animated.Value(-windowWidth)
  }

  callToast(type, message) {
    if(this.state.toastShown) return
    this.setToastType(type, message)
    this.setState({ toastShown: true })
    Animated.timing(
      this.animatedYValue,
      { 
        toValue: 0,
        duration: 350
      }).start(this.closeToast())
  }
  
  closeToast() {
    setTimeout(() => {
      Animated.timing(
      this.animatedYValue,
      { 
        toValue: -70,
        duration: 350
      }).start()
      this.setState({
        toastShown: false
      })
    }, 2000)
  }

  callXToast() {
    Animated.timing(
      this.animatedXValue,
      { 
        toValue: 0,
        duration: 350
      }).start(this.closeXToast())
  }

  closeXToast() {
    setTimeout(() => {
      Animated.timing(
      this.animatedXValue,
      { 
        toValue: -windowWidth,
        duration: 350
      }).start()
      this.setState({
        toastShown: false
      })
    }, 2000)
  }

  setToastType(type='success', message="Success!") {
    let color
    if (type == 'error') color = 'red'
    if (type == 'primary') color = '#2487DB'
    if (type == 'warning') color = '#ec971f'
    if (type == 'success') color = 'green'
    this.setState({ toastColor: color, message: message })
  }

  render() {

    let { message } = this.state

    return (
      <View>
        <View style={styles.container}>
        
          <View style={ styles.buttonContainer }>
            <TouchableHighlight onPress={ () => this.callToast() } underlayColor="ddd" style={{ height:60, justifyContent: 'center', alignItems: 'center', backgroundColor: 'ededed', borderWidth: 1, borderColor: 'ddd' }}>
              <Text>Open Success Toast</Text>
            </TouchableHighlight>
          </View>

          <View style={ styles.buttonContainer }>
            <TouchableHighlight onPress={ () => this.callToast('error', 'Error toast called!') } underlayColor="ddd" style={{ height:60, justifyContent: 'center', alignItems: 'center', backgroundColor: 'ededed', borderWidth: 1, borderColor: 'ddd' }}>
              <Text>Open Error Toast</Text>
            </TouchableHighlight>
          </View>

          <View style={ styles.buttonContainer }>
            <TouchableHighlight onPress={ () => this.callToast('warning', 'Warning toast called!') } underlayColor="ddd" style={{ height:60, justifyContent: 'center', alignItems: 'center', backgroundColor: 'ededed', borderWidth: 1, borderColor: 'ddd' }}>
              <Text>Open Warning Toast</Text>
            </TouchableHighlight>
          </View>

          <View style={ styles.buttonContainer }>
            <TouchableHighlight onPress={ () => this.callToast('primary', 'Primary toast called!') } underlayColor="ddd" style={{ height:60, justifyContent: 'center', alignItems: 'center', backgroundColor: 'ededed', borderWidth: 1, borderColor: 'ddd' }}>
              <Text>Open Primary Toast</Text>
            </TouchableHighlight>
          </View>

          <View style={ styles.buttonContainer }>
              <TouchableHighlight onPress={ () => this.callXToast() } underlayColor="ddd" style={{ height:60, justifyContent: 'center', alignItems: 'center', backgroundColor: 'ededed', borderWidth: 1, borderColor: 'ddd' }}>
                <Text>Open X Toast Toast</Text>
              </TouchableHighlight>
            </View>
        </View>
        <Animated.View style={{ transform: [{ translateY: this.animatedYValue }], height: 70, backgroundColor: this.state.toastColor, position: 'absolute', left:0, top:0, right:0, justifyContent: 'center' }}>
          <Text style={{ marginLeft: 10, color: 'white', fontSize:16, fontWeight: 'bold' }}>{ message }</Text>
        </Animated.View>

        <Animated.View style={{ transform: [{ translateX: this.animatedXValue }], height: 70, marginTop: windowHeight - 70, backgroundColor: 'green', position: 'absolute', left:0, top:0, width: windowWidth, justifyContent: 'center' }}>
          <Text style={{ marginLeft: 10, color: 'white', fontSize:16, fontWeight: 'bold', textAlign: 'center' }}>Success!</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70
  },
  buttonContainer: {
    marginTop:10
  }
});

AppRegistry.registerComponent('toasts', () => toasts);
