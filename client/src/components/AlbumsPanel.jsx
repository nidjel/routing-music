import React from 'react'
import {NavLink} from 'react-router-dom'
import { List } from 'semantic-ui-react'


import '../App.css'

const AlbumsPanel = (props) => (
  <List>
    {props.albums.map((a, i) => (
      <List.Item key={i}>
        <NavLink to={`/albums/${a.id}`} >{a.name} {a.year}</NavLink>
      </List.Item>
     ))}
  </List>
)

export default AlbumsPanel