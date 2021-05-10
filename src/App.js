// importing all componenets
import React, { Component } from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import apiKey from './config';
import NotFound from './Components/NotFound';
import SearchForm from './components/Search';
import Nav from './Components/Nav';
import Photo from './Components/Photo';
import NoPage from './Components/NoPage';

//Initializing state with app class component

class App extends Component {
  state = {
    photos: [],
    oceans: [],
    sunrises: [],
    wolves: [],
    title: '',
    isLoading: true
  };

componentDidMount() {
  this.searchTag();
  this.searchTag('oceans');
  this.searchTag('sunrises');
  this.searchTag('wolves');
}

searchTag = (tag) => {
  fetch()
    .then(res => res.json())
    .then(response => {
      if(tag === 'oceans'){
        this.setState({
          oceans: response.photos.photos,
          loading: false
        })
      } else if (tag === 'sunrises') {
        this.setState({
          sunrises: response.photos.photo,
          loading: false
        }) 
      } else if (tag === 'wolves') {
          this.setState({
            photos: response.photos.photo,
            title: tag,
            loading: false
          })
        }
        })
      .catch(error => {
        console.log('Error collecting data', error);
      });
      }




// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

manageLoading = (indicator) => {
  this.setState({loading: indicator});
}

render () {
  return(
    <BrowserRouter>
      <SearchForm onSearch={this.performSearch} tag={this.state.title} setLoading={this.manageLoading}/>
      <Nav/>
      <Switch>
        <Route exact path='/' render= { () =>
         <Redirect to="/oceans"/>} />
        <Redirect from="/search/oceans" to="/oceans"/>
        <Route exact path='/oceans' render={ () =>
         <PhotoContainer data={this.state.oceans} title='Oceans' loading={this.state.loading} onSearch={() => this.performSearch} />} />

        <Redirect from="/search/sunrises" to="/sunrises"/>
        <Route exact path='/sunrises' render={ () => <PhotoContainer 
          data={this.state.sunrises} title='Sunrises' loading={this.state.loading} onSearch={ () => this.performSearch}/>} />

        <Redirect from="/search/wolves" to="/wolves"/>
          <Route exact path='/wolves' render={ () => <PhotoContainer
            data={this.state.wolves} title={this.state.title} loading={this.state.loading} onSearch={this.performSearch}/>}
            />
        <Route exact path='/search/:tag' render={ () => <PhotoContainer
          data={this.state.photos} title={this.state.title} loading={this.state.loading} onSearch={this.performSearch}/>}
        />
        <Route component={NotFound} />
        </Switch>
      </BrowserRouter>  
  )
}
}

export default App;
