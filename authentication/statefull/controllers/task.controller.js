import { Task } from '../models/task.model.js';

export const AddTask = async (req, res) => {
  // Get userName and password from body
  const { title, description } = req.body;
  // Check if title is provided or not (description is optional)
  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'Title is required',
    });
  }

  // Get user id from session
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    const task = await Task.create({ userId, title, description: description || '' });

    if (!task) throw new Error('Task not created');

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task,
    });
  } catch (error) {
    console.error('Error creating new task', error.message);
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating new task',
    });
  }
};

export const FetchTask = async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const tasks = await Task.find({ userId });

    if (!tasks || tasks.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No tasks found',
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tasks fetched successfully',
      data: tasks,
    });
  } catch (error) {
    console.error('Error fetching tasks', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching tasks',
    });
  }
};
