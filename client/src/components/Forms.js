import React, { Component } from 'react';
import { CardBody, Input, Form, FormGroup, Label } from 'reactstrap';
import { SIGN_UP, LOG_IN, START, GOAL, CONTACT,
         LOGIN_ERROR, USERNAME_ERROR, PASSWORD_ERROR,
         TC_ERROR, NUM_DAYS_ERROR, LONG_RUN_ERROR } from '../utils/consts';
import Error from './Error';
import ScrollAnimation from 'react-animate-on-scroll';

class Forms extends Component {

  chooseForm = (props) => {
    switch (props.formType) {
      case SIGN_UP:
        return <SignUpForm onClick={props.onClick} onChange={props.onChange} emailValue={props.emailValue} passwordValue={props.passwordValue} errors={props.errors}/>
      case LOG_IN:
        return <LogInForm onClick={props.onClick} onChange={props.onChange} emailValue={props.emailValue} passwordValue={props.passwordValue} errors={props.errors}/>
      case START:
        return <StartForm onChange={props.onChange} errors={props.errors}/>
      case GOAL:
        return <GoalForm onChange={props.onChange}/>
      case CONTACT:
        return <ContactForm onChange={props.onChange}/>
      default:
        return (
          <div>
            <CardBody>There was an issue, please try again.</CardBody>
          </div>
        );
    }
  }

  render() { return(
      <div>
          {this.chooseForm(this.props)}
      </div>
    );
  };
}
 
export default Forms;

const SignUpForm = (props) => {
  return ( 
    // <div className="card">
      <CardBody id="sign-up-body">
        <Form>
          <FormGroup>
            <Label htmlFor="signupEmail">Email</Label>
            <Input type="email" name="signupEmail" id="signup-email" onChange={props.onChange} value={props.emailValue} placeholder="Email Address" required/>
          </FormGroup>
          <Error listeningFor={USERNAME_ERROR} errors={props.errors} />
          <FormGroup>
            <Label htmlFor="signup-password">Password</Label>
            <Input type="password" name="signupPassword" id="signupPassword" onChange={props.onChange} value={props.passwordValue} placeholder="Password"  required/>
          </FormGroup>
          <Error listeningFor={PASSWORD_ERROR} errors={props.errors} />
          <FormGroup check className="form-check-inline">
              <Label check>
                <Input  onChange={props.onChange} type="checkbox" name="terms" value="1"/>{' '}
                By checking this box, I agree to Train Method's <a id="signupmodaltext" href="/terms">Terms and Conditions</a>
               </Label>
               <Error listeningFor={TC_ERROR} errors={props.errors} />
            </FormGroup>
        </Form>
        <br />
        <button type="button" className="btn btn-dark" onClick={props.onClick}>Sign Up</button>
      </CardBody> 
    // </div>
  );
}
 

const LogInForm = (props) => {
  return ( 
    // <div className="card">
      <CardBody id="login-body">
        <Form>
          <FormGroup>
            <Label htmlFor="loginEmail">Email</Label>
            <Input type="email" name="loginEmail" id="login-email" onChange={props.onChange} value={props.emailValue} placeholder="Email Address"  required/>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="login-password">Password</Label>
            <Input type="password" name="loginPassword" id="loginPassword" onChange={props.onChange} value={props.passwordValue} placeholder="Password"  required/>
          </FormGroup>
        </Form>
        <Error listeningFor={LOGIN_ERROR} errors={props.errors} />
        <button type="button" className="btn btn-dark" onClick={props.onClick}>Login</button>
      </CardBody> 
    // </div>
  );
}
 

