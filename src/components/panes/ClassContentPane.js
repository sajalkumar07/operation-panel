import React from 'react'
// import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import PaneProgress from './PaneProgress'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/ArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/ArrowRight'
import SwipeableViews from 'react-swipeable-views'
import StepConnector from '@material-ui/core/StepConnector'
import Carousel from 'nuka-carousel'

const styles = theme => ({
  cardContant: {
    paddingTop: '8px'
  },
  box: {
    margin: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  },
  pos: {
    marginRight: `${theme.spacing.unit}px`
  },
  stepper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: `${3 * theme.spacing.unit}px`
  },
  headerMargin: {
    marginTop: `${theme.spacing.unit}px`
  },
  img: {
    height: 255,
    display: 'block',
    overflow: 'hidden'
  },
  stepperContainer: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    flexGrow: 1,
    height: '100px',
    margin: `${theme.spacing.unit}px`,
    justifyContent: 'space-between'
  },
  stepText: {
    color: theme.palette.error.main
  },
  indicator: {
    content: '',
    transform: 'translateX(-50%)',
    position: 'absolute',
    left: '50%',
    right: 'auto',
    height: '12px',
    width: '12px',
    borderRadius: '50%',
    border: '2px solid #dfdfdf',
    backgroundColor: '#f8f8f8',
    transition: 'background-color 0.3s, border-color 0.3s',
    bottom: '-15px'
  },
  indicatorSelected: {
    borderColor: theme.palette.primary.main
  },
  indicatorCurrent: {
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.main
  },
  indicatorHighlight: {}
})

const ClassContent = props => {
  const {
    classes,
    // onStepChange,
    getAllMasterClasses,
    isMasterClassLoading,
    activeClassIndex: activeStep,
    selectClassIndex
  } = props

  if (isMasterClassLoading) return <PaneProgress />

  const steps = getAllMasterClasses
  const maxSteps = steps.length

  const handleUp = () => {
    selectClassIndex(activeStep - 1 < 0 ? 0 : activeStep - 1)
  }
  const handleNext = () => {
    selectClassIndex(activeStep + 1 > maxSteps ? maxSteps : activeStep + 1)
  }
  const handleStepChange = activeStep => {
    selectClassIndex(activeStep)
  }
  // Ref: https://github.com/FormidableLabs/nuka-carousel
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 'auto',
    cellAlign: 'center',
    cellSpacing: 20,
    slideIndex: activeStep,
    width: '80%',
    withoutControls: true,
    afterSlide: handleStepChange,
    slideOffset: 20
  }

  const connector = (
    <StepConnector
      classes={{
        active: classes.connectorActive,
        completed: classes.connectorCompleted,
        disabled: classes.connectorDisabled,
        line: classes.connectorLine
      }}
    />
  )

  return (
    <div>
      <Card className={classes.card}>
        <div className={classes.box}>
          <Typography
            style={{ textTransform: 'uppercase' }}
            color='secondary'
            gutterBottom
          >
            Your Class Content
          </Typography>
        </div>
        <CardContent className={classes.cardContant}>
          <SwipeableViews
            axis={'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {steps.map((step, index) => (
              <div key={step.name} className={classes.header}>
                <Typography variant='h6' gutterBottom>
                  {step.name}
                </Typography>
                <Typography variant='subtitle1'>{step.description}</Typography>
              </div>
            ))}
          </SwipeableViews>
          <div className={classes.stepperContainer}>
            <Button
              size='small'
              disableRipple
              onClick={handleUp}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
              Back
            </Button>
            <Carousel {...settings}>
              {steps.map((d, index) => {
                return (
                  <div
                    key={index}
                    className={
                      `${classes.header}` +
                      ' ' +
                      (index !== 0 && index % 8 === 0
                        ? `${classes.headerMargin}`
                        : '')
                    }
                  >
                    <Typography
                      className={
                        index !== 0 && index % 8 === 0 ? classes.stepText : ''
                      }
                      variant={index !== 0 && index % 8 === 0 ? 'h6' : 'button'}
                      color='secondary'
                    >
                      {d.is_trial ? 'Trial' : 'C' + index}
                    </Typography>
                    <div
                      className={
                        `${classes.indicator}` +
                        ' ' +
                        (index < activeStep
                          ? `${classes.indicatorSelected}`
                          : '') +
                        ' ' +
                        (index === activeStep
                          ? `${classes.indicatorCurrent}`
                          : '')
                      }
                    />
                  </div>
                )
              })}
            </Carousel>
            <Button
              size='small'
              disableRipple
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              <KeyboardArrowRight />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

ClassContent.propTypes = {
  classes: PropTypes.object,
  onStepChange: PropTypes.func,
  activeStep: PropTypes.number,
  steps: PropTypes.object
}

export default withStyles(styles)(ClassContent)
