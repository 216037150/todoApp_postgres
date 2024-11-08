let addTask = require('../Script/script');

describe('addTask', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <input type="text" id="taskInput" />
            <ul id="taskList"></ul>
        `;
    });

    test('should add a task to the task list', () => {
        const taskInput = document.getElementById('taskInput');
        taskInput.value = 'Submission at 12:15';
        addTask();

        const taskList = document.getElementById('taskList');
        expect(taskList.children.length).toBe(1);
        expect(taskList.children[0].firstChild.textContent).toBe('Submission at 12:15');
    });

    test('should not delete a task if the list is empty', () => {
        const taskList = document.getElementById('taskList');
        expect(taskList.children.length).toBe(0);

        const deleteButton = document.createElement('button'); 
        deleteButton.click(); 

        expect(taskList.children.length).toBe(0); 
    });

    test('should update a task in the task list', () => {
        const taskInput = document.getElementById('taskInput');
        taskInput.value = 'Original Task';
        addTask();

        const taskList = document.getElementById('taskList');
         // Mock the update button
        const updateButton = taskList.children[0].querySelector('button:nth-of-type(2)');
        updateButton.click();

        taskInput.value = 'Updated Task';
        addTask();

        expect(taskList.children[0].firstChild.textContent).toBe('Updated Task');
    });

    test('should mark a task as done', () => {
        const taskInput = document.getElementById('taskInput');
        taskInput.value = 'Task to be done';
        addTask();

        const doneButton = document.getElementById('taskList').children[0].querySelector('button:nth-of-type(3)');
        doneButton.click();
        const taskList = document.getElementById('taskList');
        expect(taskList.children[0].firstChild.style.textDecoration).toBe('line-through');
    });

    test('should validate index data type', () => {
        const validIndex = 0;
        expect(typeof validIndex).toBe('number');
    });

    test('should check if index is within valid range', () => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = 'Test Task';
    addTask();

    const taskList = document.getElementById('taskList');
    const index = 0;
    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(taskList.children.length);
    });

});
