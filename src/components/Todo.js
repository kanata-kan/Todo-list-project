

// استيراد React ومكتبة Material-UI
import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import DoneIcon from '@mui/icons-material/Done';
import IconButton from '@mui/material/IconButton';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';

// استيراد السياق (Context)
import { TodoContext } from '../Context/TodoContext';
import { useState, useContext } from 'react';

// تعريف نمط Material-UI
const theme = createTheme({
  typography: {
    fontFamily: 'kanata',
  },
  palette: {
    primary: {
      main: '#2196f3', 
    },
    secondary: {
      main: '#f50057', 
    },
  },
});

// مكون الانتقال لتحريك الحوارات (الديالوج)
const Transition = React.forwardRef(function Transition({ children, ...props }, ref) {
  return <Slide direction="up" ref={ref} {...props}>{children}</Slide>;
});

// تعريف مكون Todo
export default function Todo({ todo }) {
  const { todos , setTodos } = useContext(TodoContext);
  
  // دالة لتبديل حالة إكمال المهمة
  function toggleTodoCompletion() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
        t.updatedAt = new Date().toLocaleString();
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  // حالة ودوال الحوار للحذف
  const [openDelete, setOpenDelete] = useState(false);
  const handleDeleteDialogOpen = () => setOpenDelete(true);
  const handleDeleteDialogClose = () => setOpenDelete(false);
  function handleDeleteTodo() {
    const updatedTodos = todos.filter((t) => t.id !== todo.id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setOpenDelete(false);
  }

  // حالة ودوال الحوار للتحديث
  const [updatedTodo, setUpdatedTodo] = useState({ title: todo.title, details: todo.details }); 
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleUpdateDialogOpen = () => setOpenUpdate(true);
  const handleUpdateDialogClose = () => setOpenUpdate(false);
  function handleUpdateTodo() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: updatedTodo.title, details: updatedTodo.details, updatedAt: new Date().toLocaleString() };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    setOpenUpdate(false);
    todo.updatedAt = new Date().toLocaleString();
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  return (
    <>            
      {/* بطاقة تعرض تفاصيل المهمة */}
      <Card className='todoCard' style={{ background: theme.palette.primary.main, marginTop: "50px" }}>
        <CardContent style={{ textAlign: "center" }}>
          <Grid container spacing={1}>
            <Grid xs={8} style={{ display: "flex", alignItems: "start", justifyContent: "center", flexDirection: "column" }}>
              <Typography color="white" sx={{ fontSize: 25 }}>
                {todo.title}
              </Typography>
              <p style={{ color: "white" }}>{todo.details}</p>
              <Typography variant="caption" style={{ color: "white" }}>تاريخ الانشاء : {todo.createdAt}</Typography>
            </Grid>
            <Grid xs={4} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              {/* زر لتبديل حالة إكمال المهمة */}
              <IconButton 
                className='btnIcones' 
                aria-label="toggle" 
                size="large" 
                style={{
                  background: todo.isCompleted ? "green" : "#fff",
                  border: todo.isCompleted ? "#fff solid 3px" : "green solid 3px",
                }}
                onClick={toggleTodoCompletion}
              >
                <DoneIcon style={{ color: todo.isCompleted ? "#fff" : "green" }} />
              </IconButton>
              {/* زر لفتح حوار التحديث */}
              <IconButton 
                className='btnIcones' 
                aria-label="update" 
                size="large" 
                style={{
                  background: "#fff", 
                  border: "solid 3px #145094"
                }}
                onClick={handleUpdateDialogOpen}
              >
                <ModeEditOutlinedIcon style={{ color: "#145094" }} />
              </IconButton> 
              {/* زر لفتح حوار الحذف */}
              <IconButton 
                className='btnIcones' 
                aria-label="delete" 
                size="large" 
                style={{
                  background: "#fff", 
                  border: "solid 3px #8C3A22"
                }}
                onClick={handleDeleteDialogOpen}
              >
                <DeleteOutlinedIcon style={{ color: "#8C3A22" }} />
              </IconButton> 
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* حوار الحذف */}
      <Dialog
        open={openDelete}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDeleteDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"هل أنت متأكد أنك تريد حذف هذه المهمة؟"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            بمجرد حذف هذه المهمة، لن يمكن استعادتها.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>إلغاء</Button>
          <Button onClick={handleDeleteTodo}>حذف</Button>
        </DialogActions>
      </Dialog>
      {/* حوار التحديث */}
      <Dialog
        open={openUpdate}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleUpdateDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{ width: "400px" }}>{"تحديث المهمة"}</DialogTitle>
        <FormControl style={{ width: "100%" }}>
          <FormLabel>العنوان</FormLabel>
          <Input 
            placeholder="اكتب هنا..."
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value })
            }}
          />
          <FormHelperText>يمكنك تحديث عنوان المهمة هنا</FormHelperText>
        </FormControl>
        <FormControl style={{ width: "100%" }}>
          <FormLabel>التفاصيل</FormLabel>
          <Input 
            placeholder="اكتب هنا..."
            value={updatedTodo.details}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, details: e.target.value })
            }}
          />
          <FormHelperText>يمكنك إضافة أو تحديث التفاصيل هنا</FormHelperText>
        </FormControl>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>إلغاء</Button>
          <Button onClick={handleUpdateTodo}>تحديث</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}