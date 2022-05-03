import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import dayjs from "dayjs";

const fsPromise = fs.promises;
const rootPath = process.cwd();

export const getAllDateDirItems = async () => {
  try {
    const basePath = path.join(rootPath, "posts");
    const dirs = await fsPromise.readdir(basePath);
    // sort by date
    dirs.sort();
    const records: {
      [key: string]: {
        articlePath: string;
        parentDir: string;
      }[];
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
            if (!records[article]) {
              records[article] = [
                {
                  articlePath,
                  parentDir: dir,
                },
              ];
            } else {
              records[article].push({
                articlePath,
                parentDir: dir,
              });
            }
          });
      }
    });
    return records;
  } catch (error) {
    console.log("get all article failed!", error);
  }
};

export const getAllPostMetadata = async () => {
  try {
    const dateItems = await getAllDateDirItems();
    if (!dateItems) return [];
    const records: { [key: string]: {}[] } = {};
    const tasks = Object.keys(dateItems).map((dateStr: string) => {
      const articles = dateItems[dateStr];
      articles.forEach((article) => {
        const { articlePath, parentDir } = article;
        const rawContent = fs.readFileSync(articlePath, "utf-8");
        const { data } = matter(rawContent);

        if (records[parentDir]) {
          records[parentDir].push({
            ...data,
            weeklyName: articlePath
              .replace(`${rootPath}/posts/${parentDir}/`, "")
              .replace(/\.md$/, ""),
          });
        } else {
          records[parentDir] = [
            {
              ...data,
              weeklyName: articlePath
                .replace(`${rootPath}/posts/${parentDir}/`, "")
                .replace(/\.md$/, ""),
            },
          ];
        }
      });
    });
    await Promise.all(tasks);

    return records;
  } catch (error) {
    console.log("get all post metadata failed!", error);
  }
};

export const getArticleHtml = async (slug: string) => {
  try {
    const dateItems = await getAllDateDirItems();
    let targetPath: string;
    let contentString: string = "";
    if (dateItems) {
      if (
        Object.values(dateItems).some((item) => {
          if (
            item.some((metaData) => {
              const { articlePath } = metaData;
              if (articlePath.endsWith(slug + ".md")) {
                targetPath = articlePath;
                return true;
              }
              return false;
            })
          ) {
            // 得到了目标,读取 targetPath 文件
            const rawContent = fs.readFileSync(targetPath, "utf-8");
            const { content } = matter(rawContent);
            // Use remark to convert markdown into HTML string
            contentString = content;
            return true;
          }
          return false;
        })
      ) {
        return remark().use(html).process(contentString);
      }
    } else {
      return null;
    }
  } catch (error) {
    console.log("read raw article failed!", error);
  }
};
