import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  card: {},
  alignRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  actionButtom: {
    textTransform: 'uppercase',
    width: 150
  }
})

const HalfPane = props => {
  const { title, value, buttonText, classes } = props

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <div>
            <Typography
              style={{ textTransform: 'uppercase' }}
              color='secondary'
              gutterBottom
            >
              {title}
            </Typography>
          </div>
          <div>
            <Typography component='p' gutterBottom>
              {value}
            </Typography>
          </div>
          <div className={classes.alignRight}>
            <Button
              color='primary'
              variant='contained'
              className={classes.actionButtom}
            >
              {buttonText}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

HalfPane.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  buttonText: PropTypes.string.isRequired
}

export default withStyles(styles)(HalfPane)
