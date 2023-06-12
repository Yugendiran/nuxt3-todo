<template>
  <div>
    <div class="flex items-center justify-center w-screen h-screen font-medium">
      <div
        class="flex items-center justify-center flex-grow h-full bg-gray-900"
      >
        <!-- Component Start -->
        <div
          class="max-w-full p-8 text-gray-200 bg-gray-800 rounded-lg shadow-lg w-96"
        >
          <div class="flex items-center mb-6">
            <svg
              class="w-8 h-8 text-indigo-500 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h4 class="ml-3 text-lg font-semibold">Todos</h4>
          </div>
          <div v-for="(task, index) in tasks" :key="index">
            <input
              v-if="task.status == 'complete'"
              class="hidden"
              type="checkbox"
              :id="index"
              checked
              @change="updateTask('incomplete', task.taskId)"
            />
            <input
              v-else
              class="hidden"
              type="checkbox"
              :id="index"
              @change="updateTask('complete', task.taskId)"
            />
            <label
              class="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-900"
              :for="index"
            >
              <span
                class="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-500 rounded-full"
              >
                <svg
                  class="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <span class="ml-4 text-sm">{{ task.taskName }}</span>
              <div
                class="h-6 w-6 min-w-[24px] bg-red-400 ml-3 rounded-full flex justify-center items-center"
                @click="deleteTask(task.taskId)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 30 30"
                  class="h-5 fill-black"
                >
                  <path
                    d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"
                  ></path>
                </svg>
              </div>
            </label>
          </div>

          <button
            class="flex items-center w-full h-8 px-2 mt-2 text-sm font-medium rounded"
          >
            <svg
              class="w-5 h-5 text-gray-400 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <input
              v-model="newTask"
              class="flex-grow h-8 ml-4 font-medium bg-transparent focus:outline-none"
              type="text"
              placeholder="add a new task"
              @keypress.enter="createTask()"
            />
          </button>
        </div>
        <!-- Component End  -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
      newTask: "",
    };
  },
  mounted() {
    this.getAllTasks();
  },
  methods: {
    getAllTasks() {
      this.$http.$get("/tasks").then((res) => {
        this.tasks = res.tasks;
      });
    },
    createTask() {
      this.$http
        .$post("/tasks/createTask", {
          body: {
            newTask: this.newTask,
          },
        })
        .then((res) => {
          this.newTask = "";
          this.getAllTasks();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateTask(status, id) {
      this.$http
        .$put("/tasks/updateTask", {
          body: {
            status: status,
            taskId: id,
          },
        })
        .then((res) => {
          this.getAllTasks();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteTask(taskId) {
      this.$http
        .$delete("/tasks/deleteTask?taskId=" + taskId)
        .then((res) => {
          this.getAllTasks();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
input[type="checkbox"]:checked + label span:first-of-type {
  background-color: #10b981;
  border-color: #10b981;
  color: #fff;
}

input[type="checkbox"]:checked + label span:nth-of-type(2) {
  text-decoration: line-through;
  color: #9ca3af;
}
</style>
