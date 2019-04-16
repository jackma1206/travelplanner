import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

const Header = () => <h2>Header</h2>
const Dashboard = () => <h2>Dashboard</h2>
const TripNew = () => <h2>TripNew</h2>
const Landing = () => <h2>Landing</h2>

class App extends Component {
    render(){
        return(
            <div>
                <BrowserRouter>
                    <div>
                        <Header/>
                        <Route path="/" exact component={Landing}/>
                        <Route path="/dashboard" exact component={Dashboard}/>
                    </div> 
                </BrowserRouter>
            </div>
        )
    }
}

export default App;