const fs = require('fs');
const pascalcase = require('pascal-case');
const replaceNew = require('replace-in-file');


module.exports = (componentName, routeName) => {
  
  console.log(`*********** Generate Component ${componentName} ************`);
  
  if (!componentName) {
    throw new Error('Component name is required');
  }

  const nameList = {
    name: componentName,
    route: routeName ? routeName : componentName
  };

  nameList.pascalCasedName = pascalcase(nameList.name);

  let dir = './src/views/' + nameList.name;
  fs.mkdirSync(dir);

  const templateList = [
    {
      name: 'actions.tmpl.js',
      output: 'actions.js'
    },
    {
      name: 'container.tmpl.js',
      output: 'index.js'
    },
    {
      name: 'presentational.tmpl.js',
      output: (name) => `${name}.js`
    },
    {
      name: 'reducer.tmpl.js',
      output: 'reducer.js'
    },
    {
      name: 'style.tmpl.js',
      output: (name) => `${name}.css`
    }
  ];

  const fileCreator = (template) => {
    
    if (template.fileType === 'directory') {
      
      //incase sub directory files also required
      fs.mkdirSync(`${dir}/${template.name}`);
      template.templateList.forEach(fileCreator)
    } else {
      
      const generator = require(`./templates/${template.name}`);
      const content = generator(nameList);
      const outputName = typeof template.output === 'string' ? template.output : template.output(nameList.name);
      const path = `${dir}/${outputName}`;

      fs.writeFileSync(path, content);
      console.log(`-> ${outputName} created`);
    }
  };
  
  templateList.forEach(fileCreator);
  
  //reducer and routes entry
  const replaceEntries = [
    {
      files: './src/app/reducers.js',
      from: /(import.*\n(?!.*import.*))/,
      to: `$1import ${nameList.name}Reducer from '../views/${nameList.name}/reducer'\n`,
    },
    {
      files: './src/app/reducers.js',
      from: /(combineReducers\(\{.*,\n)/s,
      to: `$1  ${nameList.name}: ${nameList.name}Reducer,\n`,
    },
    {
      files: './src/app/routes.js',
      from: /(import.*\n(?!.*import.*))/,
      to: `$1import ${nameList.pascalCasedName} from '../views/${nameList.name}'\n`,
    },
    {
      files: './src/app/routes.js',
      from: /(<Switch>.*)<Route path="\*" component={.*}\/>/s,
      to: `$1<Route exact path='/${nameList.route}' component={${nameList.pascalCasedName}}/>\n      <Route path="*" component={NotFound}/>`,
    },
  ];
  
  replaceEntries.forEach(options => {
    try {
      replaceNew.sync(options);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  });
  
  console.log(`*********** Component ${nameList.name} Generated ***********`);
  console.log(`*********** Accessible at /${nameList.route} ***************`);
};
