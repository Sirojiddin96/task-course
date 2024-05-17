<template>
  <div class="todo">
    <span>{{ title }}</span>
    <div 
      class="todo-list-box" 
      :class="{
        'completed-task': isCompleted,
        'extended-task': isExtended,
        'missed-task': isMissed
      }" 
        v-if="todoList.length > 0" 
        v-for="(todo, index) in todoList" 
        :key="index"
      >
      <span v-if="isCompleted">{{ formatDate(todo.endDate) }}</span>
      <input v-else 
        v-model="todo.endDate" 
        type="datetime-local" 
        id="deadline-todo-on-progress-0"
        :disabled="disabled"
      >
      <div class="complete-todo">
       <div>
        <input 
          v-if="!isCompleted && !isMissed" 
          v-model="todo.isCompleted" 
          type="checkbox" 
          name="check" 
          id="checkbox"
          @change="updateTodo(todo, index)">
        <span class="todo-title">{{ todo?.title }}</span>
       </div>
        <button 
        v-if="!isCompleted && !isMissed && !isExtended" 
        @click="extendedTodo(todo)">Extend
      </button>
      </div>
    </div>
    <div v-else 
      class="todo-list-box" 
      :class="{
        'completed-task': isCompleted,
        'extended-task': isExtended,
        'missed-task': isMissed
      }"
      >No Task Yet😂😊</div>
  </div>
</template>

<script>
import { format } from "date-fns"
export default {
  name: "Todo",
  props: {
    title: {
      type: String,
      default: ''
    },
    todoList: {
      type: Array,
      default: () => []
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    isExtended: {
      type: Boolean,
      default: false
    },
    isMissed: {
      type: Boolean,
      default: false
    },
    disabled:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      books: []
    }
  },
  computed: {
    hello() {
      return 'hello2'
    },
    hello4() {
      //return this.books.length > 0 ? 'hello4' : 'hello5'

      // if(this.books.length > 0){
      //   return 'hello4'
      // }else{
      //   return 'hello5'
      // }

      // if(this.books.length > 0){
      //   return 'hello4'
      // }
      // return 'hello5'

      if (this.books.length > 0) return 'hello4'
      return 'hello5'
    }
  },
  methods: {
    updateTodo(todo, index) {
      this.$emit('update', {
        todoInfo: {
          todo,
          index
        }
      })
    },

    formatDate(date) {
      const formattedDate = format(new Date(date), "yyyy-MM-dd HH:mm:ss")
      return formattedDate
    },
    extendedTodo(todo) {
      this.$emit('extended', todo)
    }
  },
}
</script>

<style scoped>
.todo {
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

.todo-list-box {
  width: 100%;
  display: flex;
  gap: 0.7rem;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 0.4rem;
  padding: 0.5rem;
  box-sizing: border-box;
  border: 1.5px solid rgb(13, 106, 134)
}

.completed-task {
  border: 1px solid rgb(20, 171, 65);
  color: rgb(20, 171, 65)
}

.completed-task span {
  color: rgb(20, 171, 65)
}

.extended-task {
  border: 1px solid rgb(177, 83, 10);
  color: rgb(177, 83, 10)
}

.extended-task span {
  color: rgb(177, 83, 10)
}
.extended-task input {
  color: rgb(177, 83, 10)
}

.missed-task {
  border: 1px solid rgb(112, 2, 8);
  color: rgb(112, 2, 8)
}

.missed-task span {
  color: rgb(112, 2, 8)
}

.missed-task input {
  color: rgb(112, 2, 8)
}

.complete-todo {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
}

.todo-title {
  color: #063656;
  font-weight: 600;
}

.no-task {
  color: red;
}
</style>