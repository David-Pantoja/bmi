//imports calculator components
import Calculator from './components/Calculator';

//Simple app component that contains background gradient and calculator
function App() {
  return (
    <div id='container' className='bg-primary'>
      <div className='min-vh-100 d-flex justify-content-center align-items-center'>
        <Calculator />
      </div>
    </div>
  );
}

//exports App component
export default App;