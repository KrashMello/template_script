import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let html = fs.readFileSync(path.join(__dirname, "./templates/test.html"), "utf8");

const json = {
  template: "test",
  title: "perrito",
  data: [
    {
      id: 1,
      name: "example"
    },
  ]
};

html = html.replace(/<data-title \/>/g, json.title);
const dataHead = Object.entries(json.data[0]).map(([key, value]) => `<th>${key}</th>`).join(" ");
const dataBody = json.data.map((item) => {
  const rowData = Object.values(item).map(value => "<td>" + value + "</td>").join(" ");
  return `<tr>${rowData}</tr>`;
}).join(" ");
html = html.replace(/<data-table-head \/>/g, dataHead);
html = html.replace(/<data-table-body \/>/g, dataBody);
console.log(html);
