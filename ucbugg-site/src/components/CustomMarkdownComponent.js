import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkExtendedTable, {
  extendedTableHandlers,
} from "remark-extended-table";
import markdownStyles from "../styles/Markdown.module.css";

const CustomMarkdownComponent = (props) => {
  const { images, child } = props;
  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkExtendedTable]}
      rehypePlugins={[rehypeRaw]}
      remarkRehypeOptions={{
        handlers: { ...extendedTableHandlers },
      }}
      urlTransform={(uri) => {
        if (images == undefined) return;
        return images[decodeURI(uri)];
      }}
      className={markdownStyles.markdown}
      components={{
        blockquote(props) {
          const { children } = props;
          const extractString = (obj) => {
            if (typeof obj == "string") return obj;
            else {
              obj = obj.props.children;
              let returnString = "";
              let i = 0;
              while (obj[i]) {
                returnString += extractString(obj[i]);
                i++;
              }
              return returnString;
            }
          };
          let childrenProps = extractString(children[1]);
          let classname;
          if (/^\s*\(!important\)\s*\n/g.exec(childrenProps) != null) {
            childrenProps = childrenProps.replace(
              /^\s*\(!important\)\s*\n/g,
              ""
            );
            classname = "important";
          } else if (/^\s*\(!info\)\s*\n/g.exec(childrenProps) != null) {
            childrenProps = childrenProps.replace(/^\s*\(!info\)\s*\n/g, "");
            classname = "info";
          }
          return <blockquote children={childrenProps} className={classname} />;
        },
      }}
    >
      {child}
    </Markdown>
  );
};

export default CustomMarkdownComponent;
