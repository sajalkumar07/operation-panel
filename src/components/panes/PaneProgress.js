import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Card from '@material-ui/core/Card'

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center'
  }
})

const PaneProgress = props => {
  const { classes } = props
  return (
    <Card className={classes.progressContainer}>
      <CircularProgress className={classes.progress} />
    </Card>
  )
}

PaneProgress.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PaneProgress)
