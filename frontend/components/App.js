// ❗ IMPORTANT
// The ✨ tasks found inside this component are not in order.
// Check the README for the appropriate sequence to follow.
import React, { useState, useEffect } from 'react'

let id = 0
const getId = () => ++id

let teamMembers = [
  {
    id: getId(), fname: "Alice", lname: "Smith",
    bio: "Passionate about front-end development and user experience. \
I love creating intuitive and visually appealing web interfaces."
  },
  {
    id: getId(), fname: "Bob", lname: "Johnson",
    bio: "Aspiring web developer with a background in graphic design. \
I enjoy bringing creativity and aesthetics to the digital world."
  },
]

export default function App() {
  const [formValues, setFormValues] = useState({fname: "", lname: "", bio: ""})
  const [members, setMembers] = useState(teamMembers)
  const [editing, setEditing] = useState(null)

  const submit = (e) => {
    e.preventDefault()
    if (editing === null) {
      setMembers([...members,{id: getId(), fname: formValues.fname, lname: formValues.lname, bio: formValues.bio}])
      setFormValues({...formValues, fname: "", lname: "", bio: ""})
    } else {
      members.map(member => {
       if(member.id === editing) {
        member.fname = formValues.fname
        member.lname = formValues.lname
        member.bio = formValues.bio
        setFormValues({...formValues, fname: "", lname: "", bio: ""})
        setEditing(null)
       }
      })
    }
  }

  const change = (e) => {
    let {value, name} = e.target
    setFormValues({...formValues, [name]: value})
  }

  const edit = (id) => {
    setEditing(id)
    let member = members.find(member => member.id === id)
    let {fname, lname, bio} = member
    setFormValues({fname: fname, lname: lname, bio: bio})
  }
  return (
    <div>
      <div id="membersList">
        <h2>Team Members</h2>
        <div>
          {members.map(member => 
          <div className='member' key={member.id}>
            <div>
              <h4>
                {member.fname} {member.lname}
              </h4>
              <p>{member.bio}</p>
            </div>
            <button onClick={() => edit(member.id)}>Edit</button>
          </div>)}
        </div>
      </div>
      <div id='membersForm'>
        <h2>Add a Team Member </h2>
        <form onSubmit={submit}>
          <div>
            <label htmlFor='fname'>First Name </label>
            <input
              required
              onChange={change}
              value={formValues.fname}
              name='fname'
              id='fnameInput'
              type='text'
              placeholder='Type First Name'
            >
            </input>
          </div>
          <div>
            <label htmlFor='lname'>Lirst Name </label>
            <input
              required
              onChange={change}
              value={formValues.lname}
              name='lname'
              id='lnameInput'
              type='text'
              placeholder='Type Last Name'
            >
            </input>
          </div>
          <div>
            <label htmlFor='bio'>Bio </label>
            <textarea
              onChange={change}
              value={formValues.bio}
              name='bio'
              id='bioInput'
              type='text'
              placeholder='Type Bio'
            >
            </textarea>
          </div>
          <div>
            <input type='submit'></input>
          </div>
        </form>
      </div>
    </div>
  )
}
