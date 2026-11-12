# Taskflow

React + Vite to-do app. Tasks are saved in the browser (localStorage).

## Run
    npm install
    npm run dev        # http://localhost:5173

## Build
    npm run build      # output in dist/

## Structure
    src/App.jsx              state + filters
    src/components/          AddForm, TaskItem, Calendar, Stats, Pomodoro, Toast
    src/hooks/useLocalStorage.js
    src/utils.js
