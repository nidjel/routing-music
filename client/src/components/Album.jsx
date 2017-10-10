import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Grid, Header, Table, Button} from 'semantic-ui-react'

const Album = (props) => (
  <div>
   <Container style={{ padding: '5em 0em' }}>
      <Header as='h2'>Album</Header>
      <Grid columns={2}>
        <Grid.Column >
          <div>
            <img src={props.album.imageUrl} width='250' height='250' alt="album's cover" />
          </div>
          <Link to={`${props.parentPath}`}><Button primary>Close</Button></Link>
        </Grid.Column>
        <Grid.Column >
          <Table attached='top' basic>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>#</Table.HeaderCell>
                <Table.HeaderCell>song</Table.HeaderCell>
                <Table.HeaderCell>time</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
             {props.album.tracks.map((t, i) => {
                const trackTime = toHumanTimeFormat(t.durationMs)
                return (
                  <Table.Row key={i} >
                    <Table.Cell>{i + 1}</Table.Cell>
                    <Table.Cell>{t.name}</Table.Cell>
                    <Table.Cell>{trackTime}</Table.Cell>
                  </Table.Row>
                )
              })}  
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    </Container>
  </div>
)

function toHumanTimeFormat(ms) {
  const min = Math.floor(ms/1000/60)
  const sec = Math.floor((ms - min*1000*60)/1000)
  
  return `${min.toString()}:${pad(sec.toString(), 2)}`
}

function pad(numberString, size) {
  let padded = numberString
  while (padded.length < size) padded = `0${padded}`
  return padded
}

export default Album