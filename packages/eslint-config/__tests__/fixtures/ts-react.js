import * as React from 'react';
function Hello({ name, enthusiasmLevel = 1 }) {
    if (enthusiasmLevel <= 0) {
        throw new Error('You could be a little more enthusiastic. :D');
    }
    const foo = 1;
    return (<div className="hello">
      <div className="greeting">
        Hello {name + enthusiasmLevel}
      </div>
        <Hi>
          haha
        </Hi>
    </div>);
}
export default Hello;
