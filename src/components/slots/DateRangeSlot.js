import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import WeekSlot from './WeekSlot'
import { compose } from 'ramda'
import {
  allWeeksBetweenDates,
  nextWeekMonday,
  startOfWeek,
  endOfWeek,
  format
} from '../../helpers/dateHelper'
import Paper from '@material-ui/core/Paper'
import moment from 'moment'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Badge from '@material-ui/core/Badge'
import SlotMenu from './SlotMenu'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    marginBottom: theme.spacing.unit
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`
  }
})

const DateRangeSlot = props => {
  const {
    startDate,
    endDate,
    classes,
    onSlotMenuClick,
    anchorElem,
    currentWeek,
    onWeekTabClick,
    handleInfoOnTab,
    getSlotsByDateRange,
    onSlotCopyClick,
    showExtraOptions,
    ...rest
  } = props

  const handleChange = (event, value) => {
    onWeekTabClick(value)
  }

  const handleClick = event => {
    onSlotMenuClick(event ? event.currentTarget : null)
  }

  const handleCopySlotsClick = (startDate, endDate) => {
    const previousStartDate = compose(
      format,
      startOfWeek,
      nextWeekMonday
    )(startDate, -1)
    const previousEndDate = compose(
      format,
      endOfWeek,
      nextWeekMonday
    )(startDate, -1)
    const slots = getSlotsByDateRange(startDate, endDate)
    onSlotCopyClick({
      start_date: previousStartDate,
      end_date: previousEndDate,
      slots
    })
  }

  const dateRanges = allWeeksBetweenDates(startDate, endDate)
  return (
    <div className={classes.container}>
      <Paper square>
        <AppBar color='defult' position='sticky'>
          <Tabs
            indicatorColor='primary'
            textColor='primary'
            value={currentWeek}
            onChange={handleChange}
            scrollButtons='auto'
            variant='scrollable'
          >
            {dateRanges.map((dateRange, index) => (
              <Tab
                value={index}
                label={
                  <Badge
                    className={classes.padding}
                    color='secondary'
                    showZero
                    badgeContent={handleInfoOnTab(
                      dateRange.startDate,
                      dateRange.endDate
                    )}
                  >
                    {moment(dateRange.startDate).format('D MMM') +
                      ' - ' +
                      moment(dateRange.endDate).format('D MMM')}
                  </Badge>
                }
              />
            ))}
          </Tabs>
        </AppBar>
        {dateRanges.map(
          (dateRange, ind) =>
            currentWeek === ind && (
              <div>
                <WeekSlot
                  key={dateRange.startDate}
                  startDate={dateRange.startDate}
                  endDate={dateRange.endDate}
                  {...rest}
                />
                {showExtraOptions && (
                  <SlotMenu
                    anchorEl={anchorElem}
                    handleMenuClick={handleClick}
                    handleCopySlotsClick={handleCopySlotsClick.bind(
                      null,
                      dateRange.startDate,
                      dateRange.endDate
                    )}
                  />
                )}
              </div>
            )
        )}
      </Paper>
    </div>
  )
}

export default withStyles(styles)(DateRangeSlot)
