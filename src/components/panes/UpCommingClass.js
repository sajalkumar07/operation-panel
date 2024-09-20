import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import deepPurple from '@material-ui/core/colors/deepPurple'
import PaneProgress from './PaneProgress'
import NoClassScheduled from './NoClassScheduled'
import DateTime from './common/DateTime'
import ClassHeader from './common/ClassHeader'

const styles = theme => ({
  root: { height: '100%' },
  cardContant: {
    paddingTop: '8px'
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  titleText: {
    textTransform: 'capitalize',
    marginRight: `${theme.spacing.unit}px`
  },
  dateTitle: {
    marginBottom: `${theme.spacing.unit * 2}px`,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  pos: {
    marginRight: `${theme.spacing.unit}px`
  },
  avatar: {
    marginRight: `${theme.spacing.unit}px`,
    height: '20px',
    width: '20px',
    color: '#fff',
    backgroundColor: deepPurple[500]
  },
  alignRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit,
    width: 152
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  box: {
    margin: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center'
  }
})

const UpcommingClass = props => {
  const {
    nextBookingId: bookingId,
    getSlotDetailsById,
    getUserDetailsById,
    isNextBooking,
    isScheduleLoading,
    classByBookingId,
    sessionByBookingId,
    classes,
    startClass
  } = props
  if (isScheduleLoading) return <PaneProgress />
  if (!isNextBooking) return <NoClassScheduled />

  const { start_date } = getSlotDetailsById(bookingId)
  const { name: class_with } = getUserDetailsById(bookingId)
  const { name: class_name, class_number } = classByBookingId(bookingId)

  const firstLetter = str => str.substring(0, 1)
  const relativeDate = moment(start_date).fromNow()

  return (
    <div>
      <Card className={classes.card}>
        <div className={classes.box}>
          <Typography
            style={{ textTransform: 'uppercase' }}
            color='secondary'
            gutterBottom
          >
            Next Class
          </Typography>
          <Typography variant='body1' gutterBottom>
            {relativeDate}
          </Typography>
        </div>
        <CardContent className={classes.cardContant}>
          <div className={classes.title}>
            <ClassHeader class_name={class_name} class_number={class_number} />
          </div>
          <div className={classes.dateTitle}>
            <DateTime date={start_date} />
          </div>
          <div className={classes.title}>
            <Avatar color='primary' className={classes.avatar}>
              {firstLetter(class_with)}
            </Avatar>
            <Typography className={classes.pos} component='p'>
              {class_with}
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button
            color='primary'
            variant='contained'
            className={classes.actionButtom}
            onClick={() => startClass(bookingId)}
          >
            Start Class
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

UpcommingClass.propTypes = {
  classes: PropTypes.object.isRequired,
  nextBookingId: PropTypes.string,
  getSlotDetailsById: PropTypes.func.isRequired,
  getUserDetailsById: PropTypes.func.isRequired,
  isNextBooking: PropTypes.bool.isRequired,
  isScheduleLoading: PropTypes.bool.isRequired,
  classByBookingId: PropTypes.func.isRequired
}

export default withStyles(styles)(UpcommingClass)
