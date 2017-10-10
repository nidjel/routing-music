import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import client from '../client.js'

import Album from './Album.jsx'
import AlbumsPanel from './AlbumsPanel.jsx'

const ALBUM_IDS = [
  '23O4F21GDWiGd33tFN3ZgI',
  '3AQgdwMNCiN7awXch5fAaG',
  '1kmyirVya5fRxdjsPFDM05',
  '6ymZBbRSmzAvoSGmwAFoxm',
  '4Mw9Gcu1LT7JaipXdwrq1Q',
]


class AlbumsContainer extends Component {
  state = {
    fetched: false,
    albums: [],
  }

  componentDidMount() {
    this.getAlbums()
  }

  getAlbums = () => {
    client.getAlbums(ALBUM_IDS)
      .then((albums) => (
        this.setState({
          fetched: true,
          albums
        })
      )).catch((err) => (
        console.log(err)
      ))
  }

  render() {
    if (this.state.fetched) {
      return (
        <div>
          <AlbumsPanel albums={this.state.albums} />
          <Route path='/albums/:albumId' render={({match}) => {
            const album = this.state.albums.find(a => a.id === match.params.albumId)
            return <Album album={album} parentPath={this.props.match.path} />
          }} />
        </div>
      )
    } else {
      return 'loading...'
    }
  }
}

export default AlbumsContainer