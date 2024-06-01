// promisification

function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (error, success) => {
        if (error) {
          return reject(console.log("Error Occured: ", error));
        } else resolve(success);
      });
    });
  };
}

// without promisification

function onLoadScript(src, callback) {
  const script = document.createElement("script");

  script.src = src;
  script.onload = () => callback(null, script);
  script.onerror = (error) => callback(error);

  document.head.appendChild(script);
}

//// Old without promisification console.log

// onLoadScript("test.js", (error, Script) => {
//   if (error) {
//     console.log("error occured", error);
//   } else console.log("Script Loaded Successfully");
// });

//// New with promisification console.log

// const onloadScriptNew = promisify(onLoadScript);
// onloadScriptNew("test.js")
//   .then(() => {
//     console.log("Done Loading");
//   })
//   .catch((e) => {
//     console.log("Error Occured: ", e);
//   });

//// for Async calling API using IIFE

const onloadScriptNew2 = promisify(onLoadScript);

(async () => {
  try {
    const fetchedResult = await onloadScriptNew2("test.js");
    console.log(fetchedResult);
  } catch (error) {
    console.log("Something is Wrong: ", error);
  }
})();
