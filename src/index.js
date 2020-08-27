// import { setup } from '../js/setup'


function component (event) {
  console.log('hello', )
  // const element = document.getElementById('gameDiv');

  // setup()
 

  // return element;
}
component()


if (module.hot) {
  module.hot.accept('./print.js', function () {
    console.log('Accepting the updated printMe module!');
    console.log('Updating print.js...');
  })
}