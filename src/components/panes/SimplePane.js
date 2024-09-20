import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  box: {
    marginBottom: 40,
    height: 65
  },
  alignRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
})

const simplePane = props => {
  const {
    classes,
    onPaneButtonClick,
    heading,
    subText1,
    subText2,
    buttonText
  } = props

  return (
    <Paper className={classes.paper}>
      <div className={classes.box}>
        <Typography
          style={{ textTransform: 'uppercase' }}
          color='secondary'
          gutterBottom
        >
          {heading}
        </Typography>
        <Typography variant='body1' gutterBottom>
          {subText1} <br /> {subText2}
        </Typography>
      </div>
      {props.children}
      <div className={classes.alignRight}>
        <Button
          onClick={onPaneButtonClick}
          color='primary'
          variant='contained'
          className={classes.actionButtom}
        >
          {buttonText}
        </Button>
      </div>
    </Paper>
  )
}

export default withStyles(styles)(simplePane)
