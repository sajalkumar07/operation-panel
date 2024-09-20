import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import LinkIcon from '@material-ui/icons/Link'
import { ActivitiesType } from '../../constants'

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: `${theme.spacing.unit * 2}px`,
    [theme.breakpoints.down('xs')]: {
      padding: '0px'
    }
  },
  paper: {},
  tab: {
    [theme.breakpoints.down('xs')]: {
      maxWidth: '150px'
    }
  }
})

const TabContainer = props => {
  const { classes, activites } = props
  return (
    <List component='div'>
      {activites.map((actvity, ind) => {
        const { name, link } = actvity
        return (
          <ListItem button className={classes.nested}>
            <ListItemText
              primaryTypographyProps={{ variant: 'button' }}
              primary={name}
            />
            <ListItemSecondaryAction>
              <a href={link} rel='noopener noreferrer' target='_blank'>
                <IconButton aria-label='Comments'>
                  <LinkIcon />
                </IconButton>
              </a>
            </ListItemSecondaryAction>
          </ListItem>
        )
      })}
    </List>
  )
}

TabContainer.propTypes = {}
const UseType = withStyles(styles)(TabContainer)

const Activities = props => {
  const {
    miniSchedularActivityTab = 0,
    activitiesByType,
    activityTabSwitch,
    classes
  } = props

  const handleChange = (event, value) => {
    activityTabSwitch(value)
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Tabs
          value={miniSchedularActivityTab}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          centered
          fullWidth
        >
          <Tab className={classes.tab} value={0} label='Teacher Activities' />
          <Tab className={classes.tab} value={1} label='Student Activites' />
        </Tabs>
        {miniSchedularActivityTab === 0 && (
          <UseType activites={activitiesByType(ActivitiesType.TEACHER_TYPE)} />
        )}
        {miniSchedularActivityTab === 1 && (
          <UseType activites={activitiesByType(ActivitiesType.STUDENT_TYPE)} />
        )}
      </Paper>
    </div>
  )
}

Activities.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Activities)
