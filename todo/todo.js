const fs  = require('fs')
const filePath  = './tasks.json'

const loadTasks = ()=>{
    try{
   const dataBuffer = fs.readFileSync(filePath)  //it will give dataBuffer bcz we are reading from a file
   const dataJSON = dataBuffer.toString() // it is now in json form but this is different from regular json
   return JSON.parse(dataJSON)
    }catch(error){
         return []; 
    }
}

const listTasks = ()=>{
    const tasks = loadTasks();
    tasks.forEach((task,index ) => console.log(`${index} - ${task.task}`))
} 

const saveTasks =(tasks)=>{
const dataJSON = JSON.stringify(tasks);
fs.writeFileSync(filePath,dataJSON)
}

const addTask = (task)=>{
    const tasks  = loadTasks();
    tasks.push({task})
    saveTasks(tasks)
    console.log('task added')

}
const removeTask = (index)=>{
    const tasks  = loadTasks();
    const updateTask =  tasks.filter((_, indx) => indx !== index  );
    saveTasks(updateTask);
    console.log("task removed")
    listTasks()
}

const command  = process.argv[2]
const argument  = process.argv[3]
if(command === 'add'){
addTask(argument)
}else if(command === 'list'){
listTasks()
}else if(command === 'remove'){
removeTask(parseInt(argument))
}else{
    console.log("command not found!")
}