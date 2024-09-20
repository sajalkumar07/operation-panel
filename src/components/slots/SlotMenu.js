import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Fab from '@material-ui/core/Fab'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
})

const SlotMenu = props => {
  const { anchorEl, handleMenuClick, classes, handleCopySlotsClick } = props
  const handleClose = () => {
    handleMenuClick(null)
  }
  const handleCopyClick = () => {
    handleClose()
    handleCopySlotsClick()
  }
  return (
    <div>
      <Fab
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        className={classes.fab}
        color='secondary'
        size='small'
        aria-haspopup='true'
        onClick={handleMenuClick}
      >
        <MoreVertIcon />
      </Fab>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleCopyClick}>
          Copy schedule from previous week
        </MenuItem>
      </Menu>
    </div>
  )
}

export default withStyles(styles)(SlotMenu)
