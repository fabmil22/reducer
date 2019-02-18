(function () {
//con esta funcion creamos nuestro store
  const { createStore} = Redux; 
  let store;

  const todos = [
    {
      id: 1,
      completed: true,
      text:"task 1"
    },
    {
      id: 2,
      completed: true,
      text:"task 2"
    },
    {
      id: 3,
      completed: true,
      text:"task 3"
    },
  ];

 const initialState = {
    todos,
    filter: 'ALL',
  }
 /*fubciones puras */ 
  const actionAdd = (payload) => {
    return{
      type : 'ADD_TASK',
      payload
    }
  }
  const actionDelete = (payload) => {
    return{
      type : 'DELETE_TASK',
      payload
    }
  }

  /**cierre de funciones puras */
  document.addEventListener("DOMContentLoaded", function(event) {
    initApp();
   });

  const reducer = ( state , action) => {
    switch (action.type) {
      case 'ADD_TASK':
        return {
          ...state,
          todos: [...state.todos , action.payload ]
        }
        break;
      case 'DELETE_TASK':
      const id = action.payload.id;
     
        return  {
          ...state,
          todos:state.filter(
            item => { return item.id !== id}
          )
        } 
        break;
      case 'EDIT_TASK':
        break;  
      default:
        return state;
        break;
    }

  }

  function initApp(){
//iniciando el estado
store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const $form = document.getElementById('form');
$form.addEventListener('submit' , (event) => {
  event.preventDefault();
  const data = new FormData($form);

   const action = actionAdd({
      id: 33,
      completed: true,
      text:data.get('text')
    });
/*   const action = actionDelete({
        id: 1,
      }); */
  store.dispatch(action);

  $input = document.getElementById('new-todo');
  $input.value = '';
})

store.subscribe(handleChange);
render();

  }

  function handleChange(){
    render();
  }
function render(){
  const todos = store.getState().todos;
  renderTodos(todos)
}

  function renderTodos(todos){
    const $container = document.getElementById('todo-list');
    $container.innerHTML='';
    let todosHtml= '';
    todos.forEach(element => {
      todosHtml += renderTodo(element);
      
    });
    $container.innerHTML=todosHtml;
  }

  function renderTodo(todo){
    return `
    <li data-id="${todo.id}" class="${todo.completed}">
    <div class="view">
    <input  class="toggle" type="checkbox" ${todo.completed ? 'cehcked' : ''}>
    <label>${todo.text}</label>
    <button class="destroy"></button>
    </div>
    </li>` ;
  }
})();