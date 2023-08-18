/*
    Author Name: Yani Huang

    The template of procedure subpages. Consists of a menu bar with the theme color and Card components to contain content.
*/

import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

//imports
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { CardContent } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';

//Set css
const useStyles = makeStyles((theme) => ({
  div:{
    display: 'flex',    
    width: 1020,
    '& > *': {
      margin: theme.spacing(3),
    }
  },
  homeIcon:{
    width: 100,
    textAlign: 'left',
  },
  
  tab:{
    height: 59,
    fontSize: 17,
    textAlign: 'center',
  },
  tabs:{
    height: 61,
    textAlign: 'center',
  },
  cardFirst:{
    marginTop: 80,
    width: "35%",
    height: 520,
    background: "#F0F0F1",
  },
  cardSec:{
    height: 520,
    alignItems:"center",
    width: "65%",
    marginTop: 80,
    background: "#F0F0F1",
    
  },
  cardThird:{
    height: 520,
    alignItems:"center",
    width: "100%",
    marginTop: 80,
    background: "#F0F0F1",
  },

}));

//The subpages are corresponding to menu items
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

//Limit the prop type for TabPanel
TabPanel.propTypes = {
  children: PropTypes.object,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

//Set props for tabs
function tabProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

//Return a menu bar consists of a home button and three tabs
//Each tab is corresponding to a tabpanel
export default function ProcedureSubPage(props) {
  const{color, algorithm, progress, history, intro, Implementation} = props;
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: color,
      },
      secondary: {
        main: "#FFFFFF"
      },
    },
  });

  const [value, setValue] = React.useState(1);

  // this function is used to record learning progression
  function learnedPage(page){
    progress[page] = true;
    localStorage.setItem(algorithm, JSON.stringify(progress));
  }

  const handleClick = () => {
    //return to home page 
    history.push({pathname: '/ProcedureMainPage'});
  };

  const handleMenuChange = (event, newValue) => {
    //change the tab of menu item, jump from the current page
    learnedPage(newValue-1);
    setValue(newValue);
  };

  const handleIndex = (index) => {
    //swich the content of tabpanel 
    setValue(index);
  };

  return (
   <div >
      <ThemeProvider theme={theme}>
      {/* Menu bar with three tabs for three pages, also the home button */}
      <AppBar>
        <Tabs
          value={value}
          background = "primary"
          onChange={handleMenuChange}
          indicatorColor="secondary"
          
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {/* Button of home page */}
          <Button className={classes.homeIcon} onClick={handleClick}>
            <HomeIcon style={{ fontSize: 30, color: "#FFFFFF"}} />
          </Button>
          {/* tab of introduction page */}
          <Tab label="Overview" {...tabProps(1)} className={classes.tab}/>
          <Tab label="Code" {...tabProps(2)} className={classes.tab}/>
        </Tabs>
      </AppBar>
      {/* swipeableView */}
      <SwipeableViews
        onChangeIndex={handleIndex}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
      >
        <TabPanel value={value} index={0}> 
        </TabPanel>

        {/* this panel is for overview subpage */}
        <TabPanel value={value} index={1} dir={theme.direction} {...learnedPage(0)}>
          <div className = {classes.div}>
            {/* this card holds the overview description of the corresponding sp algorithm */}
            <Card className={classes.cardFirst}>
              <CardContent style={{paddingLeft: "24px", paddingTop: "0px", paddingRight:"23px"}}>
                {intro.introMessage}
              </CardContent>
            </Card>

            {/* this card holds the preset animation of the corresponding sp algorithm */}
            <Card className={classes.cardSec} >
              <CardContent >
                {intro.animation}
              </CardContent>
            </Card>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
            {Implementation}
        </TabPanel>
        
      </SwipeableViews>
      </ThemeProvider>
    </div>
  );
}
