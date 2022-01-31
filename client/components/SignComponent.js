import React, { useState, useContext } from 'react'
import useRequest from '../hooks/use-request'
import {useRouter} from "next/router"
import { Button } from 'react-bootstrap'
import AuthContext from '../store/AuthContext'
import PopUp from './Warning'
import axios from 'axios'

function SignComponent({ type, url, gotoUrl }) {

  const context = useContext(AuthContext)
  const router = useRouter()  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  /* const { doRequest, errors } = useRequest({
    url: url,
    method: 'post',
    body: {
      email: email,
      password: password
    },
    onSuccess: () => {
        context.logIn()
        router.push(gotoUrl)
    }
  }) */

  const onSubmit = async event => {
    let era = null
    event.preventDefault()
    setError(null)
    await axios.post(url, {email: email, password: password}).then((response) => console.log(response.data.user)).catch((error) => {
      setError(error.response.data.error)
      era = error.response.data.error
      }
    )
      if (era === null) {
        console.log(error);
        context.logIn()
        router.push(gotoUrl) 
      }
      era = null
   } 

    return (
        <form onSubmit={onSubmit}>
      <h1>{type}</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      <br/>
      {error ? <PopUp message={error} /> : null}
      <Button type="submit" variant="outline-info">{type}</Button>
    </form>
    )
}

export default SignComponent
