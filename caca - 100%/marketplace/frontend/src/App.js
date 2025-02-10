import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import CreateStore from './components/CreateStore';
import ApproveStores from './components/ApproveStores';
import ApprovedStores from './components/ApprovedStores';
import Welcome from './components/Welcome';
import './components/User.css';

const App = () => {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const [storeName, setStoreName] = useState('');
  const [showUser, setShowUser] = useState(false);
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleUserClick = () => {
    setShowUser(!showUser);
  };

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  return (
    <div className="App">
      <Navbar onUserClick={handleUserClick} />
      {showUser && (
        <div className="user-container">
          {!token ? (
            <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
              <div className="form-container sign-up-container">
                <Register />
              </div>
              <div className="form-container sign-in-container">
                <Login setToken={setToken} setRole={setRole} />
              </div>
              <div className="overlay-container">
                <div className="overlay">
                  <div className="overlay-panel overlay-left">
                    <h1>¡Bienvenido de nuevo!</h1>
                    <p>Para mantenerse conectado con nosotros, inicie sesión con su información personal</p>
                    <button className="ghost" onClick={handleSignInClick} id="signIn">Iniciar Sesión</button>
                  </div>
                  <div className="overlay-panel overlay-right">
                    <h1>¡Hola, Amigo!</h1>
                    <p>Ingrese sus datos personales y comience su viaje con nosotros</p>
                    <button className="ghost" onClick={handleSignUpClick} id="signUp">Registrarse</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Welcome role={role} storeName={storeName} />
              {role === 'admin' && (
                <>
                  <ApproveStores token={token} role={role} />
                  <ApprovedStores token={token} role={role} />
                </>
              )}
              {role === 'owner' && (
                <CreateStore token={token} />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
