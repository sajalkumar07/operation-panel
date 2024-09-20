import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TimeIcon from '@material-ui/icons/AccessTime'
import DateIcon from '@material-ui/icons/DateRange'
import { uiFirendlyFormat } from '../../../helpers/dateHelper'
import Typography from '@material-ui/core/Typography'
import { byFormat } from '../../../helpers/dateHelper'
const displayFormat = 'hh:mm A'
const styles = theme => ({
  dateTitle: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: '10px',
    justifyContent: 'flex-start'
  },
  pos: {
    marginRight: `${theme.spacing.unit}px`
  }
})

const DateTime = props => {
  const { date, classes } = props
  const uiDate = uiFirendlyFormat(date, 'Do MMMM')
  return (
    <div className={classes.dateTitle}>
      <TimeIcon className={classes.pos} color='action' fontSize='small' />
      <Typography className={classes.pos}>
        {byFormat(date, displayFormat)}
      </Typography>
      <DateIcon className={classes.pos} color='action' fontSize='small' />
      <Typography className={classes.pos}>{uiDate}</Typography>
    </div>
  )
}

DateTime.propTypes = {
  classes: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired
}

export default withStyles(styles)(DateTime)
