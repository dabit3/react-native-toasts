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
  Animated
} from 'react-native';

class toasts extends Component {

  constructor(props) {
    super(props)
    this.animatedValue = new Animated.Value(-100)
  }

  componentDidMount() {
    this.setState({
      toastShown: false
    })
  }

  callToast() {
    if(this.state.toastShown) return
    this.setState({
      toastShown: true
    })
    Animated.timing(
      this.animatedValue,
      { 
        toValue: 0,
        duration: 350
      }).start(this.closeToast())
  }
  
  closeToast() {
    setTimeout(() => {
      Animated.timing(
      this.animatedValue,
      { 
        toValue: -100,
        duration: 350
      }).start()
      this.setState({
        toastShown: false
      })
    }, 2000)
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
        
          <View style={ styles.buttonContainer }>
            <TouchableHighlight onPress={ () => this.callToast() } underlayColor="ddd" style={{ height:60, justifyContent: 'center', alignItems: 'center', backgroundColor: 'ededed', borderWidth: 1, borderColor: 'ddd' }}>
              <Text>Open Toast</Text>
            </TouchableHighlight>
          </View>
          
        </View>
        <Animated.View style={{ transform: [{ translateY: this.animatedValue }], height: 70, backgroundColor: 'green', position: 'absolute', left:0, top:0, right:0, justifyContent: 'center' }}>
          <Text style={{ marginLeft: 10, color: 'white', fontSize:16 }}>Success!</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    marginTop:100
  }
});

AppRegistry.registerComponent('toasts', () => toasts);
