let taskInput = document.getElementById('taskInput');
let taskList = document.getElementById('taskList');
let editTask = false;
let currentTask; 

function addTask() {
    const task = taskInput.value.trim();

    if (task === '') {
        alert('Please enter a task');
        return;
    }

    if (editTask) {
        currentTask.firstChild.textContent = task;
        taskInput.value = ''; 
        editTask = false;
        return;
    }

    const li = document.createElement('li');
    
    const taskText = document.createElement('span');
    taskText.textContent = task;  
    li.appendChild(taskText);
    

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'x';
    deleteButton.style.backgroundColor = 'red';
    deleteButton.style.HoverColor = 'purple';

    deleteButton.style.borderRadius = '5px';
    deleteButton.onclick = function() {
        const confirmation = confirm('Are you sure you want to delete this task?');
        if (confirmation) {
            taskList.removeChild(li);
        }
    };

    // Create an update button
    const updateButton = document.createElement('<svg xmlns="http://www.w3.org/2000/svg" fill="#a683e3" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>')
    // updateButton.textContent = 'Update';
    updateButton.style.borderRadius = '5px';
    updateButton.style.backgroundColor = '#FFC107';
    updateButton.style.marginLeft = '10px';
    updateButton.onclick = function() {
        taskInput.value = taskText.textContent;  
        currentTask = li;
        editTask = true;
    };


      // Create a done button
      const doneButton = document.createElement('button');
      doneButton.textContent = 'Done';
      doneButton.style.marginLeft = '10px'; 
      doneButton.onclick = function() {
          taskText.style.textDecoration = 'line-through';  
          taskText.style.color = 'grey';  
          doneButton.disabled = true;
          updateButton.disabled = true;
      };

    li.appendChild(deleteButton);  
    li.appendChild(updateButton);  
    li.appendChild(doneButton);    
    taskList.appendChild(li);  

    taskInput.value = ''; 
}
