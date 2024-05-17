<template>
  <div class="add-task-btn-container">
    <button class="btn-create-todo" @click="openTodoForm">Add Task</button>
  </div>
  <div class="main-body">
    <div class="on-progress-todo">
      <Todo title="In Progress Todo List" :todoList="onProgress" @update="updateTodo" @extended="extendedTodoHandler"
        disabled />
    </div>
    <Todo title="Completed Todo List" :todoList="completedTodo" isCompleted />
    <Todo title="Extended Todo List" :todoList="extendedTodo" isExtended disabled />
    <Todo title="Missed Todo List" :todoList="missedTodo" isMissed />
  </div>
  <div v-if="isOpen" class="create-todo-modal">
    <div class="todo-form">
      <div class="close-backdrop-box" @click="isOpen = false">
        <img src="../../assets/close-todo-form.svg" alt="todo-form" />
      </div>
      <div class="todo-list-box create-todo-form">
        <span>Create a To do</span>
        <div class="todo-input">
          <input type="text" v-model="todoTitle" placeholder="Enter Todo Title" />
        </div>
        <div class="todo-create-form">
          <input type="datetime-local" v-model="endDate" @change="checkTimeDifference" />
          <button class="select-time">Select time</button>
        </div>
        <button class="todo-btn-add" @click="addTodo">
          {{ todoId ? 'Update Plan' : 'Add Plan' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Todo from '../../components/Todo.vue';
export default {
  name: 'TaskList',
  components: {
    Todo
  },
  data() {
    return {
      // initial State
      isOpen: false,
      todoTitle: "",
      endDate: "",
      todo: {
        title: 'New Todo Task',
        deadline: '2024-04-10T21:25'
      },
      todoList: [],
      isExtended: false,
      todoId: ''
    }
  },
  computed: {
    onProgress() {
      return this.todoList.filter(todo => {
        const currentDate = new Date().valueOf(); // 1715001237605
        const endDate = new Date(todo.endDate).valueOf(); // 1715173980000
        return !todo.isCompleted && currentDate < endDate && !todo.isExtended
      })
    },
    completedTodo() {
      return this.todoList.filter(todo => todo.isCompleted)
    },
    extendedTodo() {
      // filter todoList if isExtended is true.
      return this.todoList.filter(todo => { // if curly bracket, then return
        const currentDate = new Date().valueOf(); // 1715001237605
        const endDate = new Date(todo.endDate).valueOf(); // 1715173980000
        return todo.isExtended && currentDate < endDate
      })
    },
    missedTodo() {
      // filter todoList if isCompleted false and currentDate > endDate.
      return this.todoList.filter(todo => { // if curly bracket, then return
        const currentDate = new Date().valueOf(); // 1715001237605
        const endDate = new Date(todo.endDate).valueOf(); // 1715173980000
        return !todo.isCompleted && currentDate > endDate
      })
    }
  },
  watch: {
    todoList(val) {
      console.log('Changing', val);
    }
  },
  methods: {
    openTodoForm() {
      this.todoTitle = ''
      this.endDate = ''
      this.isOpen = true
    },
    addTodo() {
      if (this.todoTitle === '') {
        alert('Please fill in all fields')
        return
      }
      if (this.todoId) {
        const todoIndex = this.todoList.findIndex(todo => todo.id === this.todoId)
        this.todoList[todoIndex].title = this.todoTitle
        this.todoList[todoIndex].endDate = this.endDate
        this.todoList[todoIndex].updatedAt = new Date().valueOf()
        this.todoList[todoIndex].isExtended = true
        this.todoList[todoIndex].isCompleted = false
      } else {
        const newTodo = {
          id: Date.now().toString(36) + Math.random().toString(36).substring(2),
          title: this.todoTitle,
          startDate: new Date().valueOf(),
          endDate: this.endDate === '' ? this.formatDate(new Date()) : this.formatDate(this.endDate),
          createdAt: new Date().valueOf(),
          updatedAt: new Date().valueOf(),
          isCompleted: false,
          isExtended: false
        }
        this.todoList.push(newTodo)
        this.todoTitle = ''
        this.endDate = ''
        this.todoId = ''
      }
      this.isOpen = false
    },
    updateTodo({ todoInfo }) {
      const todoIndex = this.todoList.findIndex(todo => todoInfo.todo.id === todo.id)
      this.todoList[todoIndex].isCompleted = todoInfo.todo.isCompleted
      this.todoList[todoIndex].updatedAt = new Date().valueOf()
    },
    extendedTodoHandler(todo) {
      this.todoId = todo.id
      this.todoTitle = todo.title
      this.endDate = todo.endDate
      this.isOpen = true
    },
    checkTimeDifference(event) {
      const currentDate = new Date().valueOf()
      const selectedDate = new Date(event.target.value).valueOf()
      if (selectedDate < currentDate) {
        alert('Please select a future date')
        this.endDate = ''
        return
      }
    },
    formatDate(endDate) {
      const date = new Date(endDate); // Create a new Date object
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
      const day = String(date.getDate() + 2).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      console.log(`${year}-${month}-${day}T${hours}:${minutes}`)
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
  }
}
</script>

<style scoped>
.add-task-btn-container{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.btn-create-todo {
  background-color: #063656 !important;
  font-size: 1rem !important;
  padding: 0.5rem 0.8rem;
  box-sizing: border-box;
  border-radius: 0.6rem;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
}

.on-progress-todo {
  width: 100%;
}

.create-todo-modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.todo-form {
  width: 28rem;
  background-color: #fff;
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-end;
  border-radius: 0.4rem;
}

.close-backdrop-box {
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
}

.close-backdrop-box img {
  width: 100%;
  height: 100%;
}

.todo-list-box {
  width: 100%;
  height: initial;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.5rem;
  border: 1px solid rgb(198, 198, 198);
  border-radius: 0.6rem;
  box-sizing: border-box;
}

.todo-list-box span {
  color: #063656;
  font-weight: 700;
}

.todo-input {
  width: 100%;
  border: 1px solid rgb(176, 176, 176);
  border-radius: 0.6rem;
  overflow: hidden;
}

.todo-input input {
  width: 100%;
  height: 100%;
  font-size: 1rem;
  box-sizing: border-box;
  outline: none;
  border: none;
  padding: 0.5rem;
}

.todo-create-form {
  width: 100%;
  display: flex;
  height: inherit;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  box-sizing: border-box;
}

.todo-create-form input[type="datetime-local" i] {
  border: 1px solid rgb(216, 216, 216);
  padding: 0.5rem;
  outline: 0;
  border-radius: 0.6rem;
  font-weight: 500;
}

.select-time {
  flex: 1;
  flex-grow: 2;
  height: 2rem;
  border: none;
  background-color: #0e841e;
  font-family: 'Poppins';
  color: #fff;
  font-weight: 600;
  font-size: 0.7rem;
  border-radius: 0.6rem;
}

.todo-btn-add {
  width: 100%;
  border: none;
  cursor: pointer;
  height: 2.5rem;
  border-radius: 0.6rem;
  font-weight: 600;
  background-color: rgb(12, 138, 71);
  color: #fff;
}
</style>
