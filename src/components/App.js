import React from'react'

import CurrentWeather from "./CurrentWeather";

import { Route } from 'react-router-dom';

class App extends React.Component{
  render(){
    return(<div className={'app'}>

            {/*<Route path='/' component={CurrentWeather}/>*/}
        <CurrentWeather/>

    </div>)
  }
}

export default App;
