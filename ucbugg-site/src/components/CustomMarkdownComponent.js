import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkExtendedTable, {
  extendedTableHandlers,
} from "remark-extended-table";
import markdownStyles from "../styles/Markdown.module.css";

import downloadSVG from "../assets/aboutPage/material-download-icon.svg";

const CustomMarkdownComponent = (props) => {
  const { images, child } = props;
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

  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkExtendedTable]}
      rehypePlugins={[rehypeRaw]}
      remarkRehypeOptions={{
        handlers: { ...extendedTableHandlers },
      }}
      urlTransform={(uri) => {
        if (images == undefined) return;
        let decode = images[decodeURI(uri)];
        if (!decode) return uri;
        return decode;
      }}
      className={markdownStyles.markdown}
      components={{
        a(props) {
          let childrenProps = extractString(props.children);
          console.log(props);
          console.log(props.href);
          if (props.href == undefined) {
            return <a>{childrenProps}</a>;
          }
          if (
            (props.href != undefined && props.href.endsWith(".zip")) ||
            props.href.endsWith(".ma") ||
            props.href.endsWith(".mb")
          ) {
            return (
              <a
                href={props.href}
                className={markdownStyles.downloadButton}
                download={
                  props.href.match(/(?<=\/)[^\/]+(?=\..+\.(zip|ma|mb))/g)[0]
                }
              >
                <img src={downloadSVG} />
                <p>{childrenProps}</p>
              </a>
            );
          } else {
            return (
              <a href={props.href} style={{ textDecoration: "underline" }}>
                {childrenProps}
              </a>
            );
          }
        },
        blockquote(props) {
          const { children } = props;
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
