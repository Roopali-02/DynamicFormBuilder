import './App.css';
import FormBuilder from './components/FormBuilder';
import {FormProvider} from './context/FormContext';
function App() {
  return (
    <div className='App'>
      <FormProvider>
        <FormBuilder />
      </FormProvider>
    </div>
  );
}

export default App;
