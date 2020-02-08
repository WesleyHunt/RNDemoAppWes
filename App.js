import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen'
import QuestionOneScreen from './src/screens/QuestionOneScreen'
import QuestionTwoScreen from './src/screens/QuestionTwoScreen'

const navigator = createStackNavigator({
    HomeScreen: HomeScreen,
    QuestionOneScreen: QuestionOneScreen,
    QuestionTwoScreen: QuestionTwoScreen
  },
  {
    initialRouteName: 'HomeScreen',
    defaultNavigationOptions: {
      title: 'Wes App'
    }
  }
)

export default createAppContainer(navigator)