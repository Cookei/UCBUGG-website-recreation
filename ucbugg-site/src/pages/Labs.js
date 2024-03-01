import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import data from "./labExport";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkExtendedTable, {
  extendedTableHandlers,
} from "remark-extended-table";

function getRoute(obj) {
  Object.entries(obj).forEach((element) => {
    let [key, value] = element;
    if (value.markdown != undefined && value.images != undefined) {
      entries.push({
        path: value.markdown[1].toLowerCase(),
        element: value.markdown[0],
        images: value.images,
        key: entries.length,
      });
    } else {
      getRoute(value);
    }
  });
}
let entries = [];
getRoute(data);
console.log(entries);

const Labs = () => {
  const [markdownReferences, setMarkdownReferences] = useState({});

  useEffect(() => {
    entries.forEach((e) => {
      let newObj = markdownReferences;
      fetch(e.element)
        .then((res) => res.text())
        .then((text) => {
          newObj[e.key] = text;
          setMarkdownReferences(newObj);
        });
    });
  }, []);

  return (
    <Routes>
      {entries.map((e) => {
        console.log(e.path);
        return (
          <Route
            path={e.path}
            element={
              <div>
                <Markdown
                  remarkPlugins={[remarkGfm, remarkExtendedTable]}
                  rehypePlugins={[rehypeRaw]}
                  remarkRehypeOptions={{
                    handlers: { ...extendedTableHandlers },
                  }}
                  urlTransform={(uri) => {
                    console.log(1);
                    return e.images[uri.replace(/%20/g, " ")];
                  }}
                >
                  {markdownReferences[e.key]}
                </Markdown>
              </div>
            }
            key={e.key}
          />
        );
      })}
    </Routes>
  );
};

export default Labs;
