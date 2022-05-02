import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const fsPromise = fs.promises;
const rootPath = process.cwd();

export const getAllPostArticles = async () => {
  try {
    const basePath = path.join(rootPath, "posts");
    const dirs = await fsPromise.readdir(basePath);
    // sort by date
    dirs.sort();
    const records: {
      [key: string]: {
        articlePath: string;
        parentDir: string;
      };
    } = {};
    dirs.forEach((dir) => {
      // read md files and save data;
      const dateDirPath = path.join(basePath, dir);
      if (fs.lstatSync(dateDirPath).isDirectory()) {
        const posts = fs.readdirSync(dateDirPath);
        posts
          .filter(
            (i) =>
              fs.lstatSync(path.join(dateDirPath, i)).isFile() &&
              i.endsWith(".md")
          )
          .forEach((article) => {
            // read article and save data
            const articlePath = path.join(dateDirPath, article);
            records[article] = {
              articlePath,
              parentDir: dir,
            };
          });
      }
    });
    return records;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPostMetadata = async () => {
  try {
    const articles = await getAllPostArticles();
    if (!articles) return [];
    const records: { [key: string]: {} } = {};
    const tasks = Object.keys(articles).map(async (article) => {
      const { articlePath, parentDir } = articles[article];
      const rawContent = await fsPromise.readFile(articlePath, "utf-8");
      const { data } = matter(rawContent);
      records[parentDir] = {
        ...data,
        weeklyName: article.replace(/\.md$/, ""),
      };
    });
    await Promise.all(tasks);
    return records;
  } catch (error) {
    console.log("get all post metadata failed!!!");
  }
};

const getArticleHtml = async (slug: string) => {};
