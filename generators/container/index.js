const fs = require('fs');
const pascalcase = require('pascal-case');
var replace = require("replace");

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
      replaceStr: "//GENERATE_WRITE_IMPORT",
      replaceWith: `import ${nameList.name}Reducer from '../views/${nameList.name}/reducer'\n//GENERATE_WRITE_IMPORT`,
      path: ['./src/app/reducers.js']
    },
    {
      replaceStr: "//GENERATE_WRITE_REDUCER",
      replaceWith: `${nameList.name}: ${nameList.name}Reducer,\n  //GENERATE_WRITE_REDUCER`,
      path: ['./src/app/reducers.js']
    },
    {
      replaceStr: "//GENERATE_WRITE_IMPORT",
      replaceWith: `import ${nameList.pascalCasedName} from '../views/${nameList.name}'\n//GENERATE_WRITE_IMPORT`,
      path: ['./src/app/routes.js']
    },
    {
      replaceStr: "\\{/\\*GENERATE_WRITE_ROUTER\\*/\\}",
      replaceWith: `<Route exact path='/${nameList.route}' component={${nameList.pascalCasedName}}/>\n      {/*GENERATE_WRITE_ROUTER*/}`,
      path: ['./src/app/routes.js']
    }
  ];
  
  replaceEntries.forEach(entry => {
    replace({
      regex: entry.replaceStr,
      replacement: entry.replaceWith,
      paths: entry.path,
      recursive: true,
      silent: true,
    });
  });
  
  console.log(`*********** Component ${nameList.name} Generated ***********`);
  console.log(`*********** Accessible at /${nameList.route} ***************`);
};
