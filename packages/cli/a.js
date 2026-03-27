import inquirer from 'inquirer';

	inquirer.prompt([  
	   {
  type: 'expand',
  name: 'color',
  message: '请选择你喜欢的颜色：',
  choices: [
    { key: 'r', name: '红色' },
    { key: 'g', name: '绿色' },
    { key: 'b', name: '蓝色' }
  ]
}

	]).then(answers => {  
	    console.log(`你选择的颜色是：${answers.color}`);  
	    
	});