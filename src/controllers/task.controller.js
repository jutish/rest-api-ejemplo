import Task from '../models/Task'
import {getPagination} from '../libs/getPagination'

export const findAllTasks = async (req, res) => {
  try{
    const {size, page, title}  = req.query  // Lo pasa el usuario en el URL
    
    const condition = title ? {
      title: {$regex: new RegExp(title), $options:"i"}
    } : {};

    const {limit, offset} = getPagination(page, size)
    
    const tasks = await Task.paginate(condition, {offset, limit}) // Para usar paginate necesito el modulo mongoosePaginate
    res.send(tasks)
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Something goes wrong retrieving the task'
    })
  }
}

export const createTask =  async (req, res) => {
  try{
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      done: req.body.done ? req.body.done : false
    });
    const taskSaved = await newTask.save();
    res.json(taskSaved);
  }catch (error) {
    res.status(500).json({
      message: error.message || 'Something goes wrong creating the task'
    })
  }
}

export const findOneTask =  async (req, res) => {
  try{
    const { id } = req.params;
    const task = await Task.findById(id)
    if (!task)
      return res
        .status(404)
        .json({ message: `Task with ${id} does not exists` });
    res.json(task)    
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Something goes wrong finding the task'
    })
  }

}

export const deleteTask =  async (req, res) => {
  try{
    await Task.findByIdAndDelete(req.params.id)
    res.json({
    message: `${req.params.id} Task were deleted succesfully`
    })    
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Something goes wrong deleting the task'
    })
  }
}

export const findAllDoneTasks = async (req, res) => {
  try{
    const tasks = await Task.find({done: true})
    res.send(tasks)  
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Something goes wrong finding all the task'
    })
  }
}

export const updateTask = async (req, res) => {
  try{
    await Task.findByIdAndUpdate(req.params.id, req.body)
    res.json({message: 'Task was updated succesfully'})
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Something goes wrong updating all the task'
    })
  }
}


