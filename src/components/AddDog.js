import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

async function addDog(data) {
    return fetch('/api/adddog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer fake-jwt-token'
    },
      body: JSON.stringify(data)
    }).then(response=>response.text()).then(response=>{
        return response?JSON.parse(response):{}
    })
   }

 const AddDog = () => {
  let history = useHistory();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState("");
  debugger;
  const [breed, setBreed] = useState(history.location.state.name);

  const onSubmit = (e) => {
    e.preventDefault();
    const newDog = {
      breed,
      name,
      location,
      description,
      age
    };
    addDog(newDog).then((response)=>{
        alert("Dog successfully added!")
        history.goBack();
    });
  };
  

  return (
    <React.Fragment>
      <div className="w-full max-w-sm container mt-20 mx-auto">
        <form onSubmit={onSubmit}>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Name of Dog
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter name"
            />
          </div>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              placeholder="Enter location"
            />
          </div>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="age"
            >
              Age
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="text"
              placeholder="Enter Age"
            />
          </div>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Enter Description"
            />
          </div>
          <div className="flex items-center justify-between">
            <a onClick={name && location && description && age && onSubmit} className="mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Add Dog
            </a>
          </div>
          <div className="text-center mt-4 text-gray-500">
            <Link to="/dashboard">Cancel</Link>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddDog;