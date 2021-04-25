import React from "react";
import { withRouter } from "react-router";

async function getDogs(data) {
  return fetch('/api/dogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer fake-jwt-token'
    },
    body: JSON.stringify(data)
  }).then(data=>data.text()).then(response=>{
    return response?JSON.parse(response):[]
  })
 }

 const Card = (props) => {
  return (
  <div className="card">
    <div className="image">
      <img src={props.image} />
      <a onClick={props.editDog} style={{padding: '4px', float: 'right'}}>edit</a>
    </div>
  
    <div className="content" style={{width: "-webkit-fill-available"}}>
      <div className="header">{props.name}</div>
      <div className="meta">
        <span className="date">{props.age} </span>
        <span className="date">{props.location} </span>
      </div>
      <div className="description">{props.description}</div>
    </div>
  </div>
  )
}
class Dogs extends React.Component {
  state = {
      dogs: []
  }


  componentDidMount = () => {
    const { history } = this.props;
    getDogs({
      breed: history.location.state.name
    }).then((data)=>{
      this.setState({
          dogs: data
      })
    }
    )
  }
  

  addDog = () => {
    debugger
    const { history } = this.props;
    history.push({
      pathname: '/adddog',
      state: history.location.state
    })
  }


  //on click of the Breed this should reroute to a card of the breed taking the props
  render() {
    const { dogs } = this.state;
    return (
      <React.Fragment>
        <div className="header">
          <h4 style={{textAlign: 'center'}}>
            Dogs available for adoption
          </h4>
          <a onClick={this.addDog}>Add Dog</a>
        </div>
        {dogs.length > 0 ? (
          <div style={{width: '80%', margin: 'auto'}}>
            {dogs.map((dog) => (
              <Card {...dog} editDog={()=>this.editDog(dog)}></Card>
            ))}
          </div>
        ) : (
          <p className="text-center bg-gray-100 text-gray-500 py-5">No data.</p>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(Dogs);