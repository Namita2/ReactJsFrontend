import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import SimpleTabs from './Tab';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  error: {
    color: 'red',
  }
}));

function getSteps() {
  return ['Delivery', 'Payment'];
}

export default function VerticalStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [value, setValue] = React.useState('female');
  //const [error, setError] = React.useState('false');
 
  const valueChangehandler = (event) => {
    setValue(event.target.value);
  };

  const payment = <div><FormControl component="fieldset">
    <FormLabel component="legend">Select Mode of Payment</FormLabel>

    <RadioGroup aria-label="payment" name="payment1" value={value} onChange={props.handleChange()}>
      {props.paymentMethods && props.paymentMethods.map((payment, index) => (
        <div key={index}>
          <FormControlLabel value={payment.id} control={<Radio />} label={payment.payment_name} onChange={valueChangehandler} />
        </div>

      ))}
    </RadioGroup>

  </FormControl></div>
  const getStepContent = (step) => {

    switch (step) {
      case 0:
        return <SimpleTabs baseUrl={props.baseUrl}  accessToken={props.accessToken} handleAddressSelect={props.handleAddressSelect}
          states={props.states} handleAddress={() => props.handleAddress} selectedAddress={props.selectedAddress} />
      case 1:
        return payment;


      default:
        return 'Unknown step';
    }
  }

  const handleNext = () => {
    if (props.selectedAddress !== '') {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
      // setError('false');
    // } else {
    //   setError('true');
    // }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <React.Fragment>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {getStepContent(index, props)}
              <div className={classes.actionsContainer}>
                {/* {error === 'true' && <div className={classes.error}>Please select any one address</div>} */}
                <div>
                  <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography variant="h5">View the summary &apos;and place your order now! </Typography>
          <Button onClick={handleReset} className={classes.button}>
            CHANGE
          </Button>
        </Paper>
      )}
    </React.Fragment>
  );
}