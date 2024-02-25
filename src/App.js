import './App.css';
import TodoList from './components/TodoList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TodoContext } from './Context/TodoContext';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

function App() {
  // قائمة المهام الافتراضية
  const todosArr = [
    {
      id: uuidv4(),
      title: "اقرأ كتابًا",
      details: "مرحبًا بك في عالم الروايات",
      isCompleted: false
    },
    {
      id: uuidv4(),
      title: "كورس جديد",
      details: "دراسة كورس جديد للرياكت",
      isCompleted: false
    },
    {
      id: uuidv4(),
      title: "سلسلة جديدة",
      details: "مشاهدة سلسلة تعليمية جديدة",
      isCompleted: false
    },
  ];

  // استخدام الحالة لتخزين قائمة المهام
  const [todos, setTodos] = useState(todosArr);

  // إنشاء ستايل الثيم للتطبيق
  const theme = createTheme({
    typography: {
      fontFamily: 'kanata',
    },
    palette: {
      primary: {
        main: '#2196f3', // يمكنك استبدال #2196f3 بلونك المفضل
      },
      secondary: {
        main: '#f50057', // يمكنك استبدال #f50057 بلونك المفضل
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* توفير قيمة السياق للمكونات */}
        <TodoContext.Provider value={{ todos, setTodos }}>
          {/* مكون قائمة المهام */}
          <TodoList />
        </TodoContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;