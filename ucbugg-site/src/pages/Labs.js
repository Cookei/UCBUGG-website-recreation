import React, { useEffect, useState } from "react";
// import { Routes, Route } from "react-router-dom";
import { Route } from "wouter";
import data from "./labExport";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkExtendedTable, {
  extendedTableHandlers,
} from "remark-extended-table";

const Labs = (props) => {
  const { markdownReferences } = props;
  console.log("mardown references", markdownReferences);
  return (
    <>
      aaaa
      {/* {entries.map((e) => {
        console.log(e.path);
        return (
          <Route path={e.path} key={e.key}>
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
          </Route>
        );
      })} */}
    </>
  );
};

export default Labs;
