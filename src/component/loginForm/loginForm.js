import React from 'react';

import './form-style.css';
import '../style.css';

const loginForm = () => {
    return (
        <div className="gray-card flex-center">
            <form>
                <div>
                    <label>Nazwa użytkownika
                        <input type="text" name="userName" />
                    </label>
                    <label>Hasło
                        <input type="password" name="password" />
                    </label>
                    <input type="submit" value="Login" />
                </div>
            </form>
        </div>
    )
}

export default loginForm;