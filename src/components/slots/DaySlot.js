import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Moment from 'react-moment'
import TimeSlot from './TimeSlot'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import Paper from '@material-ui/core/Paper'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    margin: `${theme.spacing.unit}px`
  },
  header: {
    margin: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  },
  dateHeader: {
    display: 'flex',
    alignItems: 'center'
  },
  closeAll: {
    marginRight: theme.spacing.unit
  },
  slots: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginRight: theme.spacing.unit
  },
  grid: {
    margin: theme.spacing.unit
  }
})

const DaySlot = props => {
  const {
    date,
    getAllSlotsforDay,
    classes,
    openAllSlotsForDay,
    onOpenAllClick,
    isSlotUnSelected,
    isSlotDisabled,
    onSlotClick,
    showOpenAll,
    ...rest
  } = props
  const slots = getAllSlotsforDay(date)

  const openAll = !!openAllSlotsForDay(date)
  const handleChange = value => event => {
    const finSlots = slots.filter(slot => {
      if (isSlotDisabled(slot)) return false
      if (openAll) return isSlotUnSelected(slot) ? false : true
      else return isSlotUnSelected(slot) ? true : false
    })
    if (finSlots && finSlots.length > 0) onSlotClick(finSlots)
    onOpenAllClick(value)
  }

  const checkAnyEditableSlots = slots =>
    slots.filter(slot => !isSlotDisabled(slot))
  const checkAnyOpenableSlots = slots =>
    checkAnyEditableSlots(slots).filter(slot => isSlotUnSelected(slot))

  const isOpenAll = () => {
    return openAll || !(checkAnyOpenableSlots(slots).length > 0)
  }

  const isOpenAllDisabled = () => {
    return checkAnyEditableSlots(slots).length === 0
  }

  if (slots && slots.length === 0) {
    return <React.Fragment />
  }

  return (
    <Paper elevation={3} className={classes.container}>
      <Grid
        spacing={24}
        alignItems='center'
        justify='center'
        container
        className={classes.grid}
      >
        <Grid item md={2} sm={12} xs={12}>
          <div className={classes.header}>
            <div className={classes.dateHeader}>
              <Typography variant='subheading'>
                <Moment format='ddd, Do MMM'>{date}</Moment>
              </Typography>
            </div>
            {showOpenAll && (
              <div className={classes.closeAll}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isOpenAll()}
                      onChange={handleChange(date)}
                      value={date}
                      disabled={isOpenAllDisabled()}
                    />
                  }
                  label={isOpenAll() ? 'Close All' : 'Open All'}
                />
              </div>
            )}
          </div>
        </Grid>
        <Grid item md={10} sm={12} xs={12}>
          <div className={classes.slots}>
            {slots.map(slot => (
              <TimeSlot
                key={slot.id}
                slot={slot}
                isSlotDisabled={isSlotDisabled}
                isSlotUnSelected={isSlotUnSelected}
                onSlotClick={onSlotClick}
                {...rest}
              />
            ))}
          </div>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default withStyles(styles)(DaySlot)
