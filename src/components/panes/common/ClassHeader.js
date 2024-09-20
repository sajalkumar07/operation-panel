import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  dateTitle: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: '10px',
    justifyContent: 'flex-start'
  },
  titleText: {
    textTransform: 'capitalize',
    marginRight: `${theme.spacing.unit}px`
  }
})

const ClassHeader = props => {
  const { class_name, class_number, classes } = props
  return (
    <div className={classes.dateTitle}>
      <Typography
        variant='subtitle1'
        className={classes.titleText}
        color='primary'
        gutterBottom
      >
        {class_name.toLowerCase()}
      </Typography>
      <Typography
        variant='subtitle1'
        className={classes.titleText}
        color='default'
        gutterBottom
      >
        {'|'}
      </Typography>
      <Typography
        variant='subtitle1'
        className={classes.titleText}
        color='textSecondary'
        gutterBottom
      >
        {class_number}
      </Typography>
    </div>
  )
}

ClassHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  class_name: PropTypes.string.isRequired,
  class_number: PropTypes.string.isRequired
}

export default withStyles(styles)(ClassHeader)
