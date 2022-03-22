import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import Registeruser from './components/user_registration/Registeruser';
import Loginuser from './components/loginuser/Loginuser';
import Homepage from './components/homepage/Homepage';
import './App.css';
import TraningPage from './components/Content/TraningPage';
import Feedback from './components/Feedback/Feedback';
import Examlist from './components/Exam/ExamList';
import Progress from './components/loginuser/Progress';
import Scqs from './components/Exam/Scqs';
import Exam from './components/Exam/Exam';
import Error404 from './components/Error404';
import Helpdesk from './components/Helpdesk/Helpdesk';
import { useHistory } from 'react-router-dom';
import TrainingPage2 from './components/Content/TraningPage2';
import Quizapp from './components/Exam/QuizApp';
import Quiz from './components/Exam/components/Quiz';
import Qs from './components/Exam/helpers/Qs';
import Exam2 from './components/Exam/Attempt2/Exam2';
import Exam3 from './components/Exam/Attempt3/Exam3';
import Examc2 from './components/Exam/C2Attempt1/Examc2';
import AttemptPop from './components/Exam/AttemptPop';
import Examc22 from './components/Exam/C2Attempt2/Examc22';
import Examc222 from './components/Exam/C2Attempt3/Examc222';

import { ProtectedRoute } from './ProtectedRoute';



function App() {
  
  
  return (
    <>




    <Router>
    <Switch>
      <ProtectedRoute exact path='/scqs' component={Scqs}/>
      <ProtectedRoute exact path='/validating' component={Progress}/>
      <ProtectedRoute exact path='/feedback' component={Feedback}/>
      <Route exact path='/user-reg' component={Registeruser}/>
      <Route exact path='/' component={Loginuser}/>
      <ProtectedRoute exact path='/homepage' component={Homepage}/>
      <ProtectedRoute exact path='/training' component={TraningPage}/>
      <ProtectedRoute exact path='/training1' component={TrainingPage2}/>
      <ProtectedRoute exact path='/examlist' component={Examlist}/>
      <ProtectedRoute exact path='/exam' component={Exam}/>
      <ProtectedRoute exact path='/exam2' component={Exam2}/>
      <ProtectedRoute exact path='/exam3' component={Exam3}/>
      <ProtectedRoute exact path='/examc2' component={Examc2}/>
      <ProtectedRoute exact path='/examc22' component={Examc22}/>
      <ProtectedRoute exact path='/atempt' component={AttemptPop}/>
      <ProtectedRoute exact path='/examc222' component={Examc222}/>
      <ProtectedRoute exact path='/helpdesk' component={Helpdesk}/>
      <ProtectedRoute exact path='/quizer' component={Quizapp}/>
      <ProtectedRoute component={Error404}/>
      <ProtectedRoute exact path='/qs' component={Qs}/>


    </Switch>
    </Router>

    </>
    
  );
}

export default App;
