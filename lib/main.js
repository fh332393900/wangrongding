import request from "./request.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { repoList } from "./repoList.js";
import { toolList } from "./toolList.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 开始执行
export async function start(token) {
  generateReadme();
  generateRepoListContent();
  generateToolListContent();
}
// [![NPM downloads](https://img.shields.io/npm/dm/veact?style=flat&label=&color=cb3837&labelColor=cb0000&logo=npm)](https://www.npmjs.com/package/veact)
// 生成 repoList 内容
function generateRepoListContent() {
  let content = `\n\n##### 一些好玩的项目 \n`;
  repoList.forEach((item) => {
    content += `- [${item.name}](https://github.com/wangrongding/${item.name})：${item.description}  [![](https://img.shields.io/github/stars/wangrongding/${item.name})](https://github.com/wangrongding/${item.name}) \n`;
  });
  appendToReadme(content);
}

// 生成 toolList 内容
function generateToolListContent() {
  let content = "";
  toolList.forEach((item) => {
    content += `- [${item.name}](https://github.com/wangrongding/${item.name})：${item.description}  [![](https://img.shields.io/github/stars/wangrongding/${item.name})](https://github.com/wangrongding/${item.name})     [![](https://img.shields.io/npm/dt/${item.name}?style=flat&label=downloads&color=cb3837&labelColor=cb0000&logo=npm)](https://www.npmjs.com/package/${item.name})\n`;
  });
  appendToReadme(content);
}

// 生成 README 文件内容
function generateReadme() {
  // 复制模版内容到 README
  fs.copyFileSync(
    path.join(__dirname, "../template/index.md"),
    path.join(__dirname, "../README.md")
  );

  // 把 github-status 内容追加到 README
  const githubStatusContent = fs.readFileSync(
    path.join(__dirname, "../template/github-status.md"),
    "utf-8"
  );
  appendToReadme(githubStatusContent);
}

// README 文件追加内容
function appendToReadme(content) {
  // 追加内容
  fs.appendFileSync("./README.md", content, (err) => {
    if (err) {
      console.log("出错");
    }
  });
}