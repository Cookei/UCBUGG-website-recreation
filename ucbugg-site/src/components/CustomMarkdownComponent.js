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
        img(props) {
          if (
            (props.src != undefined && props.src.endsWith(".mov")) ||
            (props.src.endsWith(".mp4") &&
              props.src.match(/(?<=\/)[^\/]+(?=\..+\.(mov|mp4))/g))
          ) {
            return (
              <video
                controls
                className={markdownStyles.videoPlayer}
                width="560"
                height="315"
              >
                <source src={props.src} />
              </video>
            );
          } else if (props.src) {
            return <img src={props.src} />;
          }
        },
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
            props.href.endsWith(".mb") ||
            props.href.endsWith(".iff") ||
            (props.href.endsWith(".exr") &&
              props.href.match(/(?<=\/)[^\/]+(?=\..+\.(zip|ma|mb))/g) != null)
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
                {childrenProps}
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
