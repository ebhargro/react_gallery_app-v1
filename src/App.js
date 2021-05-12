//Treehouse Techdegree Unit 7 project
//Ebony Hargro
//Aiming for: Exceeds

// importing all componenets
import React, { Component } from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import { Container, Jumbotron } from 'react-bootstrap';
import apiKey from './config';
import Search from './Components/Search';
import Nav from './Components/Nav';
import PhotoContainer from './Components/PhotoContainer';
import NoPage from './Components/NoPage'


//Initializing state with app class component

class App extends Component {
  constructor(){
    super();
  
  this.state = {
    photos: [],
    oceans: [],
    sunrises: [],
    wolves: [],
    title: '',
    isLoading: true
  };
}

  //Loading external data when our component gets mounted to the DOM via searchTag function
componentDidMount() {
  this.searchTag();
  this.searchTag('oceans');
  this.searchTag('sunrises');
  this.searchTag('wolves');
}
// Requesting data from the Flickr API using the Fetch API using the searchTag function
searchTag = (tag) => {
  fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=16&format=json&nojsoncallback=1`)
  //After the fetch method executes the result is returned in JSON format and then the state is updated by passing in a function that takes the JSON data and returns a new state
    .then(res => res.json())
    .then(response => {
      if(tag === 'oceans'){
        this.setState({
          oceans: response.photos.photo,
          loading: false
        })
      } else if (tag === 'sunrises') {
        this.setState({
          sunrises: response.photos.photo,
          loading: false
        }) 
      } else if (tag === 'wolves') {
          this.setState({
            wolves: response.photos.photo,
            loading: false
          })
        } else {
          this.setState({
            photos: response.photos.photo,
            loading: false,
            title: tag
          })
        }
        })
        //Creating an error function that takes the parameter 'error'
      .catch(error => {
        console.log('Error collecting data', error);
      });
      }
//Adding a loading indicator to aim for Exceeds
manageLoading = (indicator) => {
  this.setState({loading: indicator});
}
//Rendering the child components of our app and passing them external API data state via props. Also establishing a header container and welcome message using Bootstrap. Also calling the NoPage component for routes that do not exist
render () {
  return(
    <div>
      <Jumbotron>
            <Container> 
              <h1>Welcome to Photo-Finder! 🔍 </h1>
              <p>
                This is a simple search app created by Ebony Hargro with the help of Treehouse instructors and community. 
              </p>
            </Container>
      </Jumbotron>
    <BrowserRouter>
          <Search onSearch={this.searchTag} tag={this.state.title} setLoading={this.manageLoading}/>
          <Nav/>
          <Switch>
            <Route exact path='/' render= { () =>
            <Redirect to="/oceans"/>} />
            <Redirect from="/search/oceans" to="/oceans"/>
            <Route exact path='/oceans' render={ () =>
            <PhotoContainer data={this.state.oceans} title='Oceans' loading={this.state.loading} onSearch={() => this.searchTag} />} />

            <Redirect from="/search/sunrises" to="/sunrises"/>
            <Route exact path='/sunrises' render={ () => <PhotoContainer 
              data={this.state.sunrises} title='Sunrises' loading={this.state.loading} onSearch={ () => this.searchTag}/>} />

            <Redirect from="/search/wolves" to="/wolves"/>
              <Route exact path='/wolves' render={ () => <PhotoContainer
                data={this.state.wolves} title='Wolves' loading={this.state.loading} onSearch={ () => this.searchTag}/>}
                />
            <Route exact path='/search/:tag' render={ () => <PhotoContainer
              data={this.state.photos} title={this.state.title} loading={this.state.loading} onSearch={ () => this.searchTag}/>}
            />
            <Route component={NoPage} />
            </Switch>
          </BrowserRouter>  
    </div>)
}
}

export default App;
