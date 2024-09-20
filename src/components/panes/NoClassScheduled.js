import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'

const styles = theme => ({
  text: {
    margin: theme.spacing.unit * 2,
    textTransform: 'uppercase'
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center'
  }
})

const PaneProgress = props => {
  const { classes } = props
  return (
    <Card className={classes.textContainer}>
      <Typography className={classes.text} color='secondary'>
        No Classes Scheduled
      </Typography>
    </Card>
  )
}

PaneProgress.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PaneProgress)
