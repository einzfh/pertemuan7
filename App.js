import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform, 
  Alert,
  SafeAreaView
} from 'react-native';

export default function App() {
  // State Management (Requirement #3)
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  // Fungsi Tambah Task (Requirement #4 & #6)
  const handleAddTask = () => {
    if (task.trim().length === 0) {
      Alert.alert('Waduh!', 'Isi dulu tugasnya, jangan dikosongin ya Bro.');
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      text: task,
      completed: false,
    };
    setTaskList([...taskList, newTask]);
    setTask('');
  };

  // Fungsi Hapus Task (Requirement #6)
  const deleteTask = (id) => {
    setTaskList(taskList.filter(item => item.id !== id));
  };

  // Bonus: Mark as Done
  const toggleComplete = (id) => {
    setTaskList(taskList.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  // Bonus: Counter Logic
  const completedCount = taskList.filter(t => t.completed).length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header & Counter (Bonus) */}
      <View style={styles.header}>
        <Text style={styles.title}>MyTaskList</Text>
        <Text style={styles.subtitle}>
          {taskList.length > 0 
            ? `${completedCount} dari ${taskList.length} tugas selesai` 
            : 'Belum ada tugas hari ini'}
        </Text>
      </View>

      {/* List Dinamis (Requirement #5) */}
      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>☕ Santai dulu, belum ada tugas nih!</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[styles.taskCard, item.completed && styles.taskDone]}>
            <TouchableOpacity 
              style={styles.taskTextContainer} 
              onPress={() => toggleComplete(item.id)}
            >
              <View style={[styles.checkbox, item.completed && styles.checked]} />
              <Text style={[styles.taskText, item.completed && styles.textDone]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteBtn}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Input Area (Requirement #4) */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Tulis tugas baru...'}
          placeholderTextColor={'#999'}
          value={task}
          onChangeText={text => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addBtn}>
            <Text style={styles.addIcon}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Styling dengan Flexbox (Requirement #2)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark Theme
  },
  header: {
    padding: 30,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#BB86FC',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  taskCard: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#BB86FC',
  },
  taskDone: {
    opacity: 0.5,
    borderLeftColor: '#03DAC6',
  },
  taskTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#BB86FC',
    marginRight: 15,
  },
  checked: {
    backgroundColor: '#03DAC6',
    borderColor: '#03DAC6',
  },
  taskText: {
    color: '#FFF',
    fontSize: 16,
  },
  textDone: {
    textDecorationLine: 'line-through',
  },
  deleteBtn: {
    fontSize: 20,
  },
  inputWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 30,
    borderColor: '#333',
    borderWidth: 1,
    width: '80%',
    color: '#FFF',
  },
  addBtn: {
    width: 55,
    height: 55,
    backgroundColor: '#BB86FC',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addIcon: {
    fontSize: 30,
    color: '#FFF',
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
  }
});