const StartForm = (props) => {
  return ( 
    <ScrollAnimation offset="10" animateOnce animateIn="fadeIn">
    <div className="card">
      <div className="card-header" id="start-title">
      Your Information
      </div>
      <div className="card-body" id="start-body">
      
        <Form>
          <FormGroup>
            <h3>Current Fitness Level:</h3>
            <Label htmlFor="mpw">How many Miles Per Week (MPW) do you currently
                  run on average?</Label>
            <Input  onChange={props.onChange} type="select" name="mpw">
              <option value="0">0</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
              <option value="35">35</option>
              <option value="40">40</option>
              <option value="45">45</option>
              <option value="50">50</option>
              <option value="55">55</option>
              <option value="60">60</option>
              <option value="65">65</option>
              <option value="70">70+</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <h3>Your Schedule:</h3>
            <Label htmlFor="sched">What days of the week are you able to run?</Label>
            <br />
            <FormGroup check className="form-check-inline">
              <Label check>
                <Input  onChange={props.onChange} type="checkbox" name="days" value="0"/>{' '}
                Sunday
              </Label>
            </FormGroup>
            <FormGroup check className="form-check-inline">
              <Label check>
                <Input  onChange={props.onChange} type="checkbox" name="days" value="1" />{' '}
                Monday
              </Label>
            </FormGroup>
            <FormGroup check className="form-check-inline">
              <Label check>
                <Input  onChange={props.onChange} type="checkbox"  name="days" value="2"/>{' '}
                Tuesday
              </Label>
            </FormGroup>
            <FormGroup check className="form-check-inline">
              <Label check>
                <Input  onChange={props.onChange} type="checkbox"  name="days" value="3"/>{' '}
                Wednesday
              </Label>
            </FormGroup>
            <FormGroup check className="form-check-inline">
              <Label check>
                <Input  onChange={props.onChange} type="checkbox"  name="days" value="4"/>{' '}
                Thursday
              </Label>
            </FormGroup>
            <FormGroup check className="form-check-inline">
              <Label check>
                <Input  onChange={props.onChange} type="checkbox"  name="days" value="5"/>{' '}
                Friday
              </Label>
            </FormGroup>
            <FormGroup check className="form-check-inline">
              <Label check>
                <Input  onChange={props.onChange} type="checkbox"  name="days" value="6"/>{' '}
                Saturday
              </Label>
            </FormGroup>
          </FormGroup>
          <Error listeningFor={NUM_DAYS_ERROR} errors={props.errors} />
          <FormGroup>
            <h3>Long Run:</h3>
            <Label htmlFor="days-of-week">Which day of the week would you like to do your long run?</Label>
            <Input  onChange={props.onChange} type="select" name="longRun">
              <option value="0">Sunday</option>
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
              <option value="6">Saturday</option>
            </Input>
          </FormGroup>
          <Error listeningFor={LONG_RUN_ERROR} errors={props.errors} />
        </Form>
      </div>
    </div>
    </ScrollAnimation>
  );
}
 

const GoalForm = (props) => {
  return ( 
    <ScrollAnimation offset="10" animateOnce animateIn="fadeIn">
    <div className="card">
      <div className="card-header" id="goal-title">
      Your Goals
      </div>
      <div className="card-body" id="goal-body">
        <Form>
          <FormGroup>
            <h3>Goal Distance:</h3>
            <Label htmlFor="goalDistance">What is your goal distance?</Label>
            <Input  onChange={props.onChange} type="select" name="goalDistance" id="goalDistance">
              <option value="3.1">5k (3.1 Miles)</option>
              <option value="6.2">10k (6.2 Miles)</option>
              <option value="13.1">Half Marathons (13.1 miles)</option>
              <option value="26.2">Marathon (26.2 miles)</option> 
            </Input>
          </FormGroup>
          <FormGroup>
            <h3>Race Name:</h3>
            <label htmlFor="raceName">What is the name of your race?</label><br/>
            <Input  onChange={props.onChange} type="text" name="raceName" id="raceName" placeholder="Austin Marathon"/>
          </FormGroup>
          <FormGroup>
            <h3>Race Date:</h3>
            <label htmlFor="raceDate">What is the date of your race?</label><br/>
            <Input  onChange={props.onChange} type="date" name="raceDate" id="raceDate"  required/>
          </FormGroup>
        </Form>
      </div>
    </div>
    </ScrollAnimation>
  );
}

const ContactForm = () => {
  return ( 
    <div className="card">
          <div className="card-header">Contact</div>
          <div className="card-body">
            <Form>
              <div className="form-group">
                <label for="nameInput">Your Name</label>
                <Input type="name" className="form-control" id="nameInput" placeholder=""></Input>
              </div>
              <div className="form-group">
                <label for="emailInput">Email address</label>
                <Input type="email" className="form-control" id="emailInput" placeholder="name@example.com"></Input>
              </div>
              <div className="form-group">
                <label for="subjectInput">Subject</label>
                <Input type="subject" className="form-control" id="subjectInput" placeholder=""></Input>
              </div>
              <div className="form-group">
                <label for="messageInput">Message</label>
                <textarea className="form-control" id="messageInput" rows="5"></textarea>
              </div>
            </Form>
             
              <button type="submit" className="btn btn-dark" value="Submit">Submit</button>
            
          </div>
        </div>
  );
}