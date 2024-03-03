import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkExtendedTable, {
  extendedTableHandlers,
} from "remark-extended-table";
import markdownStyles from "../styles/Markdown.module.css";

const LabMarkdown = (props) => {
  const { e, markdownReferences } = props;
  return (
    <div>
      <Markdown
        remarkPlugins={[remarkGfm, remarkExtendedTable]}
        rehypePlugins={[rehypeRaw]}
        remarkRehypeOptions={{
          handlers: { ...extendedTableHandlers },
        }}
        urlTransform={(uri) => {
          return e.images[uri.replace(/%20/g, " ")];
        }}
        className={markdownStyles.markdown}
      >
        {markdownReferences[e.key]}
      </Markdown>
    </div>
  );
};

export default LabMarkdown;
