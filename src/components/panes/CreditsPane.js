import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Divider from '@material-ui/core/Divider'
import HalfPane from './HalfPane'

class CreditsPane extends Component {
  componentDidMount() {
    this.getCredits()
  }

  getCredits() {
    const { getTrialCredits, getPaidCredits } = this.props
    getTrialCredits()
    getPaidCredits()
  }

  render() {
    const { totalTrialCredits, totalPaidCredits } = this.props

    return (
      <div>
        <HalfPane
          title='Total Credits Earned'
          value={totalPaidCredits}
          buttonText='Details'
        />
        <Divider variant='middle' />
        <HalfPane
          title='Total Trial Credits Earned'
          value={totalTrialCredits}
          buttonText='Details'
        />
      </div>
    )
  }
}

CreditsPane.propTypes = {
  totalTrialCredits: PropTypes.number.isRequired,
  totalPaidCredits: PropTypes.number.isRequired,
  getTrialCredits: PropTypes.func.isRequired,
  getPaidCredits: PropTypes.func.isRequired
}

export default CreditsPane
