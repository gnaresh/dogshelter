import React from "react";
import { withRouter } from 'react-router-dom';

async function getBreeds() {
  return fetch('/api/breeds', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer fake-jwt-token'
    }
  }).then(data=>data.text()).then(response=>{
    return JSON.parse(response)
  })
 }

 const Card = (props) => {
  return (
  <div className="card" onClick={props.onClick}>
    <div className="image">
      <img src={props.image} />
    </div>
    <div className="content">
      <div className="header">{props.name}</div>
      <div className="meta">
        <span className="date">{props.dogs?props.dogs.length:0} available for adoption.</span>
      </div>
      <div className="description">{props.description}</div>
    </div>
  </div>
  )
}

class Dashboard extends React.Component {

  state = {
      breeds: []
  }

  constructor(props){
    super(props);
  }

  componentDidMount = () => (
      getBreeds().then((data)=>{

          this.setState({
              breeds: data.dogBreeds
          })
        }
        )
  )

  handleClick(breed){
    const { history } = this.props;
    history.push({
      pathname: '/dogs',
      state: {
        name: breed.name
      }
    })
  }

  //on click of the Breed this should reroute to a card of the breed taking the props
  render() {
    const { breeds } = this.state;
    return (
      <React.Fragment>
        <div className="header">
          <h4 style={{textAlign: 'center'}}>
            Select a Dog Breed to view the dogs available for adoption.
          </h4>
        </div>
        {breeds.length > 0 ? (
          <div style={{width: '80%', margin: 'auto'}}>
            {breeds.map((breed) => (
              <Card {...breed} onClick={()=>this.handleClick(breed)}></Card>
            ))}
          </div>
        ) : (
          <p className="text-center bg-gray-100 text-gray-500 py-5">No data.</p>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(Dashboard);