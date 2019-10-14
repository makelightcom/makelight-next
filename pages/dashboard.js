import PageHead from '../components/PageHead'
import React from 'react'
import Hero from '../components/hero'

class Dashboard extends React.Component {
  render () {
    return (
      <div>
        <PageHead title='Makelight Dashboard' />
        <Hero title='Dashboard' />

      </div>
    )
  }
}

export default Dashboard
