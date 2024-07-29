// Define the Redux-inspired store
function createStore(reducer) {
    let state;
    const listeners = [];
  
    const getState = () => state;
  
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
    };
  
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            const index = listeners.indexOf(listener);
            if (index !== -1) {
                listeners.splice(index, 1);
            }
        };
    };
  
    // Initialize the state with a default value (0 in this case)
    state = reducer(undefined, { type: '@@INIT' });
  
    return { getState, dispatch, subscribe };
  }
  
  // Define a reducer function
  function counterReducer(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        case 'RESET':
            return 0;
        default:
            return state;
    }
  }
  
  // Create the store with the reducer
  const store = createStore(counterReducer);
  
  // Function to update the display when the state changes
  function render() {
    const countInput = document.querySelector('.counter__value');
    if (countInput) {
        countInput.value = store.getState().toString();
    }
  }
  
  // Subscribe to state changes
  store.subscribe(render);
  
  // Ensure the DOM is fully loaded before adding event listeners
  document.addEventListener('DOMContentLoaded', () => {
    // Handle button clicks to increment, decrement, and reset the count
    const addButton = document.querySelector('.counter__button[data-key="add"]');
    if (addButton) {
        addButton.addEventListener('click', () => {
            store.dispatch({ type: 'INCREMENT' });
        });
    }
  
    const subtractButton = document.querySelector('.counter__button[data-key="subtract"]');
    if (subtractButton) {
        subtractButton.addEventListener('click', () => {
            store.dispatch({ type: 'DECREMENT' });
        });
    }
  
    const resetButton = document.querySelector('.reset');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            // Show the reset overlay dialog
            const resetOverlay = document.querySelector('.reset-overlay');
            if (resetOverlay) {
                resetOverlay.show();
            }
        });
    }
  
    const resetOverlay = document.querySelector('.reset-overlay');
    if (resetOverlay) {
        resetOverlay.addEventListener('sl-initial-focus', (event) => {
            // Focus on the "Cancel" button initially
            const cancelButton = resetOverlay.querySelector('sl-button[data-key="cancel"]');
            if (cancelButton) {
                cancelButton.focus();
            }
        });
  
        const confirmButton = resetOverlay.querySelector('sl-button[data-key="confirm"]');
        if (confirmButton) {
            confirmButton.addEventListener('click', () => {
                store.dispatch({ type: 'RESET' });
                // Close the reset overlay dialog
                resetOverlay.hide();
            });
        }
  
        const cancelButton = resetOverlay.querySelector('sl-button[data-key="cancel"]');
        if (cancelButton) {
            cancelButton.addEventListener('click', () => {
                // Close the reset overlay dialog without resetting
                resetOverlay.hide();
            });
        }
    }
  
    // Initial render
    render();
  });
  