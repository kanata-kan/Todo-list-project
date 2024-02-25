

// استيراد React والهوكس
import React, { useState, useEffect, useContext } from 'react';

// استيراد المكونات والأدوات
import Todo from './Todo.js';
import { v4 as uuidv4 } from 'uuid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';

// استيراد السياق
import { TodoContext } from '../Context/TodoContext.js';

export default function TodoList() {
  // إعداد الحالة والسياق
  const { todos, setTodos } = useContext(TodoContext);
  const [titleInput, setTitleInput] = useState("");
  const [tasksComplete, setTasksComplete] = useState("all");

  // دالة للتعامل مع تغيير فلتر إكمال المهام
  function handleChangeTodosComplete(e) {
    setTasksComplete(e.target.value);
  }

  // دالة للتعامل مع إضافة مهمة جديدة
  function handleAddTodo() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
      createdAt: new Date().toLocaleString()
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTitleInput("");
  }

  // الهوك المؤثر لتحميل المهام من التخزين المحلي عند تحميل المكون
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos !== null) {
      setTodos(storedTodos);
    }
  }, []);

  // فلترة المهام بناءً على حالة الإكمال
  const filteredTodos = todos.filter(todo => {
    if (tasksComplete === 'completed') {
      return todo.isCompleted;
    } else if (tasksComplete === 'incomplete') {
      return !todo.isCompleted;
    } else {
      return true;
    }
  });

  // عرض كل مهمة
  const todoElements = filteredTodos.map(todo => (
    <div key={todo.id}>
      <Todo todo={todo} />
    </div>
  ));

  return (
    <Container maxWidth="md" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", marginTop: "50px" }}>
      <div className='card-container' style={{ width: "100%" }}>
        <Card style={{ display: "flex", alignItems: "center", justifyContent: "space-around", flexDirection: "column", width: "100%", border: "5px solid #2196f3", borderRadius: "15px", padding: "20px", background: "#f5f5f5" }}>
          <CardContent style={{ width: "80%", textAlign: "center" }}>
            <Typography sx={{ fontSize: 32, color: "#2196f3" }} gutterBottom>
              مهامي
            </Typography>
            <Divider style={{ background: "#2196f3" }} />
            <ToggleButtonGroup
              style={{ marginTop: "30px", direction: "ltr" }}
              value={tasksComplete}
              exclusive
              onChange={handleChangeTodosComplete}
            >
              <ToggleButton value="incomplete" style={{ color: "#f50057" }}>الغير منجز</ToggleButton>
              <ToggleButton value="completed" style={{ color: "#4caf50" }}>المنجز</ToggleButton>
              <ToggleButton value="all" style={{ color: "#2196f3" }}>الكل</ToggleButton>
            </ToggleButtonGroup>
            {todoElements}
            <Grid container spacing={1} style={{ marginTop: "10px" }}>
              <Grid xs={8}>
                <FormControl style={{ width: "100%" }}>
                  <FormLabel style={{ color: "#2196f3" }}>اضافه مهمه</FormLabel>
                  <Input
                    placeholder="اكتب هنا..."
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                  />
                  <FormHelperText>يمكنك اضافه مهمه جديده من هنا</FormHelperText>
                </FormControl>
              </Grid>
              <Grid xs={4}>
              <Button
                variant="contained"
                style={{
                  width: "100%",
                  height: "75%",
                  fontSize: "25px",
                  fontWeight: "300",
                  color: "#fff",
                  background: titleInput.length !== 0 ? "#4caf50" : "#808080" 
                }}
                onClick={handleAddTodo}
                disabled={titleInput.length === 0}
              >
                اضافه
              </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}