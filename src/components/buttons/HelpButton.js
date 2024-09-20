import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import PhoneIcon from '@material-ui/icons/Phone'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  }
})

const HelpButton = props => {
  const { classes, label } = props
  return (
    <div>
      <Button color='secondary' className={classes.helpButton}>
        <PhoneIcon className={classes.leftIcon} />
        {label}
      </Button>
    </div>
  )
}

export default withStyles(styles)(HelpButton)
