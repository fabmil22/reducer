(function () {
//con esta funcion creamos nuestro store
  const { createStore, combineReducers} = Redux; 
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
    filters: 'ALL',
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


  const changeFilter = (payload) => {
    return{
      type : 'FILTER_TASK',
      payload
    }
  }
  /**cierre de funciones puras */
  document.addEventListener("DOMContentLoaded", function(event) {
    initApp();
   });


   const reducerFilter = ( state = '' , action) => {
    switch (action.type) {
      case 'FILTER_TASK':
      const filters = action.payload.filters;
      return filters
       
          break;  
      default:
        return state;
      
    }

  }
  const reducerTodos = ( state = [], action) => {
    switch (action.type) {
      case 'ADD_TASK':
        return  [...state , action.payload ]
            break;
      case 'DELETE_TASK':
      const id = action.payload.id;
      return  state.filter(
            item => { return item.id !== id}
          )
            break;  
      default:
        return state;
            break;
    }

  }


const rootReducer = combineReducers( {
  todos  : reducerTodos,
  filters: reducerFilter,
});

  function initApp(){
//iniciando el estado
store = createStore(
  rootReducer,
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

    const actionfilter = changeFilter({
      filters: 'ALL',
    });
/*   const action = actionDelete({
        id: 1,
      }); */
  store.dispatch(action);
  //store.dispatch(actionfilter);
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
  const state = store.getState();
  console.log('ver -->',state);
  let todos = state.todos;
  const filters = state.filters;
  console.log(filters);
  
  if( filters === 'ALL' ){
    todos = todos.filter(todo => todo.completed === true);
  }
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