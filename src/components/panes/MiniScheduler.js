import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import { getDayOfWeek } from '../../helpers/dateHelper'
import IconButton from '@material-ui/core/IconButton'
import AssignmentIcon from '@material-ui/icons/Assignment'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import ActivitiesPane from './ActivitiesPane'
import PaneProgress from './PaneProgress'
import DateTime from './common/DateTime'
import ClassHeader from './common/ClassHeader'
import NoClassScheduled from './NoClassScheduled'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  },
  primary: {
    color: '#fff',
    fontSize: '1rem',
    backgroundColor: theme.palette.primary.main
  },
  secondary: {
    color: '#fff',
    fontSize: '1rem',
    backgroundColor: theme.palette.secondary.main
  },
  box: {
    margin: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  },
  display: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  listItem: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '0px',
      paddingRight: '0px'
    }
  },
  buttons: {
    [theme.breakpoints.down('xs')]: {
      padding: '6px'
    }
  }
})

const MiniScheduler = props => {
  const {
    isScheduleLoading,
    getBookingIds: bookingIds,
    getSlotDetailsById,
    getUserDetailsById,
    toggleMiniSchedular,
    isMiniSchedularToggle,
    actvitiesByBookingIdAndType,
    miniSchedularActivityTab,
    activityTabSwitch,
    classByBookingId,
    isNextBooking,
    classes
  } = props
  if (isScheduleLoading) return <PaneProgress />
  if (!isNextBooking) return <NoClassScheduled />

  const handleDateTime = id => {
    const { start_date } = getSlotDetailsById(id)
    return <DateTime date={start_date} />
  }

  const getDay = id => {
    const { start_date } = getSlotDetailsById(id)
    const day = getDayOfWeek(start_date)
    return day.substring(0, 3)
  }

  const handleUserName = id => {
    const { name } = getUserDetailsById(id)
    return name
  }

  const handleClassName = id => {
    const { name: class_name, class_number } = classByBookingId(id)
    return <ClassHeader class_name={class_name} class_number={class_number} />
  }

  const handleDocumentURL = id => {
    const { document_url } = classByBookingId(id)
    return document_url
  }

  const onExpandClick = id => {
    toggleMiniSchedular(id)
  }

  const isActivitiesOpen = id => (isMiniSchedularToggle(id) ? true : false)

  return (
    <div className={classes.demo}>
      <Card className={classes.card}>
        <div className={classes.box}>
          <Typography
            style={{ textTransform: 'uppercase' }}
            color='secondary'
            gutterBottom
          >
            Mini Schedule
          </Typography>
          <Typography variant='body1' gutterBottom>
            YOUR NEXT CLASSES
          </Typography>
        </div>
        <CardContent className={classes.cardContant}>
          <List dense>
            {bookingIds.map((id, ind) => {
              // const uiDate =uiFirendlyFormat(slots.start_date, 'Do MMMM')
              return (
                <React.Fragment>
                  <ListItem className={classes.listItem}>
                    <ListItemAvatar className={classes.display}>
                      <Avatar
                        className={
                          ind % 2 === 0 ? classes.secondary : classes.primary
                        }
                      >
                        {getDay(id)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      className={classes.listItem}
                      primary={handleClassName(id)}
                      secondary={handleDateTime(id)}
                    />
                    <ListItemText
                      className={classes.display}
                      primary={handleUserName(id)}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        className={classes.buttons}
                        target='_blank'
                        href={handleDocumentURL(id)}
                        aria-label='Open as pdf'
                      >
                        <AssignmentIcon />
                      </IconButton>
                      {!isActivitiesOpen(id) && (
                        <IconButton
                          className={classes.buttons}
                          aria-label='Open'
                          onClick={onExpandClick.bind(null, id)}
                        >
                          <ExpandMore />
                        </IconButton>
                      )}
                      {isActivitiesOpen(id) && (
                        <IconButton
                          className={classes.buttons}
                          aria-label='Close'
                          onClick={onExpandClick.bind(null, id)}
                        >
                          <ExpandLess />
                        </IconButton>
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Collapse
                    in={isActivitiesOpen(id)}
                    timeout='auto'
                    unmountOnExit
                  >
                    <ActivitiesPane
                      activitiesByType={actvitiesByBookingIdAndType(id)}
                      miniSchedularActivityTab={miniSchedularActivityTab}
                      activityTabSwitch={activityTabSwitch}
                    />
                  </Collapse>
                </React.Fragment>
              )
            })}
          </List>
        </CardContent>
      </Card>
    </div>
  )
}

MiniScheduler.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MiniScheduler)
