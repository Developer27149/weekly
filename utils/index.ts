import fs from "fs";
import path from "path";
import matter from "gray-matter";

const fsPromise = fs.promises;

export const getAllPostData = async () => {
  try {
    const rootPath = process.cwd();
    const basePath = path.join(rootPath, "posts");
    const dirs = await fsPromise.readdir(basePath);
    // sort by date
    dirs.sort();
    const records: { [key: string]: {} } = {};
    dirs.forEach(async (dir) => {
      // read md files and save data;
      const dateDirPath = path.join(basePath, dir);
      if (fs.lstatSync(dateDirPath).isDirectory()) {
        const posts = await fsPromise.readdir(dateDirPath);
        posts
          .filter(
            (i) =>
              fs.lstatSync(path.join(dateDirPath, i)).isFile() &&
              i.endsWith(".md")
          )
          .forEach(async (article) => {
            // read article and save data
            const articlePath = path.join(dateDirPath, article);
            const rawContent = await fsPromise.readFile(articlePath, "utf-8");
            const { data, content } = matter(rawContent);
            console.log(content);

            records[dir] = { ...data, content };
          });
      }
    });
    return records;
  } catch (error) {
    console.log(error);
  }
};
