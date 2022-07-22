import React from'react'
import CurrentWeather from "./CurrentWeather";

class App extends React.Component{
  render(){
    return(<div className={'app'}>
        <CurrentWeather/>

    </div>)
  }
}

export default App;
