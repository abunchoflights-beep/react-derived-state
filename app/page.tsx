import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";

export default function Component() {
  const [firstName, setFirstname] = React.useState('Jhon');
  const [lastName, setLastName] = React.useState('Doe');
  const [fullName, setFullName] = React.useState(`${firstName} ${lastName}`); // this is wrong, because fullName is derived from firstName and lastName, we should not store it in state

  React.useEffect( ()=> {
    setFullName(`${firstName} ${lastName}`); // This causes a re-render. Is unnecessary
  }) 
  // instead you just bring the two variables in a single const and dont force a second render.
  const fullName = `${firstName} ${lastName}`;
}
// another good example could be

function Component() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John', age: 40 },
    { id: 2, name: 'Jane', age: 35 },
    { id: 3, name: 'Bob', age: 45 }
  ])
  const [selectedUser, setSelectedUser] = useState()
  function incrementAge(id) {
    setUsers(currUsers => {
      return currUsers.map(user => {
        if (user.id === id) {
          return { ...user, age: user.age + 1 }
        } else {
          return user
        }
      })
    })
  }
  function selectUser(id) {
    const user = users.find(user => user.id === id)
    setSelectedUser(user);
  }

  // the trigger will only change one of the elements that consume the state, because there a two instances of data that are both referencing
  // the same thing, but storing user in selectedUser is not the same as the one in the array, they actually reference different things

  // so you, instead, just reference to one single source of truth, which is the array.
  // this is useful when filtering or implementing search queries.

  //we store a reference to that user using the id from that user.

  const [ selectedUserId, setSelectedUserId ] = useState();
  const selectedUser = users.find(user => user.id === selectedUserId);

  // now all the numbers will update at the exact moment {watch?v=tz0fDABt67g} reference query

  function selectUser(id) {
    setSelectedUserId(id);
  }

}

// we dont want to store the full user, because if that changes in our user array we want to take that into account
// so we just store the reference to it which is the id