import React from 'react'
import Divider from '@material-ui/core/Divider'
import HalfPane from './HalfPane'

const CreditsPane = props => {
  return (
    <div>
      <HalfPane title='Teacher Refund' value='0' buttonText='Comming Soon' />
      <Divider variant='middle' />
      <HalfPane title='Student Refund' value='0' buttonText='Comming Soon' />
    </div>
  )
}

CreditsPane.propTypes = {}

export default CreditsPane
