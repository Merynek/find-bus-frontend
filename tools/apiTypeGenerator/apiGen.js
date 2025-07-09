const {exec} = require("child_process");

const modelsPath = __dirname + "/../../src/api/openapi";

generateModels(() => {
    console.log("success");
})

function generateModels(success) {
    exec("openapi-generator-cli generate -i " + __dirname + "/doc.json -g typescript-fetch --additional-properties=enumPropertyNaming=UPPERCASE -o " + modelsPath, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        success();
    });
}