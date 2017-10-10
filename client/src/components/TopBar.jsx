import React from 'react'
import {Link} from 'react-router-dom'
import client from '../client.js'
import { Button } from 'semantic-ui-react'

const TopBar = (props) => (
  <div>
    <h1>Music</h1>
    {client.isLoggedIn() ? (
      <Link to='/logout'> 
        <Button>
          Logout
        </Button>
      </Link>) : (
      <Link to='/login'>
        <Button>
          Login
        </Button>
      </Link>)}
  </div>
)

export default TopBar