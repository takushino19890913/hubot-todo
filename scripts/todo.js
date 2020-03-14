// Description:
//   TODO を管理することができるボットです
// Commands:
//   ボット名 todo     - TODO を作成
//   ボット名 done     - TODO を完了にする
//   ボット名 del      - TODO を消す
//   ボット名 list     - TODO の一覧表示
//   ボット名 donelist - 完了した TODO の一覧表示

'use strict';
const todo = require('todo');
console.log(todo.list());
module.exports = (robot) => {
  robot.respond(/add (.+)/i, (msg) =>{
    //matchは正規表現でマッチした文字列を返す。
    console.log(msg.match[0]);
    console.log(msg.match[1]);
    const task = msg.match[1].trim();
    todo.todo(task);
    msg.send("Task Added:" + task + '\n' +
             "Tasks: \n" + todo.list().join('\n') + '\n' +
             "Done: \n" + todo.donelist().join('\n'));
  });

  robot.respond(/done (.+)/i, (msg) =>{
    const task = msg.match[1].trim();
    const isTaskAvailable = todo.done(task);
    if(isTaskAvailable){
      msg.send("Task Completed: " + task + '\n' +
               "Tasks: \n" + todo.list().join('\n') + '\n' +
               "Done: \n" + todo.donelist().join('\n'));
    }
    else {
      msg.send("Couldn't find the task: " + task + '\n' +
               "Tasks: \n" + todo.list().join('\n') + '\n' +
               "Done: \n" + todo.donelist().join('\n'));
    }

  });

  robot.respond(/del (.+)/i, (msg) =>{
    const task = msg.match[1].trim();
    const isTaskAvailable = todo.del(task);
    if(isTaskAvailable){
      msg.send("Task Deleted:" + task + '\n' +
               "Tasks: \n" + todo.list().join('\n') + '\n' +
               "Done: \n" + todo.donelist().join('\n'));
    }
    else {
      msg.send("Couldn't find the task: " + task + '\n' +
               "Tasks: \n" + todo.list().join('\n') + '\n' +
               "Done: \n" + todo.donelist().join('\n'));
    }

  });

  robot.respond(/list/i, (msg) =>{
    if(todo.list().length)
    {
      msg.send(todo.list().join('\n'));
    }
    else{
      msg.send("No todo tasks are available");
    }

  });

  robot.respond(/donelist/i,(msg) =>{
    if(todo.donelist().length)
    {
      msg.send(todo.donelist().join('\n'));
    }
    else{
      msg.send("No todo tasks are completed");
    }
  });

};
