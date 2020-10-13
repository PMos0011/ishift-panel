import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const deleteConfirm = (access, id, name, action)=>{
    confirmAlert({
        title: 'Usunięcie danych ' + name,
        message: 'Czy na pewno usunąć dane ' + name + '?',
        buttons: [
          {
            label: 'Oczywiście, usuwam',
            onClick: () =>action(access, id)
          },
          {
            label: 'Jeszcze się zastanowię'
          }
        ]
      });
}

export default deleteConfirm;