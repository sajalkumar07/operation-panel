import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import moment from 'moment'
import DaySlot from './DaySlot'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    marginBottom: theme.spacing.unit
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
})

const WeekSlot = props => {
  const {
    startDate,
    endDate,
    onSlotMenuClick,
    anchorElem,
    classes,
    ...rest
  } = props

  const days = moment(endDate).diff(startDate, 'days') + 1
  const dates = [...Array(days)].map((val, ind) =>
    moment(startDate)
      .add(ind, 'day')
      .format()
  )
  return (
    <div className={classes.container}>
      {dates.map(date => (
        <DaySlot key={date} date={date} {...rest} />
      ))}
    </div>
  )
}

export default withStyles(styles)(WeekSlot)
